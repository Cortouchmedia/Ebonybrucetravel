
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
    if (adminId.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      onAdminLogin();
    } else {
      setError('Invalid system credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#002D5B] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2"></div>
      
      <div className="w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-[#1F93D0] rounded-[1.5rem] flex items-center justify-center font-black text-white text-3xl mx-auto mb-6 shadow-xl shadow-blue-500/20">EB</div>
           <h1 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic">Admin Portal</h1>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Authorized Access Only</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-500 text-[10px] font-black uppercase p-4 rounded-xl text-center border border-red-100">{error}</div>}
          
          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-4">Access Key ID</label>
             <input 
               type="text" 
               className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
               value={adminId}
               onChange={(e) => setAdminId(e.target.value)}
               placeholder="admin"
             />
          </div>

          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-4">Security Passphrase</label>
             <input 
               type="password" 
               className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="admin"
             />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#002D5B] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-[#1F93D0] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Authenticate
          </button>
        </form>

        <button 
          onClick={() => onNavigate(View.HOME)}
          className="w-full mt-8 text-[9px] font-black uppercase text-slate-400 tracking-widest hover:text-[#002D5B] transition-colors"
        >
          Return to Client Site
        </button>
      </div>
    </div>
  );
};

export default AdminSignInPage;
