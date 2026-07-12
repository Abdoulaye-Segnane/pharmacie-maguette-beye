import AnimatedSection from '@/components/ui/AnimatedSection'
import AfricanPattern from '@/components/ui/AfricanPattern'
import { getProchainesGardes } from '@/lib/gardes'
import { formatDate } from '@/lib/utils'

export default function GardesSection() {
  const gardes = getProchainesGardes(3)

  // Aucune garde future connue → section masquée.
  if (gardes.length === 0) return null

  return (
    <section className="relative overflow-hidden border-t border-green-primary/10 bg-white py-24">
      <AfricanPattern
        id="gardes"
        className="pointer-events-none absolute inset-0 h-full w-full text-terra opacity-[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-warm/15 px-4 py-1.5 text-sm font-semibold text-green-dark ring-1 ring-accent-warm/40">
            🏥 Garde
          </span>
          <h2 className="mt-5 text-3xl font-bold text-green-dark md:text-4xl">Prochaines gardes</h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
            Les jours fériés, nous assurons un service de garde. Voici nos prochaines permanences.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {gardes.map((garde, i) => (
            <AnimatedSection key={`${garde.date}-${garde.label}`} delay={i * 0.1}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
                  {garde.type}
                </div>
                <div className="mt-3 text-lg font-bold text-green-dark">{garde.label}</div>
                <div className="mt-1 text-sm text-gray-dark/60">{formatDate(garde.date)}</div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-primary/10 px-4 py-1.5 text-sm font-semibold text-green-primary">
                  {garde.heures_ouverture} – {garde.heures_fermeture}
                </div>
                {garde.note && <p className="mt-4 text-xs text-gray-dark/50">{garde.note}</p>}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
