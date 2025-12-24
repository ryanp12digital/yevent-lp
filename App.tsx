
import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import SpacesList from './components/sections/SpacesList';
import SpaceDetail from './components/features/SpaceDetail';
import ContactPage from './components/features/ContactPage';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import { type Space } from './data/spaces';

export type ViewState = 'home' | 'spaces' | 'contact' | 'detail';

export interface FilterCriteria {
  city: string;
  type: string;
  capacity: number;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  
  // Estado para os filtros
  const [filters, setFilters] = useState<FilterCriteria>({
    city: '',
    type: '',
    capacity: 200
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedSpace]);

  const handleViewDetails = (space: Space) => {
    setSelectedSpace(space);
    setCurrentView('detail');
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSelectedSpace(null);
    // Resetar filtros ao navegar para garantir visualização limpa, se desejado
    if (view === 'home' || view === 'spaces') {
      setFilters({ city: '', type: '', capacity: 200 });
    }
  };

  const handleSearch = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    // Se estiver na home, rola para a lista. Se não, poderia mudar a view.
    // Como a lista está na Home, apenas rolamos.
    setTimeout(() => {
      const spacesSection = document.getElementById('spaces');
      if (spacesSection) {
        spacesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero onSearch={handleSearch} />
            
            {/* Seção de Transição Elegante */}
            <div className="relative py-24 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                  <div className="space-y-4 max-w-2xl">
                    <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Exclusividade</span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                      Destaques selecionados <br /> para sua empresa.
                    </h2>
                  </div>
                  <p className="text-slate-500 font-medium text-lg max-w-sm pb-2">
                    Conheça os espaços que estão transformando a forma como grandes marcas realizam seus eventos.
                  </p>
                </div>
                
                <SpacesList 
                  onViewDetails={handleViewDetails} 
                  limit={3} 
                  showTitle={false}
                  filters={filters}
                  onSeeAll={() => handleNavigate('spaces')} 
                />
              </div>
            </div>
          </div>
        )}

        {currentView === 'spaces' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="pt-40 pb-20 px-6 bg-slate-950 text-white text-center relative">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tighter">Nosso Portfólio</h1>
                <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                  Curadoria rigorosa de ambientes que unem tecnologia, <br /> design e localização privilegiada.
                </p>
              </div>
            </div>
            {/* Na página de espaços, passamos os filtros (que podem estar resetados ou vindo de navegação) */}
            <SpacesList onViewDetails={handleViewDetails} filters={filters} />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ContactPage />
          </div>
        )}

        {currentView === 'detail' && selectedSpace && (
          <div className="animate-in fade-in duration-500">
            <SpaceDetail 
              space={selectedSpace} 
              onBack={() => handleNavigate('spaces')} 
            />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
