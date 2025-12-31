
import React from 'react';

interface ExclusiveOfferCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  linkText: string;
  onClick?: () => void;
}

const ExclusiveOfferCard: React.FC<ExclusiveOfferCardProps> = ({ title, description, image, badge, linkText, onClick }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-sm font-black text-slate-800 uppercase mb-2 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <button 
          onClick={onClick}
          className="text-[#1F93D0] text-[10px] font-black uppercase tracking-widest flex items-center hover:underline group"
        >
          {linkText}
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default ExclusiveOfferCard;
