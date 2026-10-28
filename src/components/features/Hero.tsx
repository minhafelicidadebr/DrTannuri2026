import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldAlert, Zap, Flame, Compass, Eye } from 'lucide-react';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { analytics } from '../../lib/analytics';
import { PatientTrustCluster } from '../common/PatientTrustCluster';
import { GoogleAuthorityCard } from '../common/GoogleAuthorityCard';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenConcierge: (prompt?: string) => void;
  onOpenReviews?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenConcierge, onOpenReviews }) => {
  // Quick 5-second interactive preview micro-state
  const [quickPillar, setQuickPillar] = useState<'metabolismo' | 'energia' | 'digestao'>('metabolismo');

  const pillarData = {
    metabolismo: {
      tag: "Flexibilidade Metabólica",
      quote: "Seu corpo aprende a alternar eficientemente entre carboidratos e gordura como fonte de energia, sem picos de fome.",
      stat: "+28% de saciedade com timing proteico",
      marker: "Sensibilidade à insulina"
    },
    energia: {
      tag: "Estabilidade Circadiana",
      quote: "Adequação de micronutrientes para eliminar a névoa mental e o cansaço que bate às 15h, sem dependência excessiva de café.",
      stat: "Zero quedas bruscas no período da tarde",
      marker: "Recuperação do sono profundo"
    },
    digestao: {
      tag: "Modulação da Microbiota",
      quote: "Redução ativa de inchaço e desconfortos estomacais com introdução estratégica de fibras prebióticas e alimentos funcionais.",
      stat: "Menos 65% de queixas de distensão abdominal",
      marker: "Equilíbrio do eixo intestino-cérebro"
    }
  };

  const handlePrimaryClick = () => {
    analytics.track('hero_primary_click', 'conversion', { action: 'open_booking' });
    onOpenBooking('diagnostico_inicial');
  };

  const handleSecondaryClick = () => {
    analytics.track('hero_secondary_click', 'navigation', { action: 'scroll_trajetoria' });
    const el = document.getElementById('trajetoria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" aria-label="Apresentação Principal Dr. Tanutri">
      {/* Subtle organic radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#72B818]/12 via-[#EB651A]/6 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 7/12 Editorial & Funnel */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-[#F6FAF1] to-[#FFF4ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
              <span>Metodologia Clínica Validada • {CLIENT_INFO.cityRegion}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A160F] leading-[1.12] mb-6">
              Nutrição de precisão para quem busca <br className="hidden sm:inline" />
              <span className="italic font-light text-[#2C4032]">saúde inegociável e </span>
              <span className="text-[#2C6E14] font-semibold underline decoration-[#EB651A]/40 decoration-wavy decoration-2 underline-offset-8">
                alta performance.
              </span>
            </h1>

            {/* Mobile/Tablet Photographic Hero Frame (Directly below headline) */}
            <div className="block lg:hidden w-full mb-6">
              <div className="w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden border border-[#CCD8C4] shadow-xl bg-white group">
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden relative">
                  <img
                    src="/tannuriacademy.jpg"
                    alt="Dr. Luiz Tannuri — Nutrição de Precisão & Acompanhamento Contínuo"
                    referrerPolicy="no-referrer"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top sm:object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>

            {/* Narrative Body */}
            <p className="text-base sm:text-lg text-[#384C3E] font-normal leading-relaxed mb-8 max-w-[560px]">
              Alinhe sua alimentação ao seu ritmo de vida, treinos e objetivos. Criamos{' '}
              <strong className="font-semibold text-[#0A160F]">protocolos inteligentes</strong> que 
              potencializam sua energia diária, refinam sua composição corporal e promovem{' '}
              <strong className="font-semibold text-[#0A160F]">longevidade com prazer à mesa</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                id="hero-primary-btn"
                onClick={handlePrimaryClick}
                className="min-h-[46px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#1B4D24] via-[#245D2E] to-[#1B4D24] text-white font-bold text-sm hover:from-[#245D2E] hover:to-[#1B4D24] hover:scale-103 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[rgba(27,77,36,0.25)] hover:shadow-[0_12px_28px_rgba(27,77,36,0.35)] group cursor-pointer"
              >
                <span>Agendar Primeira Consulta</span>
                <ArrowRight className="w-4 h-4 text-[#AEE938] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-btn"
                onClick={handleSecondaryClick}
                className="min-h-[46px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-white via-[#F8FAF5] to-[#EEF5E9] hover:border-[#72B818] text-[#0A160F] border border-[#CCD8C4] text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
              >
                <Compass className="w-4 h-4 text-[#72B818]" />
                <span>Trajetória & Diplomas</span>
              </button>
            </div>

            {/* Direct Quick Jump to the Plans */}
            <div className="mb-6">
              <a
                href="#planos"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-[#F8FAF5] to-[#FFF4ED] border border-[#CCD8C4] hover:border-[#EB651A] text-xs font-mono text-[#0A160F] hover:text-[#C84A07] transition-all shadow-xs group font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-ping" />
                <span>Ver Planos Comerciais & Acompanhamento (Cards)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Proof & Google Reviews Authority Dock (Inspired by Attachments) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-7 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-white via-[#FAFDF8] to-[#F2F7ED] border border-[#CCD8C4] shadow-xs w-full max-w-[560px]">
              <PatientTrustCluster theme="light" onClick={onOpenReviews} showReviewsHint />
              <div className="hidden sm:block w-px h-9 bg-[#CCD8C4]" />
              <GoogleAuthorityCard variant="hero-badge" onOpenReviewsModal={onOpenReviews} className="!border-0 !bg-transparent !p-0 !shadow-none" />
            </div>

            {/* 3 Trust Chips */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#CCD8C4] w-full max-w-[520px]">
              <div className="flex flex-col">
                <span className="font-mono-data text-xs font-bold text-[#2C6E14]">01. BIOINDIVIDUAL</span>
                <span className="text-xs text-[#566D5D] mt-0.5 font-medium">Metabolismo próprio</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-data text-xs font-bold text-[#EB651A]">02. ZERO FOME</span>
                <span className="text-xs text-[#566D5D] mt-0.5 font-medium">Densidade nutritiva</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-data text-xs font-bold text-[#198774]">03. SUPORTE</span>
                <span className="text-xs text-[#566D5D] mt-0.5 font-medium">App Webidiet & Suporte</span>
              </div>
            </div>

          </div>

          {/* Right Column: 5/12 High-End Visual Anchor Dedicated to Elite Sports Nutrition (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col items-center">
            
            {/* Editorial Photographic Hero Anchor Frame (3:4 Aspect Ratio) - 100% Unobstructed */}
            <div className="w-full relative rounded-3xl overflow-hidden border border-[#CCD8C4] shadow-2xl bg-white group">
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  id="hero-master-image"
                  src="/tannuriacademy.jpg"
                  alt="Dr. Luiz Tannuri — Nutrição de Precisão & Acompanhamento Contínuo"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* Dynamic Biological Telemetry Dock: "Sinais do Seu Metabolismo"           */}
        {/* Placed as an elegant horizontal bridge between Hero and Trust Strip       */}
        {/* ========================================================================= */}
        <div className="mt-12 lg:mt-16 w-full rounded-3xl bg-gradient-to-br from-white/95 via-[#FAFDF8] to-[#EEF5E8] border border-[#CCD8C4] p-5 sm:p-7 lg:p-8 shadow-[0_16px_40px_rgba(20,40,25,0.08)] relative overflow-hidden">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-10 w-72 h-72 bg-[#72B818]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Dock Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#CCD8C4] relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFF0E6] to-[#FFE2D1] border border-[#FDCDB3] flex items-center justify-center text-[#EB651A] shadow-2xs">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#0A160F]">
                    Sinais do Seu Metabolismo: Modelo Fisiológico Ilustrativo
                  </h3>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold bg-[#FFF0E6] text-[#C84A07] border border-[#FDCDB3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EB651A] mr-1 animate-pulse" />
                    Simulação Interativa
                  </span>
                </div>
                <p className="text-xs text-[#566D5D] font-mono-data">
                  Selecione um biomarcador para simular a resposta adaptativa do seu organismo
                </p>
              </div>
            </div>

            {/* Mobile Simulation Tag */}
            <div className="sm:hidden flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold bg-[#FFF0E6] text-[#C84A07] border border-[#FDCDB3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB651A] mr-1 animate-pulse" />
                Simulação
              </span>
            </div>
          </div>

          {/* Tri-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pt-5 items-center relative z-10">
            
            {/* Column 1 (3/12): Pillar Selectors */}
            <div className="lg:col-span-3 flex flex-col gap-2">
              <span className="text-[11px] font-mono-data uppercase tracking-wider text-[#566D5D] font-bold">
                Eixo Fisiológico
              </span>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                <button
                  id="hero-pillar-metabolismo-btn"
                  onClick={() => {
                    setQuickPillar('metabolismo');
                    analytics.track('hero_quick_toggle', 'interaction', { pillar: 'metabolismo' });
                  }}
                  className={`min-h-[44px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    quickPillar === 'metabolismo'
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'bg-white border border-[#CCD8C4] text-[#2C4032] hover:text-[#0A160F] hover:bg-[#F3F8EE]'
                  }`}
                >
                  <span>Metabolismo</span>
                  {quickPillar === 'metabolismo' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE938]" />
                  )}
                </button>

                <button
                  id="hero-pillar-energia-btn"
                  onClick={() => {
                    setQuickPillar('energia');
                    analytics.track('hero_quick_toggle', 'interaction', { pillar: 'energia' });
                  }}
                  className={`min-h-[44px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    quickPillar === 'energia'
                      ? 'bg-[#EB651A] text-white shadow-xs'
                      : 'bg-white border border-[#CCD8C4] text-[#2C4032] hover:text-[#0A160F] hover:bg-[#FFF4ED]'
                  }`}
                >
                  <span>Energia</span>
                  {quickPillar === 'energia' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>

                <button
                  id="hero-pillar-digestao-btn"
                  onClick={() => {
                    setQuickPillar('digestao');
                    analytics.track('hero_quick_toggle', 'interaction', { pillar: 'digestao' });
                  }}
                  className={`min-h-[44px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    quickPillar === 'digestao'
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'bg-white border border-[#CCD8C4] text-[#2C4032] hover:text-[#0A160F] hover:bg-[#F3F8EE]'
                  }`}
                >
                  <span>Digestão</span>
                  {quickPillar === 'digestao' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE938]" />
                  )}
                </button>
              </div>
            </div>

            {/* Column 2 (5/12): Dynamic Physiological Insight */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#CCD8C4] shadow-xs flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono-data text-[#C84A07] font-bold uppercase tracking-wider bg-[#FFF0E6] px-2 py-0.5 rounded-md">
                    {pillarData[quickPillar].tag}
                  </span>
                  <span className="text-[10px] text-[#198774] font-mono-data font-bold">
                    Alvo Fisiológico
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0A160F] leading-relaxed font-medium">
                  "{pillarData[quickPillar].quote}"
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-[#E2ECE0] flex items-center justify-between text-xs">
                <span className="text-[#566D5D]">Foco do acompanhamento:</span>
                <span className="font-bold text-[#2C6E14]">{pillarData[quickPillar].marker}</span>
              </div>
            </div>

            {/* Column 3 (4/12): Micro-Victory & AI Interaction */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-[#EBF5E6] border border-[#CCD8C4] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2C6E14] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-mono-data text-[#2C6E14] font-bold block">
                    Impacto Comprovado
                  </span>
                  <span className="text-xs sm:text-sm text-[#0A160F] font-bold">
                    {pillarData[quickPillar].stat}
                  </span>
                </div>
              </div>

              <button
                id="hero-ask-concierge-btn"
                onClick={() => onOpenConcierge(`Gostaria de entender como o método trabalha ${pillarData[quickPillar].tag}`)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-white to-[#F6FAF2] border border-[#CCD8C4] hover:border-[#1B4D24] hover:bg-[#EBF5E5] text-xs font-bold text-[#1B4D24] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
              >
                <img 
                  src={VISUAL_ASSETS.conciergeAvatar.src}
                  alt="Clara"
                  className="w-5 h-5 rounded-full object-cover border border-[#CCD8C4] group-hover:scale-105 transition-transform"
                />
                <span>Perguntar à Assistente sobre {pillarData[quickPillar].tag} &rarr;</span>
              </button>
            </div>

          </div>

          {/* Regulatory Disclaimer at bottom of Dock */}
          <div className="mt-4 pt-3 border-t border-[#CCD8C4]/70 flex items-center justify-between text-[10px] text-[#566D5D] relative z-10">
            <span>Demonstração conceitual ilustrativa. Condutas individualizadas em consulta médica e nutricional.</span>
            <span className="font-mono-data font-bold text-[#2C6E14] hidden sm:inline">CFN / CRN-3</span>
          </div>

        </div>

      </div>
    </section>
  );
};
