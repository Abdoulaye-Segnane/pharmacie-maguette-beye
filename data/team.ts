import type { TeamMember } from '@/lib/types'

export const team = [
  {
    id: '1',
    name: 'Dr Mamadou Ndiaye',
    role: 'Pharmacien titulaire',
    photo: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=400&q=80',
  },
  {
    id: '2',
    name: 'Aminata Fall',
    role: 'Pharmacienne adjointe',
    photo: 'https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?w=400&q=80',
  },
  {
    id: '3',
    name: 'Ibrahima Diop',
    role: 'Préparateur en pharmacie',
    photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80',
  },
] as const satisfies TeamMember[]
