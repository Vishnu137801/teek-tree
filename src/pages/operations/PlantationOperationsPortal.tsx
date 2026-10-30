import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PlantationProject, MaintenanceTask, GrowthRecord } from '../../types';
import {
  Trees,
  Compass,
  ClipboardList,
  Activity,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Plus,
  TrendingUp,
  MapPin,
  Clock,
  Printer,
  FileText,
  Search,
} from 'lucide-react';

export const PlantationOperationsPortal: React.FC = () => {
  const location = useLocation();
  const { projects, addProjectTask, addGrowthRecord, addToast } = useApp();

  const path = location.pathname;
  let activeTab = 'overview';
  if (path.includes('/projects')) activeTab = 'projects';
  else if (path.includes('/surveys')) activeTab = 'surveys';
  else if (path.includes('/maintenance')) activeTab = 'maintenance';
  else if (path.includes('/growth')) activeTab = 'growth';
  else if (path.includes('/reports')) activeTab = 'reports';

  // Task Creation Form State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<MaintenanceTask['category']>('Weed Control');
  const [taskWorker, setTaskWorker] = useState('Field Crew Alpha');
  const [taskDate, setTaskDate] = useState('2026-11-20');
  const [taskPriority, setTaskPriority] = useState<MaintenanceTask['priority']>('High');

  // Growth Record Form State
  const [growthBlock, setGrowthBlock] = useState('Block Alpha');
  const [growthSampleCount, setGrowthSampleCount] = useState(100);
  const [growthSurvival, setGrowthSurvival] = useState(98);
  const [growthHeightCm, setGrowthHeightCm] = useState(185);
  const [growthGirthCm, setGrowthGirthCm] = useState(14.2);
  const [growthNotes, setGrowthNotes] = useState('Healthy canopy foliage with active secondary root expansion.');

  const totalAcreage = projects.reduce((s, p) => s + p.acreage, 0);
  const totalSaplings = projects.reduce((s, p) => s + p.saplingCount, 0);
  const allTasks = projects.flatMap(p => p.maintenanceTasks);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addProjectTask(selectedProjectId, {
      title: taskTitle,
      category: taskCategory,
      assignedTo: taskWorker,
      dueDate: taskDate,
      status: 'Pending',
      priority: taskPriority,
    });

    setTaskTitle('');
  };

  const handleCreateGrowthRecord = (e: React.FormEvent) => {
    e.preventDefault();

    addGrowthRecord(selectedProjectId, {
      inspectionDate: new Date().toISOString().split('T')[0],
      blockName: growthBlock,
      plantsSampled: growthSampleCount,
      survivalCount: growthSurvival,
      avgHeightCm: growthHeightCm,
      avgGirthCm: growthGirthCm,
      foliageCondition: 'Excellent',
      inspector: 'Suresh Varma (Head Agronomist)',
      notes: growthNotes,
    });

    addToast('success', 'Biometric Record Saved', 'Average girth and height updated in project ledger.');
  };

  return (
    <div className="space-y-8">
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Managed Teak Estates</span>
              <div className="text-2xl font-bold text-[#063B2D]">{projects.length}</div>
              <span className="text-[10px] text-stone-500">Including 350-Acre Model Blueprint</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Managed Acreage</span>
              <div className="text-2xl font-bold text-[#087F5B]">{totalAcreage} Acres</div>
              <span className="text-[10px] text-stone-500">Across 3 Agro-Climatic Zones</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Saplings Allocated</span>
              <div className="text-2xl font-bold text-[#082A21]">{totalSaplings.toLocaleString()}</div>
              <span className="text-[10px] text-stone-500">Under Drip Fertigation</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Pending Maintenance Tasks</span>
              <div className="text-2xl font-bold text-amber-600">{allTasks.filter(t => t.status === 'Pending').length}</div>
              <span className="text-[10px] text-stone-500">Scheduled for this fortnight</span>
            </div>
          </div>

          {/* Active Projects Quick Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#063B2D]">Live Managed Projects</h3>
            <div className="divide-y divide-stone-100 text-xs">
              {projects.map(p => (
                <div key={p.id} className="py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <strong className="text-stone-900 block text-sm">{p.title} ({p.code})</strong>
                    <span className="text-stone-500">{p.acreage} Acres • {p.saplingCount.toLocaleString()} Saplings • {p.district}, {p.state}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {p.stage}
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Survival: {p.survivalRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Estate Project Management</h3>
            <span className="text-xs text-stone-500">{projects.length} Total Registered</span>
          </div>

          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#087F5B] text-sm">{p.code} - {p.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border font-bold text-[#063B2D]">
                    Stage: {p.stage}
                  </span>
                </div>
                <p className="text-stone-600">{p.notes}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Acreage</span>
                    <strong className="text-stone-800">{p.acreage} Acres</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Tree Population</span>
                    <strong className="text-stone-800">{p.saplingCount.toLocaleString()} Trees</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Avg Height</span>
                    <strong className="text-stone-800">{p.averageHeightMeters} m</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Avg Girth</span>
                    <strong className="text-stone-800">{p.averageGirthCm} cm</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SITE SURVEYS */}
      {activeTab === 'surveys' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6 max-w-3xl">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Log Land Feasibility Survey</h3>
            <p className="text-xs text-stone-500">Record core soil parameters and water yield observations during on-site farm inspections.</p>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              addToast('success', 'Site Survey Logged', 'Survey filed in project agronomy ledger.');
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Parcel Location (GPS / Village) *</label>
                <input type="text" required defaultValue="Peddapuram Road, East Godavari" className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Surveyed Acreage *</label>
                <input type="number" required defaultValue="15" className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Soil Texture & pH</label>
                <input type="text" defaultValue="Red Sandy Loam, pH 6.8, Depth 1.4m" className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Water Aquifer Flow Test</label>
                <input type="text" defaultValue="2.5 Inch Borewell Discharge (Continuous)" className="w-full bg-[#F8F7F1] border rounded-xl p-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-stone-700">Agronomist Observations & Pit Recommendations</label>
              <textarea
                rows={3}
                defaultValue="Subsoil friable, free of impervious calcite kankar layers. Recommend tractor auger 45cm pits with 5kg enriched vermicompost."
                className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
              />
            </div>

            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs shadow">
              Submit Survey Filing
            </button>
          </form>
        </div>
      )}

      {/* 4. MAINTENANCE SCHEDULE */}
      {activeTab === 'maintenance' && (
        <div className="space-y-8">
          {/* Create Task Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Schedule Field Maintenance Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Target Estate Project</label>
                  <select
                    value={selectedProjectId}
                    onChange={e => setSelectedProjectId(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.code} - {p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Task Title *</label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                    placeholder="e.g. Drip line acid flush or lateral pruning"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Category</label>
                  <select
                    value={taskCategory}
                    onChange={e => setTaskCategory(e.target.value as any)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option value="Weed Control">Weed Control</option>
                    <option value="Pruning">Pruning</option>
                    <option value="Drip Inspection">Drip Inspection</option>
                    <option value="Organic Fertilization">Organic Fertilization</option>
                    <option value="Pest Scouting">Pest Scouting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Assigned Team / Worker</label>
                  <input
                    type="text"
                    value={taskWorker}
                    onChange={e => setTaskWorker(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Due Date</label>
                  <input
                    type="date"
                    value={taskDate}
                    onChange={e => setTaskDate(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={e => setTaskPriority(e.target.value as any)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs shadow flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Task to Calendar
              </button>
            </form>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-[#063B2D]">All Scheduled Maintenance Activities</h4>
            <div className="space-y-3 text-xs">
              {allTasks.map(task => (
                <div key={task.id} className="p-4 rounded-2xl bg-[#F8F7F1] border flex justify-between items-center">
                  <div>
                    <strong className="text-stone-900 block text-sm">{task.title}</strong>
                    <span className="text-stone-500">{task.category} • Assigned to: {task.assignedTo} • Due: {task.dueDate}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    task.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. GROWTH MONITORING BIOMETRICS */}
      {activeTab === 'growth' && (
        <div className="space-y-8">
          {/* Caliper DBH Protocol & Tree Measurement Photograph */}
          <div className="bg-gradient-to-br from-[#063B2D] via-[#082A21] to-[#063B2D] text-white rounded-3xl p-6 sm:p-8 border border-[#C8A45D]/30 shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8A45D] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Silvicultural DBH Caliper Standard Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Precision Tree Trunk Girth & DBH Growth Auditing
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Nature’s Canopy field agronomists audit tree trunk circumference and diameter using precision forestry calipers at standard DBH (Diameter at Breast Height: 1.30 m above ground level). Quarterly records track clear-bole development, bark thickness, and volume increment curves across all MBT clonal parcels.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-[#C8A45D] font-bold block uppercase">Standard Point</span>
                    <strong className="text-sm text-white">1.30 m (DBH)</strong>
                    <span className="text-[9px] text-stone-300 block">Above ground level</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-[#C8A45D] font-bold block uppercase">Target PAI Girth</span>
                    <strong className="text-sm text-emerald-400">2.8 - 3.4 cm/yr</strong>
                    <span className="text-[9px] text-stone-300 block">Under drip fertigation</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-[#C8A45D] font-bold block uppercase">Audited Clones</span>
                    <strong className="text-sm text-white">MBT-1 to MBT-9</strong>
                    <span className="text-[9px] text-stone-300 block">Model estate blocks</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-[#C8A45D]/40 shadow-lg group">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80"
                    alt="Standard Forestry Caliper Tree Trunk Circumference & DBH Measurement Protocol"
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold text-[#C8A45D] uppercase tracking-wider">
                      Reference Measurement Protocol
                    </span>
                    <p className="text-[11px] text-white font-medium">
                      Silvicultural tree caliper girth auditing at 1.30m DBH standard
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 italic text-center">
                  Calibrated forestry caliper protocol utilized across all 350-acre Nature’s Canopy estate blocks.
                </p>
              </div>
            </div>
          </div>

          {/* Biometrics Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Log Tree Biometric Inspection</h3>
            <p className="text-xs text-stone-500">Record quarterly caliper girth and laser height readings from designated sample plots.</p>

            <form onSubmit={handleCreateGrowthRecord} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Project Parcel</label>
                  <select
                    value={selectedProjectId}
                    onChange={e => setSelectedProjectId(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.code} - {p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Block Name</label>
                  <input
                    type="text"
                    value={growthBlock}
                    onChange={e => setGrowthBlock(e.target.value)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Sample Count (Trees Audited)</label>
                  <input
                    type="number"
                    value={growthSampleCount}
                    onChange={e => setGrowthSampleCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Average Height (cm)</label>
                  <input
                    type="number"
                    step={1}
                    value={growthHeightCm}
                    onChange={e => setGrowthHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Average Girth / DBH (cm)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={growthGirthCm}
                    onChange={e => setGrowthGirthCm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Survival Count in Plot</label>
                  <input
                    type="number"
                    value={growthSurvival}
                    onChange={e => setGrowthSurvival(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-stone-700">Silvicultural Observations & Foliage Health</label>
                <textarea
                  rows={2}
                  value={growthNotes}
                  onChange={e => setGrowthNotes(e.target.value)}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs shadow">
                Save Biometric Audit
              </button>
            </form>
          </div>

          {/* Historical Log */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-base text-[#063B2D]">Historical Biometric Logs</h4>
            <div className="space-y-3 text-xs">
              {projects.flatMap(p => p.growthRecords).map(rec => (
                <div key={rec.id} className="p-4 rounded-2xl bg-[#F8F7F1] border flex justify-between items-center">
                  <div>
                    <strong className="text-stone-900 block text-sm">{rec.blockName} • {rec.inspectionDate}</strong>
                    <span className="text-stone-500">Sampled {rec.plantsSampled} trees • Survival: {rec.survivalCount}/{rec.plantsSampled}</span>
                    <p className="text-stone-600 mt-1">{rec.notes}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#063B2D] block">{rec.avgGirthCm} cm Girth</span>
                    <span className="text-xs text-stone-500">{rec.avgHeightCm} cm Height</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. REPORTS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Plantation Progress & Valuation Reports</h3>
              <p className="text-xs text-stone-500">Generate printable dossiers for estate owners and agricultural auditors.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#063B2D] text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" /> Print Current Report
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {projects.map(p => (
              <div key={p.id} className="p-5 rounded-2xl bg-[#F8F7F1] border space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-sm text-stone-900">{p.code}: {p.title}</strong>
                  <span className="text-stone-500">Started: {p.startDate}</span>
                </div>
                <p className="text-stone-600">Location: {p.location} ({p.acreage} Acres)</p>
                <div className="flex gap-4 pt-1 font-semibold text-stone-700">
                  <span>Current Survival Rate: <strong className="text-emerald-700">{p.survivalRate}%</strong></span>
                  <span>Average Bole Height: <strong className="text-[#063B2D]">{p.averageHeightMeters}m</strong></span>
                  <span>Average Girth: <strong className="text-[#C8A45D]">{p.averageGirthCm}cm</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
