import { z } from 'zod'
import { Resend } from 'resend'
import { RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'Configuration email manquante' }, { status: 500 })
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo: email,
      subject: `Message de ${name} — Pharmacie Maguette Beye`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 })
  }
}
