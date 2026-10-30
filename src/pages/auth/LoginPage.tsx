import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  Sprout,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('landowner@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const quickLoginAs = (role: Role, path: string) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E4D8] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#082A21] flex items-center justify-center text-white">
              <Sprout className="w-5 h-5 text-[#48A868]" />
            </div>
            <span className="font-serif font-bold text-lg text-[#063B2D]">MOTHER BIOTECH</span>
          </Link>
          <h2 className="text-2xl font-serif font-bold text-[#063B2D]">Sign In to Portal</h2>
          <p className="text-xs text-stone-500">Access orders, quotations, and plantation tracking</p>
        </div>

        {/* Demo Role Switcher Quick Access */}
        <div className="bg-[#082A21] p-3.5 rounded-2xl border border-[#C8A45D]/40 text-white space-y-2">
          <span className="text-[10px] text-[#C8A45D] uppercase tracking-wider font-bold block">
            Instant Demo Access (Click to Login As):
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => quickLoginAs('customer', '/dashboard')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#087F5B] text-left transition-colors font-semibold truncate"
            >
              👤 Landowner
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs('sales_staff', '/operations')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#087F5B] text-left transition-colors font-semibold truncate"
            >
              💼 Sales Staff
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs('plantation_manager', '/operations/plantations')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#087F5B] text-left transition-colors font-semibold truncate"
            >
              🌲 Agronomist
            </button>
            <button
              type="button"
              onClick={() => quickLoginAs('super_admin', '/admin')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#087F5B] text-left transition-colors font-semibold truncate"
            >
              ⚙️ Super Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-stone-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F8F7F1] border rounded-xl pl-9 pr-3.5 py-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-stone-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#F8F7F1] border rounded-xl pl-9 pr-9 py-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-stone-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded text-[#087F5B]"
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[#087F5B] hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-bold text-xs shadow-md hover:shadow-xl transition-all"
          >
            Sign In to Customer Portal
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#087F5B] font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};
