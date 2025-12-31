
import React, { useState, useRef, useEffect } from 'react';
import { BookingTab } from '../types';
import WireframeDatePicker from './WireframeDatePicker';

interface SearchFormProps {
  activeTab: BookingTab;
  onSearch?: () => void;
  setActiveTab: (tab: BookingTab) => void;
}

type TravelClass = 'Economy' | 'Premium Economy' | 'Business' | 'First Class';

const SearchForm: React.FC<SearchFormProps> = ({ activeTab, onSearch, setActiveTab }) => {
  const [tripType, setTripType] = useState('MULTI-CITY');
  const [from, setFrom] = useState('Lagos, Nigeria');
  const [to, setTo] = useState('London, United Kingdom');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  
  const [showTravelers, setShowTravelers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState<TravelClass>('Economy');
  
  const travelersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelers(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const isOneWay = tripType === 'ONE-WAY';

  return (
    <div className="w-full bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(0,45,91,0.15)] border border-slate-100/50 overflow-visible relative">
      {/* Search Type Tabs */}
      <div className="flex px-4 md:px-10 border-b border-slate-100 overflow-x-auto no-scrollbar" role="tablist">
        {[
          { id: BookingTab.FLIGHTS, label: 'FLIGHTS', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> },
          { id: BookingTab.STAYS, label: 'HOTELS', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
          { id: BookingTab.CAR_RENTALS, label: 'CAR RENTALS', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2.5 px-4 md:px-6 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap focus:outline-none
              ${activeTab === tab.id ? 'text-[#1F93D0]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1F93D0]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        {/* Top Controls: Trip Types and Domain Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 md:mb-10">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {['ROUND TRIP', 'ONE-WAY', 'MULTI-CITY'].map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${tripType === type ? 'border-[#1F93D0]' : 'border-slate-200 group-hover:border-slate-300'}`}>
                  {tripType === type && <div className="w-2.5 h-2.5 bg-[#1F93D0] rounded-full"></div>}
                </div>
                <input type="radio" name="tripType" className="sr-only" checked={tripType === type} onChange={() => setTripType(type)} />
                <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest ${tripType === type ? 'text-[#002D5B]' : 'text-slate-400'}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>

          <div className="bg-[#EBF7FF] px-4 md:px-6 py-2 rounded-full border border-blue-100/50 flex items-center space-x-3">
            <svg className="w-3 h-3 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[8px] md:text-[9px] font-black uppercase text-[#1F93D0] tracking-[0.2em]">DOMESTIC & INTERNATIONAL</span>
          </div>
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative mb-6 md:mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">FROM</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1F93D0] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </div>
              <input 
                type="text" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 md:p-5 pl-14 text-sm font-bold text-[#002D5B] outline-none transition-all"
                placeholder="Departure city"
              />
            </div>
          </div>

          {/* Swap Button - Center relative to both states */}
          <button 
            onClick={handleSwap}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-[-10%] md:top-[46px] flex w-10 h-10 bg-white border border-slate-100 rounded-full items-center justify-center shadow-lg text-slate-400 hover:text-[#1F93D0] hover:scale-110 active:scale-95 transition-all z-20 rotate-90 md:rotate-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          </button>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">TO</label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1F93D0] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <input 
                type="text" 
                value={to} 
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 md:p-5 pl-14 text-sm font-bold text-[#002D5B] outline-none transition-all"
                placeholder="Arrival city"
              />
            </div>
          </div>
        </div>

        {/* Details Grid: Dates & Travelers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
          <WireframeDatePicker label="DEPARTURE" value={departureDate} onChange={setDepartureDate} placeholder="Select Date" />
          <WireframeDatePicker label="RETURN" value={returnDate} onChange={setReturnDate} placeholder="Select Date" disabled={isOneWay} />

          <div className="space-y-2 relative" ref={travelersRef}>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">TRAVELERS & CLASS</label>
            <button 
              onClick={() => setShowTravelers(!showTravelers)}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 md:p-5 flex items-center justify-between text-sm font-bold text-[#002D5B] hover:border-[#1F93D0] focus:outline-none transition-all"
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                <span className="truncate">{adults + (children > 0 ? `, ${children} C` : '')} Adult, {cabinClass}</span>
              </div>
              <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${showTravelers ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
            </button>

            {showTravelers && (
              <div className="absolute top-full left-0 md:right-0 mt-4 w-full md:w-72 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-6 md:p-8 z-[100] animate-in fade-in zoom-in-95">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Adults</span>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-black">-</button>
                      <span className="text-sm font-black w-4 text-center">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-black">+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Children</span>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-black">-</button>
                      <span className="text-sm font-black w-4 text-center">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center font-black">+</button>
                    </div>
                  </div>
                  <div className="h-px bg-slate-50"></div>
                  <div className="space-y-2">
                    {['Economy', 'Business', 'First Class'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setCabinClass(c as TravelClass)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${cabinClass === c ? 'bg-[#1F93D0] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
          <label className="flex items-center space-x-4 cursor-pointer group order-2 sm:order-1">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${directOnly ? 'bg-[#1F93D0] border-[#1F93D0]' : 'border-slate-300'}`}>
              {directOnly && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
              <input type="checkbox" className="sr-only" checked={directOnly} onChange={() => setDirectOnly(!directOnly)} />
            </div>
            <span className="text-[10px] md:text-[11px] font-bold text-slate-400 group-hover:text-[#002D5B] transition-colors uppercase tracking-widest">DIRECT FLIGHT ONLY</span>
          </label>

          <button 
            onClick={onSearch}
            className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-5 bg-[#1F93D0] text-white rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-[#002D5B] transition-all order-1 sm:order-2"
          >
            SEARCH {activeTab.toUpperCase().replace('S', '')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
