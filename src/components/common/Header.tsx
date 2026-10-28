import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Activity, 
  PhoneCall, 
  Target, 
  FlaskConical, 
  Layers, 
  CreditCard, 
  ShieldCheck,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { analytics } from '../../lib/analytics';

interface HeaderProps {
  onOpenConcierge?: (initialPrompt?: string) => void;
  onOpenTelemetry?: () => void;
  onOpenBooking?: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      analytics.track('navigation_click', 'header', { targetId: id });
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Trajetória', target: 'trajetoria', icon: Layers },
    { label: 'Depoimentos', target: 'depoimentos', icon: ShieldCheck },
    { label: 'Método', target: 'metodo', icon: Activity },
    { label: 'Planos', target: 'planos', isHighlight: true, icon: CreditCard },
    { label: 'Evidências', target: 'evidencias', icon: Target },
    { label: 'FAQ', target: 'faq', icon: FlaskConical },
  ];

  return (
    <>
      {/* Precision Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#72B818] via-[#EB651A] to-[#198774] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#CCD8C4]/80 shadow-[0_6px_25px_rgba(20,40,25,0.06)] py-2.5 sm:py-3' 
            : 'bg-gradient-to-b from-[#EDF4EA]/95 via-[#EDF4EA]/80 to-transparent backdrop-blur-xs py-3 sm:py-5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. Left: Brand Identity with Official Logo */}
          <button 
            id="nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none cursor-pointer select-none shrink-0"
            aria-label="Dr. Tannuri Home"
          >
            <div className="h-9 sm:h-11 flex items-center shrink-0">
              <img
                src="/logo drtannuri.png"
                alt="Logo Dr. Tannuri - Nutrição de Precisão"
                className="h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-[170px] object-contain object-left group-hover:scale-[1.03] transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div className="hidden sm:block border-l border-[#CCD8C4] pl-2.5">
              <span className="block text-[10px] uppercase tracking-widest text-[#566D5D] font-mono-data font-bold">
                Nutrição de Precisão
              </span>
              <span className="block text-[9px] text-[#2C6E14] font-mono-data font-semibold">
                Esportiva & Clínica
              </span>
            </div>
          </button>

          {/* 2. Center: Desktop Balanced Navigation Pill */}
          <nav 
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#CCD8C4]/70 backdrop-blur-md shadow-xs text-xs font-semibold text-[#2C4032]" 
            aria-label="Navegação Principal"
          >
            {navItems.map((item) => (
              <button 
                key={item.target}
                id={`nav-${item.target}-btn`}
                onClick={() => scrollTo(item.target)} 
                className={`px-3 py-1.5 rounded-full transition-all duration-200 focus:outline-none cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  item.isHighlight 
                    ? 'text-[#0A160F] bg-gradient-to-r from-[#FFF5EE] to-[#FFEFE5] border border-[#FDCDB3] hover:border-[#EB651A]' 
                    : 'text-[#384C3E] hover:text-[#0A160F] hover:bg-[#F0F6EC]'
                }`}
              >
                {item.isHighlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EB651A] animate-pulse" />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* 3. Right: Symmetrical Action Hub with Roomy Mobile Layout */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Online Booking Trigger CTA (Desktop / Tablet) */}
            {onOpenBooking && (
              <button
                id="header-booking-btn"
                onClick={() => {
                  analytics.track('booking_open_header', 'navigation');
                  onOpenBooking();
                }}
                className="min-h-[40px] hidden md:flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-[#CCD8C4] hover:border-[#1B4D24] text-[#1B4D24] hover:shadow-[0_4px_14px_rgba(27,77,36,0.15)] transition-all text-xs font-bold cursor-pointer shadow-2xs active:scale-[0.98] group whitespace-nowrap"
                title="Acessar Agenda Online e reservar horário"
              >
                <Calendar className="w-3.5 h-3.5 text-[#1B4D24] group-hover:scale-110 transition-transform" />
                <span>Ver Agenda Online</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-pulse" />
              </button>
            )}

            {/* Primary Action Button - Never Wraps, Sits Elegant as Single-Line Luxury Pill */}
            <button
              id="header-primary-cta"
              onClick={() => {
                if (onOpenBooking) {
                  analytics.track('booking_open_header_primary', 'navigation');
                  onOpenBooking('diagnostico_inicial');
                } else {
                  scrollTo('planos');
                }
              }}
              className="min-h-[38px] sm:min-h-[42px] flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#1B4D24] via-[#245D2E] to-[#1B4D24] hover:from-[#EB651A] hover:to-[#D95510] text-white active:scale-95 font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_3px_12px_rgba(27,77,36,0.2)] hover:shadow-[0_6px_22px_rgba(235,101,26,0.35)] cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">Iniciar </span>
              <span>Diagnóstico</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#AEE938] shrink-0" />
            </button>

            {/* Mobile Menu Toggle Button (Luxury Circular Glass Pill) */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] lg:hidden rounded-full bg-white/95 border border-[#CCD8C4] text-[#0A160F] hover:text-[#1B4D24] hover:border-[#1B4D24] flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#0A160F]" /> : <Menu className="w-5 h-5 text-[#0A160F]" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu - 120% More Premium Experience */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A160F]/45 backdrop-blur-md lg:hidden flex justify-end animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação Mobile"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Sheet */}
          <div 
            className="w-full max-w-[380px] h-full bg-[#FAFDF8] border-l border-[#CCD8C4] shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between border-b border-[#CCD8C4]/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 flex items-center">
                    <img
                      src="/logo drtannuri.png"
                      alt="Logo Dr. Tannuri"
                      className="h-8 w-auto max-w-[140px] object-contain object-left"
                    />
                  </div>
                </div>

                <button
                  id="mobile-menu-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] rounded-full bg-white border border-[#CCD8C4] text-[#0A160F] hover:text-[#EB651A] hover:border-[#EB651A] flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
                  aria-label="Fechar menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Clinical Trust Strip */}
              <div className="mt-3.5 px-3 py-2 rounded-xl bg-[#EDF4EA]/80 border border-[#CCD8C4]/60 text-[11px] font-mono-data text-[#2C6E14] font-medium flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
                  Atendimento Presencial & Online
                </span>
                <span className="text-[#566D5D] font-bold">CFN/CRN</span>
              </div>

              {/* Navigation Items (Satin Touch Cards) */}
              <div className="py-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button 
                      key={item.target}
                      id={`mobile-nav-${item.target}`}
                      onClick={() => scrollTo(item.target)} 
                      className={`w-full min-h-[48px] p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer shadow-2xs active:scale-[0.98] ${
                        item.isHighlight
                          ? 'bg-gradient-to-r from-white via-[#FFF5EE] to-[#FFEFE5] border-[#FDCDB3] text-[#0A160F] ring-1 ring-[#EB651A]/20'
                          : 'bg-white/90 border-[#CCD8C4]/80 text-[#0A160F] hover:border-[#72B818] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          item.isHighlight ? 'bg-[#FFF0E6] text-[#EB651A]' : 'bg-[#EBF5E4] text-[#2C6E14]'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold tracking-tight">{item.label}</span>
                      </div>

                      {item.isHighlight ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2C6E14] text-white font-mono-data font-bold shadow-2xs">
                          Consultas & Valores
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#8B9A8F]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action CTAs at bottom of Mobile Drawer */}
            <div className="pt-4 border-t border-[#CCD8C4]/70 space-y-2.5">
              {onOpenBooking && (
                <button
                  id="mobile-booking-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    analytics.track('booking_open_mobile_menu', 'navigation');
                    onOpenBooking();
                  }}
                  className="min-h-[46px] w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F5F9F2] border border-[#CCD8C4] hover:border-[#1B4D24] text-[#1B4D24] font-bold text-xs flex items-center justify-between shadow-xs cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#72B818]" />
                    <span>Ver Agenda Online</span>
                  </div>
                  <span className="text-[10px] font-mono-data bg-[#EAF5E4] text-[#2C6E14] px-2 py-0.5 rounded-full border border-[#72B818]/30">
                    Vagas Abertas
                  </span>
                </button>
              )}

              <button
                id="mobile-whatsapp-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (CLIENT_INFO.isWhatsAppConfirmed) {
                    const text = encodeURIComponent('Olá! Gostaria de falar com a equipe do Dr. Luiz Tannuri sobre os programas de nutrição esportiva e clínica.');
                    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
                  } else if (onOpenBooking) {
                    onOpenBooking();
                  } else {
                    scrollTo('planos');
                  }
                }}
                className="min-h-[46px] w-full py-2.5 px-4 rounded-xl bg-[#EAF5E4] hover:bg-[#DEEED6] border border-[#CCD8C4] text-[#2C6E14] font-bold text-xs flex items-center justify-between shadow-xs cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#EB651A]" />
                  <span>{CLIENT_INFO.isWhatsAppConfirmed ? 'WhatsApp da Clínica' : 'Solicitar Atendimento Online'}</span>
                </div>
                <span className="text-[10px] font-mono-data text-[#566D5D]">
                  {CLIENT_INFO.isWhatsAppConfirmed ? CLIENT_INFO.primaryWhatsApp : 'Agendamento Direto'}
                </span>
              </button>

              <button
                id="mobile-primary-btn"
                onClick={() => scrollTo('planos')}
                className="min-h-[48px] w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1B4D24] via-[#245D2E] to-[#1B4D24] hover:from-[#EB651A] hover:to-[#D95510] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.98] transition-all"
              >
                <span>Conhecer Planos & Agendar</span>
                <ArrowRight className="w-4 h-4 text-[#AEE938]" />
              </button>

              <p className="text-[10px] text-center text-[#566D5D] font-mono-data pt-1">
                Dr. Luiz Tannuri • Nutrição Esportiva & Precisão Clínica
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

