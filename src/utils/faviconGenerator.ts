export const generateFavicon = (letter: string, size: number = 32): string => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  // Add the letter in white
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `bold ${size * 0.7}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter.toUpperCase(), size / 2, size / 2);

  return canvas.toDataURL("image/png");
};

export const setFavicon = (letter: string): void => {
  // Use 'P' as default if no letter is provided
  const faviconLetter = letter || "P";

  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach((link) => link.remove());

  // Create favicons for different sizes
  const sizes = [16, 32, 48];
  sizes.forEach((size) => {
    const faviconUrl = generateFavicon(faviconLetter, size);
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.sizes = `${size}x${size}`;
    link.href = faviconUrl;
    document.head.appendChild(link);
  });

  // Also set the default favicon
  const defaultFaviconUrl = generateFavicon(faviconLetter, 32);
  const defaultLink = document.createElement("link");
  defaultLink.rel = "icon";
  defaultLink.type = "image/png";
  defaultLink.href = defaultFaviconUrl;
  document.head.appendChild(defaultLink);
};
