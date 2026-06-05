import { Play, Sparkles, LayoutGrid } from 'lucide-react';
import { TEMPLATES } from '../constants';
import { NewsCardState } from '../types';

interface TemplateGalleryProps {
  onLoadPreset: (state: Partial<NewsCardState>) => void;
}

export function TemplateGallery({ onLoadPreset }: TemplateGalleryProps) {
  return (
    <section id="gallery" className="py-24 bg-brand-light-gray border-t-2 border-brand-red/20 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="mb-14 text-center">
          <div className="inline-block bg-brand-red text-white text-[10px] font-black px-2 py-0.5 mb-3 uppercase tracking-widest">
            LAYOUT GALLERY
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white uppercase tracking-tight leading-none">
            Template Design Gallery
          </h2>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
            Choose from a professional library of styles. Click any layout to load it instantly inside the Newsroom Creator above.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATES.map((tpl) => (
            <div 
              key={tpl.id}
              className="group bg-brand-gray rounded-none border-2 border-brand-red overflow-hidden flex flex-col justify-between h-[430px] shadow-[4px_4px_0px_0px_#09090b] hover:shadow-[6px_6px_0px_0px_#e50914] transition-all duration-150 text-white"
            >
              
              {/* Preview Thumbnail Container */}
              <div className="relative h-[200px] overflow-hidden bg-brand-dark border-b-2 border-brand-red">
                <img 
                  src={tpl.imageUrl} 
                  alt={tpl.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-200" />
                
                {/* Visual Label overlay */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono shrink-0 bg-brand-red text-white py-1 px-2.5 font-bold uppercase tracking-widest border border-brand-red">
                    {tpl.state.category || 'PRESENTER'}
                  </span>
                </div>
              </div>

              {/* Gallery Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-sm text-white uppercase tracking-tight group-hover:text-brand-red leading-tight transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2.5 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Instant load action */}
                <button
                  onClick={() => onLoadPreset(tpl.state)}
                  className="w-full mt-5 py-2.5 bg-brand-dark hover:bg-brand-red text-white rounded-none text-xs font-display font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 border border-brand-red"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Customize Template</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
