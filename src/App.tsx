import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { TechnologyPage } from './pages/public/TechnologyPage';
import { ShopPage } from './pages/public/ShopPage';
import { PlantDetailPage } from './pages/public/PlantDetailPage';
import { ClonesPage } from './pages/public/ClonesPage';
import { PlantationServicesPage } from './pages/public/PlantationServicesPage';
import { PlantationCalculatorPage } from './pages/public/PlantationCalculatorPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';
import { CartPage } from './pages/public/CartPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { OrderSuccessPage } from './pages/public/OrderSuccessPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboards
import { CustomerPortal } from './pages/customer/CustomerPortal';
import { SalesOperationsPortal } from './pages/operations/SalesOperationsPortal';
import { PlantationOperationsPortal } from './pages/operations/PlantationOperationsPortal';
import { NurseryOperationsPortal } from './pages/operations/NurseryOperationsPortal';
import { AdminPortal } from './pages/admin/AdminPortal';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:slug" element={<PlantDetailPage />} />
            <Route path="/clones" element={<ClonesPage />} />
            <Route path="/plantation-services" element={<PlantationServicesPage />} />
            <Route path="/plantation-calculator" element={<PlantationCalculatorPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<LoginPage />} />
          </Route>

          {/* Customer Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <CustomerPortal />
              </DashboardLayout>
            }
          />

          {/* Plantation Manager Dashboard (Specific Nature's Canopy Operations) */}
          <Route
            path="/operations/plantations/*"
            element={
              <DashboardLayout>
                <PlantationOperationsPortal />
              </DashboardLayout>
            }
          />

          {/* Nursery Staff Dashboard */}
          <Route
            path="/operations/nursery/*"
            element={
              <DashboardLayout>
                <NurseryOperationsPortal />
              </DashboardLayout>
            }
          />

          {/* Sales & Operations Dashboard */}
          <Route
            path="/operations/*"
            element={
              <DashboardLayout>
                <SalesOperationsPortal />
              </DashboardLayout>
            }
          />

          {/* Super Admin Dashboard */}
          <Route
            path="/admin/*"
            element={
              <DashboardLayout>
                <AdminPortal />
              </DashboardLayout>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
