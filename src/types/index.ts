// Mother Biotech × Nature's Canopy Shared Types

export type Role = 'customer' | 'sales_staff' | 'plantation_manager' | 'nursery_staff' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  accountType?: 'individual' | 'farmer' | 'landowner' | 'business';
  company?: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing' | 'plantation';
  fullName: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface TeakClone {
  id: string; // e.g. MBT-1
  name: string;
  tagline: string;
  description: string;
  soilSuitability: string[];
  climate: string;
  rainfallRequirement: string;
  growthCharacteristics: string;
  recommendedSpacing: string;
  timberCharacteristics: string;
  propagationMethod: string;
  stockAvailability: 'In Stock' | 'Limited Stock' | 'Advance Booking' | 'Propagation Batch';
  availableUnits: number;
  image: string;
  laboratoryBatch: string;
  technicalHighlights: string[];
  // Extended fields
  status?: 'active' | 'archived';
  scientificName?: string;
  suitableAgroClimaticRegion?: string;
  soilPreferences?: string;
  rainfallConsiderations?: string;
  waterAvailabilityRequirements?: string;
  spacingRecommendations?: string;
  growthObservations?: string;
  stemFormObservations?: string;
  healthObservations?: string;
  floweringObservations?: string;
  researchReference?: string;
  relatedProductIds?: string[];
  technicalDocuments?: string[];
}

export interface BulkPricingTier {
  minQty: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  cloneId: string; // references MBT-1 .. MBT-9
  category: 'Clonal Teak Sapling' | 'Hardened Plantlet' | 'Commercial Bulk Pack' | 'Trial Sample Kit';
  price: number; // Demo INR price
  originalPrice?: number;
  isPriceOnRequest?: boolean;
  minOrderQuantity: number;
  stock: number;
  height: string;
  ageInMonths: number;
  containerType: string;
  status: 'active' | 'draft' | 'archived';
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  plantingGuidelines: string[];
  soilClimateSuitability: string;
  images: string[];
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
  // Extended admin catalog fields
  sku?: string;
  scientificName?: string;
  rootCondition?: string;
  nurseryLocation?: string;
  waterRequirements?: string;
  spacingRecommendation?: string;
  bulkPricingTiers?: BulkPricingTier[];
  taxClassification?: string;
  plantCareInstructions?: string[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  publishedAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  cloneId: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface OrderTimelineEvent {
  status: string;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharges: number;
  taxAmount: number;
  totalAmount: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'on_delivery' | 'quotation_converted';
  paymentMethod: 'online_demo' | 'bank_transfer_demo' | 'pay_later' | 'quote_conversion';
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  dispatchDate?: string;
  estimatedDelivery?: string;
  notes?: string;
  assignedStaffName?: string;
  packingSlipNumber?: string;
  orderTimeline?: OrderTimelineEvent[];
  createdAt: string;
}

export interface QuotationItem {
  productId: string;
  productName: string;
  cloneId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  landAcreage?: number;
  location: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryCharges: number;
  transportCharges?: number;
  additionalCharges?: number;
  totalEstimated: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
  paymentTerms?: string;
  deliveryConditions?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  fullName: string;
  email: string;
  phone: string;
  category: 'Buy Teak Plants' | 'Bulk Plant Order' | 'Clone Information' | 'Plantation Development' | 'Technical Guidance' | 'General Enquiry';
  productInterest?: string;
  quantity?: number;
  acreage?: number;
  location: string;
  message: string;
  status: 'new' | 'in_progress' | 'contacted' | 'quotation_sent' | 'closed';
  leadStage?: 'New' | 'Contacted' | 'Qualified' | 'Quotation Sent' | 'Negotiation' | 'Won' | 'Lost';
  assignedTo?: string;
  source: 'Website Contact' | 'Clone Page' | 'Plantation Page' | 'Direct';
  createdAt: string;
  notes?: string;
  nextFollowUpDate?: string;
  companyOrFarmName?: string;
  state?: string;
  district?: string;
}

export interface PlantationService {
  id: string;
  title: string;
  category: 'Planning' | 'Establishment' | 'Irrigation & Infrastructure' | 'Maintenance & Care';
  description: string;
  benefits: string[];
  process: string[];
  image: string;
}

export interface PlantationProject {
  id: string;
  code: string;
  title: string;
  clientName: string;
  clientContact: string;
  location: string;
  district: string;
  state: string;
  acreage: number;
  saplingCount: number;
  plantedCount?: number;
  allocatedClones: string[]; // MBT-1, MBT-2, etc.
  stage: 'Consultation' | 'Site Survey' | 'Layout & Clearing' | 'Drip Setup' | 'Planting' | 'Hardening' | 'Ongoing Maintenance' | 'Active Monitoring';
  assignedManager: string;
  startDate: string;
  estimatedCompletion: string;
  survivalRate: number; // e.g. 96.5%
  averageHeightMeters: number;
  averageGirthCm: number;
  isProposal?: boolean; // indicates illustrative proposal vs managed live project
  budgetINR?: number;
  completionPercentage?: number;
  blocks: PlantationBlock[];
  maintenanceTasks: MaintenanceTask[];
  growthRecords: GrowthRecord[];
  notes?: string;
}

export interface PlantationBlock {
  id: string;
  name: string;
  acreage: number;
  cloneId: string;
  saplingsPlanted: number;
  plantingDate: string;
  dripLineStatus: 'Operational' | 'Scheduled Maintenance' | 'Under Installation';
}

export interface MaintenanceTask {
  id: string;
  projectId: string;
  title: string;
  category: 'Weed Control' | 'Pruning' | 'Drip Inspection' | 'Organic Fertilization' | 'Pest Scouting' | 'Mulching';
  assignedTo: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
}

export interface GrowthRecord {
  id: string;
  projectId: string;
  treeId?: string;
  inspectionDate: string;
  blockName: string;
  clone?: string;
  plantsSampled: number;
  survivalCount: number;
  avgHeightCm: number;
  avgGirthCm: number;
  circumferenceCm?: number;
  measurementHeightCm?: number;
  measurementUnits?: 'cm' | 'inches';
  treeAgeYears?: number;
  treeHealth?: 'Optimal' | 'Good' | 'Moderate' | 'Stressed';
  foliageCondition?: 'Excellent' | 'Good' | 'Moderate' | 'Stressed';
  inspector: string;
  notes: string;
  photographUrl?: string;
}

export interface SiteSurvey {
  id: string;
  enquiryId?: string;
  location: string;
  acreage: number;
  soilType: string;
  phValue: string;
  waterAvailability: string;
  existingVegetation: string;
  accessibility: string;
  surveyor: string;
  surveyDate: string;
  recommendations: string;
  status: 'Scheduled' | 'Completed' | 'Pending Review';
}

export interface InventoryBatch {
  id: string;
  batchCode: string;
  cloneId: string;
  productId?: string;
  productName: string;
  currentStock: number;
  initialQuantity?: number;
  reservedStock: number;
  rejectedQuantity?: number;
  nurseryLocation: string;
  propagationDate: string;
  hardeningStage: 'Primary Lab' | 'Greenhouse' | 'Shade Net' | 'Open Nursery Field Ready';
  qualityStatus?: 'Passed' | 'Under Inspection' | 'Quarantine' | 'Rejected';
  minThreshold: number;
  inspectionDate?: string;
  responsibleStaff?: string;
  batchPhotographs?: string[];
  notes?: string;
}

export interface StockMovement {
  id: string;
  batchId: string;
  cloneId: string;
  change: number; // positive or negative
  reason: 'Nursery Propagation' | 'Dispatch Order' | 'Mortality Adjustment' | 'Audit Reconciliation' | 'Stock Transfer' | 'Reservation Release';
  referenceId?: string;
  date: string;
  actor: string;
  destinationLocation?: string;
}

export type MediaCategory =
  | 'Company Events'
  | 'Tree Planting'
  | 'Nursery Operations'
  | 'Research & Technology'
  | 'Media Interactions'
  | 'Plantation Projects'
  | 'Tree Growth Measurements'
  | 'Products'
  | 'Team'
  | 'Personal';

export interface MediaAsset {
  id: string;
  title: string;
  category: MediaCategory;
  imageUrl: string;
  originalFileName: string;
  caption: string;
  altText: string;
  usageLocation: string;
  date: string;
  location?: string;
  tags: string[];
  relatedPage?: string;
  visibility: 'published' | 'unpublished';
  isFeatured?: boolean;
}

export interface ResearchArticle {
  id: string;
  title: string;
  authors: string;
  publishedIn: string;
  year: number;
  summary: string;
  keyFindings: string[];
  pdfDownloadUrl?: string;
  referenceUrl?: string;
  category: 'Biotechnology' | 'Silviculture' | 'Clonal Teak' | 'Plantation Economics';
}

export interface CMSContent {
  homepageHeroHeadline: string;
  homepageHeroSubheading: string;
  heroTagline: string;
  aboutVision: string;
  aboutMission: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  nurseryAddress: string;
  announcementBanner: string;
  technologyHeroHeading?: string;
  servicesHeroHeading?: string;
  projectsHeroHeading?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role?: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  previousValue?: string;
  updatedValue?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: 'Executive' | 'Biotechnology & Nursery' | 'Sales & CRM' | 'Silviculture & Plantation';
  role: Role;
  status: 'active' | 'inactive';
  assignedProjects: string[];
  assignedEnquiries: string[];
  lastActivity: string;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  method: 'Online Transfer (Demo)' | 'NEFT/RTGS (Demo)' | 'Demand Draft (Demo)' | 'Cash on Dispatch (Demo)';
  status: 'Completed' | 'Pending Verification' | 'Refunded';
  timestamp: string;
  receiptNumber: string;
}

export interface StoreSettings {
  businessName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  currency: string;
  taxRatePercent: number;
  taxExemptionNote: string;
  minOrderQuantityDefault: number;
  shippingRegions: string[];
  bulkDiscountPercentThreshold: number;
  bulkDiscountPercentage: number;
}
