import { useState, useEffect } from 'react';
import { Newspaper, Tv, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onStudioClick: () => void;
}

export function Header({ onStudioClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live countdown/timer in the top header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-dark text-white border-b-4 border-brand-red py-3 shadow-xl' 
          : 'bg-brand-dark/90 text-white border-b-2 border-brand-red/50 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-brand-red hover:bg-brand-red-hover px-3 py-1.5 font-display font-black italic tracking-tighter text-lg md:text-xl text-white shadow-md transform -skew-x-6 transition-all duration-200">
              BCN NEWS
            </div>
            <div className="hidden sm:block text-[10px] font-mono tracking-widest uppercase opacity-75">
              Photo Card System
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-xs font-bold uppercase tracking-wider text-brand-red">Home</a>
            <a href="#editor-section" className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-red transition-colors duration-150 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              Creator Studio
            </a>
            <a href="#features" className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-red transition-colors duration-150">Features</a>
            <a href="#gallery" className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-red transition-colors duration-150">Templates</a>
            <a href="#about" className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-red transition-colors duration-150">About</a>
            <a href="#contact" className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-red transition-colors duration-150">Contact</a>
          </nav>

          {/* Action Button & Clock */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-col items-end border-l-2 border-brand-red pl-4 font-mono">
              <span className="text-[9px] text-gray-400 tracking-wider font-bold">NETWORK TIME</span>
              <span className="text-xs text-brand-red font-bold">{timeStr || 'FRIDAY, 05 JUN 2026'}</span>
            </div>
            
            <button
              id="header-cta"
              onClick={onStudioClick}
              className="relative px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center gap-1.5 overflow-hidden"
            >
              <Newspaper className="w-4 h-4" />
              <span>Launch Studio</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
