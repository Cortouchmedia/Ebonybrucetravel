
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
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="text-[10px] font-black uppercase underline decoration-2 mb-12 hover:text-gray-500"
      >
        ← Return to home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            {subtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none italic">{title}</h1>
          <div className="w-24 h-3 bg-black"></div>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            {description}
          </p>

          <div className="pt-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2">Key Service Offerings</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 p-4 border-2 border-black bg-white">
                  <div className="w-4 h-4 border-2 border-black flex-shrink-0"></div>
                  <span className="text-xs font-black uppercase">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-4 border-black aspect-square placeholder-image flex items-center justify-center font-black text-4xl opacity-10 italic shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            SERVICE PREVIEW
          </div>
          
          <div className="bg-gray-100 border-2 border-black p-8 space-y-6">
            <h4 className="font-black uppercase text-lg">Inquiry Form</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Your Full Name</label>
                <input type="text" className="w-full border-2 border-black p-3 text-sm outline-none focus:bg-white" placeholder="ENTER NAME" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Contact Email</label>
                <input type="email" className="w-full border-2 border-black p-3 text-sm outline-none focus:bg-white" placeholder="EMAIL@EXAMPLE.COM" />
              </div>
              <button className="w-full bg-black text-white py-4 font-black uppercase text-xs border-2 border-black hover:bg-white hover:text-black transition-all">
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
