import React, { useState } from 'react';
import './index.css'; // Ensure you have this import to apply Tailwind CSS
import { useAuthstore } from '../../../stores/auth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:"",
    fullname: "",
    email: "",
    password: ""
  });
  const { signup,isSigningUp } = useAuthstore();

  const validateForm = () => {
    if(!formData.fullname.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if(!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const success = validateForm();
    
    if (success === true) {
      try {
        const response = await fetch("http://localhost:3000/createusers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData),
          credentials: "include"
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Server response:', data);
        
        if (data.success) {
          toast.success("Account created successfully!");
          navigate('/login');
        } else {
          toast.error(data.message || "Failed to create account");
        }
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error("Failed to create account. Please try again.");
      }
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl mt-4">
        <div className="w-1/2 bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl mb-2">Registration Page</h1>
          <p className="text-lg">Start Your Development Journey Here</p>
        </div>
        <div className="w-1/2 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Create an account</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block">Fullname</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your fullname"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="username" className="block">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <button
              type="submit"
              className='btn btn-primary w-full'
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
              <button
                type="button"
                className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 mt-4"
              >
                Continue with Google
              </button>
            </form>
            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/login" className='link link-primary'>Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
