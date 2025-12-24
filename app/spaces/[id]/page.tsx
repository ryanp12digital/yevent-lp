
import { SPACES } from '@/data/spaces'
import SpaceDetail from '@/components/features/SpaceDetail'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const space = SPACES.find(s => s.id === params.id)
  if (!space) return {}

  return {
    title: `${space.name} - Yevent`,
    description: `Reserve o espaço ${space.name} em ${space.city}. Capacidade para ${space.capacity} pessoas.`,
  }
}

export default function SpacePage({ params }: { params: { id: string } }) {
  const space = SPACES.find(s => s.id === params.id)

  if (!space) {
    notFound()
  }

  return (
    <div className="animate-in fade-in duration-500">
      <SpaceDetail space={space} />
    </div>
  )
}
