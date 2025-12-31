
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

  // Filter States
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Mock data generator with reliable images
  const rawResults = useMemo((): TravelItem[] => {
    if (type === BookingTab.FLIGHTS) {
      return [
        { id: 'f1', type: BookingTab.FLIGHTS, title: 'Air Peace (P4 7121)', location: 'Lagos to Abuja', price: '£125', rating: '8.5', details: ['Non-stop', 'Economy', '1h 15m'], badge: 'Local Deal', image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800' },
        { id: 'f2', type: BookingTab.FLIGHTS, title: 'Ibom Air (QI 0310)', location: 'Lagos to Enugu', price: '£110', rating: '9.2', details: ['Non-stop', 'Economy', '1h 05m'], image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=800' },
        { id: 'f3', type: BookingTab.FLIGHTS, title: 'British Airways (BA 75)', location: 'Lagos to London', price: '£1,250', rating: '9.1', details: ['Non-stop', 'Premium Economy', '6h 30m'], badge: 'International', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800' },
      ];
    } else if (type === BookingTab.STAYS) {
      return [
        { id: 's1', type: BookingTab.STAYS, title: 'The Eko Hotels', location: 'Victoria Island, Lagos', price: '£120', rating: '9.0', details: ['Pool', 'Free WiFi', 'Breakfast included', 'King Room'], badge: 'Recommended', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800' },
        { id: 's2', type: BookingTab.STAYS, title: 'Radisson Blu Anchorage', location: 'Victoria Island, Lagos', price: '£145', rating: '8.8', details: ['Waterfront', 'Gym', 'Bar', 'Executive Suite'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800' },
        { id: 's3', type: BookingTab.STAYS, title: 'Transcorp Hilton', location: 'Maitama, Abuja', price: '£180', rating: '9.3', details: ['Luxury', 'Business Center', 'Airport Shuttle'], badge: 'Genius Deal', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800' },
        { id: 's4', type: BookingTab.STAYS, title: 'Lagos Oriental Hotel', location: 'Lekki Road, Lagos', price: '£110', rating: '8.4', details: ['City View', 'Spa', 'Restaurant'], image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800' },
      ];
    } else {
      return [
        { id: 'c1', type: BookingTab.CAR_RENTALS, title: 'Toyota Corolla 2023', location: 'Lagos Mainland', price: '£25', rating: '8.0', details: ['Manual', 'AC', '5 Seats'], image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800' },
        { id: 'c2', type: BookingTab.CAR_RENTALS, title: 'Lexus RX 350 SUV', location: 'Lekki Phase 1', price: '£55', rating: '9.5', details: ['Automatic', 'Luxury', 'SUV'], image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800' },
        { id: 'c3', type: BookingTab.CAR_RENTALS, title: 'Toyota Hiace Bus', location: 'Ikeja Airport', price: '£85', rating: '8.4', details: ['14 Seats', 'Diesel', 'Driver included'], image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800' },
      ];
    }
  }, [type]);

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  const parseRating = (ratingStr: string) => parseFloat(ratingStr) || 0;

  const sortedResults = useMemo(() => {
    const list = [...rawResults];
    switch (sortBy) {
      case 'Lowest price': return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'Highest rated':
      case 'Stars': return list.sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
      case 'Distance': return list.reverse();
      default: return list;
    }
  }, [rawResults, sortBy]);

  const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Map Modal */}
        {showMapModal && (
          <div className="fixed inset-0 z-[200] bg-white flex flex-col md:flex-row animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-full md:w-96 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col h-1/3 md:h-full bg-slate-50">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                <h3 className="font-black uppercase text-sm tracking-tighter">Map Search</h3>
                <button 
                  onClick={() => setShowMapModal(false)}
                  className="bg-[#002D5B] text-white px-4 py-2 text-[10px] font-black uppercase rounded-lg shadow-lg hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {sortedResults.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-[#1F93D0] transition-all cursor-pointer">
                    <h4 className="font-black text-xs uppercase tracking-tight truncate">{item.title}</h4>
                    <div className="flex justify-between items-end mt-4">
                      <span className="text-[10px] font-black text-[#1F93D0] bg-blue-50 px-2 py-1 rounded-md">{item.rating} Score</span>
                      <span className="text-sm font-black text-[#002D5B]">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow relative bg-slate-100 overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#002D5B 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-10">
                 <div className="w-full h-1 bg-[#002D5B] absolute"></div>
                 <div className="h-full w-1 bg-[#002D5B] absolute"></div>
              </div>
              {sortedResults.map((item, i) => (
                <div key={i} className="absolute" style={{ top: `${25 + (i * 12) % 50}%`, left: `${25 + (i * 20) % 50}%` }}>
                  <div className="w-10 h-10 bg-white rounded-full border-2 border-[#1F93D0] flex items-center justify-center font-black text-xs text-[#002D5B] shadow-xl hover:scale-125 transition-transform cursor-pointer">
                    {item.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-xs font-black uppercase text-[#002D5B] mb-6 tracking-widest italic">Modify Search</h3>
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Destination</label>
                  <p className="text-sm font-bold text-[#002D5B] uppercase">Lagos, Nigeria</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Selected Dates</label>
                  <p className="text-sm font-bold text-[#002D5B] uppercase">Oct 24 — Oct 28</p>
                </div>
                <button className="w-full bg-[#002D5B] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Update Selection</button>
              </div>
            </div>

            <div 
              onClick={() => setShowMapModal(true)}
              className="bg-[#1F93D0] rounded-[2rem] aspect-[16/9] flex flex-col items-center justify-center p-8 cursor-pointer hover:shadow-2xl transition-all group overflow-hidden relative"
            >
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="map" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg className="w-6 h-6 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase text-white tracking-[0.2em] shadow-sm">View on Map</span>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest italic">Price Range (£)</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-[8px] font-black uppercase text-slate-300 block mb-1">Min</label>
                    <input 
                      type="number" 
                      value={priceRange.min} 
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2 text-[10px] font-black outline-none focus:border-[#1F93D0]" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[8px] font-black uppercase text-slate-300 block mb-1">Max</label>
                    <input 
                      type="number" 
                      value={priceRange.max} 
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2 text-[10px] font-black outline-none focus:border-[#1F93D0]" 
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1F93D0]" 
                />
              </div>
            </div>

            {/* Stops Filter */}
            {type === BookingTab.FLIGHTS && (
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest italic">Flight Stops</h4>
                <div className="space-y-4">
                  {['Non-stop', '1 Stop', '2+ Stops'].map(stop => (
                    <label key={stop} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#002D5B] transition-colors uppercase tracking-tight">{stop}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedStops.includes(stop)}
                        onChange={() => toggleFilter(setSelectedStops, stop)}
                        className="w-5 h-5 rounded-lg accent-[#1F93D0] border-2 border-slate-200 cursor-pointer" 
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Time Filter */}
            {type === BookingTab.FLIGHTS && (
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest italic">Departure Time</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Morning', icon: '🌅', range: '06:00-12:00' },
                    { label: 'Afternoon', icon: '☀️', range: '12:00-18:00' },
                    { label: 'Evening', icon: '🌇', range: '18:00-00:00' },
                    { label: 'Night', icon: '🌙', range: '00:00-06:00' }
                  ].map(time => (
                    <button 
                      key={time.label}
                      onClick={() => toggleFilter(setSelectedTimes, time.label)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                        selectedTimes.includes(time.label) 
                          ? 'border-[#1F93D0] bg-blue-50 text-[#1F93D0]' 
                          : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-lg mb-1">{time.icon}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest">{time.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest italic">Premium Features</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-[#002D5B] mb-4">Verification Level</h5>
                  {['Private Access', 'Ebony Verified', 'VIP Lounge', 'Fast Track'].map(f => (
                    <label key={f} className="flex items-center space-x-3 cursor-pointer group mb-3">
                      <input type="checkbox" className="w-5 h-5 rounded-lg accent-[#1F93D0] border-2 border-slate-200" />
                      <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#002D5B] transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <main className="lg:col-span-9 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic">
                {type} in Lagos
              </h2>
              <div className="bg-white p-1 rounded-2xl flex border border-slate-100 shadow-sm overflow-hidden w-full md:w-auto">
                {(['Top picks', 'Lowest price', 'Highest rated'] as SortType[]).map((sort) => (
                  <button 
                    key={sort} 
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex-1 ${sortBy === sort ? 'bg-[#002D5B] text-white shadow-lg' : 'text-slate-400 hover:text-[#002D5B]'}`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {sortedResults.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer group border border-slate-100"
                  onClick={() => onSelectItem(item)}
                >
                  <div className="w-full md:w-72 aspect-[4/3] rounded-[2rem] overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                    {item.badge && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#002D5B] shadow-md">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-black text-[#002D5B] uppercase tracking-tighter group-hover:text-[#1F93D0] transition-colors">{item.title}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                            <svg className="w-3 h-3 mr-1 text-[#1F93D0]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            {item.location}
                          </p>
                        </div>
                        <div className="bg-blue-50 px-3 py-2 rounded-2xl flex flex-col items-center border border-blue-100">
                          <span className="text-xs font-black text-[#1F93D0]">{item.rating}</span>
                          <span className="text-[7px] font-black uppercase text-[#1F93D0] opacity-50">Score</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.details.map((detail, idx) => (
                          <span key={idx} className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 px-3 py-1.5 rounded-full">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end pt-6 border-t border-slate-50">
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest mb-1">Total inclusive price</p>
                        <p className="text-3xl font-black text-[#002D5B]">{item.price}</p>
                      </div>
                      <button className="bg-[#1F93D0] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-[#1579af] transition-all active:scale-95 group-hover:-translate-y-1">
                        Reserve Selection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
