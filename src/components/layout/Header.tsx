import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleSwitcherBadge } from '../shared/RoleSwitcherBadge';
import { QuoteRequestModal } from '../shared/QuoteRequestModal';
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  Sprout,
  TreeDeciduous,
  Calculator,
  User,
  Search,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { cartCount, cms, currentUser } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Technology', path: '/technology' },
    { label: 'Shop Plants', path: '/shop' },
    { label: 'Nine Teak Clones', path: '/clones' },
    {
      label: 'Plantation Services',
      path: '/plantation-services',
      badge: "Nature's Canopy",
    },
    { label: 'Calculator', path: '/plantation-calculator' },
    { label: 'Our Projects', path: '/projects' },
    { label: 'Gallery & Research', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    switch (currentUser.role) {
      case 'sales_staff':
        return '/operations';
      case 'plantation_manager':
        return '/operations/plantations';
      case 'super_admin':
        return '/admin';
      case 'customer':
      default:
        return '/dashboard';
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#082A21] border-b border-[#063B2D] text-stone-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#C8A45D] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
              {cms.announcementBanner}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+918790431313"
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#48A868]" />
              <span>Plantation Advisory: {cms.contactPhone}</span>
            </a>
            <div className="h-3 w-px bg-stone-700" />
            <RoleSwitcherBadge />
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#063B2D]/95 backdrop-blur-md border-b border-[#087F5B]/30 transition-all shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#087F5B] to-[#082A21] border border-[#C8A45D]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-[#F8F7F1]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-wide flex items-center gap-1">
                  MOTHER BIOTECH
                </span>
                <span className="text-[10px] tracking-widest text-[#C8A45D] font-semibold uppercase flex items-center gap-1">
                  <span>Tissue-Culture Teak</span>
                  <span className="text-stone-400">×</span>
                  <span className="text-[#A8C8A0]">Nature's Canopy</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-stone-200">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold shadow-inner'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-[#087F5B] text-white font-semibold">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C8A45D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Shopping Cart with ${cartCount} items`}
                className="relative p-2 rounded-xl text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8A45D] text-[#172820] font-bold text-xs flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Portal / Dashboard link */}
              <Link
                to={getDashboardPath()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title={`Go to ${currentUser.role.replace('_', ' ')} portal`}
              >
                <User className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span className="capitalize">{currentUser.role === 'customer' ? 'My Portal' : 'Dashboard'}</span>
              </Link>

              {/* Quote CTA Button */}
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#063B2D] border border-[#C8A45D]/60 text-white font-semibold text-xs tracking-wide hover:shadow-lg hover:border-[#C8A45D] transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Get a Quote</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open navigation menu"
                className="xl:hidden p-2 rounded-xl text-stone-200 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#082A21] border-b border-[#087F5B]/40 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
            <div className="pb-2 border-b border-white/10 flex items-center justify-between">
              <RoleSwitcherBadge />
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#C8A45D] flex items-center gap-1"
              >
                Dashboard <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-[#063B2D] text-white border-l-4 border-[#C8A45D]'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#087F5B] text-white font-semibold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQuoteModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow"
              >
                <Calculator className="w-4 h-4 text-[#C8A45D]" /> Request Plant Quotation
              </button>
              <a
                href="https://wa.me/918790431313"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-stone-200 text-xs font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" /> WhatsApp Enquiry (+91 87904 31313)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Quote Request Modal */}
      <QuoteRequestModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
};
