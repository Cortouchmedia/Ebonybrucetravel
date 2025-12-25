
import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been sent to Ebony Bruce Travels.');
    onBack();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="text-[10px] font-black uppercase underline decoration-2 mb-12 hover:text-gray-500"
      >
        ← Return to home
      </button>

      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-4">Contact Us</h1>
        <div className="w-32 h-4 bg-black"></div>
        <p className="mt-6 text-xl text-gray-600 font-medium max-w-2xl">
          Have questions about our specialized services or need help with a booking? Our team is here to help you navigate your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-10">
          <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">Global Headquarters</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Address</p>
                <p className="text-sm font-bold uppercase">123 Ebony Bruce Way, Victoria Island, Lagos, Nigeria</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Phone</p>
                <p className="text-sm font-bold uppercase">+234 (0) 800 EBONY BRUCE</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Email</p>
                <p className="text-sm font-bold uppercase">hello@ebonybrucetravels.com</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-8 bg-gray-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">Business Hours</h3>
            <ul className="space-y-3 text-xs font-bold uppercase">
              <li className="flex justify-between"><span>Monday - Friday</span> <span>08:00 - 18:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>10:00 - 14:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>

          <div className="border-2 border-black border-dashed aspect-video flex items-center justify-center opacity-20 font-black text-2xl italic bg-gray-100">
            OFFICE MAP PLACEHOLDER
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-8 italic">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Full Name</label>
                  <input type="text" required className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50" placeholder="JOHN DOE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Email Address</label>
                  <input type="email" required className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50" placeholder="JOHN@EXAMPLE.COM" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Service of Interest</label>
                <select className="w-full border-2 border-black p-4 text-sm font-bold outline-none bg-white">
                  <option>GENERAL INQUIRY</option>
                  <option>DHL LOGISTICS</option>
                  <option>ADMISSION PROCESSING</option>
                  <option>TOURS & HOLIDAYS</option>
                  <option>CORPORATE TRAVEL</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Your Message</label>
                <textarea rows={6} required className="w-full border-2 border-black p-4 text-sm font-bold outline-none focus:bg-gray-50 resize-none" placeholder="HOW CAN WE HELP YOU?"></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-5 font-black uppercase italic border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
