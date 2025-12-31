
import React, { useState } from 'react';
import { TravelItem, View } from '../types';

interface CheckoutPageProps {
  item: TravelItem;
  onComplete: () => void;
  onCancel: () => void;
  isLoggedIn: boolean;
  userName: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ item, onComplete, onCancel, isLoggedIn, userName }) => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState(isLoggedIn ? userName.toUpperCase() : '');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(/^([2-9])$/g, '0$1')
      .replace(/^(1[3-9])$/g, '0$1')
      .replace(/^([0-1][0-2])([0-9]{2,2}).*/g, '$1/$2')
      .replace(/^(0[1-9]|1[0-2])([0-9]{0,2}).*/g, '$1/$2');
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="relative w-24 h-24 mb-10">
          <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-[#1F93D0] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-[#002D5B] text-xl">EB</span>
          </div>
        </div>
        <h2 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter mb-4 animate-pulse">Securing your trip</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] max-w-xs">
          Finalizing inventory and confirming your reservation with {item.title}...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-[#002D5B] pt-12 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[100px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button 
            onClick={onCancel}
            className="text-[10px] font-black uppercase text-white/50 tracking-[0.3em] flex items-center mb-10 hover:text-[#1F93D0] transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Return to Details
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">Complete Checkout</h1>
              <p className="text-lg text-white/60 font-medium">Your premium travel arrangements are just a step away.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-blue-900/5 border border-slate-100">
              <div className="flex items-center space-x-5 mb-10">
                <div className="w-12 h-12 bg-[#002D5B] rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg">1</div>
                <div>
                  <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight">Traveler Information</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Given Name(s)</label>
                  <input type="text" placeholder="e.g. JAMES" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" required defaultValue={isLoggedIn ? userName.split(' ')[0] : ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-4">Surname</label>
                  <input type="text" placeholder="e.g. BRUCE" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1F93D0] focus:bg-white rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none transition-all" required />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-blue-900/5 border border-slate-100">
              <div className="flex items-center space-x-5 mb-10">
                <div className="w-12 h-12 bg-[#002D5B] rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg">2</div>
                <div>
                  <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight">Payment Selection</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  { id: 'wallet', title: 'Travel Wallet', desc: 'Pay with Ebony Bruce Credits', icon: '🏦' },
                  { id: 'card', title: 'Global Payment Card', desc: 'Secure Checkout via Stripe', icon: '💳' },
                ].map((method) => (
                  <label 
                    key={method.id}
                    className={`flex flex-col p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id ? 'border-[#1F93D0] bg-blue-50/30' : 'border-slate-50 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{method.icon}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#1F93D0]' : 'border-slate-200'}`}>
                        {paymentMethod === method.id && <div className="w-3 h-3 bg-[#1F93D0] rounded-full"></div>}
                        <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="hidden" />
                      </div>
                    </div>
                    <p className="text-sm font-black text-[#002D5B] uppercase tracking-tight mb-1">{method.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{method.desc}</p>
                  </label>
                ))}
              </div>

              {/* CARD DETAILS FORM - SHOWN ONLY IF CARD IS SELECTED */}
              {paymentMethod === 'card' && (
                <div className="space-y-6 animate-in slide-in-from-top-4 duration-300 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <svg className="w-5 h-5 text-[#1F93D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <span className="text-[10px] font-black uppercase text-[#002D5B] tracking-widest">PCI-DSS Secure Card Entry</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest">Cardholder Name</label>
                    <input type="text" className="w-full bg-white border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none uppercase" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="NAME AS SHOWN ON CARD" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest">Card Number</label>
                    <div className="relative">
                      <input type="text" maxLength={19} className="w-full bg-white border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="0000 0000 0000 0000" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6 opacity-40 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6 opacity-40 grayscale" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest">Expiry Date</label>
                      <input type="text" maxLength={5} className="w-full bg-white border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest">CVV / CVC</label>
                      <input type="password" maxLength={4} className="w-full bg-white border-2 border-transparent focus:border-[#1F93D0] rounded-2xl p-4 text-sm font-bold text-[#002D5B] outline-none" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))} placeholder="•••" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100">
              <div className="p-8 bg-slate-50 border-b border-slate-100">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-6 italic">Reservation Itinerary</h3>
                <div className="flex gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
                    <img src={item.image || "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400"} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-lg font-black text-[#002D5B] leading-tight uppercase tracking-tighter mb-1">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">{item.location}</p>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-6">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">Total Payable</p>
                    <p className="text-4xl font-black text-[#002D5B] tracking-tighter">{item.price}</p>
                  </div>
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={paymentMethod === 'card' && (!cardNumber || !expiry || !cvv)}
                  className="w-full bg-[#1F93D0] text-white py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/30 hover:bg-[#1579af] transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirm & Settle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
