import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Order, Enquiry, Quotation, InventoryBatch } from '../../types';
import {
  Users,
  FileText,
  ShoppingBag,
  Boxes,
  Truck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  AlertTriangle,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Phone,
  Calendar,
} from 'lucide-react';

export const SalesOperationsPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    enquiries,
    updateEnquiryStatus,
    orders,
    updateOrderStatus,
    quotations,
    createQuotation,
    updateQuotationStatus,
    inventoryBatches,
    updateBatchStock,
    stockMovements,
    clones,
    addToast,
  } = useApp();

  const path = location.pathname;
  let activeTab = 'overview';
  if (path.includes('/leads')) activeTab = 'leads';
  else if (path.includes('/quotations')) activeTab = 'quotations';
  else if (path.includes('/orders')) activeTab = 'orders';
  else if (path.includes('/inventory')) activeTab = 'inventory';
  else if (path.includes('/dispatch')) activeTab = 'dispatch';
  else if (path.includes('/follow-ups')) activeTab = 'follow-ups';

  // Quotation Builder Form State
  const [newQuoteClient, setNewQuoteClient] = useState('');
  const [newQuotePhone, setNewQuotePhone] = useState('+91 ');
  const [newQuoteEmail, setNewQuoteEmail] = useState('');
  const [newQuoteClone, setNewQuoteClone] = useState('MBT-1');
  const [newQuoteQty, setNewQuoteQty] = useState(3500);
  const [newQuotePrice, setNewQuotePrice] = useState(110);
  const [newQuoteDiscount, setNewQuoteDiscount] = useState(15000);
  const [newQuoteFreight, setNewQuoteFreight] = useState(8000);

  // Follow-ups state
  const [followUpsList, setFollowUpsList] = useState([
    { id: 'fu-1', client: 'Harish Reddy', task: 'Follow up on 25-Acre Warangal Turnkey Quotation', due: 'Today', priority: 'High', status: 'Pending' },
    { id: 'fu-2', client: 'Dr. Venkat Raman', task: 'Send MBT-4 Coastal Shield technical report', due: 'Tomorrow', priority: 'Medium', status: 'Pending' },
    { id: 'fu-3', client: 'Captain Ramesh Babu', task: 'Verify field pit augering for 50-Acre Mahabubnagar estate', due: 'In 3 Days', priority: 'High', status: 'Pending' },
  ]);
  const [newFuClient, setNewFuClient] = useState('');
  const [newFuTask, setNewFuTask] = useState('');
  const [newFuDue, setNewFuDue] = useState('Tomorrow');
  const [newFuPriority, setNewFuPriority] = useState('High');

  // Stock Adjustment Modal / State
  const [adjustingBatchId, setAdjustingBatchId] = useState<string | null>(null);
  const [adjustNewStock, setAdjustNewStock] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<'Nursery Propagation' | 'Dispatch Order' | 'Mortality Adjustment' | 'Audit Reconciliation'>('Nursery Propagation');

  // Dispatch Waybill State
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const totalSalesRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'preparing');
  const totalNurseryStock = inventoryBatches.reduce((sum, b) => sum + b.currentStock, 0);

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = newQuoteQty * newQuotePrice;
    const total = subtotal - newQuoteDiscount + newQuoteFreight;

    createQuotation({
      customerName: newQuoteClient,
      customerEmail: newQuoteEmail,
      customerPhone: newQuotePhone,
      location: 'Regional Farm Delivery',
      items: [
        {
          productId: 'custom-quote-prod',
          productName: `${newQuoteClone} Hardened Clonal Saplings`,
          cloneId: newQuoteClone,
          quantity: newQuoteQty,
          unitPrice: newQuotePrice,
          total: subtotal,
        },
      ],
      subtotal,
      discount: newQuoteDiscount,
      tax: 0,
      deliveryCharges: newQuoteFreight,
      totalEstimated: total,
      validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'sent',
      assignedStaffName: 'Vikram Joshi (Sales Desk)',
      notes: 'Generated via Sales Operations Quotation Builder.',
    });

    setNewQuoteClient('');
    setNewQuoteEmail('');
    setNewQuotePhone('+91 ');
    addToast('success', 'Quotation Dispatched', 'Quotation saved and sent to customer account.');
  };

  return (
    <div className="space-y-8">
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Sales Invoiced</span>
              <div className="text-2xl font-bold text-[#063B2D]">
                ₹{totalSalesRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">{orders.length} Orders Recorded</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">New Inquiries</span>
              <div className="text-2xl font-bold text-amber-600">{enquiries.filter(e => e.status === 'new').length}</div>
              <span className="text-[10px] text-stone-400">Awaiting Agronomist Call</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Nursery Sapling Stock</span>
              <div className="text-2xl font-bold text-[#087F5B]">{totalNurseryStock.toLocaleString()}</div>
              <span className="text-[10px] text-stone-400">Across 4 Hardening Bays</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Orders in Preparation</span>
              <div className="text-2xl font-bold text-[#082A21]">{pendingOrders.length}</div>
              <span className="text-[10px] text-stone-400">Awaiting Crate Waybill</span>
            </div>
          </div>

          {/* Quick Enquiries Review */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-base text-[#063B2D]">Recent Farmer Enquiries</h3>
              <span className="text-xs text-stone-500">{enquiries.length} Total Registered</span>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {enquiries.slice(0, 4).map(enq => (
                <div key={enq.id} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <strong className="text-stone-900 block">{enq.fullName} • {enq.phone}</strong>
                    <span className="text-stone-500">{enq.category} • {enq.location} ({enq.acreage || 1} Acres)</span>
                    <p className="text-stone-600 italic text-[11px] mt-0.5 line-clamp-1">{enq.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      enq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {enq.status}
                    </span>
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, enq.status === 'new' ? 'in_progress' : 'contacted')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold"
                    >
                      Advance Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Farmer Leads & Enquiries</h3>
              <p className="text-xs text-stone-500">Inbound requests from public contact, clone, and plantation forms.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500">
                  <th className="pb-3">Lead Ref</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Interest / Acreage</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-stone-50">
                    <td className="py-3 font-bold text-[#063B2D]">{enq.enquiryNumber}</td>
                    <td className="py-3">
                      <strong className="block text-stone-900">{enq.fullName}</strong>
                      <span className="text-stone-400">{enq.phone}</span>
                    </td>
                    <td className="py-3 text-stone-700">{enq.category}</td>
                    <td className="py-3 text-stone-800 font-medium">
                      {enq.productInterest || `${enq.quantity} Plants`}
                    </td>
                    <td className="py-3 text-stone-600">{enq.location}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-800">
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setNewQuoteClient(enq.fullName);
                          setNewQuotePhone(enq.phone);
                          setNewQuoteEmail(enq.email || '');
                          if (enq.quantity) setNewQuoteQty(enq.quantity);
                          navigate('/operations/quotations');
                          addToast('info', 'Lead Loaded', `Preparing custom quotation for ${enq.fullName}.`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#087F5B] hover:bg-[#48A868] text-white text-[11px] font-semibold transition-colors"
                      >
                        Convert to Quote
                      </button>
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.fullName)},%20this%20is%20Mother%20Biotech%20regarding%20your%20teak%20plantation%20inquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-emerald-700 inline-block align-middle"
                        title="WhatsApp Lead"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => updateEnquiryStatus(enq.id, 'closed')}
                        className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-500 text-[11px]"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. QUOTATIONS BUILDER */}
      {activeTab === 'quotations' && (
        <div className="space-y-8">
          {/* Builder Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Generate Official Commercial Quotation</h3>
              <p className="text-xs text-stone-500">Create itemized estimates with volume discounting for land investors.</p>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newQuoteClient}
                    onChange={e => setNewQuoteClient(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                    placeholder="e.g. Someshwar Rao"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Client Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newQuotePhone}
                    onChange={e => setNewQuotePhone(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Client Email *</label>
                  <input
                    type="email"
                    required
                    value={newQuoteEmail}
                    onChange={e => setNewQuoteEmail(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Clone Variety</label>
                  <select
                    value={newQuoteClone}
                    onChange={e => setNewQuoteClone(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    {clones.map(c => (
                      <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Quantity (Units)</label>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    value={newQuoteQty}
                    onChange={e => setNewQuoteQty(parseInt(e.target.value) || 50)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Unit Price (₹)</label>
                  <input
                    type="number"
                    value={newQuotePrice}
                    onChange={e => setNewQuotePrice(parseInt(e.target.value) || 110)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Bulk Discount (₹)</label>
                  <input
                    type="number"
                    value={newQuoteDiscount}
                    onChange={e => setNewQuoteDiscount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs shadow flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Issue Commercial Quotation
                </button>
              </div>
            </form>
          </div>

          {/* List of Sent Quotes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-[#063B2D]">Dispatched Quotations</h4>
            <div className="space-y-3">
              {quotations.map(q => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#F8F7F1] border flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-stone-900 block">{q.quoteNumber} — {q.customerName}</strong>
                    <span className="text-stone-500">{q.items[0]?.productName} • {q.items[0]?.quantity} Units</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#063B2D] block">₹{q.totalEstimated.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700">{q.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. ORDERS PROCESSING */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Orders Fulfillment Center</h3>
            <span className="text-xs text-stone-500">{orders.length} Total Orders</span>
          </div>

          <div className="space-y-3 text-xs">
            {orders.map(order => (
              <div key={order.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-[#063B2D]">{order.orderNumber}</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold capitalize">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-stone-600 block">{order.customerName} ({order.customerPhone})</span>
                  <span className="text-stone-400 block">{order.shippingAddress.district}, {order.shippingAddress.state}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-stone-900">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                    className="bg-white border rounded-xl p-2 text-xs font-semibold"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. NURSERY INVENTORY & BATCHES */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Nursery Inventory & Hardening Batches</h3>
              <p className="text-xs text-stone-500">Live counts across primary lab, shade house, and field-ready stock.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inventoryBatches.map(batch => (
              <div key={batch.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#087F5B]">{batch.batchCode}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-white border rounded-full font-bold">
                    {batch.hardeningStage}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-stone-900">{batch.productName} ({batch.cloneId})</h4>

                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Current Stock</span>
                    <strong className="text-lg text-[#063B2D]">{batch.currentStock.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Reserved (Orders)</span>
                    <strong className="text-lg text-amber-600">{batch.reservedStock.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-stone-500">{batch.nurseryLocation}</span>
                  <button
                    onClick={() => {
                      setAdjustingBatchId(batch.id);
                      setAdjustNewStock(batch.currentStock);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#063B2D] text-white text-[11px] font-semibold"
                  >
                    Adjust Stock
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stock Adjustment Modal */}
          {adjustingBatchId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
              <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 text-xs">
                <h4 className="font-bold text-sm text-[#063B2D]">Adjust Stock Quantity</h4>
                <div>
                  <label className="block mb-1 font-semibold">New Stock Count</label>
                  <input
                    type="number"
                    value={adjustNewStock}
                    onChange={e => setAdjustNewStock(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Adjustment Reason</label>
                  <select
                    value={adjustReason}
                    onChange={e => setAdjustReason(e.target.value as any)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2"
                  >
                    <option value="Nursery Propagation">Nursery Propagation Release</option>
                    <option value="Dispatch Order">Dispatch Order</option>
                    <option value="Mortality Adjustment">Mortality Adjustment</option>
                    <option value="Audit Reconciliation">Audit Reconciliation</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setAdjustingBatchId(null)} className="px-4 py-2 text-stone-500">Cancel</button>
                  <button
                    onClick={() => {
                      updateBatchStock(adjustingBatchId, adjustNewStock, adjustReason);
                      setAdjustingBatchId(null);
                    }}
                    className="px-5 py-2 bg-[#087F5B] text-white font-semibold rounded-xl"
                  >
                    Save Stock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. DISPATCH LOGISTICS */}
      {activeTab === 'dispatch' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Crate Transit & Dispatch Center</h3>
              <p className="text-xs text-stone-500">Assign waybill tracking references and verify plantlet dispatch consignments.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {orders.map(order => (
              <div key={order.id} className="p-4 rounded-2xl bg-[#F8F7F1] border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <strong className="text-stone-900 block text-sm">{order.orderNumber} ({order.customerName})</strong>
                  <span className="text-stone-500">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} saplings • Dest: {order.shippingAddress.district}, {order.shippingAddress.state}
                  </span>
                  <div className="text-[11px] text-[#087F5B] font-bold mt-1">
                    Waybill: {order.trackingNumber || 'Pending Assignment'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newWaybill = `TRK-MB-${Math.floor(100000 + Math.random() * 900000)}`;
                      updateOrderStatus(order.id, 'dispatched', newWaybill);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow"
                  >
                    Assign Waybill & Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CUSTOMER FOLLOW-UPS */}
      {activeTab === 'follow-ups' && (
        <div className="space-y-8">
          {/* Create Follow-up Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Schedule Client Follow-up</h3>
            <p className="text-xs text-stone-500">Record scheduled reminders for soil test reviews, quotation closings, and farm delivery confirmations.</p>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newFuClient || !newFuTask) return;
                setFollowUpsList(prev => [
                  {
                    id: `fu-${Date.now()}`,
                    client: newFuClient,
                    task: newFuTask,
                    due: newFuDue,
                    priority: newFuPriority,
                    status: 'Pending',
                  },
                  ...prev,
                ]);
                setNewFuClient('');
                setNewFuTask('');
                addToast('success', 'Follow-up Scheduled', `Reminder set for ${newFuClient}.`);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Client / Farmer Name *</label>
                  <input
                    type="text"
                    required
                    value={newFuClient}
                    onChange={e => setNewFuClient(e.target.value)}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1 text-stone-700">Follow-up Action *</label>
                  <input
                    type="text"
                    required
                    value={newFuTask}
                    onChange={e => setNewFuTask(e.target.value)}
                    placeholder="e.g. Share commercial proforma & soil pH recommendations"
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Due Schedule</label>
                  <select
                    value={newFuDue}
                    onChange={e => setNewFuDue(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="In 3 Days">In 3 Days</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#48A868] text-white font-semibold text-xs shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Schedule Reminder
                </button>
              </div>
            </form>
          </div>

          {/* Follow-up Tasks List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-[#063B2D]">Pending Sales Follow-ups</h4>
            <div className="space-y-3 text-xs">
              {followUpsList.map(fu => (
                <div
                  key={fu.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
                    fu.status === 'Completed' ? 'bg-stone-50 border-stone-200 opacity-60' : 'bg-[#F8F7F1] border-stone-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <strong className="text-stone-900 block text-sm">{fu.client}</strong>
                    <span className="text-stone-600">{fu.task}</span>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      fu.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Due: {fu.due}
                    </span>
                    <button
                      onClick={() => {
                        setFollowUpsList(prev =>
                          prev.map(item =>
                            item.id === fu.id
                              ? { ...item, status: item.status === 'Completed' ? 'Pending' : 'Completed' }
                              : item
                          )
                        );
                        addToast('info', 'Status Updated', `Task for ${fu.client} marked ${fu.status === 'Completed' ? 'pending' : 'completed'}.`);
                      }}
                      className="px-3 py-1 rounded-lg bg-white border hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                    >
                      {fu.status === 'Completed' ? 'Undo' : 'Mark Completed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
