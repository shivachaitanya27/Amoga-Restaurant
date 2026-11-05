import { Order } from '../types';

export interface BillCalculation {
  subtotal: number;
  total: number;
  dateFormatted: string;
  invoiceNumber: string;
}

export const calculateBill = (order: Order): BillCalculation => {
  const subtotal = order.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const total = subtotal; // No extra costs or GST added!

  const d = order.createdAt ? new Date(order.createdAt) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const dateFormatted = `${day}/${month}/${year}`;

  // Short invoice number from order ID
  const invoiceNumber = order.id.replace(/^AMG-\d{8}-?/, '') || order.id.slice(-4) || '1304';

  return {
    subtotal,
    total,
    dateFormatted,
    invoiceNumber
  };
};

// Formats a line with exact fixed-width padding for monospace WhatsApp receipt
const padRight = (str: string, len: number) => {
  if (str.length >= len) return str.slice(0, len);
  return str + ' '.repeat(len - str.length);
};

const padLeft = (str: string, len: number) => {
  if (str.length >= len) return str;
  return ' '.repeat(len - str.length) + str;
};

export const generateWhatsAppBillText = (order: Order, restaurantName = "AMOGA FAMILY RESTAURANT"): string => {
  const bill = calculateBill(order);

  // Table columns: DESCRIPTION(18), QTY(3), RATE(8), AMOUNT(9) => Total width ~ 40 chars
  const header = 
`\`\`\`
       ${restaurantName.toUpperCase()}

                 FOOD BILL

                           Invoice #: ${bill.invoiceNumber}
                           Date ${bill.dateFormatted}
----------------------------------------
DESCRIPTION        QTY    RATE    AMOUNT
----------------------------------------`;

  const itemLines = order.items.map((it) => {
    const desc = padRight(it.name, 18);
    const qty = padLeft(String(it.quantity), 3);
    const rate = padLeft(`₹${it.price.toFixed(2)}`, 8);
    const amount = padLeft(`₹${(it.price * it.quantity).toFixed(2)}`, 9);
    return `${desc} ${qty} ${rate} ${amount}`;
  }).join('\n');

  const totalLine = 
`----------------------------------------
TOTAL                           ${padLeft(`₹${bill.total.toFixed(2)}`, 8)}
----------------------------------------\`\`\``;

  const orderDetails = 
`*Order Type:* ${order.orderType === 'Home Delivery' ? '🛵 HOME DELIVERY' : '🥡 TAKEAWAY PICKUP'}
*Customer:* ${order.customerName} (+91 ${order.mobile})
${order.orderType === 'Home Delivery' && order.deliveryAddress ? `*Delivery Address:* ${order.deliveryAddress}\n` : ''}${order.googleMapsLocationUrl ? `📍 *Live GPS Pin:* ${order.googleMapsLocationUrl}\n` : ''}*Time Slot:* ${order.pickupTime}
${order.specialInstructions ? `*Special Notes:* ${order.specialInstructions}\n` : ''}
*Note:* No extra charges or GST added. Net bill payable at delivery/pickup!

Please confirm this food bill and let me know the preparation status!`;

  return `${header}\n${itemLines}\n${totalLine}\n\n${orderDetails}`;
};
