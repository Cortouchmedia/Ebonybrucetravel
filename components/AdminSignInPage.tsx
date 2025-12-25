
import React, { useState } from 'react';
import { View } from '../types';

interface AdminSignInPageProps {
  onAdminLogin: () => void;
  onNavigate: (view: View) => void;
}

const AdminSignInPage: React.FC<AdminSignInPageProps> = ({ onAdminLogin, onNavigate }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic: admin / admin (case insensitive for ease of use)
    if (adminId.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      onAdminLogin();
    } else {
      setError('Invalid credentials. Use "admin" for both fields.');
    }
  };

  const handleQuickLogin = () => {
    onAdminLogin();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-8 text-center">
          <div className="inline-block border-2 border-black px-4 py-1 font-black uppercase text-[10px] mb-4">
            Secured Access
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight">Admin Portal</h2>
        </div>

        <div className="mb-6 p-4 border-2 border-dashed border-black bg-gray-100 text-center">
          <p className="text-[10px] font-black uppercase mb-2">Demo Shortcuts</p>
          <button 
            onClick={handleQuickLogin}
            className="text-xs font-black uppercase bg-black text-white px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-all"
          >
            Quick Demo Login (No Password)
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-2 border-red-600 p-3 text-red-600 font-black uppercase text-[10px]">
              {error}
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase font-bold text-gray-500">Admin ID</label>
            <input 
              type="text" 
              placeholder="admin"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="border-2 border-black p-4 text-sm font-black focus:bg-gray-50 outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase font-bold text-gray-500">Access Key</label>
            <input 
              type="password" 
              placeholder="admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black p-4 text-sm font-black focus:bg-gray-50 outline-none"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1"
          >
            Authorize Access
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center space-y-2">
          <p 
            className="text-[10px] font-black uppercase text-gray-400 cursor-pointer hover:text-black underline"
            onClick={() => onNavigate(View.HOME)}
          >
            Return to User Home
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
