
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>(BookingTab.FLIGHTS);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedItem, setSelectedItem] = useState<TravelItem | null>(null);

  const tabs = [
    BookingTab.STAYS,
    BookingTab.FLIGHTS,
    BookingTab.CAR_RENTALS
  ];

  // Featured items for the home page
  const homeFeaturedDeals: TravelItem[] = [
    { 
      id: 'h1', 
      type: BookingTab.FLIGHTS, 
      title: 'Lagos to Abuja', 
      location: 'Domestic Route', 
      price: 'NGN 85,000', 
      rating: '8.8', 
      details: ['Non-stop', 'Air Peace', 'Economy'],
      badge: 'Local Deal'
    },
    { 
      id: 'h2', 
      type: BookingTab.FLIGHTS, 
      title: 'London Getaway', 
      location: 'Lagos to London', 
      price: 'NGN 980,000', 
      rating: '9.0', 
      details: ['Round Trip', 'Direct Flight', 'Premium Economy'],
      badge: 'International'
    },
    { 
      id: 'h3', 
      type: BookingTab.STAYS, 
      title: 'Zanzibar Island', 
      location: 'Tanzania', 
      price: 'NGN 450,000', 
      rating: '9.4', 
      details: ['All-Inclusive', 'Private Beach', 'Luxury Villa'],
      badge: 'Exotic'
    },
    { 
      id: 'h4', 
      type: BookingTab.CAR_RENTALS, 
      title: 'Port Harcourt Special', 
      location: 'Rivers State', 
      price: 'NGN 35,000 / day', 
      rating: '8.5', 
      details: ['SUV Rental', 'With Driver', 'AC'],
      badge: 'Local Deal'
    }
  ];

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    // Sync activeTab when navigating to category pages
    if (view === View.STAYS_PAGE) setActiveTab(BookingTab.STAYS);
    if (view === View.FLIGHTS_PAGE) setActiveTab(BookingTab.FLIGHTS);
    if (view === View.CARS_PAGE) setActiveTab(BookingTab.CAR_RENTALS);
    window.scrollTo(0, 0);
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
    alert('Booking Confirmed! A confirmation email has been sent.');
    if (isLoggedIn) {
      handleNavigate(View.PROFILE);
    } else {
      handleNavigate(View.HOME);
    }
  };

  if (currentView === View.ADMIN_DASHBOARD && isAdminLoggedIn) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  const effectiveView = (currentView === View.ADMIN_DASHBOARD && !isAdminLoggedIn) 
    ? View.ADMIN_SIGN_IN 
    : currentView;

  const renderHome = () => (
    <>
      <section className="relative pt-16 pb-24 md:pb-32 border-b-2 border-black overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c05d?q=80&w=2070&auto=format&fit=crop" 
            alt="Travel background placeholder"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 relative">
            <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase leading-none bg-white inline-block px-2">
              Where will you go next?
            </h1>
            <br />
            <p className="text-xl md:text-2xl font-medium text-gray-800 max-w-2xl bg-white inline-block px-2">
              Simple, transparent travel booking with Ebony Bruce Travels.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-[-2px] relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-t-lg border-x-2 border-t-2 border-black transition-all ${
                  activeTab === tab
                    ? 'bg-gray-100 text-black border-b-gray-100'
                    : 'bg-white text-gray-400 border-b-black hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative z-10">
            <SearchForm activeTab={activeTab} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Partners Bar */}
      <section className="py-12 border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-8 text-center tracking-[0.3em]">Our Global Partners</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-30 grayscale font-black text-xl italic items-center">
            <span>AIR PEACE</span>
            <span>EMIRATES</span>
            <span>MARRIOTT</span>
            <span>HERTZ</span>
            <span>IBOM AIR</span>
            <span>HILTON</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase mb-1">Featured Deals</h2>
            <div className="w-24 h-2 bg-black"></div>
          </div>
          <div className="hidden md:block font-bold uppercase text-sm cursor-pointer border-b-2 border-black">
            Explore all deals
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeFeaturedDeals.map((deal) => (
            <DealCard 
              key={deal.id}
              title={deal.title} 
              subtitle={deal.location} 
              price={deal.price}
              isLocal={deal.badge?.includes('Local')} 
              onClick={() => handleSelectItem(deal)}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 mt-24 border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase mb-1">Top Rated Stays</h2>
            <p className="text-gray-600 font-medium">Explore boutique hotels and apartments in popular hubs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: 'Lagos', count: '1,240 properties', desc: 'From Victoria Island to Ikeja business hubs.' },
              { city: 'Dubai', count: '3,500+ properties', desc: 'Luxury resorts and sky-high apartments.' },
              { city: 'Abuja', count: '850 properties', desc: 'Central Area convenience and Maitama luxury.' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border-2 border-black p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                onClick={handleSearch}
              >
                <div className="w-full aspect-video border-2 border-black placeholder-image mb-4 flex items-center justify-center font-black text-2xl opacity-20">X</div>
                <h3 className="font-black uppercase text-xl">{item.city}</h3>
                <div className="text-xs font-bold text-gray-400 mb-2 uppercase">{item.count}</div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="border-4 border-black p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4">Our Specialized Services</h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">Ebony Bruce Travels Limited provides more than just bookings. We offer integrated logistics, admission processing, and curated travel experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-black p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-lg">L</div>
              </div>
              <h3 className="text-xl font-black uppercase">DHL Franchised Logistics</h3>
              <p className="text-sm text-gray-600 font-medium">Global shipping and localized logistics services powered by our official DHL franchise partnership.</p>
              <button 
                onClick={() => handleNavigate(View.DHL_LOGISTICS)}
                className="text-xs font-black uppercase underline decoration-2 hover:text-gray-400"
              >
                Learn More
              </button>
            </div>

            <div className="border-2 border-black p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-lg">A</div>
              </div>
              <h3 className="text-xl font-black uppercase">Speedy Admission Processing</h3>
              <p className="text-sm text-gray-600 font-medium">Expert guidance to secure your international university admissions with unprecedented speed and accuracy.</p>
              <button 
                onClick={() => handleNavigate(View.ADMISSION_PROCESSING)}
                className="text-xs font-black uppercase underline decoration-2 hover:text-gray-400"
              >
                Learn More
              </button>
            </div>

            <div className="border-2 border-black p-8 flex flex-col items-center text-center space-y-4 hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-lg">T</div>
              </div>
              <h3 className="text-xl font-black uppercase">Tours</h3>
              <p className="text-sm text-gray-600 font-medium">Bespoke local and international tours curated to provide authentic cultural immersion and leisure.</p>
              <button 
                onClick={() => handleNavigate(View.TOURS_PAGE)}
                className="text-xs font-black uppercase underline decoration-2 hover:text-gray-400"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => handleNavigate(View.CONTACT_PAGE)}
              className="bg-black text-white px-10 py-4 font-black uppercase text-sm border-2 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Inquire About Services
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase mb-16 text-center">Traveler Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Chinedu A.", location: "Lagos", quote: "The most transparent booking platform I've used in Nigeria. No hidden fees." },
              { name: "Fatima B.", location: "Abuja", quote: "Booking my vacation to Dubai was so easy. The AI assistant helped with every step." },
              { name: "John D.", location: "London", quote: "Excellent service and great car rental rates in Port Harcourt. Highly recommended." }
            ].map((t, idx) => (
              <div key={idx} className="border-2 border-black p-8 relative bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-6xl absolute -top-4 -left-2 font-black opacity-10">"</span>
                <p className="text-sm font-medium italic mb-8 relative z-10">"{t.quote}"</p>
                <div className="flex items-center space-x-3 border-t-2 border-black pt-6">
                  <div className="w-10 h-10 border-2 border-black bg-gray-100 flex items-center justify-center font-black text-xs uppercase">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-black uppercase text-[10px] leading-none mb-1">{t.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Stay updated on travel deals</h2>
          <p className="text-gray-400 font-medium uppercase text-xs tracking-widest">Join 50,000+ travelers receiving weekly exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-0 border-4 border-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            <input 
              type="email" 
              placeholder="YOUR@EMAIL.COM" 
              className="flex-grow p-5 bg-white text-black outline-none font-black uppercase text-sm"
            />
            <button className="bg-black text-white px-10 py-5 font-black uppercase text-sm border-l-4 border-white hover:bg-white hover:text-black transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderContent = () => {
    switch (effectiveView) {
      case View.HOME:
        return renderHome();
      case View.STAYS_PAGE:
        return <CategoryPage type={BookingTab.STAYS} onSearch={handleSearch} onSelectItem={handleSelectItem} />;
      case View.FLIGHTS_PAGE:
        return <CategoryPage type={BookingTab.FLIGHTS} onSearch={handleSearch} onSelectItem={handleSelectItem} />;
      case View.CARS_PAGE:
        return <CategoryPage type={BookingTab.CAR_RENTALS} onSearch={handleSearch} onSelectItem={handleSelectItem} />;
      case View.SIGN_IN:
        return <SignInPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case View.REGISTER:
        return <RegisterPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case View.PROFILE:
        return <ProfilePage onLogout={handleLogout} userName={userName} />;
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
      
      // New Specialized Service Views
      case View.DHL_LOGISTICS:
        return (
          <ServicePage 
            title="DHL Franchised Logistics"
            subtitle="Global Logistics Partner"
            description="As an official DHL Franchise partner, Ebony Bruce Travels Limited provides seamless international shipping and logistics solutions. We bridge the gap between Nigeria and the world."
            features={[
              "International Express Delivery",
              "Import & Export Services",
              "Document & Parcel Tracking",
              "Customs Clearance Support",
              "Packaging Solutions",
              "Localized Pickup & Drop-off"
            ]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.ADMISSION_PROCESSING:
        return (
          <ServicePage 
            title="Speedy Admission Processing"
            subtitle="Global Education Experts"
            description="Our specialized academic consultants fast-track your journey to international education. We handle the complexities of university applications so you can focus on your future."
            features={[
              "500+ Partner Institutions",
              "Document Authentication",
              "Statement of Purpose Prep",
              "Standardized Test Guidance",
              "Scholarship Search",
              "Offer Letter Tracking"
            ]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.TOURS_PAGE:
        return (
          <ServicePage 
            title="Curated Tours"
            subtitle="Authentic Experiences"
            description="Experience the world through the lens of Ebony Bruce Travels. Our tours are designed to go beyond typical sightseeing, offering deep cultural immersion and luxury leisure."
            features={[
              "Guided Cultural Tours",
              "Luxury Safari Packages",
              "Group Travel Coordination",
              "Corporate Retreats",
              "Educational Field Trips",
              "Bespoke Itinerary Planning"
            ]}
            onBack={() => handleNavigate(View.HOME)}
          />
        );
      case View.CONTACT_PAGE:
        return <ContactPage onBack={() => handleNavigate(View.HOME)} />;
      case View.ABOUT_US:
        return <AboutUsPage onBack={() => handleNavigate(View.HOME)} />;

      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
      
      {/* Global Chat */}
      <Chat />
    </div>
  );
};

export default App;
