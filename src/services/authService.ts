/**
 * Airfare Index India — Secure Authentication & Authorization Service
 * 
 * Communicates with server-side API endpoints (/api/auth/*, /api/admin/*).
 * Enforces server-authoritative token validation, session expiration,
 * and role-based access control.
 * Passwords, hashes, and secrets are NEVER stored in browser storage.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatarUrl: string;
  lastLogin: string;
}

const TOKEN_STORAGE_KEY = 'airfare_index_auth_token';
const USER_CACHE_KEY = 'airfare_index_cached_user';

export const authService = {
  /**
   * Retrieves the stored auth token from localStorage or sessionStorage
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  /**
   * Get cached user profile for instant UI render
   */
  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const raw = localStorage.getItem(USER_CACHE_KEY) || sessionStorage.getItem(USER_CACHE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Validates the active session against the server /api/auth/me endpoint.
   * If expired or revoked, clears credentials and returns null.
   */
  async verifySession(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        // Token is invalid or expired on server
        this.logout();
        return null;
      }

      const data = await res.json();
      if (data.success && data.user) {
        // Update cached user
        const isLocal = Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
        const storage = isLocal ? localStorage : sessionStorage;
        storage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
        return data.user;
      }
      return null;
    } catch (err) {
      // If network is offline, return cached user with caution
      return this.getCurrentUser();
    }
  },

  /**
   * Authenticate with email & password via server-side endpoint
   */
  async login(
    emailInput: string,
    passwordInput: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email || !password) {
      return { success: false, error: 'Please enter both your email address and password.' };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Authentication failed. Please check your credentials.'
        };
      }

      // Store only the secure session token and sanitized user profile
      const targetStorage = rememberMe ? localStorage : sessionStorage;
      const oppositeStorage = rememberMe ? sessionStorage : localStorage;

      targetStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      targetStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));

      // Clean opposite storage to prevent collisions
      oppositeStorage.removeItem(TOKEN_STORAGE_KEY);
      oppositeStorage.removeItem(USER_CACHE_KEY);

      return { success: true, user: data.user };
    } catch (err: any) {
      return {
        success: false,
        error: 'Network error contacting authentication server. Please try again.'
      };
    }
  },

  /**
   * Register a new user account. Role is strictly assigned by server as 'user'.
   */
  async register(
    name: string,
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!name.trim()) return { success: false, error: 'Please enter your full name.' };
    if (!email || !email.includes('@')) return { success: false, error: 'Please enter a valid email address.' };
    if (password.length < 8) return { success: false, error: 'Password must be at least 8 characters long.' };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Registration failed.'
        };
      }

      // Store token and user
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));

      return { success: true, user: data.user };
    } catch (err: any) {
      return {
        success: false,
        error: 'Network error contacting registration service.'
      };
    }
  },

  /**
   * Invalidate session on server and clear browser storage
   */
  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch {
        // Ignore network errors on logout
      }
    }

    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_CACHE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_CACHE_KEY);
    } catch {
      // ignore
    }
  },

  /**
   * Execute an administrator ingestion sweep through the protected backend endpoint
   */
  async triggerAdminIngest(): Promise<{ success: boolean; message: string; job?: any; error?: string }> {
    const token = this.getToken();
    if (!token) {
      return { success: false, message: '', error: 'Unauthorized: Authentication required.' };
    }

    try {
      const res = await fetch('/api/admin/ingest', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: '',
          error: data.error || 'Admin operation failed.'
        };
      }

      return { success: true, message: data.message, job: data.job };
    } catch (err: any) {
      return { success: false, message: '', error: 'Network error executing ingestion sweep.' };
    }
  },

  /**
   * Fetch server telemetry and scraper metrics via protected backend endpoint
   */
  async getAdminMetrics(): Promise<{ success: boolean; data?: any; error?: string }> {
    const token = this.getToken();
    if (!token) {
      return { success: false, error: 'Unauthorized: Authentication required.' };
    }

    try {
      const res = await fetch('/api/admin/metrics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to fetch admin metrics.' };
      }

      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: 'Network error fetching metrics.' };
    }
  },

  isAdmin(user: User | null): boolean {
    return Boolean(user && user.role === 'admin');
  }
};
