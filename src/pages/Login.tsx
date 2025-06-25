import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Gamepad2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log('Google User Info:', decoded);
      // هون تقدر تعمل تسجيل دخول حقيقي لاحقاً حسب البيانات
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-gaming flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center mb-4">
            <Gamepad2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-400">Sign in to your Maxen Store account</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-dark-200 border border-dark-300 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-electric-blue mb-2">Demo Login</h3>
          <p className="text-xs text-gray-400 mb-2">Use these credentials to test the app:</p>
          <div className="space-y-1 text-xs">
            <p className="text-gray-300"><span className="text-gray-400">Email:</span> demo@maxenstore.com</p>
            <p className="text-gray-300"><span className="text-gray-400">Password:</span> demo123</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark-200 border border-dark-300 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-dark-200 border border-dark-300 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-electric py-3 px-4 rounded-lg text-white font-semibold hover:shadow-neon-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Google Login Button */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">or sign in with</p>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError('Google login failed.')} />
        </div>

        {/* Links */}
        <div className="text-center space-y-2">
          <Link
            to="/forgot-password"
            className="text-electric-blue hover:text-electric-cyan transition-colors duration-200 text-sm"
          >
            Forgot your password?
          </Link>
          <div className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-electric-blue hover:text-electric-cyan transition-colors duration-200 font-medium"
            >
              Sign up here
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            ← {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
