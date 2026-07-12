import AnimatedSection from '@/components/ui/AnimatedSection'
import { faqs } from '@/data/faq'

export default function Faq() {
  return (
    <section className="border-t border-green-primary/10 bg-white py-24">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-green-dark md:text-4xl">Questions fréquentes</h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
            Tout ce qu&rsquo;il faut savoir sur la Pharmacie Maguette Beye à Kaolack.
          </p>
        </AnimatedSection>

        <AnimatedSection className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-green-dark">
                {item.question}
                <svg
                  className="shrink-0 text-green-primary transition-transform duration-200 group-open:rotate-45"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-dark/80">{item.answer}</p>
            </details>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
