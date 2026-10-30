import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Shield, ChevronDown, Check, UserCheck, RefreshCw } from 'lucide-react';

export const RoleSwitcherBadge: React.FC = () => {
  const { currentUser, switchRole, resetAllData } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { id: Role; label: string; desc: string; color: string }[] = [
    { id: 'customer', label: 'Landowner / Customer', desc: 'Browse catalog, cart, checkout, customer portal', color: 'bg-emerald-700' },
    { id: 'sales_staff', label: 'Sales & Operations Staff', desc: 'Manage leads, orders, inventory, dispatch', color: 'bg-amber-700' },
    { id: 'plantation_manager', label: 'Plantation Manager', desc: 'Site surveys, maintenance, biometrics', color: 'bg-teal-700' },
    { id: 'nursery_staff', label: 'Nursery / Inventory Staff', desc: 'Batches, hardening stages, inspections', color: 'bg-lime-700' },
    { id: 'super_admin', label: 'Super Admin', desc: 'Full business control, CMS, analytics, audit', color: 'bg-rose-800' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch demo role"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#082A21] border border-[#C8A45D]/40 text-xs font-medium text-[#F8F7F1] hover:bg-[#063B2D] transition-colors shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-pulse" />
        <span className="text-[#C8A45D] font-semibold">Demo Role:</span>
        <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
        <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#082A21] border border-[#C8A45D]/30 shadow-2xl z-50 p-3 text-stone-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Demo Role Switcher
              </span>
              <button
                onClick={() => {
                  if (window.confirm('Reset all demo data back to initial state?')) {
                    resetAllData();
                    setIsOpen(false);
                  }
                }}
                className="text-[10px] text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Reset all demo data"
              >
                <RefreshCw className="w-3 h-3" /> Reset Data
              </button>
            </div>

            <p className="text-[11px] text-stone-400 mb-2">
              Switch roles to experience each dedicated interface without login friction:
            </p>

            <div className="space-y-1.5">
              {roles.map(r => {
                const isSelected = currentUser.role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 text-xs ${
                      isSelected
                        ? 'bg-[#063B2D] border border-[#087F5B] text-white font-medium'
                        : 'hover:bg-white/5 text-stone-300'
                    }`}
                  >
                    <div className={`mt-0.5 w-2 h-2 rounded-full ${r.color} shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{r.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#22C55E]" />}
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5 leading-tight">{r.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
