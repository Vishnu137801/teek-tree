import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let bg = 'bg-[#063B2D] text-white border-[#087F5B]';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />;

        if (toast.type === 'error') {
          bg = 'bg-[#1a0f12] text-white border-[#DC3545]';
          icon = <AlertCircle className="w-5 h-5 text-[#DC3545] shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-[#261f0e] text-white border-[#C8A45D]';
          icon = <AlertCircle className="w-5 h-5 text-[#C8A45D] shrink-0" />;
        } else if (toast.type === 'info') {
          bg = 'bg-[#082A21] text-white border-[#48A868]';
          icon = <Info className="w-5 h-5 text-[#A8C8A0] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${bg}`}
          >
            {icon}
            <div className="flex-1">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              {toast.message && <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              className="text-stone-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
