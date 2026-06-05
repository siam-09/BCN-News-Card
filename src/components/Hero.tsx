import { Newspaper, ChevronDown, Award, Bolt, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export function Hero({ onStartClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-brand-dark pt-28 pb-16 overflow-hidden border-b-2 border-brand-red/20"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Narrative details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left animate-slide-up">
          <div className="inline-block bg-brand-red text-white text-[10px] font-black px-3 py-1 mb-5 uppercase tracking-widest w-fit transform -skew-x-6">
            Professional Edition
          </div>
          
          <h1 
            className="font-display font-black text-4xl sm:text-5xl md:text-6.5xl leading-none mb-6 text-white uppercase tracking-tight"
          >
            Create Professional <span className="text-brand-red">News Photo Cards</span> Easily
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
            The ultimate platform for journalists, bloggers, and social media creators to generate high-fidelity news graphics in seconds. Upload, edit, and export HD quality photo cards with industry-standard layouts.
          </p>

          {/* Action button triggers matching Geometrics */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartClick}
              className="bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 border-2 border-brand-dark shadow-[4px_4px_0px_0px_#18181b] hover:scale-[1.02]"
            >
              <Newspaper className="w-4 h-4" />
              <span>Start Creating</span>
            </button>
            <a
              href="#gallery"
              className="border-2 border-brand-red hover:bg-brand-red text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-150 text-center flex items-center justify-center cursor-pointer shadow-[4px_4px_0px_0px_#09090b]"
            >
              Explore Designs
            </a>
          </div>
        </div>

        {/* Right Column Interactive mock screen preview */}
        <div className="lg:col-span-5 bg-brand-gray relative overflow-hidden flex items-center justify-center p-8 rounded-none border-2 border-brand-red/20 shadow-xl">
          <div className="w-full aspect-video bg-brand-dark shadow-[8px_8px_0px_0px_#e50914] border-2 border-brand-red/50 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-full h-full bg-neutral-900 relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" 
                alt="Dynamic press broadcast deck" 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 border-l-8 border-brand-red">
                <div className="text-brand-red text-[10px] font-bold uppercase mb-1 italic tracking-widest">
                  Breaking News
                </div>
                <div className="text-white text-base font-bold leading-tight font-display uppercase tracking-tight">
                  GLOBAL NEWS CARD UTILITY RELEASES SYSTEM v1.3
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative bouncy helper */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer hidden lg:flex" onClick={onStartClick}>
        <span className="text-[9px] font-mono tracking-widest text-gray-400 font-bold uppercase">SCROLL TO NEWSROOM</span>
        <ChevronDown className="w-4 h-4 text-brand-red animate-bounce" />
      </div>
    </section>
  );
}
