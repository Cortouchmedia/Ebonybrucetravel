
import React, { useState } from 'react';
import { View } from '../types';

interface ForgotPasswordPageProps {
  onNavigate: (view: View) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-stretch bg-slate-50 animate-in fade-in duration-700">
      {/* Visual Side - Left */}
      <div className="hidden lg:flex w-1/2 bg-[#002D5B] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Security/Recovery"
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
            <h2 className="text-5xl font-black text-white leading-tight mb-8 uppercase tracking-tighter italic">
              Account <br />
              <span className="text-[#1F93D0]">Recovery.</span> <br />
            </h2>
            <p className="text-xl text-white/70 font-medium leading-relaxed mb-12">
              Regain access to your secured travel vault. We'll help you reset your credentials and get back on your journey.
            </p>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <p className="text-sm font-black text-white uppercase tracking-widest">End-to-End Encryption Secured</p>
            </div>
          </div>
          
          <p className="text-xs text-white/40 font-black uppercase tracking-widest">© 2025 Ebony Bruce Travels Limited</p>
        </div>
      </div>

      {/* Form Side - Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md py-12">
          {!isSubmitted ? (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-[#002D5B] mb-3 uppercase tracking-tighter">Forgot Password</h2>
                <p className="text-lg text-slate-400 font-medium leading-relaxed">Enter your registered email address to receive reset instructions.</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded-2xl p-6 text-sm font-bold border-2 border-slate-100 focus:border-[#1F93D0] outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#1F93D0] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#1579af] transition-all shadow-xl shadow-blue-500/30 active:scale-95"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 border border-green-100">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-[#002D5B] mb-4 uppercase tracking-tighter">Link Dispatched</h2>
              <p className="text-lg text-slate-400 font-medium mb-12 leading-relaxed">
                If an account exists for <span className="text-[#002D5B] font-black">{email}</span>, you will receive an email shortly with reset instructions.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-black uppercase tracking-widest text-[#1F93D0] hover:text-[#002D5B] transition-colors underline underline-offset-4"
              >
                Did not receive email? Try again
              </button>
            </div>
          )}

          <div className="mt-16 text-center border-t border-slate-100 pt-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Back to safe travels?{' '}
              <button 
                onClick={() => onNavigate(View.SIGN_IN)}
                className="text-[#1F93D0] font-black hover:text-[#002D5B] transition-colors ml-1 underline underline-offset-4"
              >
                Return to Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
