
import React, { useState } from 'react';

interface ProfilePageProps {
  onLogout: () => void;
  userName: string;
}

type SubView = 'overview' | 'personal' | 'security' | 'payments' | 'privacy' | 'emails' | 'genius' | 'stays' | 'flights' | 'cars' | 'rewards' | 'wallet' | 'saved' | 'my_bookings';

interface Transaction {
  date: string;
  desc: string;
  amount: string;
  type: 'credit' | 'usage';
  gateway?: string;
}

interface SavedItem {
  id: string;
  type: 'stay' | 'flight' | 'car';
  title: string;
  location: string;
  price: string;
}

// Simple Wireframe SVG Icons
const Icons = {
  Personal: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Stays: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/><line x1="12" y1="15" x2="12" y2="15"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
  ),
  Flights: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
  ),
  Cars: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
  ),
  Security: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Payments: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
  ),
  Privacy: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Emails: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  Genius: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Reward: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
  ),
  Wallet: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><rect x="14" y="12" width="8" height="4" rx="2"/></svg>
  ),
  Saved: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  Bookings: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  )
};

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, userName }) => {
  const [subView, setSubView] = useState<SubView>('overview');
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const [creditAmountInput, setCreditAmountInput] = useState('');
  const [creditRegion, setCreditRegion] = useState<'local' | 'international'>('local');
  const [creditError, setCreditError] = useState<string | null>(null);
  const [savedTab, setSavedTab] = useState<'stay' | 'flight' | 'car'>('stay');
  const [bookingTab, setBookingTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  // Personal Info state
  const [personalInfo, setPersonalInfo] = useState({
    name: userName,
    email: `${userName.toLowerCase()}@example.com`,
    nationality: 'Nigerian'
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  
  // Dynamic balance states
  const [travelCredits, setTravelCredits] = useState(120000);
  const [pendingRefunds, setPendingRefunds] = useState(30000);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { date: 'Oct 15, 2024', desc: 'Credit Added via Paystack', amount: '+ NGN 50,000.00', type: 'credit', gateway: 'Paystack' },
    { date: 'Oct 12, 2024', desc: 'Hotel Booking (Grand Lagos Hotel)', amount: '- NGN 20,000.00', type: 'usage' },
    { date: 'Oct 05, 2024', desc: 'Refund for Flight Ticket Cancellation', amount: '+ NGN 70,000.00', type: 'credit', gateway: 'Stripe' },
    { date: 'Sep 28, 2024', desc: 'Initial Wallet Top-up', amount: '+ NGN 50,000.00', type: 'credit', gateway: 'Paystack' },
  ]);

  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    { id: '1', type: 'stay', title: 'The Eko Hotels & Suites', location: 'Victoria Island, Lagos', price: 'NGN 150,000 / night' },
    { id: '2', type: 'flight', title: 'Lagos (LOS) to London (LHR)', location: 'Round Trip • Economy', price: 'NGN 980,000' },
    { id: '3', type: 'car', title: 'Toyota Prado SUV', location: 'Abuja Delivery', price: 'NGN 45,000 / day' },
    { id: '4', type: 'stay', title: 'Burj Al Arab Jumeirah', location: 'Dubai, UAE', price: 'NGN 1,200,000 / night' },
  ]);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const olderTransactions: Transaction[] = [
        { date: 'Sep 20, 2024', desc: 'Car Rental (Abuja SUV)', amount: '- NGN 45,000.00', type: 'usage' },
        { date: 'Sep 15, 2024', desc: 'Refund for Booking Modification', amount: '+ NGN 5,000.00', type: 'credit', gateway: 'Paystack' },
        { date: 'Sep 10, 2024', desc: 'Promotion: Welcome Bonus', amount: '+ NGN 10,000.00', type: 'credit' },
      ];
      setTransactions(prev => [...prev, ...olderTransactions]);
      setLoadingMore(false);
    }, 1000);
  };

  const handleAddCredits = (e: React.FormEvent) => {
    e.preventDefault();
    setCreditError(null);
    const amount = parseFloat(creditAmountInput);
    if (isNaN(amount) || amount <= 0) {
      setCreditError('Please enter a positive amount.');
      return;
    }
    const parts = creditAmountInput.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      setCreditError('Amount can have at most two decimal places.');
      return;
    }
    setTravelCredits(prev => prev + amount);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const gateway = creditRegion === 'local' ? 'Paystack' : 'Stripe';
    const newTx: Transaction = {
      date: dateStr,
      desc: `Credit Added via ${gateway}`,
      amount: `+ NGN ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      type: 'credit',
      gateway: gateway
    };
    setTransactions(prev => [newTx, ...prev]);
    setCreditAmountInput('');
    setShowAddCreditModal(false);
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCreditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditAmountInput(e.target.value);
    if (creditError) setCreditError(null);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleEditClick = (field: string, currentVal: string) => {
    setEditingField(field);
    setTempValue(currentVal);
  };

  const handleSaveClick = (field: string) => {
    setPersonalInfo({ ...personalInfo, [field]: tempValue });
    setEditingField(null);
  };

  const handleCancelClick = () => {
    setEditingField(null);
    setTempValue('');
  };

  const navCards = [
    { id: 'personal' as SubView, title: 'Personal details', desc: 'Update your info and find out how it\'s used.', icon: <Icons.Personal /> },
    { id: 'my_bookings' as SubView, title: 'My Bookings', desc: 'View and manage all your past and upcoming travel bookings.', icon: <Icons.Bookings /> },
    { id: 'saved' as SubView, title: 'Saved items', desc: 'View and manage your favorite trips, hotels, and cars.', icon: <Icons.Saved /> },
    { id: 'wallet' as SubView, title: 'Wallet', desc: 'Manage your credits, refunds, and travel balance.', icon: <Icons.Wallet /> },
    { id: 'stays' as SubView, title: 'Stays', desc: 'Detailed hotel and apartment booking history.', icon: <Icons.Stays /> },
    { id: 'flights' as SubView, title: 'Flights', desc: 'Flight tickets and check-in details history.', icon: <Icons.Flights /> },
    { id: 'cars' as SubView, title: 'Car rentals', desc: 'Vehicle rentals and pickup instructions history.', icon: <Icons.Cars /> },
    { id: 'rewards' as SubView, title: 'Rewards & Loyalty', desc: 'Track your loyalty points and earnable perks.', icon: <Icons.Reward /> },
    { id: 'security' as SubView, title: 'Security', desc: 'Adjust your security settings and passwords.', icon: <Icons.Security /> },
  ];

  const renderOverview = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navCards.map((card) => (
          <div 
            key={card.id}
            onClick={() => setSubView(card.id)}
            className={`group border-2 border-black p-6 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col h-full active:translate-x-1 active:translate-y-1`}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform origin-left text-black">
              {card.icon}
            </div>
            <h3 className="font-black uppercase text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-6 flex-grow">{card.desc}</p>
            <div className="text-xs font-black uppercase underline decoration-2 group-hover:text-gray-500">
              Manage {card.title.toLowerCase()}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-black pt-8 flex justify-between items-center">
        <div>
          <h4 className="font-black uppercase text-sm">Need to leave?</h4>
          <p className="text-xs text-gray-500">You can sign out of your account anytime.</p>
        </div>
        <button 
          onClick={onLogout}
          className="border-2 border-black px-6 py-2 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderMyBookings = () => (
    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-5xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black uppercase mb-1">My Bookings</h2>
          <p className="text-sm text-gray-500">Manage all your travel itineraries in one place.</p>
        </div>
        <button onClick={() => setSubView('overview')} className="text-xs font-black uppercase underline decoration-2">Back to account</button>
      </div>

      <div className="flex space-x-8 border-b-2 border-black mb-8 text-xs font-black uppercase">
        <div 
          className={`${bookingTab === 'upcoming' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
          onClick={() => setBookingTab('upcoming')}
        >Upcoming</div>
        <div 
          className={`${bookingTab === 'past' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
          onClick={() => setBookingTab('past')}
        >Past</div>
        <div 
          className={`${bookingTab === 'cancelled' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
          onClick={() => setBookingTab('cancelled')}
        >Cancelled</div>
      </div>

      <div className="space-y-6">
        <div className="py-20 text-center border-2 border-dashed border-black bg-gray-50">
          <div className="mb-4 opacity-20 flex justify-center"><Icons.Bookings /></div>
          <h3 className="font-black uppercase text-lg mb-2">No {bookingTab} bookings found</h3>
          <p className="text-xs text-gray-500 mb-6 max-w-xs mx-auto">When you book flights, stays or cars on Ebony Bruce Travels, they will appear here.</p>
          <button onClick={() => window.location.reload()} className="bg-black text-white px-8 py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Start your next journey</button>
        </div>
      </div>
    </div>
  );

  const renderSaved = () => {
    const filteredItems = savedItems.filter(item => item.type === savedTab);
    return (
      <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-5xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-black uppercase mb-1">My Saved Items</h2>
            <p className="text-sm text-gray-500">Keep track of the stays, flights, and cars you want to book later.</p>
          </div>
          <button onClick={() => setSubView('overview')} className="text-xs font-black uppercase underline decoration-2">Back to account</button>
        </div>

        <div className="flex space-x-8 border-b-2 border-black mb-8 text-xs font-black uppercase">
          <div 
            className={`${savedTab === 'stay' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
            onClick={() => setSavedTab('stay')}
          >Stays</div>
          <div 
            className={`${savedTab === 'flight' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
            onClick={() => setSavedTab('flight')}
          >Flights</div>
          <div 
            className={`${savedTab === 'car' ? 'border-b-4 border-black' : 'text-gray-400'} pb-2 cursor-pointer hover:text-black transition-colors`}
            onClick={() => setSavedTab('car')}
          >Cars</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.length > 0 ? filteredItems.map((item) => (
            <div key={item.id} className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors relative group">
              <div className="flex gap-4">
                <div className="w-24 h-24 border-2 border-black placeholder-image flex items-center justify-center font-black text-xl opacity-20">X</div>
                <div className="flex-grow">
                  <h4 className="font-black uppercase text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{item.location}</p>
                  <p className="text-sm font-black">{item.price}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black flex justify-between items-center">
                <button className="text-[10px] font-black uppercase underline decoration-2 hover:text-gray-600">Check availability</button>
                <button 
                  onClick={() => removeSavedItem(item.id)}
                  className="text-[10px] font-black uppercase text-red-600 hover:underline"
                >Remove</button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-black bg-gray-50">
              <h3 className="font-black uppercase text-lg mb-2">No saved {savedTab}s yet</h3>
              <p className="text-xs text-gray-500 mb-6">Start exploring Ebony Bruce Travels and save items you like!</p>
              <button onClick={() => window.location.reload()} className="bg-black text-white px-8 py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Start searching</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBookingList = (type: string, icon: React.ReactNode) => (
    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black uppercase mb-1">My {type}</h2>
          <p className="text-sm text-gray-500">Manage your upcoming and past {type.toLowerCase()}.</p>
        </div>
        <button onClick={() => setSubView('overview')} className="text-xs font-black uppercase underline decoration-2">Back to account</button>
      </div>
      <div className="flex space-x-8 border-b-2 border-black mb-8 text-xs font-black uppercase">
        <div className="border-b-4 border-black pb-2 cursor-pointer">Upcoming</div>
        <div className="text-gray-400 pb-2 cursor-pointer hover:text-black">Completed</div>
        <div className="text-gray-400 pb-2 cursor-pointer hover:text-black">Cancelled</div>
      </div>
      <div className="space-y-6">
        <div className="py-20 text-center border-2 border-dashed border-black bg-gray-50">
          <div className="mb-4 opacity-20 flex justify-center">{icon}</div>
          <h3 className="font-black uppercase text-lg mb-2">No upcoming {type.toLowerCase()}</h3>
          <p className="text-xs text-gray-500 mb-6 max-w-xs mx-auto">When you book {type.toLowerCase()} on Ebony Bruce Travels, they'll appear here.</p>
          <button className="bg-black text-white px-8 py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Start searching</button>
        </div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-5xl relative">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black uppercase mb-1">My Wallet</h2>
          <p className="text-sm text-gray-500">Manage your travel credits, track refunds, and view transaction history.</p>
        </div>
        <button onClick={() => setSubView('overview')} className="text-xs font-black uppercase underline decoration-2">Back to account</button>
      </div>

      {showAddCreditModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 w-full max-w-sm shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-2">Add Credits</h3>
            <p className="text-xs font-bold text-gray-500 mb-6 uppercase">Top up your balance for local or international trips</p>
            <form onSubmit={handleAddCredits} className="space-y-4" noValidate>
              <div className="flex space-x-2 mb-4">
                <button 
                  type="button" 
                  onClick={() => setCreditRegion('local')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-colors ${creditRegion === 'local' ? 'bg-black text-white' : 'bg-white text-black'}`}
                >Local (Paystack)</button>
                <button 
                  type="button" 
                  onClick={() => setCreditRegion('international')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-colors ${creditRegion === 'international' ? 'bg-black text-white' : 'bg-white text-black'}`}
                >Int'l (Stripe)</button>
              </div>
              <div className={`border-2 border-black p-3 bg-gray-50 ${creditError ? 'border-red-600' : ''}`}>
                <label className={`text-[10px] font-black uppercase block mb-1 ${creditError ? 'text-red-600' : 'text-gray-400'}`}>Amount (NGN)</label>
                <input autoFocus type="number" step="0.01" required placeholder="e.g. 5000" className="w-full text-xl font-black bg-transparent outline-none" value={creditAmountInput} onChange={handleCreditInputChange} />
              </div>
              {creditError && <div className="bg-red-50 border-2 border-red-600 p-3 text-red-600 font-black uppercase text-[10px]">Error: {creditError}</div>}
              <div className="flex flex-col space-y-3 pt-4">
                <button type="submit" className="w-full bg-black text-white py-4 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Confirm Top Up</button>
                <button type="button" onClick={() => { setShowAddCreditModal(false); setCreditError(null); }} className="w-full bg-white text-black py-4 text-xs font-black uppercase border-2 border-black hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-7 border-2 border-black p-8 bg-black text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Balance</h3>
            <div className="text-5xl font-black mb-8">NGN {formatCurrency(travelCredits + pendingRefunds)}</div>
            <div className="flex space-x-4">
              <button onClick={() => setShowAddCreditModal(true)} className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase border-2 border-white hover:bg-black hover:text-white transition-all">Add Credits</button>
              <button className="border-2 border-white px-6 py-2 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">Redeem Voucher</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20 scale-150 rotate-12"><Icons.Wallet /></div>
        </div>
        <div className="md:col-span-5 border-2 border-black p-6 bg-gray-50 flex flex-col justify-between">
           <div>
              <h4 className="text-xs font-black uppercase mb-4">Balance Breakdown</h4>
              <div className="space-y-3 text-xs">
                 <div className="flex justify-between"><span className="text-gray-500 font-bold uppercase">Travel Credits</span><span className="font-black">NGN {formatCurrency(travelCredits)}</span></div>
                 <div className="flex justify-between"><span className="text-gray-500 font-bold uppercase">Pending Refunds</span><span className="font-black">NGN {formatCurrency(pendingRefunds)}</span></div>
                 <div className="border-t border-black pt-3 flex justify-between"><span className="font-black uppercase">Total</span><span className="font-black">NGN {formatCurrency(travelCredits + pendingRefunds)}</span></div>
              </div>
           </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-black uppercase text-sm mb-4">Saved Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-black p-4 flex justify-between items-center bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-[10px] uppercase">PS</div>
              <div><p className="text-xs font-black uppercase">Paystack (Local)</p><p className="text-[10px] text-gray-400 font-bold uppercase">Mastercard **** 4242</p></div>
            </div>
            <div className="text-[9px] font-black uppercase bg-gray-100 px-2 py-1 border border-black">Default</div>
          </div>
          <div className="border-2 border-black p-4 flex justify-between items-center bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-[10px] uppercase">ST</div>
              <div><p className="text-xs font-black uppercase">Stripe (Int'l)</p><p className="text-[10px] text-gray-400 font-bold uppercase">Visa **** 1234</p></div>
            </div>
            <div className="text-[9px] font-black uppercase border border-black px-2 py-1 opacity-20">Secondary</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-black uppercase text-sm mb-4">Transaction History ({transactions.length})</h3>
        <div className="border-2 border-black bg-white">
          {transactions.map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-black last:border-none hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="text-[10px] font-bold text-gray-400 w-24 uppercase">{tx.date}</div>
                <div><div className="font-bold uppercase text-xs">{tx.desc}</div>{tx.gateway && <div className="text-[8px] font-black uppercase text-gray-300">Gateway: {tx.gateway}</div>}</div>
              </div>
              <div className={`font-black text-xs ${tx.type === 'credit' ? 'text-black' : 'text-gray-500'}`}>{tx.amount}</div>
            </div>
          ))}
          <div className="p-4 text-center border-t-2 border-black bg-gray-50">
             <button onClick={handleLoadMore} disabled={loadingMore} className={`text-[10px] font-black uppercase underline decoration-2 ${loadingMore ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loadingMore ? 'Fetching...' : 'Load Older Transactions'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonal = () => {
    const fields = [
      { id: 'name', label: 'Name', value: personalInfo.name },
      { id: 'email', label: 'Email', value: personalInfo.email },
      { id: 'nationality', label: 'Nationality', value: personalInfo.nationality }
    ];

    return (
      <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
        <div className="flex justify-between items-start mb-8">
          <div><h2 className="text-2xl font-black uppercase mb-1">Personal details</h2><p className="text-sm text-gray-500">Update your information.</p></div>
          <button onClick={() => setSubView('overview')} className="text-xs font-black uppercase underline decoration-2">Back to account</button>
        </div>
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 border-2 border-black flex items-center justify-center font-black text-2xl bg-gray-100 uppercase">{personalInfo.name?.charAt(0)}</div>
            <button className="text-[10px] font-black uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors">Change Photo</button>
          </div>
          <div className="divide-y-2 divide-black border-y-2 border-black">
            {fields.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-6 px-2 hover:bg-gray-50 group transition-colors">
                <div className="flex flex-col flex-grow mr-4">
                  <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">{item.label}</span>
                  {editingField === item.id ? (
                    <input 
                      autoFocus
                      type="text"
                      className="text-sm font-medium border-2 border-black p-2 outline-none focus:bg-white bg-gray-50 w-full max-w-md"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                  ) : (
                    <span className="text-sm font-medium">{item.value}</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {editingField === item.id ? (
                    <>
                      <button 
                        onClick={() => handleSaveClick(item.id)}
                        className="text-[10px] font-black uppercase bg-black text-white px-3 py-1 border border-black hover:bg-white hover:text-black transition-all"
                      >Save</button>
                      <button 
                        onClick={handleCancelClick}
                        className="text-[10px] font-black uppercase border border-black px-3 py-1 hover:bg-gray-200 transition-all"
                      >Cancel</button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleEditClick(item.id, item.value)}
                      className="text-[10px] font-black uppercase underline decoration-2 hover:text-gray-500"
                    >Edit</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase leading-none mb-2">Account settings</h1>
        <p className="text-xl font-medium text-gray-600">Manage your Ebony Bruce Travels experience</p>
        <div className="w-24 h-2 bg-black mt-4"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          {subView === 'overview' && renderOverview()}
          {subView === 'personal' && renderPersonal()}
          {subView === 'saved' && renderSaved()}
          {subView === 'wallet' && renderWallet()}
          {subView === 'my_bookings' && renderMyBookings()}
          {['stays', 'flights', 'cars'].includes(subView) && renderBookingList(subView.toUpperCase(), <Icons.Stays />)}
          {!['overview', 'personal', 'saved', 'wallet', 'stays', 'flights', 'cars', 'my_bookings'].includes(subView) && (
            <div className="py-32 text-center border-2 border-dashed border-black bg-white">
              <h2 className="text-3xl font-black uppercase text-gray-200">{subView} Placeholder</h2>
              <button onClick={() => setSubView('overview')} className="mt-6 text-xs font-black uppercase underline decoration-2">Go Back</button>
            </div>
          )}
        </div>
        {subView === 'overview' && (
          <aside className="lg:w-1/3 space-y-6">
            <div className="border-2 border-black p-6 bg-gray-100">
              <h4 className="font-black uppercase text-xs mb-4">Travel more for less</h4>
              <div className="aspect-video border-2 border-black placeholder-image mb-4 flex items-center justify-center font-black text-3xl opacity-20 italic">GENIUS</div>
              <p className="text-xs font-bold text-gray-600 mb-4">You are a Genius Level 1 member. 10% discounts active.</p>
              <button className="w-full bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Explore Benefits</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
