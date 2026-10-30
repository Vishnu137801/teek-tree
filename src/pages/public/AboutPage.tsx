import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  TreeDeciduous,
  Microscope,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Leaf,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { cms, mediaAssets } = useApp();

  const milestones = [
    {
      year: '1998',
      title: 'Foundation of Clonal Teak Research',
      description: 'Initial plus-tree identification and tissue-culture protocol development led by Dr. Balakrishna, isolating elite maternal lines across central and southern forest tracts.',
    },
    {
      year: '2006',
      title: 'Commercial Micropropagation Lab Established',
      description: 'Commissioning of commercial-scale sterile micropropagation facilities with controlled laminar airflow bays and secondary fog-mist hardening houses.',
    },
    {
      year: '2014',
      title: 'Selection of MBT-1 to MBT-9 Clones',
      description: 'Culmination of multi-location trial plots standardizing nine distinct clonal varieties matched to specific rainfall and soil chemistry regimes.',
    },
    {
      year: '2019',
      title: "Nature's Canopy Plantation Services Division",
      description: 'Expansion into turnkey plantation development, providing landowners with precision drip irrigation, mechanization, and long-term silvicultural management.',
    },
    {
      year: '2024',
      title: '350-Acre Model Estate Initiative',
      description: 'Rollout of large-scale commercial agroforestry blueprints, proving 350 trees/acre density with precision drip fertigation.',
    },
    {
      year: 'Present',
      title: 'National Supply & Clonal Expansion',
      description: 'Distributing over 100,000+ certified clonal teak plantlets annually across Telangana, Andhra Pradesh, Karnataka, Maharashtra, and Tamil Nadu.',
    },
  ];

  const teamAreas = [
    {
      title: 'Biotechnology & Tissue Culture R&D',
      leader: 'Research Associated with Dr. Balakrishna',
      desc: '25+ years of micropropagation experience refining nutrient media, shoot proliferation rates, and root induction protocols.',
      icon: Microscope,
    },
    {
      title: 'Field Agronomy & Soil Science',
      leader: 'Senior Soil Scientists & Agronomists',
      desc: 'Evaluating land topography, NPK nutrient deficits, soil microbiology, and moisture buffering capacity.',
      icon: Compass,
    },
    {
      title: 'Irrigation & Hydraulic Engineering',
      leader: 'Turnkey Drip Specialists',
      desc: 'Designing automated pressure-compensating drip layouts, sub-main trenches, and filtration stations.',
      icon: Sprout,
    },
    {
      title: 'Silvicultural Plantation Supervisors',
      leader: "Nature's Canopy Field Officers",
      desc: 'Managing pit augering, root-ball planting, stem debudding, pruning, and quarterly biometric tracking.',
      icon: TreeDeciduous,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. FOREST HERO BANNER */}
      <section className="relative py-28 bg-[#082A21] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Sprout className="w-3.5 h-3.5" /> Editorial Profile & Heritage
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Cultivating Excellence in Indian Timber Forestry
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Where cutting-edge plant biotechnology unites with professional plantation development to restore degraded soils and create enduring generational wealth.
          </p>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B]">
              <Leaf className="w-4 h-4" /> Two Connected Brands, One Vision
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D] leading-tight">
              Mother Biotech & Nature's Canopy
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              <strong>Mother Biotech</strong> is India’s foremost specialized producer of tissue-culture clonal teak saplings (*Tectona grandis*). By capturing the genetics of premier 40+ year specimen plus-trees, Mother Biotech eliminates the high genetic variability, branching knots, and fluting common in wild seed propagation.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              <strong>Nature's Canopy</strong> serves as the turnkey plantation development arm. Transforming barren farmland, dry agricultural tracts, and private estates into high-yielding, drip-fertigated teak forests with structured maintenance schedules and transparent investor reporting.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F1F2E8] border border-[#E2E4D8]">
                <h4 className="font-serif font-bold text-[#063B2D] text-lg">Mother Biotech</h4>
                <p className="text-xs text-stone-600 mt-1">Laboratory micropropagation, clonal selection, and certified plantlet sales.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F1F2E8] border border-[#E2E4D8]">
                <h4 className="font-serif font-bold text-[#063B2D] text-lg">Nature's Canopy</h4>
                <p className="text-xs text-stone-600 mt-1">Land survey, drip irrigation, auger planting, and ongoing estate care.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.21_47b7a0da.jpeg"
              alt="Mother Biotech leadership, delegates, and agronomy team at plantation nursery grounds"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
              <span className="text-[10px] text-[#C8A45D] font-bold uppercase tracking-wider block">Real Field Reality</span>
              <p className="text-xs font-medium">Mother Biotech Leadership, Agronomists & International Delegation at Estate Hardening Grounds</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="bg-[#082A21] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#063B2D] p-8 rounded-3xl border border-[#C8A45D]/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A45D]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Our Vision</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {cms.aboutVision}
              </p>
            </div>

            <div className="bg-[#063B2D] p-8 rounded-3xl border border-[#C8A45D]/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#48A868]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Our Mission</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {cms.aboutMission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. BIOTECHNOLOGY JOURNEY & DR. BALAKRISHNA RESEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            25+ Years of Scientific Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            Our Biotechnology Research & Innovation
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            The scientific foundation of Mother Biotech and Nature’s Canopy is rooted in research associated with <strong>Dr. Balakrishna</strong> and our interdisciplinary team of plant biochemists and silviculturists, accumulating over 25 years of ongoing laboratory and field experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <Microscope className="w-8 h-8 text-[#087F5B]" />
            <h4 className="text-lg font-serif font-bold text-[#172820]">Shoot-Tip Organogenesis</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Standardized hormone ratios (BAP, NAA, IBA) stimulating rapid axillary node multiplication without somatic mutations, preserving 100% parental genetics.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <TreeDeciduous className="w-8 h-8 text-[#087F5B]" />
            <h4 className="text-lg font-serif font-bold text-[#172820]">Taproot-Centric Hardening</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Proprietary ex-vitro root-inducing protocol promoting deep downward vertical taproots rather than spiraling pot-bound root tangles.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
            <Award className="w-8 h-8 text-[#087F5B]" />
            <h4 className="text-lg font-serif font-bold text-[#172820]">Nine Clonal Selections</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Classified from MBT-1 to MBT-9 after rigorous multilocational trial testing across drought-prone, coastal, black cotton, and alluvial soils.
            </p>
          </div>
        </div>
      </section>

      {/* 6. OUR TEAM & EXPERTISE */}
      <section className="bg-[#F1F2E8] py-16 border-y border-[#E2E4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
              Cross-Functional Mastery
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#063B2D]">
              Our Multidisciplinary Team
            </h2>
            <p className="text-xs text-stone-600 mt-2">
              Combining laboratory molecular research with practical on-ground agricultural mechanization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamAreas.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                  <span className="w-10 h-10 rounded-xl bg-[#087F5B]/10 text-[#087F5B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h4 className="text-sm font-bold text-[#172820] leading-snug">{dept.title}</h4>
                  <span className="text-[11px] font-semibold text-[#087F5B] block">{dept.leader}</span>
                  <p className="text-xs text-stone-500 leading-relaxed">{dept.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SUSTAINABILITY COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082A21] rounded-3xl p-8 sm:p-12 text-white border border-[#C8A45D]/30 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D]">
              Ecological Stewardship
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Cultivating Forests to Safeguard Natural Ecosystems
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              India imports substantial volumes of tropical round logs annually. By planting high-density commercial clonal teak plantations on private farmlands, Mother Biotech and Nature's Canopy directly alleviate logging pressure on India’s protected virgin forests while sequestering hundreds of metric tons of carbon per acre.
            </p>
          </div>
          <div className="space-y-3 bg-[#063B2D] p-5 rounded-2xl border border-stone-800 text-xs">
            <div className="flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Carbon sink creation
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Subsoil hardpan bio-restoration
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Organic leaf mulch humus buildup
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Micro-watershed recharge ponds
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPANY MILESTONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-2">
            Historical Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D]">
            Two Decades of Clonal Innovation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm hover:shadow-lg transition-all space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-[#087F5B]">{m.year}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D]" />
              </div>
              <h4 className="text-base font-serif font-bold text-[#172820] leading-snug">{m.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8B. REAL JOURNEY PHOTOGRAPHS: TREE PLANTING & DELEGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E4D8] shadow-sm space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B] block mb-1">
              Field Realities
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D]">
              Moments from Our Agronomic Journey
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Authentic on-site documentation of tree planting ceremonies, executive strategy conferences, and nursery operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md group">
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.13_8f0af055.jpeg"
                  alt="Dignitaries and founders hands holding and planting a tissue-culture teak sapling in red soil during estate inauguration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#082A21] text-[#C8A45D] text-[10px] font-bold border border-[#C8A45D]/40">
                  Tree Planting Ceremony
                </span>
              </div>
              <div className="p-5 bg-[#F8F7F1]">
                <h4 className="font-serif font-bold text-base text-[#172820]">Official Clonal Teak Planting Ceremony</h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Founders, agronomy consultants, and dignitaries jointly placing a hardened clonal teak sapling into prepared fertile red soil during plantation inauguration.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md group">
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.19__1__90f21713.jpeg"
                  alt="Corporate delegation and research team in conference room discussing clonal forestry initiatives"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#082A21] text-[#48A868] text-[10px] font-bold border border-[#48A868]/40">
                  Executive Delegation
                </span>
              </div>
              <div className="p-5 bg-[#F8F7F1]">
                <h4 className="font-serif font-bold text-base text-[#172820]">Corporate Strategy & Delegation Conference</h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  High-level consultation between biotechnology leadership, partner agronomists, and forestry delegates reviewing multi-acre estate development frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8C. NATIONAL MEDIA BRIEFINGS & RECOGNITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#082A21] to-[#063B2D] rounded-3xl p-8 sm:p-12 text-white border border-[#C8A45D]/30 shadow-xl space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D] block mb-2">
              Media & Industry Recognition
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Broadcasting the Clonal Forestry Revolution
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              Sharing biotechnology breakthroughs, high-yield silvicultural protocols, and commercial teak agroforestry opportunities with regional and national agricultural journalists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.11_423f26f5.jpeg"
                alt="Press conference room with journalists, TV video cameras, and media microphones interviewing Mother Biotech officials"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                <span className="text-[10px] text-[#C8A45D] font-bold uppercase tracking-wider block">Press Briefing</span>
                <h4 className="text-sm font-bold">National Television & Agricultural Media Briefing</h4>
                <p className="text-[11px] text-stone-300 mt-1">
                  Television cameras and press correspondents interviewing Mother Biotech leadership on tissue-culture teak multiplication.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.17_1d0d8035.jpeg"
                alt="Photo collage showing press briefings, sapling planting ceremonies, team meetings, and nursery workforce"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                <span className="text-[10px] text-[#48A868] font-bold uppercase tracking-wider block">Enterprise Milestones</span>
                <h4 className="text-sm font-bold">Press Showcase & Field Journey Composite</h4>
                <p className="text-[11px] text-stone-300 mt-1">
                  Documenting key milestones across press briefings, nursery hardening beds, and ceremonial sapling plantings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PHOTO GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#063B2D]">On-Ground Realities</h3>
            <p className="text-xs text-stone-500">Photographic documentation of our laboratories and field estates.</p>
          </div>
          <Link to="/gallery" className="text-xs font-semibold text-[#087F5B] hover:text-[#063B2D] flex items-center gap-1">
            View Full Media Gallery <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mediaAssets.slice(0, 3).map(asset => (
            <div key={asset.id} className="relative h-64 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={asset.imageUrl}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] text-[#C8A45D] font-bold uppercase">{asset.category}</span>
                <h4 className="text-xs font-semibold leading-tight">{asset.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F1F2E8] rounded-3xl p-10 border border-[#E2E4D8] space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D]">
            Have Technical Questions for Our Agronomy Team?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Discuss soil testing, water budgeting, or schedule an on-site plantation survey with Nature’s Canopy agronomists.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-[#087F5B] text-white font-semibold text-xs tracking-wide hover:bg-[#063B2D] transition-colors shadow"
            >
              Contact Our Agronomists
            </Link>
            <Link
              to="/plantation-calculator"
              className="px-6 py-3 rounded-xl bg-white text-[#063B2D] border border-stone-300 font-semibold text-xs tracking-wide hover:bg-stone-50 transition-colors"
            >
              Estimate Plantation Requirements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
