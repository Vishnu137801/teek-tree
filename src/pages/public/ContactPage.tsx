import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Sprout,
  TreeDeciduous,
  FileText,
  Upload,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { cms, createEnquiry, currentUser } = useApp();

  const [formData, setFormData] = useState({
    fullName: currentUser.name || '',
    phone: currentUser.phone || '',
    email: currentUser.email || '',
    category: 'Buy Teak Plants' as Enquiry['category'],
    productInterest: 'MBT-1 Mother Elite Sapling',
    quantity: 350,
    acreage: 1,
    location: 'Hyderabad, Telangana',
    message: 'Requesting planting guidance and freight availability.',
  });

  const [submittedNumber, setSubmittedNumber] = useState<string | null>(null);

  const categories: Enquiry['category'][] = [
    'Buy Teak Plants',
    'Bulk Plant Order',
    'Clone Information',
    'Plantation Development',
    'Technical Guidance',
    'General Enquiry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = createEnquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      productInterest: formData.productInterest,
      quantity: formData.quantity,
      acreage: formData.acreage,
      location: formData.location,
      message: formData.message,
      status: 'new',
      source: 'Website Contact',
    });

    setSubmittedNumber(created.enquiryNumber);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO */}
      <section className="bg-[#082A21] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#063B2D]">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" /> Technical Agronomy Helpdesk
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Connect with Our Biotechnology Team
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            Reach out for clonal variety selection, nursery availability, bulk freight logistics, or turnkey plantation establishment.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F1F2E8] text-[#087F5B] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#063B2D]">Direct Phone</h3>
            <p className="text-xs text-stone-500">General enquiries & technical support</p>
            <a
              href="tel:+918790431313"
              className="text-sm font-bold text-[#087F5B] hover:underline block pt-1"
            >
              {cms.contactPhone}
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 text-[#128C7E] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#063B2D]">WhatsApp Chat</h3>
            <p className="text-xs text-stone-500">Instant farm photos & clone queries</p>
            <a
              href="https://wa.me/918790431313"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-[#128C7E] hover:underline block pt-1"
            >
              +91 87904 31313
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F1F2E8] text-[#087F5B] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#063B2D]">Official Email</h3>
            <p className="text-xs text-stone-500">Institutional orders & contracts</p>
            <a
              href={`mailto:${cms.contactEmail}`}
              className="text-sm font-bold text-[#087F5B] hover:underline block pt-1"
            >
              {cms.contactEmail}
            </a>
          </div>

          {/* Card 4: Location */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F1F2E8] text-[#087F5B] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#063B2D]">Corporate Campus</h3>
            <p className="text-xs text-stone-500 leading-snug">
              {cms.officeAddress}
            </p>
            <span className="text-[11px] text-[#C8A45D] font-bold block pt-1">
              Mon – Sat: 9:00 AM – 6:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* 3. CONTACT FORM SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E2E4D8] p-8 sm:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B]">
              Intake Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D] mt-1">
              Send an Official Enquiry
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Submissions synchronize into our Operations Dashboard with a real-time tracking reference number.
            </p>
          </div>

          {submittedNumber ? (
            <div className="bg-[#F1F2E8] p-8 rounded-2xl border border-[#087F5B] text-center space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-14 h-14 text-[#22C55E] mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#063B2D]">
                Enquiry Successfully Logged!
              </h3>
              <div className="bg-white py-2 px-4 rounded-xl border border-stone-200 inline-block">
                <span className="text-xs text-stone-500 block">Your Enquiry Reference Number</span>
                <span className="text-lg font-bold text-[#087F5B]">{submittedNumber}</span>
              </div>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. An agronomist from our regional office has received your brief and will connect within 24 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedNumber(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow hover:bg-[#063B2D]"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                    placeholder="e.g. Anand Murthy"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                    placeholder="+91 "
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Enquiry Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Product / Clone Interest</label>
                  <input
                    type="text"
                    value={formData.productInterest}
                    onChange={e => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                    placeholder="e.g. MBT-1 or Commercial Pack"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Plantation Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                    placeholder="District, State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Estimated Quantity (Saplings)</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-800">Land Area (Acres, if relevant)</label>
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={formData.acreage}
                    onChange={e => setFormData({ ...formData, acreage: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-stone-800">Message / Soil & Water Context *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:border-[#087F5B]"
                  placeholder="Tell us about your soil type, borewell yield, timeline, and planting targets..."
                />
              </div>

              <div className="p-3 bg-[#F8F7F1] rounded-2xl border border-dashed border-stone-300 flex items-center justify-between text-stone-500">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#087F5B]" /> Optional Soil Report or Farm Map Upload (Demo)
                </span>
                <span className="text-[10px] bg-white px-2.5 py-1 rounded-lg border font-semibold">Browse File</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#063B2D] text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
