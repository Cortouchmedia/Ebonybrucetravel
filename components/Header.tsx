
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
  currentView: View;
  isLoggedIn?: boolean;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, isLoggedIn, userName }) => {
  const [currency, setCurrency] = useState('NGN');
  const [language, setLanguage] = useState('EN');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const currencies = [
    'NGN', 'USD', 'GBP', 'EUR', 'CAD', 'ZAR', 'KES', 'GHS', 
    'AED', 'JPY', 'CNY', 'AUD', 'CHF', 'INR', 'BRL', 'SAR'
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'Français' },
    { code: 'YO', name: 'Yorùbá' },
    { code: 'IG', name: 'Igbo' },
    { code: 'HA', name: 'Hausa' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ZH', name: '中文' },
    { code: 'AR', name: 'العربية' },
    { code: 'PT', name: 'Português' },
    { code: 'IT', name: 'Italiano' },
    { code: 'RU', name: 'Русский' },
    { code: 'JA', name: '日本語' },
    { code: 'KO', name: '한국어' },
    { code: 'TR', name: 'Türkçe' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'SW', name: 'Kiswahili' },
    { code: 'NL', name: 'Nederlands' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Official Branding Logo */}
        <div 
          className="flex items-center cursor-pointer h-full py-2"
          onClick={() => onNavigate(View.HOME)}
        >
          <div className="h-full flex items-center">
            {/* Using the provided logo image */}
            <img 
              src="https://api.deepai.org/job-view-file/6e088746-9d33-470a-8671-6780c98e727f/outputs/output.jpg" 
              alt="Ebony Bruce Travels Limited" 
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                // High-fidelity CSS fallback if external image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'flex items-center space-x-2';
                  fallback.innerHTML = `
                    <div class="w-10 h-10 border-2 border-black flex items-center justify-center bg-black text-white relative">
                      <span class="font-black text-xl">E</span>
                      <div class="absolute -top-1 -right-1 w-3 h-3 bg-white border border-black transform rotate-45"></div>
                    </div>
                    <div class="flex flex-col leading-tight">
                      <span class="font-black text-xs uppercase tracking-tight">Ebony Bruce</span>
                      <span class="font-bold text-[8px] uppercase tracking-tighter text-gray-500">Travels Limited</span>
                    </div>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="hidden md:flex items-center space-x-1 font-bold text-xs uppercase">
          <button 
            onClick={() => onNavigate(View.STAYS_PAGE)}
            className={`px-3 py-2 border-2 border-transparent hover:border-black transition-all ${currentView === View.STAYS_PAGE ? 'bg-black text-white border-black' : ''}`}
          >
            Stays
          </button>
          <button 
            onClick={() => onNavigate(View.FLIGHTS_PAGE)}
            className={`px-3 py-2 border-2 border-transparent hover:border-black transition-all ${currentView === View.FLIGHTS_PAGE ? 'bg-black text-white border-black' : ''}`}
          >
            Flights
          </button>
          <button 
            onClick={() => onNavigate(View.CARS_PAGE)}
            className={`px-3 py-2 border-2 border-transparent hover:border-black transition-all ${currentView === View.CARS_PAGE ? 'bg-black text-white border-black' : ''}`}
          >
            Car Rentals
          </button>
        </nav>

        {/* Right Nav */}
        <div className="flex items-center space-x-4 md:space-x-6 text-sm font-medium">
          <div className="hidden sm:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative" ref={currencyRef}>
              <div 
                className="flex items-center space-x-1 cursor-pointer hover:underline text-xs font-bold"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                <span>{currency}</span>
                <span className={`text-[8px] transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}>▼</span>
              </div>
              {showCurrencyDropdown && (
                <div className="absolute top-full right-0 mt-2 w-28 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 max-h-64 overflow-y-auto">
                  {currencies.map((curr) => (
                    <div 
                      key={curr}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 uppercase text-[10px] font-bold ${currency === curr ? 'bg-gray-200' : ''}`}
                      onClick={() => {
                        setCurrency(curr);
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      {curr}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <div 
                className="flex items-center space-x-1 cursor-pointer hover:underline text-xs font-bold"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <span>{language}</span>
                <span className={`text-[8px] transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}>▼</span>
              </div>
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <div 
                      key={lang.code}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-[10px] font-bold flex justify-between items-center ${language === lang.code ? 'bg-gray-200' : ''}`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                    >
                      <span className="truncate mr-2">{lang.name}</span>
                      <span className="text-[8px] text-gray-400 shrink-0">{lang.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div 
                className={`cursor-pointer border-2 border-black px-3 py-1 hover:bg-gray-100 transition-colors font-bold uppercase text-[10px] ${currentView === View.REGISTER ? 'bg-gray-200' : ''}`}
                onClick={() => onNavigate(View.REGISTER)}
              >
                Register
              </div>
              <div 
                className={`cursor-pointer bg-black text-white px-3 py-1 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase text-[10px] ${currentView === View.SIGN_IN ? 'bg-white text-black' : ''}`}
                onClick={() => onNavigate(View.SIGN_IN)}
              >
                Sign In
              </div>
            </div>
          ) : (
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:underline"
              onClick={() => onNavigate(View.PROFILE)}
            >
              <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-black text-xs">
                {userName?.charAt(0).toUpperCase()}
              </div>
              <span className="font-black uppercase text-[10px] hidden sm:inline">Hi, {userName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
