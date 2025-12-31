
import React, { useState } from 'react';
import { BookingTab, View, TravelItem } from './types';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DealCard from './components/DealCard';
import Footer from './components/Footer';
import SignInPage from './components/SignInPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AdminSignInPage from './components/AdminSignInPage';
import AdminDashboard from './components/AdminDashboard';
import SearchResults from './components/SearchResults';
import DetailView from './components/DetailView';
import CheckoutPage from './components/CheckoutPage';
import CategoryPage from './components/CategoryPage';
import Chat from './components/Chat';
import ServicePage from './components/ServicePage';
import ContactPage from './components/ContactPage';
import AboutUsPage from './components/AboutUsPage';
import ExclusiveOfferCard from './components/ExclusiveOfferCard';
import TrendingCard from './components/TrendingCard';
import ConfirmationView from './components/ConfirmationView';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>(BookingTab.FLIGHTS);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedItem, setSelectedItem] = useState<TravelItem | null>(null);
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['h1', 'h2']);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (view === View.STAYS_PAGE) setActiveTab(BookingTab.STAYS);
    if (view === View.FLIGHTS_PAGE) setActiveTab(BookingTab.FLIGHTS);
    if (view === View.CARS_PAGE) setActiveTab(BookingTab.CAR_RENTALS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name || 'James');
    handleNavigate(View.PROFILE);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    handleNavigate(View.HOME);
  };

  const handleToggleSave = (id: string) => {
    setSavedItemIds(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    handleNavigate(View.ADMIN_DASHBOARD);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    handleNavigate(View.HOME);
  };

  const handleSearch = () => {
    handleNavigate(View.RESULTS);
  };

  const handleSelectItem = (item: TravelItem) => {
    setSelectedItem(item);
    handleNavigate(View.DETAILS);
  };

  const handleStartBooking = () => {
    handleNavigate(View.CHECKOUT);
  };

  const handleCompleteBooking = () => {
    setCurrentView(View.CONFIRMATION);
  };

  if (currentView === View.ADMIN_DASHBOARD && isAdminLoggedIn) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  const effectiveView = (currentView === View.ADMIN_DASHBOARD && !isAdminLoggedIn) 
    ? View.ADMIN_SIGN_IN 
    : currentView;

  const renderHome = () => (
    <div className="animate-in fade-in duration-1000">
      {/* Premium Cinematic Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-32 md:pb-48 overflow-visible bg-black min-h-[700px] md:min-h-[850px] flex flex-col justify-center">
        {/* Background Image - Professional International Terminal / Travel Hub */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2000" 
            alt="Ebony Bruce Premium Global Hub"
            className="w-full h-full object-cover opacity-70"
          />
          {/* High-Contrast Editorial Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8FAFC]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 w-full">
          <div className="max-w-4xl mb-8 md:mb-12">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-3 px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 mb-6 md:mb-10 shadow-2xl">
              <span className="w-2 h-2 bg-[#1F93D0] rounded-full animate-pulse"></span>
              <span className="text-[9px] md:text-[10px] font-black uppercase text-white tracking-[0.3em]">
                Premium Global Travel Gateway
              </span>
            </div>

            <div className="space-y-2 md:space-y-3 mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.15] md:leading-[1.1]">
                Where Global <br />
                Travel Becomes <br />
                <span className="text-[#1F93D0]">Easy</span>
              </h1>
            </div>
            
            <p className="text-base md:text-xl text-white/90 font-bold mb-4 md:mb-6 drop-shadow-lg max-w-xl border-l-2 border-[#1F93D0]/50 pl-4 md:pl-6 tracking-wide leading-relaxed">
              Elite logistics and bespoke travel solutions <br /> for leadership and refined global citizens.
            </p>
          </div>

          <div className="relative z-20 translate-y-16 md:translate-y-40">
            <SearchForm activeTab={activeTab} setActiveTab={setActiveTab} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32 py-24 md:py-32">
        
        {/* Featured Offers Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-[#1F93D0] uppercase tracking-[0.4em]">Curated Selections</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic">Exclusive This Season</h2>
            </div>
            <button 
              onClick={() => handleNavigate(View.RESULTS)}
              className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#002D5B] hover:text-white transition-all w-full md:w-auto"
            >
              Explore All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <ExclusiveOfferCard 
              title="Kyoto Serenity" 
              badge="30% OFF" 
              description="Discover the timeless beauty of Japan with our premium flight and boutique ryokan packages."
              image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800"
              linkText="Secure Offer"
              onClick={handleSearch}
            />
            <ExclusiveOfferCard 
              title="The Amalfi Coast" 
              description="A curated 10-day residency in Positano. Includes private transfers and coastal excursions."
              image="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800"
              linkText="View Residency"
              onClick={() => handleNavigate(View.STAYS_PAGE)}
            />
            <ExclusiveOfferCard 
              title="European Grand Tour" 
              description="Unlimited premium car hire across the Schengen zone. Luxury SUV fleet now available."
              image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800"
              linkText="Book Fleet"
              onClick={() => handleNavigate(View.CARS_PAGE)}
            />
          </div>
        </section>

        {/* Global Pulse Grid */}
        <section>
          <div className="mb-12 md:mb-16">
            <span className="text-[10px] font-black text-[#1F93D0] uppercase tracking-[0.4em] mb-4 block">Popular Destinations</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#002D5B] uppercase tracking-tighter italic">Global Pulse</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <TrendingCard city="Paris" country="France" price="$499" image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800" onClick={handleSearch} />
            <TrendingCard city="Bali" country="Indonesia" price="$350" image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800" onClick={handleSearch} />
            <TrendingCard city="New York" country="USA" price="$420" image="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800" onClick={handleSearch} />
            <TrendingCard city="Venice" country="Italy" price="$299" image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800" onClick={handleSearch} />
          </div>
        </section>

        {/* Specialized Ecosystem Section */}
        <section className="bg-[#002D5B] rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2"></div>
          
          <div className="max-w-3xl mb-12 md:mb-20 relative z-10">
            <span className="text-[10px] font-black text-[#1F93D0] uppercase tracking-[0.4em] mb-4 block">Unified Logistics</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-8">Integrated Global Services</h2>
            <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed">
              We leverage our international network to facilitate more than just travel. We enable global growth through specialized logistics and education pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {[
              { 
                title: "DHL Logistics", 
                tag: "Priority Port", 
                desc: "Official franchise for express global shipping and priority freight handling.",
                view: View.DHL_LOGISTICS,
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 13h-4l-2 4h-3l1-2H10l-1 2H6l-2-4H0v-2h4.5l2 4h2l-1-2h4l1 2h2l-1-2H22v2z"/></svg>
              },
              { 
                title: "Admissions", 
                tag: "Global Pathways", 
                desc: "Expert university placement and visa processing for UK, Canada, and USA.",
                view: View.ADMISSION_PROCESSING,
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              },
              { 
                title: "Signature Tours", 
                tag: "Curated Travel", 
                desc: "Bespoke itineraries for corporate retreats and private discovery groups.",
                view: View.TOURS_PAGE,
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.654M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white hover:text-[#002D5B] transition-all"
                onClick={() => handleNavigate(service.view)}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-[#1F93D0]/20 flex items-center justify-center text-[#1F93D0] mb-6 md:mb-8 group-hover:bg-[#002D5B] group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">{service.title}</h3>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 md:mb-6">{service.tag}</p>
                <p className="text-sm opacity-60 group-hover:opacity-80 leading-relaxed font-medium mb-8 md:mb-10">{service.desc}</p>
                <span className="text-[10px] font-black uppercase tracking-widest border-b border-current pb-1">Learn More →</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trust & Verification Section */}
      <section className="bg-slate-50 py-24 md:py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-white rounded-2xl flex items-center justify-center text-[#1F93D0] shadow-xl shadow-blue-500/5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-xs md:text-sm font-black text-[#002D5B] uppercase tracking-widest">Global Price Guarantee</h3>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed max-w-[280px]">We provide real-time price matching for all international flights and premium stays.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-white rounded-2xl flex items-center justify-center text-[#1F93D0] shadow-xl shadow-blue-500/5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h3 className="text-xs md:text-sm font-black text-[#002D5B] uppercase tracking-widest">Enterprise Security</h3>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed max-w-[280px]">Your payment and personal data are protected by bank-grade encryption protocols.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-white rounded-2xl flex items-center justify-center text-[#1F93D0] shadow-xl shadow-blue-500/5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 className="text-xs md:text-sm font-black text-[#002D5B] uppercase tracking-widest">24/7 Priority Concierge</h3>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed max-w-[280px]">Access our human specialists anytime, anywhere for support with your global itinerary.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (effectiveView) {
      case View.HOME:
        return renderHome();
      case View.STAYS_PAGE:
      case View.FLIGHTS_PAGE:
      case View.CARS_PAGE:
        return (
          <CategoryPage 
            type={activeTab} 
            onSearch={handleSearch} 
            onSelectItem={handleSelectItem} 
            setActiveTab={setActiveTab}
            onNavigate={handleNavigate}
            savedItemIds={savedItemIds}
            onToggleSave={handleToggleSave}
          />
        );
      case View.SIGN_IN:
        return <SignInPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case View.REGISTER:
        return <RegisterPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case View.PROFILE:
        return <ProfilePage onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} savedItemIds={savedItemIds} onToggleSave={handleToggleSave} />;
      case View.ADMIN_SIGN_IN:
        return <AdminSignInPage onAdminLogin={handleAdminLogin} onNavigate={handleNavigate} />;
      case View.RESULTS:
        return <SearchResults type={activeTab} onSelectItem={handleSelectItem} />;
      case View.DETAILS:
        return selectedItem ? (
          <DetailView 
            item={selectedItem} 
            onBack={() => handleNavigate(View.RESULTS)} 
            onBook={handleStartBooking}
          />
        ) : renderHome();
      case View.CHECKOUT:
        return selectedItem ? (
          <CheckoutPage 
            item={selectedItem}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onCancel={() => handleNavigate(View.DETAILS)}
            onComplete={handleCompleteBooking}
          />
        ) : renderHome();
      case View.CONFIRMATION:
        return selectedItem ? (
          <ConfirmationView 
            item={selectedItem}
            userName={userName}
            onNavigate={handleNavigate}
          />
        ) : renderHome();
      case View.DHL_LOGISTICS:
        return (
          <ServicePage 
            title="DHL Logistics"
            subtitle="Global Logistics Partner"
            description="As an official DHL Franchise partner, Ebony Bruce Travels Limited provides seamless international shipping and priority cargo handling."
            features={["International Express", "Import & Export", "Package Tracking", "Customs Support", "Bulk Freight", "Secure Warehousing"]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.ADMISSION_PROCESSING:
        return (
          <ServicePage 
            title="Admission Processing"
            subtitle="Global Education"
            description="Our specialized consultants fast-track your journey to international education, handling applications for premium institutions worldwide."
            features={["Partner Institutions", "Document Support", "SOP Preparation", "Scholarship Search", "Visa Guidance", "Pre-departure Briefing"]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.TOURS_PAGE:
        return (
          <ServicePage 
            title="Curated Tours"
            subtitle="Authentic Experiences"
            description="Experience the world through the lens of Ebony Bruce Travels. We curate bespoke itineraries that blend culture with luxury."
            features={["Guided Tours", "Safari Packages", "Group Travel", "Bespoke Itineraries", "Private Transport", "Luxury Lodging"]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.CONTACT_PAGE:
        return <ContactPage onBack={() => handleNavigate(View.HOME)} />;
      case View.ABOUT_US:
        return <AboutUsPage onBack={() => handleNavigate(View.HOME)} />;
      case View.FORGOT_PASSWORD:
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header 
        onNavigate={handleNavigate} 
        currentView={effectiveView} 
        isLoggedIn={isLoggedIn} 
        userName={userName}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Chat />
    </div>
  );
};

export default App;
