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
  onOpenBooking?: (serviceId?: string) => void;
}

export const AddonCard: React.FC<AddonCardProps> = ({
  addon,
  isSelected,
  onToggleSelect,
  onOpenDetails,
  onOpenConcierge,
  onOpenBooking
}) => {
  const visualAsset = addon.imageKey && VISUAL_ASSETS[addon.imageKey] ? VISUAL_ASSETS[addon.imageKey] : null;

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'diagnóstico':
        return <Scale className="w-3.5 h-3.5 text-[#2C6E14]" />;
      case 'biotecnologia':
        return <Radio className="w-3.5 h-3.5 text-[#2C6E14]" />;
      case 'rotina':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-[#2C6E14]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#2C6E14]" />;
    }
  };

  return (
    <div 
      className={`group rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'border-2 border-[#2C6E14] ring-4 ring-[#2C6E14]/15 shadow-[0_16px_40px_rgba(44,110,20,0.18)] -translate-y-1'
          : 'border-[#CCD8C4] hover:border-[#72B818] shadow-[0_8px_30px_rgba(20,40,25,0.06)] hover:shadow-[0_16px_40px_rgba(20,40,25,0.12)]'
      }`}
    >
      {/* 1. Cinematic Media Header */}
      <div 
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A160F] cursor-pointer" 
        onClick={() => onOpenDetails(addon)}
      >
        {visualAsset ? (
          <img
            src={visualAsset.src}
            alt={addon.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#E2ECE0] flex items-center justify-center text-[#566D5D]">
            <Sparkles className="w-8 h-8 opacity-40" />
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/95 via-[#0A160F]/40 to-transparent pointer-events-none" />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <div className="px-3 py-1 rounded-full text-[11px] font-mono-data font-bold uppercase tracking-wider bg-white/95 text-[#2C6E14] border border-[#CCD8C4] backdrop-blur-md shadow-xs flex items-center gap-1.5">
            {getCategoryIcon(addon.category)}
            <span>{addon.category}</span>
          </div>
        </div>

        {/* Floating Badge / Format Pill */}
        {addon.badge && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-data font-bold uppercase bg-[#0A160F]/85 text-[#AEE938] border border-white/20 backdrop-blur-md shadow-xs">
              {addon.badge}
            </span>
          </div>
        )}

        {/* Bottom Banner on Image: Price & Duration Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
          <div>
            <span className="text-[10px] font-mono-data uppercase text-white/75 block font-bold tracking-wider">Investimento</span>
            <div className="text-2xl sm:text-3xl font-black font-display text-white drop-shadow-sm leading-none mt-0.5">
              {addon.price}
            </div>
          </div>
          {addon.durationOrFormat && (
            <span className="text-[11px] font-mono-data text-white font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/25">
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
            className="font-display text-base sm:text-lg font-bold text-[#0A160F] mb-2 cursor-pointer hover:text-[#2C6E14] transition-colors leading-snug"
          >
            {addon.name}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#566D5D] leading-relaxed mb-4 min-h-[44px]">
            {addon.description}
          </p>

          {/* Clinical Benefit Container */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F6FAF2] via-[#FAFDF7] to-[#FFF6ED] border border-[#CCD8C4] mb-4 text-xs text-[#2C4032]">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EB651A] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#C84A07] font-bold">Benefício Clínico: </strong>
                <span>{addon.benefit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Card Footer Actions */}
        <div className="pt-3.5 border-t border-[#CCD8C4] space-y-3">
          {/* Quick Links Row: Deep Dive & Clara Inquiry */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              id={`addon-details-btn-${addon.id}`}
              type="button"
              onClick={() => onOpenDetails(addon)}
              className="font-bold text-[#2C6E14] hover:text-[#0A160F] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Ver laudo & preparo</span>
            </button>

            <button
              id={`addon-concierge-btn-${addon.id}`}
              type="button"
              onClick={() => onOpenConcierge(`Gostaria de tirar dúvidas com a Clara sobre o serviço "${addon.name}" (${addon.price}). Ele é recomendado para o meu objetivo?`)}
              className="text-[#566D5D] hover:text-[#2C6E14] flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
              title="Tirar dúvidas com a Clara IA"
            >
              <img 
                src={VISUAL_ASSETS.conciergeAvatar.src}
                alt="Clara"
                className="w-4 h-4 rounded-full object-cover border border-[#CCD8C4]"
              />
              <span>Dúvidas?</span>
            </button>
          </div>

          {/* Action Button: Include in Custom Bundle Toggle */}
          <button
            id={`addon-toggle-btn-${addon.id}`}
            type="button"
            onClick={() => onToggleSelect(addon.id)}
            className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-[#2C6E14] text-white shadow-xs hover:bg-[#1F4A0C]'
                : 'bg-white border border-[#CCD8C4] text-[#0A160F] hover:border-[#72B818] hover:bg-[#F4F9F0]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-[#AEE938]" />
                <span>✓ Adicionado à Simulação</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#2C6E14]" />
                <span>Adicionar à Simulação</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
