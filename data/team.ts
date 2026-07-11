import type { TeamMember } from '@/lib/types'

export const team = [
  {
    id: '1',
    name: 'Dr Mamadou Ndiaye',
    role: 'Pharmacien titulaire',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    id: '2',
    name: 'Aminata Fall',
    role: 'Pharmacienne adjointe',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
  {
    id: '3',
    name: 'Ibrahima Diop',
    role: 'Préparateur en pharmacie',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
  },
] as const satisfies TeamMember[]
