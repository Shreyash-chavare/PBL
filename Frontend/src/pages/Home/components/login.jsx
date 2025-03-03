import React, { useState } from 'react';
import { useAuthstore } from '../../../stores/auth';
import { Link } from 'react-router-dom';
import './index.css'; 

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { login,isLoggingIn } = useAuthstore();
  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if(!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success=validateForm();
    if(success===true){
      login(formData);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login to your account</h2>
        <form action="/login" method="POST" className="space-y-6">
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
            />
          </div>
          <a href="/forgot" className="block text-right text-sm text-blue-600 hover:underline">Forgot?</a>
          <button
              type="submit"
              className='btn btn-primary w-full'
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">Don&apos;t have an account?{" "} <Link to="/api/signup" className='link link-primary'>Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
