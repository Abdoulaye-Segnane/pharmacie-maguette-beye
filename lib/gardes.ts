import gardesData from '@/data/gardes.json'
import type { GardeEntry } from '@/lib/types'

const { gardes } = gardesData as { gardes: GardeEntry[] }

/** Date du jour dans le fuseau de Dakar (Africa/Dakar), au format YYYY-MM-DD. */
function todayDakar(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Dakar',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const get = (type: string): string => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

/**
 * Retourne les `n` prochaines gardes (date >= aujourd'hui, fuseau Dakar),
 * triées par date croissante. La comparaison se fait sur des chaînes YYYY-MM-DD.
 */
export function getProchainesGardes(n: number): GardeEntry[] {
  const today = todayDakar()
  return gardes
    .filter((g) => g.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, n)
}
