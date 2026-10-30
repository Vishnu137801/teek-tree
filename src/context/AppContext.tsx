import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Product,
  TeakClone,
  PlantationService,
  PlantationProject,
  Quotation,
  Enquiry,
  Order,
  InventoryBatch,
  StockMovement,
  ResearchArticle,
  MediaAsset,
  CartItem,
  CMSContent,
  AuditEvent,
  MaintenanceTask,
  GrowthRecord,
  StaffMember,
  PaymentTransaction,
  StoreSettings,
} from '../types';
import {
  INITIAL_CLONES,
  INITIAL_PRODUCTS,
  PLANTATION_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_ORDERS,
  INITIAL_QUOTATIONS,
  INITIAL_ENQUIRIES,
  INITIAL_INVENTORY_BATCHES,
  INITIAL_STOCK_MOVEMENTS,
  INITIAL_RESEARCH_ARTICLES,
  INITIAL_MEDIA_ASSETS,
  INITIAL_CMS,
  INITIAL_USERS,
  INITIAL_STAFF_MEMBERS,
  INITIAL_STORE_SETTINGS,
  INITIAL_PAYMENTS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  currentUser: User;
  switchRole: (role: Role) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  archiveProduct: (id: string) => void;
  restoreProduct: (id: string) => void;

  clones: TeakClone[];
  updateClone: (clone: TeakClone) => void;

  plantationServices: PlantationService[];

  projects: PlantationProject[];
  addProject: (project: Omit<PlantationProject, 'id' | 'code'>) => void;
  updateProject: (project: PlantationProject) => void;
  addProjectTask: (projectId: string, task: Omit<MaintenanceTask, 'id' | 'projectId'>) => void;
  addGrowthRecord: (projectId: string, record: Omit<GrowthRecord, 'id' | 'projectId'>) => void;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;

  quotations: Quotation[];
  createQuotation: (quotationData: Omit<Quotation, 'id' | 'quoteNumber' | 'createdAt'>) => Quotation;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;
  convertQuoteToOrder: (quoteId: string) => Order | null;

  enquiries: Enquiry[];
  createEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'enquiryNumber' | 'createdAt'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;
  convertEnquiryToQuote: (enquiryId: string) => Quotation | null;
  scheduleFollowUp: (enquiryId: string, date: string, note?: string) => void;

  inventoryBatches: InventoryBatch[];
  createBatch: (batchData: Omit<InventoryBatch, 'id' | 'batchCode'>) => InventoryBatch;
  updateBatch: (batch: InventoryBatch) => void;
  updateBatchStock: (batchId: string, newStock: number, reason: StockMovement['reason']) => void;
  recordStockLoss: (batchId: string, lossQty: number, reason: string) => void;
  reserveStock: (batchId: string, qty: number) => boolean;
  releaseStock: (batchId: string, qty: number) => void;
  transferBatch: (batchId: string, destinationLocation: string, qty: number) => void;
  stockMovements: StockMovement[];

  researchArticles: ResearchArticle[];

  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id'>) => MediaAsset;
  updateMediaAsset: (asset: MediaAsset) => void;
  deleteMediaAsset: (id: string) => void;

  staffMembers: StaffMember[];
  addStaff: (staff: Omit<StaffMember, 'id'>) => StaffMember;
  updateStaff: (staff: StaffMember) => void;
  deactivateStaff: (id: string) => void;

  payments: PaymentTransaction[];
  recordPayment: (payment: Omit<PaymentTransaction, 'id' | 'timestamp'>) => PaymentTransaction;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // CMS
  cms: CMSContent;
  updateCMS: (newCms: Partial<CMSContent>) => void;

  // Audit Logs
  auditLogs: AuditEvent[];

  // Toast System
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Reset
  resetAllData: () => void;
}

const STORAGE_KEYS = {
  USER_ROLE: 'mb_current_role',
  PRODUCTS: 'mb_products',
  CLONES: 'mb_clones',
  PROJECTS: 'mb_projects',
  ORDERS: 'mb_orders',
  QUOTATIONS: 'mb_quotations',
  ENQUIRIES: 'mb_enquiries',
  INVENTORY: 'mb_inventory',
  STOCK_MOVEMENTS: 'mb_stock_movements',
  CART: 'mb_cart',
  WISHLIST: 'mb_wishlist',
  CMS: 'mb_cms',
  AUDIT: 'mb_audit',
  MEDIA: 'mb_media_assets',
  STAFF: 'mb_staff_members',
  PAYMENTS: 'mb_payments',
  SETTINGS: 'mb_settings',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User & Role
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    return (localStorage.getItem(STORAGE_KEYS.USER_ROLE) as Role) || 'customer';
  });

  const currentUser = INITIAL_USERS.find(u => u.role === currentRole) || INITIAL_USERS[0];

  const switchRole = (role: Role) => {
    setCurrentRole(role);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    addToast('info', `Switched Role to ${role.replace('_', ' ').toUpperCase()}`, 'Navigation and access updated.');
  };

  // State with localStorage backing
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [clones, setClones] = useState<TeakClone[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLONES);
    return saved ? JSON.parse(saved) : INITIAL_CLONES;
  });

  const [plantationServices] = useState<PlantationService[]>(PLANTATION_SERVICES);

  const [projects, setProjects] = useState<PlantationProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [inventoryBatches, setInventoryBatches] = useState<InventoryBatch[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY_BATCHES;
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STOCK_MOVEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_STOCK_MOVEMENTS;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
  });

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STAFF);
    return saved ? JSON.parse(saved) : INITIAL_STAFF_MEMBERS;
  });

  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : ['prod-mbt1-standard'];
  });

  const [cms, setCms] = useState<CMSContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CMS);
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return saved ? JSON.parse(saved) : [
      {
        id: 'audit-1',
        timestamp: new Date().toISOString(),
        user: 'Dr. Balakrishna',
        role: 'super_admin',
        action: 'System Bootstrapped',
        entity: 'System Core',
        entityId: 'ROOT',
        details: 'Initial clonal inventory, projects, staff roster, and media assets loaded.',
      },
    ];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helpers
  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (action: string, entity: string, entityId: string, details: string, prevVal?: string, newVal?: string) => {
    const log: AuditEvent = {
      id: 'audit-' + Date.now() + '-' + Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString(),
      user: currentUser.name,
      role: currentUser.role,
      action,
      entity,
      entityId,
      details,
      previousValue: prevVal,
      updatedValue: newVal,
    };
    setAuditLogs(prev => {
      const next = [log, ...prev].slice(0, 100);
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(next));
      return next;
    });
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLONES, JSON.stringify(clones));
  }, [clones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventoryBatches));
  }, [inventoryBatches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(stockMovements));
  }, [stockMovements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffMembers));
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(cms));
  }, [cms]);

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const id = 'prod-' + Date.now();
    const newProduct: Product = {
      ...productData,
      id,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('Created Product', 'Product', id, `Added ${newProduct.name} (SKU: ${newProduct.sku || 'N/A'})`);
    addToast('success', 'Product Created', `${newProduct.name} is now in the catalog.`);
  };

  const updateProduct = (product: Product) => {
    const updated = { ...product, updatedAt: new Date().toISOString() };
    setProducts(prev => prev.map(p => (p.id === product.id ? updated : p)));
    addAuditLog('Updated Product', 'Product', product.id, `Modified specifications for ${product.name}`);
    addToast('success', 'Product Updated', `Saved changes for ${product.name}`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    addAuditLog('Deleted Product', 'Product', id, `Deleted ${target?.name || id}`);
    addToast('info', 'Product Removed', 'The item has been deleted from catalog.');
  };

  const archiveProduct = (id: string) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, status: 'archived' } : p)));
    addAuditLog('Archived Product', 'Product', id, `Archived catalog item`);
    addToast('info', 'Product Archived');
  };

  const restoreProduct = (id: string) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, status: 'active' } : p)));
    addAuditLog('Restored Product', 'Product', id, `Restored catalog item to active`);
    addToast('success', 'Product Restored');
  };

  const updateClone = (clone: TeakClone) => {
    setClones(prev => prev.map(c => (c.id === clone.id ? clone : c)));
    addAuditLog('Updated Clone', 'TeakClone', clone.id, `Updated traits for ${clone.name}`);
    addToast('success', 'Clone Details Updated', `${clone.id} - ${clone.name} data saved.`);
  };

  // Projects
  const addProject = (projectData: Omit<PlantationProject, 'id' | 'code'>) => {
    const id = 'proj-' + Date.now();
    const code = 'NC-PRJ-' + Math.floor(100 + Math.random() * 900);
    const newProject: PlantationProject = { ...projectData, id, code };
    setProjects(prev => [newProject, ...prev]);
    addAuditLog('Created Project', 'PlantationProject', id, `Initiated ${newProject.title}`);
    addToast('success', 'Plantation Project Created', `${newProject.title} added to operations.`);
  };

  const updateProject = (project: PlantationProject) => {
    setProjects(prev => prev.map(p => (p.id === project.id ? project : p)));
    addAuditLog('Updated Project', 'PlantationProject', project.id, `Updated milestone/details for ${project.title}`);
    addToast('success', 'Project Updated', `${project.code} status saved.`);
  };

  const addProjectTask = (projectId: string, taskData: Omit<MaintenanceTask, 'id' | 'projectId'>) => {
    const taskId = 'task-' + Date.now();
    const newTask: MaintenanceTask = { ...taskData, id: taskId, projectId };
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return { ...p, maintenanceTasks: [newTask, ...p.maintenanceTasks] };
        }
        return p;
      })
    );
    addAuditLog('Added Task', 'MaintenanceTask', taskId, `Scheduled ${taskData.title}`);
    addToast('success', 'Task Scheduled', taskData.title);
  };

  const addGrowthRecord = (projectId: string, recordData: Omit<GrowthRecord, 'id' | 'projectId'>) => {
    const recordId = 'growth-' + Date.now();
    const newRecord: GrowthRecord = { ...recordData, id: recordId, projectId };
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            growthRecords: [newRecord, ...p.growthRecords],
            averageHeightMeters: Number((recordData.avgHeightCm / 100).toFixed(2)),
            averageGirthCm: recordData.avgGirthCm,
          };
        }
        return p;
      })
    );
    addAuditLog('Logged Growth Audit', 'GrowthRecord', recordId, `Biometric log: ${recordData.avgGirthCm}cm girth (${recordData.blockName})`);
    addToast('success', 'Growth Record Logged', 'Plantation biometrics and photograph updated.');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const id = 'ord-' + Date.now();
    const orderNumber = `MB-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      packingSlipNumber: `PK-2026-${Math.floor(2000 + Math.random() * 8000)}`,
      orderTimeline: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          note: 'Order successfully submitted by client via portal.',
        },
      ],
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock from matching products and batches
    orderData.items.forEach(item => {
      setProducts(prev =>
        prev.map(p => (p.id === item.productId ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p))
      );
      const batch = inventoryBatches.find(b => b.cloneId === item.cloneId);
      if (batch) {
        setInventoryBatches(prev =>
          prev.map(b => (b.id === batch.id ? { ...b, currentStock: Math.max(0, b.currentStock - item.quantity) } : b))
        );
        const mov: StockMovement = {
          id: 'mov-' + Math.random().toString(36).substring(2, 9),
          batchId: batch.id,
          cloneId: item.cloneId,
          change: -item.quantity,
          reason: 'Dispatch Order',
          referenceId: orderNumber,
          date: new Date().toISOString().split('T')[0],
          actor: currentUser.name,
        };
        setStockMovements(prev => [mov, ...prev]);
      }
    });

    clearCart();
    addAuditLog('Placed Order', 'Order', id, `Order ${orderNumber} for ₹${newOrder.totalAmount}`);
    addToast('success', 'Order Confirmed!', `Your order #${orderNumber} has been recorded.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const updatedTimeline = [
            ...(o.orderTimeline || []),
            {
              status,
              timestamp: new Date().toISOString(),
              note: `Status updated to ${status.toUpperCase()} by ${currentUser.name}`,
            },
          ];
          return {
            ...o,
            status,
            trackingNumber: trackingNumber || o.trackingNumber,
            dispatchDate: status === 'dispatched' ? new Date().toISOString().split('T')[0] : o.dispatchDate,
            orderTimeline: updatedTimeline,
          };
        }
        return o;
      })
    );
    addAuditLog('Updated Order Status', 'Order', orderId, `Status transitioned to ${status}`);
    addToast('info', 'Order Status Updated', `Order is now marked as ${status.toUpperCase()}`);
  };

  const cancelOrder = (orderId: string, reason = 'Client request or stock constraint') => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;

    // Restore stock to products
    target.items.forEach(item => {
      setProducts(prev =>
        prev.map(p => (p.id === item.productId ? { ...p, stock: p.stock + item.quantity } : p))
      );
      const batch = inventoryBatches.find(b => b.cloneId === item.cloneId);
      if (batch) {
        setInventoryBatches(prev =>
          prev.map(b => (b.id === batch.id ? { ...b, currentStock: b.currentStock + item.quantity } : b))
        );
        const mov: StockMovement = {
          id: 'mov-' + Math.random().toString(36).substring(2, 9),
          batchId: batch.id,
          cloneId: item.cloneId,
          change: item.quantity,
          reason: 'Reservation Release',
          referenceId: target.orderNumber,
          date: new Date().toISOString().split('T')[0],
          actor: currentUser.name,
        };
        setStockMovements(prev => [mov, ...prev]);
      }
    });

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled', notes: `${o.notes || ''} [Cancelled: ${reason}]` } : o))
    );
    addAuditLog('Cancelled Order', 'Order', orderId, `Order cancelled: ${reason}. Stock returned to inventory.`);
    addToast('warning', 'Order Cancelled', `Stock restored to available inventory.`);
  };

  // Quotations
  const createQuotation = (quotationData: Omit<Quotation, 'id' | 'quoteNumber' | 'createdAt'>): Quotation => {
    const id = 'quot-' + Date.now();
    const quoteNumber = `MB-QT-2026-${Math.floor(200 + Math.random() * 800)}`;
    const newQuote: Quotation = {
      ...quotationData,
      id,
      quoteNumber,
      createdAt: new Date().toISOString(),
    };
    setQuotations(prev => [newQuote, ...prev]);
    addAuditLog('Created Quotation', 'Quotation', id, `Quotation #${quoteNumber} generated for ${newQuote.customerName}`);
    addToast('success', 'Quotation Prepared', `Quotation #${quoteNumber} saved.`);
    return newQuote;
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
    addAuditLog('Updated Quotation', 'Quotation', id, `Status changed to ${status}`);
    addToast('info', 'Quotation Updated', `Quote #${id} marked as ${status}`);
  };

  const convertQuoteToOrder = (quoteId: string): Order | null => {
    const quote = quotations.find(q => q.id === quoteId);
    if (!quote) return null;

    const newOrder = createOrder({
      customerId: quote.customerId || 'cust-demo-1',
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      items: quote.items.map(qi => ({
        productId: qi.productId,
        productName: qi.productName,
        cloneId: qi.cloneId,
        unitPrice: qi.unitPrice,
        quantity: qi.quantity,
        totalPrice: qi.total,
        image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_20.33.15_40fc942a.jpeg',
      })),
      subtotal: quote.subtotal,
      deliveryCharges: quote.deliveryCharges || quote.transportCharges || 0,
      taxAmount: quote.tax,
      totalAmount: quote.totalEstimated,
      status: 'confirmed',
      paymentStatus: 'quotation_converted',
      paymentMethod: 'quote_conversion',
      shippingAddress: {
        id: 'addr-quote-' + Date.now(),
        type: 'plantation',
        fullName: quote.customerName,
        street: 'Plantation Delivery Site',
        city: quote.location,
        district: 'Agro Zone',
        state: 'Telangana',
        pincode: '500001',
        phone: quote.customerPhone,
      },
      notes: `Converted from Quotation #${quote.quoteNumber}`,
    });

    updateQuotationStatus(quoteId, 'accepted');
    addAuditLog('Converted Quote to Order', 'Quotation', quoteId, `Quotation converted to Order ${newOrder.orderNumber}`);
    addToast('success', 'Quote Converted to Order', `Order #${newOrder.orderNumber} created!`);
    return newOrder;
  };

  // Enquiries
  const createEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'enquiryNumber' | 'createdAt'>): Enquiry => {
    const id = 'enq-' + Date.now();
    const enquiryNumber = `ENQ-2026-${Math.floor(300 + Math.random() * 700)}`;
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id,
      enquiryNumber,
      createdAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    addAuditLog('Submitted Enquiry', 'Enquiry', id, `Enquiry #${enquiryNumber} from ${newEnquiry.fullName}`);
    addToast('success', 'Enquiry Received', `Thank you! Ref #${enquiryNumber}. Our agronomists will contact you.`);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], notes?: string) => {
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status, notes: notes || e.notes } : e)));
    addAuditLog('Updated Enquiry', 'Enquiry', id, `Marked enquiry as ${status}`);
    addToast('info', 'Enquiry Updated', `Status changed to ${status}`);
  };

  const convertEnquiryToQuote = (enquiryId: string): Quotation | null => {
    const enq = enquiries.find(e => e.id === enquiryId);
    if (!enq) return null;

    const qty = enq.quantity || (enq.acreage ? enq.acreage * 350 : 350);
    const unitPrice = 120;
    const subtotal = qty * unitPrice;
    const discount = qty >= 1000 ? subtotal * 0.08 : 0;
    const totalEstimated = subtotal - discount;

    const quote = createQuotation({
      customerId: 'cust-enq-' + Date.now(),
      customerName: enq.fullName,
      customerEmail: enq.email,
      customerPhone: enq.phone,
      landAcreage: enq.acreage || 1,
      location: enq.location,
      items: [
        {
          productId: 'prod-mbt1-standard',
          productName: enq.productInterest || 'MBT-1 Clonal Teak Sapling',
          cloneId: 'MBT-1',
          quantity: qty,
          unitPrice,
          total: subtotal,
        },
      ],
      subtotal,
      discount,
      tax: 0,
      deliveryCharges: 2500,
      totalEstimated: totalEstimated + 2500,
      validUntil: '2026-12-31',
      status: 'draft',
      notes: `Generated from Enquiry #${enq.enquiryNumber}`,
    });

    updateEnquiryStatus(enquiryId, 'quotation_sent');
    return quote;
  };

  const scheduleFollowUp = (enquiryId: string, date: string, note?: string) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === enquiryId ? { ...e, nextFollowUpDate: date, notes: `${e.notes || ''} [Follow-up: ${date} ${note || ''}]` } : e))
    );
    addAuditLog('Scheduled Follow-up', 'Enquiry', enquiryId, `Follow-up set for ${date}`);
    addToast('success', 'Follow-up Scheduled', `Date: ${date}`);
  };

  // Inventory & Batch Actions
  const createBatch = (batchData: Omit<InventoryBatch, 'id' | 'batchCode'>): InventoryBatch => {
    const id = 'batch-' + Date.now();
    const batchCode = `BATCH-${batchData.cloneId}-${Math.floor(100 + Math.random() * 900)}`;
    const newBatch: InventoryBatch = { ...batchData, id, batchCode };
    setInventoryBatches(prev => [newBatch, ...prev]);

    // Also increase product stock
    setProducts(prev =>
      prev.map(p => (p.cloneId === batchData.cloneId ? { ...p, stock: p.stock + batchData.currentStock } : p))
    );

    const mov: StockMovement = {
      id: 'mov-' + Math.random().toString(36).substring(2, 9),
      batchId: id,
      cloneId: batchData.cloneId,
      change: batchData.currentStock,
      reason: 'Nursery Propagation',
      referenceId: batchCode,
      date: new Date().toISOString().split('T')[0],
      actor: currentUser.name,
    };
    setStockMovements(prev => [mov, ...prev]);

    addAuditLog('Created Batch', 'InventoryBatch', id, `Registered batch ${batchCode} with ${batchData.currentStock} saplings`);
    addToast('success', 'Nursery Batch Created', `${batchCode} entered into system.`);
    return newBatch;
  };

  const updateBatch = (batch: InventoryBatch) => {
    setInventoryBatches(prev => prev.map(b => (b.id === batch.id ? batch : b)));
    addAuditLog('Updated Batch', 'InventoryBatch', batch.id, `Updated details for ${batch.batchCode}`);
    addToast('success', 'Batch Updated', `${batch.batchCode} saved.`);
  };

  const updateBatchStock = (batchId: string, newStock: number, reason: StockMovement['reason']) => {
    const batch = inventoryBatches.find(b => b.id === batchId);
    if (!batch) return;
    const diff = newStock - batch.currentStock;
    setInventoryBatches(prev => prev.map(b => (b.id === batchId ? { ...b, currentStock: newStock } : b)));

    // Sync to product
    setProducts(prev =>
      prev.map(p => (p.cloneId === batch.cloneId ? { ...p, stock: Math.max(0, p.stock + diff) } : p))
    );

    const mov: StockMovement = {
      id: 'mov-' + Math.random().toString(36).substring(2, 9),
      batchId,
      cloneId: batch.cloneId,
      change: diff,
      reason,
      date: new Date().toISOString().split('T')[0],
      actor: currentUser.name,
    };
    setStockMovements(prev => [mov, ...prev]);
    addAuditLog('Adjusted Stock', 'InventoryBatch', batchId, `Stock adjusted by ${diff > 0 ? '+' : ''}${diff} units (${reason})`);
    addToast('success', 'Stock Adjusted', `Batch ${batch.batchCode} updated.`);
  };

  const recordStockLoss = (batchId: string, lossQty: number, reason: string) => {
    const batch = inventoryBatches.find(b => b.id === batchId);
    if (!batch) return;
    const safeLoss = Math.min(lossQty, batch.currentStock);
    const newStock = batch.currentStock - safeLoss;
    setInventoryBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, currentStock: newStock, rejectedQuantity: (b.rejectedQuantity || 0) + safeLoss } : b))
    );

    // Sync to product stock
    setProducts(prev =>
      prev.map(p => (p.cloneId === batch.cloneId ? { ...p, stock: Math.max(0, p.stock - safeLoss) } : p))
    );

    const mov: StockMovement = {
      id: 'mov-' + Math.random().toString(36).substring(2, 9),
      batchId,
      cloneId: batch.cloneId,
      change: -safeLoss,
      reason: 'Mortality Adjustment',
      referenceId: reason,
      date: new Date().toISOString().split('T')[0],
      actor: currentUser.name,
    };
    setStockMovements(prev => [mov, ...prev]);
    addAuditLog('Recorded Stock Loss', 'InventoryBatch', batchId, `Deducted ${safeLoss} units: ${reason}`);
    addToast('warning', 'Loss Recorded', `${safeLoss} saplings written off (${reason})`);
  };

  const reserveStock = (batchId: string, qty: number): boolean => {
    const batch = inventoryBatches.find(b => b.id === batchId);
    if (!batch || batch.currentStock - batch.reservedStock < qty) {
      addToast('error', 'Reservation Failed', 'Not enough unreserved stock available.');
      return false;
    }
    setInventoryBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, reservedStock: b.reservedStock + qty } : b))
    );
    addAuditLog('Reserved Stock', 'InventoryBatch', batchId, `Reserved ${qty} units for pending order/dispatch`);
    addToast('success', 'Stock Reserved', `${qty} units locked for order.`);
    return true;
  };

  const releaseStock = (batchId: string, qty: number) => {
    setInventoryBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, reservedStock: Math.max(0, b.reservedStock - qty) } : b))
    );
    addAuditLog('Released Stock', 'InventoryBatch', batchId, `Released ${qty} units back to unreserved inventory`);
    addToast('info', 'Stock Released', `${qty} units unlocked.`);
  };

  const transferBatch = (batchId: string, destinationLocation: string, qty: number) => {
    const batch = inventoryBatches.find(b => b.id === batchId);
    if (!batch || batch.currentStock < qty) {
      addToast('error', 'Transfer Failed', 'Insufficient stock in batch.');
      return;
    }
    setInventoryBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, currentStock: b.currentStock - qty } : b))
    );

    // Create or add to destination batch
    const newBatchId = 'batch-' + Date.now();
    const destBatch: InventoryBatch = {
      id: newBatchId,
      batchCode: `TRF-${batch.batchCode}-${Math.floor(10 + Math.random() * 90)}`,
      cloneId: batch.cloneId,
      productName: batch.productName,
      currentStock: qty,
      reservedStock: 0,
      nurseryLocation: destinationLocation,
      propagationDate: batch.propagationDate,
      hardeningStage: batch.hardeningStage,
      qualityStatus: 'Passed',
      minThreshold: 500,
    };
    setInventoryBatches(prev => [destBatch, ...prev]);

    const mov: StockMovement = {
      id: 'mov-' + Math.random().toString(36).substring(2, 9),
      batchId,
      cloneId: batch.cloneId,
      change: -qty,
      reason: 'Stock Transfer',
      referenceId: destinationLocation,
      date: new Date().toISOString().split('T')[0],
      actor: currentUser.name,
      destinationLocation,
    };
    setStockMovements(prev => [mov, ...prev]);
    addAuditLog('Transferred Stock', 'InventoryBatch', batchId, `Transferred ${qty} units to ${destinationLocation}`);
    addToast('success', 'Transfer Completed', `${qty} units moved to ${destinationLocation}`);
  };

  // Media Asset Actions
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id'>): MediaAsset => {
    const id = 'med-' + Date.now();
    const newAsset: MediaAsset = { ...assetData, id };
    setMediaAssets(prev => [newAsset, ...prev]);
    addAuditLog('Uploaded Media', 'MediaAsset', id, `Added image ${newAsset.title} (${newAsset.category})`);
    addToast('success', 'Image Added to Media Library', newAsset.title);
    return newAsset;
  };

  const updateMediaAsset = (asset: MediaAsset) => {
    setMediaAssets(prev => prev.map(m => (m.id === asset.id ? asset : m)));
    addAuditLog('Updated Media', 'MediaAsset', asset.id, `Updated metadata for ${asset.title}`);
    addToast('success', 'Media Updated', asset.title);
  };

  const deleteMediaAsset = (id: string) => {
    const target = mediaAssets.find(m => m.id === id);
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    addAuditLog('Deleted Media', 'MediaAsset', id, `Removed image ${target?.title || id}`);
    addToast('info', 'Image Removed from Media Library');
  };

  // Staff Actions
  const addStaff = (staffData: Omit<StaffMember, 'id'>): StaffMember => {
    const id = 'staff-' + Date.now();
    const newStaff: StaffMember = { ...staffData, id };
    setStaffMembers(prev => [...prev, newStaff]);
    addAuditLog('Added Staff', 'StaffMember', id, `Added staff member ${newStaff.name} (${newStaff.role})`);
    addToast('success', 'Staff Member Added', newStaff.name);
    return newStaff;
  };

  const updateStaff = (staff: StaffMember) => {
    setStaffMembers(prev => prev.map(s => (s.id === staff.id ? staff : s)));
    addAuditLog('Updated Staff', 'StaffMember', staff.id, `Updated profile for ${staff.name}`);
    addToast('success', 'Staff Profile Saved');
  };

  const deactivateStaff = (id: string) => {
    setStaffMembers(prev => prev.map(s => (s.id === id ? { ...s, status: 'inactive' } : s)));
    addAuditLog('Deactivated Staff', 'StaffMember', id, 'Staff account deactivated');
    addToast('info', 'Staff Account Deactivated');
  };

  // Payment Actions
  const recordPayment = (paymentData: Omit<PaymentTransaction, 'id' | 'timestamp'>): PaymentTransaction => {
    const id = 'pay-' + Date.now();
    const newPayment: PaymentTransaction = {
      ...paymentData,
      id,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setPayments(prev => [newPayment, ...prev]);
    addAuditLog('Recorded Payment', 'PaymentTransaction', id, `Payment ${newPayment.transactionRef} for ₹${newPayment.amount}`);
    addToast('success', 'Payment Recorded', `Ref: ${newPayment.transactionRef}`);
    return newPayment;
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addAuditLog('Updated Store Settings', 'StoreSettings', 'CORE_SETTINGS', 'Modified currency, tax or bulk policies');
    addToast('success', 'Settings Saved', 'System configurations updated.');
  };

  // Cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId: product.id, product, quantity }];
    });
    addToast('success', 'Added to Cart', `${quantity}x ${product.name}`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    addToast('info', 'Item Removed', 'The plant was removed from your cart.');
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('info', 'Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        addToast('success', 'Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  // CMS
  const updateCMS = (newCms: Partial<CMSContent>) => {
    setCms(prev => {
      const updated = { ...prev, ...newCms };
      return updated;
    });
    addAuditLog('Updated CMS', 'CMSContent', 'SITE_CONFIG', 'Edited public website content via Admin CMS');
    addToast('success', 'Website Content Updated', 'Live changes reflected on public pages.');
  };

  // Reset
  const resetAllData = () => {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    setProducts(INITIAL_PRODUCTS);
    setClones(INITIAL_CLONES);
    setProjects(INITIAL_PROJECTS);
    setOrders(INITIAL_ORDERS);
    setQuotations(INITIAL_QUOTATIONS);
    setEnquiries(INITIAL_ENQUIRIES);
    setInventoryBatches(INITIAL_INVENTORY_BATCHES);
    setStockMovements(INITIAL_STOCK_MOVEMENTS);
    setMediaAssets(INITIAL_MEDIA_ASSETS);
    setStaffMembers(INITIAL_STAFF_MEMBERS);
    setPayments(INITIAL_PAYMENTS);
    setSettings(INITIAL_STORE_SETTINGS);
    setCart([]);
    setWishlist(['prod-mbt1-standard']);
    setCms(INITIAL_CMS);
    setCurrentRole('customer');
    addToast('warning', 'Demo Data Reset', 'All records have been reset to factory defaults.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        archiveProduct,
        restoreProduct,
        clones,
        updateClone,
        plantationServices,
        projects,
        addProject,
        updateProject,
        addProjectTask,
        addGrowthRecord,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        quotations,
        createQuotation,
        updateQuotationStatus,
        convertQuoteToOrder,
        enquiries,
        createEnquiry,
        updateEnquiryStatus,
        convertEnquiryToQuote,
        scheduleFollowUp,
        inventoryBatches,
        createBatch,
        updateBatch,
        updateBatchStock,
        recordStockLoss,
        reserveStock,
        releaseStock,
        transferBatch,
        stockMovements,
        researchArticles: INITIAL_RESEARCH_ARTICLES,
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
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        cms,
        updateCMS,
        auditLogs,
        toasts,
        addToast,
        removeToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
