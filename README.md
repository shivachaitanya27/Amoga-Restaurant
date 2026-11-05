# Amoga Family Restaurant & Management Portal

A modern, responsive full-stack restaurant web application and digital management system tailored for dining, digital ordering, and table reservations.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Google Firebase**.

---

## 🌟 Key Highlights & Features

### 🍽️ Customer-Facing Portal
* **Interactive Digital Menu (62 Items):** Complete categorized dishes across Non-Veg Starters, Veg Starters, Hyderabadi Dum Biryanis, Veg Biryanis, and Chinese Fried Rice.
* **4-Way Card Density Switcher:** Users can browse dishes in **Compact**, **Normal**, **Large**, or **List** views on both mobile and desktop.
* **Light & Dark Theme Toggle:** Persistent theme mode saved in `localStorage` with automatic fallback to system color scheme preferences.
* **Bag & Instant WhatsApp Ordering:** Slide-over order drawer with itemized billing, Home Delivery / Takeaway selection, GPS pin capture, and 1-click WhatsApp order dispatch.
* **Table Reservations:** Dine-in booking system with date/slot pickers, party size selectors, and automated confirmation links.
* **Offers & Specials:** Dynamic promotional coupons and Chef's Daily Special highlights.
* **Customer Reviews & Moderation:** Verified diner feedback display and community submission workflow.
* **Table QR Code Standee:** Generates printable high-resolution QR codes linking customers straight to the digital menu.

### 🛡️ Admin Management Dashboard (`/admin`)
* **Real-time Metrics:** Overview of revenue, active orders, bookings, and menu counts.
* **Menu Management:** Add, edit, or toggle dish availability (In Stock / Sold Out), upload images, and 1-click database seed capability.
* **Orders & Bookings Pipeline:** Track order lifecycle (`New` → `Preparing` → `Ready` → `Completed`) with customer WhatsApp updates.
* **Dynamic Restaurant Configuration:** Easily update operational timings, phone numbers, WhatsApp lines, addresses, and maps without modifying code.
* **Live Website View:** Integrated 1-click preview link in the admin sidebar to review live updates in a separate tab.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (Class-based Dark Mode) |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **Routing** | React Router v6 |
| **Backend / DB** | Google Cloud Firestore, Firebase Auth, Firebase Storage |
| **Hosting & Rules** | Firebase Hosting, Firestore & Storage Security Rules |

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm** or **pnpm** / **yarn**
* A [Firebase Console](https://console.firebase.google.com/) account

### 2. Clone Repository
```bash
git clone https://github.com/your-username/restaurant-management-app.git
cd restaurant-management-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the project root by copying `.env.example`:
```bash
cp .env.example .env
```

Populate the `.env` file with your own Firebase project credentials:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_web_app_id
```

> **Note:** Do not commit `.env` to source control. It is protected by `.gitignore`.

---

## 💻 Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Launches the local development server (default: `http://localhost:5173`) |
| `npm run build` | Runs TypeScript compilation (`tsc`) followed by Vite production build |
| `npm run preview` | Previews the generated production build locally |

---

## 🔒 Security & Best Practices

1. **API Keys Protected:** Environment keys are loaded through Vite runtime (`import.meta.env`) and excluded from source control.
2. **Security Rules:**
   - `firestore.rules`: Enforces public read-only access for menus and settings, restricts write access to authenticated administrators, and validates customer order and review payloads.
   - `storage.rules`: Grants public read for dishes and gallery images while locking upload/delete permissions strictly to authenticated admin users.
3. **Safe Offline Fallback:** If Firebase credentials are not supplied, the app smoothly falls back to local data simulations to facilitate testing and UI review.

---

## 📄 License
This project is proprietary and intended for restaurant management and digital operations.
