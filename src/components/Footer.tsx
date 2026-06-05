import { Tv, ShieldCheck } from 'lucide-react';

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark border-t-4 border-brand-red py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleScrollToTop}>
            <div className="bg-brand-red hover:bg-brand-red-hover px-3 py-1.5 font-display font-black italic tracking-tighter text-base text-white shadow-md transform -skew-x-6 transition-all duration-200">
              BCN NEWS
            </div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-bold">
              Photo Card System
            </div>
          </div>

          {/* Quick links footer */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300 font-bold uppercase tracking-wider">
            <a href="#hero" className="hover:text-brand-red transition-colors">Home</a>
            <a href="#editor-section" className="hover:text-brand-red transition-colors">Creator Studio</a>
            <a href="#features" className="hover:text-brand-red transition-colors">Features</a>
            <a href="#gallery" className="hover:text-brand-red transition-colors">Templates</a>
            <a href="#about" className="hover:text-brand-red transition-colors">About</a>
            <a href="#contact" className="hover:text-brand-red transition-colors">Contact</a>
          </div>

          {/* License label stamp */}
          <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono font-bold tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>SSL SECURE BUFFER</span>
          </div>

        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
          
          <p>© {new Date().getFullYear()} BCN NEWS PHOTO CARD. ALL RIGHTS RESERVED. PROFESSIONAL GRAPHICS PLATFORM.</p>
          
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={handleScrollToTop}>Back to Top</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
