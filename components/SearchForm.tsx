
import React, { useState } from 'react';
import { BookingTab } from '../types';
import WireframeDatePicker from './WireframeDatePicker';

interface SearchFormProps {
  activeTab: BookingTab;
  onSearch?: () => void;
}

interface MultiCitySegment {
  id: number;
  from: string;
  to: string;
  date: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ activeTab, onSearch }) => {
  const [tripType, setTripType] = useState('round-trip');
  const [segments, setSegments] = useState<MultiCitySegment[]>([
    { id: 1, from: '', to: '', date: '' },
    { id: 2, from: '', to: '', date: '' },
  ]);

  const [mainFlight, setMainFlight] = useState({
    from: '',
    to: '',
    departure: '',
    return: ''
  });

  const [staysSearch, setStaysSearch] = useState({
    location: '',
    checkIn: '',
    checkOut: ''
  });

  const [carSearch, setCarSearch] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: ''
  });

  const addSegment = () => {
    if (segments.length < 5) {
      setSegments([...segments, { id: Date.now(), from: '', to: '', date: '' }]);
    }
  };

  const removeSegment = (id: number) => {
    if (segments.length > 2) {
      setSegments(segments.filter(s => s.id !== id));
    }
  };

  const handleSegmentChange = (id: number, field: keyof MultiCitySegment, value: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSearchSubmit = () => {
    if (onSearch) onSearch();
  };

  const renderFlightsForm = () => (
    <div className="space-y-6">
      <div className="flex space-x-6 text-sm font-bold uppercase tracking-tight">
        {['round-trip', 'one-way', 'multi-city'].map((type) => (
          <label key={type} className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === type} 
              onChange={() => setTripType(type)}
              className="w-4 h-4 accent-black border-2 border-black"
            />
            <span className={tripType === type ? 'text-black underline decoration-2 underline-offset-4' : 'text-gray-400 group-hover:text-gray-600'}>
              {type.replace('-', ' ')}
            </span>
          </label>
        ))}
      </div>

      {tripType !== 'multi-city' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="md:col-span-3 border-2 border-black p-2 bg-white flex flex-col">
            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">From</label>
            <input 
              type="text"
              placeholder="Origin City/Airport"
              className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
              value={mainFlight.from}
              onChange={(e) => setMainFlight({...mainFlight, from: e.target.value})}
            />
          </div>
          <div className="md:col-span-3 border-2 border-black p-2 bg-white flex flex-col">
            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">To</label>
            <input 
              type="text"
              placeholder="Destination City/Airport"
              className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
              value={mainFlight.to}
              onChange={(e) => setMainFlight({...mainFlight, to: e.target.value})}
            />
          </div>
          <div className={`md:col-span-4 grid ${tripType === 'round-trip' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
            <div className="border-2 border-black p-2 bg-white flex flex-col">
              <WireframeDatePicker 
                label="Departure"
                value={mainFlight.departure}
                onChange={(date) => setMainFlight({...mainFlight, departure: date})}
                placeholder="Pick date"
              />
            </div>
            {tripType === 'round-trip' && (
              <div className="border-2 border-black p-2 bg-white flex flex-col">
                <WireframeDatePicker 
                  label="Return"
                  value={mainFlight.return}
                  onChange={(date) => setMainFlight({...mainFlight, return: date})}
                  placeholder="Pick date"
                />
              </div>
            )}
          </div>
          <div className="md:col-span-2 border-2 border-black p-2 bg-white flex flex-col">
            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Class</label>
            <select className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full cursor-pointer">
              <option>Economy</option>
              <option>Premium</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {segments.map((segment, index) => (
            <div key={segment.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <div className="md:col-span-1 text-xs font-black uppercase text-gray-400">
                # {index + 1}
              </div>
              <div className="md:col-span-3 border-2 border-black p-2 bg-white flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">From</label>
                <input 
                  type="text"
                  placeholder="Origin"
                  className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
                  value={segment.from}
                  onChange={(e) => handleSegmentChange(segment.id, 'from', e.target.value)}
                />
              </div>
              <div className="md:col-span-3 border-2 border-black p-2 bg-white flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">To</label>
                <input 
                  type="text"
                  placeholder="Destination"
                  className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
                  value={segment.to}
                  onChange={(e) => handleSegmentChange(segment.id, 'to', e.target.value)}
                />
              </div>
              <div className="md:col-span-3 border-2 border-black p-2 bg-white flex flex-col">
                <WireframeDatePicker 
                  label="Date"
                  value={segment.date}
                  onChange={(date) => handleSegmentChange(segment.id, 'date', date)}
                  placeholder="Pick date"
                />
              </div>
              <div className="md:col-span-2 flex items-center space-x-2">
                {segments.length > 2 && (
                  <button 
                    onClick={() => removeSegment(segment.id)}
                    className="text-[10px] font-bold uppercase border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mt-4">
             <div className="md:col-span-1"></div>
             <div className="md:col-span-3">
                <button 
                  onClick={addSegment}
                  className="w-full text-xs font-bold uppercase border-2 border-dashed border-black py-4 hover:bg-gray-200 transition-colors"
                >
                  + Add Segment
                </button>
             </div>
             <div className="md:col-span-8 border-2 border-black p-2 bg-white flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Passengers / Class</label>
                <div className="text-sm font-medium flex space-x-4">
                   <span>1 Adult</span>
                   <span className="text-gray-300">|</span>
                   <span>Economy</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStaysForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="border-2 border-black p-2 bg-white flex flex-col">
        <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Where are you going?</label>
        <input 
          type="text" 
          placeholder="Destination / Property name"
          className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
          value={staysSearch.location}
          onChange={(e) => setStaysSearch({...staysSearch, location: e.target.value})}
        />
      </div>
      <div className="border-2 border-black p-2 bg-white flex flex-col">
        <div className="flex items-center space-x-2 w-full h-full">
          <div className="flex-1">
            <WireframeDatePicker 
              label="Check-in"
              value={staysSearch.checkIn}
              onChange={(date) => setStaysSearch({...staysSearch, checkIn: date})}
              placeholder="Pick"
            />
          </div>
          <span className="text-gray-400 mt-4">—</span>
          <div className="flex-1">
            <WireframeDatePicker 
              label="Check-out"
              value={staysSearch.checkOut}
              onChange={(date) => setStaysSearch({...staysSearch, checkOut: date})}
              placeholder="Pick"
            />
          </div>
        </div>
      </div>
      <div className="border-2 border-black p-2 bg-white flex flex-col cursor-pointer">
        <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Guests & Rooms</label>
        <div className="text-sm font-medium">2 adults · 0 children · 1 room</div>
      </div>
    </div>
  );

  const renderCarsForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="border-2 border-black p-2 bg-white flex flex-col">
          <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Pick-up location</label>
          <input 
            type="text" 
            placeholder="Enter city or airport"
            className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
            value={carSearch.pickupLocation}
            onChange={(e) => setCarSearch({...carSearch, pickupLocation: e.target.value})}
          />
        </div>
        <div className="border-2 border-black p-2 bg-white flex flex-col">
          <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Drop-off location (optional)</label>
          <input 
            type="text" 
            placeholder="Same as pick-up"
            className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full"
            value={carSearch.dropoffLocation}
            onChange={(e) => setCarSearch({...carSearch, dropoffLocation: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="border-2 border-black p-2 bg-white flex flex-col h-full">
          <div className="flex items-center space-x-2 w-full h-full">
            <div className="flex-1">
              <WireframeDatePicker 
                label="Pick-up"
                value={carSearch.pickupDate}
                onChange={(date) => setCarSearch({...carSearch, pickupDate: date})}
                placeholder="Pick"
              />
            </div>
            <span className="text-gray-400 mt-4">—</span>
            <div className="flex-1">
              <WireframeDatePicker 
                label="Drop-off"
                value={carSearch.dropoffDate}
                onChange={(date) => setCarSearch({...carSearch, dropoffDate: date})}
                placeholder="Pick"
              />
            </div>
          </div>
        </div>
        <div className="border-2 border-black p-2 bg-white flex flex-col">
          <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Driver Age</label>
          <select className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 w-full cursor-pointer">
            <option>25 - 70</option>
            <option>18 - 24</option>
            <option>70+</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {activeTab === BookingTab.FLIGHTS && renderFlightsForm()}
      {activeTab === BookingTab.STAYS && renderStaysForm()}
      {activeTab === BookingTab.CAR_RENTALS && renderCarsForm()}
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
           {activeTab === BookingTab.FLIGHTS && "Search across 400+ airlines worldwide"}
           {activeTab === BookingTab.STAYS && "Over 2,000,000 properties listed"}
           {activeTab === BookingTab.CAR_RENTALS && "Best prices from top agencies"}
        </div>
        <button 
          onClick={handleSearchSubmit}
          className="w-full md:w-auto bg-black text-white px-12 py-4 text-lg font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all duration-300 active:translate-x-1 active:translate-y-1"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
