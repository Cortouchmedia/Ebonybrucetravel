
import React from 'react';
import { View } from '../types';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns = [
    { 
      title: 'Voyage', 
      links: [
        { label: 'Premium Stays', view: View.STAYS_PAGE },
        { label: 'Global Airfare', view: View.FLIGHTS_PAGE },
        { label: 'Elite Car Hire', view: View.CARS_PAGE },
        { label: 'Bespoke Tours', view: View.TOURS_PAGE }
      ] 
    },
    { 
      title: 'Operations', 
      links: [
        { label: 'Our Story', view: View.ABOUT_US },
        { label: 'DHL Logistics', view: View.DHL_LOGISTICS },
        { label: 'Admissions', view: View.ADMISSION_PROCESSING },
        { label: 'Career Hub', view: undefined }
      ] 
    },
    { 
      title: 'Concierge', 
      links: [
        { label: 'Contact Us', view: View.CONTACT_PAGE },
        { label: 'Help Center', view: undefined },
        { label: 'Privacy', view: undefined },
        { label: 'Terms', view: undefined }
      ] 
    }
  ];

  return (
    <footer className="bg-[#020617] text-white pt-20 relative overflow-hidden" role="contentinfo">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1F93D0]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12">
        
        {/* Floating Newsletter Section */}
        <div className="relative -mt-32 mb-24 z-20">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#1F93D0]/10 blur-[80px] rounded-full group-hover:bg-[#1F93D0]/20 transition-colors duration-700"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1F93D0]">Priority Dispatch</span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Join the elite <br />travel registry.
                </h3>
                <p className="text-white/40 text-sm font-medium tracking-wide max-w-sm">
                  Receive curated global inventory and private rates directly to your inbox.
                </p>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium outline-none focus:border-[#1F93D0] focus:ring-1 focus:ring-[#1F93D0] transition-all"
                />
                <button className="bg-white text-black px-10 py-5 rounded-2xl text-xs font-bold tracking-wide hover:bg-[#1F93D0] hover:text-white transition-all shadow-xl active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-10">
            <div 
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => onNavigate?.(View.HOME)}
            >
              <img
      src="/images/logo1.png"   
      alt="Ebony Bruce Travels Logo"
      className="h-14 w-auto"  
    />
             
              
            </div>
            
            <p className="text-sm font-medium text-white/40 leading-relaxed max-w-xs">
              Curating high-tier global mobility and bespoke discovery for the modern leadership class since 2010.
            </p>

            <div className="flex items-center space-x-4">
              {[
                { name: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                { name: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /> },
                { name: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> }
              ].map((social) => (
                <button 
                  key={social.name}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1F93D0] hover:border-[#1F93D0] hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <svg className="w-4 h-4 fill-white transition-transform" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Link Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="lg:col-span-2 space-y-8">
              <h4 className="text-sm font-bold tracking-tight text-white/20">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button 
                      onClick={() => link.view && onNavigate?.(link.view)}
                      className="text-sm font-medium text-white/50 hover:text-white transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#1F93D0] mr-0 group-hover:mr-2 transition-all"></span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* HQ Registry Column */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-bold tracking-tight text-white/20">HQ Registry</h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-[#1F93D0] uppercase tracking-wider">Lagos Terminal</p>
                <p className="text-sm font-medium tracking-tight leading-relaxed text-white/70">
                  123 Victoria Island<br />Lagos, Nigeria
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-[#1F93D0] uppercase tracking-wider">Digital Hub</p>
                <p className="text-sm font-medium tracking-tight text-white/70">concierge@ebonybruce.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="border-t border-white/5 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-10 text-xs font-medium text-white/20">
            <span>&copy; 2025 Ebony Bruce Travels</span>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
              <span className="text-green-500/40">Secure Connection</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-3 text-xs font-medium text-white/40 hover:text-white transition-colors group"
            >
              <span>Back to Top</span>
              <svg className="w-3 h-3 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <div className="w-px h-4 bg-white/10"></div>
            <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5 flex items-center space-x-3">
              <span className="text-[11px] font-bold text-white/40">NGN / EN</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
