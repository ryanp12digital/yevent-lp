
import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import SpacesList from './components/sections/SpacesList';
import SpaceDetail from './components/features/SpaceDetail';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import { SPACES, type Space } from './data/spaces';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedSpace]);

  const handleViewDetails = (space: Space) => {
    setSelectedSpace(space);
    setCurrentView('detail');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedSpace(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Navbar onHomeClick={handleGoHome} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
            <SpacesList onViewDetails={handleViewDetails} />
          </>
        ) : (
          selectedSpace && (
            <SpaceDetail 
              space={selectedSpace} 
              onBack={handleGoHome} 
            />
          )
        )}
      </main>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
