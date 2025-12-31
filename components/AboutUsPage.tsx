
import React from 'react';

interface AboutUsPageProps {
  onBack: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden bg-[#002D5B]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Travel background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002D5B] via-transparent to-[#002D5B]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase text-white/50 tracking-[0.3em] mb-12 hover:text-[#1F93D0] transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
            Our Legacy <br />
            <span className="text-[#1F93D0]">Of Excellence.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed">
            Since 2010, Ebony Bruce Travels has been the premier gateway for international mobility, blending luxury logistics with seamless travel arrangements.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        {/* Founders / Story Card */}
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="w-full lg:w-1/2 aspect-square rounded-[3rem] overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
              className="w-full h-full object-cover"
              alt="Team working"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <span className="text-[10px] font-black uppercase text-[#1F93D0] tracking-[0.4em]">The Beginning</span>
            <h2 className="text-4xl font-black text-[#002D5B] uppercase tracking-tighter leading-none italic">A Boutique Vision for Global Citizens</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Ebony Bruce Travels was established with a singular mission: to provide a transparent, professional, and luxury-tier gateway for global travelers. What began as a specialized consultancy has grown into a multi-national travel and logistics powerhouse.
            </p>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Our partnership with DHL and top-tier aviation providers ensures that every journey—whether for leisure, business, or education—is handled with the utmost precision.
            </p>
            <div className="pt-6 border-t border-slate-100">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1F93D0] font-black">EB</div>
                  <p className="text-sm font-black text-[#002D5B] uppercase tracking-widest">Signed, The Board of Directors</p>
               </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {[
            { 
              title: "Absolute Integrity", 
              icon: "🛡️",
              desc: "We operate with radical transparency. No hidden fees, no fine print surprises—just honest, premium service." 
            },
            { 
              title: "Global Connectivity", 
              icon: "🌍",
              desc: "From major international hubs to exclusive remote stays, our network spans the globe for your convenience." 
            },
            { 
              title: "Digital Innovation", 
              icon: "⚡",
              desc: "Leveraging cutting-edge AI and logistics software to provide instant confirmations and real-time support." 
            }
          ].map((v, i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
              <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight mb-4">{v.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Partner Banner */}
        <div className="bg-[#002D5B] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden mb-12">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
           <span className="text-[10px] font-black uppercase text-[#1F93D0] tracking-[0.4em] mb-6 block">Our Commitment</span>
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 uppercase tracking-tighter">Travel Without Boundaries.</h2>
           <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10">We believe that global exploration should be a seamless right, not a logistical challenge.</p>
           <button 
             onClick={onBack}
             className="bg-[#1F93D0] text-white px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white hover:text-[#002D5B] transition-all shadow-2xl relative z-10"
           >
             Start Your Trip
           </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
