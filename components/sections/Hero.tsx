
import React, { useState } from 'react';
import { Search, MapPin, Users, Building2 } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [capacity, setCapacity] = useState(50);

  return (
    <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1920&auto=format&fit=crop" 
          alt="Modern corporate boardroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
          O palco ideal para <br /> seu próximo <br /> sucesso corporativo.
        </h1>
        <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-16 font-medium leading-relaxed drop-shadow-lg">
          De reuniões executivas a conferências globais. Encontre espaços que inspiram inovação e colaboração.
        </p>

        {/* Enhanced Search Bar: Full width inline on desktop */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl md:rounded-full p-2 md:p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-stretch md:items-center text-slate-800 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="flex flex-col md:flex-row flex-1 items-stretch md:items-center">
            {/* Cidade */}
            <div className="flex-1 flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-slate-100 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <MapPin className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Cidade</span>
                <select className="w-full bg-transparent outline-none font-black appearance-none cursor-pointer text-slate-900 text-sm md:text-base pr-4">
                  <option>Selecione a cidade...</option>
                  <option>Fortaleza, CE</option>
                  <option>Salvador, BA</option>
                  <option>Recife, PE</option>
                </select>
              </div>
            </div>

            {/* Tipo de Sala */}
            <div className="flex-1 flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-slate-100 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <Building2 className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Tipo de sala</span>
                <select className="w-full bg-transparent outline-none font-black appearance-none cursor-pointer text-slate-900 text-sm md:text-base pr-4">
                  <option>Qual o formato?</option>
                  <option>Auditório</option>
                  <option>Sala de Aula</option>
                  <option>Sala de Reunião</option>
                  <option>Lounge Executivo</option>
                </select>
              </div>
            </div>

            {/* Capacidade */}
            <div className="flex-[1.2] flex items-center px-6 py-4 md:py-2 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <Users className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Capacidade</span>
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md min-w-[32px] text-center">
                    {capacity >= 200 ? '200+' : capacity}
                  </span>
                </div>
                <input 
                  type="range" 
                  className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none mt-2" 
                  min="1" 
                  max="200" 
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Search Button Inline */}
          <div className="p-2 md:p-0 md:pl-2">
            <Button size="lg" className="w-full md:w-auto md:rounded-full flex items-center justify-center py-4 md:py-4 md:px-14 shadow-xl shadow-blue-200/50 hover:scale-[1.02] active:scale-95 transition-all bg-blue-600 border-none">
              <Search className="w-5 h-5 mr-3" />
              <span className="uppercase tracking-widest text-xs font-black">Buscar Espaço</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
