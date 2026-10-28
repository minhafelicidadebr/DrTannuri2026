import React from 'react';
import { GOOGLE_REVIEWS_META } from '../../data/googleReviewsData';
import { analytics } from '../../lib/analytics';

interface GoogleAuthorityCardProps {
  variant?: 'card' | 'compact' | 'hero-badge' | 'minimal' | 'print-card' | 'standalone-card';
  className?: string;
  onOpenReviewsModal?: () => void;
  onOpenBooking?: () => void;
}

export const GoogleAuthorityCard: React.FC<GoogleAuthorityCardProps> = ({
  variant = 'card',
  className = '',
  onOpenReviewsModal,
}) => {
  const handleAvaliarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.track('google_review_btn_clicked', 'conversion', { variant });
    if (onOpenReviewsModal) {
      onOpenReviewsModal();
    } else if (GOOGLE_REVIEWS_META.googlePlaceUrl) {
      window.open(GOOGLE_REVIEWS_META.googlePlaceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardClick = () => {
    if (onOpenReviewsModal) {
      analytics.track('google_card_opened_modal', 'interaction', { variant });
      onOpenReviewsModal();
    }
  };

  // 0. Variant: Card do Print do Anexo de Avaliação (Image Attachment)
  if (variant === 'print-card' || variant === 'standalone-card') {
    return (
      <div
        onClick={handleCardClick}
        role={onOpenReviewsModal ? 'button' : undefined}
        tabIndex={onOpenReviewsModal ? 0 : undefined}
        onKeyDown={(e) => {
          if (onOpenReviewsModal && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpenReviewsModal();
          }
        }}
        className={`relative w-full max-w-[320px] sm:max-w-[340px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white/95 border border-[#CCD8C4] hover:border-[#72B818] shadow-[0_16px_40px_rgba(20,40,25,0.08),0_2px_8px_rgba(20,40,25,0.04)] hover:shadow-[0_24px_50px_rgba(114,184,24,0.18)] transition-all duration-300 hover:-translate-y-1 select-none group cursor-pointer ${className}`}
        aria-label="Google Reviews - Nota 5,0 máxima em 148 avaliações no Google - Auditado"
      >
        {/* Print Image from user attachment */}
        <div className="relative w-full overflow-hidden bg-[#FAF7F2] p-1 sm:p-1.5">
          <img
            src="/assets/aistudio/image_93488111.png"
            alt="Google Reviews: Nota 5,0 máxima em 148 avaliações no Google - 100% de satisfação verificada em atendimentos presenciais e online - Auditado"
            className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-300"
            loading="eager"
          />
        </div>

        {/* Interactive Bottom Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#FAFDF8] to-white border-t border-[#CCD8C4]/70 flex items-center justify-between text-xs">
          <span className="font-mono-data text-[11px] text-[#2C6E14] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
            <span>Avaliações Auditadas</span>
          </span>
          <span className="text-[#566D5D] group-hover:text-[#1B4D24] text-[11px] font-semibold flex items-center gap-1">
            <span>Ver Detalhes</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M4 8a.75.75 0 0 1 .75-.75h5.69L8.22 5.03a.75.75 0 0 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 8z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    );
  }

  // 1. Variant: Standard Full Authority Card
  if (variant === 'card') {
    return (
      <div
        onClick={handleCardClick}
        role={onOpenReviewsModal ? 'button' : undefined}
        tabIndex={onOpenReviewsModal ? 0 : undefined}
        onKeyDown={(e) => {
          if (onOpenReviewsModal && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpenReviewsModal();
          }
        }}
        className={`relative w-full max-w-[340px] rounded-3xl sm:rounded-[32px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFE3] border border-[#E8DFD0] p-5 sm:p-8 flex flex-col items-center text-center shadow-[0_20px_45px_rgba(40,30,15,0.08),0_4px_16px_rgba(40,30,15,0.04)] transition-all duration-300 hover:shadow-[0_28px_55px_rgba(40,30,15,0.12)] hover:-translate-y-1 select-none group cursor-pointer ${className}`}
        aria-label="Avaliação 5,0 no Google com 148 avaliações"
      >
        {/* Subtle Ambient Inner Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#F59E0B]/5 rounded-full blur-2xl pointer-events-none" />

        {/* 1. 5 Golden Amber Stars */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2.5 sm:mb-3 text-[#F59E0B]" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 fill-current drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] transition-transform duration-200 group-hover:scale-110"
              style={{ transitionDelay: `${i * 35}ms` }}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* 2. Score "5,0" with Refined Typography */}
        <div className="font-display text-4xl sm:text-6xl font-normal text-[#1A261E] tracking-tight leading-none mb-2 sm:mb-3">
          {GOOGLE_REVIEWS_META.score}
        </div>

        {/* 3. Subtitle Description */}
        <div className="text-xs sm:text-base text-[#3A4A3E] font-medium leading-snug mb-5 sm:mb-6 max-w-[240px]">
          Reconhecimento e relatos de <strong className="font-bold text-[#0A160F]">pacientes acompanhados</strong>
        </div>

        {/* 4. Luxury Pill Action Button with Warm Glow */}
        <div className="relative w-full flex justify-center">
          {/* Subtle warm backlight glow underneath button */}
          <div className="absolute inset-0 bg-[#F59E0B]/20 rounded-full blur-md -z-0 scale-95 opacity-70 group-hover:opacity-100 transition-opacity" />

          <button
            onClick={handleAvaliarClick}
            type="button"
            className="relative z-10 w-full min-h-[44px] max-w-[250px] py-2.5 px-3.5 sm:px-4 rounded-full bg-white/95 hover:bg-white text-[#0A160F] border border-[#E2D8C7] shadow-[0_4px_14px_rgba(30,20,10,0.06)] hover:shadow-[0_6px_20px_rgba(30,20,10,0.12)] flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer active:scale-[0.98]"
            title="Ver relatos de pacientes"
          >
            {/* Google Colorful G Logo */}
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>

            {/* Label */}
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#0A160F]">
              Ver Relatos Reais
            </span>

            {/* Arrow in Circle */}
            <div className="w-6 h-6 rounded-full bg-[#E8EFE5] group-hover:bg-[#1B4D24] text-[#2C4032] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M4 8a.75.75 0 0 1 .75-.75h5.69L8.22 5.03a.75.75 0 0 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 8z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>

        {/* Micro-hint to see testimonies */}
        {onOpenReviewsModal && (
          <span className="mt-3 text-[11px] font-mono-data text-[#728577] group-hover:text-[#2C6E14] transition-colors underline decoration-dotted">
            Ver relatos de pacientes acompanhados
          </span>
        )}
      </div>
    );
  }

  // 2. Variant: Hero Compact Badge (Perfect for top-fold or sub-CTA)
  if (variant === 'hero-badge') {
    return (
      <div
        onClick={handleCardClick}
        className={`inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#72B818] transition-all cursor-pointer group ${className}`}
      >
        {/* Google G Icon */}
        <div className="w-7 h-7 rounded-xl bg-[#FAFDF8] border border-[#CCD8C4] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Text and stars */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-sm text-[#0A160F]">5,0</span>
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-[#566D5D] font-mono-data">
            Relatos de pacientes acompanhados
          </span>
        </div>

        <div className="w-6 h-6 rounded-full bg-[#EDF4EA] group-hover:bg-[#1B4D24] text-[#2C4032] group-hover:text-white flex items-center justify-center transition-colors ml-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M4 8a.75.75 0 0 1 .75-.75h5.69L8.22 5.03a.75.75 0 0 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }

  // 3. Variant: Compact Pill / Minimal
  return (
    <div
      onClick={handleCardClick}
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#CCD8C4] shadow-2xs hover:shadow-xs transition-all cursor-pointer group ${className}`}
    >
      <div className="flex items-center text-[#F59E0B]">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-bold text-[#0A160F]">5,0</span>
      <span className="text-xs text-[#566D5D]">· Relatos de pacientes</span>
    </div>
  );
};
