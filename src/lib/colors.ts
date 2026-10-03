export const COLOR_NAMES: Record<string, string> = {
  "#0f172a": "Slate Black",
  "#111827": "Charcoal",
  "#e2e8f0": "Moon Mist",
  "#dc2626": "Signal Red",
  "#f9fafb": "Pearl White",
  "#2563eb": "Royal Blue",
  "#f1f5f9": "Cloud Grey",
  "#0ea5e9": "Sky",
  "#a8a29e": "Stone Taupe",
  "#57534e": "Umber",
  "#fef3c7": "Warm Sand",
  "#78350f": "Espresso",
  "#1c1917": "Onyx",
  "#92400e": "Caramel",
  "#b45309": "Terracotta",
  "#fde68a": "Honey",
  "#f5f5f4": "Natural",
  "#e7e5e4": "Oat",
  "#d6d3d1": "Fog",
  "#8b5cf6": "Violet",
  "#f43f5e": "Coral",
  "#f59e0b": "Amber",
  "#e11d48": "Raspberry",
  "#9d174d": "Plum",
  "#38bdf8": "Baby Blue",
  "#fbbf24": "Marigold",
  "#fb7185": "Rose Petal",
  "#2f6f74": "Nordic Teal",
  "#e4e4e7": "Linen",
};

export function colorLabel(hex?: string): string {
  if (!hex) return "Default";
  return COLOR_NAMES[hex] ?? hex;
}