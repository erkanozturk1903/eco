import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ============ Settings API ============
export const settingsApi = {
  getAll: () => api.get('/settings/'),
  getGeneral: () => api.get('/settings/general'),
  getContact: () => api.get('/settings/contact'),
  getSocial: () => api.get('/settings/social'),
  updateGeneral: (data: Record<string, string>) => api.put('/settings/general', data),
  updateContact: (data: Record<string, string>) => api.put('/settings/contact', data),
  updateSocial: (data: Record<string, string>) => api.put('/settings/social', data),
};

// ============ Upload API ============
export const uploadApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteImage: (filename: string) => api.delete(`/upload/image/${filename}`),
};

// Base URL for uploaded images
export const getUploadUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8002';
    return `${baseUrl}${path}`;
  }
  return path;
};

// ============ Content API ============
export const contentApi = {
  // Homepage
  getHomepage: () => api.get('/content/homepage'),

  // Hero Slides
  getHeroSlides: (activeOnly = false) => api.get(`/content/hero/slides?active_only=${activeOnly}`),
  createHeroSlide: (data: any) => api.post('/content/hero/slides', data),
  updateHeroSlide: (id: number, data: any) => api.put(`/content/hero/slides/${id}`, data),
  deleteHeroSlide: (id: number) => api.delete(`/content/hero/slides/${id}`),
  reorderHeroSlides: (slideIds: number[]) => api.put('/content/hero/slides/reorder', { slide_ids: slideIds }),

  // Hero Content
  getHeroText: () => api.get('/content/hero/text'),
  updateHeroText: (data: { title?: string; subtitle?: string }) => api.put('/content/hero/text', data),

  // Stats
  getStats: (activeOnly = false) => api.get(`/content/stats?active_only=${activeOnly}`),
  createStat: (data: any) => api.post('/content/stats', data),
  updateStat: (id: number, data: any) => api.put(`/content/stats/${id}`, data),
  deleteStat: (id: number) => api.delete(`/content/stats/${id}`),

  // Why Us
  getWhyUs: (activeOnly = false) => api.get(`/content/why-us?active_only=${activeOnly}`),
  createWhyUs: (data: any) => api.post('/content/why-us', data),
  updateWhyUs: (id: number, data: any) => api.put(`/content/why-us/${id}`, data),
  deleteWhyUs: (id: number) => api.delete(`/content/why-us/${id}`),
};

// ============ About API ============
export const aboutApi = {
  // Page
  getPage: () => api.get('/about/page'),

  // Content
  getContent: () => api.get('/about/content'),
  getContentBySection: (section: string) => api.get(`/about/content/${section}`),
  createContent: (data: any) => api.post('/about/content', data),
  updateContent: (id: number, data: any) => api.put(`/about/content/${id}`, data),
  deleteContent: (id: number) => api.delete(`/about/content/${id}`),

  // Team
  getTeam: (activeOnly = false) => api.get(`/about/team?active_only=${activeOnly}`),
  getTeamMember: (id: number) => api.get(`/about/team/${id}`),
  createTeamMember: (data: any) => api.post('/about/team', data),
  updateTeamMember: (id: number, data: any) => api.put(`/about/team/${id}`, data),
  deleteTeamMember: (id: number) => api.delete(`/about/team/${id}`),

  // Certifications
  getCertifications: (activeOnly = false) => api.get(`/about/certifications?active_only=${activeOnly}`),
  createCertification: (data: any) => api.post('/about/certifications', data),
  updateCertification: (id: number, data: any) => api.put(`/about/certifications/${id}`, data),
  deleteCertification: (id: number) => api.delete(`/about/certifications/${id}`),

  // Milestones
  getMilestones: (activeOnly = false) => api.get(`/about/milestones?active_only=${activeOnly}`),
  createMilestone: (data: any) => api.post('/about/milestones', data),
  updateMilestone: (id: number, data: any) => api.put(`/about/milestones/${id}`, data),
  deleteMilestone: (id: number) => api.delete(`/about/milestones/${id}`),
};

// ============ Services API ============
export const servicesApi = {
  // Page
  getPage: () => api.get('/services/page'),

  // Services
  getAll: (activeOnly = false) => api.get(`/services/?active_only=${activeOnly}`),
  getByIdOrSlug: (idOrSlug: string | number) => api.get(`/services/${idOrSlug}`),
  create: (data: any) => api.post('/services/', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),

  // Service Items
  getItems: (serviceId: number) => api.get(`/services/${serviceId}/items`),
  createItem: (serviceId: number, data: any) => api.post(`/services/${serviceId}/items`, data),
  updateItems: (serviceId: number, items: any[]) => api.put(`/services/${serviceId}/items`, items),
  updateItem: (itemId: number, data: any) => api.put(`/services/items/${itemId}`, data),
  deleteItem: (itemId: number) => api.delete(`/services/items/${itemId}`),

  // Process Steps
  getProcessSteps: (activeOnly = false) => api.get(`/services/process/steps?active_only=${activeOnly}`),
  createProcessStep: (data: any) => api.post('/services/process/steps', data),
  updateProcessStep: (id: number, data: any) => api.put(`/services/process/steps/${id}`, data),
  deleteProcessStep: (id: number) => api.delete(`/services/process/steps/${id}`),
};

// ============ Contact API ============
export const contactApi = {
  // Public
  submit: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
  }) => api.post('/contact/', data),

  // Admin
  getSubmissions: (params?: {
    is_archived?: boolean;
    is_read?: boolean;
    is_starred?: boolean;
    search?: string;
    page?: number;
    per_page?: number;
  }) => api.get('/contact/submissions', { params }),

  getStats: () => api.get('/contact/submissions/stats'),
  getUnreadCount: () => api.get('/contact/submissions/unread-count'),
  getSubmission: (id: number) => api.get(`/contact/submissions/${id}`),
  updateSubmission: (id: number, data: {
    is_read?: boolean;
    is_archived?: boolean;
    is_starred?: boolean;
    notes?: string;
  }) => api.put(`/contact/submissions/${id}`, data),
  deleteSubmission: (id: number) => api.delete(`/contact/submissions/${id}`),
  markAsRead: (id: number) => api.post(`/contact/submissions/${id}/read`),
  bulkMarkAsRead: (ids: number[]) => api.post('/contact/submissions/bulk-read', ids),
  bulkArchive: (ids: number[]) => api.post('/contact/submissions/bulk-archive', ids),
};

// ============ Dashboard API ============
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentMessages: (limit = 5) => api.get(`/dashboard/recent-messages?limit=${limit}`),
  getRecentArticles: (limit = 5) => api.get(`/dashboard/recent-articles?limit=${limit}`),
  getActivity: (limit = 10) => api.get(`/dashboard/activity?limit=${limit}`),
  getWeeklyStats: () => api.get('/dashboard/weekly-stats'),
};

// ============ Articles API ============
export const articlesApi = {
  // Page
  getPage: (categoryId?: number, page = 1, perPage = 10) => {
    let url = `/articles/page?page=${page}&per_page=${perPage}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    return api.get(url);
  },

  // Articles
  getAll: (publishedOnly = true, categoryId?: number, page = 1, perPage = 10) => {
    let url = `/articles/?published_only=${publishedOnly}&page=${page}&per_page=${perPage}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    return api.get(url);
  },
  getAdmin: (categoryId?: number, page = 1, perPage = 20) => {
    let url = `/articles/admin?page=${page}&per_page=${perPage}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    return api.get(url);
  },
  getFeatured: (limit = 3) => api.get(`/articles/featured?limit=${limit}`),
  getByIdOrSlug: (idOrSlug: string | number) => api.get(`/articles/${idOrSlug}`),
  getRelated: (articleId: number, limit = 3) => api.get(`/articles/${articleId}/related?limit=${limit}`),
  incrementViews: (articleId: number) => api.post(`/articles/${articleId}/view`),
  create: (data: any) => api.post('/articles/', data),
  update: (id: number, data: any) => api.put(`/articles/${id}`, data),
  delete: (id: number) => api.delete(`/articles/${id}`),

  // Categories
  getCategories: () => api.get('/articles/categories'),
  getCategoryByIdOrSlug: (idOrSlug: string | number) => api.get(`/articles/categories/${idOrSlug}`),
  createCategory: (data: any) => api.post('/articles/categories', data),
  updateCategory: (id: number, data: any) => api.put(`/articles/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/articles/categories/${id}`),
};

export default api;
