import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Star, ThumbsUp, ShieldCheck, Heart } from 'lucide-react';
import { CANONICAL_GOOGLE_REVIEWS, GOOGLE_REVIEWS_META, GoogleReviewItem } from '../../data/googleReviewsData';
import { analytics } from '../../lib/analytics';

interface GoogleReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const GoogleReviewsModal: React.FC<GoogleReviewsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['Todos', 'Metabolismo', 'Intestino', 'Performance', 'Atendimento'];

  const activeReviews = CANONICAL_GOOGLE_REVIEWS.filter(r => r.isActive !== false);
  const filteredReviews = selectedFilter === 'Todos'
    ? activeReviews
    : activeReviews.filter(r => r.category === selectedFilter);

  const handleOpenGoogle = () => {
    analytics.track('google_reviews_external_click', 'conversion');
    if (GOOGLE_REVIEWS_META.googlePlaceUrl) {
      window.open(GOOGLE_REVIEWS_META.googlePlaceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-modal-title"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-[#FAFDF8] via-white to-[#F2F7EE] rounded-3xl border border-[#CCD8C4] shadow-[0_25px_60px_rgba(20,40,25,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-[#CCD8C4] bg-white/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google Official G Logo */}
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="reviews-modal-title" className="text-base sm:text-lg font-bold text-[#0A160F]">
                  Relatos e Experiências de Pacientes
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold bg-[#EBF5E5] text-[#2C6E14] border border-[#CCD8C4]">
                  <CheckCircle2 className="w-3 h-3 text-[#2C6E14]" />
                  Depoimentos Atribuídos
                </span>
              </div>
              <p className="text-xs text-[#566D5D]">
                Dr. Luiz Tannuri • Nutrição de Precisão & Acompanhamento Contínuo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#F5F9F2] hover:bg-[#E2ECE0] text-[#566D5D] hover:text-[#0A160F] flex items-center justify-center transition-colors cursor-pointer border border-[#CCD8C4]"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          
          {/* Summary Score Hero Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-white via-[#F8FCF5] to-[#EEF7E8] border border-[#CCD8C4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#0A160F] tracking-tight">
                {GOOGLE_REVIEWS_META.score}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
                <div className="text-xs text-[#384C3E] font-medium">
                  {GOOGLE_REVIEWS_META.label}
                </div>
                <div className="text-[11px] font-mono-data text-[#566D5D]">
                  {GOOGLE_REVIEWS_META.patientsServed}
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenGoogle}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-[#CCD8C4] hover:border-[#4285F4] text-xs font-bold text-[#0A160F] hover:text-[#4285F4] shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Avaliar no Google</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#4285F4]" />
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#1B4D24] text-white shadow-xs'
                    : 'bg-white border border-[#CCD8C4] text-[#566D5D] hover:bg-[#F2F7EE] hover:text-[#0A160F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Testimonials List */}
          <div className="space-y-3.5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs hover:border-[#72B818] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}
                    >
                      {rev.avatarText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0A160F]">{rev.author}</span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#2C6E14] font-mono-data font-bold">
                          <CheckCircle2 className="w-3 h-3 text-[#2C6E14]" />
                          Verificado
                        </span>
                      </div>
                      <span className="text-[11px] text-[#566D5D] font-mono-data">{rev.date} • {rev.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {rev.highlightPhrase && (
                  <div className="text-xs font-bold text-[#2C6E14] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-[#EB651A] fill-current" />
                    <span>&ldquo;{rev.highlightPhrase}&rdquo;</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>

          {/* Ethical Notice */}
          <div className="p-3.5 rounded-xl bg-[#F4FAEE] border border-[#CCD8C4] flex items-center gap-2.5 text-xs text-[#566D5D]">
            <ShieldCheck className="w-4 h-4 text-[#2C6E14] shrink-0" />
            <span>
              Avaliações reais e espontâneas registradas na ficha oficial do Google Meu Negócio da Dra. Tanutri. Conformidade com o código de ética do CFN/CRN.
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#CCD8C4] bg-[#FAFDF8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[#566D5D] hover:text-[#0A160F] transition-colors cursor-pointer"
          >
            Voltar ao site
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleOpenGoogle}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#CCD8C4] text-xs font-bold text-[#0A160F] hover:bg-[#F2F7EE] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ver no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#566D5D]" />
            </button>

            {onOpenBooking && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1B4D24] hover:bg-[#245D2E] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                Agendar Consulta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
