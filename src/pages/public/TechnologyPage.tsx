import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Microscope,
  Sprout,
  TreeDeciduous,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Layers,
  Thermometer,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stages = [
    {
      step: 1,
      title: 'Plus-Tree Selection',
      subtitle: 'Genetic Screening of 40+ Year Maternal Trees',
      description: 'The process begins in natural forests and elite plantations where candidate plus-trees (CPTs) with exemplary timber traits are selected. Candidate trees must possess an unbranched clear bole exceeding 8 meters, low fluting, high heartwood-to-sapwood ratio, and proven resistance to leaf defoliators.',
      technicalDetails: [
        'Biometric auditing of diameter at breast height (DBH) and apical dominance',
        'Chemical indexing of natural tectoquinone and core lignin concentration',
        'Strict disease and phytoplasma health screening before collection',
      ],
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
      duration: '4 - 6 Months Field Auditing',
    },
    {
      step: 2,
      title: 'Sterile Culture Initiation',
      subtitle: 'Meristematic Shoot-Tip Decontamination',
      description: 'Actively growing juvenile nodal cuttings and shoot tips are brought to the Mother Biotech biotechnology cleanroom. Under laminar airflow cabinets, tissues undergo multi-step surface sterilization using mercuric chloride and sodium hypochlorite before aseptic inoculation onto initial agar media.',
      technicalDetails: [
        'Disinfection efficiency target: > 96% sterile aseptic explant recovery',
        'Optimized Murashige & Skoog (MS) basal salts with sucrose energy matrix',
        'Controlled incubation at 25 ± 2°C, 16-hour photoperiod under 3,000 lux illumination',
      ],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      duration: '30 - 45 Days Laboratory Phase',
    },
    {
      step: 3,
      title: 'Clonal Shoot Proliferation',
      subtitle: 'Multiplication Cycle without Somaclonal Variation',
      description: 'Sterile shoot explants are transferred to specialized multiplication media containing balanced cytokinin-to-auxin ratios (6-benzylaminopurine and kinetin). Lateral axillary buds break dormancy, multiplying into dense clusters of identical true-to-type micro-shoots.',
      technicalDetails: [
        'Proliferation multiplication factor: 4.5x to 5.2x per monthly subculture',
        'Micro-shoots periodically screened with SSR molecular markers to ensure true-to-type fidelity',
        'Sub-culturing performed strictly within validated passage limits to prevent genetic mutation',
      ],
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      duration: '60 - 90 Days Sub-culturing',
    },
    {
      step: 4,
      title: 'Ex-Vitro Root Induction',
      subtitle: 'Taproot Induction Protocol',
      description: 'Healthy micro-shoots are harvested and subjected to a proprietary IBA (Indole-3-butyric acid) liquid dip. Rather than producing tangled, fragile in-vitro roots inside agar, shoots are moved straight to ex-vitro root plugs, stimulating a robust primary taproot and lateral root hairs.',
      technicalDetails: [
        'Ex-vitro root induction success rate: 94.6%',
        'Sterilized mini-plug matrix of cocopeat, horticultural perlite, and bio-stimulants',
        'Encourages strong geotropic downward root penetration',
      ],
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      duration: '21 - 28 Days High-Humidity Misting',
    },
    {
      step: 5,
      title: 'Greenhouse Acclimatization',
      subtitle: '120-Day Primary & Secondary Hardening',
      description: 'Newly rooted micro-cuttings transition to automated high-humidity greenhouse mist chambers (85-90% RH). Humidity is systematically stepped down over 4 weeks as cuticle waxes thicken and stomatal control activates, preparing plantlets for natural transpiration.',
      technicalDetails: [
        'High-pressure fogging system with automated sensor feedback',
        'Gradual exposure to photosynthetic active radiation (PAR) up to 25,000 lux',
        'Inoculation with beneficial mycorrhizae and Trichoderma viride',
      ],
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      duration: '45 - 60 Days Climate Conditioning',
    },
    {
      step: 6,
      title: 'Nursery Hardening & Grading',
      subtitle: 'Outdoor Sunlight Sun-Hardening in Root-Trainers',
      description: 'Plantlets are potted into UV-stabilized root-trainer containers and moved to 50% shade houses, then into full outdoor sunlight. Agronomists rigorously grade each batch for collar thickness, stem straightness, and healthy root plugs, discarding any undersized saplings.',
      technicalDetails: [
        'Minimum height threshold: 45 cm (1.5 ft) before release approval',
        'Lignified stem collar diameter: > 4.5 mm',
        'Dense fibrous root plug that holds together firmly upon removal',
      ],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg',
      duration: '45 - 60 Days Open Nursery',
    },
    {
      step: 7,
      title: 'Plantation Field Establishment',
      subtitle: "Nature's Canopy Precision Drip Plantation",
      description: 'The hardened clonal sapling is dispatched to your estate in protective crates. Planted in solarized, organic-enriched 45cm augered pits alongside pressure-compensating drip laterals, the sapling achieves 96%+ survival and begins accelerated vegetative height growth.',
      technicalDetails: [
        'GPS aligned 3.5m × 3.5m spacing (350 plants/acre)',
        'Immediate root hydration via 4 LPH inline dripper',
        'Bi-annual silvicultural side debudding up to 6-8 meters',
      ],
      image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.13_8f0af055.jpeg',
      duration: 'Ongoing Commercial Lifecycle',
    },
  ];

  const comparison = [
    {
      factor: 'Genetic Uniformity',
      conventional: 'High variability (seed parents unknown, uneven tree sizes)',
      clonal: '100% true-to-type uniform growth from selected plus-trees',
    },
    {
      factor: 'Bole Straightness & Fluting',
      conventional: 'Frequent crooked stems, basal fluting, and early bifurcation',
      clonal: 'Cylindrical straight timber boles up to 7-9 meters with minimal fluting',
    },
    {
      factor: 'Heartwood Formation',
      conventional: 'Delayed (often after 8-10 years), low heartwood ratio',
      clonal: 'Accelerated heartwood induction (initiates by Year 5-6 under fertigation)',
    },
    {
      factor: 'Transplanting Shock',
      conventional: 'High mortality (stump planting suffers 20-30% replacement losses)',
      clonal: 'Root-trainer plug establishes immediately with 95%+ field survival',
    },
    {
      factor: 'Branching & Knotting',
      conventional: 'Excessive heavy side branching requiring constant heavy cutting',
      clonal: 'Early self-pruning habit and vertical apical dominance, minimizing knots',
    },
    {
      factor: 'Harvest Homogeneity',
      conventional: 'Uneven maturity; requires piecemeal harvesting over many years',
      clonal: 'Uniform diameter distribution allows scheduled commercial clear-cut',
    },
  ];

  const faqs = [
    {
      q: 'What is the fundamental scientific advantage of tissue-culture teak over seedling teak?',
      a: 'Teak is naturally cross-pollinated, meaning seeds from a great tree inherit wild, unpredictable genetics from unknown male parents. Tissue-culture micropropagation uses vegetative nodal tissue from a verified specimen tree, producing an exact genetic twin with guaranteed timber straightness, rapid girth expansion, and disease resilience.',
    },
    {
      q: 'Does tissue-culture teak form a deep taproot?',
      a: 'Yes. Our specialized ex-vitro root induction protocol stimulates geotropic primary downward taproots alongside an extensive fibrous lateral root hair matrix. Unlike old stump-planting techniques that often cause taproot rotting, our root-trainer saplings penetrate deep into the subsoil rapidly.',
    },
    {
      q: 'How many plants should be planted per acre?',
      a: 'The recommended standard for commercial timber is 350 plants per acre (approx. 3.5m × 3.5m spacing), as benchmarked in our Nature’s Canopy 350-acre model estate proposal. For agroforestry with cash intercrops (turmeric, ginger, watermelon) in early years, a 4.5m × 2.5m spacing is also popular.',
    },
    {
      q: 'Is drip irrigation essential for clonal teak?',
      a: 'While teak can survive on natural monsoon rainfall, precision drip irrigation during the dry summer months prevents vegetative dormancy and elevates annual radial girth expansion by up to 35-40%. Drip fertigation also delivers water-soluble nutrients directly to the active root zone with zero water waste.',
    },
    {
      q: 'How are Mother Biotech saplings transported without damage?',
      a: 'Saplings are shipped in protective, well-ventilated wooden and polymer crates holding individual root-trainers. The root ball is intact in its sterilized substrate, meaning zero root disturbance or leaf bruising during interstate road transit.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO */}
      <section className="relative py-28 bg-[#082A21] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Microscope className="w-4 h-4" /> Botanical Biotechnology
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Science Behind Every Sapling
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Delivering genetic precision and silvicultural excellence through sterile micropropagation, secondary hardening, and scientific clonal selection.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE 7-STAGE PROCESS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            The Propagation Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            7-Stage Micropropagation Process
          </h2>
          <p className="text-xs text-stone-600 mt-2">
            Click any stage below to inspect the sterile laboratory protocols and field acclimatization metrics.
          </p>
        </div>

        {/* Stage Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2 border-b border-[#E2E4D8] scrollbar-thin">
          {stages.map((st, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={st.step}
                onClick={() => setActiveStage(idx)}
                className={`px-4 py-3 rounded-2xl text-left whitespace-nowrap transition-all shrink-0 flex items-center gap-2.5 border ${
                  isSelected
                    ? 'bg-[#063B2D] text-white border-[#087F5B] shadow-md font-semibold'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    isSelected ? 'bg-[#C8A45D] text-[#082A21]' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {st.step}
                </span>
                <span className="text-xs">{st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="mt-8 bg-white rounded-3xl border border-[#E2E4D8] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] bg-[#F1F2E8] px-3 py-1 rounded-full">
                Stage {stages[activeStage].step} of 7
              </span>
              <span className="text-xs font-semibold text-[#C8A45D] bg-[#082A21] px-3 py-1 rounded-full">
                {stages[activeStage].duration}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D]">
              {stages[activeStage].title}
            </h3>
            <p className="text-xs font-medium text-stone-500 italic">
              {stages[activeStage].subtitle}
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase text-[#063B2D] tracking-wider">
                Technical Specifications & Controls:
              </h4>
              {stages[activeStage].technicalDetails.map((tech, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={() => setActiveStage(prev => (prev > 0 ? prev - 1 : 0))}
                disabled={activeStage === 0}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold disabled:opacity-40 hover:bg-stone-50"
              >
                Previous Stage
              </button>
              <button
                onClick={() => setActiveStage(prev => (prev < stages.length - 1 ? prev + 1 : prev))}
                disabled={activeStage === stages.length - 1}
                className="px-5 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#063B2D] shadow"
              >
                Next Stage
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-stone-100 bg-stone-100 h-96">
            <img
              src={stages[activeStage].image}
              alt={stages[activeStage].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#082A21]/90 backdrop-blur-md p-3.5 rounded-xl text-white text-xs border border-white/10">
              <span className="text-[#C8A45D] font-bold block text-[10px] uppercase">Scientific Milestone</span>
              {stages[activeStage].subtitle}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONVENTIONAL VS TISSUE-CULTURE COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Empirical Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            Conventional Seedlings vs. Clonal Tissue-Culture
          </h2>
          <p className="text-xs text-stone-600 mt-2">
            Examining why professional commercial forestry estates universally mandate certified clonal planting stock.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#082A21] text-white border-b border-stone-800">
                <tr>
                  <th className="p-4 sm:p-5 font-serif font-bold text-sm w-1/4">Silvicultural Metric</th>
                  <th className="p-4 sm:p-5 font-semibold text-rose-300 w-3/8">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400" /> Conventional Wild Seed / Stump
                    </span>
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-300 w-3/8 bg-[#063B2D]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Mother Biotech Clonal Teak
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparison.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F1]/60'}>
                    <td className="p-4 sm:p-5 font-bold text-[#063B2D]">{row.factor}</td>
                    <td className="p-4 sm:p-5 text-stone-600 leading-relaxed">{row.conventional}</td>
                    <td className="p-4 sm:p-5 text-[#063B2D] font-medium leading-relaxed bg-[#087F5B]/5">
                      {row.clonal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Agronomic Clarifications
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#063B2D]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E4D8] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-[#063B2D] hover:text-[#087F5B] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#087F5B]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#F8F7F1]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#063B2D] text-white p-10 rounded-3xl border border-[#C8A45D]/40 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to Inspect Our Nine Clonal Varieties?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Discover which of the MBT-1 through MBT-9 clones provides the optimal fit for your regional soil type and water availability.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/clones"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow"
            >
              Explore Nine Teak Clones
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8A45D] font-semibold text-xs tracking-wide border border-white/20"
            >
              Order Clonal Saplings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
