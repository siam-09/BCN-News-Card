import { Upload, Type, Image as ImageIcon, Calendar, Download, Sparkles } from 'lucide-react';

export function Features() {
  const featList = [
    {
      icon: <Upload className="w-5.5 h-5.5" />,
      title: 'Custom Logo Upload',
      desc: 'Inject your custom news anchor logo in PNG or JPG format to stamp your official branding onto coordinates instantly.',
    },
    {
      icon: <Type className="w-5.5 h-5.5" />,
      title: 'News Headline Editor',
      desc: 'Type compelling broadcast stories in uppercase with real-time text scaling sliders for perfect visual bounds.',
    },
    {
      icon: <ImageIcon className="w-5.5 h-5.5" />,
      title: 'Photo Upload',
      desc: 'Drag & drop high-resolution imagery. Automatically centered, clipped, and overlay-shaded in cover alignment.',
    },
    {
      icon: <Calendar className="w-5.5 h-5.5" />,
      title: 'Date & Time Customization',
      desc: 'Modify timestamps to match historical logs or synchronize with active real-time clocks in a single click.',
    },
    {
      icon: <Download className="w-5.5 h-5.5" />,
      title: 'HD Download',
      desc: 'Generates lossless 1200x1200px (1:1 Square) or 1200x675px (16:9 Landscape) graphics, optimized for rapid distribution.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-brand-light-gray relative overflow-hidden scroll-mt-12 border-b-2 border-brand-red/20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Title Block with Left Bold Accent Line */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2.5xl">
            <div className="inline-block bg-brand-red text-white text-[10px] font-black px-2 py-0.5 mb-3 uppercase tracking-widest">
              SYSTEM BENEFITS
            </div>
            <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white uppercase tracking-tight leading-none">
              High-Fidelity Broadcast Graphics Engine
            </h2>
            <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
              A comprehensive responsive platform giving online journalists, social content designers, and digital teams full editorial media-card capabilities with zero backend latency.
            </p>
          </div>
          <div className="flex-none font-mono text-[10px] text-gray-500 font-bold tracking-widest uppercase">
            ● COMPLIANT UTILITY SYSTEM v1.3
          </div>
        </div>

        {/* Feature Bento Grid with bold structural outlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featList.map((feat, index) => (
            <div 
              key={index} 
              id={`feature-card-${index}`}
              className="bg-brand-gray border-2 border-brand-red p-8 shadow-[4px_4px_0px_0px_#09090b] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#e50914] relative flex flex-col justify-between text-white"
            >
              <div>
                <div className="mb-6 flex items-center justify-center w-12 h-12 bg-brand-dark text-white border-2 border-brand-red rounded-none transform -rotate-3 shadow-[2px_2px_0px_0px_#000] group-hover:rotate-0 transition-transform">
                  {feat.icon}
                </div>

                <div className="flex items-center space-x-2.5 mb-2.5">
                  <span className="text-brand-red font-display font-black text-xs">0{index + 1}</span>
                  <h3 className="font-display font-black text-md text-white uppercase tracking-tight">
                    {feat.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Exclusive Geometric Strip CTA card */}
          <div className="bg-brand-dark text-white border-2 border-brand-red p-8 shadow-[4px_4px_0px_0px_#e50914] relative flex flex-col justify-between overflow-hidden">
            <div>
              <div className="inline-block bg-brand-red text-white text-[9px] font-black tracking-widest px-2 py-0.5 uppercase mb-4">
                STATION EXCLUSIVE
              </div>
              <h3 className="font-display font-black text-xl tracking-tight uppercase mb-3">
                Unified News Standards
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                All template outputs rigorously comply with global newsroom display standards. Balanced spacing, precise text truncation and secure boundary lines are maintained automatically.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
              <span className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase">
                ENGINE ONLINE & STABLE
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
