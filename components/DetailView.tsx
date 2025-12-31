
import React, { useState } from 'react';
import { TravelItem, BookingTab } from '../types';

interface DetailViewProps {
  item: TravelItem;
  onBack: () => void;
  onBook: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack, onBook }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const isFlight = item.type === BookingTab.FLIGHTS;
  const isStay = item.type === BookingTab.STAYS;

  // Mock set of images for the gallery
  const galleryImages = [
    item.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800",
    "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=800",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800",
    "https://images.unsplash.com/photo-1551882547-ff43c63fedfe?q=80&w=800",
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800",
    "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=800",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[200] bg-white overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1F93D0]">Photo Gallery</span>
              <span className="text-sm font-black text-[#002D5B] uppercase tracking-tighter">{item.title}</span>
            </div>
            <button 
              onClick={() => setIsGalleryOpen(false)}
              className="bg-[#002D5B] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              Close Gallery
            </button>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="break-inside-avoid rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-zoom-in">
                  <img src={img} className="w-full h-auto object-cover" alt={`Gallery ${idx}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="text-[10px] font-black uppercase text-[#1F93D0] tracking-[0.2em] flex items-center mb-10 hover:translate-x-[-4px] transition-transform"
        >
          <span className="mr-2">←</span> Return to Exploration
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl md:text-6xl font-black text-[#002D5B] uppercase tracking-tighter leading-none mb-4">{item.title}</h1>
                  <div className="flex items-center space-x-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    <span className="text-[#1F93D0]">{item.location}</span>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-[1.5rem] border border-blue-100">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#1F93D0] uppercase tracking-widest leading-none">Rating</p>
                    <p className="text-xl font-black text-[#1F93D0]">{item.rating}</p>
                  </div>
                </div>
              </div>

              {/* Media Gallery (Interactive) */}
              <div 
                className="grid grid-cols-4 gap-4 aspect-[16/9] overflow-hidden rounded-[3rem] cursor-pointer group"
                onClick={() => setIsGalleryOpen(true)}
              >
                <div className="col-span-3 h-full overflow-hidden">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt="primary" 
                  />
                </div>
                <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
                  <div className="overflow-hidden h-full rounded-[1.5rem]">
                    <img 
                      src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="alt1" 
                    />
                  </div>
                  <div className="relative h-full rounded-[1.5rem] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="alt2" 
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-opacity group-hover:bg-black/40">
                      <span className="font-black text-lg">+12</span>
                      <span className="font-black text-[8px] uppercase tracking-widest">View Gallery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary / Details */}
            <div className="space-y-12">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-black text-[#002D5B] uppercase tracking-tight mb-6 italic">Professional Overview</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  {item.description || `Experience the pinnacle of luxury and comfort with Ebony Bruce Travels. This ${item.type.toLowerCase()} at ${item.location} has been hand-selected for our premium inventory, ensuring every aspect of your journey meets our high international standards.`}
                </p>
              </div>

              {isFlight && (
                <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                     <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight mb-10">Flight Journey</h3>
                  <div className="flex justify-between items-center gap-6">
                    <div className="space-y-2">
                      <p className="text-4xl font-black text-[#002D5B]">10:30</p>
                      <p className="text-xs font-black uppercase text-[#1F93D0] tracking-[0.2em]">LOS • Lagos</p>
                    </div>
                    <div className="flex-grow flex flex-col items-center px-4 relative">
                      <div className="w-full h-px bg-[#1F93D0] relative">
                         <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-[#1F93D0] rounded-full"></div>
                      </div>
                      <span className="text-[9px] font-black uppercase text-slate-400 mt-4 tracking-[0.3em]">6h 45m • Direct</span>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-4xl font-black text-[#002D5B]">17:15</p>
                      <p className="text-xs font-black uppercase text-[#1F93D0] tracking-[0.2em]">LHR • London</p>
                    </div>
                  </div>
                </div>
              )}

              {isStay && (
                <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                   <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight mb-8">Selected Accommodations</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                           <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Check-in Window</p>
                           <p className="text-xl font-black text-[#002D5B]">From 14:00 PM</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                           <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Check-out By</p>
                           <p className="text-xl font-black text-[#002D5B]">Until 11:00 AM</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Premium Amenities</h4>
                        <ul className="space-y-3">
                           {['Executive Pool Access', 'Gourmet Breakfast', 'Personal Concierge', 'Valet Parking'].map(a => (
                             <li key={a} className="flex items-center text-xs font-bold text-[#002D5B]">
                               <span className="w-1.5 h-1.5 bg-[#1F93D0] rounded-full mr-3"></span>
                               {a}
                             </li>
                           ))}
                        </ul>
                      </div>
                   </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight italic">Ebony Bruce Verification</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {['Official Partner', 'Instant Confirmation', '24/7 Support', 'Flexible Modification'].map((v, i) => (
                    <div key={i} className="flex items-center space-x-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <svg className="w-5 h-5 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,45,91,0.15)] border border-slate-100 sticky top-24">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">Total Quote</p>
              <div className="text-5xl font-black text-[#002D5B] mb-8 leading-none">{item.price}</div>
              
              <div className="space-y-6 mb-10 text-sm">
                <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                  <span>Product Code</span>
                  <span className="text-[#002D5B]">{item.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                  <span>Agency Fee</span>
                  <span className="text-[#1F93D0] font-black">£0.00 (Waived)</span>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-black text-[#002D5B] uppercase tracking-widest text-xs">Net Total</span>
                  <span className="text-xl font-black text-[#002D5B]">{item.price}</span>
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full bg-[#1F93D0] text-white py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/40 hover:bg-[#1579af] transition-all active:scale-95 mb-6"
              >
                Book Selection
              </button>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-center text-slate-400 uppercase tracking-widest leading-relaxed">
                  Price guaranteed for the next 15 minutes. No hidden surcharges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
