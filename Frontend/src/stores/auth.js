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
        set({ authUser: res.data });
        get().connectsocket();
      } catch (error) {
        console.log('Error in checkauth', error.response ? error.response.data.message : error.message);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
    signup:async (data)=>{
        set({isSigningUp:true});
         try {
          const res=await axiosinstance.post("/createusers",data);
          set({authUser:res.data});
          toast.success("Successfully created account")
          get().connectsocket();
         } catch (error) {
           toast.error(error.response.data.message);
         }finally{
          set({isSigningUp:false});
         }
    },
    logout: async () => {
      console.log('Logout function triggered');
      try {
          await axiosinstance.post("");
          set({ authUser: null });
          toast.success("Logout successfully");
      } catch (error) {
          toast.error(error.response.data.message);
      }
  },
  login:async(data)=>{
    set({isLoggingIn:true});
    try {
      const res=await axiosinstance.post("/login",data);
      set({authUser:res.data});
      toast.success("Logged in successfully");
      get().connectsocket();

    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isLoggingIn:false});
    }
  },
  
  
  }));
  