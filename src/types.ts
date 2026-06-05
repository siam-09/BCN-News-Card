export interface NewsCardState {
  headline: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  photoUrl: string; // Background photo (DataURL or URL)
  logoUrl: string; // Logo (DataURL or empty)
  logoText: string; // Text if Logo is empty
  dateTime: string;
  location: string;
  reporter: string;
  headlineSize: number; // Font size scale index
  aspectRatio: '1:1' | '16:9';
  themeStyle: 'classic-red' | 'cyber-dark' | 'minimal-light' | 'gotham-gold' | 'royal-blue';
  tickerText: string;
  showTicker: boolean;
  showWatermark: boolean;
}

export interface SampleTemplate {
  id: string;
  title: string;
  description: string;
  state: Partial<NewsCardState>;
  imageUrl: string;
}
