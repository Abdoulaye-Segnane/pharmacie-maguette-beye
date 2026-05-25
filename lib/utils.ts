import { clsx, type ClassValue } from 'clsx';

/** Concatène des classes Tailwind de manière conditionnelle. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formate un numéro sénégalais (9 chiffres sans indicatif)
 * en "+221 XX XXX XX XX".
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `+221 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/** Retourne une plage horaire lisible : "08h00 – 20h00". */
export function formatHours(open: string, close: string): string {
  return `${open} – ${close}`;
}
