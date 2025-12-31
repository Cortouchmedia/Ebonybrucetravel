
import React, { useState, useRef } from 'react';
import { View, BookingTab, TravelItem } from '../types';

interface ProfilePageProps {
  onLogout: () => void;
  onNavigate: (view: View) => void;
  userName: string;
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
}

type SubView = 'dashboard' | 'My bookings' | 'Saved lists' | 'Rewards' | 'Personal details' | 'Other travelers' | 'Payment methods' | 'Security settings' | 'Wallet';

interface BookingRecord {
  id: string;
  type: string;
  title: string;
  provider: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Modification Pending';
  price: string;
  confirmationCode: string;
  details: string[];
}

interface RewardTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earn' | 'spend';
}

interface PaymentCard {
  id: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiry: string;
  isDefault: boolean;
  nameOnCard: string;
}

interface UserSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface TravelerCompanion {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  type: 'Adult' | 'Child' | 'Infant';
  passportNumber?: string;
  relationship: string;
}

interface WalletTransaction {
  id: string;
  date: string;
  type: 'Credit' | 'Debit';
  amount: string;
  description: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, onNavigate, userName, savedItemIds, onToggleSave }) => {
  const [activeSubView, setActiveSubView] = useState<SubView>('dashboard');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isAddingTraveler, setIsAddingTraveler] = useState(false);
  const [isToppingUp, setIsToppingUp] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Personal Details State
  const [userDetails, setUserDetails] = useState({
    firstName: userName.split(' ')[0] || 'James',
    lastName: userName.split(' ')[1] || 'Bruce',
    email: 'j.bruce@ebonybrucetravels.com',
    phone: '+234 800 000 0000',
    dob: '1990-05-15',
    nationality: 'Nigerian',
    address: '123 Victoria Island, Lagos',
    city: 'Lagos',
    zip: '101241'
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentCard[]>([
    { id: 'pm-1', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true, nameOnCard: userName.toUpperCase() },
    { id: 'pm-2', brand: 'Mastercard', last4: '8812', expiry: '09/25', isDefault: false, nameOnCard: userName.toUpperCase() }
  ]);

  const [activeSessions, setActiveSessions] = useState<UserSession[]>([
    { id: 'sess-1', device: 'iPhone 15 Pro • Ebony Bruce App', location: 'Lagos, Nigeria', lastActive: 'Active now', isCurrent: true },
    { id: 'sess-2', device: 'MacBook Pro • Chrome Browser', location: 'London, United Kingdom', lastActive: '2 hours ago', isCurrent: false },
    { id: 'sess-3', device: 'iPad Air • Safari Browser', location: 'Abuja, Nigeria', lastActive: 'Oct 22, 2024', isCurrent: false }
  ]);

  const [otherTravelers, setOtherTravelers] = useState<TravelerCompanion[]>([
    { id: 'tc-1', firstName: 'Sarah', lastName: 'Bruce', dob: '1992-08-12', type: 'Adult', passportNumber: 'A01234567', relationship: 'Spouse' },
    { id: 'tc-2', firstName: 'Junior', lastName: 'Bruce', dob: '2018-03-25', type: 'Child', passportNumber: 'C98765432', relationship: 'Child' }
  ]);

  const [walletTransactions] = useState<WalletTransaction[]>([
    { id: 'TX-9901', date: 'Oct 24, 2024', type: 'Debit', amount: '£820.00', description: 'Flight Booking BK-5521 (Lagos-Dubai)', status: 'Successful' },
    { id: 'TX-9882', date: 'Oct 20, 2024', type: 'Credit', amount: '£1,000.00', description: 'Wallet Top-up • Visa **4242', status: 'Successful' },
    { id: 'TX-9840', date: 'Oct 15, 2024', type: 'Debit', amount: '£120.00', description: 'Stay Booking BK-4412 (The Eko Hotels)', status: 'Successful' },
    { id: 'TX-9721', date: 'Oct 05, 2024', type: 'Credit', amount: '£50.00', description: 'Referral Bonus Reward', status: 'Successful' }
  ]);

  const [bookings, setBookings] = useState<BookingRecord[]>([
    { 
      id: 'BK-5521', 
      type: 'Flights', 
      title: 'Lagos to Dubai', 
      provider: 'Emirates', 
      date: 'Dec 15, 2024', 
      status: 'Upcoming', 
      price: '£820.00',
      confirmationCode: 'DXB772PQ',
      details: ['Economy Class', 'Seat 22A', 'Includes 30kg baggage']
    },
    { 
      id: 'BK-4412', 
      type: 'Stays', 
      title: 'The Eko Hotels', 
      provider: 'Lagos', 
      date: 'Oct 10, 2024', 
      status: 'Completed', 
      price: '£120.00',
      confirmationCode: 'EKO-901-Z',
      details: ['King Room', 'City View', 'Breakfast included']
    }
  ]);

  const [rewardHistory] = useState<RewardTransaction[]>([
    { id: 'RT-001', date: 'Oct 12, 2024', description: 'Flight LOS-LHR (BA 75)', points: 1250, type: 'earn' },
    { id: 'RT-002', date: 'Oct 10, 2024', description: 'Stay at Eko Suites', points: 300, type: 'earn' },
    { id: 'RT-003', date: 'Sep 28, 2024', description: 'Voucher Redemption (Stays)', points: -1000, type: 'spend' },
    { id: 'RT-004', date: 'Sep 15, 2024', description: 'Car Rental Bonus', points: 150, type: 'earn' },
  ]);

  const mockDatabase: TravelItem[] = [
    { id: 'h1', title: 'Flight: LOS-LHR', location: 'London', price: '£850', type: BookingTab.FLIGHTS, rating: '9.0', details: ['Direct'], image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=800" },
    { id: 'h2', title: 'Eko Suites', location: 'Lagos', price: '£120', type: BookingTab.STAYS, rating: '8.5', details: ['Breakfast Included'], image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800" },
    { id: 'h3', title: 'SUV Rental (Lexus RX)', location: 'Abuja', price: '£55', type: BookingTab.CAR_RENTALS, rating: '8.8', details: ['Full Insurance'], image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800" },
    { id: 'f3', title: 'British Airways (BA 75)', location: 'Lagos to London', price: '£1,250', type: BookingTab.FLIGHTS, rating: '9.1', details: ['Non-stop', 'Premium Economy'], image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800" },
  ];

  const savedItems = mockDatabase.filter(item => savedItemIds.includes(item.id));

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      onToggleSave(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
  };

  const handleRemovePayment = (id: string) => {
    if (confirm("Remove this payment method from your registry?")) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    }
  };

  const handleTerminateSession = (id: string) => {
    if (confirm("Sign out of this session?")) {
      setActiveSessions(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleTerminateAllSessions = () => {
    if (confirm("This will sign you out of all other devices. Proceed?")) {
      setActiveSessions(prev => prev.filter(s => s.isCurrent));
    }
  };

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile synchronization successful. Your personal registry has been updated.');
  };

  const handleRemoveTraveler = (id: string) => {
    if (confirm("Remove this traveler from your companion registry?")) {
      setOtherTravelers(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-[#002D5B] to-[#1F93D0] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-60 mb-6 relative z-10">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">Member Level</p>
            <p className="font-bold text-2xl tracking-tighter uppercase">Gold Tier 1</p>
          </div>
          <div 
            onClick={() => setActiveSubView('Wallet')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 cursor-pointer hover:bg-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">Travel Wallet</p>
              <span className="text-xs">↗</span>
            </div>
            <p className="font-bold text-2xl tracking-tighter uppercase">£1,420.50</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Recent Bookings', icon: '👜', view: 'My bookings' },
          { label: 'Your Favorites', icon: '❤️', view: 'Saved lists' },
          { label: 'Rewards Hub', icon: '💎', view: 'Rewards' },
          { label: 'Digital Wallet', icon: '🏦', view: 'Wallet' },
          { label: 'Payment Registry', icon: '💳', view: 'Payment methods' },
          { label: 'Companions', icon: '👥', view: 'Other travelers' }
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => setActiveSubView(item.view as SubView)}
            className="bg-white rounded-3xl p-8 flex items-center justify-between cursor-pointer border border-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div>
               <span className="text-3xl mb-4 block" role="img" aria-hidden="true">{item.icon}</span>
               <span className="font-bold text-xs text-[#002D5B] tracking-wide uppercase">{item.label}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#1F93D0] group-hover:text-white transition-colors">
               →
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Financial Vault</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Digital Balance & Transaction Registry</p>
        </div>
        <button 
          onClick={() => setIsToppingUp(true)}
          className="bg-[#1F93D0] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#002D5B] transition-all shadow-lg active:scale-95"
        >
          Top Up Balance
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-[#002D5B] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full -mr-40 -mt-40"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-300 mb-4">Available Credits</p>
              <h3 className="text-6xl font-black tracking-tighter leading-none mb-6 italic">£1,420.50</h3>
              <div className="flex space-x-4">
                 <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active Status</span>
                 </div>
                 <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-500/20">
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Secured</span>
                 </div>
              </div>
           </div>
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Quick Insights</h4>
              <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-white/60 uppercase tracking-tight">Last Activity</span>
                 <span className="text-xs font-black">Oct 24, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-white/60 uppercase tracking-tight">Pending Refunds</span>
                 <span className="text-xs font-black">£0.00</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-white/60 uppercase tracking-tight">Total Saved (YTD)</span>
                 <span className="text-xs font-black text-green-400">£342.10</span>
              </div>
           </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ledger Activity</h3>
          <button className="text-[9px] font-black text-[#1F93D0] uppercase tracking-widest border-b border-blue-100 pb-0.5 hover:text-[#002D5B] transition-colors">Download Statements</button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                    <th className="px-8 py-5 text-[10px) font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                 </tr>
              </thead>
              <tbody>
                 {walletTransactions.map((tx) => (
                   <tr key={tx.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-tighter">{tx.date}</td>
                      <td className="px-8 py-6">
                         <p className="text-xs font-black text-[#002D5B] uppercase tracking-tight">{tx.description}</p>
                         <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1">Ref: {tx.id}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-[9px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest border border-green-100">{tx.status}</span>
                      </td>
                      <td className={`px-8 py-6 text-right font-black text-sm tracking-tight ${tx.type === 'Debit' ? 'text-red-400' : 'text-[#1F93D0]'}`}>
                         {tx.type === 'Debit' ? '-' : '+'}{tx.amount}
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Top Up Modal (Mock) */}
      {isToppingUp && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[#002D5B]/60 backdrop-blur-md" onClick={() => setIsToppingUp(false)}></div>
           <div className="relative bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100">
              <h3 className="text-2xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-8">Refill Vault</h3>
              <div className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Select Amount (GBP)</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['£100', '£500', '£1,000'].map(amt => (
                         <button key={amt} className="py-4 border-2 border-slate-100 rounded-2xl text-xs font-black text-[#002D5B] hover:border-[#1F93D0] transition-all">{amt}</button>
                       ))}
                    </div>
                    <input type="text" placeholder="CUSTOM AMOUNT" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                 </div>
                 
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Funding Source</label>
                    {paymentMethods.map(pm => (
                      <div key={pm.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 cursor-pointer transition-all">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#002D5B] text-xs font-black italic">{pm.brand}</div>
                           <span className="text-xs font-bold text-[#002D5B]">•••• {pm.last4}</span>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-[#1F93D0] flex items-center justify-center">
                           {pm.isDefault && <div className="w-2 h-2 bg-[#1F93D0] rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="pt-6">
                    <button 
                      onClick={() => setIsToppingUp(false)}
                      className="w-full bg-[#1F93D0] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-[#002D5B] transition-all"
                    >
                      Process Transaction
                    </button>
                    <button 
                      onClick={() => setIsToppingUp(false)}
                      className="w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#002D5B] transition-colors"
                    >
                      Return to Vault
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderOtherTravelers = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Companion Registry</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Manage Profiles of Frequent Travelers</p>
        </div>
        <button 
          onClick={() => setIsAddingTraveler(true)}
          className="bg-[#002D5B] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F93D0] transition-all shadow-lg active:scale-95"
        >
          Add New Traveler
        </button>
      </div>

      {otherTravelers.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-[#002D5B]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
           </div>
           <h3 className="text-lg font-bold text-[#002D5B] uppercase mb-2">Registry is empty</h3>
           <p className="text-slate-400 font-medium">Add companions to expedite the booking process for your group.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherTravelers.map((t) => (
            <div key={t.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-50 px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest text-slate-400">
                {t.type}
              </div>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-xl text-[#1F93D0] font-black">
                  {t.firstName.charAt(0)}{t.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#002D5B] uppercase tracking-tighter italic">{t.firstName} {t.lastName}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.relationship}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-black uppercase tracking-widest text-[9px]">DOB</span>
                  <span className="text-[#002D5B] font-bold">{t.dob}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-black uppercase tracking-widest text-[9px]">Passport</span>
                  <span className="text-[#002D5B] font-bold">{t.passportNumber || 'Not provided'}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="text-[9px] font-black text-[#1F93D0] uppercase tracking-widest hover:underline">Edit details</button>
                 <button 
                  onClick={() => handleRemoveTraveler(t.id)}
                  className="text-[9px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors"
                 >
                   Remove Profile
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Traveler Interface (Mock Modal) */}
      {isAddingTraveler && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[#002D5B]/60 backdrop-blur-md" onClick={() => setIsAddingTraveler(false)}></div>
           <div className="relative bg-white rounded-[3.5rem] p-12 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100 overflow-y-auto max-h-[90vh]">
              <h3 className="text-2xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-8">Traveler Profile</h3>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Given Name</label>
                       <input type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Surname</label>
                       <input type="text" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Date of Birth</label>
                       <input type="date" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Relationship</label>
                       <select className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all appearance-none">
                          <option>Family</option>
                          <option>Spouse</option>
                          <option>Child</option>
                          <option>Colleague</option>
                          <option>Friend</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Passport Number</label>
                    <input type="text" placeholder="XXXXXXXXX" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                 </div>
                 <div className="pt-6">
                    <button 
                      onClick={() => setIsAddingTraveler(false)}
                      className="w-full bg-[#002D5B] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-[#1F93D0] transition-all"
                    >
                      Authenticate & Register
                    </button>
                    <button 
                      onClick={() => setIsAddingTraveler(false)}
                      className="w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#002D5B] transition-colors"
                    >
                      Cancel
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Identity Registry</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Manage Profile & Contact Credentials</p>
        </div>
        <div className="flex items-center space-x-2 text-[#1F93D0] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
           <span className="text-[10px] font-black uppercase tracking-widest">Profile 85% Complete</span>
        </div>
      </div>

      <form onSubmit={handleUpdateDetails} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section: Core Identity */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F93D0] border-b border-blue-50 pb-4">Core Identity</h3>
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Given Name</label>
                  <input 
                    type="text" 
                    value={userDetails.firstName}
                    onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Surname</label>
                  <input 
                    type="text" 
                    value={userDetails.lastName}
                    onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Registry</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={userDetails.email}
                      disabled
                      className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl p-4 text-sm font-bold text-[#002D5B] opacity-70 cursor-not-allowed"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Section: Contact & Demographics */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F93D0] border-b border-blue-50 pb-4">Demographics</h3>
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                  <input 
                    type="tel" 
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Date of Birth</label>
                    <input 
                      type="date" 
                      value={userDetails.dob}
                      onChange={(e) => setUserDetails({...userDetails, dob: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nationality</label>
                    <input 
                      type="text" 
                      value={userDetails.nationality}
                      onChange={(e) => setUserDetails({...userDetails, nationality: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section: Residence Registry */}
        <div className="space-y-6 pt-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F93D0] border-b border-blue-50 pb-4">Residence Registry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Permanent Address</label>
                <input 
                  type="text" 
                  value={userDetails.address}
                  onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Post/ZIP Code</label>
                <input 
                  type="text" 
                  value={userDetails.zip}
                  onChange={(e) => setUserDetails({...userDetails, zip: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all"
                />
             </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row gap-4">
          <button 
            type="submit"
            className="flex-grow bg-[#002D5B] text-white py-5 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-blue-900/10 hover:bg-[#1F93D0] transition-all active:scale-[0.98]"
          >
            Synchronize Profile
          </button>
          <button 
            type="button"
            onClick={() => setActiveSubView('dashboard')}
            className="px-10 bg-slate-50 text-slate-400 py-5 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:bg-slate-100 transition-all"
          >
            Cancel Updates
          </button>
        </div>
      </form>

      {/* Trust Footer */}
      <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-6">
         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1F93D0] shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
         </div>
         <p className="text-xs font-medium text-slate-500 leading-relaxed">
           Your data is encrypted according to international standards. Ebony Bruce Travels Limited never shares your personal registry with unauthorized third parties. 
           <button className="text-[#1F93D0] font-black uppercase tracking-widest ml-2 hover:underline">View Privacy Policy</button>
         </p>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Security Center</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Manage Account Integrity & Access</p>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-full border border-green-100 flex items-center space-x-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">System Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Password Management */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
           <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1F93D0]">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div>
                 <h3 className="text-sm font-black text-[#002D5B] uppercase tracking-tight">Login Credentials</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last updated 4 months ago</p>
              </div>
           </div>
           <button className="w-full bg-[#002D5B] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F93D0] transition-all">
              Change Password
           </button>
        </div>

        {/* 2FA Status */}
        <div className={`rounded-[2.5rem] p-8 border transition-all ${is2FAEnabled ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
           <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${is2FAEnabled ? 'bg-white text-[#1F93D0]' : 'bg-white text-slate-300'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                 </div>
                 <div>
                    <h3 className={`text-sm font-black uppercase tracking-tight ${is2FAEnabled ? 'text-[#002D5B]' : 'text-slate-400'}`}>Multi-Factor Auth</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{is2FAEnabled ? 'Protection is active' : 'Account is vulnerable'}</p>
                 </div>
              </div>
              <button 
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`w-12 h-6 rounded-full relative transition-colors ${is2FAEnabled ? 'bg-[#1F93D0]' : 'bg-slate-300'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FAEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
           </div>
           <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
              Use a mobile authenticator app or SMS to verify all login attempts for maximum security.
           </p>
        </div>
      </div>

      {/* Active Sessions Audit */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Login Activity Audits</h3>
          <button 
            onClick={handleTerminateAllSessions}
            className="text-[9px] font-black text-red-500 uppercase tracking-widest border-b border-red-200 pb-0.5 hover:text-red-700 transition-colors"
          >
            Sign out of all other devices
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Device & Client</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Activity</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
                 </tr>
              </thead>
              <tbody>
                 {activeSessions.map((sess) => (
                   <tr key={sess.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                         <p className="text-xs font-black text-[#002D5B] uppercase tracking-tight">{sess.device}</p>
                         {sess.isCurrent && <span className="text-[8px] font-black text-[#1F93D0] uppercase tracking-widest mt-1">This device</span>}
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-tighter">{sess.location}</td>
                      <td className="px-8 py-6 text-xs font-bold text-slate-500 text-right">{sess.lastActive}</td>
                      <td className="px-8 py-6 text-right">
                         {!sess.isCurrent && (
                           <button 
                             onClick={() => handleTerminateSession(sess.id)}
                             className="text-slate-300 hover:text-red-500 transition-colors"
                             title="Terminate Session"
                           >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                           </button>
                         )}
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Advanced Security Controls */}
      <div className="bg-[#002D5B] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
         <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">Enterprise Protection</h3>
         <p className="text-sm text-white/60 font-medium max-w-xl mb-10 leading-relaxed">
            Ebony Bruce Travels Limited utilizes bank-grade encryption and real-time threat monitoring to protect your global travel data.
         </p>
         <div className="flex flex-wrap gap-4">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
               Request Data Registry
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl">
               Deactivate Account
            </button>
         </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Financial Registry</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Manage Secured Payment Instruments</p>
        </div>
        <button 
          onClick={() => setIsAddingCard(true)}
          className="bg-[#002D5B] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F93D0] transition-all shadow-lg active:scale-95"
        >
          Add New Method
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-[#002D5B]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
           </div>
           <h3 className="text-lg font-bold text-[#002D5B] uppercase mb-2">No methods found</h3>
           <p className="text-slate-400 font-medium">Add a payment method for faster, priority checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paymentMethods.map((pm) => (
            <div 
              key={pm.id} 
              className={`relative rounded-[2.5rem] p-8 border-2 transition-all group overflow-hidden ${
                pm.isDefault ? 'border-[#1F93D0] bg-[#1F93D0]/5 shadow-xl shadow-blue-500/5' : 'border-slate-50 bg-white hover:border-slate-200'
              }`}
            >
              {pm.isDefault && (
                <div className="absolute top-0 right-0 bg-[#1F93D0] text-white px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-[0.2em]">
                  Primary Method
                </div>
              )}
              
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Provider</p>
                  <p className="text-lg font-black text-[#002D5B] italic">{pm.brand}</p>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#002D5B] group-hover:bg-[#002D5B] group-hover:text-white transition-all">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-xl font-black text-[#002D5B] tracking-[0.3em] font-mono">
                  •••• •••• •••• {pm.last4}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Cardholder</p>
                  <p className="text-xs font-bold text-[#002D5B] uppercase">{pm.nameOnCard}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Expiry</p>
                  <p className="text-xs font-bold text-[#002D5B]">{pm.expiry}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {!pm.isDefault && (
                  <button 
                    onClick={() => handleSetDefaultPayment(pm.id)}
                    className="text-[10px] font-black text-[#1F93D0] uppercase tracking-widest hover:underline"
                  >
                    Set Primary
                  </button>
                )}
                <button 
                  onClick={() => handleRemovePayment(pm.id)}
                  className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors ml-auto"
                >
                  Remove Registry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Card Interface (Mock) */}
      {isAddingCard && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-[#002D5B]/60 backdrop-blur-md" onClick={() => setIsAddingCard(false)}></div>
           <div className="relative bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100">
              <h3 className="text-2xl font-black text-[#002D5B] uppercase tracking-tighter italic mb-8">Register Instrument</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name on Card</label>
                    <input type="text" defaultValue={userName.toUpperCase()} className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">16-Digit Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Expiry</label>
                       <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Security Code</label>
                       <input type="password" placeholder="•••" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" />
                    </div>
                 </div>
                 <div className="pt-6">
                    <button 
                      onClick={() => setIsAddingCard(false)}
                      className="w-full bg-[#002D5B] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-[#1F93D0] transition-all"
                    >
                      Authenticate & Save
                    </button>
                    <button 
                      onClick={() => setIsAddingCard(false)}
                      className="w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#002D5B] transition-colors"
                    >
                      Cancel
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Rewards Hub</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">Elite Membership Perks</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
           <span className="text-xl">💎</span>
           <span className="text-sm font-bold text-[#1F93D0]">4,850 Points</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Tier Status */}
        <div className="md:col-span-12 lg:col-span-5 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Tier Progress</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#002D5B] uppercase italic">Gold Status</span>
              <span className="text-xs font-bold text-slate-400">Next: Platinum</span>
            </div>
            <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#1F93D0] rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
              Earn <span className="text-[#002D5B] font-bold">1,150 more points</span> by Dec 31 to unlock Platinum Tier benefits including lounge access.
            </p>
          </div>
        </div>

        {/* Available Perks */}
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Redeemable Vouchers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { title: '£25 OFF Stay', cost: '1,000 pts', code: 'STAY25', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
               { title: 'Free Car Upgrade', cost: '2,500 pts', code: 'LUXDRIVE', color: 'bg-blue-50 text-blue-600 border-blue-100' }
             ].map((v, i) => (
               <div key={i} className={`p-6 rounded-[2rem] border-2 border-dashed ${v.color} relative overflow-hidden group`}>
                 <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-1">{v.cost}</p>
                 <h4 className="text-sm font-bold uppercase tracking-tight mb-4">{v.title}</h4>
                 <button className="text-[9px] font-bold uppercase tracking-[0.2em] border-b-2 border-current pb-0.5 group-hover:opacity-70 transition-opacity">Claim Now</button>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Reward History */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Activity History</h3>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {rewardHistory.map((rt) => (
                <tr key={rt.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-xs font-medium text-slate-400">{rt.date}</td>
                  <td className="px-8 py-5 text-xs font-bold text-[#002D5B] uppercase tracking-tight">{rt.description}</td>
                  <td className={`px-8 py-5 text-xs font-bold text-right ${rt.type === 'earn' ? 'text-green-500' : 'text-red-400'}`}>
                    {rt.type === 'earn' ? '+' : ''}{rt.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMyBookings = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic mb-8">Travel Activity</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No booking activity recorded yet.</p>
        </div>
      ) : (
        bookings.map(b => (
          <div key={b.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-4">
                 <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                   b.status === 'Completed' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-600'
                 }`}>
                   {b.status}
                 </span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Ref: {b.id}</span>
              </div>
              <h3 className="text-xl font-bold text-[#002D5B] uppercase tracking-tight mb-2">{b.title}</h3>
              <p className="text-sm font-medium text-slate-500">{b.date} • {b.provider}</p>
            </div>
            <div className="flex flex-col justify-between items-end">
              <p className="text-xl font-bold text-[#002D5B] mb-4">{b.price}</p>
              <div className="flex gap-3">
                <button className="text-[10px] font-bold uppercase text-[#1F93D0] tracking-widest hover:text-[#002D5B]">Details</button>
                {b.status === 'Upcoming' && (
                  <button onClick={() => handleCancelBooking(b.id)} className="text-[10px] font-bold uppercase text-red-500 tracking-widest hover:text-red-700">Cancel</button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderSavedLists = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#002D5B] uppercase tracking-tighter italic leading-none">Your Curated Collection</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2">{savedItems.length} Saved Selections</p>
        </div>
        <button 
          onClick={() => onNavigate(View.HOME)}
          className="text-[10px] font-bold uppercase text-[#1F93D0] border-b border-[#1F93D0] pb-1 hover:text-[#002D5B] hover:border-[#002D5B] transition-all"
        >
          Discover More
        </button>
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="text-2xl" role="img" aria-label="empty">✨</span>
          </div>
          <h3 className="text-lg font-bold text-[#002D5B] uppercase mb-2">Registry is empty</h3>
          <p className="text-slate-400 font-medium max-w-xs mx-auto">Start exploring and save your preferred global destinations here for quick access.</p>
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="mt-8 bg-[#002D5B] text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#1F93D0] transition-all shadow-lg"
          >
            Go Explore
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button 
                  onClick={() => setPendingDeleteId(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 active:scale-95 transition-all"
                  aria-label="Remove from saved"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 bg-[#002D5B]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{item.type}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#002D5B] uppercase tracking-tighter leading-none mb-1">{item.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.location}</p>
                  </div>
                  <span className="text-xl font-bold text-[#002D5B]">{item.price}</span>
                </div>
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-[10px] font-bold text-[#1F93D0] bg-blue-50 px-2 py-1 rounded-md">Score {item.rating}</span>
                  <div className="h-4 w-px bg-slate-100"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.details[0]}</p>
                </div>
                <button 
                  onClick={() => {
                    onNavigate(View.RESULTS);
                  }}
                  className="w-full bg-slate-50 text-[#002D5B] py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#1F93D0] hover:text-white transition-all border border-slate-100"
                >
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#002D5B]/60 backdrop-blur-sm" onClick={() => setPendingDeleteId(null)}></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 max-sm w-full shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#002D5B] uppercase tracking-tighter mb-4">Confirm Removal</h3>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">Are you sure you want to delete this list?</p>
            <div className="space-y-3">
              <button 
                onClick={confirmDelete}
                className="w-full bg-red-500 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg active:scale-95"
              >
                Yes, delete
              </button>
              <button 
                onClick={() => setPendingDeleteId(null)}
                className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderActiveView = () => {
    switch (activeSubView) {
      case 'dashboard': return renderDashboard();
      case 'My bookings': return renderMyBookings();
      case 'Saved lists': return renderSavedLists();
      case 'Rewards': return renderRewards();
      case 'Personal details': return renderPersonalDetails();
      case 'Payment methods': return renderPaymentMethods();
      case 'Security settings': return renderSecuritySettings();
      case 'Other travelers': return renderOtherTravelers();
      case 'Wallet': return renderWallet();
      default: return (
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <span className="text-3xl text-slate-300" role="img" aria-label="maintenance">⚙️</span>
           </div>
           <h3 className="text-xl font-bold text-[#002D5B] uppercase mb-2">Section Under Maintenance</h3>
           <p className="text-slate-400 font-medium max-w-xs mx-auto">We're updating our {activeSubView} systems. Please try again shortly.</p>
        </div>
      );
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1F93D0]/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          
          <div className="flex items-center space-x-8 text-center md:text-left flex-col md:flex-row gap-6 md:gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-[#1F93D0] flex items-center justify-center text-5xl text-white font-bold shadow-2xl shadow-blue-500/30 border-4 border-white overflow-hidden relative transition-transform hover:scale-105">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
                {/* Upload Overlay */}
                <div 
                  onClick={triggerFileInput}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer"
                >
                  <svg className="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Change Photo</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-[#002D5B] uppercase tracking-tighter leading-none mb-4">{userName}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <span className="bg-blue-50 text-[#1F93D0] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100">Verified Member</span>
                 <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100">Ebony Gold Elite</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="bg-[#002D5B] text-white px-10 py-5 rounded-2xl font-bold uppercase text-sm tracking-widest hover:bg-[#1F93D0] transition-all shadow-xl shadow-blue-900/10 active:scale-95 relative z-10"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-3">
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-32">
                <nav className="flex flex-col space-y-2">
                   {(['dashboard', 'My bookings', 'Saved lists', 'Rewards', 'Wallet', 'Personal details', 'Other travelers', 'Payment methods', 'Security settings'] as SubView[]).map(v => (
                      <button 
                        key={v}
                        onClick={() => setActiveSubView(v)}
                        className={`w-full text-left p-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                          activeSubView === v ? 'bg-[#002D5B] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-[#002D5B]'
                        }`}
                      >
                        {v}
                      </button>
                   ))}
                </nav>
             </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm min-h-[600px] relative overflow-hidden">
             {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
