'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-dark placeholder-gray-400 shadow-sm outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 disabled:opacity-50'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Nom complet <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading'}
          placeholder="Aminata Diallo"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Adresse email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          placeholder="aminata@exemple.sn"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === 'loading'}
          placeholder="Votre question ou message..."
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {status === 'success' && (
        <div role="alert" className="rounded-xl bg-green-primary/10 px-4 py-3 text-sm text-green-dark">
          ✓ Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Une erreur s&rsquo;est produite. Veuillez réessayer ou nous contacter par téléphone.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-green-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
    </form>
  )
}
