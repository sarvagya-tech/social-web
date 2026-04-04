import React, { useState } from 'react';
import { loginUser } from '../service/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../service/Authcontext';

const Login = () => {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();
  const[error,setError] = useState('');
  const[success,setSuccess] = useState('');
  const[loading,setLoading] = useState(false);
  const { login } = useAuth();


  const handleSubmit = async(e)=>{
     
    e.preventDefault();
    setError('');
    setSuccess('')

    if(!email || !password){
      setError("email and password are required");
      return;
    }

    setLoading(true)

    try {
      const response = await loginUser({email,password});
      login(response);
      setSuccess("successfully loged in ")
      navigate('/');
      

      
    } catch (error) {

      setError(error.message|| "Something went wrong.");
      
    }
    finally{
      setLoading(false)
    }

    


  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Form Structure */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>


          {/* Submit Button */}
          <div className="pt-2">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
