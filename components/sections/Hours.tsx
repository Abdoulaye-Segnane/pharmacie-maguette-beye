'use client'

import { useState, useEffect } from 'react'
import { contact } from '@/lib/constants'
import { formatHours } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { HoursSlot } from '@/lib/types'

type DayKey = 'weekdays' | 'saturday' | 'sunday'

function parseMinutes(time: string): number {
  const [h, m] = time.split('h').map(Number)
  return h * 60 + (m ?? 0)
}

function checkIsOpen(): boolean {
  const now = new Date()
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const day = now.getUTCDay()
  const dayKey: DayKey = day === 0 ? 'sunday' : day === 6 ? 'saturday' : 'weekdays'
  const slot = contact.hours[dayKey]
  return currentMinutes >= parseMinutes(slot.open) && currentMinutes < parseMinutes(slot.close)
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
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-green-dark">Nos horaires</h2>
            {isOpen !== null && (
              <Badge
                color={isOpen ? 'green' : 'gray'}
                className="px-4 py-1.5 text-sm"
              >
                {isOpen ? '● Ouvert maintenant' : '● Fermé'}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {hoursRows.map(({ key, label }) => {
              const slot: HoursSlot = contact.hours[key]
              return (
                <div
                  key={key}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-1 text-sm font-medium text-gray-dark/60">
                    {label}
                  </div>
                  <div className="text-xl font-bold text-green-dark">
                    {formatHours(slot.open, slot.close)}
                  </div>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
