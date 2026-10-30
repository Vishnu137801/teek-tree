import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaAsset, ResearchArticle } from '../../types';
import {
  Image,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  Download,
  ExternalLink,
  Play,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { mediaAssets, researchArticles } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const categories = [
    'All',
    'Tree Planting',
    'Company Events',
    'Media Interactions',
    'Nursery Operations',
    'Tree Growth Measurements',
  ];

  const filteredAssets = mediaAssets
    .filter(item => item.visibility !== 'unpublished')
    .filter(item => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.caption.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q)) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredAssets.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredAssets.length) % filteredAssets.length);
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO */}
      <section className="bg-[#082A21] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#063B2D]">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] text-xs font-semibold uppercase tracking-widest">
            <Image className="w-3.5 h-3.5" /> Media Archive & Research Library
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Gallery & Biotechnology Publications
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            High-resolution visual documentation of our sterile laboratory facilities, clonal mother blocks, greenhouse hardening bays, and established plantation canopies.
          </p>
        </div>
      </section>

      {/* 2. GALLERY CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E2E4D8] shadow-sm">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#087F5B] text-white border-[#087F5B] font-semibold'
                    : 'bg-[#F8F7F1] text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search captions & locations..."
              className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#087F5B]"
            />
          </div>
        </div>

        {/* 3. MASONRY PHOTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset, index) => (
            <div
              key={asset.id}
              onClick={() => openLightbox(index)}
              className="group bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={asset.imageUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#082A21]/90 backdrop-blur-md text-[#C8A45D] text-[10px] font-bold">
                    {asset.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif font-bold text-base text-[#172820] group-hover:text-[#087F5B] transition-colors leading-snug">
                  {asset.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                  {asset.caption}
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#48A868]" /> {asset.location || 'Mother Biotech Center'}
                  </span>
                  <span>{asset.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Preview Modal Trigger Banner */}
        <div className="bg-[#082A21] rounded-3xl p-8 text-white border border-[#C8A45D]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D] flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" /> Video Feature
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Behind the Cleanroom Doors: Micropropagation Walkthrough
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              Watch our head biotechnologists demonstrate meristem inoculation, hormone preparation, and ex-vitro taproot induction.
            </p>
          </div>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow flex items-center gap-2 shrink-0 hover:scale-105 transition-all"
          >
            <Play className="w-4 h-4 fill-current" /> Watch Video Preview
          </button>
        </div>

        {/* 4. RESEARCH PAPERS SECTION */}
        <div className="pt-10 space-y-6">
          <div className="border-b border-[#E2E4D8] pb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B]">
              Scientific Citations & Literature
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#063B2D] mt-1">
              Research Articles & Technical Publications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchArticles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-3xl border border-[#E2E4D8] p-6 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#087F5B] bg-[#F1F2E8] px-2.5 py-1 rounded-full">
                    {article.category} • {article.year}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#172820] mt-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="mt-4 space-y-1.5 bg-[#F8F7F1] p-3 rounded-xl text-[11px] text-stone-600">
                    <span className="font-bold text-[#063B2D] block">Key Documented Findings:</span>
                    {article.keyFindings.map((kf, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-[#087F5B] font-bold">•</span>
                        <span>{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-stone-400 truncate max-w-[180px]">
                    {article.publishedIn}
                  </span>
                  <a
                    href="#download"
                    onClick={e => {
                      e.preventDefault();
                      alert(`Downloading research whitepaper: ${article.title}`);
                    }}
                    className="text-[#087F5B] hover:text-[#063B2D] font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Dossier
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="max-h-[70vh] flex items-center justify-center">
              <img
                src={filteredAssets[lightboxIndex].imageUrl}
                alt={filteredAssets[lightboxIndex].title}
                className="max-h-[70vh] max-w-full rounded-2xl shadow-2xl object-contain"
              />
            </div>
            <div className="text-white space-y-1">
              <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-wider">
                {filteredAssets[lightboxIndex].category}
              </span>
              <h3 className="text-xl font-serif font-bold">{filteredAssets[lightboxIndex].title}</h3>
              <p className="text-xs text-stone-300 max-w-lg mx-auto">
                {filteredAssets[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 rounded-3xl p-6 max-w-2xl w-full text-white space-y-4 relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-serif font-bold">Biotechnology Cleanroom Tour</h3>
            <div className="w-full h-72 rounded-2xl bg-black flex flex-col items-center justify-center p-6 text-center space-y-3 border border-stone-800">
              <div className="w-16 h-16 rounded-full bg-[#087F5B] flex items-center justify-center text-white shadow-xl animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-xs text-stone-300">
                Cinematic video sequence reserved for Phase 2 integration. Full footage demonstrates sterile shoot-tip dissection and automated greenhouse misting.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/10 text-xs font-semibold"
              >
                Close Video Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
