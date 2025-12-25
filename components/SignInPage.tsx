
import React, { useState } from 'react';
import { View } from '../types';

interface SignInPageProps {
  onNavigate: (view: View) => void;
  onLogin: (name: string) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase mb-2">Sign In</h2>
        <p className="text-sm text-gray-600 mb-8 font-medium">Welcome back! Please enter your details.</p>

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          // Extract first part of email as name for demo purposes if not specified
          const nameFromEmail = email.split('@')[0] || 'James';
          onLogin(nameFromEmail);
        }}>
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-black border-2 border-black" />
              <span className="text-xs font-bold uppercase text-gray-600 group-hover:text-black">Remember me</span>
            </label>
            <span className="text-xs font-bold uppercase underline decoration-2 cursor-pointer hover:text-gray-600">Forgot Password?</span>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 font-black uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black opacity-20"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="border-2 border-black p-3 flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
            <div className="w-4 h-4 border border-black rounded-full"></div>
            <span className="text-[10px] font-bold uppercase">Google</span>
          </button>
          <button className="border-2 border-black p-3 flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
            <div className="w-4 h-4 border border-black flex items-center justify-center font-bold">f</div>
            <span className="text-[10px] font-bold uppercase">Facebook</span>
          </button>
        </div>

        <p className="mt-8 text-center text-xs font-bold uppercase text-gray-500">
          Don't have an account?{' '}
          <span 
            className="text-black underline cursor-pointer"
            onClick={() => onNavigate(View.REGISTER)}
          >
            Register now
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
