
import React from 'react';
import { TravelItem, BookingTab } from '../types';

interface DetailViewProps {
  item: TravelItem;
  onBack: () => void;
  onBook: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack, onBook }) => {
  const isFlight = item.type === BookingTab.FLIGHTS;
  const isStay = item.type === BookingTab.STAYS;
  const isCar = item.type === BookingTab.CAR_RENTALS;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="text-[10px] font-black uppercase underline decoration-2 mb-8 hover:text-gray-500"
      >
        ← Back to exploration
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Content & Images */}
        <div className="lg:col-span-8 space-y-10">
          {/* Main Hero Placeholder */}
          <div className="relative border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-video w-full placeholder-image flex items-center justify-center font-black text-6xl opacity-10 italic">
              {item.title}
            </div>
            {item.badge && (
              <div className="absolute top-6 left-6 bg-black text-white font-black uppercase text-xs px-4 py-2 border-2 border-white">
                {item.badge}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square border-2 border-black placeholder-image opacity-30 hover:opacity-100 transition-opacity cursor-pointer"></div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="border-b-4 border-black pb-6">
              <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4">{item.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-1">
                  <span className="text-black font-black text-lg">★</span>
                  <span className="text-sm font-black uppercase">{item.rating} / 10 Excellent</span>
                </div>
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                <span className="text-sm font-bold text-gray-500 uppercase">{item.location}</span>
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                <span className="text-xs font-black bg-gray-100 px-3 py-1 border-2 border-black uppercase">{item.type}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase">About this {item.type.toLowerCase()}</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {item.description || `Experience premium comfort and reliability with our ${item.type.toLowerCase()} service. Ebony Bruce Travels ensures every detail of your ${item.type.toLowerCase()} to ${item.location} is handled with professional care.`}
              </p>
            </div>

            {/* Type Specific Info */}
            {isFlight && (
              <div className="bg-gray-50 border-2 border-black p-8 space-y-6">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">Flight Itinerary</h3>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-3xl font-black">10:30</p>
                    <p className="text-xs font-black uppercase">LOS - Lagos</p>
                  </div>
                  <div className="flex-grow border-t-2 border-dashed border-black relative flex items-center justify-center">
                    <span className="absolute -top-3 bg-gray-50 px-3 text-[10px] font-black uppercase">6h 30m • Non-stop</span>
                  </div>
                  <div className="text-center md:text-right space-y-1">
                    <p className="text-3xl font-black">17:00</p>
                    <p className="text-xs font-black uppercase">LHR - London</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  <div className="text-[10px] font-black uppercase text-gray-400">Aircraft: Boeing 787</div>
                  <div className="text-[10px] font-black uppercase text-gray-400">Baggage: 2 x 23kg</div>
                  <div className="text-[10px] font-black uppercase text-gray-400">Class: Economy Classic</div>
                </div>
              </div>
            )}

            {isStay && (
              <div className="bg-gray-50 border-2 border-black p-8 space-y-6">
                <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-gray-400">Check-in / Check-out</p>
                    <div className="flex justify-between border-2 border-black p-4 bg-white">
                      <div className="text-center">
                        <p className="text-xs font-black uppercase">Check-in</p>
                        <p className="text-lg font-black">14:00</p>
                      </div>
                      <div className="w-px bg-black h-8 self-center"></div>
                      <div className="text-center">
                        <p className="text-xs font-black uppercase">Check-out</p>
                        <p className="text-lg font-black">11:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase text-gray-400">Room Features</p>
                    <ul className="text-xs font-bold uppercase space-y-2">
                      <li>• 1 King Size Bed</li>
                      <li>• City & Pool View</li>
                      <li>• Complimentary Mini-bar</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t-2 border-black pt-8">
              <h3 className="text-xl font-black uppercase mb-6">Inclusive Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {item.details.concat(['24/7 Support', 'Flexible Booking', 'Ebony Bruce Verified']).map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-black flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-black"></div>
                    </div>
                    <span className="text-xs font-bold uppercase">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Widget */}
        <div className="lg:col-span-4">
          <div className="border-4 border-black p-8 bg-white sticky top-24 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-black uppercase text-gray-400 mb-2">Total for this selection</h3>
            <div className="text-4xl font-black mb-4">{item.price}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-8 border-b-2 border-black pb-4">
              Transparent pricing: All mandatory taxes and fees are included in the quote above.
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500 uppercase">Ebony Bruce Fee</span>
                <span className="font-black text-[10px] bg-black text-white px-2">FREE</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500 uppercase">Availability</span>
                <span className="font-black text-black">Instant</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500 uppercase">Points Earned</span>
                <span className="font-black text-black">450 EB Points</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-4 border-t-2 border-black">
                <span className="font-black uppercase">Final Total</span>
                <span className="font-black">{item.price}</span>
              </div>
            </div>

            <button 
              onClick={onBook}
              className="w-full bg-black text-white py-5 text-lg font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Reserve Selection
            </button>

            <div className="mt-8 p-4 border-2 border-black border-dashed bg-gray-50">
               <p className="text-[10px] font-black uppercase text-center text-gray-600 leading-tight">
                No credit card required for initial reservation verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
