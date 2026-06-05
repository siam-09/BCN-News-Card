import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import { 
  Download, Upload, Image as ImageIcon, Sparkles, 
  RefreshCw, MapPin, Calendar, User, Type, 
  Layers, Check, Eye, ToggleLeft, ToggleRight, Play 
} from 'lucide-react';
import { NewsCardState, SampleTemplate } from '../types';
import { CATEGORY_PRESETS, SAMPLE_PHOTOS, THEMES, DEFAULT_STATE } from '../constants';
import { renderNewsCard } from '../utils/canvasRenderer';

interface NewsStudioProps {
  state: NewsCardState;
  onChange: (newState: NewsCardState) => void;
  onLoadTemplate: (templateState: Partial<NewsCardState>) => void;
}

export function NewsStudio({ state, onChange, onLoadTemplate }: NewsStudioProps) {
  const [downloading, setDownloading] = useState(false);
  const [customPhotoName, setCustomPhotoName] = useState<string>('');
  const [customLogoName, setCustomLogoName] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Handle standard properties
  const updateField = (key: keyof NewsCardState, value: any) => {
    onChange({ ...state, [key]: value });
  };

  // Pre-populate with current local UTC time
  const handleSetCurrentTime = () => {
    const now = new Date();
    const utcStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).toUpperCase();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    updateField('dateTime', `${utcStr} • ${hours}:${minutes}`);
  };

  // Category presets selection helper
  const handleSelectCategoryPreset = (label: string, color: string, textColor: string) => {
    onChange({
      ...state,
      category: label,
      categoryBgColor: color,
      categoryTextColor: textColor,
    });
  };

  // Process photo files using FileReader to base64 Data URLs
  const handlePhotoFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCustomPhotoName(file.name);
        updateField('photoUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Process logo files using FileReader to base64 Data URLs
  const handleLogoFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCustomLogoName(file.name);
        updateField('logoUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Custom photo upload handler
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoFile(file);
    }
  };

  // Custom logo upload handler
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLogoFile(file);
    }
  };

  // Drag-and-drop event handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handlePhotoFile(file);
    }
  };

  // Reset to default sample photo
  const handleSelectSamplePhoto = (url: string, name: string) => {
    setCustomPhotoName('');
    updateField('photoUrl', url);
  };

  // Remove logo and fallback to text brand logo
  const handleRemoveLogo = () => {
    setCustomLogoName('');
    updateField('logoUrl', '');
  };

  // Trigger HD rendering to canvas & download triggering
  const handleDownloadHD = async () => {
    try {
      setDownloading(true);
      const dataUrl = await renderNewsCard(state);
      
      const link = document.createElement('a');
      const safeHeadline = state.headline
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 30);
      
      link.download = `bcn_news_card_${safeHeadline || 'editorial'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('HD Render Error:', err);
      alert('We encountered an error generating the HD render. Your browser settings may block canvas pixel manipulation from secure static servers. We fall back to standard capture.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="editor-section" className="py-24 bg-brand-dark border-y-2 border-brand-red/25 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
              Interlocking Broadcast Layouts
            </span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4.5xl text-white uppercase tracking-tight">
            Newsroom Creator Studio
          </h2>
          <p className="text-gray-300 mt-2 max-w-xl text-sm leading-relaxed">
            Configure raw metadata sliders, upload high-ratio assets, insert ticker feeds, and click Download to generate professional branding content.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                   {/* LEFT COLUMN: Controls & Input Parameters */}
          <div className="lg:col-span-5 bg-brand-gray border-2 border-brand-red rounded-none p-6 shadow-[6px_6px_0px_0px_#09090b] space-y-6 text-white">
            
            {/* Control tab header */}
            <div className="flex items-center space-x-2 border-b-2 border-brand-red pb-4">
              <Layers className="w-5 h-5 text-brand-red" />
              <h3 className="font-display font-black text-base text-white tracking-tight uppercase">Editor Parameters</h3>
            </div>

            {/* Step 1: Image Sizing & Layout Ratio */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-1.5 uppercase">
                <span>1. Layout Aspect Ratio</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('aspectRatio', '1:1')}
                  className={`px-4 py-3 rounded-none border-2 border-brand-red/50 text-xs font-bold uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                    state.aspectRatio === '1:1'
                      ? 'bg-brand-red text-white shadow-[2px_2px_0px_0px_#09090b]'
                      : 'bg-brand-dark text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="w-4 h-4 bg-transparent border-2 border-current inline-block aspect-square select-none pointer-events-none" />
                  Square (1:1 Ratio)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('aspectRatio', '16:9')}
                  className={`px-4 py-3 rounded-none border-2 border-brand-red/50 text-xs font-bold uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                    state.aspectRatio === '16:9'
                      ? 'bg-brand-red text-white shadow-[2px_2px_0px_0px_#09090b]'
                      : 'bg-brand-dark text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="w-5 h-3 bg-transparent border-2 border-current inline-block select-none pointer-events-none" />
                  Landscape (16:9)
                </button>
              </div>
            </div>

            {/* Step 2: Theme Selectors */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-1.5 uppercase">
                <span>2. Visual Theme Preset</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => updateField('themeStyle', theme.id)}
                    className={`p-2.5 rounded-none border-2 text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all duration-150 text-left flex flex-col justify-between h-16 ${
                      state.themeStyle === theme.id
                        ? 'bg-brand-dark border-brand-red text-white shadow-[2px_2px_0px_0px_#e50914]'
                        : 'bg-brand-dark border-brand-red/35 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="truncate">{theme.label.split(' ')[0]}</span>
                      {state.themeStyle === theme.id && <Check className="w-3 h-3 text-brand-red" />}
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      <span className="w-3 h-3 border border-brand-red bg-current" style={{ color: theme.primary }} />
                      <span className="w-3 h-3 border border-brand-red bg-current" style={{ color: theme.dark }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Graphic Photo Upload & Presets */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-1.5 uppercase">
                  <ImageIcon className="w-4 h-4 text-brand-red" />
                  <span>3. Dynamic Photo</span>
                </label>
                {customPhotoName && (
                  <button 
                    onClick={() => handleSelectSamplePhoto(SAMPLE_PHOTOS[0].url, '')}
                    className="text-[10px] font-mono text-brand-red hover:underline font-bold"
                  >
                    Clear Custom
                  </button>
                )}
              </div>

              {/* Drag n Drop Upload Zone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group relative border-2 border-dashed rounded-none p-4 cursor-pointer text-center transition-all duration-150 shadow-[2px_2px_0px_0px_#09090b] ${
                  isDragging 
                    ? 'border-brand-red bg-brand-red/20 scale-[1.01]' 
                    : 'border-brand-red/50 hover:border-brand-red bg-brand-dark/40 hover:bg-brand-dark'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden" 
                />
                <Upload className="w-8 h-8 text-white group-hover:text-brand-red mx-auto mb-2 transition-colors duration-200" />
                <span className="block text-xs font-black uppercase tracking-wider text-white">
                  {customPhotoName ? customPhotoName : 'Click/Drag to Upload Custom Photo'}
                </span>
                <span className="block text-[9px] text-gray-400 font-bold uppercase mt-1">
                  Drag and drop files here, supported formats JPG, PNG, WEBP
                </span>
              </div>

              {/* Sample Photo grid selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-black text-white uppercase tracking-wider">
                  Quick Sample Photos:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {SAMPLE_PHOTOS.map((ph, idx) => {
                    const isSelected = state.photoUrl === ph.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSamplePhoto(ph.url, ph.name)}
                        className={`relative rounded-none overflow-hidden h-12 border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-brand-red ring-1 ring-brand-red scale-102 shadow-[2px_2px_0px_0px_#09090b]' : 'border-brand-red/30 hover:scale-102 hover:border-brand-red'
                        }`}
                        title={ph.name}
                      >
                        <img src={ph.url} alt={ph.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/25 hover:bg-transparent transition-colors flex items-center justify-center">
                          {isSelected && <div className="bg-brand-red text-white p-0.5 border border-brand-dark"><Check className="w-3 h-3" /></div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Editorial Headline Content */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-black text-white tracking-wider flex items-center justify-between uppercase">
                <span className="flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-brand-red" />
                  <span>4. News Headline Text</span>
                </span>
                <span className="text-[10px] text-gray-300 font-bold">{state.headline.length} chars</span>
              </label>
              
              <textarea
                value={state.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                rows={3}
                placeholder="Type your compelling story headline here..."
                className="w-full bg-brand-dark text-white p-3.5 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-bold transition-all resize-none shadow-sm"
              />

              {/* Font Size slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                  <span className="text-gray-400 uppercase">Headline Text Size:</span>
                  <span className="text-brand-red font-black">{state.headlineSize} px</span>
                </div>
                <input 
                  type="range" 
                  min={24}  
                  max={58} 
                  step={2}
                  value={state.headlineSize} 
                  onChange={(e) => updateField('headlineSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 accent-brand-red rounded-none cursor-pointer appearance-none"
                />
              </div>
            </div>

            {/* Step 5: Logo & Category Badging */}
            <div className="space-y-4 pt-4 border-t-2 border-brand-red/35">
              
              {/* Logo custom upload */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono font-black text-white tracking-wider uppercase">
                    Logo Customization
                  </label>
                  {state.logoUrl && (
                    <button onClick={handleRemoveLogo} className="text-[10px] font-mono text-brand-red hover:underline font-bold">
                      Fallback to Text Base
                    </button>
                  )}
                </div>
                {state.logoUrl ? (
                  <div className="p-2.5 bg-brand-dark rounded-none flex items-center justify-between border-2 border-brand-red/50 shadow-[2px_2px_0px_0px_#09090b]">
                    <span className="text-xs text-white truncate max-w-[200px] font-mono font-bold">{customLogoName || 'Custom Logo Attached'}</span>
                    <button 
                      onClick={handleRemoveLogo}
                      className="text-xs text-brand-red hover:text-brand-red font-bold transition-colors uppercase font-mono tracking-wider"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={state.logoText}
                      onChange={(e) => updateField('logoText', e.target.value)}
                      placeholder="e.g. BCN NEWS"
                      className="flex-1 bg-brand-dark text-white px-3 py-2 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-bold tracking-widest uppercase shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="px-3.5 py-2 bg-brand-red hover:bg-brand-red-hover text-white border-2 border-brand-dark rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                      title="Upload custom logo file"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload JPG/PNG</span>
                    </button>
                    <input 
                      type="file" 
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden" 
                    />
                  </div>
                )}
              </div>

              {/* Category selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono font-black text-white tracking-wider uppercase">
                    Category Tag & Custom Color
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={state.category}
                    onChange={(e) => updateField('category', e.target.value.toUpperCase())}
                    placeholder="e.g. BREAKING NEWS"
                    className="flex-1 bg-brand-dark text-white px-3 py-2 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-black tracking-widest uppercase shadow-sm"
                  />
                  
                  {/* Colors block */}
                  <div className="flex items-center space-x-1.5 bg-brand-dark px-2 rounded-none border-2 border-brand-red/50">
                    <span className="text-[10px] font-mono text-white font-black">BG:</span>
                    <input 
                      type="color" 
                      value={state.categoryBgColor} 
                      onChange={(e) => updateField('categoryBgColor', e.target.value)}
                      className="w-6 h-6 border-2 border-brand-red/50 bg-transparent rounded-none cursor-pointer p-0"
                    />
                    <span className="text-[10px] font-mono text-white font-black">TXT:</span>
                    <input 
                      type="color" 
                      value={state.categoryTextColor} 
                      onChange={(e) => updateField('categoryTextColor', e.target.value)}
                      className="w-6 h-6 border-2 border-brand-red/50 bg-transparent rounded-none cursor-pointer p-0"
                    />
                  </div>
                </div>

                {/* Categories quick choices */}
                <div className="flex flex-wrap gap-1.5 font-bold">
                  {CATEGORY_PRESETS.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCategoryPreset(cat.label, cat.color, cat.text)}
                      className="text-[9px] font-black px-2 py-1 rounded-none tracking-wider uppercase border-2 border-brand-dark shadow-[1px_1px_0px_0px_#000] hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      style={{ backgroundColor: cat.color, color: cat.text }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 6: Dates, Location stamps & Reporters */}
            <div className="space-y-3.5 pt-4 border-t-2 border-brand-red/35">
              <label className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-1.5 uppercase">
                <span>5. Stamp Specifications</span>
              </label>

              {/* DateTime */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white font-black flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-red" /> DATE & TIME
                  </span>
                  <button 
                    onClick={handleSetCurrentTime}
                    className="text-[9px] font-mono bg-brand-red hover:bg-brand-red-hover text-white py-1 px-2 border border-brand-dark rounded-none cursor-pointer font-bold shadow-[1px_1px_0px_0px_#000] transition-all"
                  >
                    SYNC REAL-TIME
                  </button>
                </div>
                <input
                  type="text"
                  value={state.dateTime}
                  onChange={(e) => updateField('dateTime', e.target.value)}
                  placeholder="DATE & TIME VALUE"
                  className="w-full bg-brand-dark text-white p-2 text-xs rounded-none border-2 border-brand-red/50 outline-none focus:border-brand-red font-bold shadow-sm"
                />
              </div>

              {/* Location Stamp & Reporter Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white font-black flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-red" /> LOCATION
                  </span>
                  <input
                    type="text"
                    value={state.location}
                    onChange={(e) => updateField('location', e.target.value.toUpperCase())}
                    placeholder="e.g. BARCELONA"
                    className="w-full bg-brand-dark text-white p-2 text-xs rounded-none border-2 border-brand-red/50 outline-none focus:border-brand-red font-bold shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white font-black flex items-center gap-1">
                    <User className="w-3 h-3 text-brand-red" /> REPORTER TAG
                  </span>
                  <input
                    type="text"
                    value={state.reporter}
                    onChange={(e) => updateField('reporter', e.target.value)}
                    placeholder="REPORTER / SOURCE CITATION"
                    className="w-full bg-brand-dark text-white p-2 text-xs rounded-none border-2 border-brand-red/50 outline-none focus:border-brand-red font-bold shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 7: Live Ticker Overlay Details */}
            <div className="space-y-3 pt-4 border-t-2 border-brand-red/35">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-1.5 uppercase">
                  <span>6. Broadcast News Ticker</span>
                </label>
                <button
                  type="button"
                  onClick={() => updateField('showTicker', !state.showTicker)}
                  className="flex items-center gap-1 text-[11px] font-mono text-white font-black uppercase hover:text-brand-red cursor-pointer"
                >
                  <span>{state.showTicker ? 'TICKER ON' : 'TICKER OFF'}</span>
                  {state.showTicker ? (
                    <span className="text-brand-red font-bold">●</span>
                  ) : (
                    <span className="text-gray-400 font-bold">○</span>
                  )}
                </button>
              </div>

              {state.showTicker && (
                <input
                  type="text"
                  value={state.tickerText}
                  onChange={(e) => updateField('tickerText', e.target.value)}
                  placeholder="LATEST BROADCAST TICKER TEXT GOES HERE..."
                  className="w-full bg-brand-dark text-white p-2.5 text-xs rounded-none border-2 border-brand-red/50 outline-none focus:border-brand-red font-mono font-bold uppercase shadow-sm"
                />
              )}

              {/* Secondary elements toggle row */}
              <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-white font-black uppercase">
                <span>ADD BRAND WATERMARK OVERLAY</span>
                <button 
                  onClick={() => updateField('showWatermark', !state.showWatermark)}
                  className="text-brand-red hover:underline font-black cursor-pointer"
                >
                  {state.showWatermark ? 'ENABLED (YES)' : 'DISABLED (NO)'}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-Time Interactive HTML Preview and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-start bg-brand-gray border-2 border-brand-red rounded-none p-6 shadow-[6px_6px_0px_0px_#09090b] space-y-6">
            
            {/* Preview Banner Header */}
            <div className="flex items-center justify-between border-b-2 border-brand-red pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-brand-red" />
                <span className="font-display font-black text-sm text-white uppercase tracking-tight">
                  Active Screen Preview
                </span>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 bg-brand-red text-white uppercase font-bold tracking-wider animate-pulse">
                LIVE WYSIWYG
              </span>
            </div>

            {/* LIVE CARD PREVIEW BLOCK */}
            <div className="flex justify-center items-center py-6 w-full">
              <div 
                ref={previewContainerRef}
                style={{ 
                  aspectRatio: state.aspectRatio === '1:1' ? '1/1' : '16/9',
                  maxWidth: '100%',
                  width: '560px'
                }}
                className="relative overflow-hidden shadow-[8px_8px_0px_0px_#09090b] rounded-none border-4 border-brand-red select-none"
              >
                {/* Background image render layer */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <div className="absolute inset-0 bg-brand-dark" />
                  {state.photoUrl ? (
                    <img 
                      src={state.photoUrl} 
                      alt="News Background Preview" 
                      className="w-full h-full object-cover select-none pointer-events-none" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-gray to-brand-dark flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-white/10" />
                    </div>
                  )}
                </div>

                {/* Dark gradients to shield metadata readability depending on Light/Dark themes */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-all ${
                    state.themeStyle === 'minimal-light'
                      ? 'bg-gradient-to-t from-white via-white/70 to-transparent'
                      : 'bg-gradient-to-t from-black via-black/60 to-transparent'
                  }`}
                  style={{ zIndex: 2, top: '35%' }}
                />
                
                {/* Header shadow for logo */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-24 pointer-events-none ${
                    state.themeStyle === 'minimal-light'
                      ? 'bg-gradient-to-b from-white/80 to-transparent'
                      : 'bg-gradient-to-b from-black/85 to-transparent'
                  }`}
                  style={{ zIndex: 2 }}
                />

                {/* INTERACTIVE FLOATING ELEMENTS */}
                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between" style={{ zIndex: 10 }}>
                  
                  {/* TOP HEADER: Logo and LIVE coordinate status */}
                  <div className="flex items-center justify-between">
                    
                    {/* Logo display */}
                    <div className="flex items-center">
                      {state.logoUrl ? (
                        <img src={state.logoUrl} alt="Logo" className="h-6 md:h-8 object-contain max-w-[120px]" />
                      ) : (
                        <div className="flex">
                          <span 
                            className="font-display font-black text-xs md:text-sm px-1.5 py-0.5 text-white rounded-l" 
                            style={{ 
                              backgroundColor: 
                                state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                                state.themeStyle === 'minimal-light' ? '#111111' :
                                state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                                state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25',
                              color: state.themeStyle === 'cyber-dark' ? '#000000' : '#FFFFFF'
                            }}
                          >
                            {state.logoText.split(' ')[0] || 'BCN'}
                          </span>
                          <span 
                            className="font-display font-black text-xs md:text-sm px-1.5 py-0.5 border text-brand-red rounded-r"
                            style={{ 
                              borderColor: 
                                state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                                state.themeStyle === 'minimal-light' ? '#111111' :
                                state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                                state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25',
                              color: 
                                state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                                state.themeStyle === 'minimal-light' ? '#111111' :
                                state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                                state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25',
                            }}
                          >
                            {state.logoText.split(' ').slice(1).join(' ') || 'NEWS'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* LIVE Stamp coordinates */}
                    {state.location && (
                      <div className="flex items-center space-x-1.5 md:space-x-2 select-none">
                        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                        <span 
                          className={`font-display font-extrabold text-[9px] md:text-xs tracking-wider select-none ${
                            state.themeStyle === 'minimal-light' ? 'text-gray-900' : 'text-slate-100'
                          }`}
                        >
                          LIVE • {state.location.toUpperCase()}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* BOTTOM WRAPPED LAYOUT AREA */}
                  <div className="space-y-2 md:space-y-4">
                    
                    {/* Watermark above content if enabled */}
                    {state.showWatermark && (
                      <div 
                        className={`text-[8px] md:text-[9px] font-mono tracking-widest text-right border-b border-white/5 pb-1 select-none pointer-events-none hidden sm:block ${
                          state.themeStyle === 'minimal-light' ? 'text-black/30' : 'text-white/20'
                        }`}
                      >
                        GENERATED VIA BCN NEWS PHOTO CARD
                      </div>
                    )}

                    {/* Category Label Capsule */}
                    {state.category && (
                      <div className="flex">
                        <span 
                          className="font-display font-black text-[9px] md:text-xs px-2.5 py-1 text-white tracking-widest uppercase rounded shadow cursor-default select-none"
                          style={{ 
                            backgroundColor: state.categoryBgColor || '#E61E25',
                            color: state.categoryTextColor || '#FFFFFF'
                          }}
                        >
                          {state.category}
                        </span>
                      </div>
                    )}

                    {/* News Headline */}
                    <h3 
                      className={`font-display font-black tracking-tight leading-tight select-none border-l-4 pl-3 ${
                        state.themeStyle === 'minimal-light' 
                          ? 'text-gray-900 border-gray-900' 
                          : 'text-white'
                      }`}
                      style={{
                        borderColor: 
                          state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                          state.themeStyle === 'minimal-light' ? '#111111' :
                          state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                          state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25',
                        fontSize: state.aspectRatio === '1:1' 
                          ? `calc(${state.headlineSize}px * 0.58)` 
                          : `calc(${state.headlineSize}px * 0.45)`
                      }}
                    >
                      {state.headline}
                    </h3>

                    {/* Date/Time and Reporter Strap */}
                    <div 
                      className={`flex justify-between items-center text-[8px] md:text-[10px] font-semibold tracking-wider font-mono select-none py-1 border-y ${
                        state.themeStyle === 'minimal-light' 
                          ? 'text-gray-600 border-black/5' 
                          : 'text-gray-400 border-white/5'
                      }`}
                    >
                      <span>{state.dateTime.toUpperCase()}</span>
                      <span className="text-right truncate max-w-[150px]">{state.reporter.toUpperCase()}</span>
                    </div>

                  </div>

                </div>

                {/* Bottom ticker container (stacked beneath normal content padding) */}
                {state.showTicker && state.tickerText && (
                  <div 
                    className="absolute bottom-0 left-0 w-full flex"
                    style={{ 
                      zIndex: 20,
                      backgroundColor: 
                        state.themeStyle === 'cyber-dark' ? '#0B0D10' :
                        state.themeStyle === 'minimal-light' ? '#FFFFFF' :
                        state.themeStyle === 'gotham-gold' ? '#161616' :
                        state.themeStyle === 'royal-blue' ? '#0F172A' : '#121214',
                      borderTop: `2.5px solid ${
                        state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                        state.themeStyle === 'minimal-light' ? '#111111' :
                        state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                        state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25'
                      }`
                    }}
                  >
                    {/* Prefix label */}
                    <div 
                      className="px-2.5 py-1.5 md:py-2 text-[8px] md:text-xs font-black tracking-widest text-white shrink-0 flex items-center"
                      style={{ 
                        backgroundColor: 
                          state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                          state.themeStyle === 'minimal-light' ? '#111111' :
                          state.themeStyle === 'gotham-gold' ? '#D4AF37' :
                          state.themeStyle === 'royal-blue' ? '#1E3A8A' : '#E61E25',
                        color: state.themeStyle === 'minimal-light' ? '#FFFFFF' : '#121214'
                      }}
                    >
                      TICKER
                    </div>
                    {/* Ticker marquee simulation */}
                    <div className="flex-1 overflow-hidden relative flex items-center px-4 self-center select-none">
                      <div className="animate-marquee whitespace-nowrap text-[8px] md:text-xs font-mono font-medium tracking-wide">
                        <span 
                          style={{ 
                            color: 
                              state.themeStyle === 'cyber-dark' ? '#00FFCC' :
                              state.themeStyle === 'minimal-light' ? '#111111' :
                              state.themeStyle === 'gotham-gold' ? '#FFFFFF' :
                              state.themeStyle === 'royal-blue' ? '#38BDF8' : '#F1F5F9'
                          }}
                        >
                          {state.tickerText.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION TRIGGERS & INSTRUCTIONS */}
            <div className="pt-6 border-t-2 border-brand-red/35 space-y-4">
              
              <div className="text-center md:text-left text-xs bg-brand-dark border-2 border-brand-red/50 rounded-none p-4 font-mono text-gray-300 font-semibold space-y-1 shadow-[2px_2px_0px_0px_#09090b]">
                <span className="text-brand-red block font-black mb-1 uppercase tracking-wider">PRO-GRADE BROADCAST NOTES:</span>
                <p>• Custom colors and logos fully translate to the output render block.</p>
                <p>• Rendering handles anonymous asset scaling, outputting pixel-crisp 1200x1200px graphics.</p>
              </div>

              {/* Big HD Download Button */}
              <button
                id="render-download-btn"
                onClick={handleDownloadHD}
                disabled={downloading}
                className={`w-full py-4 rounded-none font-display font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-150 border-2 border-brand-red flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_0px_#09090b] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#e50914] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#09090b] ${
                  downloading
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-brand-red hover:bg-brand-red-hover text-white'
                }`}
              >
                {downloading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Compiling High Definition Render...</span>
                  </>
                ) : isCopied ? (
                  <>
                    <Check className="w-5 h-5 text-green-300" />
                    <span>Download Initiated Successfully!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download HD News Card</span>
                  </>
                )}
              </button>
              
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
