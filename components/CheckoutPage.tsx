
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

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1500);
  };

  if (isProcessing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-black uppercase">Processing Reservation...</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] mt-2">Verifying inventory with {item.title}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase leading-none mb-2">Checkout</h1>
        <p className="text-xl font-medium text-gray-600">Review your trip details and confirm your booking</p>
        <div className="w-24 h-2 bg-black mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Forms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Traveler Info */}
          <div className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center">
              <span className="w-8 h-8 border-2 border-black flex items-center justify-center mr-3 text-sm">1</span>
              Traveler Information
            </h3>
            
            {!isLoggedIn ? (
              <div className="bg-gray-100 border-2 border-black border-dashed p-6 text-center mb-6">
                <p className="text-xs font-bold uppercase mb-4">You are booking as a guest</p>
                <button className="text-[10px] font-black uppercase underline decoration-2">Sign in to earn rewards</button>
              </div>
            ) : (
              <div className="mb-6 p-4 border-2 border-black bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Primary Traveler</p>
                  <p className="text-sm font-black uppercase">{userName}</p>
                </div>
                <button className="text-[10px] font-black uppercase underline">Change</button>
              </div>
            )}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">First Name</label>
                <input type="text" placeholder="e.g. James" className="border-2 border-black p-3 text-sm font-medium outline-none" required defaultValue={isLoggedIn ? userName.split(' ')[0] : ''} />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">Last Name</label>
                <input type="text" placeholder="e.g. Bruce" className="border-2 border-black p-3 text-sm font-medium outline-none" required />
              </div>
              <div className="flex flex-col space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-gray-500">Email for Confirmation</label>
                <input type="email" placeholder="name@email.com" className="border-2 border-black p-3 text-sm font-medium outline-none" required />
              </div>
            </form>
          </div>

          {/* Step 2: Payment */}
          <div className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center">
              <span className="w-8 h-8 border-2 border-black flex items-center justify-center mr-3 text-sm">2</span>
              Payment Method
            </h3>

            <div className="space-y-4">
              <label className={`flex items-center justify-between p-4 border-2 border-black cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <input type="radio" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-4 h-4 accent-white" />
                  <span className="text-xs font-black uppercase">Ebony Bruce Wallet (NGN 120,000)</span>
                </div>
                <span className="text-[10px] font-bold uppercase opacity-60">Balance: NGN 120,000.00</span>
              </label>

              <label className={`flex items-center justify-between p-4 border-2 border-black cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 accent-white" />
                  <span className="text-xs font-black uppercase">Credit / Debit Card (Local & Int'l)</span>
                </div>
                <div className="flex space-x-2 opacity-60">
                  <div className="w-6 h-4 border border-current"></div>
                  <div className="w-6 h-4 border border-current"></div>
                </div>
              </label>

              <label className={`flex items-center justify-between p-4 border-2 border-black cursor-pointer transition-colors ${paymentMethod === 'transfer' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <input type="radio" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-4 h-4 accent-white" />
                  <span className="text-xs font-black uppercase">Bank Transfer / USSD</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4">
          <div className="border-2 border-black p-6 bg-white sticky top-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-black uppercase text-gray-400 mb-4 border-b border-black pb-2">Booking Summary</h3>
            
            <div className="mb-6 flex gap-3">
              <div className="w-16 h-16 border border-black placeholder-image opacity-30 flex-shrink-0"></div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">{item.type}</p>
                <p className="text-xs font-black uppercase">{item.title}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">{item.location}</p>
              </div>
            </div>

            <div className="space-y-3 mb-8 text-xs">
              <div className="flex justify-between font-bold text-gray-500 uppercase">
                <span>Base Price</span>
                <span>{item.price}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-500 uppercase">
                <span>Taxes & Fees</span>
                <span className="text-black">Included</span>
              </div>
              <div className="pt-3 border-t-2 border-black flex justify-between items-end">
                <span className="font-black uppercase">Total Price</span>
                <span className="text-xl font-black">{item.price}</span>
              </div>
            </div>

            <button 
              onClick={handleConfirm}
              className="w-full bg-black text-white py-4 text-sm font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 mb-4"
            >
              Complete Booking
            </button>

            <button 
              onClick={onCancel}
              className="w-full text-[10px] font-black uppercase underline decoration-2 hover:text-gray-500"
            >
              Cancel and return
            </button>

            <div className="mt-8 p-3 bg-gray-50 border border-black flex items-start space-x-2">
              <div className="w-4 h-4 border-2 border-black flex items-center justify-center text-[10px] font-black">!</div>
              <p className="text-[9px] font-bold text-gray-500 uppercase leading-tight">
                By completing this booking, you agree to our Terms of Use and the {item.title} cancellation policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
