import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Order, Address } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Building,
  Clock,
  ArrowRight,
  ChevronLeft,
  FileText,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, createOrder, currentUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form States
  const [customerInfo, setCustomerInfo] = useState({
    name: currentUser.name || 'Raghavendra Varma',
    email: currentUser.email || 'raghavendra.varma@example.com',
    phone: currentUser.phone || '+91 98850 12345',
    accountType: 'Landowner / Estate Farmer',
  });

  const [address, setAddress] = useState<Address>({
    id: 'addr-' + Date.now(),
    type: 'plantation',
    fullName: currentUser.name || 'Raghavendra Varma',
    street: 'Survey No. 142, Godavari Basin Plantation Road',
    city: 'Rajahmundry',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    pincode: '533101',
    phone: currentUser.phone || '+91 98850 12345',
    isDefault: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('online_demo');
  const [notes, setNotes] = useState('Please arrange delivery in ventilated pallets. Driver to call 2 hours prior to arrival.');

  const deliveryCharge = cartTotal > 50000 ? 0 : 2500;
  const grandTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#063B2D]">Your Cart is Empty</h2>
        <p className="text-xs text-stone-500">Add saplings or plantation packs before accessing checkout.</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleCompleteOrder = () => {
    const newOrder = createOrder({
      customerId: currentUser.id,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: cart.map(i => ({
        productId: i.productId,
        productName: i.product.name,
        cloneId: i.product.cloneId,
        unitPrice: i.product.price,
        quantity: i.quantity,
        totalPrice: i.product.price * i.quantity,
        image: i.product.images[0],
      })),
      subtotal: cartTotal,
      deliveryCharges: deliveryCharge,
      taxAmount: 0,
      totalAmount: grandTotal,
      status: 'confirmed',
      paymentStatus: paymentMethod === 'pay_later' ? 'pending' : 'completed',
      paymentMethod,
      shippingAddress: address,
      notes,
    });

    navigate(`/order-success?orderId=${newOrder.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 space-y-8">
      {/* Checkout Steps Indicator */}
      <div className="flex items-center justify-between border-b border-[#E2E4D8] pb-6 max-w-3xl mx-auto text-xs">
        {[
          { num: 1, label: 'Customer Info' },
          { num: 2, label: 'Farm Delivery Address' },
          { num: 3, label: 'Review Items' },
          { num: 4, label: 'Payment (Demo)' },
        ].map(s => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <div key={s.num} className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-[#087F5B] text-white shadow-md'
                    : isDone
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                {isDone ? '✓' : s.num}
              </span>
              <span className={`font-semibold hidden sm:inline ${isCurrent ? 'text-[#063B2D]' : 'text-stone-400'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Content (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          {/* STEP 1: CUSTOMER INFO */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">
                Step 1: Landowner / Buyer Details
              </h3>
              <p className="text-xs text-stone-500">
                Contact information for dispatch notifications and nursery phytosanitary transit paperwork.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Buyer Category</label>
                  <select
                    value={customerInfo.accountType}
                    onChange={e => setCustomerInfo({ ...customerInfo, accountType: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option>Landowner / Estate Farmer</option>
                    <option>Corporate Agroforestry Investor</option>
                    <option>Commercial Nursery Reseller</option>
                    <option>Individual Plant Enthusiast</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold flex items-center gap-2 shadow"
                >
                  Continue to Delivery Address <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">
                Step 2: Farm Delivery Location
              </h3>
              <p className="text-xs text-stone-500">
                Specify the exact farm gate or unloading point for crate transit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1 text-stone-700">Farm / Estate Address (Survey No. & Landmark) *</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">City / Village *</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">District *</label>
                  <input
                    type="text"
                    required
                    value={address.district}
                    onChange={e => setAddress({ ...address, district: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">State *</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={e => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs text-stone-700">Delivery Notes for Driver / Unloading Team</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold flex items-center gap-2 shadow"
                >
                  Continue to Review Items <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER REVIEW */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">
                Step 3: Review Clonal Saplings
              </h3>

              <div className="divide-y divide-stone-100 space-y-3">
                {cart.map(item => (
                  <div key={item.productId} className="pt-3 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl" />
                      <div>
                        <strong className="text-stone-900 block">{item.product.name}</strong>
                        <span className="text-stone-400">{item.product.cloneId} • {item.quantity} Units @ ₹{item.product.price}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#063B2D] text-sm">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#F8F7F1] p-4 rounded-2xl border text-xs space-y-1">
                <span className="text-stone-500 block">Delivery Destination:</span>
                <strong className="text-stone-800 block">{address.street}, {address.city}, {address.district}, {address.state} - {address.pincode}</strong>
                <span className="text-stone-500 block">Contact: {customerInfo.phone} ({customerInfo.name})</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-semibold flex items-center gap-2 shadow"
                >
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT METHOD (DEMO) */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">
                Step 4: Select Payment Method (Simulated Demo)
              </h3>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
                <strong>Demo Mode Active:</strong> No real payment gateways or credit cards are charged. This simulated flow generates an official order record in your local database.
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    id: 'online_demo',
                    title: 'Online Payment (Instant Confirmation Simulation)',
                    desc: 'UPI, NetBanking, Debit/Credit Card demo simulation.',
                    icon: CreditCard,
                  },
                  {
                    id: 'bank_transfer_demo',
                    title: 'Direct Bank NEFT / RTGS Transfer (Demo)',
                    desc: 'Generates bank beneficiary details for official account transfer.',
                    icon: Building,
                  },
                  {
                    id: 'pay_later',
                    title: 'Pay on Dispatch / Sales Order Confirmation',
                    desc: 'Sales representative validates farm pits prior to final settlement.',
                    icon: Clock,
                  },
                ].map(opt => {
                  const Icon = opt.icon;
                  const isChecked = paymentMethod === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked ? 'bg-[#087F5B]/10 border-[#087F5B]' : 'bg-[#F8F7F1] border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={isChecked}
                        onChange={() => setPaymentMethod(opt.id as any)}
                        className="mt-1 text-[#087F5B] focus:ring-[#087F5B]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-bold text-stone-900">
                          <Icon className="w-4 h-4 text-[#087F5B]" /> {opt.title}
                        </div>
                        <p className="text-stone-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                >
                  <Lock className="w-4 h-4" /> Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-base text-[#063B2D] border-b pb-2">
            Order Total
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)} saplings):</span>
              <strong className="text-stone-900">₹{cartTotal.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Freight:</span>
              <strong className="text-stone-900">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</strong>
            </div>
            <div className="pt-2 border-t-2 border-stone-800 flex justify-between text-sm font-bold">
              <span className="text-[#063B2D]">Grand Total:</span>
              <span className="text-[#087F5B]">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-3 border-t text-[11px] text-stone-400 space-y-1">
            <p>✓ Automated stock deduction upon confirmation</p>
            <p>✓ Track order status in Customer & Admin portals</p>
          </div>
        </div>
      </div>
    </div>
  );
};
