
import React, { useState } from 'react';
import { View } from '../types';

interface RegisterPageProps {
  onNavigate: (view: View) => void;
  onLogin: (name: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSocialRegister = (provider: string) => {
    onLogin(provider === 'Google' ? 'New Google User' : 'New Facebook User');
  };

  return (
    <div className="min-h-screen flex items-stretch bg-slate-50">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-[#002D5B] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Travel background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#002D5B] via-[#002D5B]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full p-20 flex flex-col justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate(View.HOME)}>
            <div className="w-12 h-12 bg-[#1F93D0] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="font-black text-white text-2xl">EB</span>
            </div>
            <span className="font-black text-2xl text-white tracking-tighter">EBONY BRUCE</span>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-5xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
              Start your <br />
              <span className="text-[#1F93D0]">global journey</span> <br />
              with us.
            </h2>
            <p className="text-xl text-white/70 font-medium leading-relaxed mb-12">
              Join thousands of travelers who trust Ebony Bruce for seamless international connections and premium stays.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#002D5B] bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-black text-white uppercase tracking-widest">50k+ Happy Travelers</p>
            </div>
          </div>
          
          <p className="text-xs text-white/40 font-black uppercase tracking-widest">© 2025 Ebony Bruce Travels Limited</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-[#002D5B] mb-3 uppercase tracking-tighter">Create Account</h2>
            <p className="text-lg text-slate-400 font-medium">Join our premium travel community today.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center space-x-3 bg-white border-2 border-slate-100 py-4 rounded-2xl hover:border-[#1F93D0] transition-all active:scale-95 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002D5B] group-hover:text-[#1F93D0]">Google</span>
            </button>
            
            <button 
              onClick={() => handleSocialRegister('Facebook')}
              className="flex items-center justify-center space-x-3 bg-[#1877F2] border-2 border-[#1877F2] py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 group"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Facebook</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex-grow h-px bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">OR REGISTER WITH EMAIL</span>
            <div className="flex-grow h-px bg-slate-100"></div>
          </div>

          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            onLogin(name || 'James');
          }}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-4">Full Name</label>
              <input 
                type="text" 
                placeholder="James Bruce"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white rounded-2xl p-4 text-sm font-bold border-2 border-slate-100 focus:border-[#1F93D0] outline-none transition-all shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-2xl p-4 text-sm font-bold border-2 border-slate-100 focus:border-[#1F93D0] outline-none transition-all shadow-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-4">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white rounded-2xl p-4 text-sm font-bold border-2 border-slate-100 focus:border-[#1F93D0] outline-none transition-all shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-4">Confirm</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white rounded-2xl p-4 text-sm font-bold border-2 border-slate-100 focus:border-[#1F93D0] outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="py-2">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg accent-[#1F93D0] border-2 border-slate-300 shrink-0" required />
                <span className="text-[11px] font-bold text-slate-500 leading-tight group-hover:text-[#002D5B] transition-colors">
                  I agree to the <span className="text-[#1F93D0] font-black underline underline-offset-2">Terms of Service</span> and <span className="text-[#1F93D0] font-black underline underline-offset-2">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1F93D0] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#1579af] transition-all shadow-xl shadow-blue-500/30 active:scale-95"
            >
              Register
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate(View.SIGN_IN)}
                className="text-[#1F93D0] font-black hover:text-[#002D5B] transition-colors ml-1 underline underline-offset-4"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
