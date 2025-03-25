import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; 
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthstore } from '../../../stores/auth';
import { axiosinstance } from '../../../utils/axios';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggingIn, login } = useAuthstore();
  const navigate = useNavigate();

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if(!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const res = await axiosinstance.post('/login', formData);
        if (res.data.success) {
          await login(res.data.user);
          toast.success('Login successful', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: '#22c55e',
              color: 'white',
            }
          });
          navigate('/app');
        } else {
          toast.error(res.data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="Email"
              className="w-full p-3 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className='btn btn-primary w-full'
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className='size-5 animate-spin' />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">Don&apos;t have an account?{" "} <Link to="/signup" className='link link-primary' style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
