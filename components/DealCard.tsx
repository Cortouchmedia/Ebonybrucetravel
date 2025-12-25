
import React from 'react';
import { DealCardProps } from '../types';

const DealCard: React.FC<DealCardProps> = ({ title, subtitle, isLocal }) => {
  return (
    <div className="border-2 border-black flex flex-col">
      {/* Image Placeholder */}
      <div className="aspect-[4/3] w-full border-b-2 border-black placeholder-image flex items-center justify-center relative">
        <div className="text-black font-bold opacity-30 text-4xl">X</div>
        {isLocal && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 font-bold uppercase border border-white">
            Local Deal
          </div>
        )}
        {!isLocal && (
          <div className="absolute top-2 left-2 bg-white text-black text-[10px] px-2 py-0.5 font-bold uppercase border border-black">
            International
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 bg-white flex-grow">
        <h3 className="font-bold text-lg mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
        <div className="flex justify-between items-end mt-auto">
          <div className="text-xs font-medium uppercase border-b-2 border-black pb-0.5">View details</div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 line-through">NGN 120,000</div>
            <div className="text-lg font-bold">NGN 85,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
