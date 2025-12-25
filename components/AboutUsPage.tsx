
import React from 'react';

interface AboutUsPageProps {
  onBack: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="text-[10px] font-black uppercase underline decoration-2 mb-12 hover:text-gray-500"
      >
        ← Return to home
      </button>

      <div className="mb-20">
        <h1 className="text-4xl md:text-7xl font-black uppercase italic leading-none mb-6">Our Story</h1>
        <div className="w-48 h-4 bg-black"></div>
        <p className="mt-8 text-2xl text-gray-700 font-medium max-w-3xl leading-snug">
          Ebony Bruce Travels Limited was founded with a single vision: to make global exploration accessible, transparent, and professional for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="border-4 border-black aspect-video placeholder-image flex items-center justify-center font-black text-4xl opacity-10 italic shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          FOUNDING PHOTO
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase">Established 2010</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            What started as a boutique educational tour operator in Lagos has evolved into a comprehensive travel and logistics powerhouse. We recognized early on that travelers needed more than just a ticket; they needed a partner they could trust.
          </p>
          <p className="text-gray-600 leading-relaxed font-medium">
            Today, Ebony Bruce Travels Limited is an official DHL Franchise partner and a leading consultant for international admissions, serving thousands of clients across Nigeria and the world.
          </p>
        </div>
      </div>

      <div className="bg-black text-white p-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Our Mission</h3>
            <p className="text-2xl font-black italic">To provide seamless travel experiences through innovation, integrity, and unparalleled customer service.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Our Vision</h3>
            <p className="text-2xl font-black italic">To be Africa's most trusted gateway to the world, recognized for our transparency and expertise.</p>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-black uppercase mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Transparency', desc: 'No hidden fees. No fine print traps. We believe honesty is the only way to travel.' },
            { title: 'Excellence', desc: 'From five-star hotels to budget flights, we maintain the same high standard of service.' },
            { title: 'Reliability', desc: 'Our team and AI assistants work 24/7 to ensure your journey is never interrupted.' }
          ].map((v, i) => (
            <div key={i} className="border-2 border-black p-8 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-12 h-12 border-4 border-black flex items-center justify-center font-black text-xl mb-6">{i + 1}</div>
              <h4 className="text-xl font-black uppercase mb-3">{v.title}</h4>
              <p className="text-sm text-gray-600 font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-4 border-black pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-3xl font-black uppercase mb-2">Join Our Journey</h2>
          <p className="text-gray-600 font-medium">Ready to see the world with us?</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => onBack()} className="bg-black text-white px-10 py-4 font-black uppercase text-sm border-2 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Book a Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
