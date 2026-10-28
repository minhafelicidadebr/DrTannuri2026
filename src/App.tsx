import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { TrustStrip } from './components/common/TrustStrip';
import { Footer } from './components/common/Footer';
import { ConciergeModal } from './components/common/ConciergeModal';
import { Hero } from './components/features/Hero';
import { ProfessionalAuthorityRibbon } from './components/features/ProfessionalAuthorityRibbon';
import { ProfessionalStory } from './components/features/ProfessionalStory';
import { AthleteTestimonials } from './components/features/AthleteTestimonials';
import { MethodSection } from './components/features/MethodSection';
import { PlansSection } from './components/features/PlansSection';
import { SocialProof } from './components/features/SocialProof';
import { FAQSection } from './components/features/FAQSection';
import { FinalCTA } from './components/features/FinalCTA';
import { BookingModal } from './components/features/booking/BookingModal';
import { GoogleReviewsModal } from './components/common/GoogleReviewsModal';
import { PlanItem } from './types';
import { CLIENT_INFO } from './data/canonicalCatalog';
import { VISUAL_ASSETS } from './data/imageAssets';
import { analytics } from './lib/analytics';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function App() {
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergePrompt, setConciergePrompt] = useState('');

  // Online Booking Pop-out Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>(undefined);

  // Google Reviews Modal State
  const [reviewsOpen, setReviewsOpen] = useState(false);

  // Initialize page analytics
  useEffect(() => {
    analytics.track('page_view', 'engagement', { page: 'full_app' });
  }, []);

  const handleOpenConcierge = (prompt: string = '') => {
    setConciergePrompt(prompt);
    setConciergeOpen(true);
    analytics.track('ai_concierge_open', 'interaction', { originPrompt: prompt });
  };

  const handleOpenBooking = (serviceId?: string) => {
    setBookingInitialService(serviceId);
    setBookingOpen(true);
    analytics.track('booking_modal_requested', 'navigation', { serviceId: serviceId || 'none' });
  };

  const handleSelectPlan = (plan: PlanItem) => {
    analytics.track('plan_booking_intent', 'conversion', { planId: plan.id });
    handleOpenBooking(plan.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF4EA] via-[#E2ECE0] to-[#EBF3E8] text-[#0A160F] selection:bg-[#72B818] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Global Ambient Lighting Layers - Fresh Chlorophyll & Warm Citrus Sunlight */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_1000px_at_50%_-120px,rgba(114,184,24,0.12),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_90%_25%,rgba(235,101,26,0.06),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_700px_at_10%_65%,rgba(25,135,116,0.06),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_900px_at_80%_85%,rgba(235,101,26,0.04),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      
      {/* 1. Global Navigation */}
      <Header 
        onOpenConcierge={() => handleOpenConcierge()} 
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Narrative Sections */}
      <main>
        {/* 2. Hero Section (Página 1 do PDF: 60 min, visual verde preservado, CTAs funcionais) */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          onOpenConcierge={handleOpenConcierge}
          onOpenReviews={() => setReviewsOpen(true)}
        />

        {/* 3. Clinical Trust Strip */}
        <TrustStrip onOpenReviews={() => setReviewsOpen(true)} />

        {/* 4. R04: Faixa Compacta de Indicadores de Autoridade Aprovados */}
        <ProfessionalAuthorityRibbon />

        {/* 5. Trajetória & Diplomas Oficiais do Dr. Luiz Tannuri (Páginas 2 e 3 do PDF) */}
        <ProfessionalStory 
          onOpenBooking={handleOpenBooking}
          onOpenConcierge={handleOpenConcierge}
        />

        {/* 5. Depoimentos Chancelados de Atletas e Líderes Globais (Página 3 do PDF) */}
        <AthleteTestimonials 
          onOpenBooking={handleOpenBooking}
          onOpenReviews={() => setReviewsOpen(true)}
        />

        {/* 6. Método: Marmitaria do Atleta, InBody 120 e Biomarcadores (Página 4 do PDF) */}
        <MethodSection />

        {/* 7. Arquitetura de Valor: 4 Planos Canônicos por Modalidade & Add-ons (Páginas 9 e 10 do PDF) */}
        <PlansSection 
          onSelectPlan={handleSelectPlan}
          onOpenConcierge={handleOpenConcierge}
          onOpenBooking={handleOpenBooking}
        />

        {/* 8. Evidências Clínicas Éticas & Casos Ilustrativos */}
        <SocialProof
          onOpenReviews={() => setReviewsOpen(true)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 9. Dúvidas Frequentes (FAQ) */}
        <FAQSection onOpenConcierge={handleOpenConcierge} />

        {/* 10. Fechamento Final & Agendamento Estratégico (Páginas 11 e 12 do PDF) */}
        <FinalCTA 
          onOpenConcierge={handleOpenConcierge}
          onOpenBooking={handleOpenBooking}
          onOpenReviews={() => setReviewsOpen(true)}
        />
      </main>

      {/* 11. Rodapé Institucional e Regulatório */}
      <Footer />

      {/* 12. Floating Persistent Concierge Trigger with Clara Avatar */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40">
        <button
          id="floating-concierge-btn"
          onClick={() => handleOpenConcierge()}
          className="group relative flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 pr-3.5 sm:pr-5 rounded-full bg-white/95 backdrop-blur-md border border-[#CCD8C4] hover:border-[#72B818] shadow-[0_16px_40px_rgba(20,40,25,0.18),0_2px_8px_rgba(20,40,25,0.06)] hover:shadow-[0_20px_50px_rgba(114,184,24,0.25)] active:scale-95 transition-all duration-300 cursor-pointer text-left min-h-[48px]"
          aria-label="Abrir Concierge Clara"
        >
          {/* Avatar com Anel Esmeralda & Beacon de Presença Ativa */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#72B818] shadow-sm bg-[#E2ECE0]">
              <img
                src={VISUAL_ASSETS.conciergeAvatar?.src || ''}
                alt="Clara - Assistente Dr. Tannuri"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Beacon Pulsante Online */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-white shadow-xs flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
            </span>
          </div>

          {/* Microcopy de Ação e Conversão */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono-data uppercase font-bold text-[#2C6E14] tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#EB651A]" />
                Assistente de IA
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#CCD8C4]" />
              <span className="hidden sm:inline-block text-[10px] font-mono-data text-[#566D5D] font-medium">Online</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#0A160F] leading-snug group-hover:text-[#2C6E14] transition-colors">
              Qual plano ideal para seu objetivo?
            </span>
            <span className="text-[11px] text-[#566D5D] hidden sm:block leading-tight">
              Concierge <strong className="text-[#0A160F] font-semibold">Clara</strong> • Análise e valores
            </span>
          </div>

          {/* Ícone de Ação */}
          <div className="w-7 h-7 rounded-full bg-[#F2F8ED] border border-[#CCD8C4] group-hover:bg-[#2C6E14] group-hover:text-white group-hover:border-[#2C6E14] text-[#2C6E14] flex items-center justify-center transition-all shrink-0 ml-1 shadow-2xs">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 13. AI Concierge Modal Drawer */}
      <ConciergeModal 
        isOpen={conciergeOpen} 
        onClose={() => setConciergeOpen(false)} 
        initialPrompt={conciergePrompt}
      />

      {/* 15. Master Online Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialServiceId={bookingInitialService}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* 16. Google Reviews & Social Proof Authority Modal */}
      <GoogleReviewsModal
        isOpen={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

    </div>
  );
}
