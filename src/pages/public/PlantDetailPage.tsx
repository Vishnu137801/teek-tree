import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  ShoppingBag,
  Heart,
  Share2,
  CheckCircle2,
  Plus,
  Minus,
  TreeDeciduous,
  Sprout,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  Calculator,
  ChevronRight,
  Maximize2,
  Box,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const PlantDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, clones, addToCart, wishlist, toggleWishlist } = useApp();

  const product = products.find(p => p.slug === slug) || products[0];
  const cloneData = clones.find(c => c.id === product.cloneId) || clones[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrderQuantity || 50);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'planting' | 'soil' | 'care' | 'research' | 'delivery' | 'faqs'>('overview');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Plant Specifications' },
    { id: 'planting', label: 'Planting Guidelines' },
    { id: 'soil', label: 'Soil & Climate' },
    { id: 'care', label: 'Care Instructions' },
    { id: 'research', label: 'Research Highlights' },
    { id: 'delivery', label: 'Delivery & Packaging' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="space-y-16 py-8 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#087F5B]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-[#087F5B]">Shop Plants</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#063B2D] font-semibold truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Gallery & 3D Container Placeholder (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image Display */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-[#E2E4D8] shadow-md h-[460px] group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#082A21] text-[#C8A45D] font-bold text-xs shadow border border-[#C8A45D]/40">
                  {product.cloneId}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium text-xs">
                  {product.category}
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to wishlist"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-rose-600 shadow transition-colors"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-[#087F5B] scale-95 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Dedicated 3D Plant Viewer Placeholder Container */}
              <div
                data-testid="3d-plant-viewer-placeholder"
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#C8A45D]/60 bg-[#082A21]/5 flex flex-col items-center justify-center p-1 text-center shrink-0 cursor-pointer hover:bg-[#082A21]/10 transition-colors"
                title="Interactive 3D model viewer placeholder"
              >
                <Box className="w-5 h-5 text-[#C8A45D] mb-1" />
                <span className="text-[9px] font-bold text-[#063B2D] uppercase leading-tight">3D Model</span>
                <span className="text-[8px] text-stone-400">Ready</span>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F1F2E8] border border-[#E2E4D8] text-center text-xs">
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#087F5B] mx-auto" />
                <span className="font-bold text-[#172820] block">True-to-Type</span>
                <span className="text-[10px] text-stone-500">Molecularly Indexed</span>
              </div>
              <div className="space-y-1">
                <Sprout className="w-5 h-5 text-[#087F5B] mx-auto" />
                <span className="font-bold text-[#172820] block">120-Day Hardened</span>
                <span className="text-[10px] text-stone-500">Zero Transplant Shock</span>
              </div>
              <div className="space-y-1">
                <Truck className="w-5 h-5 text-[#087F5B] mx-auto" />
                <span className="font-bold text-[#172820] block">Crate Transit</span>
                <span className="text-[10px] text-stone-500">Farm Gate Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Buying & Commercial Information (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                  Certified Laboratory Batch: {cloneData.laboratoryBatch}
                </span>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {product.stock.toLocaleString()} Saplings In Stock
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#063B2D] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2E4D8] shadow-sm flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Single Unit Indicative Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#063B2D]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 font-normal">/ plant</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-stone-400 block">Total for {quantity} plants:</span>
                <span className="text-xl font-bold text-[#C8A45D]">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Quick Specs List */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8F7F1] p-4 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-400 block">Plant Height:</span>
                <strong className="text-stone-800">{product.height}</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Container:</span>
                <strong className="text-stone-800">{product.containerType}</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Nursery Age:</span>
                <strong className="text-stone-800">{product.ageInMonths} Months (Hardened)</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Minimum Order:</span>
                <strong className="text-stone-800">{product.minOrderQuantity} Saplings</strong>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Select Order Quantity (Units):
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white px-2 py-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - (product.minOrderQuantity > 1 ? 50 : 10)))}
                    className="p-2 hover:text-[#087F5B]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQuantity}
                    step={10}
                    value={quantity}
                    onChange={e => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
                    className="w-24 text-center font-bold text-sm text-[#063B2D] focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + (product.minOrderQuantity > 1 ? 50 : 10))}
                    className="p-2 hover:text-[#087F5B]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                  {[350, 700, 1400, 3500].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setQuantity(tier)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                        quantity === tier
                          ? 'bg-[#063B2D] text-white border-[#063B2D] font-semibold'
                          : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="py-3.5 rounded-xl bg-white border border-[#087F5B] text-[#087F5B] hover:bg-[#087F5B] hover:text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="py-3 rounded-xl bg-[#082A21] hover:bg-[#063B2D] border border-[#C8A45D]/40 text-[#C8A45D] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" /> Request Bulk Quote
                </button>

                <a
                  href={`https://wa.me/918790431313?text=Enquiry%20for%20${encodeURIComponent(product.name)}%20quantity%20${quantity}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
                </a>
              </div>
            </div>

            {/* Nature's Canopy Upsell Banner */}
            <div className="p-4 rounded-2xl bg-[#082A21] text-white border border-[#C8A45D]/30 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#C8A45D] font-bold uppercase tracking-wider block">
                  Turnkey Plantation Service
                </span>
                <p className="text-xs text-stone-200">
                  Need professional land survey, pit augering, and drip setup for this order?
                </p>
              </div>
              <Link
                to="/plantation-services"
                className="px-3.5 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold whitespace-nowrap hover:bg-[#48A868] transition-colors shrink-0"
              >
                Nature's Canopy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Information Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E2E4D8] overflow-hidden shadow-sm">
          {/* Tabs Navigation Header */}
          <div className="flex overflow-x-auto border-b border-stone-200 bg-[#F8F7F1] scrollbar-thin">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'border-[#087F5B] text-[#063B2D] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="p-6 sm:p-8 text-xs text-stone-700 leading-relaxed min-h-[220px]">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Product Overview</h3>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Botanical & Morphological Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="border-b border-stone-200 pb-2">
                      <span className="text-stone-400 block text-[11px]">{key}</span>
                      <strong className="text-stone-800">{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'planting' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Field Planting Protocols</h3>
                <div className="space-y-2.5">
                  {product.plantingGuidelines.map((guide, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-[#087F5B] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{guide}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'soil' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Soil & Climate Suitability Matrix</h3>
                <p>{product.soilClimateSuitability}</p>
                <div className="p-4 rounded-2xl bg-[#082A21] text-white space-y-2">
                  <span className="text-[#C8A45D] font-bold block text-xs uppercase">Targeted Clone Parameters ({cloneData.id})</span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] text-stone-300">
                    <div>
                      <strong>Recommended Soil:</strong> {cloneData.soilSuitability.join(', ')}
                    </div>
                    <div>
                      <strong>Annual Rainfall:</strong> {cloneData.rainfallRequirement}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">First-Year Silvicultural Care</h3>
                <p>Maintain consistent moisture around the root basin during the initial 90 days. Avoid water stagnation by installing drainage trenches if planting on black cotton soils.</p>
                <p>Perform side-shoot debudding twice a year using sterilized loppers to promote clean vertical knot-free boles.</p>
              </div>
            )}

            {activeTab === 'research' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Scientific & Clonal Provenance</h3>
                <p>Tissue samples originated from verified candidate plus-trees (CPTs) with over 40 years of field standing. Micropropagation protocols developed under the guidance of Dr. Balakrishna and Mother Biotech R&D.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#F8F7F1] p-4 rounded-2xl border border-stone-200">
                  <div className="rounded-xl overflow-hidden h-44 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80"
                      alt="Tree trunk circumference and caliper biometric audit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <span className="text-[10px] font-bold uppercase text-[#087F5B]">Standard Biometric Audit Protocol</span>
                    <strong className="block text-stone-800">Calibrated Girth (DBH) Monitoring</strong>
                    <p className="text-[11px] leading-relaxed">
                      All research plots and Nature's Canopy managed client blocks undergo systematic quarterly diameter-at-breast-height (1.37m) recording to track heartwood accumulation.
                    </p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  {cloneData.technicalHighlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Transport & Transit Security</h3>
                <p>Plants are secured in specialized root-trainer trays inside ventilated wooden or polymer shipping crates. All shipments include phytosanitary dispatch documentation and transit insurance.</p>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3 max-w-3xl">
                <h3 className="text-base font-serif font-bold text-[#063B2D]">Frequently Asked Questions</h3>
                <div>
                  <strong>Q: What is the optimal time of year to plant?</strong>
                  <p className="text-stone-500 mt-0.5">With drip irrigation infrastructure, planting can be conducted year-round. For rainfed or supplementary farms, early monsoon (June-July or October-November) is ideal.</p>
                </div>
                <div>
                  <strong>Q: Can I mix multiple clones in one plantation?</strong>
                  <p className="text-stone-500 mt-0.5">Yes, establishing block-wise multi-clone plantations (e.g., MBT-1 and MBT-2 in separate 5-acre blocks) promotes biodiversity and hedges against micro-climate variations.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-serif font-bold text-[#063B2D] mb-6">
          Related Clones & Plantation Packs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map(rel => (
            <div key={rel.id} className="bg-white rounded-3xl border border-[#E2E4D8] p-5 shadow-sm space-y-3">
              <img src={rel.images[0]} alt={rel.name} className="w-full h-44 object-cover rounded-2xl" />
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#087F5B]">{rel.cloneId}</span>
                <span className="font-bold text-[#063B2D]">₹{rel.price} / plant</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-[#172820] truncate">{rel.name}</h4>
              <Link
                to={`/shop/${rel.slug}`}
                className="block text-center py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-[#063B2D] transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={{
          id: product.id,
          name: product.name,
          cloneId: product.cloneId,
          price: product.price,
          defaultQty: quantity,
        }}
      />
    </div>
  );
};
