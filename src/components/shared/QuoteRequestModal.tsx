import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Leaf, Calculator, CheckCircle2 } from 'lucide-react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: {
    id: string;
    name: string;
    cloneId: string;
    price: number;
    defaultQty?: number;
  };
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const { createQuotation, createEnquiry, currentUser, products, clones } = useApp();

  const [fullName, setFullName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '+91 ');
  const [acreage, setAcreage] = useState<number>(10);
  const [location, setLocation] = useState('Warangal, Telangana');
  const [selectedClone, setSelectedClone] = useState(preselectedProduct?.cloneId || 'MBT-1');
  const [quantity, setQuantity] = useState<number>(preselectedProduct?.defaultQty || 3500);
  const [notes, setNotes] = useState('Requesting detailed planting schedule and bulk freight estimate.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cloneObj = clones.find(c => c.id === selectedClone);
    const unitPrice = preselectedProduct?.price || 110;
    const subtotal = quantity * unitPrice;
    const discount = quantity >= 5000 ? subtotal * 0.08 : subtotal * 0.04;
    const delivery = 8000;
    const total = subtotal - discount + delivery;

    // Create Quotation
    createQuotation({
      customerId: currentUser.id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      landAcreage: acreage,
      location,
      items: [
        {
          productId: preselectedProduct?.id || 'prod-mbt1-standard',
          productName: `${cloneObj?.name || selectedClone} Tissue-Culture Teak Saplings (${quantity.toLocaleString()} units)`,
          cloneId: selectedClone,
          quantity,
          unitPrice,
          total: subtotal,
        },
      ],
      subtotal,
      discount,
      tax: 0,
      deliveryCharges: delivery,
      totalEstimated: total,
      validUntil: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
      status: 'draft',
      notes: notes,
    });

    // Also register in Enquiries
    createEnquiry({
      fullName,
      email,
      phone,
      category: 'Bulk Plant Order',
      productInterest: `${selectedClone} - ${quantity} Saplings (${acreage} Acres)`,
      quantity,
      acreage,
      location,
      message: notes,
      status: 'new',
      source: 'Website Contact',
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#082A21] border border-[#C8A45D]/40 text-stone-100 shadow-2xl overflow-hidden p-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close quote modal"
          className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#087F5B]/30 border border-[#22C55E] flex items-center justify-center mx-auto text-[#22C55E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Quotation Request Logged</h3>
            <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
              Your quotation and technical enquiry have been registered. You can track this proposal under{' '}
              <strong className="text-[#C8A45D]">Customer Dashboard → My Quotations</strong> or in the{' '}
              <strong className="text-[#A8C8A0]">Sales Operations Dashboard</strong>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white hover:bg-[#063B2D] border border-[#48A868] text-sm font-semibold transition-all shadow-md"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-1 text-[#C8A45D]">
              <Leaf className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Mother Biotech × Nature’s Canopy</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Request Official Commercial Quotation</h3>
            <p className="text-stone-300 text-xs mt-1 mb-5 leading-relaxed">
              Receive a formal quotation with bulk volume discounting, phytosanitary certificates, and optional Nature’s Canopy plantation establishment support.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="e.g. Ramesh Chandra"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Plantation Location (District, State) *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                    placeholder="e.g. Nalgonda, Telangana"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Target Clone</label>
                  <select
                    value={selectedClone}
                    onChange={e => setSelectedClone(e.target.value)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    {clones.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.id} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Land Area (Acres)</label>
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={acreage}
                    onChange={e => {
                      const val = parseFloat(e.target.value) || 1;
                      setAcreage(val);
                      setQuantity(Math.round(val * 350));
                    }}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Estimated Saplings</label>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value) || 350)}
                    className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Specific Requirements or Soil Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-[#063B2D]/80 border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C8A45D]"
                  placeholder="Water availability, expected delivery month, need for drip setup..."
                />
              </div>

              <div className="bg-[#063B2D]/60 p-3 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#C8A45D]" /> Indicative Baseline Estimate:
                </span>
                <span className="font-bold text-[#C8A45D] text-base">
                  ₹{(quantity * 110).toLocaleString('en-IN')}*
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#063B2D] text-white border border-[#48A868] hover:border-[#C8A45D] font-semibold flex items-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" /> Submit Quotation Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
