import React from 'react';

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create an account
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Log in here
            </a>
          </p>
        </div>

        {/* Form Structure */}
        <form className="mt-6 space-y-5">
          <div className="space-y-4">
            
            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 group hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <label htmlFor="avatar" className="cursor-pointer text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                Upload Avatar
              </label>
              <input id="avatar" name="avatar" type="file" className="sr-only" accept="image/*" />
            </div>

            {/* Grid for Name and Username to save vertical space */}
            <div className="grid grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                  placeholder="John Doe"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                  placeholder="johndoe"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-all active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
