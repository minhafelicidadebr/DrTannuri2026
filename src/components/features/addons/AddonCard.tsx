import React from 'react';
import { Sparkles, ArrowRight, Scale, Radio, UtensilsCrossed, Clock, Check, Plus, Info, ShieldCheck } from 'lucide-react';
import { AddonItem } from '../../../types';
import { VISUAL_ASSETS } from '../../../data/imageAssets';

interface AddonCardProps {
  addon: AddonItem;
  isSelected: boolean;
  onToggleSelect: (addonId: string) => void;
  onOpenDetails: (addon: AddonItem) => void;
  onOpenConcierge: (prompt: string) => void;
}

export const AddonCard: React.FC<AddonCardProps> = ({
  addon,
  isSelected,
  onToggleSelect,
  onOpenDetails,
  onOpenConcierge
}) => {
  const visualAsset = addon.imageKey && VISUAL_ASSETS[addon.imageKey] ? VISUAL_ASSETS[addon.imageKey] : null;

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'diagnóstico':
        return <Scale className="w-3.5 h-3.5 text-[#1B4D24]" />;
      case 'biotecnologia':
        return <Radio className="w-3.5 h-3.5 text-[#1B4D24]" />;
      case 'rotina':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-[#1B4D24]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#1B4D24]" />;
    }
  };

  return (
    <div 
      className={`group rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(20,40,25,0.06)] hover:shadow-[0_20px_45px_rgba(20,40,25,0.12)] ${
        isSelected
          ? 'border-2 border-[#1B4D24] ring-2 ring-[#1B4D24]/10 -translate-y-1'
          : 'border-[#CCD8C4] hover:border-[#1B4D24]'
      }`}
    >
      {/* 1. Cinematic Hollywood Studio Media Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#101F14] cursor-pointer" onClick={() => onOpenDetails(addon)}>
        {visualAsset ? (
          <img
            src={visualAsset.src}
            alt={visualAsset.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#E2ECE0] flex items-center justify-center text-[#566D5D]">
            <Sparkles className="w-8 h-8 opacity-40" />
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/90 via-[#0A160F]/30 to-transparent pointer-events-none" />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <div className="px-3 py-1 rounded-full text-xs font-mono-data font-bold uppercase tracking-wider bg-white/95 text-[#1B4D24] border border-[#CCD8C4] backdrop-blur-md shadow-xs flex items-center gap-1.5">
            {getCategoryIcon(addon.category)}
            <span>{addon.category}</span>
          </div>
        </div>

        {/* Floating Badge / Format Pill */}
        {addon.badge && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-data font-semibold bg-[#0A160F]/80 text-[#AEE938] border border-white/20 backdrop-blur-md shadow-xs">
              {addon.badge}
            </span>
          </div>
        )}

        {/* Bottom Banner on Image: Price & Duration Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
          <div>
            <span className="text-[11px] font-mono-data uppercase text-white/75 block">Investimento</span>
            <div className="text-2xl font-black font-mono-data text-white drop-shadow-sm leading-none">
              {addon.price}
            </div>
          </div>
          {addon.durationOrFormat && (
            <span className="text-[11px] font-mono-data text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/25">
              {addon.durationOrFormat}
            </span>
          )}
        </div>
      </div>

      {/* 2. Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h4 
            onClick={() => onOpenDetails(addon)}
            className="font-display text-base sm:text-lg font-bold text-[#0A160F] mb-2 cursor-pointer hover:text-[#1B4D24] transition-colors leading-snug"
          >
            {addon.name}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#566D5D] leading-relaxed mb-4 min-h-[48px]">
            {addon.description}
          </p>

          {/* Clinical Benefit Container */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F6FAF2] via-[#FAFDF7] to-[#FFF6ED] border border-[#CCD8C4] mb-4 text-xs text-[#2C4032]">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C84A07] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#C84A07] font-bold">Benefício Clínico: </strong>
                <span>{addon.benefit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Card Footer Actions */}
        <div className="pt-3 border-t border-[#CCD8C4]/80 space-y-3">
          {/* Quick Links Row: Deep Dive & Clara Inquiry */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              id={`addon-details-btn-${addon.id}`}
              onClick={() => onOpenDetails(addon)}
              className="font-bold text-[#1B4D24] hover:text-[#0A160F] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Ver laudo & preparo</span>
            </button>

            <button
              id={`addon-concierge-btn-${addon.id}`}
              onClick={() => onOpenConcierge(`Gostaria de entender se o add-on "${addon.name}" (${addon.price}) é recomendado para o meu objetivo atual.`)}
              className="text-[#566D5D] hover:text-[#1B4D24] flex items-center gap-1.5 cursor-pointer font-medium transition-colors"
              title="Tirar dúvidas com a Clara"
            >
              <img 
                src={VISUAL_ASSETS.conciergeAvatar.src}
                alt="Clara"
                className="w-4 h-4 rounded-full object-cover border border-[#CCD8C4]"
              />
              <span className="hidden sm:inline">Dúvidas?</span>
            </button>
          </div>

          {/* Action Button: Include in Custom Bundle Toggle */}
          <button
            id={`addon-toggle-btn-${addon.id}`}
            onClick={() => onToggleSelect(addon.id)}
            className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-[#1B4D24] text-white shadow-xs'
                : 'bg-white border border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:bg-[#F4F9F0]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-[#AEE938]" />
                <span>Incluído no Seu Pacote</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#1B4D24]" />
                <span>Adicionar à Simulação</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
