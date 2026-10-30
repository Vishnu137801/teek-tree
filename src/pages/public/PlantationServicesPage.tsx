import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Trees,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  Send,
  Droplets,
  Layers,
  ShieldCheck,
  ClipboardList,
  Sparkles,
  Phone,
  FileText,
} from 'lucide-react';

export const PlantationServicesPage: React.FC = () => {
  const { plantationServices, createEnquiry } = useApp();

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'Telangana',
    district: 'Khammam',
    acreage: 25,
    ownership: 'Private Freehold Agricultural Land',
    waterAvailability: 'Borewell Hydrology Available',
    timeline: 'Within 3 to 6 Months',
    requirements: 'Interested in turnkey estate development with MBT-1 clonal saplings and automated drip irrigation.',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Planning' | 'Establishment' | 'Irrigation & Infrastructure' | 'Maintenance & Care'>('All');

  const filteredServices = plantationServices.filter(s =>
    activeFilter === 'All' ? true : s.category === activeFilter
  );

  const journeySteps = [
    { step: 1, title: 'Consultation', desc: 'Initial briefing on land goals, financial models, and timeline.' },
    { step: 2, title: 'Site Survey', desc: 'Topographic contour mapping, core soil sampling, and water aquifer analysis.' },
    { step: 3, title: 'Master Planning', desc: 'CAD engineering for row alignments, drip hydraulics, and firebreak corridors.' },
    { step: 4, title: 'Quotation', desc: 'Itemized transparent estimation covering machinery, saplings, and irrigation.' },
    { step: 5, title: 'Agreement', desc: 'Formal execution contract specifying milestones, warranty, and survival guarantees.' },
    { step: 6, title: 'Land Prep', desc: 'Deep cross-ripping, rock clearing, perimeter solar fencing, and auger pitting.' },
    { step: 7, title: 'Planting', desc: 'Mother Biotech clonal sapling dispatch, enriched refilling, and baseline hydration.' },
    { step: 8, title: 'Maintenance', desc: 'Regular organic fertigation, debudding, silvicultural pruning, and weed suppression.' },
    { step: 9, title: 'Biometric Audits', desc: 'Quarterly girth caliper measurements, drone multispectral NDVI scans, and client reports.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createEnquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      category: 'Plantation Development',
      productInterest: `Turnkey Plantation Service (${formData.acreage} Acres)`,
      acreage: formData.acreage,
      location: `${formData.district}, ${formData.state}`,
      message: `Ownership: ${formData.ownership}, Water: ${formData.waterAvailability}, Timeline: ${formData.timeline}. Notes: ${formData.requirements}`,
      status: 'new',
      source: 'Plantation Page',
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* 1. NATURE'S CANOPY HERO */}
      <section className="relative py-28 bg-[#082A21] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest shadow">
            <Trees className="w-4 h-4" /> Nature's Canopy Plantation Services
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Your Land. Our Expertise. <br />
            <span className="text-[#C8A45D] italic">A Greener Future.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed">
            Comprehensive teak plantation planning, establishment, and life-cycle management. We convert agricultural land into high-yielding timber estates.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href="#consultation-form"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all"
            >
              Book On-Site Land Survey
            </a>
            <Link
              to="/plantation-calculator"
              className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide backdrop-blur-md border border-white/20 transition-all"
            >
              Calculate 350-Tree Model Cost
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PLANTATION JOURNEY TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Structured Execution Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            The Plantation Development Journey
          </h2>
          <p className="text-xs text-stone-600 mt-2">
            A milestone-governed workflow ensuring precision execution from raw land to timber forest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {journeySteps.map(step => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-4 border border-[#E2E4D8] shadow-sm flex flex-col justify-between space-y-2 relative group hover:border-[#087F5B] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-[#087F5B] text-white font-bold text-xs flex items-center justify-center shadow">
                  {step.step}
                </span>
                <span className="text-[10px] text-stone-400 font-semibold">Phase {step.step}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#063B2D] leading-tight">{step.title}</h4>
                <p className="text-[10px] text-stone-500 mt-1 leading-snug line-clamp-3">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 16 DETAILED SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
              Full-Spectrum Capabilities
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#063B2D]">
              Our Professional Services
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Planning', 'Establishment', 'Irrigation & Infrastructure', 'Maintenance & Care'].map(
              cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat as any)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                    activeFilter === cat
                      ? 'bg-[#087F5B] text-white border-[#087F5B] font-semibold shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#082A21]/90 backdrop-blur-md text-[#C8A45D] text-[10px] font-bold">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#172820] group-hover:text-[#087F5B] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Key Benefits:</span>
                    {service.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#consultation-form"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      requirements: `Enquiring specifically about ${service.title} service.`,
                    }))
                  }
                  className="w-full block text-center py-2 rounded-xl bg-[#F1F2E8] hover:bg-[#087F5B] hover:text-white text-[#063B2D] text-xs font-semibold transition-colors"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3B. ON-GROUND NURSERY CAPACITY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E4D8] shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 group h-80">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg"
              alt="Skilled nursery personnel in uniform tending thousands of hardened clonal teak saplings in structured nursery beds"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#082A21] text-[#C8A45D] text-[10px] font-bold border border-[#C8A45D]/40">
              Commercial Hardening Nursery
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block">
              Scale & Silvicultural Precision
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D] leading-tight">
              From Our Central Acclimatization Nursery to Your Estate
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every turnkey project executed by Nature’s Canopy is supplied directly from Mother Biotech’s central micropropagation and secondary hardening houses. Our trained workforce inspects each individual root-trainer plug for taproot architecture, collar lignification, and pathogen freedom before release.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#F8F7F1] rounded-xl border border-stone-200">
                <strong className="block text-[#063B2D] text-sm">100,000+ Annual Capacity</strong>
                <span className="text-[11px] text-stone-500">Uniform batch propagation</span>
              </div>
              <div className="p-3 bg-[#F8F7F1] rounded-xl border border-stone-200">
                <strong className="block text-[#087F5B] text-sm">96%+ Field Survival Rate</strong>
                <span className="text-[11px] text-stone-500">Ex-vitro taproot induction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CONSULTATION BOOKING FORM */}
      <section id="consultation-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082A21] rounded-3xl p-8 sm:p-12 text-white border border-[#C8A45D]/40 shadow-2xl">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D]">
              Direct Agronomist Booking
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Schedule Your Land Assessment & Plantation Survey
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Complete this intake form to receive a site feasibility review from our plantation engineering team. Submissions are tracked directly in operations.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#063B2D] p-8 rounded-2xl border border-[#22C55E] text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h4 className="text-2xl font-serif font-bold text-white">
                Consultation Request Registered
              </h4>
              <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your request for a {formData.acreage}-acre survey in {formData.district}, {formData.state} has been assigned to Nature’s Canopy regional field officers.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                >
                  Submit Another Project Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="+91 "
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Land Area (Acres) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.acreage}
                    onChange={e => setFormData({ ...formData, acreage: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Land Ownership Status</label>
                  <select
                    value={formData.ownership}
                    onChange={e => setFormData({ ...formData, ownership: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option>Private Freehold Agricultural Land</option>
                    <option>Family Estate / Joint Ownership</option>
                    <option>Corporate Farmland</option>
                    <option>Leasehold Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Water Availability</label>
                  <select
                    value={formData.waterAvailability}
                    onChange={e => setFormData({ ...formData, waterAvailability: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option>Borewell Hydrology Available</option>
                    <option>Canal or River Access</option>
                    <option>Farm Pond / Reservoir</option>
                    <option>Need Borewell Drilling Guidance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Preferred Planting Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option>Immediate / Next 30 Days</option>
                    <option>Within 3 to 6 Months</option>
                    <option>Upcoming Monsoon Season</option>
                    <option>Exploratory Planning Phase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Additional Project Details or Questions</label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Plantation Consultation Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
