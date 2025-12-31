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

  const currencies = ['NGN', 'USD', 'GBP', 'EUR', 'CAD'];
  const languages = ['EN', 'FR', 'ES'];

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[100] h-20 flex items-center shadow-sm" role="banner">
      <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate(View.HOME)}
          role="link"
          aria-label="Ebony Bruce Travels Home"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate(View.HOME)}
        >
    <img
    src="/images/logo1.png"   
    alt="Ebony Bruce Travels Logo"
    className="mr-4 h-12 w-auto"  
  />
          
          
        </div>

        {/* Main Nav */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary Navigation">
          {[
            { id: View.STAYS_PAGE, label: 'Stays' },
            { id: View.FLIGHTS_PAGE, label: 'Flights' },
            { id: View.CARS_PAGE, label: 'Cars' }
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => onNavigate(nav.id)}
              aria-current={currentView === nav.id ? 'page' : undefined}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F93D0]
                ${currentView === nav.id ? 'bg-blue-50 text-[#1F93D0]' : 'text-gray-500 hover:text-[#1F93D0] hover:bg-gray-50'}`}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        {/* Utilities */}
        <div className="flex items-center space-x-8">
          
          {/* Language Selector */}
          <div className="relative hidden sm:block" ref={languageRef}>
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              aria-haspopup="listbox"
              aria-expanded={showLanguageDropdown}
              aria-label={`Current language: ${language}. Click to change.`}
              className="flex items-center space-x-1.5 text-gray-700 font-bold text-xs hover:text-[#1F93D0] focus:outline-none focus:ring-2 focus:ring-[#1F93D0] rounded-lg px-2 py-1"
            >
              <span>{language}</span>
              <svg className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-full mt-4 right-0 w-32 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50" role="listbox">
                {languages.map(lang => (
                  <button 
                    key={lang} 
                    onClick={() => { setLanguage(lang); setShowLanguageDropdown(false); }} 
                    role="option"
                    aria-selected={language === lang}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative hidden sm:block" ref={currencyRef}>
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              aria-haspopup="listbox"
              aria-expanded={showCurrencyDropdown}
              aria-label={`Current currency: ${currency}. Click to change.`}
              className="flex items-center space-x-1.5 text-gray-700 font-bold text-xs hover:text-[#1F93D0] focus:outline-none focus:ring-2 focus:ring-[#1F93D0] rounded-lg px-2 py-1"
            >
              <span>{currency}</span>
              <svg className={`w-3 h-3 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCurrencyDropdown && (
              <div className="absolute top-full mt-4 right-0 w-32 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50" role="listbox">
                {currencies.map(curr => (
                  <button 
                    key={curr} 
                    onClick={() => { setCurrency(curr); setShowCurrencyDropdown(false); }} 
                    role="option"
                    aria-selected={currency === curr}
                    className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => onNavigate(View.SIGN_IN)}
                  className="text-xs font-bold text-gray-700 hover:text-[#1F93D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F93D0] rounded-lg px-2 py-1"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => onNavigate(View.REGISTER)}
                  className="bg-[#1F93D0] text-white px-6 py-3.5 rounded-xl text-xs font-bold hover:bg-[#1579af] transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F93D0]"
                >
                  Register
                </button>
              </>
            ) : (
              <button 
                onClick={() => onNavigate(View.PROFILE)}
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#1F93D0] rounded-full p-1"
                aria-label={`View profile for ${userName}`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center font-bold text-[#1F93D0] border border-blue-100 group-hover:bg-[#1F93D0] group-hover:text-white transition-colors" aria-hidden="true">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-gray-700 hidden sm:inline">{userName}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;