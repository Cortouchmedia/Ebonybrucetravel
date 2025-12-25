
import React from 'react';
import { View } from '../types';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const columns = [
    { 
      title: 'Support', 
      links: [
        { label: 'Help Center' },
        { label: 'Safety Information' },
        { label: 'Cancellation options' },
        { label: 'Our COVID-19 Response' }
      ] 
    },
    { 
      title: 'Company', 
      links: [
        { label: 'About us', view: View.ABOUT_US },
        { label: 'Careers' },
        { label: 'Press' },
        { label: 'Policies' },
        { label: 'Privacy' }
      ] 
    },
    { 
      title: 'Destinations', 
      links: [
        { label: 'Nigeria' },
        { label: 'International' },
        { label: 'Cities' },
        { label: 'Airports' },
        { label: 'Hotels', view: View.STAYS_PAGE }
      ] 
    },
    { 
      title: 'Booking', 
      links: [
        { label: 'Flights', view: View.FLIGHTS_PAGE },
        { label: 'Car Rentals', view: View.CARS_PAGE },
        { label: 'Mobile App' },
        { label: 'Affiliates' }
      ] 
    }
  ];

  const handleLinkClick = (view?: View) => {
    if (view && onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-gray-50 border-t-2 border-black pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold uppercase text-xs tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li 
                    key={lIdx} 
                    onClick={() => handleLinkClick(link.view)}
                    className={`text-sm text-gray-600 hover:text-black cursor-pointer underline decoration-gray-300 ${link.view ? 'font-bold' : ''}`}
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <div className="flex flex-col md:flex-row md:space-x-4 font-medium items-center md:items-start">
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => onNavigate && onNavigate(View.HOME)}
            >
              © 2024 Ebony Bruce Travels Inc.
            </span>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <span className="cursor-pointer hover:underline">Privacy</span>
              <span className="cursor-pointer hover:underline">Terms</span>
              <span 
                className="cursor-pointer font-black uppercase text-[10px] bg-black text-white px-2 py-0.5"
                onClick={() => onNavigate && onNavigate(View.ADMIN_SIGN_IN)}
              >
                Admin Portal
              </span>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="flex space-x-2 font-bold uppercase text-xs">
              <span className="cursor-pointer">Currency: NGN</span>
              <span className="cursor-pointer">Language: EN</span>
            </div>
            <div className="flex space-x-3">
              <div className="w-5 h-5 border border-black rounded-full"></div>
              <div className="w-5 h-5 border border-black rounded-full"></div>
              <div className="w-5 h-5 border border-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
