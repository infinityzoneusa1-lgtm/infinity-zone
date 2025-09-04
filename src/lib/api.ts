// API Configuration
export const API_CONFIG = {
  BASE_URL: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"}/api`,
  ENDPOINTS: {
    // Products
    PRODUCTS: "/products",
    PRODUCT_BY_ID: (id: string) => `/products/${id}`,
    
    // Authentication
    AUTH_LOGIN: "/auth/login",
    AUTH_REGISTER: "/auth/register",
    ADMIN_LOGIN: "/admin/auth/login",
    
    // Applications
    VENDORS: "/vendors",
    BLOGGERS: "/bloggers",
    CONTENT_CREATORS: "/content-creators",
    INTERNSHIPS: "/internships",
    PROFESSIONALS: "/professionals",
    
    // Contact
    CONTACT: "/contact",
    
    // Orders
    ORDERS: "/orders",
    ORDER_BY_ID: (id: string) => `/orders/${id}`,
    ORDER_STATUS: (id: string) => `/orders/${id}/status`,
    
    // Admin
    ADMIN_CONTACTS: "/admin/contacts",
    ADMIN_APPLICATIONS: "/admin/applications",
  }
};

// Helper function for API calls
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw error;
  }
};

// Specific API functions
export const api = {
  // Products
  getProducts: () => apiCall(API_CONFIG.ENDPOINTS.PRODUCTS),
  getProductById: (id: string) => apiCall(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id)),
  
  // Applications
  submitVendorApplication: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.VENDORS, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  submitBloggerApplication: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.BLOGGERS, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  submitContentCreatorApplication: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.CONTENT_CREATORS, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  submitInternshipApplication: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.INTERNSHIPS, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  submitProfessionalContact: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.PROFESSIONALS, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  // Contact
  submitContact: (data: any) => 
    apiCall(API_CONFIG.ENDPOINTS.CONTACT, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  // Orders
  getOrders: () => apiCall(API_CONFIG.ENDPOINTS.ORDERS),
  updateOrderStatus: (id: string, status: string) => 
    apiCall(API_CONFIG.ENDPOINTS.ORDER_STATUS(id), {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
};

export default api;
