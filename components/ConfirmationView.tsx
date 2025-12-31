
import React, { useEffect, useState } from 'react';
import { TravelItem, View as AppView, BookingTab } from '../types';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';

interface ConfirmationViewProps {
  item: TravelItem;
  userName: string;
  onNavigate: (view: AppView) => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ item, userName, onNavigate }) => {
  const [emailContent, setEmailContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [bookingRef] = useState(`EB-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);

  useEffect(() => {
    const generateEmail = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          Generate a professional, luxury-tier booking confirmation for Ebony Bruce Travels.
          Customer: ${userName || 'Valued Traveler'}
          Reference: ${bookingRef}
          Product: ${item.title}
          Category: ${item.type}
          Location: ${item.location}
          Paid: ${item.price}
          
          The tone should be sophisticated, warm, and highly professional. Include travel next steps.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            systemInstruction: 'You are the head of customer concierge at Ebony Bruce Travels.',
            temperature: 0.3,
          },
        });

        setEmailContent(response.text || 'Your premium booking is confirmed.');
      } catch (error) {
        setEmailContent('Confirmation successful. Your itinerary has been updated.');
      } finally {
        setIsLoading(false);
      }
    };

    generateEmail();
  }, [item, userName, bookingRef]);

  const triggerDownload = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    setIsDownloading('pdf');
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        const primaryColor = [0, 45, 91];
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('EBONY BRUCE TRAVELS', 20, 25);
        doc.setFontSize(10);
        doc.text('PREMIUM TRAVEL ITINERARY', 20, 32);
        doc.setTextColor(0, 0, 0);
        doc.text(`Reference: ${bookingRef}`, 20, 60);
        doc.text(`Guest: ${userName}`, 20, 70);
        doc.text(`Destination: ${item.location}`, 20, 80);
        doc.text(`Total: ${item.price}`, 20, 90);
        doc.save(`EbonyBruce_Itinerary_${bookingRef}.pdf`);
      } finally {
        setIsDownloading(null);
      }
    }, 800);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `Ebony Bruce Ref: ${bookingRef}`
  )}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-700">
      <div className="bg-[#002D5B] pt-24 pb-48 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 italic">Success Verified.</h1>
          <p className="text-blue-200 font-bold uppercase text-[10px] tracking-[0.4em]">Reference Code: <span className="text-white">{bookingRef}</span></p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-20 space-y-8">
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          <div className="flex-grow p-12 md:p-16">
            <h2 className="text-3xl font-black text-[#002D5B] uppercase tracking-tight mb-10 italic">Digital Itinerary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1 block">Full Name</label>
                  <p className="text-xl font-black text-[#002D5B] uppercase italic">{userName}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1 block">Destination</label>
                  <p className="text-xl font-black text-[#002D5B] uppercase italic">{item.location}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1 block">Product Code</label>
                  <p className="text-xl font-black text-[#002D5B] uppercase italic font-mono">{bookingRef}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1 block">Transaction</label>
                  <p className="text-xl font-black text-[#002D5B] uppercase italic">{item.price} NET</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-50">
              <button 
                onClick={handleDownloadPDF}
                className="bg-[#002D5B] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all flex items-center"
              >
                {isDownloading === 'pdf' ? 'Encrypting PDF...' : 'Download Itinerary'}
              </button>
              <button 
                onClick={() => onNavigate(AppView.HOME)} 
                className="bg-[#1F93D0] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1579af] transition-all ml-auto"
              >
                New Exploration
              </button>
            </div>
          </div>
          <div className="w-full md:w-80 bg-slate-50 border-l border-slate-100 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-40 h-40 bg-white rounded-[2rem] border-2 border-[#002D5B]/10 flex items-center justify-center p-4 shadow-xl mb-6 overflow-hidden">
              <img src={qrCodeUrl} alt="QR" className="w-full h-full object-contain" />
            </div>
            <p className="text-[10px] font-black uppercase text-[#002D5B] tracking-widest mb-2">Security Pass</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed">Present this code for priority access and lounge entry.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ebony Bruce Concierge Delivery</span>
          </div>
          <div className="p-12 md:p-16 min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-4">
                <div className="w-8 h-8 border-4 border-[#1F93D0] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap font-sans text-slate-600 leading-relaxed text-sm">
                {emailContent}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationView;
