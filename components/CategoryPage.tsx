
import React from 'react';
import { BookingTab, TravelItem, View } from '../types';
import SearchForm from './SearchForm';
import DealCard from './DealCard';

interface CategoryPageProps {
  type: BookingTab;
  onSearch: () => void;
  onSelectItem: (item: TravelItem) => void;
  setActiveTab: (tab: BookingTab) => void;
  onNavigate: (view: View) => void;
  // Fix: Added missing props according to App.tsx usage
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
}

// Fix: Destructured savedItemIds and onToggleSave from props
const CategoryPage: React.FC<CategoryPageProps> = ({ 
  type, 
  onSearch, 
  onSelectItem, 
  setActiveTab, 
  onNavigate,
  savedItemIds,
  onToggleSave
}) => {
  const getPageInfo = () => {
    switch (type) {
      case BookingTab.FLIGHTS:
        return {
          title: "Book your next flight",
          subtitle: "Discover the best deals on international and domestic flights.",
          bgImage: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2000&auto=format&fit=crop",
          deals: [
            { 
              id: 'cf1', 
              type: BookingTab.FLIGHTS, 
              title: "Lagos to London", 
              location: "London, UK", 
              price: "£1,150", 
              rating: "9.1", 
              details: ["Direct", "Air Peace", "Economy"], 
              isLocal: false, 
              image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop" // Heathrow / Airport interior
            },
            { 
              id: 'cf2', 
              type: BookingTab.FLIGHTS, 
              title: "Abuja to Port Harcourt", 
              location: "Rivers, Nigeria", 
              price: "£75", 
              rating: "8.7", 
              details: ["Direct", "Ibom Air", "Economy"], 
              isLocal: true, 
              image: "https://images.unsplash.com/photo-1490430657723-4d607c1503fc?q=80&w=800&auto=format&fit=crop" // Aviation scene
            },
            { 
              id: 'cf3', 
              type: BookingTab.FLIGHTS, 
              title: "Lagos to Dubai", 
              location: "Dubai, UAE", 
              price: "£820", 
              rating: "9.3", 
              details: ["Round Trip", "Emirates", "Economy"], 
              isLocal: false, 
              image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop" // Dubai International Airport
            },
            { 
              id: 'cf4', 
              type: BookingTab.FLIGHTS, 
              title: "Enugu to Lagos", 
              location: "Lagos, Nigeria", 
              price: "£65", 
              rating: "8.5", 
              details: ["Direct", "Air Peace", "Economy"], 
              isLocal: true, 
              image: "https://images.unsplash.com/photo-1524850041227-63dbb0abc4c1?q=80&w=800&auto=format&fit=crop" // Lagos Aviation / Airport vibe
            },
          ]
        };
      case BookingTab.STAYS:
        return {
          title: "Find your perfect stay",
          subtitle: "From luxury hotels to cozy apartments, find a home away from home.",
          bgImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
          deals: [
            { id: 'cs1', type: BookingTab.STAYS, title: "The Eko Hotel & Suites", location: "Victoria Island, Lagos", price: "£120 / night", rating: "9.0", details: ["Pool", "Gym", "Breakfast"], isLocal: true, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" },
            { id: 'cs2', type: BookingTab.STAYS, title: "Burj Al Arab Jumeirah", location: "Dubai, UAE", price: "£1,250 / night", rating: "9.8", details: ["Ultra-Luxury", "Spa", "Private Beach"], isLocal: false, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
            { id: 'cs3', type: BookingTab.STAYS, title: "Transcorp Hilton Abuja", location: "Maitama, Abuja", price: "£185 / night", rating: "9.1", details: ["Business", "Pool", "Central"], isLocal: true, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800" },
            { id: 'cs4', type: BookingTab.STAYS, title: "The Ritz-Carlton London", location: "Mayfair, London", price: "£450 / night", rating: "9.5", details: ["Historic", "Butler", "Luxury"], isLocal: false, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800" },
          ]
        };
      case BookingTab.CAR_RENTALS:
        return {
          title: "Rent a car for your journey",
          subtitle: "Flexible car rentals for business or leisure.",
          bgImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
          deals: [
            { id: 'cc1', type: BookingTab.CAR_RENTALS, title: "Toyota Prado SUV", location: "Lagos, Nigeria", price: "£65 / day", rating: "8.8", details: ["SUV", "With Driver", "AC"], isLocal: true, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" },
            { id: 'cc2', type: BookingTab.CAR_RENTALS, title: "Lexus RX 350", location: "Abuja, Nigeria", price: "£85 / day", rating: "9.2", details: ["Luxury", "SUV", "Automatic"], isLocal: true, image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop" },
            { id: 'cc3', type: BookingTab.CAR_RENTALS, title: "Tesla Model 3", location: "Dubai, UAE", price: "£45 / day", rating: "9.0", details: ["Electric", "Self Drive", "Autopilot"], isLocal: false, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop" },
            { id: 'cc4', type: BookingTab.CAR_RENTALS, title: "Mercedes G-Wagon", location: "London, UK", price: "£250 / day", rating: "9.6", details: ["Statement", "SUV", "V8"], isLocal: false, image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop" },
          ]
        };
      default:
        return { title: "Explore", subtitle: "", bgImage: "", deals: [] };
    }
  };

  const info = getPageInfo();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Dynamic Hero Section with Image Background */}
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-60 overflow-hidden bg-[#002D5B]">
        <div className="absolute inset-0 z-0">
          <img 
            src={info.bgImage} 
            alt={info.title}
            className="w-full h-full object-cover block"
          />
          {/* Multi-layered overlays for depth and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#002D5B]/80 via-transparent to-[#002D5B]"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-[#1F93D0] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase text-white tracking-widest">
                Premium {type} Gateway
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight uppercase tracking-tighter drop-shadow-2xl">
              {info.title}
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-12 max-w-2xl leading-relaxed drop-shadow-md">
              {info.subtitle}
            </p>
          </div>

          <div className="relative z-10 translate-y-32 lg:translate-y-40">
            <SearchForm activeTab={type} onSearch={onSearch} setActiveTab={setActiveTab} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 lg:py-48 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-[#002D5B] mb-6 uppercase tracking-tighter italic">Featured {type} Deals</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Handpicked offers verified by Ebony Bruce travel experts for premium quality and worldwide value.</p>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Pricing in GBP (£)</span>
             <div className="w-12 h-px bg-slate-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.deals.map((deal) => (
            <DealCard 
              key={deal.id}
              title={deal.title} 
              subtitle={deal.location} 
              price={deal.price}
              isLocal={deal.isLocal} 
              image={deal.image}
              // Fix: Added isSaved and onToggleSave to pass state to DealCard
              isSaved={savedItemIds.includes(deal.id)}
              onToggleSave={() => onToggleSave(deal.id)}
              onClick={() => onSelectItem(deal as any)}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section - Premium Cards */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#002D5B] uppercase tracking-tighter mb-4">Elite {type} Services</h2>
            <div className="w-24 h-2 bg-[#1F93D0] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Transparent Rates", 
                desc: "No hidden fees. Every price displayed is final and inclusive of all mandatory charges.",
                icon: (
                  <svg className="w-8 h-8 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                title: "Exclusive Inventory", 
                desc: "Direct access to private rates and curated properties not found on standard booking engines.",
                icon: (
                  <svg className="w-8 h-8 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              { 
                title: "VIP Assistance", 
                desc: "Concierge-level support from our UK team, ensuring your journey is seamless from start to finish.",
                icon: (
                  <svg className="w-8 h-8 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-[#1F93D0] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-[#002D5B] uppercase mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="bg-[#002D5B] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 uppercase tracking-tighter">Ready to secure your {type.toLowerCase()}?</h2>
           <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10">Our travel consultants and AI assistants are standby to finalize your premium arrangements.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-[#1F93D0] text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#1579af] transition-all shadow-2xl">Return to Search</button>
              <button onClick={() => onNavigate(View.CONTACT_PAGE)} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all">Contact Expert</button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
