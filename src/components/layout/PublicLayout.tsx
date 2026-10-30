import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../ui/ToastContainer';
import { MessageSquare, PhoneCall } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1] text-[#172820]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2.5">
        <a
          href="https://wa.me/918790431313?text=Hello%20Mother%20Biotech,%20I%20am%20interested%20in%20clonal%20teak%20plants"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform font-medium text-xs border border-white/20"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  );
};
