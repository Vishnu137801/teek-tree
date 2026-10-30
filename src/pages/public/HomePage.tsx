import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  calculatePlantationEstimates,
  formatINR,
} from '../../utils/calculator';
import {
  Sprout,
  TreeDeciduous,
  Microscope,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar,
  Layers,
  ChevronRight,
  Calculator,
  Compass,
  FileText,
  Phone,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, clones, plantationServices, cms, addToCart, researchArticles, mediaAssets } = useApp();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<any>(null);

  // Quick Calculator Preview State
  const [calcAcreage, setCalcAcreage] = useState<number>(10);
  const quickCalc = calculatePlantationEstimates({
    landArea: calcAcreage,
    unit: 'acres',
    calculationMode: 'density',
    plantsPerAcre: 350,
    saplingUnitPrice: 120,
    mortalityBufferPercent: 5,
    irrigationRequirement: 'drip_complete',
    plantationServiceLevel: 'turnkey_full',
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  const trustHighlights = [
    {
      number: '25+',
      unit: 'Years',
      title: 'Biotechnology Research',
      subtitle: 'Associated with Dr. Balakrishna and elite clonal micropropagation protocols.',
      icon: Microscope,
    },
    {
      number: '9',
      unit: 'Varieties',
      title: 'Selected Teak Clones',
      subtitle: 'MBT-1 through MBT-9 engineered for diverse Indian agro-climatic zones.',
      icon: Sprout,
    },
    {
      number: '100%',
      unit: 'True-to-Type',
      title: 'Tissue-Culture Clones',
      subtitle: 'Uniform cylindrical boles, low knotting, and accelerated radial growth.',
      icon: Award,
    },
    {
      number: '350',
      unit: 'Acres Model',
      title: 'Turnkey Expertise',
      subtitle: "Nature's Canopy plantation planning, drip irrigation, and life-cycle care.",
      icon: TreeDeciduous,
    },
  ];

  const whyMotherBiotech = [
    {
      title: 'Research-Led Micropropagation',
      description: 'Clonally multiplied in sterile laboratory facilities from 40+ year verified mother plus-trees.',
      icon: Microscope,
    },
    {
      title: 'Certified Clonal Material',
      description: 'Zero genetic variation between saplings, ensuring synchronous canopy formation and timber density.',
      icon: Award,
    },
    {
      title: 'Uniform Growth Potential',
      description: 'Straight cylindrical trunk architecture with minimal basal fluting, maximizing valuable heartwood recovery.',
      icon: TrendingUp,
    },
    {
      title: 'Technical Planting Guidance',
      description: 'Pre-planting soil chemistry evaluations, pit preparation guides, and custom fertigation schedules.',
      icon: FileText,
    },
    {
      title: 'Site-Specific Suitability',
      description: 'Scientifically matches MBT clones to your soil pH, rainfall regime, and drainage profile.',
      icon: Compass,
    },
    {
      title: 'Turnkey Plantation Support',
      description: "Direct integration with Nature's Canopy for irrigation layout, planting crews, and quarterly growth audits.",
      icon: TreeDeciduous,
    },
  ];

  const techSteps = [
    { step: 1, title: 'Plus-Tree Selection', desc: 'Screening 40+ year specimen teak mother trees with superior timber straightness.' },
    { step: 2, title: 'Laboratory Initiation', desc: 'Sterile shoot-tip initiation in customized hormone-balanced nutrient media.' },
    { step: 3, title: 'Clonal Multiplication', desc: 'Multi-cycle shoot proliferation generating millions of identical plantlets.' },
    { step: 4, title: 'Ex-Vitro Root Induction', desc: 'Stimulating primary taproot descent and lateral hair root matrix.' },
    { step: 5, title: 'Greenhouse Hardening', desc: '120-day progressive humidity step-down in automated climate-controlled bays.' },
    { step: 6, title: 'Nursery Field Readiness', desc: 'Sunlight acclimated in UV-stabilized root-trainers ready for field pits.' },
    { step: 7, title: 'Managed Plantation', desc: 'GPS-aligned planting with precision drip fertigation and periodic silvicultural audits.' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#082A21] text-white">
        {/* Dedicated Hero Media Container (Designed for future cinematic video integration) */}
        <div
          data-testid="hero-media-container"
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          {/* Deep Forest Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#082A21]/95 via-[#082A21]/80 to-[#063B2D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082A21] via-transparent to-[#082A21]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#063B2D]/90 border border-[#C8A45D]/50 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>{cms.heroTagline}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              Grow Teak. <br className="hidden sm:inline" />
              Grow Timber. <br />
              <span className="text-[#C8A45D] italic">Grow a Greener India.</span>
            </h1>

            <p className="text-base sm:text-xl text-stone-200 max-w-2xl font-light leading-relaxed">
              {cms.homepageHeroSubheading}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-[#A8C8A0]/30"
              >
                <ShoppingBag className="w-4 h-4" /> Explore Our Plants
              </Link>
              <Link
                to="/technology"
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <Microscope className="w-4 h-4 text-[#C8A45D]" /> Discover Our Technology
              </Link>
              <Link
                to="/plantation-services"
                className="px-7 py-3.5 rounded-xl bg-[#063B2D]/90 hover:bg-[#063B2D] text-[#C8A45D] border border-[#C8A45D]/40 font-semibold text-sm tracking-wide transition-all flex items-center gap-2"
              >
                <TreeDeciduous className="w-4 h-4" /> Plan Your Plantation
              </Link>
            </div>

            {/* Quick Hero Specs */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs text-stone-300">
              <div>
                <span className="text-[#C8A45D] font-bold block text-sm">96%+</span>
                Field Establishment Survival
              </div>
              <div>
                <span className="text-[#C8A45D] font-bold block text-sm">MBT-1 to MBT-9</span>
                Specialized Agro Clones
              </div>
              <div>
                <span className="text-[#C8A45D] font-bold block text-sm">Turnkey</span>
                End-to-End Plantation Services
              </div>
            </div>
          </div>

          {/* Hero Side Highlight Card */}
          <div className="w-full max-w-md bg-[#063B2D]/85 border border-[#C8A45D]/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="w-5 h-5 text-[#48A868]" />
                <span className="text-xs uppercase font-bold tracking-wider text-[#C8A45D]">
                  Commercial Planning
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#087F5B] text-white font-semibold">
                350 Trees / Acre
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-white leading-snug">
              Instant Plantation Requirement Estimator
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Based on the Nature's Canopy flagship model proposal (350 saplings/acre with precision drip irrigation).
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-stone-300 mb-1">
                  <span>Enter Land Acreage:</span>
                  <span className="font-bold text-[#C8A45D]">{calcAcreage} Acres</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={calcAcreage}
                  onChange={e => setCalcAcreage(parseInt(e.target.value))}
                  className="w-full accent-[#087F5B] cursor-pointer"
                />
              </div>

              <div className="bg-[#082A21] rounded-2xl p-4 border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Target Sapling Count:</span>
                  <span className="font-bold text-white">{quickCalc.totalSaplingsToOrder.toLocaleString()} Units</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Est. Sapling Investment:</span>
                  <span className="font-bold text-[#C8A45D]">{formatINR(quickCalc.saplingTotalCost)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Turnkey Year 1 Capex (Indicative):</span>
                  <span className="font-bold text-emerald-400">{formatINR(quickCalc.totalFirstYearCapitalCost)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Link
                  to="/plantation-calculator"
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-center text-xs font-semibold text-white transition-colors"
                >
                  Full Calculator & Grid
                </Link>
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="flex-1 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] border border-[#48A868] text-center text-xs font-semibold text-white transition-colors"
                >
                  Request Official Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-stone-400 text-xs">
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1 opacity-70">Scroll to Explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-stone-400 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-[#C8A45D] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. TRUST HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-xl border border-[#E2E4D8] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-[#F1F2E8] text-[#063B2D] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#087F5B]" />
                  </span>
                  <div className="text-right">
                    <span className="text-3xl font-serif font-bold text-[#063B2D]">{item.number}</span>
                    <span className="text-xs font-semibold text-[#087F5B] ml-1">{item.unit}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#172820] mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PLANTS CATALOG SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#087F5B] mb-2">
              <Sprout className="w-4 h-4" /> Nursery Certified Varieties
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
              Featured Clonal Teak Saplings
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#087F5B] hover:text-[#063B2D]"
          >
            <span>View All Products & Packs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#082A21]/90 backdrop-blur-md text-[#C8A45D] text-xs font-bold border border-[#C8A45D]/40 shadow">
                    {product.cloneId}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#087F5B] text-[11px] font-bold shadow">
                    {product.stock > 0 ? `${product.stock.toLocaleString()} Available` : 'Pre-Order'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#172820] group-hover:text-[#087F5B] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-400 block">Indicative Unit Price</span>
                      <span className="text-2xl font-bold text-[#063B2D]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">
                      MOQ: {product.minOrderQuantity} units
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/shop/${product.slug}`}
                      className="py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-center text-xs font-semibold transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product, product.minOrderQuantity)}
                      className="py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] text-white text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProductForQuote(product);
                      setQuoteModalOpen(true);
                    }}
                    className="w-full py-2 rounded-xl bg-[#F1F2E8] hover:bg-[#E2E4D8] text-[#063B2D] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#087F5B]" /> Request Bulk Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY MOTHER BIOTECH? */}
      <section className="bg-[#082A21] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D] block mb-2">
              Proprietary Botanical Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Why Plant Mother Biotech Clonal Teak?
            </h2>
            <p className="text-sm text-stone-300 mt-4 leading-relaxed">
              Standard seed-grown teak exhibits up to 40% tree-to-tree genetic variation, irregular trunk fluting, and delayed heartwood formation. Mother Biotech's tissue-culture clones eliminate these wild uncertainties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyMotherBiotech.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-[#063B2D]/90 border border-stone-800 rounded-3xl p-7 hover:border-[#C8A45D]/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A45D] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR NINE TEAK CLONES (MBT-1 to MBT-9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Genetic Diversity & Micro-Climate Specialization
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            The Nine Elite Teak Clones
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Each MBT clone is selected from distinguished plus-trees for targeted performance in specific soil types, rainfall zones, and timber objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clones.map(clone => (
            <div
              key={clone.id}
              className="bg-white rounded-3xl border border-[#E2E4D8] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#082A21] text-[#C8A45D] font-bold text-xs tracking-wider">
                    {clone.id}
                  </span>
                  <span className="text-[11px] font-semibold text-[#087F5B] bg-[#F1F2E8] px-2.5 py-0.5 rounded-full">
                    {clone.stockAvailability}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#172820] mb-2">{clone.name}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mb-3">{clone.tagline}</p>

                <div className="space-y-1.5 text-[11px] text-stone-600 border-t border-stone-100 pt-3">
                  <div>
                    <strong className="text-[#063B2D]">Ideal Soils:</strong>{' '}
                    {clone.soilSuitability.join(', ')}
                  </div>
                  <div>
                    <strong className="text-[#063B2D]">Rainfall:</strong> {clone.rainfallRequirement}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <Link
                  to={`/clones?selected=${clone.id}`}
                  className="text-xs font-semibold text-[#087F5B] hover:text-[#063B2D] flex items-center gap-1"
                >
                  Technical Dossier <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => {
                    setSelectedProductForQuote({
                      id: 'clone-inquiry',
                      name: clone.name,
                      cloneId: clone.id,
                      price: 120,
                    });
                    setQuoteModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#063B2D] hover:bg-[#087F5B] text-white text-xs font-medium transition-colors"
                >
                  Enquire Clone
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/clones"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#063B2D] text-white font-semibold text-sm hover:bg-[#087F5B] transition-colors shadow"
          >
            Compare Clones Side-by-Side <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. TISSUE CULTURE TECHNOLOGY SPLIT-SCREEN */}
      <section className="bg-[#F1F2E8] py-20 border-y border-[#E2E4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B]">
                Laboratory Micropropagation
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#063B2D] leading-tight">
                The Science Behind Every Sapling
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Conventional seedling propagation from wild seeds produces unpredictable tree heights, branch knots, and irregular growth. Mother Biotech’s sterile 7-stage micropropagation protocol guarantees uniform genetic integrity from initial shoot tip to mature canopy.
              </p>

              <div className="space-y-3 pt-2">
                {techSteps.slice(0, 5).map(step => (
                  <div key={step.step} className="flex items-start gap-3 bg-white/70 p-3 rounded-xl border border-stone-200">
                    <span className="w-6 h-6 rounded-full bg-[#087F5B] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#172820]">{step.title}</h4>
                      <p className="text-[11px] text-stone-500 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/technology"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#087F5B] text-white font-semibold text-sm hover:bg-[#063B2D] transition-colors shadow"
                >
                  Explore Complete 7-Stage Process <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="Tissue culture laboratory"
                  className="w-full h-[520px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#082A21] border border-[#C8A45D]/40 text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 text-[#C8A45D] font-bold text-xs uppercase mb-1">
                  <Microscope className="w-4 h-4" /> 25+ Years Experience
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Laboratory protocols developed under the scientific stewardship of Dr. Balakrishna for elite teak micropropagation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NATURE'S CANOPY PLANTATION SERVICES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#082A21] via-[#063B2D] to-[#082A21] text-white p-8 sm:p-14 shadow-2xl border border-[#C8A45D]/30">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C8A45D] text-xs font-bold uppercase tracking-wider">
              <TreeDeciduous className="w-4 h-4" /> NATURE'S CANOPY PLANTATION SERVICES
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              From Sapling to Sustainable Plantation.
            </h2>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              We don't merely supply high-performance clonal saplings — we engineer, establish, irrigate, and professionally manage your teak estate for peak commercial timber yield.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-200 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Land Survey & Layout
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Drip Irrigation Setup
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Deep Auger Pitting
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Silvicultural Pruning
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Drone Biometrics
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> 350-Acre Proposal Model
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/plantation-services"
                className="px-7 py-3 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white font-semibold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                Explore 16 Plantation Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all"
              >
                View Live & Model Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESEARCH & INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
              Scientific Publications & Field Trials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
              Research & Silvicultural Insights
            </h2>
          </div>
          <Link
            to="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#087F5B] hover:text-[#063B2D]"
          >
            <span>View All Papers & Media</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-[#E2E4D8] p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#087F5B] bg-[#F1F2E8] px-2.5 py-1 rounded-full">
                  {article.category} • {article.year}
                </span>
                <h3 className="text-base font-serif font-bold text-[#172820] mt-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="space-y-2 border-t border-stone-100 pt-3">
                <div className="text-[11px] text-stone-600 font-medium truncate">
                  Author: {article.authors}
                </div>
                <div className="text-[10px] text-stone-400 italic truncate">
                  {article.publishedIn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Real Plantation Life
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            From Lab to Canopy
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Documenting our laboratories, automated greenhouses, and multi-acre teak estates.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaAssets.filter(a => a.visibility !== 'unpublished').slice(0, 6).map(asset => (
            <div
              key={asset.id}
              className="relative h-56 rounded-2xl overflow-hidden group shadow-sm bg-stone-100"
            >
              <img
                src={asset.imageUrl}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] text-[#C8A45D] font-bold uppercase">{asset.category}</span>
                <h4 className="text-xs font-semibold leading-tight">{asset.title}</h4>
                <p className="text-[10px] text-stone-300 mt-0.5 line-clamp-2">{asset.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/gallery"
            className="text-xs font-semibold text-[#087F5B] hover:text-[#063B2D] inline-flex items-center gap-1.5"
          >
            Explore Full Interactive Gallery & Lightbox <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#063B2D] text-white rounded-3xl p-10 sm:p-14 text-center border border-[#C8A45D]/40 shadow-2xl relative overflow-hidden space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D]">
              Start Your Clonal Forest
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Your Next Plantation Begins Here.
            </h2>
            <p className="text-sm text-stone-200 leading-relaxed">
              Whether establishing 1 acre of intercrop teak or a commercial 350-acre corporate plantation, Mother Biotech and Nature's Canopy provide the planting material, precision infrastructure, and technical management.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/shop"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-sm shadow-lg hover:scale-105 transition-all"
            >
              Buy Teak Plants
            </Link>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8A45D] font-semibold text-sm border border-[#C8A45D]/40 transition-colors"
            >
              Request Bulk Quotation
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-stone-900/60 hover:bg-stone-900 text-stone-200 font-semibold text-sm border border-stone-700 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={selectedProductForQuote}
      />
    </div>
  );
};
