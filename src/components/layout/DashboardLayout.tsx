import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleSwitcherBadge } from '../shared/RoleSwitcherBadge';
import { ToastContainer } from '../ui/ToastContainer';
import {
  Sprout,
  LayoutDashboard,
  ShoppingBag,
  Truck,
  FileText,
  Trees,
  Bookmark,
  User,
  HelpCircle,
  Users,
  Boxes,
  Send,
  CalendarCheck,
  ClipboardList,
  Activity,
  Layers,
  Settings,
  Shield,
  FileSpreadsheet,
  Globe,
  LogOut,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  MapPin,
  Compass,
  CreditCard,
  Bell,
  AlertTriangle,
} from 'lucide-react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, switchRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define Nav Items by Role
  const customerNav = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Order Tracking', path: '/dashboard/tracking', icon: Truck },
    { label: 'My Quotations', path: '/dashboard/quotations', icon: FileText },
    { label: 'Plantation Requests', path: '/dashboard/plantations', icon: Trees },
    { label: 'My Plantation Projects', path: '/dashboard/my-projects', icon: Activity },
    { label: 'Saved Plants', path: '/dashboard/saved', icon: Bookmark },
    { label: 'Addresses', path: '/dashboard/addresses', icon: MapPin },
    { label: 'Payments & Invoices', path: '/dashboard/payments', icon: CreditCard },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/dashboard/profile', icon: User },
    { label: 'Help & Support', path: '/dashboard/support', icon: HelpCircle },
  ];

  const salesNav = [
    { label: 'Overview', path: '/operations', icon: LayoutDashboard },
    { label: 'Leads & Enquiries', path: '/operations/leads', icon: Users },
    { label: 'Quotation Builder', path: '/operations/quotations', icon: FileText },
    { label: 'Orders Processing', path: '/operations/orders', icon: ShoppingBag },
    { label: 'Nursery Inventory', path: '/operations/inventory', icon: Boxes },
    { label: 'Dispatch Logistics', path: '/operations/dispatch', icon: Truck },
    { label: 'Customer Follow-ups', path: '/operations/follow-ups', icon: CalendarCheck },
  ];

  const plantationNav = [
    { label: 'Overview', path: '/operations/plantations', icon: LayoutDashboard },
    { label: 'Managed Projects', path: '/operations/plantations/projects', icon: Trees },
    { label: 'Site Surveys', path: '/operations/plantations/surveys', icon: Compass },
    { label: 'Maintenance Schedule', path: '/operations/plantations/maintenance', icon: ClipboardList },
    { label: 'Growth Biometrics', path: '/operations/plantations/growth', icon: Activity },
    { label: 'Inspection Reports', path: '/operations/plantations/reports', icon: FileSpreadsheet },
  ];

  const nurseryNav = [
    { label: 'Nursery Overview', path: '/operations/nursery', icon: LayoutDashboard },
    { label: 'Nursery Batches', path: '/operations/nursery/batches', icon: Layers },
    { label: 'Growth Stages', path: '/operations/nursery/stages', icon: Sprout },
    { label: 'Stock Movements', path: '/operations/nursery/movements', icon: Boxes },
    { label: 'Quality Inspections', path: '/operations/nursery/inspections', icon: ClipboardList },
    { label: 'Hardening & Readiness', path: '/operations/nursery/hardening', icon: Activity },
    { label: 'Dispatch Prep', path: '/operations/nursery/dispatch', icon: Truck },
    { label: 'Stock Alerts', path: '/operations/nursery/alerts', icon: AlertTriangle },
  ];

  const adminNav = [
    { label: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Products Catalog', path: '/admin/products', icon: Boxes },
    { label: 'Teak Clones (MBT 1-9)', path: '/admin/clones', icon: Sprout },
    { label: 'Inventory & Batches', path: '/admin/inventory', icon: Layers },
    { label: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Clients & Enquiries', path: '/admin/enquiries', icon: Users },
    { label: 'Commercial Quotations', path: '/admin/quotations', icon: FileText },
    { label: 'Plantation Projects', path: '/admin/plantations', icon: Trees },
    { label: 'Staff & Permissions', path: '/admin/staff', icon: Shield },
    { label: 'Website CMS & Media', path: '/admin/cms', icon: Globe },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: TrendingUp },
    { label: 'Payments Ledger', path: '/admin/payments', icon: CreditCard },
    { label: 'Nursery Operations', path: '/admin/nursery', icon: Sprout },
    { label: 'Notifications Center', path: '/admin/notifications', icon: Bell },
    { label: 'Audit Activity', path: '/admin/audit', icon: Activity },
    { label: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  // Adapt Nav & Title dynamically based on route path
  let currentNav = customerNav;
  let portalTitle = 'Customer Portal';
  let portalSubtitle = 'Manage orders, estimates & farm requests';

  if (location.pathname.startsWith('/admin')) {
    currentNav = adminNav;
    portalTitle = 'Super Admin Console';
    portalSubtitle = 'Enterprise control, CMS & analytics';
  } else if (location.pathname.startsWith('/operations/plantations')) {
    currentNav = plantationNav;
    portalTitle = "Nature's Canopy Operations";
    portalSubtitle = 'Agronomy, estate maintenance & biometrics';
  } else if (location.pathname.startsWith('/operations/nursery')) {
    currentNav = nurseryNav;
    portalTitle = 'Nursery Operations';
    portalSubtitle = 'Batch tracking, hardening & quality grading';
  } else if (location.pathname.startsWith('/operations')) {
    currentNav = salesNav;
    portalTitle = 'Sales & Operations';
    portalSubtitle = 'Lead management, quotations & logistics';
  } else {
    currentNav = customerNav;
    portalTitle = 'Customer Portal';
    portalSubtitle = 'Manage orders, estimates & farm requests';
  }

  return (
    <div className="min-h-screen flex bg-[#F1F2E8] text-[#172820]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-50 w-72 bg-[#082A21] text-stone-200 border-r border-[#063B2D] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#063B2D] border border-[#C8A45D]/40 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-5 h-5 text-[#48A868]" />
            </div>
            <div>
              <span className="text-base font-serif font-bold text-white tracking-wide block leading-tight">
                MOTHER BIOTECH
              </span>
              <span className="text-[10px] text-[#C8A45D] font-semibold tracking-wider uppercase">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden p-1 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-[#063B2D]/80 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#087F5B] text-white font-bold flex items-center justify-center text-sm shadow">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
            <p className="text-[10px] text-stone-400 truncate">{currentUser.email}</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-xs font-medium">
          {currentNav.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#087F5B] text-white font-semibold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A8C8A0]'}`} />
                <span className="truncate">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#48A868]" /> Return to Public Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#F8F7F1]/95 backdrop-blur-md border-b border-[#E2E4D8] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-serif font-bold text-[#082A21] leading-tight">
                {portalTitle}
              </h1>
              <p className="text-[11px] text-stone-500 hidden sm:block">{portalSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RoleSwitcherBadge />
            <Link
              to="/"
              className="text-xs font-semibold text-[#087F5B] hover:text-[#063B2D] hidden md:inline-flex items-center gap-1"
            >
              Live Site <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
