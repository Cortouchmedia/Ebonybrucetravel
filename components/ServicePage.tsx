
import React from 'react';
import { View } from '../types';

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  onBack: () => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ title, subtitle, description, features, onBack }) => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-[#002D5B] pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase text-white/40 tracking-[0.4em] mb-12 hover:text-[#1F93D0] transition-colors"
          >
            ← Back to Home
          </button>
          <span className="inline-block bg-[#1F93D0] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            {subtitle}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
            {title}
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100">
              <h2 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-12 border-b border-slate-50 pb-8">Premium Offerings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-5 p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-[#1F93D0] hover:bg-white transition-all group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1F93D0] shadow-sm group-hover:bg-[#1F93D0] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-sm font-black text-[#002D5B] uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 p-10 bg-[#002D5B] rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                <h3 className="text-xl font-black uppercase mb-4 relative z-10">Why trust Ebony Bruce?</h3>
                <p className="text-white/70 font-medium leading-relaxed mb-8 relative z-10">
                  Our specialized services are built on a decade of logistics expertise and a global network of educational and corporate partners. We don't just facilitate travel; we build pathways for your global success.
                </p>
                <div className="flex items-center space-x-4 relative z-10">
                   <div className="w-12 h-px bg-white/20"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Excellence in Mobility</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-100">
                <h4 className="text-2xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-8">Service Inquiry</h4>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry received. A specialist will contact you shortly.'); }}>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Full Name</label>
                      <input type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" placeholder="YOUR NAME" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Corporate Email</label>
                      <input type="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" placeholder="EMAIL@EXAMPLE.COM" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Specific Requirements</label>
                      <textarea rows={4} className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all resize-none" placeholder="HOW CAN WE ASSIST?"></textarea>
                   </div>
                   <button className="w-full bg-[#1F93D0] text-white py-5 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:bg-[#002D5B] transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                      Submit Details
                   </button>
                </form>
             </div>

             {/* Support Card */}
             <div className="bg-slate-900 rounded-[3rem] p-10 text-white">
                <p className="text-[9px] font-black uppercase text-white/40 tracking-[0.4em] mb-4">Direct Concierge</p>
                <p className="text-xl font-black uppercase italic mb-8 tracking-tighter">+234 (0) 800 LOGISTICS</p>
                <div className="h-px bg-white/10 w-full mb-8"></div>
                <p className="text-xs text-white/60 leading-relaxed uppercase tracking-widest">Available for urgent international inquiries 24/7.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
