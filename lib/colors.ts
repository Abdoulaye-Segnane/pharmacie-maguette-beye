// lib/colors.ts
import type { ColorPalette } from './types';

export const colors = {
  greenPrimary: '#2D7A5C',
  greenDark:    '#1A4D35',
  gold:         '#D4A574',
  white:        '#FFFFFF',
  grayDark:     '#1F2937',
} as const satisfies ColorPalette;

export type ColorKey = keyof typeof colors;
