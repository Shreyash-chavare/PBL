import {create} from 'zustand';
import { axiosinstance } from '../utils/axios';
import toast from 'react-hot-toast';

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:3000/":"/"

export const useAuthstore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    
    checkauth: async () => {
      try {
        const res = await axiosinstance.get('/api/check');
        console.log('Auth check response:', res.data);
        if (res.data.success) {
          set({ authUser: res.data.user });
          get().connectsocket();
        } else {
          console.log('Auth check failed:', res.data.message);
          set({ authUser: null });
        }
      } catch (error) {
        console.log('Error in checkauth:', error.response?.data?.message || error.message);
        if (error.response?.status === 401) {
          // Session expired or invalid
          set({ authUser: null });
        } else {
          // Other errors, keep the current auth state
          console.log('Keeping current auth state due to error:', error.message);
        }
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
          const res = await axiosinstance.post("/createusers", data);
          if (res.data.success) {
            set({authUser: res.data.user});
            get().connectsocket();
            return { success: true, user: res.data.user };
          } else {
            return { success: false, message: res.data.message || "Signup failed" };
          }
        } catch (error) {
          return { success: false, message: error.response?.data?.message || "Signup failed" };
        } finally {
          set({isSigningUp: false});
        }
    },

    logout: async () => {
      try {
        const res = await axiosinstance.get("/logout");
        console.log("Logout response:", res.data);
        
        // Clear auth state regardless of response
        set({ authUser: null });
        
        if (res.data.success) {
          toast.success("Logged out successfully");
          // Force reload to clear any cached state
          window.location.href = '/login';
          return { success: true };
        } else {
          toast.error("Logout failed");
          return { success: false, message: res.data.message || "Logout failed" };
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Clear auth state even if request fails
        set({ authUser: null });
        toast.error("Logout failed");
        // Force reload to clear any cached state
        window.location.href = '/login';
        return { success: false, message: error.response?.data?.message || "Logout failed" };
      }
    },

    login: async (userData) => {
      set({isLoggingIn: true});
      try {
        set({authUser: userData});
        get().connectsocket();
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || "Login failed" };
      } finally {
        set({isLoggingIn: false});
      }
    },
}));
  