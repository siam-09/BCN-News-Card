import { NewsCardState, SampleTemplate } from './types';

export const CATEGORY_PRESETS = [
  { label: 'BREAKING NEWS', color: '#E61E25', text: '#FFFFFF' },
  { label: 'EXCLUSIVE', color: '#FFB800', text: '#000000' },
  { label: 'WORLD NEWS', color: '#1E40AF', text: '#FFFFFF' },
  { label: 'SPORTS', color: '#047857', text: '#FFFFFF' },
  { label: 'POLITICS', color: '#6D28D9', text: '#FFFFFF' },
  { label: 'BUSINESS', color: '#0891B2', text: '#FFFFFF' },
  { label: 'WEATHER', color: '#F97316', text: '#FFFFFF' },
  { label: 'ENTERTAINMENT', color: '#DB2777', text: '#FFFFFF' },
  { label: 'LATEST UPDATE', color: '#374151', text: '#FFFFFF' },
];

export const THEMES = [
  { id: 'classic-red', label: 'Classic Red (TV News)', primary: '#E61E25', dark: '#121214' },
  { id: 'cyber-dark', label: 'Cyber Dark (Neon)', primary: '#00FFCC', dark: '#0C0F12' },
  { id: 'minimal-light', label: 'Minimal Premium (Clean)', primary: '#222222', dark: '#F8FAFC' },
  { id: 'gotham-gold', label: 'Gotham Gold (Elegant)', primary: '#D4AF37', dark: '#151515' },
  { id: 'royal-blue', label: 'Royal Blue (Official)', primary: '#1E3A8A', dark: '#0F172A' },
];

export const SAMPLE_PHOTOS = [
  {
    name: 'Skyscraper / Business',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Press Conference',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'City Streets at Night',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Abstract Global Network',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Sports Stadium',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Studio Microphone',
    url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
  }
];

export const DEFAULT_STATE: NewsCardState = {
  headline: 'GLOBAL CONGESTION INDEX REACHES RECORD HIGH IN MAJOR CITIES',
  category: 'BREAKING NEWS',
  categoryBgColor: '#E61E25',
  categoryTextColor: '#FFFFFF',
  photoUrl: SAMPLE_PHOTOS[0].url,
  logoUrl: '', // Default uses styled text logo
  logoText: 'BCN NEWS',
  dateTime: 'FRIDAY, JUNE 05, 2026 • 17:00',
  location: 'BARCELONA',
  reporter: 'REPORTS BY BCN GROUP',
  headlineSize: 42,
  aspectRatio: '1:1',
  themeStyle: 'classic-red',
  tickerText: 'STOCK MARKET INDEX REBOUNDS SHARPLY AFTER EARLY MORNING LOSSES... DEVELOPING STORY...',
  showTicker: true,
  showWatermark: true,
};

export const TEMPLATES: SampleTemplate[] = [
  {
    id: 'tpl-breaking',
    title: 'BBC-style Classic Crimson',
    description: 'High impact red layout with double line typography. Perfect for swift political and world news disclosures.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
    state: {
      headline: 'IMPORTANT RESOLUTIONS DECLARED IN EMERGENCY SECURITY COUNCIL MEETING',
      category: 'BREAKING NEWS',
      categoryBgColor: '#E61E25',
      categoryTextColor: '#FFFFFF',
      photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      logoText: 'BCN NEWS',
      location: 'GENEVA',
      reporter: 'REPORTS BY BUREAU CHIEF',
      themeStyle: 'classic-red',
      showTicker: true,
      tickerText: 'DELEGATES DEMAND IMMEDIATE CEASEFIRE AND RESUMPTION OF CONVERSION EFFORTS CURRENTLY UNDERWAY...',
    }
  },
  {
    id: 'tpl-exclusive',
    title: 'The Gotham Gold Edition',
    description: 'An elegant high-contrast dark aesthetic with deep gold and titanium tones. Fits luxury, fine arts, and investigative journalism.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    state: {
      headline: 'PENTHOUSE ARCHITECT REVEALS MASSIVE UNDERGROUND ART VAULT PROJECT',
      category: 'EXCLUSIVE',
      categoryBgColor: '#D4AF37',
      categoryTextColor: '#000000',
      photoUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
      logoText: 'BCN CHRONICLE',
      location: 'GOTHAM CITY',
      reporter: 'BY BRUCE WAYNE',
      themeStyle: 'gotham-gold',
      showTicker: true,
      tickerText: 'THE VAULT MEASURES 12,000 SQ FT AND BOASTS BIO-METRIC AND SOUNDPROOF SECURITY PROTOCOLS...',
    }
  },
  {
    id: 'tpl-cyber',
    title: 'Cyber Dark Digital',
    description: 'A striking modern tech layout featuring deep carbon panels and high-luminosity neon accents for tech updates.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    state: {
      headline: 'NEXT-GENERATION QUANTUM CHIPS DEPLOYED FOR SECURE GLOBAL LEDGER SYSTEM',
      category: 'TECH SPECTRUM',
      categoryBgColor: '#00FFCC',
      categoryTextColor: '#000000',
      photoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      logoText: 'BCN CYBER',
      location: 'TOKYO METROPOLIS',
      reporter: 'CYBERSECURTY WIRE',
      themeStyle: 'cyber-dark',
      showTicker: true,
      tickerText: 'SYSTEM CLAIMS UNBREAKABLE CRYPTO LOGISTICS BASED ON SINGLE ATOM ENTANGLEMENT PATTERNS...',
    }
  },
  {
    id: 'tpl-minimalist',
    title: 'Minimal Premium Editorial',
    description: 'Super clean, high-fashion layout with ample light margin style. Perfect for architecture, culture, and long-form features.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    state: {
      headline: 'Redesigning Urban Boundaries to Maximize Public Green Spaces and Wildlife Corridors',
      category: 'METROPOLIS',
      categoryBgColor: '#111111',
      categoryTextColor: '#FFFFFF',
      photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      logoText: 'BCN MONOCLE',
      location: 'COPENHAGEN',
      reporter: 'EDITORIAL DESK',
      themeStyle: 'minimal-light',
      showTicker: false,
      tickerText: '',
    }
  }
];
