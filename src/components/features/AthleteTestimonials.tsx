import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Globe2,
  CheckCircle2,
  Quote,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ATHLETE_TESTIMONIALS, AthleteTestimonial } from '../../data/professionalCredentials';
import { GoogleAuthorityCard } from '../common/GoogleAuthorityCard';
import { PatientTrustCluster } from '../common/PatientTrustCluster';
import { analytics } from '../../lib/analytics';

interface AthleteTestimonialsProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenReviews?: () => void;
}

export const AthleteTestimonials: React.FC<AthleteTestimonialsProps> = ({
  onOpenBooking,
  onOpenReviews,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<AthleteTestimonial | null>(null);
  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImageModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenDocModal = (testimonial: AthleteTestimonial) => {
    setActiveImageModal(testimonial);
    analytics.track('testimonial_doc_view', 'engagement', { athlete: testimonial.name });
  };

  return (
    <section
      id="depoimentos"
      className="py-16 md:py-24 bg-gradient-to-b from-[#E5EFE2] via-[#EFF6EA] to-[#F7FAF5] border-b border-[#CCD8C4] relative overflow-hidden text-[#0A160F]"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute inset-0 pointer-events-none -z-0" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(114,184,24,0.08),transparent_70%)]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(235,101,26,0.06),transparent_70%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header: Neuromarketing Authority & Google 5.0 Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          
          {/* Left Column: Narrative & Chancelas */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 bg-white px-3.5 py-1.5 rounded-full border border-[#CCD8C4] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#2C6E14] font-mono-data">
                O que os atletas e pacientes estão dizendo
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight leading-[1.12] mb-4 text-balance"
            >
              Chancelado por campeões mundiais, treinadores de elite e líderes globais.
            </h2>

            {/* Mobile / Tablet: Card do print de avaliação do Google ao lado do título */}
            <div className="block lg:hidden my-6">
              <GoogleAuthorityCard variant="print-card" onOpenReviewsModal={onOpenReviews} className="mx-auto" />
            </div>

            <p className="text-base sm:text-lg text-[#384C3E] leading-relaxed max-w-2xl mb-6">
              Da preparação para o ADCC e Mundiais da IBJJF à alta produtividade executiva internacional: a ciência nutricional do Dr. Luiz Tannuri comprovada na prática do mais alto nível competitivo.
            </p>

            {/* Trust Cluster & International Reach Badges */}
            <div className="space-y-3.5">
              <PatientTrustCluster theme="light" onClick={onOpenReviews} showReviewsHint />

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-semibold text-[#566D5D] pt-1">
                <span className="text-[#0A160F] font-bold">Atendimento validado em:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#CCD8C4] shadow-2xs">
                  <span>🇩🇪</span> Munique (Alemanha)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#CCD8C4] shadow-2xs">
                  <span>🇯🇴</span> Amã (Oriente Médio)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#CCD8C4] shadow-2xs">
                  <span>🇺🇸</span> Miami (EUA)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#CCD8C4] shadow-2xs">
                  <span>🇧🇷</span> Brasília & Todo o Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Card do print de avaliação do Google ao lado da frase (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 w-full justify-center lg:justify-end">
            <GoogleAuthorityCard variant="print-card" onOpenReviewsModal={onOpenReviews} className="w-full max-w-md shadow-md" />
          </div>

        </div>

        {/* 3 Master Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-14">
          {ATHLETE_TESTIMONIALS.map((t) => {
            const isExpanded = expandedTestimonialId === t.id;

            return (
              <article
                key={t.id}
                className="group bg-white rounded-3xl border border-[#CCD8C4] shadow-xs hover:border-[#72B818] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Media Header: Official Screenshot & Portrait Card */}
                  <div className="relative aspect-square w-full bg-[#0A160F] overflow-hidden">
                    <img
                      src={t.imageSrc}
                      alt={t.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Tag & Zoom Inspect Button */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A160F]/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white tracking-wide shadow-md">
                        <Trophy className="w-3.5 h-3.5 text-[#EB651A]" />
                        <span>{t.tag}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenDocModal(t)}
                        className="pointer-events-auto p-2 rounded-full bg-[#0A160F]/85 hover:bg-[#72B818] text-white hover:text-[#0A160F] backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                        title="Inspecionar depoimento oficial"
                        aria-label={`Inspecionar depoimento oficial de ${t.name}`}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom overlay: Location badge and Verification */}
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/95 bg-[#0A160F]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                        <span>{t.countryFlag}</span>
                        <span>{t.location}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#AEE938] bg-[#0A160F]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#72B818]/40">
                        <ShieldCheck className="w-3 h-3 text-[#72B818]" />
                        <span>Verificado</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 sm:p-7">
                    {/* Athlete Name & Role */}
                    <div className="mb-4">
                      <h3 className="font-display font-bold text-2xl text-[#0A160F] tracking-tight group-hover:text-[#2C6E14] transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#2C6E14] mt-0.5">
                        {t.role}
                      </p>
                    </div>

                    {/* Championships Badges */}
                    <div className="mb-5 space-y-1.5">
                      {t.championships.map((champ, cIdx) => (
                        <div
                          key={cIdx}
                          className="inline-flex items-center gap-1.5 w-full text-[11px] font-semibold text-[#0A160F] bg-[#F2F8ED] px-2.5 py-1 rounded-lg border border-[#CCD8C4]"
                        >
                          <Medal className="w-3.5 h-3.5 text-[#EB651A] shrink-0" />
                          <span className="truncate">{champ}</span>
                        </div>
                      ))}
                    </div>

                    {/* Primary Benefit Callout */}
                    <div className="mb-4 p-3 rounded-xl bg-[#F0F9EC] border border-[#CCD8C4]">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#2C6E14] font-mono-data block mb-0.5">
                        Impacto na Performance:
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#0A160F] leading-snug">
                        {t.primaryBenefit}
                      </p>
                    </div>

                    {/* Quote text */}
                    <div className="relative pt-1">
                      <Quote className="w-6 h-6 text-[#CCD8C4] mb-2" aria-hidden="true" />
                      <p className="text-sm sm:text-base text-[#384C3E] leading-relaxed italic">
                        {isExpanded ? t.fullQuote : `"${t.shortQuote}"`}
                      </p>

                      <button
                        type="button"
                        onClick={() => setExpandedTestimonialId(isExpanded ? null : t.id)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2C6E14] hover:text-[#1F4A0C] transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Ver síntese rápida' : 'Ler relato completo na íntegra'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenDocModal(t)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F2F8ED] hover:bg-[#0A160F] text-[#0A160F] hover:text-white border border-[#CCD8C4] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group-hover:border-[#72B818]"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#2C6E14] group-hover:text-[#AEE938]" />
                    <span>Visualizar Depoimento Original</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Social Proof Metrics Bar */}
        <div className="bg-[#0A160F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto flex-1">
            <div className="border-l-2 border-[#72B818] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                +10 Anos
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                Prática clínica com atletas
              </div>
            </div>

            <div className="border-l-2 border-[#EB651A] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                +12 Países
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                Pacientes atendidos online
              </div>
            </div>

            <div className="border-l-2 border-[#72B818] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                100%
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                Individualizado ao seu treino
              </div>
            </div>

            <div className="border-l-2 border-[#EB651A] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Faixa-Preta
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                Vivência real do tatame
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking('diagnostico_inicial')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#72B818] hover:bg-[#5fa536] text-[#0A160F] font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Quero uma estratégia deste nível</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Original Testimonial Screenshot Inspection */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-[#0A160F]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Comprovante do depoimento de ${activeImageModal.name}`}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl border border-[#CCD8C4] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#CCD8C4] bg-[#F8FAF5]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#72B818]" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A160F]">
                    {activeImageModal.name} · {activeImageModal.location}
                  </h4>
                  <p className="text-[11px] text-[#2C6E14] font-semibold">
                    {activeImageModal.role}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="p-1.5 rounded-lg bg-[#EDF4EA] hover:bg-[#CCD8C4] text-[#0A160F] transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Documental Image Frame */}
            <div className="relative aspect-square w-full bg-[#0A160F] flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img
                src={activeImageModal.imageSrc}
                alt={activeImageModal.alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-inner"
              />
            </div>

            {/* Full text in modal */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#CCD8C4]">
              <div className="flex items-start gap-2 mb-2 text-xs font-semibold text-[#2C6E14]">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#72B818]" />
                <span>Depoimento Documentado e Autêntico</span>
              </div>
              <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed italic">
                {activeImageModal.fullQuote}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
