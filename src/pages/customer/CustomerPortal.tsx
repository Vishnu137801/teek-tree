import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Order, Quotation } from '../../types';
import {
  ShoppingBag,
  Truck,
  FileText,
  Trees,
  Bookmark,
  User,
  HelpCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  MapPin,
  ExternalLink,
  Plus,
  Trash2,
  Calendar,
  Send,
  Phone,
  CreditCard,
  Bell,
  Activity,
  Compass,
  Printer,
  Download,
  Check,
  Building2,
  AlertCircle,
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const location = useLocation();
  const { currentUser, orders, quotations, projects, wishlist, products, addToCart, toggleWishlist, addToast } = useApp();

  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Address Management State
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Peddapuram Teak Farm (Primary Gate)',
      street: 'Survey No. 42/B, Gollaprolu Road',
      city: 'Peddapuram',
      district: 'East Godavari',
      state: 'Andhra Pradesh',
      pincode: '533437',
      phone: currentUser.phone,
      isDefault: true,
      category: 'Plantation Site',
    },
    {
      id: 'addr-2',
      title: 'Corporate Headquarters / Billing',
      street: 'Plot 104, Jubilee Enclave, Hitec City',
      city: 'Hyderabad',
      district: 'Rangareddy',
      state: 'Telangana',
      pincode: '500081',
      phone: currentUser.phone,
      isDefault: false,
      category: 'Billing & Corporate',
    },
  ]);
  const [newAddrModalOpen, setNewAddrModalOpen] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrDistrict, setNewAddrDistrict] = useState('');
  const [newAddrState, setNewAddrState] = useState('Andhra Pradesh');
  const [newAddrPin, setNewAddrPin] = useState('');

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Consignment MBT-2026-088 Hardened & In Transit',
      category: 'Dispatch',
      date: 'Today, 10:30 AM',
      read: false,
      message: 'Your 3,500 MBT-1 & MBT-5 clonal teak saplings left our Hyderabad nursery in ventilated transport crates. ETA tomorrow morning.',
    },
    {
      id: 'notif-2',
      title: 'Quarterly Biometric Audit Completed',
      category: 'Agronomy',
      date: 'Yesterday',
      read: false,
      message: 'Field Agronomist Suresh Varma audited Block Alpha at Godavari Estate. 98.4% survival rate recorded with average 14.2 cm girth.',
    },
    {
      id: 'notif-3',
      title: 'Commercial Bulk Proposal Approved',
      category: 'Quotation',
      date: '3 days ago',
      read: true,
      message: 'Your quotation QT-2026-104 for 10,000 tissue-culture saplings has been confirmed with complimentary agronomy survey.',
    },
    {
      id: 'notif-4',
      title: 'Pre-Monsoon Fertigation Advisory',
      category: 'Advisory',
      date: '1 week ago',
      read: true,
      message: 'Recommended soil nutrient application window opens next week. Check the Estate Management dashboard for dosage chart.',
    },
  ]);

  // Determine current active subview from pathname
  const path = location.pathname;
  let activeTab = 'overview';
  if (path.includes('/orders')) activeTab = 'orders';
  else if (path.includes('/tracking')) activeTab = 'tracking';
  else if (path.includes('/quotations')) activeTab = 'quotations';
  else if (path.includes('/plantations')) activeTab = 'plantations';
  else if (path.includes('/my-projects')) activeTab = 'my-projects';
  else if (path.includes('/saved')) activeTab = 'saved';
  else if (path.includes('/addresses')) activeTab = 'addresses';
  else if (path.includes('/payments')) activeTab = 'payments';
  else if (path.includes('/notifications')) activeTab = 'notifications';
  else if (path.includes('/profile')) activeTab = 'profile';
  else if (path.includes('/support')) activeTab = 'support';

  const userOrders = orders; // show orders associated with current demo environment
  const userQuotations = quotations;
  const userProjects = projects;
  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const activeOrdersCount = userOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const pendingQuotesCount = userQuotations.filter(q => q.status === 'sent' || q.status === 'draft').length;

  return (
    <div className="space-y-8">
      {/* OVERVIEW SUBVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-[#082A21] via-[#063B2D] to-[#082A21] rounded-3xl p-6 sm:p-8 text-white border border-[#C8A45D]/30 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D]">
                Landowner Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Welcome back, {currentUser.name}!
              </h2>
              <p className="text-xs text-stone-300">
                Manage your clonal teak sapling orders, bulk quotations, and Nature’s Canopy estate surveys.
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to="/shop"
                className="px-5 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white text-xs font-semibold shadow transition-colors"
              >
                Buy Clonal Plants
              </Link>
              <Link
                to="/plantation-calculator"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8A45D] text-xs font-semibold border border-white/20 transition-colors"
              >
                Plantation Calculator
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Orders</span>
              <div className="text-2xl font-bold text-[#063B2D]">{userOrders.length}</div>
              <Link to="/dashboard/orders" className="text-[11px] text-[#087F5B] hover:underline font-semibold flex items-center gap-1">
                View orders <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Active Deliveries</span>
              <div className="text-2xl font-bold text-amber-600">{activeOrdersCount}</div>
              <Link to="/dashboard/tracking" className="text-[11px] text-[#087F5B] hover:underline font-semibold flex items-center gap-1">
                Track status <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Pending Quotations</span>
              <div className="text-2xl font-bold text-[#087F5B]">{pendingQuotesCount}</div>
              <Link to="/dashboard/quotations" className="text-[11px] text-[#087F5B] hover:underline font-semibold flex items-center gap-1">
                Review quotes <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Plantation Projects</span>
              <div className="text-2xl font-bold text-[#082A21]">{userProjects.length}</div>
              <Link to="/dashboard/plantations" className="text-[11px] text-[#087F5B] hover:underline font-semibold flex items-center gap-1">
                Manage estates <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Recent Orders Snapshot */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-base text-[#063B2D]">Recent Orders</h3>
              <Link to="/dashboard/orders" className="text-xs font-semibold text-[#087F5B] hover:underline">
                See All
              </Link>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {userOrders.slice(0, 3).map(order => (
                <div key={order.id} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <strong className="text-stone-900 block">{order.orderNumber}</strong>
                    <span className="text-stone-500">
                      {order.items.length} product(s) • {order.items.reduce((s, i) => s + i.quantity, 0)} saplings
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#063B2D] block">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MY ORDERS SUBVIEW */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">My Orders History</h3>
              <p className="text-xs text-stone-500">Track and view dispatch details for all plant purchases.</p>
            </div>
            <Link to="/shop" className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow">
              Order More Plants
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold">
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Consignment</th>
                  <th className="pb-3">Quantity</th>
                  <th className="pb-3">Total Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {userOrders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/60">
                    <td className="py-3.5 font-bold text-[#063B2D]">{order.orderNumber}</td>
                    <td className="py-3.5 text-stone-500">{order.createdAt.split('T')[0]}</td>
                    <td className="py-3.5 text-stone-800 font-medium truncate max-w-[200px]">
                      {order.items.map(i => i.productName).join(', ')}
                    </td>
                    <td className="py-3.5 text-stone-700 font-semibold">
                      {order.items.reduce((s, i) => s + i.quantity, 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 font-bold text-stone-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrderForModal(order)}
                        className="text-[#087F5B] hover:text-[#063B2D] font-semibold underline text-xs"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDER TRACKING SUBVIEW */}
      {activeTab === 'tracking' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Live Consignment Tracking</h3>
            <p className="text-xs text-stone-500">Monitor acclimatized nursery crate movements from Hyderabad hub to your plantation gate.</p>
          </div>

          {userOrders.map(order => (
            <div key={order.id} className="bg-[#F8F7F1] rounded-2xl p-5 border border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3 text-xs">
                <div>
                  <strong className="text-stone-900 text-sm">{order.orderNumber}</strong>
                  <span className="text-stone-500 ml-2">({order.items.reduce((s, i) => s + i.quantity, 0)} Saplings)</span>
                </div>
                <div className="text-stone-600">
                  Tracking Waybill: <strong className="text-[#063B2D]">{order.trackingNumber || 'PENDING DISPATCH'}</strong>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-1">
                {[
                  { label: 'Order Placed', reached: true },
                  { label: 'Payment Confirmed', reached: order.paymentStatus === 'completed' },
                  { label: 'Nursery Hardening Lot', reached: order.status !== 'placed' },
                  { label: 'In Transit Crate', reached: order.status === 'dispatched' || order.status === 'delivered' },
                  { label: 'Delivered at Gate', reached: order.status === 'delivered' },
                ].map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${
                      st.reached ? 'bg-[#087F5B] text-white shadow' : 'bg-stone-200 text-stone-500'
                    }`}>
                      {st.reached ? '✓' : i + 1}
                    </span>
                    <span className={`block font-semibold text-[11px] ${st.reached ? 'text-[#063B2D]' : 'text-stone-400'}`}>
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                <span>Destination: {order.shippingAddress.district}, {order.shippingAddress.state}</span>
                <span>Contact: {order.shippingAddress.phone}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MY QUOTATIONS SUBVIEW */}
      {activeTab === 'quotations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">My Quotation Requests</h3>
              <p className="text-xs text-stone-500">Commercial bulk estimates prepared by our sales and agronomy team.</p>
            </div>
            <Link
              to="/plantation-calculator"
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow"
            >
              New Custom Quotation
            </Link>
          </div>

          <div className="space-y-4">
            {userQuotations.map(quote => (
              <div key={quote.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 text-xs">
                  <div>
                    <strong className="text-stone-900 text-sm">{quote.quoteNumber}</strong>
                    <span className="text-stone-500 ml-2">Valid Until: {quote.validUntil}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    quote.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {quote.status}
                  </span>
                </div>

                <div className="divide-y divide-stone-200 text-xs">
                  {quote.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between">
                      <span className="text-stone-700">{item.productName} ({item.quantity} units @ ₹{item.unitPrice})</span>
                      <strong className="text-stone-900">₹{item.total.toLocaleString('en-IN')}</strong>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-xs">
                  <span className="text-stone-500">Total Indicative Proposal Amount:</span>
                  <span className="text-lg font-bold text-[#063B2D]">
                    ₹{quote.totalEstimated.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLANTATION REQUESTS SUBVIEW */}
      {activeTab === 'plantations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Plantation Projects & Requests</h3>
              <p className="text-xs text-stone-500">Nature’s Canopy turnkey estate developments registered under your account.</p>
            </div>
            <Link
              to="/plantation-services"
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow"
            >
              Book New Survey
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProjects.map(proj => (
              <div key={proj.id} className="bg-[#F8F7F1] rounded-2xl p-5 border border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#087F5B]">{proj.code}</span>
                  <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full font-bold text-[#063B2D] border">
                    {proj.stage}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#172820]">{proj.title}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Land Area:</span>
                    <strong>{proj.acreage} Acres</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Saplings:</span>
                    <strong>{proj.saplingCount.toLocaleString()} Trees</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Survival:</span>
                    <strong>{proj.survivalRate}%</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Avg Height:</span>
                    <strong>{proj.averageHeightMeters} m</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAVED PLANTS / WISHLIST SUBVIEW */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Saved Plants & Clones</h3>
              <p className="text-xs text-stone-500">Your bookmarked saplings for upcoming plantation cycles.</p>
            </div>
            <Link to="/shop" className="text-xs text-[#087F5B] font-semibold hover:underline">
              Browse More Plants
            </Link>
          </div>

          {savedProducts.length === 0 ? (
            <p className="text-xs text-stone-500 py-6 text-center">No saved plants. Click the heart icon on any product to save it here.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map(p => (
                <div key={p.id} className="bg-[#F8F7F1] rounded-2xl p-4 border border-stone-200 space-y-3">
                  <img src={p.images[0]} alt="" className="w-full h-36 object-cover rounded-xl" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#087F5B]">{p.cloneId}</span>
                    <span className="font-bold text-[#063B2D]">₹{p.price}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#172820] truncate">{p.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(p, p.minOrderQuantity)}
                      className="flex-1 py-1.5 rounded-lg bg-[#087F5B] text-white text-xs font-semibold shadow"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-1.5 rounded-lg bg-stone-200 hover:text-rose-600 text-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MY PLANTATION PROJECTS SUBVIEW */}
      {activeTab === 'my-projects' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">My Managed Plantation Estates</h3>
              <p className="text-xs text-stone-500">Live agronomic telemetry, survival audits, and canopy growth monitoring by Nature’s Canopy.</p>
            </div>
            <Link
              to="/plantation-services"
              className="px-4 py-2 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white text-xs font-semibold shadow transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Book Survey / New Estate
            </Link>
          </div>

          <div className="space-y-6">
            {userProjects.map(proj => (
              <div key={proj.id} className="rounded-2xl border border-stone-200 bg-[#F8F7F1] p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#087F5B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {proj.code}
                      </span>
                      <h4 className="font-serif font-bold text-lg text-[#063B2D]">{proj.title}</h4>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {proj.location} • Established: {proj.startDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-white text-[#063B2D] border shadow-xs">
                      Stage: {proj.stage}
                    </span>
                  </div>
                </div>

                {/* Plantation KPI Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Acreage</span>
                    <strong className="text-base text-[#063B2D]">{proj.acreage} Acres</strong>
                    <span className="text-[10px] text-stone-500 block">Drip lines installed</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Tree Population</span>
                    <strong className="text-base text-[#087F5B]">{proj.saplingCount.toLocaleString()} Trees</strong>
                    <span className="text-[10px] text-stone-500 block">MBT Clonal Teak</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Canopy Survival</span>
                    <strong className="text-base text-emerald-700">{proj.survivalRate}%</strong>
                    <span className="text-[10px] text-emerald-600 block">Exceeds 95% target</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Mean Height / Girth</span>
                    <strong className="text-base text-[#C8A45D]">{proj.averageHeightMeters}m / {proj.averageGirthCm}cm</strong>
                    <span className="text-[10px] text-stone-500 block">DBH calibrated</span>
                  </div>
                </div>

                {/* Recent Maintenance & Agronomy Advisory */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <strong className="text-stone-800 text-xs block font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#087F5B]" /> Recent Maintenance & Agronomy Log
                  </strong>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-600">
                    {proj.maintenanceTasks.slice(0, 2).map(task => (
                      <div key={task.id} className="p-2.5 rounded-lg bg-[#F8F7F1] border flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-stone-900 block">{task.title}</span>
                          <span className="text-[11px] text-stone-500">{task.category} • Due: {task.dueDate}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <span className="text-stone-500 italic">
                    Assigned Estate Agronomist: <strong>Suresh Varma (+91 94401 22849)</strong>
                  </span>
                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/919440122849?text=Hello%20Nature's%20Canopy%20team,%20inquiring%20about%20my%20plantation%20project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#087F5B] hover:bg-[#48A868] text-white text-xs font-semibold shadow transition-colors inline-flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp Agronomist
                    </a>
                    <button
                      onClick={() => addToast('info', 'Inspection Schedule', 'Next quarterly drone and caliper survey is scheduled for the 15th of next month.')}
                      className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      Inspection Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADDRESSES SUBVIEW */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Plantation & Delivery Addresses</h3>
              <p className="text-xs text-stone-500">Configure farm coordinates for nursery crate delivery and corporate billing addresses.</p>
            </div>
            <button
              onClick={() => setNewAddrModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAddresses.map(addr => (
              <div
                key={addr.id}
                className={`p-5 rounded-2xl border transition-all ${
                  addr.isDefault
                    ? 'border-[#087F5B] bg-[#087F5B]/5 shadow-xs'
                    : 'border-stone-200 bg-[#F8F7F1]'
                } space-y-3 text-xs`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {addr.category}
                    </span>
                    <strong className="text-sm font-serif text-[#063B2D]">{addr.title}</strong>
                  </div>
                  {addr.isDefault && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#087F5B] text-white flex items-center gap-1">
                      <Check className="w-3 h-3" /> Default Delivery
                    </span>
                  )}
                </div>

                <div className="text-stone-600 space-y-1">
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.district}, {addr.state} - {addr.pincode}</p>
                  <p className="font-semibold text-stone-800">Phone for Logistics Dispatch: {addr.phone}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  {!addr.isDefault ? (
                    <button
                      onClick={() => {
                        setSavedAddresses(prev =>
                          prev.map(a => ({ ...a, isDefault: a.id === addr.id }))
                        );
                        addToast('success', 'Default Address Updated', `${addr.title} set as primary.`);
                      }}
                      className="text-xs font-semibold text-[#087F5B] hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-[11px] text-stone-400">Primary Waybill Destination</span>
                  )}

                  <button
                    onClick={() => {
                      if (savedAddresses.length <= 1) {
                        addToast('error', 'Cannot Delete', 'You must maintain at least one delivery address.');
                        return;
                      }
                      setSavedAddresses(prev => prev.filter(a => a.id !== addr.id));
                      addToast('info', 'Address Removed', 'Address removed from your profile.');
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Address Modal */}
          {newAddrModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative text-xs">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-serif font-bold text-lg text-[#063B2D]">Add New Delivery Address</h3>
                  <button onClick={() => setNewAddrModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const newId = `addr-${Date.now()}`;
                    setSavedAddresses(prev => [
                      ...prev,
                      {
                        id: newId,
                        title: newAddrTitle || 'Farm Location',
                        street: newAddrStreet,
                        city: newAddrCity,
                        district: newAddrDistrict,
                        state: newAddrState,
                        pincode: newAddrPin,
                        phone: currentUser.phone,
                        isDefault: false,
                        category: 'Plantation Gate',
                      },
                    ]);
                    setNewAddrModalOpen(false);
                    setNewAddrTitle('');
                    setNewAddrStreet('');
                    setNewAddrCity('');
                    setNewAddrDistrict('');
                    setNewAddrPin('');
                    addToast('success', 'Address Saved', 'New plantation delivery point recorded.');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Address Label / Farm Name *</label>
                    <input
                      type="text"
                      required
                      value={newAddrTitle}
                      onChange={e => setNewAddrTitle(e.target.value)}
                      placeholder="e.g. Rajahmundry Teak Estate (North Gate)"
                      className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Street / Survey Number *</label>
                    <input
                      type="text"
                      required
                      value={newAddrStreet}
                      onChange={e => setNewAddrStreet(e.target.value)}
                      placeholder="e.g. Survey No. 118, Annavaram Bypass"
                      className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Village / City *</label>
                      <input
                        type="text"
                        required
                        value={newAddrCity}
                        onChange={e => setNewAddrCity(e.target.value)}
                        className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">District *</label>
                      <input
                        type="text"
                        required
                        value={newAddrDistrict}
                        onChange={e => setNewAddrDistrict(e.target.value)}
                        className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={newAddrState}
                        onChange={e => setNewAddrState(e.target.value)}
                        className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        value={newAddrPin}
                        onChange={e => setNewAddrPin(e.target.value)}
                        className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t">
                    <button
                      type="button"
                      onClick={() => setNewAddrModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-stone-200 text-stone-700 font-semibold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white font-semibold text-xs shadow"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAYMENTS & INVOICES SUBVIEW */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Payments & Invoices</h3>
              <p className="text-xs text-stone-500">Commercial tax invoices, RTGS receipts, and advance installment ledgers.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#063B2D] text-white text-xs font-semibold shadow flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5" /> Print Statement
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8F7F1] p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Invoiced</span>
              <div className="text-xl font-bold text-[#063B2D]">
                ₹{userOrders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-stone-500">{userOrders.length} Invoices Generated</span>
            </div>

            <div className="bg-[#F8F7F1] p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Settled via RTGS / NEFT</span>
              <div className="text-xl font-bold text-[#087F5B]">
                ₹{userOrders.filter(o => o.paymentStatus === 'completed').reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">100% Reconciled</span>
            </div>

            <div className="bg-[#F8F7F1] p-4 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Pending Milestone Dues</span>
              <div className="text-xl font-bold text-stone-600">₹0</div>
              <span className="text-[10px] text-stone-500">Account in good standing</span>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold">
                  <th className="pb-3">Invoice / Order</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Payment Method</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Tax Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {userOrders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/60">
                    <td className="py-3 font-bold text-[#063B2D]">INV-{order.orderNumber}</td>
                    <td className="py-3 text-stone-500">{order.createdAt.split('T')[0]}</td>
                    <td className="py-3 text-stone-700">Bank Transfer (RTGS / IMPS)</td>
                    <td className="py-3 font-bold text-stone-900">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-emerald-100 text-emerald-800">
                        Paid & Verified
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedOrderForModal(order)}
                        className="text-[#087F5B] hover:text-[#063B2D] font-semibold flex items-center gap-1 justify-end ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS SUBVIEW */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Notifications & Advisories</h3>
              <p className="text-xs text-stone-500">Real-time alerts regarding plant dispatches, seasonal weather warnings, and agronomy audits.</p>
            </div>
            <button
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                addToast('info', 'All Read', 'Marked all notifications as read.');
              }}
              className="text-xs font-semibold text-[#087F5B] hover:underline"
            >
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-colors ${
                  !n.read ? 'bg-[#087F5B]/5 border-[#087F5B]/30' : 'bg-[#F8F7F1] border-stone-200'
                } space-y-1.5 text-xs`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      n.category === 'Dispatch' ? 'bg-blue-100 text-blue-800' :
                      n.category === 'Agronomy' ? 'bg-emerald-100 text-emerald-800' :
                      n.category === 'Quotation' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {n.category}
                    </span>
                    <strong className="text-stone-900 font-semibold">{n.title}</strong>
                  </div>
                  <span className="text-[11px] text-stone-400">{n.date}</span>
                </div>
                <p className="text-stone-600 pl-1">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE SUBVIEW */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Personal Profile & Farm Coordinates</h3>
            <p className="text-xs text-stone-500">Manage contact information and default plantation addresses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-2xl">
            <div>
              <label className="block text-stone-500 font-semibold mb-1">Full Name</label>
              <input type="text" readOnly value={currentUser.name} className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 font-bold" />
            </div>
            <div>
              <label className="block text-stone-500 font-semibold mb-1">Email Address</label>
              <input type="email" readOnly value={currentUser.email} className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
            </div>
            <div>
              <label className="block text-stone-500 font-semibold mb-1">Phone Number</label>
              <input type="tel" readOnly value={currentUser.phone} className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
            </div>
            <div>
              <label className="block text-stone-500 font-semibold mb-1">Account Category</label>
              <input type="text" readOnly value={currentUser.accountType || 'Landowner'} className="w-full bg-[#F8F7F1] border rounded-xl p-2.5 capitalize" />
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT SUBVIEW */}
      {activeTab === 'support' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6 max-w-2xl">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Customer Care & Agronomy Support</h3>
            <p className="text-xs text-stone-500">Need silvicultural advice or have questions about sapling delivery?</p>
          </div>

          {supportSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-[#22C55E] mx-auto" />
              <strong className="text-[#063B2D] text-sm block">Support Ticket Logged</strong>
              <p className="text-stone-600">Our agronomist team will review your query and call your phone.</p>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                setSupportSubmitted(true);
                addToast('success', 'Support Ticket Created', 'Our agronomists have been notified.');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1 text-stone-700">How can our agronomy team help you?</label>
                <textarea
                  rows={4}
                  required
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-3 focus:outline-none focus:border-[#087F5B]"
                  placeholder="Describe your question or issue regarding clone suitability, delivery schedule, or pruning..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs shadow"
              >
                Submit Support Request
              </button>
            </form>
          )}
        </div>
      )}

      {/* ORDER DETAIL RECEIPT MODAL */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl relative text-xs">
            <h3 className="font-serif font-bold text-lg text-[#063B2D]">
              Order Receipt: {selectedOrderForModal.orderNumber}
            </h3>

            <div className="space-y-2 border-y py-3">
              {selectedOrderForModal.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.productName} ({item.quantity}x)</span>
                  <strong>₹{item.totalPrice.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-sm text-[#063B2D]">
              <span>Grand Total:</span>
              <span>₹{selectedOrderForModal.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-[#F8F7F1] p-3 rounded-xl text-[11px] space-y-1">
              <span>Delivery Address:</span>
              <p className="font-semibold text-stone-800">
                {selectedOrderForModal.shippingAddress.street}, {selectedOrderForModal.shippingAddress.city}, {selectedOrderForModal.shippingAddress.district}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="px-4 py-2 bg-stone-200 text-stone-800 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
