import { NewsCardState } from '../types';

/**
 * Loads an image from a URL, setting crossOrigin to anonymous to ensure no canvas taint.
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Do not use anonymous CORS for local data or blob URLs to avoid sandbox permission errors
    if (!url.startsWith('data:') && !url.startsWith('blob:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => {
      // If anonymous fails, try loading without crossOrigin as fallback
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = (err) => reject(err);
      fallbackImg.src = url;
    };
    img.src = url;
  });
}

/**
 * Wraps canvas text into lines based on a max width.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = currentLine + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(currentLine.trim());
      currentLine = words[n] + ' ';
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine.trim());
  }
  return lines;
}

/**
 * Renders the state onto a high-definition canvas and returns a PNG DataURL.
 */
export async function renderNewsCard(state: NewsCardState): Promise<string> {
  // 1. Establish resolution
  const width = 1200;
  const height = state.aspectRatio === '1:1' ? 1200 : 675;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Clear Canvas
  ctx.fillStyle = '#121214';
  ctx.fillRect(0, 0, width, height);

  // 2. Load background photo
  try {
    const bgImage = await loadImage(state.photoUrl);
    
    // Scale and Crop Center (Cover Mode)
    const imgRatio = bgImage.width / bgImage.height;
    const canvasRatio = width / height;
    let sWidth = bgImage.width;
    let sHeight = bgImage.height;
    let sx = 0;
    let sy = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      sWidth = bgImage.height * canvasRatio;
      sx = (bgImage.width - sWidth) / 2;
    } else {
      // Image is taller than canvas
      sHeight = bgImage.width / canvasRatio;
      sy = (bgImage.height - sHeight) / 2;
    }

    ctx.drawImage(bgImage, sx, sy, sWidth, sHeight, 0, 0, width, height);
  } catch (error) {
    console.error('Failed to load image, using premium gradient backup', error);
    // Draw an attractive solid dark gradient fallback
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#1E1E24');
    grad.addColorStop(0.5, '#0E0D10');
    grad.addColorStop(1, '#050506');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    // Draw some architectural tech lines for design flair
    ctx.strokeStyle = '#E61E25';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);
  }

  // 3. Define styling variables depending on Theme Style
  let primaryColor = '#E61E25'; // Red
  let tickerBg = '#121214';
  let tickerTextColor = '#E2E8F0';
  let isLight = false;

  if (state.themeStyle === 'cyber-dark') {
    primaryColor = '#00FFCC';
    tickerBg = '#0B0D10';
    tickerTextColor = '#00FFCC';
  } else if (state.themeStyle === 'minimal-light') {
    primaryColor = '#111111';
    tickerBg = '#FFFFFF';
    tickerTextColor = '#111111';
    isLight = true;
  } else if (state.themeStyle === 'gotham-gold') {
    primaryColor = '#D4AF37';
    tickerBg = '#161616';
    tickerTextColor = '#FFFFFF';
  } else if (state.themeStyle === 'royal-blue') {
    primaryColor = '#1E3A8A';
    tickerBg = '#0F172A';
    tickerTextColor = '#38BDF8';
  }

  // 4. Draw Gradients to guarantee text legibility
  // Bottom-up gradient for headlines
  const textShield = ctx.createLinearGradient(0, height * 0.4, 0, height);
  if (isLight) {
    textShield.addColorStop(0, 'rgba(255, 255, 255, 0)');
    textShield.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
    textShield.addColorStop(0.85, 'rgba(255, 255, 255, 0.98)');
    textShield.addColorStop(1, 'rgba(255, 255, 255, 1)');
  } else {
    textShield.addColorStop(0, 'rgba(0, 0, 0, 0)');
    textShield.addColorStop(0.4, 'rgba(0, 0, 0, 0.65)');
    textShield.addColorStop(0.75, 'rgba(0, 0, 0, 0.92)');
    textShield.addColorStop(1, 'rgba(0, 0, 0, 1)');
  }
  ctx.fillStyle = textShield;
  ctx.fillRect(0, height * 0.35, width, height * 0.65);

  // Top header gradient (subtle drop shadow for logo)
  const headerShield = ctx.createLinearGradient(0, 0, 0, 180);
  if (isLight) {
    headerShield.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    headerShield.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    headerShield.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    headerShield.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = headerShield;
  ctx.fillRect(0, 0, width, 180);

  // 5. Draw Header elements: Logo & Location Tag
  const paddingX = 64;
  
  // LOGO
  if (state.logoUrl) {
    try {
      const logoImg = await loadImage(state.logoUrl);
      const maxHeight = 48;
      const logoWidth = (logoImg.width * maxHeight) / logoImg.height;
      ctx.drawImage(logoImg, paddingX, 48, logoWidth, maxHeight);
    } catch (e) {
      // Fallback logo text
      drawTextLogo(ctx, state.logoText, paddingX, 48, primaryColor);
    }
  } else {
    drawTextLogo(ctx, state.logoText, paddingX, 48, primaryColor);
  }

  // Location / LIVE tag on Top-Right
  ctx.font = '700 20px "Space Grotesk", "Inter", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.textBaseline = 'top';

  let topMetaText = '';
  if (state.location) {
    topMetaText += ` • ${state.location.toUpperCase()}`;
  }
  if (topMetaText) {
    const liveTagText = 'LIVE' + topMetaText;
    const rightMargin = width - paddingX;
    
    // Draw red circle for LIVE
    ctx.fillStyle = '#E61E25';
    ctx.beginPath();
    ctx.arc(rightMargin - ctx.measureText(liveTagText).width - 15, 62, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isLight ? '#121214' : '#F8FAFC';
    ctx.fillText(liveTagText, rightMargin - ctx.measureText(liveTagText).width, 51);
  }

  // 6. Calculate heights and coordinates for Bottom News layout elements
  // We lay things out relative to the bottom edge.
  let currentBottomY = height;

  // TICKER FOOTER (if enabled)
  if (state.showTicker && state.tickerText) {
    const tickerHeight = 52;
    currentBottomY -= tickerHeight;

    // Draw Ticker block background
    ctx.fillStyle = tickerBg;
    ctx.fillRect(0, currentBottomY, width, tickerHeight);

    // Border line at top of ticker
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, currentBottomY);
    ctx.lineTo(width, currentBottomY);
    ctx.stroke();

    // Draw Ticker Label Badge
    const labelText = 'TICKER';
    ctx.font = '800 16px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '2px';
    const labelWidth = ctx.measureText(labelText).width + 30;

    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, currentBottomY, labelWidth, tickerHeight);

    // Label text
    ctx.fillStyle = isLight && state.themeStyle === 'minimal-light' ? '#FFFFFF' : '#121214';
    ctx.textBaseline = 'middle';
    ctx.font = '800 16px "Space Grotesk", sans-serif';
    ctx.fillText(labelText, 15, currentBottomY + tickerHeight / 2);

    // Ticker content text
    ctx.fillStyle = tickerTextColor;
    ctx.font = '500 17px "Inter", sans-serif';
    ctx.letterSpacing = '0.5px';
    ctx.textBaseline = 'middle';
    // Draw the ticker text with custom padding
    ctx.fillText(state.tickerText.toUpperCase(), labelWidth + 24, currentBottomY + tickerHeight / 2);
  }

  // DATE-REPORTER STRIP
  const stripHeight = 36;
  currentBottomY -= stripHeight;

  // Background strip
  ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(0, currentBottomY, width, stripHeight);

  // Strip text content (Date & Reporter)
  ctx.font = '600 14px "Space Grotesk", "Inter", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = isLight ? '#4B5563' : '#9CA3AF';

  const rMargin = width - paddingX;
  if (state.dateTime) {
    ctx.fillText(state.dateTime.toUpperCase(), paddingX, currentBottomY + stripHeight / 2);
  }
  if (state.reporter) {
    const repText = state.reporter.toUpperCase();
    ctx.fillText(repText, rMargin - ctx.measureText(repText).width, currentBottomY + stripHeight / 2);
  }

  // 7. Draw CATEGORY BADGE and HEADLINE
  // We stack them going upwards from currentBottomY.
  
  // Set fonts for wrapping
  const fontSize = state.headlineSize || 42;
  ctx.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;
  
  const headlineMaxW = width - (paddingX * 2);
  const headlineLines = wrapText(ctx, state.headline, headlineMaxW);
  const headlineLineHeight = fontSize * 1.15;
  const headlineBlockH = headlineLines.length * headlineLineHeight;

  // Category Badge height + margin
  const badgeHeight = 38;
  const badgeMargin = 20;
  
  // Calculate top of headline area to draw category badge first
  const headlineStartY = currentBottomY - 32 - headlineBlockH;
  const categoryHeaderY = headlineStartY - badgeHeight - badgeMargin;

  // Draw Category Badge
  if (state.category) {
    const badgeBg = state.categoryBgColor || primaryColor;
    const badgeText = state.categoryTextColor || '#FFFFFF';

    ctx.font = '800 15px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '2.5px';
    const textWidth = ctx.measureText(state.category.toUpperCase()).width;
    const badgeWidth = textWidth + 36;

    // Draw solid angled pill block for news style
    ctx.fillStyle = badgeBg;
    ctx.beginPath();
    ctx.moveTo(paddingX, categoryHeaderY);
    ctx.lineTo(paddingX + badgeWidth, categoryHeaderY);
    ctx.lineTo(paddingX + badgeWidth - 10, categoryHeaderY + badgeHeight);
    ctx.lineTo(paddingX, categoryHeaderY + badgeHeight);
    ctx.closePath();
    ctx.fill();

    // Draw text inside badge
    ctx.fillStyle = badgeText;
    ctx.textBaseline = 'middle';
    ctx.fillText(state.category.toUpperCase(), paddingX + 18, categoryHeaderY + badgeHeight / 2);
  }

  // Draw Headline Texts
  ctx.textBaseline = 'top';
  ctx.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;
  ctx.letterSpacing = '-0.5px';
  ctx.fillStyle = isLight ? '#0B0F19' : '#FFFFFF';

  headlineLines.forEach((line, index) => {
    ctx.fillText(line, paddingX, headlineStartY + index * headlineLineHeight);
  });

  // 8. Draw Watermark if enabled
  if (state.showWatermark) {
    ctx.font = '500 12px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    ctx.textBaseline = 'bottom';
    
    const watermarkText = 'GENERATED VIA BCN NEWS PHOTO CARD';
    const watermarkX = width - paddingX;
    const watermarkY = categoryHeaderY - 12; // place it nicely above category
    
    // Check constraints so it sits on the card neatly
    if (watermarkY > 120) {
      ctx.fillText(watermarkText, watermarkX - ctx.measureText(watermarkText).width, watermarkY);
    }
  }

  // Return PNG DataURL
  return canvas.toDataURL('image/png');
}

/**
 * Draws a clean styled news logo tag in the specified position.
 */
function drawTextLogo(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  accentColor: string
) {
  // Let's draw structured blocks (e.g., solid backdrop for first word, outline for second, or dynamic red box)
  const parts = text.split(' ');
  const mainPart = parts[0] || 'BCN';
  const subPart = parts.slice(1).join(' ') || 'NEWS';

  ctx.textBaseline = 'top';
  ctx.font = '900 24px "Space Grotesk", "Inter", sans-serif';
  ctx.letterSpacing = '1px';

  const mainW = ctx.measureText(mainPart).width;
  
  // Draw primary accent box for BCN
  ctx.fillStyle = accentColor;
  ctx.fillRect(x, y, mainW + 16, 38);

  // Draw main text
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(mainPart, x + 8, y + 6);

  // Draw sub text (NEWS) as a outline boxed word or normal styled block
  ctx.font = '700 22px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '2px';
  const subW = ctx.measureText(subPart).width;

  // Stroke bounding box to look very premium
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x + mainW + 16 + 6, y, subW + 16, 38);

  ctx.fillStyle = accentColor;
  ctx.fillText(subPart, x + mainW + 16 + 14, y + 6);
}
