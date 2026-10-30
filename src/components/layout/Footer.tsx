import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Info,
  Trees,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { cms, clones } = useApp();
  const [legalModal, setLegalModal] = useState<string | null>(null);

  return (
    <footer className="bg-[#082A21] text-stone-300 border-t border-[#063B2D] pt-16 pb-12 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#087F5B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C8A45D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#063B2D] border border-[#C8A45D]/40 flex items-center justify-center text-white shadow-lg">
                <Sprout className="w-7 h-7 text-[#48A868]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                  MOTHER BIOTECH
                </h3>
                <p className="text-[11px] text-[#C8A45D] font-semibold tracking-wider uppercase">
                  Clonal Teak Biotechnology × Nature's Canopy
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
              Pioneering high-yielding tissue-culture clonal teak production backed by 25+ years of biotechnology research and professional turnkey plantation engineering across India.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href="tel:+918790431313"
                className="flex items-center gap-2.5 text-stone-200 hover:text-[#C8A45D] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#48A868]" />
                <span>Call / WhatsApp: <strong>{cms.contactPhone}</strong></span>
              </a>
              <a
                href={`mailto:${cms.contactEmail}`}
                className="flex items-center gap-2.5 text-stone-200 hover:text-[#C8A45D] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#48A868]" />
                <span>{cms.contactEmail}</span>
              </a>
              <div className="flex items-start gap-2.5 text-stone-400">
                <MapPin className="w-4 h-4 text-[#48A868] shrink-0 mt-0.5" />
                <span>{cms.officeAddress}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Our Journey</Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-white transition-colors">Tissue-Culture Science</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop Clonal Plants</Link>
              </li>
              <li>
                <Link to="/clones" className="hover:text-white transition-colors">Nine Teak Clones</Link>
              </li>
              <li>
                <Link to="/plantation-services" className="hover:text-white text-[#A8C8A0] font-semibold transition-colors flex items-center gap-1">
                  Nature's Canopy Services
                </Link>
              </li>
              <li>
                <Link to="/plantation-calculator" className="hover:text-white transition-colors">Plantation Calculator</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Gallery & Research</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Agronomists</Link>
              </li>
            </ul>
          </div>

          {/* Nine Clones Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              Selected Clones
            </h4>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {clones.map(clone => (
                <Link
                  key={clone.id}
                  to={`/clones?selected=${clone.id}`}
                  className="hover:text-[#C8A45D] transition-colors py-0.5 flex items-center justify-between"
                >
                  <span>{clone.id} - {clone.name}</span>
                  <span className="text-[10px] text-stone-500">{clone.stockAvailability}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Plantation Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2 flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-[#C8A45D]" /> Nature's Canopy
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Full-lifecycle estate management:
            </p>
            <ul className="space-y-1.5 text-xs text-stone-300">
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> Land & Soil Survey
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> GPS Layout & Trenching
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> Automated Drip Irrigation
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> Silvicultural Pruning
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> Drone Canopy Telemetry
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#48A868]" /> Quarterly Audit Reports
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Regulatory Disclaimers */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-xl bg-[#063B2D]/50 border border-stone-800 text-[11px] text-stone-400 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
            <div>
              <strong>Scientific & Economic Notice:</strong> Timber volume simulations, tree growth rates, and financial estimates presented across this platform are indicative benchmarks based on research trials under optimal fertigation protocols. Actual commercial outcomes vary according to local soil chemistry, seasonal rainfall, pest vigilance, silvicultural thinning, and future timber commodity pricing. Research associated with Dr. Balakrishna and Mother Biotech reflects over 25 years of ongoing laboratory and field experience.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 pt-2">
            <div>
              © {new Date().getFullYear()} Mother Biotech & Nature's Canopy. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-stone-200 transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-stone-200 transition-colors"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModal('shipping')}
                className="hover:text-stone-200 transition-colors"
              >
                Shipping & Plant Dispatch Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModal('returns')}
                className="hover:text-stone-200 transition-colors"
              >
                Replacement Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modal Popup */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 rounded-2xl p-6 max-w-lg w-full text-stone-200 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-3 capitalize">
              {legalModal.replace('_', ' ')} Policy
            </h3>
            <div className="text-xs text-stone-300 space-y-3 leading-relaxed">
              <p>
                Mother Biotech adheres to strict nursery phytosanitary protocols. All tissue-culture plantlets undergo rigorous virus-indexing and secondary hardening prior to dispatch.
              </p>
              <p>
                <strong>Delivery & Transit:</strong> Saplings are transported in specialized root-trainer trays with protective ventilated wooden or polymer crates. Transit insurance covers physical damage during direct carriage.
              </p>
              <p>
                <strong>Quality Assurance:</strong> If any plantlets arrive with broken stems or wilted root plugs during unloading, report within 48 hours with photographic proof for free nursery replacement buffer release.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
