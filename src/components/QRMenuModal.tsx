import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface QRMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRMenuModal: React.FC<QRMenuModalProps> = ({ isOpen, onClose }) => {
  const { settings } = useRestaurant();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const menuUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/menu` 
    : 'https://amoga.in/menu';

  const handleDownload = () => {
    const svgElement = document.getElementById('amoga-qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 80;
      canvas.height = img.height + 80;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 40, 40);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `Amoga-Menu-QR.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-amoga-creamDark overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amoga-cream hover:bg-amoga-creamDark text-amoga-charcoal transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Card */}
        <div ref={printRef} className="text-center pt-2 pb-4">
          <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-amoga-burgundy to-amoga-orange mb-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-amoga-burgundy font-serif font-bold text-2xl">
              A
            </div>
          </div>

          <h3 className="font-serif text-2xl font-bold text-amoga-burgundy mb-1">
            {settings.restaurantName}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-widest text-amoga-orangeDark mb-5">
            Mayuri Center, Khammam
          </p>

          {/* QR Code Container */}
          <div className="bg-amoga-cream/70 p-6 rounded-2xl inline-block border-2 border-dashed border-amoga-burgundy/30 mb-4 shadow-inner">
            <QRCodeSVG
              id="amoga-qr-svg"
              value={menuUrl}
              size={200}
              level="H"
              includeMargin={true}
              bgColor="#FFF8EF"
              fgColor="#470717"
            />
          </div>

          <p className="text-sm font-bold text-amoga-charcoal mb-1">
            Scan to Browse Menu & Order
          </p>
          <p className="text-xs text-amoga-charcoalLight max-w-xs mx-auto mb-6">
            Place at restaurant tables for easy digital menu browsing and direct pickup ordering.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amoga-creamDark">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amoga-cream hover:bg-amoga-creamDark text-amoga-charcoal font-semibold text-xs sm:text-sm transition-colors border border-amoga-creamDark"
          >
            <Download className="w-4 h-4 text-amoga-orangeDark" />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amoga-burgundy hover:bg-amoga-burgundyDark text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-amoga-goldLight" />
            <span>Print QR Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};

