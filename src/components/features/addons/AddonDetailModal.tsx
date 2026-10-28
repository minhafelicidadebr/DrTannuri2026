import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Clock, Calendar, Sparkles, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { AddonItem } from '../../../types';
import { VISUAL_ASSETS } from '../../../data/imageAssets';
import { CLIENT_INFO } from '../../../data/canonicalCatalog';
import { analytics } from '../../../lib/analytics';

interface AddonDetailModalProps {
  addon: AddonItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConcierge: (prompt: string) => void;
  onToggleSelect?: (addonId: string) => void;
  isSelected?: boolean;
  onOpenBooking?: (serviceId?: string) => void;
}

export const AddonDetailModal: React.FC<AddonDetailModalProps> = ({
  addon,
  isOpen,
  onClose,
  onOpenConcierge,
  onToggleSelect,
  isSelected = false,
  onOpenBooking
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !addon) return null;

  const visualAsset = addon.imageKey && VISUAL_ASSETS[addon.imageKey] ? VISUAL_ASSETS[addon.imageKey] : null;

  const handleWhatsAppInquiry = () => {
    analytics.track('addon_whatsapp_inquiry', 'conversion', { addonId: addon.id, price: addon.price });
    const text = encodeURIComponent(
      `Olá, Dr. Tanutri! Gostaria de agendar / tirar dúvidas sobre o serviço complementar "${addon.name}" (${addon.price}). Como funciona a disponibilidade?`
    );
    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
  };

  const handleConciergeClick = () => {
    analytics.track('addon_modal_concierge_open', 'interaction', { addonId: addon.id });
    onClose();
    onOpenConcierge(
      `Gostaria de uma orientação clínica sobre o serviço "${addon.name}" (${addon.category}, ${addon.price}). Ele é recomendado para o meu perfil e como se integra ao acompanhamento?`
    );
  };

  const handleScheduleClick = () => {
    if (!addon) return;
    if (onOpenBooking) {
      analytics.track('addon_modal_book_online', 'conversion', { addonId: addon.id });
      onClose();
      onOpenBooking(addon.id);
    } else {
      handleWhatsAppInquiry();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-[#0A160F]/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="addon-modal-title"
    >
      <div 
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(10,22,15,0.35)] border border-[#CCD8C4] overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Hollywood Studio Image */}
        <div className="relative aspect-[16/9] w-full bg-[#101F14] shrink-0 overflow-hidden">
          {visualAsset && (
            <img
              src={visualAsset.src}
              alt={visualAsset.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          )}

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F] via-[#0A160F]/40 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono-data font-bold uppercase tracking-wider bg-[#1B4D24]/90 text-[#AEE938] border border-[#AEE938]/30 backdrop-blur-md shadow-sm">
              {addon.category}
            </span>
            {addon.badge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-data font-semibold bg-white/90 text-[#0A160F] border border-white/40 backdrop-blur-md shadow-sm">
                {addon.badge}
              </span>
            )}
          </div>

          {/* Close Button */}
          <button
            id="addon-modal-close-btn"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="addon-modal-title" className="font-display text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                {addon.name}
              </h3>
              <div className="font-mono-data text-xl sm:text-2xl font-extrabold text-[#AEE938] shrink-0">
                {addon.price}
              </div>
            </div>
            {addon.durationOrFormat && (
              <p className="text-xs text-white/80 font-mono-data mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#AEE938]" />
                <span>{addon.durationOrFormat}</span>
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-mono-data uppercase tracking-wider text-[#1B4D24] font-bold mb-1.5">
              Sobre este Serviço
            </h4>
            <p className="text-sm sm:text-base text-[#2C4032] leading-relaxed">
              {addon.description}
            </p>
          </div>

          {/* Primary Benefit Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAFDF7] via-[#F4F9F0] to-[#FFF5ED] border border-[#CCD8C4] flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#EB651A]/10 text-[#C84A07] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono-data text-[#C84A07] uppercase tracking-wide block">
                Impacto no Seu Tratamento
              </span>
              <p className="text-xs sm:text-sm text-[#0A160F] font-medium mt-0.5 leading-relaxed">
                {addon.benefit}
              </p>
            </div>
          </div>

          {/* Who is it for */}
          {addon.suitableFor && (
            <div>
              <h4 className="text-xs font-mono-data uppercase tracking-wider text-[#566D5D] font-bold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1B4D24]" />
                <span>Indicações Principais</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed bg-[#F7FAF4] p-3.5 rounded-xl border border-[#DCE6D6]">
                {addon.suitableFor}
              </p>
            </div>
          )}

          {/* Clinical Specifications & Deliverables */}
          {addon.clinicalSpecs && addon.clinicalSpecs.length > 0 && (
            <div>
              <h4 className="text-xs font-mono-data uppercase tracking-wider text-[#1B4D24] font-bold mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1B4D24]" />
                <span>O que está incluído no laudo & serviço</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addon.clinicalSpecs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#2C4032] bg-white p-2.5 rounded-xl border border-[#CCD8C4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D24] mt-1.5 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preparation & Protocol Instructions */}
          {addon.preparationTips && addon.preparationTips.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#ECD9B8]">
              <h4 className="text-xs font-mono-data uppercase tracking-wider text-[#8A5A12] font-bold mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#8A5A12]" />
                <span>Instruções & Preparo Clínico</span>
              </h4>
              <ul className="space-y-1.5">
                {addon.preparationTips.map((tip, i) => (
                  <li key={i} className="text-xs text-[#5C4518] flex items-start gap-2">
                    <span className="text-[#8A5A12] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F9FCF7] border-t border-[#CCD8C4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            id="addon-modal-concierge-btn"
            onClick={handleConciergeClick}
            className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#CCD8C4] bg-white hover:border-[#1B4D24] text-xs font-bold text-[#1B4D24] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <img 
              src={VISUAL_ASSETS.conciergeAvatar.src}
              alt="Clara"
              className="w-5 h-5 rounded-full object-cover border border-[#CCD8C4]"
            />
            <span>Tirar dúvidas com a Clara</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onToggleSelect && (
              <button
                id="addon-modal-toggle-select-btn"
                onClick={() => onToggleSelect(addon.id)}
                className={`min-h-[44px] flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#EBF5E5] text-[#1B4D24] border-[#1B4D24]'
                    : 'bg-white text-[#2C4032] border-[#CCD8C4] hover:border-[#1B4D24]'
                }`}
              >
                {isSelected ? '✓ Incluído no Pacote' : '+ Incluir no Pacote'}
              </button>
            )}

            <button
              id="addon-modal-schedule-btn"
              onClick={handleScheduleClick}
              className="min-h-[44px] flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1B4D24] to-[#245D2E] hover:opacity-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Agendar Add-on</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#AEE938]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
