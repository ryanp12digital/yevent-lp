
import Hero from '@/components/sections/Hero'
import SpacesList from '@/components/sections/SpacesList'

export default function Home() {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <div className="py-20 text-center bg-slate-50 border-y border-slate-100">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4 uppercase tracking-widest">Destaques da Semana</h2>
        <p className="text-slate-500 font-medium px-6">Conheça nossos espaços mais reservados por grandes empresas.</p>
      </div>
      <SpacesList limit={3} showTitle={false} />
    </div>
  )
}
