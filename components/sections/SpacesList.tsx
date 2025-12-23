
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPACES, type Space } from '../../data/spaces';
import { Users, Maximize2, ArrowRight, MapPin, ImageIcon, Plus } from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const SpaceCardImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-slate-100">
          <ImageIcon className="w-10 h-10 text-slate-200" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-1000 group-hover:scale-110",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

interface SpacesListProps {
  onViewDetails: (space: Space) => void;
}

const SpacesList: React.FC<SpacesListProps> = ({ onViewDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(6);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.space-card');
    cards.forEach((card: any) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef, dependencies: [displayCount] });

  return (
    <section id="spaces" className="py-24 md:py-32 px-6 bg-white" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto">
        {/* Curated Header Box - Design System Consistency */}
        <div className="mb-20 border-[3px] border-blue-100/50 rounded-[4rem] p-10 md:p-16 relative overflow-hidden bg-gradient-to-br from-blue-50/20 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Nossa Curadoria <br /> de Espaços
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Ambientes projetados para elevar a produtividade e o profissionalismo da sua marca. Selecione um local para ver todos os recursos disponíveis.
              </p>
            </div>
            <div className="flex-shrink-0 relative">
               <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-600 text-white rounded-[2rem] md:rounded-[3rem] flex items-center justify-center font-black text-4xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] rotate-6 transition-transform hover:rotate-0 duration-700 cursor-default">
                Y
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-1 bg-blue-200/50 rounded-full blur-sm"></div>
            </div>
          </div>
          {/* Decorative subtle background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Increased card width and decreased gap to exactly 32px (gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPACES.slice(0, displayCount).map((space) => (
            <div 
              key={space.id} 
              className="space-card group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:border-blue-400 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.12)] transition-all duration-700 flex flex-col cursor-pointer"
              onClick={() => onViewDetails(space)}
            >
              <div className="relative">
                <SpaceCardImage src={space.image} alt={space.name} />
                <div className="absolute top-8 left-8 z-10">
                  <span className="px-5 py-2.5 bg-white/95 backdrop-blur-md text-[10px] font-black text-blue-600 uppercase rounded-full shadow-xl tracking-[0.2em] border border-white/20">
                    {space.city}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-blue-600 mb-5 font-black text-[11px] uppercase tracking-[0.25em] opacity-80">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{space.city}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 group-hover:text-blue-600 transition-colors leading-tight min-h-[4.5rem] line-clamp-2">
                  {space.name}
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-10 py-6 border-y border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Capacidade</span>
                      <span className="text-sm font-black text-slate-900 truncate block">{space.capacity} pessoas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Área</span>
                      <span className="text-sm font-black text-slate-900 truncate block">{space.area}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-6">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Investimento</span>
                    <div className="text-slate-900 font-black text-3xl md:text-4xl tracking-tighter">
                      {space.price ? formatCurrency(space.price) : 'Consulte'}
                    </div>
                  </div>
                  <button 
                    className="w-16 h-16 rounded-[1.5rem] bg-slate-950 text-white flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:rotate-[-45deg] group-hover:scale-110 shadow-2xl shrink-0"
                    aria-label={`Ver detalhes de ${space.name}`}
                  >
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayCount < SPACES.length && (
          <div className="mt-24 flex justify-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 3)}
              className="group flex items-center gap-4 px-12 py-5 font-black uppercase text-[11px] tracking-[0.25em] bg-white border-[3px] border-slate-950 text-slate-950 rounded-full hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              Ver mais espaços
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpacesList;
