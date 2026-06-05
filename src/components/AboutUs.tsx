import { Star, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-brand-dark border-t-2 border-brand-red/20 scroll-mt-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual Brand Illustration Cards with bold geometric contrast */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-[140px] h-[200px] bg-brand-light-gray border-2 border-brand-red rounded-none shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col justify-between">
                <span className="text-3xl font-black text-brand-red font-display">01</span>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">CRISP RED</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Symmetrical screen lines optimized for heavy news.</p>
                </div>
              </div>
              <div className="w-[200px] h-[200px] bg-brand-red hover:bg-brand-red-hover border-2 border-brand-dark rounded-none shadow-[4px_4px_0px_0px_#000] p-5 flex flex-col justify-between text-white transition-all duration-200 transform hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <Star className="w-5 h-5 fill-white text-white" />
                  <span className="text-[9px] font-mono border-2 border-white font-bold px-2 uppercase">LIVE PRO</span>
                </div>
                <div>
                  <h4 className="font-display font-black text-lg tracking-tight leading-none uppercase">PRESTIGE ACCENTS</h4>
                  <p className="text-xs text-white/90 mt-1.5">No messy watermarks, completely direct client downloads in 300dpi outputs.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[220px] h-[160px] bg-brand-gray text-white border-2 border-brand-red rounded-none shadow-[4px_4px_0px_0px_#e50914] p-5 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-brand-red uppercase font-black">● SECURE PROCESS</div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  We render entirely inside local sandboxed client buffers. Your uploaded private photos never reach an external cloud.
                </p>
              </div>
              <div className="w-[120px] h-[160px] bg-brand-light-gray border-2 border-brand-red rounded-none shadow-[4px_4px_0px_0px_#000] flex items-center justify-center p-4 text-center">
                <div>
                  <span className="block text-4xl font-black text-white font-display">4+</span>
                  <span className="block text-[9px] text-gray-400 font-mono uppercase tracking-widest mt-1 font-bold">Aspect Themes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative content info */}
          <div className="space-y-6">
            <div className="inline-block bg-brand-red text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              WHO WE ARE
            </div>
            
            <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white tracking-tight leading-none uppercase">
              Uncompromising Quality in Newsroom Graphics
            </h2>
            
            <p className="text-gray-350 text-sm sm:text-base leading-relaxed">
              <strong>BCN NEWS PHOTO CARD</strong> is a professional utility born from the needs of fast-paced media writers, freelancers, and independent publishing platforms. In a modern landscape where visual authority demands instant presence, our applet streamlines graphics compilation down to seconds.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              We completely eliminate the friction of complex designers, heavy software suites, and cloud payment queues. By rendering each block, text segment, gradient mask, and customizable ticker directly inside your browser cache, we grant you unparalleled packaging speed while keeping your proprietary local uploads secure.
            </p>

            {/* Bullets with high contrast indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-red/20 font-display text-xs text-white uppercase font-black">
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-4 h-4 text-brand-red shrink-0" />
                <span>100% Free & Open-Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                <span>Zero Database Data Leaks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-brand-red shrink-0" />
                <span>True Pixel-Perfect Ratios</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-brand-red shrink-0" />
                <span>Trusted by 100+ Creators</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
