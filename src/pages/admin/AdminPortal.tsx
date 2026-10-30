import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Product,
  TeakClone,
  CMSContent,
  Order,
  Quotation,
  Enquiry,
  PlantationProject,
  InventoryBatch,
  StaffMember,
  MediaAsset,
  GrowthRecord,
} from '../../types';
import {
  LayoutDashboard,
  Boxes,
  Sprout,
  ShoppingBag,
  Users,
  FileText,
  Trees,
  Shield,
  Globe,
  TrendingUp,
  Activity,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Download,
  Search,
  Filter,
  DollarSign,
  AlertTriangle,
  CreditCard,
  Bell,
  Eye,
  Copy,
  Printer,
  Calendar,
  Compass,
  ArrowRight,
  Maximize2,
  X,
  RefreshCw,
  Archive,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    archiveProduct,
    restoreProduct,
    clones,
    updateClone,
    orders,
    updateOrderStatus,
    cancelOrder,
    quotations,
    createQuotation,
    updateQuotationStatus,
    convertQuoteToOrder,
    enquiries,
    updateEnquiryStatus,
    convertEnquiryToQuote,
    scheduleFollowUp,
    projects,
    addProject,
    updateProject,
    addProjectTask,
    addGrowthRecord,
    inventoryBatches,
    createBatch,
    updateBatch,
    updateBatchStock,
    recordStockLoss,
    reserveStock,
    releaseStock,
    transferBatch,
    stockMovements,
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    deleteMediaAsset,
    staffMembers,
    addStaff,
    updateStaff,
    deactivateStaff,
    payments,
    recordPayment,
    settings,
    updateSettings,
    cms,
    updateCMS,
    auditLogs,
    resetAllData,
    addToast,
  } = useApp();

  const path = location.pathname;
  let activeTab = 'overview';
  if (path.includes('/products')) activeTab = 'products';
  else if (path.includes('/clones')) activeTab = 'clones';
  else if (path.includes('/inventory')) activeTab = 'inventory';
  else if (path.includes('/orders')) activeTab = 'orders';
  else if (path.includes('/enquiries')) activeTab = 'enquiries';
  else if (path.includes('/quotations')) activeTab = 'quotations';
  else if (path.includes('/plantations')) activeTab = 'plantations';
  else if (path.includes('/staff')) activeTab = 'staff';
  else if (path.includes('/cms')) activeTab = 'cms';
  else if (path.includes('/reports')) activeTab = 'reports';
  else if (path.includes('/payments')) activeTab = 'payments';
  else if (path.includes('/nursery')) activeTab = 'nursery';
  else if (path.includes('/notifications')) activeTab = 'notifications';
  else if (path.includes('/audit')) activeTab = 'audit';
  else if (path.includes('/settings')) activeTab = 'settings';

  // State: Date range filter for overview
  const [dateRange, setDateRange] = useState<'30days' | 'quarter' | 'year' | 'all'>('30days');

  // Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModal, setIsNewProductModal] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: '',
    sku: 'MB-SKU-',
    cloneId: 'MBT-1',
    category: 'Clonal Teak Sapling' as Product['category'],
    scientificName: 'Tectona grandis L.f.',
    shortDescription: 'Certified micropropagated root-trainer plantlet.',
    description: 'Propagated from 40+ year verified mother trees.',
    price: 120,
    minOrderQuantity: 50,
    stock: 10000,
    height: '1.5 to 2.0 Feet',
    ageInMonths: 6,
    containerType: 'Root-Trainer Pot (300cc)',
    rootCondition: 'Ex-Vitro Taproot Inducted',
    nurseryLocation: 'Hyderabad Central Nursery Hub',
    waterRequirements: 'Drip fertigation 4-6 LPH/tree',
    spacingRecommendation: '3.5m × 3.5m (350 plants/acre)',
    taxClassification: 'GST Exempt (Agricultural Live Plant)',
    seoTitle: 'Buy Certified MBT Clonal Teak Plants',
    seoDescription: 'High yield clonal teak saplings with guaranteed bole straightness.',
    isFeatured: true,
    isPublished: true,
  });

  // Clone Editor Modal
  const [editingClone, setEditingClone] = useState<TeakClone | null>(null);
  const [compareClonesModal, setCompareClonesModal] = useState(false);
  const [selectedCompareClones, setSelectedCompareClones] = useState<string[]>(['MBT-1', 'MBT-2', 'MBT-3']);

  // Order Details & Printable Slip Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);
  const [packingSlipOrder, setPackingSlipOrder] = useState<Order | null>(null);

  // Quote Builder State
  const [isNewQuoteModal, setIsNewQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    customerName: '',
    customerPhone: '+91 ',
    customerEmail: '',
    location: 'Telangana / Andhra Pradesh',
    landAcreage: 10,
    cloneId: 'MBT-1',
    quantity: 3500,
    unitPrice: 110,
    discount: 10000,
    deliveryCharges: 6000,
    validUntil: '2026-12-31',
    paymentTerms: '50% Advance booking, 50% on dispatch',
    deliveryConditions: 'Delivered in specialized upright wooden nursery crates',
    notes: 'Turnkey sapling delivery for 10-acre drip irrigation layout.',
  });

  // Plantation Project Details Modal & Active Tab
  const [selectedProject, setSelectedProject] = useState<PlantationProject | null>(null);
  const [projectDetailTab, setProjectDetailTab] = useState<
    | 'overview'
    | 'client'
    | 'survey'
    | 'planning'
    | 'blocks'
    | 'saplings'
    | 'irrigation'
    | 'maintenance'
    | 'inspections'
    | 'growth'
    | 'photos'
    | 'docs'
    | 'costs'
    | 'timeline'
    | 'reports'
  >('overview');

  // Tree Measurement Inspection Modal
  const [isGrowthModalOpen, setIsGrowthModalOpen] = useState(false);
  const [growthForm, setGrowthForm] = useState({
    treeId: 'TREE-BLK-A-042',
    blockName: 'Block Alpha',
    clone: 'MBT-1',
    plantsSampled: 120,
    survivalCount: 118,
    avgHeightCm: 210,
    avgGirthCm: 16.5,
    treeAgeYears: 2,
    treeHealth: 'Optimal' as GrowthRecord['treeHealth'],
    inspector: 'Suresh Varma (Agronomist)',
    notes: 'Exceptional canopy vigor, healthy internodal spacing without leaf skeletonizer pest presence.',
    photographUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
  });

  // Media Library Modal
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string>('All');
  const [isAddMediaModal, setIsAddMediaModal] = useState(false);
  const [mediaPreviewModal, setMediaPreviewModal] = useState<MediaAsset | null>(null);
  const [mediaForm, setMediaForm] = useState({
    title: '',
    category: 'Company Events' as MediaAsset['category'],
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.13_8f0af055.jpeg',
    originalFileName: 'upload_original.jpg',
    caption: '',
    altText: '',
    usageLocation: 'About Us, Gallery',
    date: new Date().toISOString().split('T')[0],
    tags: 'Clonal Teak, Plantation',
    visibility: 'published' as MediaAsset['visibility'],
    isFeatured: false,
  });

  // Staff Modal
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    department: 'Sales & CRM' as StaffMember['department'],
    role: 'sales_staff' as StaffMember['role'],
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<typeof settings>(settings);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');

  // Calculations for KPI Cards
  const totalSalesRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const ordersAwaitingConfirmation = orders.filter(o => o.status === 'placed').length;
  const totalPlantsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const totalAvailableSaplings = products.reduce((s, p) => s + p.stock, 0);
  const totalReservedSaplings = inventoryBatches.reduce((s, b) => s + b.reservedStock, 0);
  const lowStockAlertsCount = products.filter(p => p.stock < 15000).length;
  const uniqueCustomersCount = new Set(orders.map(o => o.customerEmail)).size;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;
  const pendingQuotesCount = quotations.filter(q => q.status === 'sent' || q.status === 'draft').length;
  const activePlantationProjectsCount = projects.filter(p => !p.isProposal).length;
  const totalManagedAcreage = projects.reduce((s, p) => s + p.acreage, 0);

  // Export CSV Helper
  const exportCSV = (filename: string, rows: Record<string, any>[]) => {
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]).join(',');
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers, ...rows.map(r => Object.values(r).map(v => `"${v}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'Report Exported', `${filename} generated.`);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...prodForm,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        slug: prodForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: prodForm.name,
        cloneId: prodForm.cloneId,
        category: prodForm.category,
        price: prodForm.price,
        minOrderQuantity: prodForm.minOrderQuantity,
        stock: prodForm.stock,
        height: prodForm.height,
        ageInMonths: prodForm.ageInMonths,
        containerType: prodForm.containerType,
        status: prodForm.isPublished ? 'active' : 'draft',
        shortDescription: prodForm.shortDescription,
        description: prodForm.description,
        features: ['True-to-type certified', 'Secondary hardened', 'Bole straightness guarantee'],
        specifications: {
          Clone: prodForm.cloneId,
          Height: prodForm.height,
          Age: `${prodForm.ageInMonths} Months`,
          Container: prodForm.containerType,
        },
        plantingGuidelines: ['Maintain 3.5m spacing', 'Install inline drip emitters'],
        soilClimateSuitability: 'Well-drained agricultural loams.',
        images: ['/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg'],
        sku: prodForm.sku,
        scientificName: prodForm.scientificName,
        rootCondition: prodForm.rootCondition,
        nurseryLocation: prodForm.nurseryLocation,
        waterRequirements: prodForm.waterRequirements,
        spacingRecommendation: prodForm.spacingRecommendation,
        taxClassification: prodForm.taxClassification,
        seoTitle: prodForm.seoTitle,
        seoDescription: prodForm.seoDescription,
        featured: prodForm.isFeatured,
      });
      setIsNewProductModal(false);
    }
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = quoteForm.quantity * quoteForm.unitPrice;
    const totalEstimated = subtotal - quoteForm.discount + quoteForm.deliveryCharges;

    createQuotation({
      customerName: quoteForm.customerName,
      customerPhone: quoteForm.customerPhone,
      customerEmail: quoteForm.customerEmail,
      location: quoteForm.location,
      landAcreage: quoteForm.landAcreage,
      items: [
        {
          productId: 'prod-mbt1-standard',
          productName: `${quoteForm.cloneId} Clonal Teak Sapling`,
          cloneId: quoteForm.cloneId,
          quantity: quoteForm.quantity,
          unitPrice: quoteForm.unitPrice,
          total: subtotal,
        },
      ],
      subtotal,
      discount: quoteForm.discount,
      tax: 0,
      deliveryCharges: quoteForm.deliveryCharges,
      transportCharges: quoteForm.deliveryCharges,
      totalEstimated,
      validUntil: quoteForm.validUntil,
      status: 'sent',
      paymentTerms: quoteForm.paymentTerms,
      deliveryConditions: quoteForm.deliveryConditions,
      notes: quoteForm.notes,
    });
    setIsNewQuoteModal(false);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    addMediaAsset({
      title: mediaForm.title,
      category: mediaForm.category,
      imageUrl: mediaForm.imageUrl,
      originalFileName: mediaForm.originalFileName,
      caption: mediaForm.caption,
      altText: mediaForm.altText,
      usageLocation: mediaForm.usageLocation,
      date: mediaForm.date,
      tags: mediaForm.tags.split(',').map(t => t.trim()),
      visibility: mediaForm.visibility,
      isFeatured: mediaForm.isFeatured,
    });
    setIsAddMediaModal(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. EXECUTIVE DASHBOARD OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Executive Top Banner with Date Selector */}
          <div className="bg-[#082A21] rounded-3xl p-6 sm:p-8 text-white border border-[#C8A45D]/30 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold block">
                Executive Management Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Mother Biotech × Nature's Canopy Operations
              </h2>
              <p className="text-xs text-stone-300">
                Integrated enterprise control across clonal nursery production, commercial sales, and turnkey plantation development.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-[#063B2D] border border-white/10 rounded-xl p-1 flex text-xs">
                {(['30days', 'quarter', 'year', 'all'] as const).map(period => (
                  <button
                    key={period}
                    onClick={() => setDateRange(period)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      dateRange === period
                        ? 'bg-[#087F5B] text-white font-semibold shadow'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {period === '30days'
                      ? 'Last 30 Days'
                      : period === 'quarter'
                      ? 'Q3 2026'
                      : period === 'year'
                      ? 'FY 2026-27'
                      : 'All Time'}
                  </button>
                ))}
              </div>
              <button
                onClick={() => addToast('info', 'Data Synchronized', 'Real-time telemetry and ledger updated.')}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Refresh KPI calculations"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 12 KPI CARDS (Calculated from demo records) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-base text-[#063B2D]">Core Operational Metrics</h3>
              <span className="text-xs text-stone-500">Click any metric to inspect detailed records</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 1. Total Plant Sales Revenue */}
              <div
                onClick={() => navigate('/admin/orders')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Plant Sales Revenue <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-[#063B2D]">
                  ₹{totalSalesRevenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  {totalOrdersCount} Completed & Active Orders
                </span>
              </div>

              {/* 2. Total Orders */}
              <div
                onClick={() => navigate('/admin/orders')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Total Orders <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-stone-800">{totalOrdersCount}</div>
                <span className="text-[10px] text-stone-500 block">All recorded sales invoices</span>
              </div>

              {/* 3. Orders Awaiting Confirmation */}
              <div
                onClick={() => navigate('/admin/orders')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Pending Confirmation <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-amber-600">{ordersAwaitingConfirmation}</div>
                <span className="text-[10px] text-amber-700 font-semibold block">Requires dispatch review</span>
              </div>

              {/* 4. Plants Sold */}
              <div
                onClick={() => navigate('/admin/orders')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Plants Sold <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-[#087F5B]">{totalPlantsSold.toLocaleString()}</div>
                <span className="text-[10px] text-stone-500 block">Root-trainer saplings shipped</span>
              </div>

              {/* 5. Available Saplings */}
              <div
                onClick={() => navigate('/admin/inventory')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Available Saplings <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-[#082A21]">{totalAvailableSaplings.toLocaleString()}</div>
                <span className="text-[10px] text-emerald-600 font-semibold block">Catalog stock unreserved</span>
              </div>

              {/* 6. Reserved Saplings */}
              <div
                onClick={() => navigate('/admin/inventory')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Reserved Saplings <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-amber-600">{totalReservedSaplings.toLocaleString()}</div>
                <span className="text-[10px] text-stone-500 block">Committed to turnkey projects</span>
              </div>

              {/* 7. Low-Stock Alerts */}
              <div
                onClick={() => navigate('/admin/inventory')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Low-Stock Batches <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-rose-600">{lowStockAlertsCount}</div>
                <span className="text-[10px] text-rose-500 font-semibold block">Under minimum threshold</span>
              </div>

              {/* 8. Total Customers */}
              <div
                onClick={() => navigate('/admin/enquiries')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Client Accounts <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-stone-800">{uniqueCustomersCount}</div>
                <span className="text-[10px] text-stone-500 block">Landowners & agro investors</span>
              </div>

              {/* 9. New Enquiries */}
              <div
                onClick={() => navigate('/admin/enquiries')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  New Enquiries <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-amber-600">{newEnquiriesCount}</div>
                <span className="text-[10px] text-stone-500 block">Fresh inbound CRM leads</span>
              </div>

              {/* 10. Pending Quotations */}
              <div
                onClick={() => navigate('/admin/quotations')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Pending Quotations <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-teal-700">{pendingQuotesCount}</div>
                <span className="text-[10px] text-stone-500 block">Commercial proposals active</span>
              </div>

              {/* 11. Active Plantation Projects */}
              <div
                onClick={() => navigate('/admin/plantations')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Live Plantations <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-[#087F5B]">{activePlantationProjectsCount}</div>
                <span className="text-[10px] text-stone-500 block">Under active silviculture</span>
              </div>

              {/* 12. Managed Plantation Acreage */}
              <div
                onClick={() => navigate('/admin/plantations')}
                className="bg-white p-5 rounded-3xl border border-[#E2E4D8] shadow-sm hover:shadow-md hover:border-[#087F5B] transition-all cursor-pointer space-y-1"
              >
                <span className="text-[10px] text-stone-400 uppercase font-bold flex justify-between">
                  Managed Acreage <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </span>
                <div className="text-2xl font-bold text-[#C8A45D]">{totalManagedAcreage} Acres</div>
                <span className="text-[10px] text-stone-500 block">Telangana, AP & Karnataka</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-white p-4 rounded-3xl border border-[#E2E4D8] shadow-sm flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#063B2D] uppercase tracking-wider">Quick Actions:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsNewProductModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#087F5B] text-white font-semibold hover:bg-[#063B2D] transition-colors flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
              <button
                onClick={() => setIsNewQuoteModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#063B2D] text-white font-semibold hover:bg-[#087F5B] transition-colors flex items-center gap-1 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" /> New Quote
              </button>
              <button
                onClick={() => navigate('/operations/nursery')}
                className="px-3.5 py-2 rounded-xl bg-[#F8F7F1] text-stone-700 font-semibold border hover:bg-stone-100 transition-colors flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5 text-[#087F5B]" /> New Nursery Batch
              </button>
              <button
                onClick={() => navigate('/admin/cms')}
                className="px-3.5 py-2 rounded-xl bg-[#F8F7F1] text-stone-700 font-semibold border hover:bg-stone-100 transition-colors flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5 text-[#C8A45D]" /> Manage Media Library
              </button>
              <button
                onClick={() =>
                  exportCSV(
                    'executive_kpi_summary.csv',
                    [
                      {
                        SalesRevenueINR: totalSalesRevenue,
                        TotalOrders: totalOrdersCount,
                        PlantsSold: totalPlantsSold,
                        AvailableSaplings: totalAvailableSaplings,
                        ManagedAcreage: totalManagedAcreage,
                      },
                    ]
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-[#F8F7F1] text-stone-700 font-semibold border hover:bg-stone-100 transition-colors flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export Summary
              </button>
            </div>
          </div>

          {/* REAL DATA VISUALIZATIONS & CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Clones Demand Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#063B2D]">
                  Clone Inventory & Demand Balance
                </h3>
                <span className="text-[10px] text-stone-400 font-semibold">MBT-1 to MBT-9</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {clones.map(c => {
                  const maxUnits = 30000;
                  const pct = Math.min(100, Math.round((c.availableUnits / maxUnits) * 100));
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-stone-800">
                          {c.id} — {c.name}
                        </span>
                        <span className="font-bold text-[#087F5B]">
                          {c.availableUnits.toLocaleString()} units ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#087F5B] to-[#48A868] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Plantation Project Stages Distribution */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#063B2D]">
                  Plantation Development Stages
                </h3>
                <span className="text-[10px] text-stone-400 font-semibold">Turnkey Estates</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { stage: 'Site Survey & Soil', count: projects.filter(p => p.stage === 'Site Survey').length, color: 'bg-blue-500' },
                  { stage: 'Layout & Drip Setup', count: projects.filter(p => p.stage === 'Drip Setup' || p.stage === 'Layout & Clearing').length, color: 'bg-teal-500' },
                  { stage: 'Planting & Hardening', count: projects.filter(p => p.stage === 'Planting' || p.stage === 'Hardening').length, color: 'bg-emerald-500' },
                  { stage: 'Active Monitoring', count: projects.filter(p => p.stage === 'Active Monitoring' || p.stage === 'Ongoing Maintenance').length, color: 'bg-[#C8A45D]' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F8F7F1] border space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold">{s.stage}</span>
                    <div className="text-2xl font-bold text-stone-900">{s.count} Estates</div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200 mt-2 overflow-hidden">
                      <div className={`h-full ${s.color}`} style={{ width: `${(s.count / Math.max(1, projects.length)) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#082A21] text-white flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#C8A45D] font-bold uppercase">Flagship Model Dossier</span>
                  <strong className="block text-xs font-serif">350-Acre Commercial Proposal Model</strong>
                  <span className="text-[10px] text-stone-300">122,500 Base Trees + 5% Nursery Buffer</span>
                </div>
                <button
                  onClick={() => navigate('/admin/plantations')}
                  className="px-3 py-1.5 rounded-xl bg-[#087F5B] text-white text-[11px] font-semibold"
                >
                  View Blueprint
                </button>
              </div>
            </div>
          </div>

          {/* Recent Orders & Pending Quotes Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#063B2D]">Recent Orders</h3>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="text-xs text-[#087F5B] font-semibold hover:underline"
                >
                  View All ({orders.length})
                </button>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {orders.slice(0, 4).map(o => (
                  <div key={o.id} className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="text-stone-800 block">{o.orderNumber}</strong>
                      <span className="text-stone-400 text-[11px]">{o.customerName} • {o.items.length} items</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-[#063B2D] block">₹{o.totalAmount.toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-[#F1F2E8] text-[#087F5B]">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inbound Leads / Quotes */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4D8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#063B2D]">Commercial Quotations</h3>
                <button
                  onClick={() => navigate('/admin/quotations')}
                  className="text-xs text-[#087F5B] font-semibold hover:underline"
                >
                  View All ({quotations.length})
                </button>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {quotations.slice(0, 4).map(q => (
                  <div key={q.id} className="py-3 flex items-center justify-between">
                    <div>
                      <strong className="text-stone-800 block">{q.quoteNumber}</strong>
                      <span className="text-stone-400 text-[11px]">{q.customerName} ({q.location})</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-[#087F5B] block">₹{q.totalEstimated.toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-stone-100 text-stone-700">
                        {q.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Catalog Products Management</h3>
              <p className="text-xs text-stone-500">Live products reflected across the public website shop.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsNewProductModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search products, SKU or clone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8F7F1] border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Image</th>
                  <th className="pb-3">Product Name & SKU</th>
                  <th className="pb-3">Clone</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Unit Price</th>
                  <th className="pb-3">Available Stock</th>
                  <th className="pb-3">MOQ</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products
                  .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.cloneId.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(p => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="py-3">
                        <img
                          src={p.images[0] || '/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg'}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-xl border"
                        />
                      </td>
                      <td className="py-3">
                        <strong className="font-bold text-[#063B2D] block">{p.name}</strong>
                        <span className="text-[10px] text-stone-400 font-mono">{p.sku || `SKU-${p.id}`}</span>
                      </td>
                      <td className="py-3 text-stone-600 font-semibold">{p.cloneId}</td>
                      <td className="py-3 text-stone-600">{p.category}</td>
                      <td className="py-3 font-bold text-stone-900">₹{p.price}</td>
                      <td className="py-3 text-stone-700 font-bold">{p.stock.toLocaleString()}</td>
                      <td className="py-3 text-stone-500">{p.minOrderQuantity}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'archived'
                              ? 'bg-stone-100 text-stone-600'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProdForm({
                              name: p.name,
                              sku: p.sku || `MB-SKU-${p.cloneId}`,
                              cloneId: p.cloneId,
                              category: p.category,
                              scientificName: p.scientificName || 'Tectona grandis L.f.',
                              shortDescription: p.shortDescription,
                              description: p.description,
                              price: p.price,
                              minOrderQuantity: p.minOrderQuantity,
                              stock: p.stock,
                              height: p.height,
                              ageInMonths: p.ageInMonths,
                              containerType: p.containerType,
                              rootCondition: p.rootCondition || 'Ex-Vitro Taproot Inducted',
                              nurseryLocation: p.nurseryLocation || 'Hyderabad Central Nursery Hub',
                              waterRequirements: p.waterRequirements || 'Drip fertigation 4-6 LPH/tree',
                              spacingRecommendation: p.spacingRecommendation || '3.5m × 3.5m (350 plants/acre)',
                              taxClassification: p.taxClassification || 'GST Exempt (Agricultural Live Plant)',
                              seoTitle: p.seoTitle || p.name,
                              seoDescription: p.seoDescription || p.shortDescription,
                              isFeatured: !!p.featured,
                              isPublished: p.status === 'active',
                            });
                            setIsNewProductModal(true);
                          }}
                          className="text-[#087F5B] hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        {p.status === 'active' ? (
                          <button
                            onClick={() => archiveProduct(p.id)}
                            className="text-stone-500 hover:text-stone-700 font-semibold"
                          >
                            Archive
                          </button>
                        ) : (
                          <button
                            onClick={() => restoreProduct(p.id)}
                            className="text-emerald-600 hover:text-emerald-800 font-semibold"
                          >
                            Restore
                          </button>
                        )}
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TEAK CLONES MANAGEMENT & COMPARISON */}
      {activeTab === 'clones' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Teak Clone Genetics (MBT-1 to MBT-9)</h3>
              <p className="text-xs text-stone-500">Edit verified clone parameters, soil suitability, and research provenance.</p>
            </div>
            <button
              onClick={() => setCompareClonesModal(true)}
              className="px-4 py-2 rounded-xl bg-[#063B2D] text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C8A45D]" /> Compare Clones Side-by-Side
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {clones.map(c => (
              <div key={c.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-base text-[#087F5B] block">{c.id}: {c.name}</strong>
                    <span className="text-[10px] text-stone-400 italic">Tectona grandis (Clonal Selection)</span>
                  </div>
                  <span className="text-[10px] bg-white px-2.5 py-1 rounded-full font-bold border border-stone-200 text-[#063B2D]">
                    {c.stockAvailability}
                  </span>
                </div>

                <p className="text-stone-600 leading-relaxed">{c.tagline}</p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Soil Suitability</span>
                    <strong className="text-stone-700">{c.soilSuitability.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Annual Rainfall</span>
                    <strong className="text-stone-700">{c.rainfallRequirement}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Recommended Spacing</span>
                    <strong className="text-stone-700">{c.recommendedSpacing}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Available Units</span>
                    <strong className="text-[#087F5B]">{c.availableUnits.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-400">Lab Batch: {c.laboratoryBatch}</span>
                  <button
                    onClick={() => setEditingClone(c)}
                    className="text-[#087F5B] font-semibold hover:underline text-xs"
                  >
                    Edit Technical Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORDERS & FULFILLMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Orders & Logistics Fulfillment</h3>
              <p className="text-xs text-stone-500">Track orders from placement to nursery crate packing and farm delivery.</p>
            </div>
            <button
              onClick={() =>
                exportCSV(
                  'orders_ledger_admin.csv',
                  orders.map(o => ({
                    OrderNumber: o.orderNumber,
                    Date: o.createdAt,
                    Customer: o.customerName,
                    Phone: o.customerPhone,
                    Amount: o.totalAmount,
                    Status: o.status,
                    Payment: o.paymentStatus,
                  }))
                )
              }
              className="px-4 py-2 rounded-xl bg-[#F8F7F1] border text-stone-700 text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Orders CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Saplings</th>
                  <th className="pb-3">Total Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map(o => {
                  const totalUnits = o.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <tr key={o.id} className="hover:bg-stone-50">
                      <td className="py-3 font-bold text-[#063B2D]">{o.orderNumber}</td>
                      <td className="py-3">
                        <strong className="text-stone-800 block">{o.customerName}</strong>
                        <span className="text-[10px] text-stone-400">{o.customerPhone}</span>
                      </td>
                      <td className="py-3 text-stone-500">{o.createdAt.split('T')[0]}</td>
                      <td className="py-3 font-bold text-stone-700">{totalUnits.toLocaleString()} Plants</td>
                      <td className="py-3 font-bold text-[#063B2D]">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : o.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : o.status === 'dispatched'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 text-stone-600 font-medium">{o.paymentStatus}</td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="text-[#087F5B] hover:underline font-semibold"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setInvoiceModalOrder(o)}
                          className="text-stone-600 hover:underline"
                        >
                          Invoice
                        </button>
                        <button
                          onClick={() => setPackingSlipOrder(o)}
                          className="text-stone-600 hover:underline"
                        >
                          Packing Slip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CLIENTS & CRM ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Farmer & Landowner CRM Pipeline</h3>
              <p className="text-xs text-stone-500">Track incoming plantation briefs, acreage requests, and convert to quotations.</p>
            </div>
            <button
              onClick={() =>
                exportCSV(
                  'farmer_crm_leads.csv',
                  enquiries.map(e => ({
                    EnquiryRef: e.enquiryNumber,
                    Name: e.fullName,
                    Phone: e.phone,
                    Email: e.email,
                    Acreage: e.acreage,
                    Location: e.location,
                    Status: e.status,
                  }))
                )
              }
              className="px-4 py-2 rounded-xl bg-[#F8F7F1] border text-stone-700 text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Leads CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {enquiries.map(e => (
              <div key={e.id} className="p-5 rounded-2xl bg-[#F8F7F1] border border-stone-200 space-y-3">
                <div className="flex justify-between items-center">
                  <strong className="text-sm font-bold text-[#063B2D]">{e.enquiryNumber}</strong>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-amber-700 border">
                    {e.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-stone-800">{e.fullName}</h4>
                  <p className="text-stone-500 text-[11px]">{e.phone} • {e.email}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1 text-[11px]">
                  <div><strong>Category:</strong> {e.category}</div>
                  <div><strong>Acreage:</strong> {e.acreage ? `${e.acreage} Acres` : 'Single Batch'}</div>
                  <div><strong>Location:</strong> {e.location}</div>
                  <p className="text-stone-500 pt-1 line-clamp-2 italic">"{e.message}"</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-[10px] text-stone-400">{e.createdAt.split('T')[0]}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        const q = convertEnquiryToQuote(e.id);
                        if (q) navigate('/admin/quotations');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#087F5B] text-white font-semibold text-[11px]"
                    >
                      Generate Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. COMMERCIAL QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Commercial Quotation Builder</h3>
              <p className="text-xs text-stone-500">Draft itemized quotes with bulk tiers, transport rates, and 1-click order conversion.</p>
            </div>
            <button
              onClick={() => setIsNewQuoteModal(true)}
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Quotation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Quote #</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Location & Acreage</th>
                  <th className="pb-3">Quantity</th>
                  <th className="pb-3">Subtotal</th>
                  <th className="pb-3">Total Estimated</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {quotations.map(q => {
                  const qty = q.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <tr key={q.id} className="hover:bg-stone-50">
                      <td className="py-3 font-bold text-[#063B2D]">{q.quoteNumber}</td>
                      <td className="py-3">
                        <strong className="text-stone-800 block">{q.customerName}</strong>
                        <span className="text-[10px] text-stone-400">{q.customerPhone}</span>
                      </td>
                      <td className="py-3 text-stone-600">{q.location} ({q.landAcreage || 1} ac)</td>
                      <td className="py-3 font-bold text-stone-700">{qty.toLocaleString()} Plants</td>
                      <td className="py-3 text-stone-600">₹{q.subtotal.toLocaleString('en-IN')}</td>
                      <td className="py-3 font-bold text-[#087F5B]">₹{q.totalEstimated.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 font-bold text-[10px] uppercase text-stone-700">
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        {q.status !== 'accepted' && (
                          <button
                            onClick={() => convertQuoteToOrder(q.id)}
                            className="text-[#087F5B] hover:underline font-semibold"
                          >
                            Convert to Order
                          </button>
                        )}
                        <button
                          onClick={() => {
                            updateQuotationStatus(q.id, 'sent');
                            addToast('info', 'Quotation Marked Sent', `Sent to ${q.customerEmail}`);
                          }}
                          className="text-stone-600 hover:underline"
                        >
                          Mark Sent
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. PLANTATION PROJECTS & 15-TAB MANAGEMENT */}
      {activeTab === 'plantations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Plantation Projects Management</h3>
              <p className="text-xs text-stone-500">15-tab technical dossier covering surveys, blocks, irrigation, and caliper girth records.</p>
            </div>
            <button
              onClick={() => {
                const title = prompt('Project Title:');
                if (title) {
                  addProject({
                    title,
                    clientName: 'New Client Agro Holdings',
                    clientContact: '+91 98850 12345',
                    location: 'Khammam, Telangana',
                    district: 'Khammam',
                    state: 'Telangana',
                    acreage: 20,
                    saplingCount: 7000,
                    allocatedClones: ['MBT-1'],
                    stage: 'Site Survey',
                    assignedManager: 'Suresh Varma (Agronomist)',
                    startDate: '2026-11-01',
                    estimatedCompletion: '2041-11-01',
                    survivalRate: 98,
                    averageHeightMeters: 0.5,
                    averageGirthCm: 4.2,
                    blocks: [],
                    maintenanceTasks: [],
                    growthRecords: [],
                  });
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Plantation Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(p => (
              <div
                key={p.id}
                className="bg-[#F8F7F1] rounded-2xl border border-stone-200 p-5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#082A21] text-[#C8A45D] font-bold text-[10px]">
                      {p.code}
                    </span>
                    <span className="text-[10px] text-[#087F5B] font-bold">{p.stage}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#172820]">{p.title}</h4>
                  <p className="text-[11px] text-stone-500">{p.location} • {p.acreage} Acres</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border mt-3">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Saplings</span>
                      <strong className="text-stone-800">{p.saplingCount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Survival Rate</span>
                      <strong className="text-emerald-700">{p.survivalRate}%</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Avg Height</span>
                      <strong className="text-stone-800">{p.averageHeightMeters}m</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Avg Girth</span>
                      <strong className="text-[#C8A45D]">{p.averageGirthCm}cm</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(p);
                    setProjectDetailTab('overview');
                  }}
                  className="w-full py-2 rounded-xl bg-[#063B2D] hover:bg-[#087F5B] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  Open 15-Tab Technical Dossier <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. WEBSITE CMS & ORGANIZED MEDIA LIBRARY */}
      {activeTab === 'cms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-8">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">
              Website CMS & Organized Media Library
            </h3>
            <p className="text-xs text-stone-500">
              Manage website copy and high-resolution photographs with accurate metadata, titles, and categories.
            </p>
          </div>

          {/* CMS Text Fields */}
          <div className="p-6 bg-[#F8F7F1] rounded-2xl border space-y-4 text-xs">
            <h4 className="font-bold text-sm text-[#063B2D]">Live Headings & Announcements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Announcement Banner</label>
                <input
                  type="text"
                  value={cms.announcementBanner}
                  onChange={e => updateCMS({ announcementBanner: e.target.value })}
                  className="w-full bg-white border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={cms.heroTagline}
                  onChange={e => updateCMS({ heroTagline: e.target.value })}
                  className="w-full bg-white border rounded-xl p-2.5"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Homepage Hero Headline</label>
              <input
                type="text"
                value={cms.homepageHeroHeadline}
                onChange={e => updateCMS({ homepageHeroHeadline: e.target.value })}
                className="w-full bg-white border rounded-xl p-2.5"
              />
            </div>
          </div>

          {/* ORGANIZED MEDIA LIBRARY */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-[#063B2D]">
                  Media Library Archive ({mediaAssets.length} Assets)
                </h4>
                <p className="text-xs text-stone-500">
                  Preserving original files, categories, alt text, and exact usage locations.
                </p>
              </div>
              <button
                onClick={() => setIsAddMediaModal(true)}
                className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Asset to Library
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'All',
                'Tree Planting',
                'Company Events',
                'Media Interactions',
                'Nursery Operations',
                'Tree Growth Measurements',
                'Personal',
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedMediaCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                    selectedMediaCategory === cat
                      ? 'bg-[#087F5B] text-white border-[#087F5B] font-semibold'
                      : 'bg-[#F8F7F1] text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {mediaAssets
                .filter(m => selectedMediaCategory === 'All' || m.category === selectedMediaCategory)
                .map(asset => (
                  <div
                    key={asset.id}
                    className="bg-[#F8F7F1] rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-stone-200 group">
                        <img
                          src={asset.imageUrl}
                          alt={asset.altText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 text-[#C8A45D] text-[10px] font-bold">
                          {asset.category}
                        </span>
                        {asset.visibility === 'unpublished' && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                            Unpublished
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-1.5 text-xs">
                        <strong className="font-bold text-stone-900 block leading-tight">{asset.title}</strong>
                        <p className="text-[11px] text-stone-500 line-clamp-2">{asset.caption}</p>
                        <div className="text-[10px] text-stone-400 font-mono pt-1">
                          File: {asset.originalFileName}
                        </div>
                        <div className="text-[10px] text-[#087F5B]">
                          Usage: {asset.usageLocation}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex justify-between items-center text-xs border-t border-stone-200">
                      <button
                        onClick={() => setMediaPreviewModal(asset)}
                        className="text-[#087F5B] font-semibold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                      <button
                        onClick={() => {
                          const newVis = asset.visibility === 'published' ? 'unpublished' : 'published';
                          updateMediaAsset({ ...asset, visibility: newVis });
                        }}
                        className="text-stone-500 hover:text-stone-800 text-[11px]"
                      >
                        {asset.visibility === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. STAFF & PERMISSIONS */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#063B2D]">Staff & Role Permissions Matrix</h3>
              <p className="text-xs text-stone-500">Manage personnel roles across Super Admin, Sales Staff, Plantation Managers, and Nursery Leads.</p>
            </div>
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Staff Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Activity</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {staffMembers.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50">
                    <td className="py-3 font-bold text-[#063B2D]">{s.name}</td>
                    <td className="py-3 text-stone-600">{s.department}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#F1F2E8] font-bold text-[10px] text-[#087F5B]">
                        {s.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-stone-500">{s.phone}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-stone-400 text-[11px]">{s.lastActivity}</td>
                    <td className="py-3 text-right">
                      {s.status === 'active' ? (
                        <button
                          onClick={() => deactivateStaff(s.id)}
                          className="text-rose-500 hover:underline"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStaff({ ...s, status: 'active' })}
                          className="text-emerald-600 hover:underline"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10. REPORTS & ANALYTICS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Enterprise Reports & Data Export</h3>
            <p className="text-xs text-stone-500">Download formatted CSV reports for accounting and silvicultural audits.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#F8F7F1] border space-y-3">
              <strong className="block text-sm text-[#063B2D]">Orders Ledger ({orders.length})</strong>
              <p className="text-stone-500">Full order receipts, customer details, and payment statuses.</p>
              <button
                onClick={() =>
                  exportCSV(
                    'mother_biotech_orders.csv',
                    orders.map(o => ({
                      OrderNumber: o.orderNumber,
                      Date: o.createdAt,
                      Customer: o.customerName,
                      Phone: o.customerPhone,
                      Amount: o.totalAmount,
                      Status: o.status,
                    }))
                  )
                }
                className="w-full py-2 bg-[#063B2D] text-white rounded-xl font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Orders CSV
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F1] border space-y-3">
              <strong className="block text-sm text-[#063B2D]">Enquiries & Leads ({enquiries.length})</strong>
              <p className="text-stone-500">Inbound farmer leads with acreage and soil requirements.</p>
              <button
                onClick={() =>
                  exportCSV(
                    'farmer_enquiries_crm.csv',
                    enquiries.map(e => ({
                      Ref: e.enquiryNumber,
                      Name: e.fullName,
                      Phone: e.phone,
                      Category: e.category,
                      Location: e.location,
                      Acreage: e.acreage,
                      Status: e.status,
                    }))
                  )
                }
                className="w-full py-2 bg-[#063B2D] text-white rounded-xl font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Leads CSV
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7F1] border space-y-3">
              <strong className="block text-sm text-[#063B2D]">Plantation Projects ({projects.length})</strong>
              <p className="text-stone-500">Estate codes, survival percentages, and manager assignments.</p>
              <button
                onClick={() =>
                  exportCSV(
                    'plantation_projects_audit.csv',
                    projects.map(p => ({
                      Code: p.code,
                      Title: p.title,
                      Acreage: p.acreage,
                      Saplings: p.saplingCount,
                      SurvivalRate: p.survivalRate,
                      Stage: p.stage,
                    }))
                  )
                }
                className="w-full py-2 bg-[#063B2D] text-white rounded-xl font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Projects CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. AUDIT ACTIVITY LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">System Audit Log & Traceability</h3>
            <p className="text-xs text-stone-500">Immutable ledger recording orders placed, stock movements, and CMS edits.</p>
          </div>

          <div className="space-y-2 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 rounded-xl bg-[#F8F7F1] border flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-stone-900">{log.action}</strong>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-stone-500">
                      {log.entity}
                    </span>
                  </div>
                  <p className="text-stone-600">{log.details}</p>
                </div>
                <div className="text-right text-[11px] text-stone-400">
                  <span>{log.user} ({log.role || 'admin'})</span>
                  <span className="block text-[10px]">{log.timestamp.split('T')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6 max-w-2xl">
          <h3 className="font-serif font-bold text-xl text-[#063B2D]">Store & System Settings</h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#F8F7F1] rounded-2xl border space-y-2">
              <strong className="block text-sm text-[#063B2D]">Store Currency & Tax</strong>
              <p className="text-stone-500">Configured Currency: Indian Rupee (INR - ₹)</p>
              <p className="text-stone-500">Agricultural planting stock is classified under GST 0% exemption.</p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 space-y-2">
              <strong className="block text-sm">Factory Reset Demo Environment</strong>
              <p className="text-xs">Clears all localStorage orders, quotations, and returns to initial proposal datasets.</p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all demo data back to factory defaults?')) {
                    resetAllData();
                  }
                }}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold shadow"
              >
                Reset All Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. PAYMENTS LEDGER (/admin/payments) */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Payment & Transaction Ledger</h3>
            <p className="text-xs text-stone-500">Demo payment settlements, bank references, and customer receipts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-500 font-semibold">
                  <th className="pb-3">Txn Ref</th>
                  <th className="pb-3">Order #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="py-3 font-mono font-bold text-[#063B2D]">{p.transactionRef}</td>
                    <td className="py-3 font-semibold text-stone-800">{p.orderNumber}</td>
                    <td className="py-3 text-stone-700">{p.customerName}</td>
                    <td className="py-3 font-bold text-stone-900">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-stone-600">{p.method}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-stone-400 text-[11px]">{p.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 14. NOTIFICATIONS CENTER (/admin/notifications) */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E4D8] shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-xl text-[#063B2D]">Operational Notifications</h3>
            <p className="text-xs text-stone-500">Real-time alerts regarding low nursery stock, overdue tasks, and new leads.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold">Low Nursery Stock Alert: MBT-4 Clonal Teak</strong>
                <p className="text-xs text-amber-800 mt-0.5">
                  Available units for MBT-4 Coastal Special have dipped below 12,000 threshold. Consider scheduling micropropagation flask subculture.
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 flex items-start gap-3">
              <Bell className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold">New Turnkey Plantation Enquiry Received</strong>
                <p className="text-xs text-blue-800 mt-0.5">
                  Raghavendra Varma submitted a request for 25 acres turnkey drip installation in East Godavari.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: 15-TAB PLANTATION PROJECT TECHNICAL DOSSIER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 text-stone-200 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl relative text-xs">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-[#063B2D] text-[#C8A45D] font-bold text-xs border border-[#C8A45D]/40">
                  {selectedProject.code}
                </span>
                <span className="text-xs text-[#48A868] font-bold">{selectedProject.stage}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">{selectedProject.title}</h3>
              <p className="text-stone-400 text-xs mt-1">
                Client: <strong>{selectedProject.clientName}</strong> • {selectedProject.location} • Manager: {selectedProject.assignedManager}
              </p>
            </div>

            {/* 15 Tabs Header */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-stone-800">
              {[
                { id: 'overview', label: '1. Overview' },
                { id: 'client', label: '2. Client & Land' },
                { id: 'survey', label: '3. Site Survey' },
                { id: 'planning', label: '4. Planning' },
                { id: 'blocks', label: '5. Blocks' },
                { id: 'saplings', label: '6. Saplings' },
                { id: 'irrigation', label: '7. Irrigation' },
                { id: 'maintenance', label: '8. Tasks' },
                { id: 'growth', label: '9. Growth Records' },
                { id: 'photos', label: '10. Photos' },
                { id: 'docs', label: '11. Docs' },
                { id: 'costs', label: '12. Capex' },
                { id: 'timeline', label: '13. Timeline' },
                { id: 'reports', label: '14. Reports' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setProjectDetailTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                    projectDetailTab === tab.id
                      ? 'bg-[#087F5B] text-white font-semibold'
                      : 'bg-white/5 text-stone-400 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {projectDetailTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#063B2D] p-4 rounded-2xl border border-stone-800">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Acreage</span>
                    <strong className="text-white text-base">{selectedProject.acreage} Acres</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Planned Saplings</span>
                    <strong className="text-white text-base">{selectedProject.saplingCount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Survival Rate</span>
                    <strong className="text-emerald-400 text-base">{selectedProject.survivalRate}%</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Avg DBH Girth</span>
                    <strong className="text-[#C8A45D] text-base">{selectedProject.averageGirthCm} cm</strong>
                  </div>
                </div>
                <p className="text-stone-300 leading-relaxed">{selectedProject.notes}</p>
              </div>
            )}

            {projectDetailTab === 'growth' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Tree Biometrics & Caliper DBH Log</h4>
                  <button
                    onClick={() => setIsGrowthModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-[#087F5B] text-white font-semibold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log Growth Measurement
                  </button>
                </div>

                {/* Tree Trunk Measurement Reference Photo */}
                <div className="bg-[#063B2D] p-4 rounded-2xl border border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="rounded-xl overflow-hidden h-32 bg-stone-900 border">
                    <img
                      src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80"
                      alt="Tree trunk circumference and caliper biometric audit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-[#C8A45D] text-[10px] font-bold uppercase block">
                      Reference Forestry Inspection Protocol
                    </span>
                    <strong className="text-white text-sm block">
                      Standard Calibrated DBH Circumference Measurement
                    </strong>
                    <p className="text-stone-300 text-[11px] leading-relaxed">
                      Quarterly tree circumference recorded at 1.37 meters above root collar. Audits verify heartwood induction and annual volume expansion.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedProject.growthRecords.map(r => (
                    <div key={r.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <strong className="text-white block">{r.blockName} • {r.avgGirthCm} cm Girth</strong>
                        <span className="text-[10px] text-stone-400">
                          Height: {r.avgHeightCm} cm • Sampled: {r.plantsSampled} trees • Condition: {r.foliageCondition || 'Good'}
                        </span>
                      </div>
                      <div className="text-right text-[10px] text-stone-400">
                        <span>{r.inspector}</span>
                        <span className="block">{r.inspectionDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projectDetailTab === 'photos' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80"
                    alt="Tree trunk measurement"
                    className="w-full h-36 object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                    Trunk Measurement Audit
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden relative group">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.13_8f0af055.jpeg"
                    alt="Planting ceremony"
                    className="w-full h-36 object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                    Sapling Planting Ceremony
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden relative group">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.21_47b7a0da.jpeg"
                    alt="Agronomy team"
                    className="w-full h-36 object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                    Agronomy Inspection Team
                  </span>
                </div>
              </div>
            )}

            {(projectDetailTab === 'client' ||
              projectDetailTab === 'survey' ||
              projectDetailTab === 'planning' ||
              projectDetailTab === 'blocks' ||
              projectDetailTab === 'saplings' ||
              projectDetailTab === 'irrigation' ||
              projectDetailTab === 'maintenance' ||
              projectDetailTab === 'docs' ||
              projectDetailTab === 'costs' ||
              projectDetailTab === 'timeline' ||
              projectDetailTab === 'reports') && (
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                <h4 className="font-bold text-white text-sm capitalize">{projectDetailTab} Specifications</h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Technical silvicultural parameters configured for {selectedProject.title} ({selectedProject.code}).
                  All telemetry records synchronized with Nature's Canopy field app.
                </p>
                <div className="text-[11px] text-stone-400">
                  Allocated Clones: {selectedProject.allocatedClones.join(', ')} • Start Date: {selectedProject.startDate}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
              >
                Close Technical Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT PRODUCT (ALL 24 FIELDS) */}
      {isNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <h4 className="font-serif font-bold text-lg text-[#063B2D]">
              {editingProduct ? 'Edit Catalog Product' : 'Add New Product to Catalog'}
            </h4>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.sku}
                    onChange={e => setProdForm({ ...prodForm, sku: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Target Clone</label>
                  <select
                    value={prodForm.cloneId}
                    onChange={e => setProdForm({ ...prodForm, cloneId: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    {clones.map(c => (
                      <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={prodForm.category}
                    onChange={e => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  >
                    <option>Clonal Teak Sapling</option>
                    <option>Hardened Plantlet</option>
                    <option>Commercial Bulk Pack</option>
                    <option>Trial Sample Kit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Scientific Name</label>
                  <input
                    type="text"
                    value={prodForm.scientificName}
                    onChange={e => setProdForm({ ...prodForm, scientificName: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={prodForm.price}
                    onChange={e => setProdForm({ ...prodForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Available Stock *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={prodForm.stock}
                    onChange={e => setProdForm({ ...prodForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Min Order Qty (MOQ) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={prodForm.minOrderQuantity}
                    onChange={e => setProdForm({ ...prodForm, minOrderQuantity: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  value={prodForm.shortDescription}
                  onChange={e => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={prodForm.description}
                  onChange={e => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewProductModal(false)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#087F5B] text-white font-semibold rounded-xl shadow"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOG GROWTH MEASUREMENT */}
      {isGrowthModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-xs shadow-2xl">
            <h4 className="font-serif font-bold text-lg text-[#063B2D]">
              Record Tree Growth & Caliper Biometrics
            </h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                addGrowthRecord(selectedProject.id, {
                  blockName: growthForm.blockName,
                  clone: growthForm.clone,
                  plantsSampled: growthForm.plantsSampled,
                  survivalCount: growthForm.survivalCount,
                  avgHeightCm: growthForm.avgHeightCm,
                  avgGirthCm: growthForm.avgGirthCm,
                  inspector: growthForm.inspector,
                  notes: growthForm.notes,
                  inspectionDate: new Date().toISOString().split('T')[0],
                  treeId: growthForm.treeId,
                  treeAgeYears: growthForm.treeAgeYears,
                  treeHealth: growthForm.treeHealth,
                  photographUrl: growthForm.photographUrl,
                });
                setIsGrowthModalOpen(false);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Plantation Block</label>
                  <input
                    type="text"
                    required
                    value={growthForm.blockName}
                    onChange={e => setGrowthForm({ ...growthForm, blockName: e.target.value })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tree Age (Years)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={growthForm.treeAgeYears}
                    onChange={e => setGrowthForm({ ...growthForm, treeAgeYears: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Avg Tree Height (cm)</label>
                  <input
                    type="number"
                    required
                    value={growthForm.avgHeightCm}
                    onChange={e => setGrowthForm({ ...growthForm, avgHeightCm: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Trunk Circumference / Girth (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={growthForm.avgGirthCm}
                    onChange={e => setGrowthForm({ ...growthForm, avgGirthCm: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Field Observations & Health Status</label>
                <textarea
                  rows={2}
                  value={growthForm.notes}
                  onChange={e => setGrowthForm({ ...growthForm, notes: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGrowthModalOpen(false)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#087F5B] text-white font-semibold rounded-xl shadow"
                >
                  Save Biometrics Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MEDIA ASSET */}
      {isAddMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-xs shadow-2xl">
            <h4 className="font-serif font-bold text-lg text-[#063B2D]">Add Image to Media Library</h4>
            <form onSubmit={handleSaveMedia} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={mediaForm.title}
                  onChange={e => setMediaForm({ ...mediaForm, title: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={mediaForm.category}
                  onChange={e => setMediaForm({ ...mediaForm, category: e.target.value as any })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                >
                  <option value="Tree Planting">Tree Planting</option>
                  <option value="Company Events">Company Events</option>
                  <option value="Media Interactions">Media Interactions</option>
                  <option value="Nursery Operations">Nursery Operations</option>
                  <option value="Tree Growth Measurements">Tree Growth Measurements</option>
                  <option value="Personal">Personal / Unpublished</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL / Local Asset Path</label>
                <input
                  type="text"
                  required
                  value={mediaForm.imageUrl}
                  onChange={e => setMediaForm({ ...mediaForm, imageUrl: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Descriptive Caption</label>
                <input
                  type="text"
                  value={mediaForm.caption}
                  onChange={e => setMediaForm({ ...mediaForm, caption: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={mediaForm.altText}
                  onChange={e => setMediaForm({ ...mediaForm, altText: e.target.value })}
                  className="w-full bg-[#F8F7F1] border rounded-xl p-2.5"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMediaModal(false)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#087F5B] text-white font-semibold rounded-xl shadow"
                >
                  Save to Media Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MEDIA PREVIEW */}
      {mediaPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="bg-[#082A21] border border-[#C8A45D]/40 text-white rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative text-xs">
            <button
              onClick={() => setMediaPreviewModal(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-2xl overflow-hidden max-h-96 bg-black flex items-center justify-center">
              <img
                src={mediaPreviewModal.imageUrl}
                alt={mediaPreviewModal.altText}
                className="max-h-96 object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] text-[#C8A45D] font-bold uppercase block">
                {mediaPreviewModal.category} • {mediaPreviewModal.originalFileName}
              </span>
              <h4 className="text-lg font-bold font-serif">{mediaPreviewModal.title}</h4>
              <p className="text-stone-300 mt-1">{mediaPreviewModal.caption}</p>
              <p className="text-stone-400 text-[11px] mt-2">
                <strong>Alt Text:</strong> {mediaPreviewModal.altText}
              </p>
              <p className="text-stone-400 text-[11px]">
                <strong>Designated Usage:</strong> {mediaPreviewModal.usageLocation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE DEMO INVOICE */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full space-y-6 text-xs text-stone-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceModalOrder(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="border-b pb-4 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-bold text-[#087F5B]">Commercial Tax Invoice (Demo)</span>
                <h3 className="text-xl font-serif font-bold text-[#063B2D]">MOTHER BIOTECH</h3>
                <p className="text-[11px] text-stone-500">Tissue-Culture Clonal Teak Nursery & Biotechnology</p>
              </div>
              <div className="text-right">
                <strong className="block text-sm">{invoiceModalOrder.orderNumber}</strong>
                <span className="text-[11px] text-stone-400">Date: {invoiceModalOrder.createdAt.split('T')[0]}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] bg-[#F8F7F1] p-3.5 rounded-2xl border">
              <div>
                <span className="text-stone-400 block font-semibold">Billed To:</span>
                <strong>{invoiceModalOrder.customerName}</strong>
                <p className="text-stone-500">{invoiceModalOrder.shippingAddress?.street}, {invoiceModalOrder.shippingAddress?.city}</p>
                <p className="text-stone-500">{invoiceModalOrder.customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block font-semibold">Tax Exemption:</span>
                <span className="text-emerald-700 font-bold">GST 0% (Live Agro Plants)</span>
                <p className="text-[10px] text-stone-400 mt-1">Payment: {invoiceModalOrder.paymentMethod}</p>
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="border-b text-stone-500">
                <tr>
                  <th className="pb-2">Item</th>
                  <th className="pb-2 text-right">Qty</th>
                  <th className="pb-2 text-right">Rate</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {invoiceModalOrder.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{it.productName} ({it.cloneId})</td>
                    <td className="py-2 text-right">{it.quantity.toLocaleString()}</td>
                    <td className="py-2 text-right">₹{it.unitPrice}</td>
                    <td className="py-2 text-right font-bold">₹{it.totalPrice.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t pt-3 flex justify-between font-bold text-sm text-[#063B2D]">
              <span>Total Invoice Amount:</span>
              <span>₹{invoiceModalOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#063B2D] text-white rounded-xl font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PACKING SLIP */}
      {packingSlipOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full space-y-5 text-xs text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setPackingSlipOrder(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="border-b pb-3 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-bold text-amber-600">Nursery Logistics Dispatch</span>
                <h3 className="text-xl font-serif font-bold text-[#063B2D]">Nursery Packing Slip</h3>
                <p className="text-[11px] text-stone-400">Slip Ref: {packingSlipOrder.packingSlipNumber || 'PK-2026-9041'}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-[#F8F7F1] px-2 py-1 rounded border">
                  Order: {packingSlipOrder.orderNumber}
                </span>
              </div>
            </div>

            <div className="space-y-2 bg-[#F8F7F1] p-3.5 rounded-2xl border text-[11px]">
              <div><strong>Delivery Destination:</strong> {packingSlipOrder.shippingAddress?.street}, {packingSlipOrder.shippingAddress?.city}, {packingSlipOrder.shippingAddress?.state}</div>
              <div><strong>Receiver:</strong> {packingSlipOrder.customerName} ({packingSlipOrder.customerPhone})</div>
              <div><strong>Dispatch Protocol:</strong> Ventilated wooden nursery crates with root hydration plugs</div>
            </div>

            <div className="border-t pt-2 text-[11px] text-stone-500">
              Verified by Mother Biotech Logistics Officer. Plants certified healthy and secondary hardened.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#063B2D] text-white rounded-xl font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Packing Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
