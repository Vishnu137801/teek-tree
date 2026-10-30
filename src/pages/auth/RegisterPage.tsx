import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, Lock, Mail, User, Phone, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { addToast } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Landowner / Estate Farmer');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Account Registered!', 'Welcome to Mother Biotech × Nature’s Canopy.');
    navigate('/dashboard');
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
          <h2 className="text-2xl font-serif font-bold text-[#063B2D]">Create Account</h2>
          <p className="text-xs text-stone-500">Register for plant orders and plantation monitoring</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-stone-700">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
              placeholder="e.g. Anand Murthy"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-stone-700">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-stone-700">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-stone-700">Buyer Type</label>
            <select
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
              className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
            >
              <option>Individual Buyer / Hobbyist</option>
              <option>Landowner / Estate Farmer</option>
              <option>Commercial Agroforestry Company</option>
              <option>Nursery Retailer</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-stone-700">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#087F5B]"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-stone-600 text-[11px] pt-1">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="rounded text-[#087F5B]"
            />
            <span>I agree to the Terms of Service & Privacy Policy</span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-bold text-xs shadow-md hover:shadow-xl transition-all"
          >
            Create My Account
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t">
          Already registered?{' '}
          <Link to="/login" className="text-[#087F5B] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
