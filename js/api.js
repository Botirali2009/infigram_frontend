// 🚀 INFIGRAM API Helper
// Backend API bilan ishlash uchun

const API_CONFIG = {
    BASE_URL: 'https://botirali.pythonanywhere.com',
    ENDPOINTS: {
        // Auth
        LOGIN: '/api/auth/login/',
        REGISTER: '/api/auth/register/',
        LOGOUT: '/api/auth/logout/',
        PROFILE: '/api/auth/profile/',
        
        // Bots
        BOTS: '/api/bots/',
        BOT_DETAIL: (id) => `/api/bots/${id}/`,
        BOT_STATS: (id) => `/api/bots/${id}/stats/`,
        
        // Auto Replies
        AUTO_REPLIES: (botId) => `/api/bots/${botId}/auto-replies/`,
        AUTO_REPLY_DETAIL: (id) => `/api/auto-replies/${id}/`,
        
        // FAQs
        FAQS: (botId) => `/api/bots/${botId}/faqs/`,
        FAQ_DETAIL: (id) => `/api/faqs/${id}/`,
        
        // Chats
        CHATS: (botId) => `/api/bot/${botId}/chats/`,
        CHAT_DETAIL: (id) => `/api/chats/${id}/`,
        CHAT_BLOCK: (id) => `/api/chats/${id}/block/`,
        
        // Messages
        MESSAGES: (chatId) => `/api/messages/chat/${chatId}/messages/`,
        MESSAGE_SEND: '/api/messages/send/',
        MESSAGE_READ: (id) => `/api/messages/${id}/read/`,
        
        // Analytics
        DAILY_STATS: (botId) => `/api/analytics/bot/${botId}/daily/`,
        BOT_OVERVIEW: (botId) => `/api/analytics/bot/${botId}/overview/`,
    }
};

// Helper Functions
const API = {
    // Get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },
    
    // Get user from localStorage
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    // Save token and user
    saveAuth(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    // Clear auth
    clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    // Check if authenticated
    isAuthenticated() {
        return !!this.getToken();
    },
    
    // Generic request helper
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Token ${token}` }),
                ...options.headers,
            },
            ...options,
        };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.detail || 'Request failed');
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Auth APIs
    async login(username, password) {
        const result = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        
        if (result.success) {
            this.saveAuth(result.data.token, result.data.user);
        }
        
        return result;
    },
    
    async register(userData) {
        return await this.request(API_CONFIG.ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
    
    async logout() {
        const result = await this.request(API_CONFIG.ENDPOINTS.LOGOUT, {
            method: 'POST',
        });
        this.clearAuth();
        return result;
    },
    
    async getProfile() {
        return await this.request(API_CONFIG.ENDPOINTS.PROFILE);
    },
    
    async updateProfile(data) {
        return await this.request(API_CONFIG.ENDPOINTS.PROFILE, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    // Bot APIs
    async getBots() {
        return await this.request(API_CONFIG.ENDPOINTS.BOTS);
    },
    
    async createBot(botData) {
        return await this.request(API_CONFIG.ENDPOINTS.BOTS, {
            method: 'POST',
            body: JSON.stringify(botData),
        });
    },
    
    async getBot(id) {
        return await this.request(API_CONFIG.ENDPOINTS.BOT_DETAIL(id));
    },
    
    async updateBot(id, data) {
        return await this.request(API_CONFIG.ENDPOINTS.BOT_DETAIL(id), {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    async deleteBot(id) {
        return await this.request(API_CONFIG.ENDPOINTS.BOT_DETAIL(id), {
            method: 'DELETE',
        });
    },
    
    async getBotStats(id) {
        return await this.request(API_CONFIG.ENDPOINTS.BOT_STATS(id));
    },
    
    // Chat APIs
    async getChats(botId) {
        return await this.request(API_CONFIG.ENDPOINTS.CHATS(botId));
    },
    
    async getChat(id) {
        return await this.request(API_CONFIG.ENDPOINTS.CHAT_DETAIL(id));
    },
    
    async blockChat(id) {
        return await this.request(API_CONFIG.ENDPOINTS.CHAT_BLOCK(id), {
            method: 'POST',
        });
    },
    
    // Message APIs
    async getMessages(chatId) {
        return await this.request(API_CONFIG.ENDPOINTS.MESSAGES(chatId));
    },
    
    async sendMessage(chatId, text) {
        return await this.request(API_CONFIG.ENDPOINTS.MESSAGE_SEND, {
            method: 'POST',
            body: JSON.stringify({
                chat: chatId,
                text: text,
                message_type: 'text',
            }),
        });
    },
    
    async markAsRead(messageId) {
        return await this.request(API_CONFIG.ENDPOINTS.MESSAGE_READ(messageId), {
            method: 'POST',
        });
    },
    
    // Auto Reply APIs
    async getAutoReplies(botId) {
        return await this.request(API_CONFIG.ENDPOINTS.AUTO_REPLIES(botId));
    },
    
    async createAutoReply(botId, data) {
        return await this.request(API_CONFIG.ENDPOINTS.AUTO_REPLIES(botId), {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    
    async updateAutoReply(id, data) {
        return await this.request(API_CONFIG.ENDPOINTS.AUTO_REPLY_DETAIL(id), {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    async deleteAutoReply(id) {
        return await this.request(API_CONFIG.ENDPOINTS.AUTO_REPLY_DETAIL(id), {
            method: 'DELETE',
        });
    },
    
    // FAQ APIs
    async getFAQs(botId) {
        return await this.request(API_CONFIG.ENDPOINTS.FAQS(botId));
    },
    
    async createFAQ(botId, data) {
        return await this.request(API_CONFIG.ENDPOINTS.FAQS(botId), {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    
    async updateFAQ(id, data) {
        return await this.request(API_CONFIG.ENDPOINTS.FAQ_DETAIL(id), {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    async deleteFAQ(id) {
        return await this.request(API_CONFIG.ENDPOINTS.FAQ_DETAIL(id), {
            method: 'DELETE',
        });
    },
    
    // Analytics APIs
    async getDailyStats(botId) {
        return await this.request(API_CONFIG.ENDPOINTS.DAILY_STATS(botId));
    },
    
    async getBotOverview(botId) {
        return await this.request(API_CONFIG.ENDPOINTS.BOT_OVERVIEW(botId));
    },
};

// Export for use in HTML files
if (typeof window !== 'undefined') {
    window.API = API;
    window.API_CONFIG = API_CONFIG;
}
