
import React from 'react';
import { DealCardProps } from '../types';

const DealCard: React.FC<DealCardProps & { isSaved?: boolean; onToggleSave?: () => void }> = ({ title, subtitle, price, image, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden mb-6 relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-[#002D5B] uppercase tracking-widest">
          Verified
        </div>
      </div>
      
      <div className="px-4 flex-grow">
        <p className="text-[11px] font-bold uppercase text-slate-400 mb-2 tracking-widest">{subtitle}</p>
        <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tighter mb-4 leading-none group-hover:text-[#1F93D0] transition-colors">{title}</h3>
      </div>

      <div className="px-4 pb-4 mt-4 flex justify-between items-end">
        <div>
          <p className="text-[9px] font-bold uppercase text-slate-400 mb-1 tracking-widest">Starts from</p>
          <p className="text-2xl font-black text-[#002D5B]">{price || '£--'}</p>
        </div>
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-[#1F93D0] group-hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
