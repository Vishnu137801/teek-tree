import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#087F5B', '#C8A45D', '#48A868', '#063B2D'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#063B2D]">Order Not Found</h2>
        <Link to="/" className="px-5 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28 space-y-8">
      {/* Success Hero */}
      <div className="bg-[#082A21] rounded-3xl p-8 sm:p-12 text-white border border-[#C8A45D]/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#087F5B]/30 border border-[#22C55E] flex items-center justify-center text-[#22C55E] mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D] block">
          Order Successfully Placed
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Thank You for Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
          Your order has been recorded in our dispatch database. Nursery teams are preparing your clonal sapling consignment for acclimatized transit.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <div className="bg-[#063B2D] px-4 py-2 rounded-xl border border-stone-700 text-xs text-stone-300">
            Order Reference: <strong className="text-white ml-1">{order.orderNumber}</strong>
          </div>
          <div className="bg-[#063B2D] px-4 py-2 rounded-xl border border-stone-700 text-xs text-stone-300">
            Total Amount: <strong className="text-[#C8A45D] ml-1">₹{order.totalAmount.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>

      {/* Tracking Roadmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-[#063B2D]">
          Fulfillment & Dispatch Timeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-2">
          {[
            { label: 'Order Placed', active: true },
            { label: 'Confirmed', active: true },
            { label: 'Nursery Prep', active: false },
            { label: 'Crate Dispatched', active: false },
            { label: 'Farm Delivery', active: false },
          ].map((st, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-1">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mx-auto ${
                st.active ? 'bg-[#087F5B] text-white shadow' : 'bg-stone-200 text-stone-500'
              }`}>
                {st.active ? '✓' : i + 1}
              </span>
              <span className={`block font-semibold text-[11px] ${st.active ? 'text-[#063B2D]' : 'text-stone-400'}`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="font-serif font-bold text-lg text-[#063B2D]">
            Order Receipt & Delivery Coordinates
          </h3>
          <button
            onClick={() => window.print()}
            className="text-xs text-[#087F5B] hover:text-[#063B2D] font-semibold flex items-center gap-1.5 print:hidden"
          >
            <Printer className="w-3.5 h-3.5" /> Print Receipt
          </button>
        </div>

        {/* Item Rows */}
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-xl" />
                <div>
                  <strong className="text-stone-900 block">{item.productName}</strong>
                  <span className="text-stone-500">{item.cloneId} • {item.quantity} units @ ₹{item.unitPrice}</span>
                </div>
              </div>
              <strong className="text-stone-900 text-sm">
                ₹{item.totalPrice.toLocaleString('en-IN')}
              </strong>
            </div>
          ))}
        </div>

        {/* Totals & Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
          <div className="bg-[#F8F7F1] p-4 rounded-2xl border space-y-1">
            <span className="text-stone-400 uppercase font-bold text-[10px] block">Farm Unloading Address:</span>
            <strong className="text-stone-800 block">{order.shippingAddress.fullName}</strong>
            <p className="text-stone-600 leading-snug">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.district}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <span className="text-stone-500 block pt-1">Phone: {order.shippingAddress.phone}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Freight Delivery:</span>
              <span>{order.deliveryCharges === 0 ? 'FREE' : `₹${order.deliveryCharges}`}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Payment Status:</span>
              <span className="text-emerald-600 font-bold capitalize">{order.paymentStatus}</span>
            </div>
            <div className="pt-2 border-t-2 border-stone-800 flex justify-between font-bold text-sm">
              <span className="text-[#063B2D]">Grand Total:</span>
              <span className="text-[#087F5B]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t flex flex-wrap justify-between items-center gap-3">
          <Link
            to="/dashboard/orders"
            className="px-6 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] text-white text-xs font-semibold shadow flex items-center gap-2"
          >
            Track in Customer Portal <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
          >
            Continue Browsing Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
