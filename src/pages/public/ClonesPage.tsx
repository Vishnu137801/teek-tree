import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TeakClone } from '../../types';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  Sprout,
  CheckCircle2,
  Scale,
  Sparkles,
  ChevronRight,
  Calculator,
  Compass,
  ArrowRight,
  X,
  Send,
  Droplets,
  Layers,
  Thermometer,
} from 'lucide-react';

export const ClonesPage: React.FC = () => {
  const { clones, createEnquiry } = useApp();
  const [searchParams] = useSearchParams();

  // Active Clone Modal Drawer
  const [activeCloneModal, setActiveCloneModal] = useState<TeakClone | null>(() => {
    const pre = searchParams.get('selected');
    return clones.find(c => c.id === pre) || null;
  });

  // 3-Clone Comparison Selection
  const [comparisonIds, setComparisonIds] = useState<string[]>(['MBT-1', 'MBT-2', 'MBT-3']);

  // Recommendation Form State
  const [recState, setRecState] = useState('Telangana');
  const [recDistrict, setRecDistrict] = useState('Warangal');
  const [recAcreage, setRecAcreage] = useState(15);
  const [recSoil, setRecSoil] = useState('Red Sandy Loam');
  const [recWater, setRecWater] = useState('Borewell with Drip Available');
  const [recObjective, setRecObjective] = useState('Maximum Commercial Timber Board-Foot Volume');
  const [recName, setRecName] = useState('');
  const [recPhone, setRecPhone] = useState('');
  const [recEmail, setRecEmail] = useState('');
  const [recSubmitted, setRecSubmitted] = useState(false);
  const [recommendedClone, setRecommendedClone] = useState<string>('MBT-1');

  // Quote Modal State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCloneForQuote, setSelectedCloneForQuote] = useState<TeakClone | null>(null);

  const toggleComparison = (id: string) => {
    if (comparisonIds.includes(id)) {
      setComparisonIds(prev => prev.filter(c => c !== id));
    } else {
      if (comparisonIds.length >= 3) {
        setComparisonIds(prev => [...prev.slice(1), id]);
      } else {
        setComparisonIds(prev => [...prev, id]);
      }
    }
  };

  const handleRecommendationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine smart recommendation
    let best = 'MBT-1';
    if (recSoil.toLowerCase().includes('black') || recWater.toLowerCase().includes('rainfed')) {
      best = 'MBT-2';
    } else if (recObjective.toLowerCase().includes('girth') || recSoil.toLowerCase().includes('alluvial')) {
      best = 'MBT-3';
    } else if (recObjective.toLowerCase().includes('intercrop')) {
      best = 'MBT-6';
    }

    setRecommendedClone(best);

    createEnquiry({
      fullName: recName,
      email: recEmail,
      phone: recPhone,
      category: 'Clone Information',
      productInterest: `Recommended Clone: ${best} for ${recAcreage} Acres in ${recDistrict}, ${recState}`,
      acreage: recAcreage,
      location: `${recDistrict}, ${recState}`,
      message: `Soil: ${recSoil}, Water: ${recWater}, Objective: ${recObjective}.`,
      status: 'new',
      source: 'Clone Page',
    });

    setRecSubmitted(true);
  };

  const comparedClones = clones.filter(c => comparisonIds.includes(c.id));

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO */}
      <section className="relative py-24 bg-[#082A21] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Sprout className="w-4 h-4" /> Selected Genetic Lines
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            The Nine Teak Clones
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Standardized identifiers MBT-1 through MBT-9. Isolated from superior maternal plus-trees for targeted performance across India's micro-climates.
          </p>
        </div>
      </section>

      {/* 2. NINE CLONE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#063B2D]">
              Clonal Variety Directory
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Select any clone to inspect laboratory genetics or add to the 3-clone comparison tool.
            </p>
          </div>
          <div className="text-xs text-stone-500 bg-[#F1F2E8] px-3.5 py-2 rounded-xl border border-[#E2E4D8]">
            Comparing <strong className="text-[#087F5B]">{comparisonIds.length}/3</strong> Clones
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clones.map(clone => {
            const isCompared = comparisonIds.includes(clone.id);

            return (
              <div
                key={clone.id}
                className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={clone.image}
                      alt={clone.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-[#082A21] text-[#C8A45D] font-bold text-xs shadow border border-[#C8A45D]/40">
                        {clone.id}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#087F5B] text-[11px] font-bold shadow">
                        {clone.stockAvailability}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif font-bold text-xl text-[#172820] group-hover:text-[#087F5B] transition-colors">
                      {clone.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {clone.tagline}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-stone-600 border-t border-stone-100 pt-3">
                      <div>
                        <strong className="text-[#063B2D]">Soil:</strong> {clone.soilSuitability.join(', ')}
                      </div>
                      <div>
                        <strong className="text-[#063B2D]">Rainfall:</strong> {clone.rainfallRequirement}
                      </div>
                      <div>
                        <strong className="text-[#063B2D]">Lab Batch:</strong> {clone.laboratoryBatch}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2 border-t border-stone-100">
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <button
                      onClick={() => setActiveCloneModal(clone)}
                      className="py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
                    >
                      Dossier Details
                    </button>
                    <button
                      onClick={() => toggleComparison(clone.id)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
                        isCompared
                          ? 'bg-[#087F5B] text-white shadow'
                          : 'bg-[#F1F2E8] text-[#063B2D] hover:bg-stone-200'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {isCompared ? 'Compared' : 'Compare'}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCloneForQuote(clone);
                      setQuoteModalOpen(true);
                    }}
                    className="w-full py-2 rounded-xl bg-[#063B2D] hover:bg-[#087F5B] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#C8A45D]" /> Request Quote for {clone.id}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 3-CLONE SIDE-BY-SIDE COMPARISON TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E2E4D8] p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B]">
                Comparative Evaluation
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#063B2D]">
                Side-by-Side Clone Comparison
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              Select any 3 clones above to benchmark their traits.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="p-3 w-1/4 font-serif font-bold text-sm text-[#063B2D]">Trait / Attribute</th>
                  {comparedClones.map(c => (
                    <th key={c.id} className="p-3 font-serif font-bold text-base text-[#082A21] bg-[#F8F7F1]/80 rounded-t-xl">
                      <div className="flex items-center justify-between">
                        <span>{c.id} - {c.name}</span>
                        <button
                          onClick={() => toggleComparison(c.id)}
                          className="text-stone-400 hover:text-rose-600 text-xs font-normal"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Soil Suitability</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 text-stone-600">{c.soilSuitability.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Rainfall Requirement</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 text-stone-600">{c.rainfallRequirement}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Growth Habit</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 text-stone-600">{c.growthCharacteristics}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Recommended Spacing</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 text-stone-600">{c.recommendedSpacing}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Timber & Grain Characteristics</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 text-stone-600">{c.timberCharacteristics}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-800">Stock Status</td>
                  {comparedClones.map(c => (
                    <td key={c.id} className="p-3 font-bold text-[#087F5B]">{c.stockAvailability} ({c.availableUnits.toLocaleString()} units)</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. "REQUEST CLONE RECOMMENDATION" FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082A21] rounded-3xl p-8 sm:p-12 text-white border border-[#C8A45D]/40 shadow-2xl">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D]">
              Agronomic Matching Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Request Site-Specific Clone Recommendation
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Tell us your land location, soil condition, and irrigation capabilities. Our agronomists will analyze your parameters and recommend the ideal MBT clone selection.
            </p>
          </div>

          {recSubmitted ? (
            <div className="bg-[#063B2D] p-6 rounded-2xl border border-[#22C55E] space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h4 className="text-xl font-serif font-bold text-white">
                Recommendation Prepared: <span className="text-[#C8A45D]">{recommendedClone}</span>
              </h4>
              <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                Based on your {recAcreage}-acre plot in {recDistrict}, {recState} ({recSoil}), <strong>{recommendedClone}</strong> offers the highest projected vigor and survival profile. Our regional field officer will connect with you via phone shortly.
              </p>
              <button
                onClick={() => setRecSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRecommendationSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={recState}
                    onChange={e => setRecState(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="e.g. Telangana / Andhra Pradesh / Maharashtra"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">District / Taluk *</label>
                  <input
                    type="text"
                    required
                    value={recDistrict}
                    onChange={e => setRecDistrict(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="e.g. Nalgonda, Khammam, Solapur"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Land Area (Acres) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={recAcreage}
                    onChange={e => setRecAcreage(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Soil Type *</label>
                  <select
                    value={recSoil}
                    onChange={e => setRecSoil(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option>Red Sandy Loam</option>
                    <option>Black Cotton Soil</option>
                    <option>Alluvial / Silt Loam</option>
                    <option>Lateritic / Gravelly Soil</option>
                    <option>Coastal Sandy Plain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Water Availability *</label>
                  <select
                    value={recWater}
                    onChange={e => setRecWater(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option>Borewell with Drip Available</option>
                    <option>Canal / River Basin Water</option>
                    <option>Farm Pond Buffer</option>
                    <option>Monsoon Rainfed Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Primary Planting Objective</label>
                <select
                  value={recObjective}
                  onChange={e => setRecObjective(e.target.value)}
                  className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                >
                  <option>Maximum Commercial Timber Board-Foot Volume</option>
                  <option>Drought Resilience & Low Water Requirement</option>
                  <option>Agroforestry with Intercrops (Turmeric, Ginger)</option>
                  <option>Termite Resistance for Outdoor Construction</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-800">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={recName}
                    onChange={e => setRecName(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={recPhone}
                    onChange={e => setRecPhone(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="+91 "
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={recEmail}
                    onChange={e => setRecEmail(e.target.value)}
                    className="w-full bg-[#063B2D] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Generate Agronomic Recommendation
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CLONE DETAIL MODAL DRAWER */}
      {activeCloneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 text-stone-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveCloneModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
              aria-label="Close clone drawer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#063B2D] text-[#C8A45D] font-bold text-sm border border-[#C8A45D]/40">
                {activeCloneModal.id}
              </span>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">{activeCloneModal.name}</h3>
                <span className="text-xs text-[#48A868] font-medium">{activeCloneModal.stockAvailability}</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {activeCloneModal.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#063B2D] p-4 rounded-2xl border border-stone-800">
              <div>
                <span className="text-stone-400 block text-[11px]">Recommended Soil Types:</span>
                <strong className="text-white">{activeCloneModal.soilSuitability.join(', ')}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Annual Rainfall Regime:</span>
                <strong className="text-white">{activeCloneModal.rainfallRequirement}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Recommended Spacing:</span>
                <strong className="text-white">{activeCloneModal.recommendedSpacing}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Laboratory Batch:</span>
                <strong className="text-white">{activeCloneModal.laboratoryBatch}</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#C8A45D] uppercase tracking-wider text-[11px]">
                Biotech Traits & Field Highlights:
              </h4>
              {activeCloneModal.technicalHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveCloneModal(null)}
                className="px-4 py-2 text-xs text-stone-400 hover:text-white"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedCloneForQuote(activeCloneModal);
                  setActiveCloneModal(null);
                  setQuoteModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] text-white text-xs font-semibold shadow"
              >
                Request Quotation for {activeCloneModal.id}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={
          selectedCloneForQuote
            ? {
                id: 'clone-pack-' + selectedCloneForQuote.id,
                name: selectedCloneForQuote.name,
                cloneId: selectedCloneForQuote.id,
                price: 120,
                defaultQty: 3500,
              }
            : undefined
        }
      />
    </div>
  );
};
