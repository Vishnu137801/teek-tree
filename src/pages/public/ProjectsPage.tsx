import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlantationProject } from '../../types';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  Trees,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  Sprout,
  Droplets,
  Layers,
  MapPin,
  TrendingUp,
  X,
  FileSpreadsheet,
  Activity,
  Calculator,
  ChevronRight,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useApp();
  const [selectedProject, setSelectedProject] = useState<PlantationProject | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'gallery' | 'timeline'>('overview');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HERO */}
      <section className="relative py-24 bg-[#082A21] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Trees className="w-4 h-4" /> Nature's Canopy Portfolio
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Our Plantation Projects
          </h1>
          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            From our flagship 350-acre model development proposal to multi-acre farmer agroforestry estates across Telangana, Andhra Pradesh, and Karnataka.
          </p>
        </div>
      </section>

      {/* 2. PROJECT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#063B2D]">
              Active Estates & Model Development Proposals
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Real agricultural estates and reference blueprints managed by Nature's Canopy.
            </p>
          </div>
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold hover:bg-[#063B2D] transition-colors self-start shadow"
          >
            Submit Land for Development
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80"
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#082A21] text-[#C8A45D] font-bold text-xs shadow border border-[#C8A45D]/40">
                      {project.code}
                    </span>
                    {project.isProposal ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white font-bold text-[10px] shadow">
                        Model Proposal
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] shadow">
                        Active Plantation
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[#A8C8A0]">
                      <MapPin className="w-3.5 h-3.5" /> {project.district}, {project.state}
                    </span>
                    <span className="font-bold text-[#C8A45D]">{project.acreage} Acres</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#172820] group-hover:text-[#087F5B] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8F7F1] p-3.5 rounded-2xl border border-stone-200">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Sapling Population</span>
                      <strong className="text-stone-800 text-sm">{project.saplingCount.toLocaleString()} Trees</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Project Stage</span>
                      <strong className="text-[#087F5B] text-sm">{project.stage}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Est. Survival Rate</span>
                      <strong className="text-stone-800">{project.survivalRate}%</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Allocated Clones</span>
                      <strong className="text-stone-800">{project.allocatedClones.join(', ')}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {project.notes}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveTab('overview');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#063B2D] hover:bg-[#087F5B] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 mt-4 shadow"
                >
                  Inspect Project Dossier <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT DETAILS MODAL / DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 text-stone-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-[#063B2D] text-[#C8A45D] font-bold text-xs border border-[#C8A45D]/40">
                  {selectedProject.code}
                </span>
                {selectedProject.isProposal && (
                  <span className="text-xs text-amber-400 font-semibold">
                    (Example Development Proposal Model)
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">{selectedProject.title}</h3>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#48A868]" /> {selectedProject.location} • Manager: {selectedProject.assignedManager}
              </p>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 border-b border-stone-800 pb-2 text-xs font-semibold">
              {(['overview', 'scope', 'gallery', 'timeline'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[#087F5B] text-white shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="text-xs space-y-4">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-stone-300 leading-relaxed">{selectedProject.notes}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#063B2D] p-4 rounded-2xl border border-stone-800">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Acreage</span>
                      <strong className="text-white text-base">{selectedProject.acreage} Acres</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Total Saplings</span>
                      <strong className="text-white text-base">{selectedProject.saplingCount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Avg Height</span>
                      <strong className="text-[#48A868] text-base">{selectedProject.averageHeightMeters} m</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Avg Girth</span>
                      <strong className="text-[#C8A45D] text-base">{selectedProject.averageGirthCm} cm</strong>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-[#C8A45D] pt-2">Plantation Blocks:</h4>
                  <div className="space-y-2">
                    {selectedProject.blocks.map(blk => (
                      <div key={blk.id} className="p-3 rounded-xl bg-[#063B2D]/60 border border-stone-800 flex justify-between items-center">
                        <div>
                          <strong className="text-white">{blk.name}</strong>
                          <span className="text-stone-400 block text-[11px]">{blk.acreage} Acres • {blk.saplingsPlanted.toLocaleString()} Saplings</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#087F5B] text-white">
                          Drip: {blk.dripLineStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'scope' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#C8A45D]">Scheduled Maintenance Tasks</h4>
                  <div className="space-y-2">
                    {selectedProject.maintenanceTasks.map(task => (
                      <div key={task.id} className="p-3 rounded-xl bg-[#063B2D] border border-stone-800 flex justify-between items-center">
                        <div>
                          <strong className="text-white">{task.title}</strong>
                          <span className="text-stone-400 block text-[11px]">Due: {task.dueDate} • Assigned to: {task.assignedTo}</span>
                        </div>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80"
                      alt="Tree trunk circumference and caliper biometric audit"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                      Trunk Biometric Audit
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.13_8f0af055.jpeg"
                      alt="Sapling planting ceremony"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                      Planting Ceremony
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg"
                      alt="Nursery workforce hardening beds"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                      Nursery Hardening
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.21_47b7a0da.jpeg"
                      alt="Plantation delegation and team"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                      Agronomy Team
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span>Project Inception / Planting Date:</span>
                    <strong className="text-white">{selectedProject.startDate}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span>Projected Full Harvest Maturity:</span>
                    <strong className="text-[#C8A45D]">{selectedProject.estimatedCompletion}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteRequestModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
};
