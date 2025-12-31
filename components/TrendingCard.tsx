
import React from 'react';

interface TrendingCardProps {
  city: string;
  country: string;
  price: string;
  image: string;
  onClick?: () => void;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ city, country, price, image, onClick }) => {
  return (
    <div 
      className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={city} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="text-white">
          <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{city}</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">{country}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
          <span className="text-xs font-black text-white">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
