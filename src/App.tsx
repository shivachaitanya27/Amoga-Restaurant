import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Public Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { PhoneLeadModal } from './components/PhoneLeadModal';
import { CartDrawer } from './components/CartDrawer';

// Public Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { BookTable } from './pages/BookTable';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { Offers } from './pages/Offers';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';

// Admin Pages
import { Login } from './admin/Login';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardOverview } from './admin/DashboardOverview';
import { MenuManagement } from './admin/MenuManagement';
import { OrderManagement } from './admin/OrderManagement';
import { BookingManagement } from './admin/BookingManagement';
import { SettingsManagement } from './admin/SettingsManagement';
import { OffersManagement } from './admin/OffersManagement';
import { GalleryManagement } from './admin/GalleryManagement';
import { ReviewManagement } from './admin/ReviewManagement';
import { LoyaltyManagement } from './admin/LoyaltyManagement';
import { QRManagement } from './admin/QRManagement';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper for Public Pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <PhoneLeadModal />
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
        <Route path="/book-table" element={<PublicLayout><BookTable /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
        <Route path="/offers" element={<PublicLayout><Offers /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="settings" element={<SettingsManagement />} />
          <Route path="offers" element={<OffersManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="loyalty" element={<LoyaltyManagement />} />
          <Route path="qr" element={<QRManagement />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
      </Routes>
    </>
  );
};

export default App;

