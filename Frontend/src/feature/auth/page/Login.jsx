import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission handler to be implemented by business logic layer
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1200&fit=crop)',
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-zinc-900/40"></div>
        {/* Blur Effect */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex flex-col justify-center space-y-8">
              {/* Logo */}
              <div className="space-y-2">
                <h1 className="text-6xl font-black tracking-wider">
                  <span className="text-white">SNITCH</span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-amber-400"></div>
              </div>

              {/* Tagline */}
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Elevate Your Style
                </h2>
                <p className="text-lg text-gray-300 font-light">
                  Welcome back. Sign in to discover premium fashion.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Exclusive Deals</p>
                    <p className="text-gray-400 text-sm">Access members-only fashion drops</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Personalized Shopping</p>
                    <p className="text-gray-400 text-sm">Curated recommendations for you</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Quick Checkout</p>
                    <p className="text-gray-400 text-sm">Seamless and secure transactions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8 text-center">
                  <h1 className="text-5xl font-black tracking-wider text-white mb-2">SNITCH</h1>
                  <p className="text-yellow-400 font-semibold">Elevate Your Style</p>
                </div>

                {/* Glassmorphism Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                  <p className="text-gray-400 text-sm mb-8">Sign in to your premium fashion account</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Enter your password"
                      />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right pt-1">
                      <a href="#" className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                        Forgot Password?
                      </a>
                    </div>

                    {/* Sign In Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-yellow-500/30 transform hover:scale-105 active:scale-95"
                    >
                      Sign In
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-gray-400 text-sm">
                      Don't have an account?{' '}
                      <a href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                        Register
                      </a>
                    </p>
                  </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-6">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-yellow-400/70 hover:text-yellow-400 transition-colors">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-yellow-400/70 hover:text-yellow-400 transition-colors">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login