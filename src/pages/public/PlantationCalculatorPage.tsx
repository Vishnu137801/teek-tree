import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuoteRequestModal } from '../../components/shared/QuoteRequestModal';
import {
  calculatePlantationEstimates,
  formatINR,
  PlantationCalculatorInputs,
} from '../../utils/calculator';
import {
  Calculator,
  Trees,
  Sprout,
  Droplets,
  DollarSign,
  Printer,
  Download,
  Info,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

export const PlantationCalculatorPage: React.FC = () => {
  const { clones } = useApp();

  // Calculator Inputs
  const [landArea, setLandArea] = useState<number>(350); // Default based on 350-acre flagship proposal
  const [unit, setUnit] = useState<'acres' | 'hectares'>('acres');
  const [calcMode, setCalcMode] = useState<'density' | 'spacing'>('density');
  const [plantsPerAcre, setPlantsPerAcre] = useState<number>(350);
  const [rowSpacing, setRowSpacing] = useState<number>(3.5);
  const [colSpacing, setColSpacing] = useState<number>(3.5);
  const [saplingPrice, setSaplingPrice] = useState<number>(120);
  const [mortalityBuffer, setMortalityBuffer] = useState<number>(5);
  const [irrigationReq, setIrrigationReq] = useState<PlantationCalculatorInputs['irrigationRequirement']>('drip_complete');
  const [serviceLevel, setServiceLevel] = useState<PlantationCalculatorInputs['plantationServiceLevel']>('turnkey_full');

  // Selected Clone for Quote
  const [selectedCloneId, setSelectedCloneId] = useState('MBT-1');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const calcResult = calculatePlantationEstimates({
    landArea,
    unit,
    calculationMode: calcMode,
    plantsPerAcre,
    spacingMeters: calcMode === 'spacing' ? { row: rowSpacing, col: colSpacing } : undefined,
    saplingUnitPrice: saplingPrice,
    mortalityBufferPercent: mortalityBuffer,
    irrigationRequirement: irrigationReq,
    plantationServiceLevel: serviceLevel,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-[#082A21] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#063B2D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C8A45D]">
              Nature's Canopy Agronomic Modeler
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Interactive Plantation & Timber Estimator
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Model your sapling volume, drip infrastructure capex, and illustrative commercial harvest projections. Defaults pre-configured to the Nature’s Canopy 350-acre flagship proposal (350 plants/acre).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors print:hidden"
            >
              <Printer className="w-4 h-4 text-[#A8C8A0]" /> Print / Save PDF
            </button>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#063B2D] border border-[#48A868] text-white text-xs font-semibold flex items-center gap-2 shadow transition-all print:hidden"
            >
              <Calculator className="w-4 h-4 text-[#C8A45D]" /> Request Formal Quote
            </button>
          </div>
        </div>
      </section>

      {/* Main Calculator Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E4D8] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-serif font-bold text-base text-[#063B2D] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#087F5B]" /> Estate Parameters
              </span>
              <button
                onClick={() => {
                  setLandArea(350);
                  setUnit('acres');
                  setPlantsPerAcre(350);
                  setSaplingPrice(120);
                  setMortalityBuffer(5);
                  setIrrigationReq('drip_complete');
                  setServiceLevel('turnkey_full');
                }}
                className="text-[11px] text-[#087F5B] hover:underline font-semibold"
              >
                Reset to 350-Acre Proposal
              </button>
            </div>

            {/* Land Area & Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Total Land Area *</label>
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={landArea}
                  onChange={e => setLandArea(parseFloat(e.target.value) || 1)}
                  className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-[#063B2D] focus:outline-none focus:border-[#087F5B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Area Unit</label>
                <div className="flex rounded-xl border border-stone-300 overflow-hidden p-0.5 bg-[#F8F7F1]">
                  <button
                    type="button"
                    onClick={() => setUnit('acres')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      unit === 'acres' ? 'bg-[#063B2D] text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Acres
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('hectares')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      unit === 'hectares' ? 'bg-[#063B2D] text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Hectares
                  </button>
                </div>
              </div>
            </div>

            {/* Calculation Mode: Density vs Spacing */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">Calculation Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setCalcMode('density')}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    calcMode === 'density'
                      ? 'bg-[#087F5B]/10 border-[#087F5B] text-[#063B2D] font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Plant Density (per Acre)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode('spacing')}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    calcMode === 'spacing'
                      ? 'bg-[#087F5B]/10 border-[#087F5B] text-[#063B2D] font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Row × Col Spacing (m)
                </button>
              </div>

              {calcMode === 'density' ? (
                <div className="pt-1">
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Plants Per Acre:</span>
                    <strong className="text-[#063B2D]">{plantsPerAcre} Trees/Acre</strong>
                  </div>
                  <input
                    type="range"
                    min={250}
                    max={500}
                    step={10}
                    value={plantsPerAcre}
                    onChange={e => setPlantsPerAcre(parseInt(e.target.value))}
                    className="w-full accent-[#087F5B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400">
                    <span>250 (Wide Spacing)</span>
                    <span className="font-bold text-[#087F5B]">350 (Proposal Benchmark)</span>
                    <span>500 (High-Density)</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Row Spacing (m)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={2.0}
                      max={6.0}
                      value={rowSpacing}
                      onChange={e => setRowSpacing(parseFloat(e.target.value) || 3.5)}
                      className="w-full bg-[#F8F7F1] border rounded-xl p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Col Spacing (m)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={2.0}
                      max={6.0}
                      value={colSpacing}
                      onChange={e => setColSpacing(parseFloat(e.target.value) || 3.5)}
                      className="w-full bg-[#F8F7F1] border rounded-xl p-2 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sapling Price & Mortality Buffer */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Unit Price (₹)</label>
                <input
                  type="number"
                  min={80}
                  max={250}
                  value={saplingPrice}
                  onChange={e => setSaplingPrice(parseInt(e.target.value) || 120)}
                  className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-[#063B2D]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Mortality Buffer %</label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={mortalityBuffer}
                  onChange={e => setMortalityBuffer(parseInt(e.target.value) || 5)}
                  className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-[#063B2D]"
                />
              </div>
            </div>

            {/* Irrigation Infrastructure */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Irrigation System</label>
              <select
                value={irrigationReq}
                onChange={e => setIrrigationReq(e.target.value as any)}
                className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800"
              >
                <option value="drip_complete">Turnkey Automated Drip (Mainline + Filter + Laterals)</option>
                <option value="drip_lateral_only">Lateral Drip Lines Only (Existing Pump & Mains)</option>
                <option value="existing_irrigation">Existing Operational Irrigation (₹0 Capex)</option>
                <option value="rainfed">Rainfed / Flood Furrow (₹0 Drip Capex)</option>
              </select>
            </div>

            {/* Plantation Service Level */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Nature's Canopy Service Scope</label>
              <select
                value={serviceLevel}
                onChange={e => setServiceLevel(e.target.value as any)}
                className="w-full bg-[#F8F7F1] border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800"
              >
                <option value="turnkey_full">Full Turnkey (Clearing, Pitting, Planting, 1st Year Maint.)</option>
                <option value="planting_and_setup">Planting & Setup Only (Client Oversees Care)</option>
                <option value="technical_advisory">Technical Advisory Only (Client Executes Labor)</option>
                <option value="saplings_only">Saplings Supply Only (No Field Service)</option>
              </select>
            </div>
          </div>

          {/* Results Cards & Visual Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#082A21] text-white p-5 rounded-3xl border border-[#C8A45D]/40 space-y-1">
                <span className="text-[10px] text-[#C8A45D] uppercase tracking-wider font-bold">Total Saplings Needed</span>
                <div className="text-2xl font-serif font-bold text-white">
                  {calcResult.totalSaplingsToOrder.toLocaleString()}
                </div>
                <span className="text-[10px] text-stone-400 block">
                  {calcResult.baseSaplings.toLocaleString()} base + {calcResult.bufferSaplings.toLocaleString()} buffer
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] space-y-1 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Sapling Investment</span>
                <div className="text-2xl font-serif font-bold text-[#063B2D]">
                  {formatINR(calcResult.saplingTotalCost)}
                </div>
                <span className="text-[10px] text-stone-500 block">
                  @ ₹{saplingPrice} / certified plantlet
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] space-y-1 shadow-sm">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Year 1 Total Capex</span>
                <div className="text-2xl font-serif font-bold text-emerald-600">
                  {formatINR(calcResult.totalFirstYearCapitalCost)}
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Turnkey establishment + saplings
                </span>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-[#063B2D]">
                Detailed Indicative Capex Breakdown ({calcResult.normalizedAcreage} Acres)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Certified Clonal Saplings ({calcResult.totalSaplingsToOrder.toLocaleString()} units):</span>
                  <strong className="text-stone-900">{formatINR(calcResult.saplingTotalCost)}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Drip Irrigation Infrastructure:</span>
                  <strong className="text-stone-900">{formatINR(calcResult.irrigationSetupCost)}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Land Preparation & Subsoiling:</span>
                  <strong className="text-stone-900">{formatINR(calcResult.landPreparationCost)}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Auger Pitting & Planting Labour:</span>
                  <strong className="text-stone-900">{formatINR(calcResult.plantationLabourCost)}</strong>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-stone-800 text-sm font-bold bg-[#F8F7F1] px-3 rounded-xl">
                  <span className="text-[#063B2D]">Total Initial Capital Outlay:</span>
                  <span className="text-[#087F5B]">{formatINR(calcResult.totalFirstYearCapitalCost)}</span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-stone-500 px-1">
                  <span>Indicative Annual Maintenance (Year 2+):</span>
                  <span>{formatINR(calcResult.indicativeAnnualMaintenanceCost)} / year</span>
                </div>
              </div>
            </div>

            {/* Visual Planting Grid Simulation */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#063B2D]">
                    Simulated Canopy Spacing Grid
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Interactive parcel sample showing 3.5m spacing alignment.
                  </p>
                </div>
                <span className="text-xs bg-[#F1F2E8] text-[#087F5B] px-2.5 py-1 rounded-full font-bold">
                  {plantsPerAcre} Trees / Acre Grid
                </span>
              </div>

              {/* Dot Grid */}
              <div className="p-5 rounded-2xl bg-[#082A21] border border-stone-800 flex flex-wrap gap-2 justify-center items-center py-6">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full bg-[#48A868] border border-[#A8C8A0] flex items-center justify-center text-[7px] text-[#082A21] font-bold shadow-sm hover:scale-125 transition-transform cursor-pointer"
                    title={`Tree #${i + 1} - MBT Clonal Stand`}
                  >
                    🌲
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 italic text-center">
                Visual representation of row-and-column layout with tractor passage lanes.
              </p>
            </div>

            {/* 15-Year Commercial Timber Reference (Disclaimed) */}
            <div className="bg-[#082A21] text-white p-6 rounded-3xl border border-[#C8A45D]/40 space-y-4">
              <div className="flex items-center gap-2 text-[#C8A45D]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Illustrative 15-Year Commercial Timber Projections
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                The figures below are illustrative mathematical models based on standard 15-year rotation silviculture under managed drip fertigation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#063B2D] p-3.5 rounded-2xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Est. Surviving Harvest Trees</span>
                  <span className="text-xl font-bold text-white">
                    {calcResult.survivingHarvestTreesEst.toLocaleString()} Trees
                  </span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">Assumes 88% commercial retention</span>
                </div>
                <div className="bg-[#063B2D] p-3.5 rounded-2xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Projected Commercial Log Volume</span>
                  <span className="text-xl font-bold text-[#C8A45D]">
                    {calcResult.illustrativeTimberCubicFeetMin.toLocaleString()} – {calcResult.illustrativeTimberCubicFeetMax.toLocaleString()} cu.ft
                  </span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">15 – 25 cu.ft per mature trunk</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-stone-800 text-[10px] text-stone-400 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>
                  <strong>Disclaimer:</strong> Timber growth rates and farmgate log valuations are non-guaranteed model simulations. Results depend on local agro-climatic conditions, seasonal rainfall, soil depth, disease vigilance, and future timber commodity market rates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={{
          id: 'calc-turnkey-proposal',
          name: `Custom Plantation Package (${calcResult.normalizedAcreage} Acres / ${calcResult.totalSaplingsToOrder.toLocaleString()} Saplings)`,
          cloneId: selectedCloneId,
          price: saplingPrice,
          defaultQty: calcResult.totalSaplingsToOrder,
        }}
      />
    </div>
  );
};
