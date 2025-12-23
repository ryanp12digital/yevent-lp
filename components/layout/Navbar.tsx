
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onHomeClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-5 flex items-center justify-between',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent'
      )}
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={onHomeClick}
      >
        <span className={cn(
          "text-2xl font-black tracking-tighter transition-colors",
          isScrolled ? "text-blue-600" : "text-white"
        )}>
          Yevent
        </span>
      </div>

      <div className="flex items-center gap-10 font-bold uppercase text-[11px] tracking-[0.2em]">
        <button onClick={onHomeClick} className={cn(
          "transition-colors",
          isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
        )}>
          Início
        </button>
        <a href="#spaces" className={cn(
          "transition-colors",
          isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
        )}>
          Espaços
        </a>
        <a href="#contact" className={cn(
          "transition-colors",
          isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
        )}>
          Contato
        </a>
      </div>

      <div className="w-[100px] hidden md:block"></div>
    </nav>
  );
};

export default Navbar;
