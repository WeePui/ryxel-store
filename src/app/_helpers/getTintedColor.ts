export function getTintedColor(
  color: string,
  tintFactor: number = 0.8
): string {
  // Convert the hex color to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Blend the color with white to lighten it
  const newR = Math.min(255, Math.floor(r + (255 - r) * tintFactor));
  const newG = Math.min(255, Math.floor(g + (255 - g) * tintFactor));
  const newB = Math.min(255, Math.floor(b + (255 - b) * tintFactor));

  return `rgb(${newR}, ${newG}, ${newB})`;
}
