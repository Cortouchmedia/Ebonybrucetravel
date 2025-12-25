
import React, { useState, useMemo } from 'react';
import { BookingTab, TravelItem } from '../types';

interface SearchResultsProps {
  type: BookingTab;
  onSelectItem: (item: TravelItem) => void;
}

type SortType = 'Top picks' | 'Lowest price' | 'Highest rated' | 'Stars' | 'Distance';

const SearchResults: React.FC<SearchResultsProps> = ({ type, onSelectItem }) => {
  const [sortBy, setSortBy] = useState<SortType>('Top picks');
  const [showMapModal, setShowMapModal] = useState(false);

  // Mock data generator
  const rawResults = useMemo((): TravelItem[] => {
    if (type === BookingTab.FLIGHTS) {
      return [
        { id: 'f1', type: BookingTab.FLIGHTS, title: 'Air Peace (P4 7121)', location: 'Lagos to Abuja', price: 'NGN 95,000', rating: '8.5', details: ['Non-stop', 'Economy', '1h 15m'], badge: 'Local Deal' },
        { id: 'f2', type: BookingTab.FLIGHTS, title: 'Ibom Air (QI 0310)', location: 'Lagos to Enugu', price: 'NGN 88,000', rating: '9.2', details: ['Non-stop', 'Economy', '1h 05m'] },
        { id: 'f3', type: BookingTab.FLIGHTS, title: 'British Airways (BA 75)', location: 'Lagos to London', price: 'NGN 1,250,000', rating: '8.1', details: ['Non-stop', 'Premium Economy', '6h 30m'], badge: 'International' },
      ];
    } else if (type === BookingTab.STAYS) {
      return [
        { id: 's1', type: BookingTab.STAYS, title: 'The Eko Hotels', location: 'Victoria Island, Lagos', price: 'NGN 120,000', rating: '9.0', details: ['Pool', 'Free WiFi', 'Breakfast included', 'King Room'], badge: 'Recommended' },
        { id: 's2', type: BookingTab.STAYS, title: 'Radisson Blu Anchorage', location: 'Victoria Island, Lagos', price: 'NGN 145,000', rating: '8.8', details: ['Waterfront', 'Gym', 'Bar', 'Executive Suite'] },
        { id: 's3', type: BookingTab.STAYS, title: 'Transcorp Hilton', location: 'Maitama, Abuja', price: 'NGN 180,000', rating: '9.3', details: ['Luxury', 'Business Center', 'Airport Shuttle'], badge: 'Genius Deal' },
        { id: 's4', type: BookingTab.STAYS, title: 'Lagos Oriental Hotel', location: 'Lekki Road, Lagos', price: 'NGN 110,000', rating: '8.4', details: ['City View', 'Spa', 'Restaurant'] },
      ];
    } else {
      return [
        { id: 'c1', type: BookingTab.CAR_RENTALS, title: 'Toyota Corolla 2023', location: 'Lagos Mainland', price: 'NGN 25,000', rating: '8.0', details: ['Manual', 'AC', '5 Seats'] },
        { id: 'c2', type: BookingTab.CAR_RENTALS, title: 'Lexus RX 350 SUV', location: 'Lekki Phase 1', price: 'NGN 55,000', rating: '9.5', details: ['Automatic', 'Luxury', 'SUV'] },
        { id: 'c3', type: BookingTab.CAR_RENTALS, title: 'Toyota Hiace Bus', location: 'Ikeja Airport', price: 'NGN 85,000', rating: '8.4', details: ['14 Seats', 'Diesel', 'Driver included'] },
      ];
    }
  }, [type]);

  // Helper to extract numeric price for sorting
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  // Helper to extract numeric rating for sorting
  const parseRating = (ratingStr: string) => {
    return parseFloat(ratingStr) || 0;
  };

  // Functional sorting
  const sortedResults = useMemo(() => {
    const list = [...rawResults];
    switch (sortBy) {
      case 'Lowest price':
        return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'Highest rated':
      case 'Stars':
        return list.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
      case 'Distance':
        return list.reverse();
      case 'Top picks':
      default:
        return list;
    }
  }, [rawResults, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Map Modal Overlay */}
      {showMapModal && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col md:flex-row border-4 border-black">
          {/* Sidebar in Map */}
          <div className="w-full md:w-96 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col h-1/3 md:h-full bg-gray-50">
            <div className="p-4 border-b-2 border-black flex justify-between items-center bg-white">
              <h3 className="font-black uppercase text-xs">Map Results</h3>
              <button 
                onClick={() => setShowMapModal(false)}
                className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all"
              >
                Close Map
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {sortedResults.map(item => (
                <div key={item.id} className="border-2 border-black p-3 bg-white hover:bg-gray-100 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1">
                  <h4 className="font-black uppercase text-[10px] truncate">{item.title}</h4>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] font-bold text-gray-500">{item.rating} Score</span>
                    <span className="text-xs font-black">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map Canvas */}
          <div className="flex-grow relative bg-[#f0f0f0] overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* Center Crosshair Placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-20">
               <div className="w-full h-0.5 bg-black absolute"></div>
               <div className="h-full w-0.5 bg-black absolute"></div>
            </div>

            {/* Random Markers */}
            {sortedResults.map((item, i) => (
              <div 
                key={i}
                className="absolute group"
                style={{ 
                  top: `${20 + (i * 15) % 60}%`, 
                  left: `${20 + (i * 25) % 60}%` 
                }}
              >
                <div className="w-8 h-10 border-4 border-black bg-white flex items-center justify-center font-black text-xs hover:bg-black hover:text-white transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {item.rating}
                </div>
                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-black text-white p-2 text-[8px] font-black uppercase z-10 border-2 border-white">
                  {item.title}
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col space-y-2">
              <button className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-xl hover:bg-black hover:text-white">+</button>
              <button className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-xl hover:bg-black hover:text-white">-</button>
            </div>

            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-black px-4 py-2 font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Browsing: {type === BookingTab.STAYS ? 'Lagos' : sortedResults[0]?.location}
            </div>
          </div>
        </div>
      )}

      {/* Search Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* SIDEBAR: Filters */}
        <aside className="hidden md:block md:col-span-3 space-y-6">
          {/* Summary Search Box */}
          <div className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm font-black uppercase mb-4">Search</h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-gray-500">Destination</label>
                <div className="text-xs font-black uppercase">Lagos, Nigeria</div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-gray-500">Dates</label>
                <div className="text-xs font-black uppercase">Oct 24 — Oct 28</div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-gray-500">Travelers</label>
                <div className="text-xs font-black uppercase">2 adults · 1 room</div>
              </div>
              <button className="w-full bg-black text-white py-2 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Update</button>
            </div>
          </div>

          {/* Map Link Sidebar Button */}
          <div 
            onClick={() => setShowMapModal(true)}
            className="border-2 border-black aspect-video placeholder-image flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-bold text-lg mb-2">M</div>
            <span className="text-[10px] font-black uppercase underline">Show on map</span>
          </div>

          {/* Filter Groups */}
          <div className="border-2 border-black divide-y-2 divide-black bg-white">
            <div className="p-4">
              <h4 className="text-xs font-black uppercase mb-3">Popular Filters</h4>
              <div className="space-y-2">
                {['Pool', 'Free WiFi', 'Breakfast', 'Hotels', 'Air Conditioning'].map(filter => (
                  <label key={filter} className="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-black border-2 border-black" />
                    <span className="text-[10px] font-bold uppercase text-gray-600 group-hover:text-black">{filter}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-black uppercase mb-3">Your Budget (per night)</h4>
              <div className="space-y-2">
                {['NGN 0 - NGN 50,000', 'NGN 50,000 - NGN 100,000', 'NGN 100,000+'].map(price => (
                  <label key={price} className="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-black border-2 border-black" />
                    <span className="text-[10px] font-bold uppercase text-gray-600 group-hover:text-black">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN AREA: Results */}
        <main className="md:col-span-9 space-y-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-black uppercase">
              {type === BookingTab.STAYS ? 'Lagos' : rawResults[0]?.location}: {rawResults.length * 31}+ properties found
            </h2>

            {/* Sort Bar */}
            <div className="border-2 border-black bg-white overflow-hidden flex flex-wrap divide-x-2 divide-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {(['Top picks', 'Lowest price', 'Highest rated', 'Stars', 'Distance'] as SortType[]).map((sort) => (
                <button 
                  key={sort} 
                  onClick={() => setSortBy(sort)}
                  className={`flex-1 px-4 py-3 text-[10px] font-black uppercase transition-all ${sortBy === sort ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sortedResults.map((item) => (
              <div 
                key={item.id} 
                className="border-2 border-black p-4 bg-white flex flex-col sm:flex-row gap-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
                onClick={() => onSelectItem(item)}
              >
                {/* 1. Image Thumbnail */}
                <div className="w-full sm:w-60 aspect-[4/3] border-2 border-black placeholder-image flex items-center justify-center font-black text-3xl opacity-10 group-hover:opacity-30 transition-opacity flex-shrink-0 italic">
                  PHOTO
                </div>

                {/* 2. Middle Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-black uppercase group-hover:underline decoration-2 underline-offset-4">{item.title}</h3>
                        <div className="flex items-center space-x-2">
                           <span className="text-yellow-500">★★★★★</span>
                           <span className="text-[10px] font-black uppercase bg-gray-100 px-1 border border-black">{item.type === BookingTab.STAYS ? 'Hotel' : item.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                             <p className="text-xs font-black uppercase leading-none">Excellent</p>
                             <p className="text-[9px] font-bold text-gray-400 uppercase">2,410 reviews</p>
                          </div>
                          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs border-2 border-black">
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] font-bold uppercase text-blue-600 mb-3">
                      <span className="underline cursor-pointer">{item.location}</span>
                      <span className="text-gray-400 no-underline">•</span>
                      <span 
                        className="underline cursor-pointer font-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMapModal(true);
                        }}
                      >Show on map</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                      Located in the heart of {item.location}, this {item.type.toLowerCase()} offers premier service and {item.details.slice(0, 2).join(' & ')}...
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.details.map((detail, idx) => (
                        <span key={idx} className="text-[9px] font-black uppercase border border-black px-2 py-0.5 bg-gray-50">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {item.badge && (
                    <div className="mt-4">
                       <span className="text-[10px] font-black uppercase bg-gray-100 text-black border-2 border-black px-2 py-1">
                        {item.badge}
                       </span>
                    </div>
                  )}
                </div>

                {/* 3. Pricing Area */}
                <div className="w-full sm:w-48 sm:border-l-2 border-black sm:pl-6 flex flex-col justify-end items-end text-right">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">4 nights, 2 adults</p>
                    {item.badge === 'Genius Deal' && (
                      <p className="text-[10px] font-black uppercase text-red-600 line-through">NGN 210,000</p>
                    )}
                    <p className="text-2xl font-black">{item.price}</p>
                    <p className="text-[9px] font-bold text-gray-500 uppercase">+ NGN 8,400 taxes and fees</p>
                  </div>
                  <button className="w-full bg-black text-white py-3 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1">
                    See availability
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Placeholder */}
            <div className="py-12 flex justify-center border-t-2 border-black">
              <div className="flex space-x-2">
                {[1, 2, 3, '...', 10].map((p, i) => (
                  <button key={i} className={`w-8 h-8 border-2 border-black flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
