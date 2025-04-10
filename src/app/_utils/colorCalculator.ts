const colorMap: Record<string, string> = {
  red: '#FF0000',
  blue: '#0000FF',
  green: '#008000',
  yellow: '#FFFF00',
  purple: '#800080',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  pink: '#FFC0CB',
  cyan: '#00FFFF',
  orange: '#FFA500',
};

export const getHexColor = (colorName: string): string => {
  return colorMap[colorName.toLowerCase()] || '#000000';
};

export const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, '');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

export const getTextColor = (colorName: string) => {
  const hex = getHexColor(colorName);
  const { r, g, b } = hexToRgb(hex);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128 ? '#FFFFFF' : '#000000';
};
