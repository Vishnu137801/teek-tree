import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle,
  Calculator,
  ChevronLeft,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useApp();
  const navigate = useNavigate();

  const deliveryCharge = cartTotal > 0 ? (cartTotal > 50000 ? 0 : 2500) : 0;
  const grandTotal = cartTotal + deliveryCharge;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E4D8] pb-4 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#087F5B]">
            Nursery Order Review
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#063B2D]">
            Your Plant Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-stone-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
          >
            Clear All Items
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-[#E2E4D8] shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#F1F2E8] flex items-center justify-center text-[#087F5B] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#063B2D]">Your Cart is Currently Empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Explore our certified clonal teak saplings, commercial packs, and biodiversity trial kits.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] text-white font-semibold text-xs transition-colors shadow"
            >
              Explore Shop Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(item => {
              const itemTotal = item.product.price * item.quantity;
              const hasLowStock = item.product.stock > 0 && item.product.stock < item.quantity;

              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E4D8] shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-2xl border border-stone-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#082A21] text-[#C8A45D] text-[10px] font-bold">
                          {item.product.cloneId}
                        </span>
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                          {item.product.category}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#172820] leading-snug">
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-[#063B2D] font-bold block">
                        ₹{item.product.price.toLocaleString('en-IN')} / sapling
                      </span>

                      {hasLowStock && (
                        <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold pt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Only {item.product.stock} units remaining in immediate batch. Balance placed on advance queue.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 px-2 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity - (item.product.minOrderQuantity > 1 ? 50 : 1))}
                        className="p-1 hover:text-[#087F5B]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-stone-800 px-3 text-center min-w-8">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity + (item.product.minOrderQuantity > 1 ? 50 : 1))}
                        className="p-1 hover:text-[#087F5B]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-bold text-[#063B2D] block">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-[11px] text-stone-400 hover:text-rose-600 flex items-center gap-1 ml-auto transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#087F5B] hover:text-[#063B2D] flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Box (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E4D8] shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#063B2D] border-b pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Plants Subtotal:</span>
                <span className="font-bold text-stone-800">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Nursery Ventilated Crating:</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Freight / Delivery:</span>
                <span className="font-bold text-stone-800">
                  {deliveryCharge === 0 ? 'FREE (Orders > ₹50,000)' : `₹${deliveryCharge.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>GST / Taxes:</span>
                <span className="text-stone-500">Exempt (Agricultural Planting Stock)</span>
              </div>

              <div className="pt-3 border-t-2 border-stone-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#063B2D]">Total Estimated:</span>
                <span className="text-2xl font-bold text-[#087F5B]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/plantation-calculator"
                className="w-full py-2.5 rounded-xl bg-[#F8F7F1] hover:bg-stone-200 text-[#063B2D] text-xs font-semibold transition-colors flex items-center justify-center gap-2 block text-center"
              >
                <Calculator className="w-4 h-4 text-[#087F5B]" /> Add Drip & Turnkey Setup Cost
              </Link>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                <span>100% Genuine Certified Mother Biotech Clonal Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#087F5B]" />
                <span>Direct transit from hardening nursery to farm gate</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
