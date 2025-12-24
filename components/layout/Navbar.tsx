'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, LayoutGrid, Mail, Menu, X, ArrowRight } from 'lucide-react'
import { type ViewState } from '../../App'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'

interface NavbarProps {
  currentView?: ViewState
  onNavigate?: (view: ViewState) => void
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detect scroll to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Início', id: 'home', icon: Home, path: '/' },
    { name: 'Espaços', id: 'spaces', icon: LayoutGrid, path: '/spaces' },
    { name: 'Contato', id: 'contact', icon: Mail, path: '/contact' }
  ]

  const handleNavigate = (view: ViewState) => {
    setIsMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(view)
    } else if (typeof window !== 'undefined') {
      const pathMap: Record<string, string> = {
        'home': '/',
        'spaces': '/spaces',
        'contact': '/contact'
      }
      window.location.href = pathMap[view] || '/'
    }
  }

  const activeId = currentView || 'home'

  return (
    <>
      {/* 
         NAVBAR CONTAINER
         - Fixed position
         - Centered horizontally
         - Width adjusts to content (w-auto) to avoid invisible blocking blocks
      */}
      <nav 
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out w-[90%] max-w-4xl",
          isScrolled ? "top-4" : "top-6"
        )}
      >
        <div className={cn(
          "bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50 rounded-full px-2 py-2 flex items-center justify-between transition-all duration-500",
          isMobileMenuOpen ? "rounded-3xl flex-col items-stretch gap-4 p-4 bg-white" : ""
        )}>
          
          {/* Header Row (Logo + Mobile Toggle) */}
          <div className="flex items-center justify-between pl-4 pr-2 w-full md:w-auto">
            <Link 
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('home')
              }}
              className="flex items-center gap-2 group mr-8"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                Y
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Yevent
              </span>
            </Link>

            <button 
              className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200/50">
            {navItems.map((item) => {
              const isActive = activeId === item.id || (activeId === 'detail' && item.id === 'spaces')
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id as ViewState)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                    isActive 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  )}
                >
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block pl-2">
            <Button 
              size="sm"
              onClick={() => handleNavigate('contact')}
              className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-slate-900 hover:bg-blue-600 shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2"
            >
              Reservar <ArrowRight size={14} />
            </Button>
          </div>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-2 pt-2 border-t border-slate-100 animate-in slide-in-from-top-2">
              {navItems.map((item) => {
                 const isActive = activeId === item.id
                 return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id as ViewState)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3",
                      isActive 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </button>
                 )
              })}
              <Button 
                onClick={() => handleNavigate('contact')}
                className="w-full mt-2 rounded-xl py-3 justify-center"
              >
                Solicitar Reserva
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar