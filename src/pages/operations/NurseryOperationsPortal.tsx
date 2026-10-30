import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { InventoryBatch, StockMovement } from '../../types';
import {
  Layers,
  Sprout,
  Boxes,
  ClipboardList,
  Activity,
  Truck,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react';

export const NurseryOperationsPortal: React.FC = () => {
  const location = useLocation();
  const {
    inventoryBatches,
    createBatch,
    updateBatch,
    updateBatchStock,
    recordStockLoss,
    reserveStock,
    releaseStock,
    transferBatch,
    stockMovements,
    clones,
    addToast,
  } = useApp();

  const path = location.pathname;
  let activeTab = 'overview';
  if (path.includes('/batches')) activeTab = 'batches';
  else if (path.includes('/stages')) activeTab = 'stages';
  else if (path.includes('/movements')) activeTab = 'movements';
  else if (path.includes('/inspections')) activeTab = 'inspections';
  else if (path.includes('/hardening')) activeTab = 'hardening';
  else if (path.includes('/dispatch')) activeTab = 'dispatch';
  else if (path.includes('/alerts')) activeTab = 'alerts';

  // Modal & Form states
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);
  const [newBatchClone, setNewBatchClone] = useState('MBT-1');
  const [newBatchQty, setNewBatchQty] = useState(5000);
  const [newBatchLocation, setNewBatchLocation] = useState('Greenhouse Bay 1 - Hyderabad Hub');
  const [newBatchStage, setNewBatchStage] = useState<InventoryBatch['hardeningStage']>('Primary Lab');
  const [newBatchNotes, setNewBatchNotes] = useState('');

  // Loss Modal
  const [lossModalBatch, setLossModalBatch] = useState<InventoryBatch | null>(null);
  const [lossQty, setLossQty] = useState(50);
  const [lossReason, setLossReason] = useState('Heat stress during summer hardening');

  // Transfer Modal
  const [transferBatchModal, setTransferBatchModal] = useState<InventoryBatch | null>(null);
  const [transferQty, setTransferQty] = useState(1000);
  const [transferDest, setTransferDest] = useState('Shade Net House 3 - Godavari Regional Center');

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Computed totals
  const totalSaplings = inventoryBatches.reduce((s, b) => s + b.currentStock, 0);
  const reservedSaplings = inventoryBatches.reduce((s, b) => s + b.reservedStock, 0);
  const availableSaplings = Math.max(0, totalSaplings - reservedSaplings);
  const lowStockBatches = inventoryBatches.filter(b => b.currentStock < b.minThreshold);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    createBatch({
      cloneId: newBatchClone,
      productName: `${newBatchClone} Tissue-Culture Teak Saplings`,
      currentStock: newBatchQty,
      initialQuantity: newBatchQty,
      reservedStock: 0,
      rejectedQuantity: 0,
      nurseryLocation: newBatchLocation,
      propagationDate: new Date().toISOString().split('T')[0],
      hardeningStage: newBatchStage,
      qualityStatus: 'Passed',
      minThreshold: 1000,
      notes: newBatchNotes,
    });
    setIsNewBatchOpen(false);
    setNewBatchNotes('');
  };

  const handleRecordLoss = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lossModalBatch) return;
    recordStockLoss(lossModalBatch.id, lossQty, lossReason);
    setLossModalBatch(null);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferBatchModal) return;
    transferBatch(transferBatchModal.id, transferDest, transferQty);
    setTransferBatchModal(null);
  };

  return (
    <div className="space-y-8">
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-[#082A21] rounded-3xl p-6 sm:p-8 text-white border border-[#C8A45D]/30 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold block">
                Nursery Operations Central
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Live Propagation & Hardening Ledger
              </h2>
              <p className="text-xs text-stone-300">
                Track micropropagation flasks, greenhouse hardening, and dispatch-ready root-trainer stock.
              </p>
            </div>
            <button
              onClick={() => setIsNewBatchOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087F5B] to-[#48A868] text-white font-semibold text-xs tracking-wide shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Register New Propagation Batch
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Nursery Stock</span>
              <div className="text-2xl font-bold text-[#063B2D]">{totalSaplings.toLocaleString()}</div>
              <span className="text-[10px] text-stone-500">Across all bays & stages</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Available for Dispatch</span>
              <div className="text-2xl font-bold text-[#087F5B]">{availableSaplings.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Unreserved units</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Locked in Reservation</span>
              <div className="text-2xl font-bold text-amber-600">{reservedSaplings.toLocaleString()}</div>
              <span className="text-[10px] text-stone-500">For pending field orders</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Batches Under Monitoring</span>
              <div className="text-2xl font-bold text-[#082A21]">{inventoryBatches.length}</div>
              <span className="text-[10px] text-rose-500 font-semibold">{lowStockBatches.length} low threshold alerts</span>
            </div>
          </div>

          {/* Hardening Stage Pipeline Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#063B2D]">Nursery Acclimatization Funnel</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              {[
                { stage: 'Primary Lab', icon: Sprout, count: inventoryBatches.filter(b => b.hardeningStage === 'Primary Lab').reduce((s, b) => s + b.currentStock, 0), color: 'text-blue-600', bg: 'bg-blue-50' },
                { stage: 'Greenhouse', icon: Activity, count: inventoryBatches.filter(b => b.hardeningStage === 'Greenhouse').reduce((s, b) => s + b.currentStock, 0), color: 'text-amber-600', bg: 'bg-amber-50' },
                { stage: 'Shade Net', icon: Layers, count: inventoryBatches.filter(b => b.hardeningStage === 'Shade Net').reduce((s, b) => s + b.currentStock, 0), color: 'text-teal-600', bg: 'bg-teal-50' },
                { stage: 'Open Nursery Field Ready', icon: CheckCircle2, count: inventoryBatches.filter(b => b.hardeningStage === 'Open Nursery Field Ready').reduce((s, b) => s + b.currentStock, 0), color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map(st => {
                const Icon = st.icon;
                return (
                  <div key={st.stage} className={`p-4 rounded-2xl border border-stone-200 ${st.bg} space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800">{st.stage}</span>
                      <Icon className={`w-4 h-4 ${st.color}`} />
                    </div>
                    <div className="text-xl font-bold text-stone-900">{st.count.toLocaleString()} Plants</div>
                    <span className="text-[10px] text-stone-500 block">Controlled climate phase</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Batches Quick Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#063B2D]">Active Nursery Batches</h3>
              <span className="text-xs text-stone-500">{inventoryBatches.length} Registered Batches</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-stone-500 font-semibold">
                    <th className="pb-3">Batch Code</th>
                    <th className="pb-3">Clone</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Total Qty</th>
                    <th className="pb-3">Reserved</th>
                    <th className="pb-3">Available</th>
                    <th className="pb-3 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inventoryBatches.map(batch => (
                    <tr key={batch.id} className="hover:bg-stone-50">
                      <td className="py-3 font-bold text-[#063B2D]">{batch.batchCode}</td>
                      <td className="py-3 font-semibold text-[#087F5B]">{batch.cloneId}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F1F2E8] text-[#063B2D] font-bold text-[10px]">
                          {batch.hardeningStage}
                        </span>
                      </td>
                      <td className="py-3 text-stone-600">{batch.nurseryLocation}</td>
                      <td className="py-3 font-bold text-stone-800">{batch.currentStock.toLocaleString()}</td>
                      <td className="py-3 text-amber-600 font-semibold">{batch.reservedStock.toLocaleString()}</td>
                      <td className="py-3 text-emerald-600 font-bold">
                        {Math.max(0, batch.currentStock - batch.reservedStock).toLocaleString()}
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => setLossModalBatch(batch)}
                          className="text-rose-600 hover:underline font-semibold"
                        >
                          Record Loss
                        </button>
                        <button
                          onClick={() => setTransferBatchModal(batch)}
                          className="text-[#087F5B] hover:underline font-semibold"
                        >
                          Transfer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. BATCHES MANAGEMENT */}
      {activeTab === 'batches' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Nursery Batch Registry</h3>
              <p className="text-xs text-stone-500">Full batch history, propagation dates, and collar inspection records.</p>
            </div>
            <button
              onClick={() => setIsNewBatchOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" /> Create Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {inventoryBatches.map(batch => (
              <div key={batch.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-base font-bold text-[#063B2D]">{batch.batchCode}</strong>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#087F5B] font-bold text-[10px] border">
                    {batch.cloneId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Location</span>
                    <strong className="text-stone-700">{batch.nurseryLocation}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Hardening Stage</span>
                    <strong className="text-[#087F5B]">{batch.hardeningStage}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Current Units</span>
                    <strong className="text-stone-800 text-sm">{batch.currentStock.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Reserved Units</span>
                    <strong className="text-amber-600 text-sm">{batch.reservedStock.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 text-[11px]">
                  <span className="text-stone-400">Propagation: {batch.propagationDate}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setLossModalBatch(batch)}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100"
                    >
                      Record Loss
                    </button>
                    <button
                      onClick={() => setTransferBatchModal(batch)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100"
                    >
                      Transfer Bay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STOCK MOVEMENTS LEDGER */}
      {(activeTab === 'movements' || activeTab === 'stages') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Stock Movements & Traceability Ledger</h3>
            <p className="text-xs text-stone-500">Immutable ledger of propagation additions, order dispatches, and quality mortality writes.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Clone</th>
                  <th className="pb-3">Change (Units)</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Reference / Order</th>
                  <th className="pb-3">Actor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {stockMovements.map(m => (
                  <tr key={m.id} className="hover:bg-stone-50">
                    <td className="py-3 text-stone-500">{m.date}</td>
                    <td className="py-3 font-semibold text-[#087F5B]">{m.cloneId}</td>
                    <td className="py-3 font-bold">
                      <span className={m.change > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {m.change > 0 ? `+${m.change.toLocaleString()}` : m.change.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                        {m.reason}
                      </span>
                    </td>
                    <td className="py-3 text-stone-600">{m.referenceId || 'N/A'}</td>
                    <td className="py-3 text-stone-500">{m.actor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. QUALITY INSPECTIONS & DISPATCH */}
      {(activeTab === 'inspections' || activeTab === 'hardening' || activeTab === 'dispatch' || activeTab === 'alerts') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Quality Audits & Hardening Schedules</h3>
            <p className="text-xs text-stone-500">Inspection checks for collar lignification, root plug density, and pest absence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {inventoryBatches.map(b => (
              <div key={b.id} className="p-4 rounded-2xl bg-[#F8F7F1] border space-y-3">
                <div className="flex justify-between items-center">
                  <strong className="text-sm font-bold text-[#063B2D]">{b.batchCode}</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Quality: {b.qualityStatus || 'Passed'}
                  </span>
                </div>
                <div className="space-y-1 text-stone-600 text-[11px]">
                  <div>Location: {b.nurseryLocation}</div>
                  <div>Hardening Stage: <strong>{b.hardeningStage}</strong></div>
                  <div>Stock Available: <strong className="text-emerald-700">{b.currentStock.toLocaleString()}</strong></div>
                </div>
                <div className="pt-2 border-t flex justify-end gap-2">
                  <button
                    onClick={() => {
                      updateBatch({ ...b, qualityStatus: 'Passed' });
                      addToast('success', 'Batch Passed', `${b.batchCode} certified for sale.`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#087F5B] text-white font-semibold text-[11px]"
                  >
                    Pass Inspection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Register Batch Modal */}
      {isNewBatchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-xs shadow-2xl">
            <h4 className="font-serif font-bold text-lg text-[#063B2D]">Register Clonal Propagation Batch</h4>
            <form onSubmit={handleCreateBatch} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Teak Clone Variety *</label>
                <select
                  value={newBatchClone}
                  onChange={e => setNewBatchClone(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                >
                  {clones.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Batch Quantity (Plants) *</label>
                  <input
                    type="number"
                    min={100}
                    required
                    value={newBatchQty}
                    onChange={e => setNewBatchQty(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Hardening Stage</label>
                  <select
                    value={newBatchStage}
                    onChange={e => setNewBatchStage(e.target.value as any)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option value="Primary Lab">Primary Lab</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Shade Net">Shade Net</option>
                    <option value="Open Nursery Field Ready">Open Nursery Field Ready</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nursery Bay / Location *</label>
                <input
                  type="text"
                  required
                  value={newBatchLocation}
                  onChange={e => setNewBatchLocation(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Agronomic Notes</label>
                <textarea
                  rows={2}
                  value={newBatchNotes}
                  onChange={e => setNewBatchNotes(e.target.value)}
                  placeholder="Rooting hormone batch reference, sterilization notes..."
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewBatchOpen(false)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#087F5B] text-white font-semibold rounded-xl shadow"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Record Loss Modal */}
      {lossModalBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 text-xs shadow-2xl">
            <h4 className="font-bold text-sm text-rose-700">Record Plant Loss / Mortality</h4>
            <p className="text-stone-500">
              Batch: <strong>{lossModalBatch.batchCode}</strong> ({lossModalBatch.cloneId}) — Current Stock: {lossModalBatch.currentStock}
            </p>
            <form onSubmit={handleRecordLoss} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Loss Quantity (Plants)</label>
                <input
                  type="number"
                  min={1}
                  max={lossModalBatch.currentStock}
                  required
                  value={lossQty}
                  onChange={e => setLossQty(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mortality / Damage Reason</label>
                <input
                  type="text"
                  required
                  value={lossReason}
                  onChange={e => setLossReason(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setLossModalBatch(null)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white font-semibold rounded-xl">Confirm Loss Write-Off</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Transfer Modal */}
      {transferBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 text-xs shadow-2xl">
            <h4 className="font-bold text-sm text-[#063B2D]">Transfer Stock Between Bays</h4>
            <p className="text-stone-500">
              Batch: <strong>{transferBatchModal.batchCode}</strong> — Available: {transferBatchModal.currentStock}
            </p>
            <form onSubmit={handleTransfer} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Transfer Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={transferBatchModal.currentStock}
                  required
                  value={transferQty}
                  onChange={e => setTransferQty(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Destination Nursery / Shade House</label>
                <input
                  type="text"
                  required
                  value={transferDest}
                  onChange={e => setTransferDest(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setTransferBatchModal(null)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#087F5B] text-white font-semibold rounded-xl">Execute Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
