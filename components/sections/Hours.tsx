'use client'

import { useState, useEffect } from 'react'
import { contact } from '@/lib/constants'
import { formatHours } from '@/lib/utils'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { HoursSlot } from '@/lib/types'

type DayKey = 'weekdays' | 'saturday' | 'sunday'

function parseMinutes(time: string): number {
  const [h, m] = time.split('h').map(Number)
  return h * 60 + (m ?? 0)
}

/** Heure et jour courants dans le fuseau de Dakar (Africa/Dakar = UTC+0 toute l'année). */
function getDakarMoment(): { minutes: number; dayKey: DayKey } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Dakar',
    hourCycle: 'h23',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date())
  const get = (type: string): string => parts.find((p) => p.type === type)?.value ?? ''
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const weekday = get('weekday')
  const dayKey: DayKey = weekday === 'Sun' ? 'sunday' : weekday === 'Sat' ? 'saturday' : 'weekdays'
  return { minutes, dayKey }
}

function checkIsOpen(): boolean {
  const { minutes, dayKey } = getDakarMoment()
  const slot = contact.hours[dayKey]
  if (slot.closed) return false
  return minutes >= parseMinutes(slot.open) && minutes < parseMinutes(slot.close)
}

const hoursRows: { key: DayKey; label: string }[] = [
  { key: 'weekdays', label: 'Lundi – Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
]

export default function Hours() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    setIsOpen(checkIsOpen())
  }, [])

  return (
    <section className="py-24 bg-white border-t border-green-primary/10">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-green-dark md:text-4xl">Nos horaires</h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />

            {isOpen !== null && (
              <div className="mt-6 flex justify-center">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                    isOpen
                      ? 'bg-green-primary text-white'
                      : 'bg-gray-100 text-gray-dark'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${isOpen ? 'bg-white animate-pulse' : 'bg-gray-400'}`}
                  />
                  {isOpen ? 'Ouvert maintenant' : 'Fermé actuellement'}
                </span>
              </div>
            )}
          </div>

          {/* Carte unique avec 3 colonnes internes */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
              {hoursRows.map(({ key, label }) => {
                const slot: HoursSlot = contact.hours[key]
                return (
                  <div key={key} className="p-8 text-center">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                      {label}
                    </div>
                    <div className="text-2xl font-bold text-green-dark">
                      {slot.closed ? 'Fermé' : formatHours(slot.open, slot.close)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
