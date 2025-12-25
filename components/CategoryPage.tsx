
import React from 'react';
import { BookingTab, TravelItem } from '../types';
import SearchForm from './SearchForm';
import DealCard from './DealCard';

interface CategoryPageProps {
  type: BookingTab;
  onSearch: () => void;
  onSelectItem: (item: TravelItem) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ type, onSearch, onSelectItem }) => {
  const getPageInfo = () => {
    switch (type) {
      case BookingTab.FLIGHTS:
        return {
          title: "Book your next flight",
          subtitle: "Discover the best deals on international and domestic flights.",
          deals: [
            { id: 'cf1', type: BookingTab.FLIGHTS, title: "Lagos to London", location: "London, UK", price: "NGN 1,200,000", rating: "9.1", details: ["Direct", "Air Peace", "Economy"], isLocal: false },
            { id: 'cf2', type: BookingTab.FLIGHTS, title: "Abuja to Port Harcourt", location: "Rivers, Nigeria", price: "NGN 75,000", rating: "8.7", details: ["Direct", "Ibom Air", "Economy"], isLocal: true },
            { id: 'cf3', type: BookingTab.FLIGHTS, title: "Lagos to Dubai", location: "Dubai, UAE", price: "NGN 850,000", rating: "9.3", details: ["Round Trip", "Emirates", "Economy"], isLocal: false },
            { id: 'cf4', type: BookingTab.FLIGHTS, title: "Enugu to Lagos", location: "Lagos, Nigeria", price: "NGN 68,000", rating: "8.5", details: ["Direct", "Air Peace", "Economy"], isLocal: true },
          ]
        };
      case BookingTab.STAYS:
        return {
          title: "Find your perfect stay",
          subtitle: "From luxury hotels to cozy apartments, find a home away from home.",
          deals: [
            { id: 'cs1', type: BookingTab.STAYS, title: "The Eko Hotel & Suites", location: "Victoria Island, Lagos", price: "NGN 120,000", rating: "9.0", details: ["Pool", "Gym", "Breakfast"], isLocal: true },
            { id: 'cs2', type: BookingTab.STAYS, title: "Burj Al Arab Jumeirah", location: "Dubai, UAE", price: "NGN 1,200,000", rating: "9.8", details: ["Ultra-Luxury", "Spa", "Private Beach"], isLocal: false },
            { id: 'cs3', type: BookingTab.STAYS, title: "Transcorp Hilton Abuja", location: "Maitama, Abuja", price: "NGN 180,000", rating: "9.1", details: ["Business", "Pool", "Central"], isLocal: true },
            { id: 'cs4', type: BookingTab.STAYS, title: "The Ritz-Carlton London", location: "Mayfair, London", price: "NGN 1,500,000", rating: "9.5", details: ["Historic", "Butler", "Luxury"], isLocal: false },
          ]
        };
      case BookingTab.CAR_RENTALS:
        return {
          title: "Rent a car for your journey",
          subtitle: "Flexible car rentals for business or leisure.",
          deals: [
            { id: 'cc1', type: BookingTab.CAR_RENTALS, title: "Toyota Prado SUV", location: "Lagos, Nigeria", price: "NGN 65,000", rating: "8.8", details: ["SUV", "With Driver", "AC"], isLocal: true },
            { id: 'cc2', type: BookingTab.CAR_RENTALS, title: "Lexus RX 350", location: "Abuja, Nigeria", price: "NGN 85,000", rating: "9.2", details: ["Luxury", "SUV", "Automatic"], isLocal: true },
            { id: 'cc3', type: BookingTab.CAR_RENTALS, title: "Tesla Model 3", location: "Dubai, UAE", price: "NGN 45,000", rating: "9.0", details: ["Electric", "Self Drive", "Autopilot"], isLocal: false },
            { id: 'cc4', type: BookingTab.CAR_RENTALS, title: "Mercedes G-Wagon", location: "London, UK", price: "NGN 250,000", rating: "9.6", details: ["Statement", "SUV", "V8"], isLocal: false },
          ]
        };
      default:
        return { title: "Explore", subtitle: "", deals: [] };
    }
  };

  const info = getPageInfo();

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-white border-b-2 border-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">{info.title}</h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl">{info.subtitle}</p>
          </div>
          <SearchForm activeTab={type} onSearch={onSearch} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase mb-1">Featured {type} Deals</h2>
            <div className="w-24 h-2 bg-black"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.deals.map((deal) => (
            <DealCard 
              key={deal.id}
              title={deal.title} 
              subtitle={deal.location} 
              price={deal.price}
              isLocal={deal.isLocal} 
              onClick={() => onSelectItem(deal as any)}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-20 border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Why book with Ebony Bruce?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div>
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-black text-2xl mx-auto mb-6">1</div>
              <h3 className="font-black uppercase mb-2">Transparency</h3>
              <p className="text-sm text-gray-600 font-medium">No hidden fees. What you see is exactly what you pay.</p>
            </div>
            <div>
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-black text-2xl mx-auto mb-6">2</div>
              <h3 className="font-black uppercase mb-2">Global Access</h3>
              <p className="text-sm text-gray-600 font-medium">Connect to thousands of providers in Nigeria and worldwide.</p>
            </div>
            <div>
              <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-black text-2xl mx-auto mb-6">3</div>
              <h3 className="font-black uppercase mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600 font-medium">Our travel experts and AI assistant are always ready to help.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
