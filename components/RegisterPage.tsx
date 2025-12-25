
import React, { useState } from 'react';
import { View } from '../types';

interface RegisterPageProps {
  onNavigate: (view: View) => void;
  onLogin: (name: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onLogin }) => {
  const [name, setName] = useState('');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase mb-2">Create Account</h2>
        <p className="text-sm text-gray-600 mb-8 font-medium">Join us today for exclusive travel deals.</p>

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onLogin(name || 'James');
        }}>
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">Full Name</label>
            <input 
              type="text" 
              placeholder="James"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500">Confirm</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="border-2 border-black p-3 text-sm font-medium focus:ring-0 focus:border-black outline-none"
                required
              />
            </div>
          </div>

          <div className="py-2">
            <label className="flex items-start space-x-2 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 accent-black border-2 border-black shrink-0" required />
              <span className="text-[10px] font-bold uppercase text-gray-600 leading-tight">
                I agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
              </span>
            </label>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 font-black uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1">
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-bold uppercase text-gray-500">
          Already have an account?{' '}
          <span 
            className="text-black underline cursor-pointer"
            onClick={() => onNavigate(View.SIGN_IN)}
          >
            Sign In instead
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
