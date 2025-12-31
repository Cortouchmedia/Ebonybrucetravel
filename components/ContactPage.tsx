
import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been sent to our premium travel concierge.');
    onBack();
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-700">
      {/* Header */}
      <section className="bg-[#002D5B] pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[100px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase text-white/50 tracking-[0.3em] mb-12 hover:text-[#1F93D0] transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-6">Connect With Us.</h1>
          <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Personalized support for the discerning traveler.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Information Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 space-y-12">
              <div>
                <span className="text-[10px] font-black uppercase text-[#1F93D0] tracking-[0.4em] mb-6 block">Headquarters</span>
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] block mb-2">Location</label>
                    <p className="text-lg font-black text-[#002D5B] uppercase italic">123 Ebony Bruce Way, Victoria Island, Lagos</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] block mb-2">Corporate Line</label>
                    <p className="text-lg font-black text-[#002D5B] uppercase italic">+234 (0) 800 EBONY BRUCE</p>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] block mb-2">Electronic Mail</label>
                    <p className="text-lg font-black text-[#1F93D0] uppercase italic">concierge@ebonybrucetravels.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-50">
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em] mb-6 block">Global Office Hours</span>
                <ul className="space-y-4">
                  {[
                    { day: 'Mon — Fri', hours: '08:00 AM — 08:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM — 04:00 PM' },
                    { day: 'Sunday', hours: 'Emergency Support Only' }
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-sm">
                      <span className="font-black text-[#002D5B] uppercase tracking-tighter">{item.day}</span>
                      <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Map Placeholder */}
            <div className="bg-slate-100 rounded-[3rem] aspect-video relative overflow-hidden border-2 border-white shadow-xl">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" 
                 className="w-full h-full object-cover grayscale opacity-20"
                 alt="Map background"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#002D5B] rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                     📍
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur rounded-2xl text-[10px] font-black uppercase tracking-widest text-center text-[#002D5B]">
                  Interactive Map Portal Integration
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-slate-100">
              <h3 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-10 leading-none">Inquiry Desk</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Full Name</label>
                    <input type="text" required placeholder="JAMES BRUCE" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-5 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Email Address</label>
                    <input type="email" required placeholder="NAME@EMAIL.COM" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-5 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Specialized Service</label>
                  <select className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-5 text-sm font-bold text-[#002D5B] outline-none transition-all appearance-none cursor-pointer">
                    <option>GENERAL INQUIRY</option>
                    <option>LOGISTICS & DHL</option>
                    <option>ACCOMMODATION BOOKING</option>
                    <option>FLIGHT CHARTERS</option>
                    <option>EDUCATION CONSULTANCY</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Detailed Message</label>
                  <textarea rows={6} required placeholder="HOW CAN WE ASSIST WITH YOUR JOURNEY?" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-6 text-sm font-bold text-[#002D5B] outline-none transition-all resize-none"></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#002D5B] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-[#1F93D0] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                >
                  Dispatch Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
