import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewsStudio } from './components/NewsStudio';
import { Features } from './components/Features';
import { TemplateGallery } from './components/TemplateGallery';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { DEFAULT_STATE } from './constants';
import { NewsCardState } from './types';

export default function App() {
  const [cardState, setCardState] = useState<NewsCardState>(DEFAULT_STATE);

  // Smooth scroll helper to navigate directly to the editor workspace
  const handleScrollToEditor = () => {
    const el = document.getElementById('editor-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Callback to load a template config directly from the gallery presets
  const handleLoadTemplatePreset = (newState: Partial<NewsCardState>) => {
    setCardState((prev) => ({
      ...prev,
      ...newState,
    }));
    handleScrollToEditor();
  };

  // Clean local state modification callback
  const handleStateChange = (updatedState: NewsCardState) => {
    setCardState(updatedState);
  };

  // Sync state date-time text on startup for user ease
  useEffect(() => {
    const now = new Date();
    const utcStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).toUpperCase();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCardState((prev) => ({
      ...prev,
      dateTime: `${utcStr} • ${hours}:${minutes}`,
    }));
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-brand-dark text-white font-sans antialiased selection:bg-brand-red selection:text-white">
      
      {/* 1. Header with custom brand indicators & live clocks */}
      <Header onStudioClick={handleScrollToEditor} />

      {/* 2. Headline Hero Panel */}
      <Hero onStartClick={handleScrollToEditor} />

      {/* 3. Interactive News Creator Workspace Studio */}
      <NewsStudio 
        state={cardState} 
        onChange={handleStateChange}
        onLoadTemplate={handleLoadTemplatePreset}
      />

      {/* 4. Service Features Bento Grid */}
      <Features />

      {/* 5. Interactive Preset Card Template Gallery */}
      <TemplateGallery onLoadPreset={handleLoadTemplatePreset} />

      {/* 6. About Us Core Values */}
      <AboutUs />

      {/* 7. Contact Info and Message Form */}
      <ContactUs />

      {/* 8. Professional Copyright Footer */}
      <Footer />

    </div>
  );
}
