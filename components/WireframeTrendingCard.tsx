
import React from 'react';

interface WireframeTrendingCardProps {
  city: string;
  country: string;
  price: string;
}

const WireframeTrendingCard: React.FC<WireframeTrendingCardProps> = ({ city, country, price }) => {
  return (
    <div className="border border-black bg-white flex flex-col h-[400px]">
      {/* Image Placeholder */}
      <div className="flex-grow border-b border-black relative bg-gray-50 overflow-hidden">
        {/* The X Symbol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[150%] h-[1px] bg-black rotate-45 absolute"></div>
          <div className="w-[150%] h-[1px] bg-black -rotate-45 absolute"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">IMAGE_PLACEHOLDER</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4 border-t border-black bg-white">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-tight text-black">{city}</h3>
            <p className="text-[9px] font-medium uppercase tracking-widest text-gray-500">{country}</p>
          </div>
          <div className="border border-black px-2 py-1">
            <span className="text-[10px] font-bold text-black">{price}</span>
          </div>
        </div>
        <div className="mt-4 h-0.5 bg-black w-full opacity-10"></div>
      </div>
    </div>
  );
};

export default WireframeTrendingCard;
