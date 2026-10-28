import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, PlusCircle, ShoppingBag, X, MessageCircle, MapPin, Globe, UtensilsCrossed, Info } from 'lucide-react';
import { CARE_OFFERS, CANONICAL_ADDONS, CLIENT_INFO, formatBRL } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { CareOffer, AddonItem, Modality } from '../../types';
import { analytics } from '../../lib/analytics';
import { AddonCard } from './addons/AddonCard';
import { AddonDetailModal } from './addons/AddonDetailModal';

interface PlansSectionProps {
  onSelectPlan: (plan: any) => void;
  onOpenConcierge: (prompt: string) => void;
  onOpenBooking?: (serviceId?: string) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan, onOpenConcierge, onOpenBooking }) => {
  const [activeModality, setActiveModality] = useState<Modality>('online');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [activeModalAddon, setActiveModalAddon] = useState<AddonItem | null>(null);

  const handleSelect = (offer: CareOffer) => {
    const priceFormatted = formatBRL(offer.priceCentsByModality[activeModality]);
    analytics.track('plan_select', 'conversion', {
      planId: offer.id,
      modality: activeModality,
      price: priceFormatted
    });

    if (onOpenBooking) {
      onOpenBooking(offer.id);
    } else {
      onSelectPlan({
        id: offer.id,
        name: offer.name,
        price: priceFormatted,
        category: offer.category,
        period: offer.billingPeriod === 'monthly' ? 'por mês' : 'investimento único',
        description: offer.description,
        features: offer.features,
        ctaLabel: offer.ctaLabel
      });
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      const exists = prev.includes(addonId);
      const updated = exists ? prev.filter((id) => id !== addonId) : [...prev, addonId];
      analytics.track('addon_toggle', 'interaction', { addonId, selected: !exists });
      return updated;
    });
  };

  // Selected Addons calculations
  const selectedAddons = CANONICAL_ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotalPrice = selectedAddons.reduce((acc, curr) => acc + (curr.numericPrice || 0), 0);

  const handleBookBundle = () => {
    analytics.track('addon_bundle_checkout', 'conversion', {
      addons: selectedAddons.map((a) => a.id).join(','),
      totalAddonPrice: addonsTotalPrice
    });
    const itemsList = selectedAddons.map((a) => `• ${a.name} (${a.price})`).join('\n');
    const text = encodeURIComponent(
      `Olá, Dr. Tannuri! Gostaria de agendar / contratar os seguintes Add-ons de Precisão:\n\n${itemsList}\n\nTotal adicional: R$ ${addonsTotalPrice}. Como podemos agendar?`
    );
    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
  };

  return (
    <section id="planos" className="py-20 md:py-28 relative bg-gradient-to-b from-[#EBF4E8] via-[#F2F7F0] to-[#E9F3E6] border-y border-[#CCD8C4]" aria-labelledby="plans-title">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
            <span>ARQUITETURA DE VALOR & TRANSPARÊNCIA</span>
          </div>
          <h2 id="plans-title" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight font-bold">
            Investimento planejado na sua maior fonte de rendimento: sua saúde
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal leading-relaxed">
            Escolha o formato ideal para seu momento — de uma consulta aprofundada a programas completos de mentoria metabólica com acesso direto ao Dr. Luiz Tannuri.
          </p>
        </div>

        {/* Modality Selector Bar (Online vs Presencial) */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-white border border-[#CCD8C4] shadow-sm flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveModality('online');
                analytics.track('modality_switch', 'interaction', { modality: 'online' });
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeModality === 'online'
                  ? 'bg-[#2C6E14] text-white shadow-sm'
                  : 'text-[#566D5D] hover:text-[#0A160F] hover:bg-[#F2F8ED]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Atendimento Online</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeModality === 'online' ? 'bg-white/20 text-white' : 'bg-[#EDF4EA] text-[#2C6E14]'
              }`}>
                Nacional & Global
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveModality('presencial');
                analytics.track('modality_switch', 'interaction', { modality: 'presencial' });
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeModality === 'presencial'
                  ? 'bg-[#2C6E14] text-white shadow-sm'
                  : 'text-[#566D5D] hover:text-[#0A160F] hover:bg-[#F2F8ED]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Presencial em Brasília</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeModality === 'presencial' ? 'bg-white/20 text-white' : 'bg-[#EDF4EA] text-[#2C6E14]'
              }`}>
                InBody 120 Incluso
              </span>
            </button>
          </div>

          <p className="text-xs text-[#566D5D] mt-2.5 text-center">
            {activeModality === 'online' ? (
              <span>Teleconsultas com prontuário digital seguro • Pacientes em todo o Brasil, EUA, Europa e Oriente Médio.</span>
            ) : (
              <span>Consultório em Brasília (DF) • Inclui exame físico de bioimpedância InBody 120 a cada retorno presencial.</span>
            )}
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CARE_OFFERS.map((offer) => {
            const currentPrice = formatBRL(offer.priceCentsByModality[activeModality]);
            const altModality: Modality = activeModality === 'online' ? 'presencial' : 'online';
            const altPrice = formatBRL(offer.priceCentsByModality[altModality]);
            const altLabel = altModality === 'online' ? 'Online' : 'Presencial DF';

            return (
              <div
                key={offer.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  offer.isPopular
                    ? 'bg-gradient-to-br from-white via-[#FAFDF7] to-[#EDF6E8] border-2 border-[#72B818] shadow-[0_16px_48px_rgba(114,184,24,0.18),0_4px_12px_rgba(20,40,25,0.06)] lg:-translate-y-2'
                    : 'bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] shadow-[0_10px_30px_rgba(20,40,25,0.06)] hover:shadow-[0_18px_44px_rgba(20,40,25,0.12)] hover:border-[#72B818]'
                }`}
              >
                {offer.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#EB651A] text-white text-[11px] font-mono-data font-bold uppercase shadow-[0_2px_12px_rgba(235,101,26,0.35)]">
                    Mais Procurado
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-data text-[#C84A07] uppercase tracking-wider font-bold">
                      {offer.category === 'entrada' ? 'Porta de Entrada' : offer.category === 'programa' ? 'Transformação' : offer.category === 'recorrente' ? 'Sustentação' : 'Experiência VIP'}
                    </span>
                    {offer.externalAppLabel && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EDF4EA] text-[#2C6E14] border border-[#CCD8C4]">
                        {offer.externalAppLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0A160F] mb-2">
                    {offer.name}
                  </h3>

                  <p className="text-xs text-[#566D5D] mb-4 min-h-[36px] leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="pb-4 mb-4 border-b border-[#CCD8C4]">
                    <div className="text-2xl sm:text-3xl font-display font-black text-[#0A160F]">
                      {currentPrice}
                      {offer.billingPeriod === 'monthly' && <span className="text-xs font-normal text-[#566D5D]"> / mês</span>}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-[#2C6E14] font-semibold">
                        {activeModality === 'online' ? 'Modalidade Online' : 'Presencial em Brasília'}
                      </span>
                      <span className="text-[11px] text-[#566D5D]">
                        ou {altPrice} ({altLabel})
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-6 text-xs text-[#384C3E]">
                    {offer.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2C6E14] shrink-0 mt-0.5" />
                        <span className="font-normal text-[#0A160F]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    id={`plan-select-btn-${offer.id}`}
                    onClick={() => handleSelect(offer)}
                    className={`w-full min-h-[44px] py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      offer.isPopular
                        ? 'bg-[#EB651A] text-white hover:bg-[#C84A07] shadow-md hover:scale-102 active:scale-98'
                        : 'bg-white text-[#0A160F] border border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#F2F8ED]'
                    }`}
                  >
                    <span>{offer.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {offer.disclaimer && (
                    <p className="text-[10px] text-[#566D5D] text-center mt-2.5 font-medium">
                      {offer.disclaimer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SERVIÇO COMPLEMENTAR: CONSULTORIA DE COZINHA & MEAL PREP (Layout Adaptado para 1 Card) */}
        <div id="add-ons-precisao" className="rounded-3xl bg-gradient-to-br from-white via-[#FAFDF8] to-[#EEF5E9] border border-[#CCD8C4] p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(20,40,25,0.08)]">
          {/* Section Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#CCD8C4]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2C6E14]/10 text-[#2C6E14] text-xs font-mono-data font-bold uppercase tracking-wider mb-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#2C6E14]" />
                <span>Serviço Complementar de Autonomia</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F] tracking-tight">
                Consultoria de Cozinha & Meal Prep Prático
              </h3>
              <p className="text-xs sm:text-sm text-[#566D5D] mt-1.5 leading-relaxed">
                Aprenda a dominar o pré-preparo, congelamento e montagem de marmitas funcionais para a semana inteira em até 2 horas. Disponível de forma avulsa ou como complemento a qualquer plano.
              </p>
            </div>
          </div>

          {/* Masterclass Single Card Feature (Split Horizontal Layout) */}
          {CANONICAL_ADDONS.map((addon) => {
            const visualAsset = addon.imageKey && VISUAL_ASSETS[addon.imageKey] ? VISUAL_ASSETS[addon.imageKey] : null;

            return (
              <div
                key={addon.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white rounded-3xl border border-[#CCD8C4] p-5 sm:p-7 shadow-[0_8px_30px_rgba(20,40,25,0.06)] hover:border-[#72B818] transition-all"
              >
                {/* Coluna Esquerda: Imagem com Badge e Preço */}
                <div 
                  className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto min-h-[260px] rounded-2xl overflow-hidden bg-[#0A160F] group cursor-pointer"
                  onClick={() => setActiveModalAddon(addon)}
                >
                  {visualAsset && (
                    <img
                      src={visualAsset.src}
                      alt={addon.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/95 via-[#0A160F]/30 to-transparent pointer-events-none" />

                  {/* Badges superiores na foto */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono-data font-bold uppercase tracking-wider bg-white/95 text-[#2C6E14] border border-[#CCD8C4] shadow-xs flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-[#2C6E14]" />
                      <span>{addon.category}</span>
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-data font-bold uppercase bg-[#0A160F]/85 text-[#AEE938] border border-white/20 shadow-xs">
                      {addon.badge}
                    </span>
                  </div>

                  {/* Banner de preço e formato na foto */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
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

                {/* Coluna Direita: Informações Detalhadas & Ações */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono-data uppercase tracking-wider text-[#C84A07] font-bold">
                        Sessão Prática Individual com Dr. Luiz Tannuri
                      </span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0A160F] mb-2 leading-snug">
                      {addon.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#566D5D] leading-relaxed mb-4">
                      {addon.description}
                    </p>

                    {/* Caixa de Benefício Clínico & Prático */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F6FAF2] via-[#FAFDF7] to-[#FFF6ED] border border-[#CCD8C4] mb-5 text-xs text-[#2C4032]">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-[#EB651A] shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="text-[#C84A07] font-bold">Benefício Clínico & Prático: </strong>
                          <span>{addon.benefit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Grid de 4 Especificações do Serviço */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-[#384C3E]">
                      {addon.clinicalSpecs?.slice(0, 4).map((spec, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2C6E14] shrink-0 mt-0.5" />
                          <span className="font-medium text-[#0A160F]">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ações Inferiores */}
                  <div className="pt-4 border-t border-[#CCD8C4] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalAddon(addon)}
                        className="font-bold text-[#2C6E14] hover:text-[#0A160F] text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Ver roteiro completo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenConcierge(`Gostaria de saber mais sobre a Consultoria de Cozinha & Meal Prep (${addon.price}). Como ela funciona na prática?`)}
                        className="text-[#566D5D] hover:text-[#2C6E14] text-xs flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#EB651A]" />
                        <span>Dúvidas com Clara IA</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Olá, Dr. Tannuri! Gostaria de agendar a Consultoria de Cozinha & Meal Prep Prático (${addon.price}). Como podemos marcar o horário?`
                        );
                        window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#2C6E14] hover:bg-[#1E4D0E] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Agendar Consultoria de Cozinha ({addon.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Addon Detail Modal */}
      {activeModalAddon && (
        <AddonDetailModal
          addon={activeModalAddon}
          isOpen={Boolean(activeModalAddon)}
          onClose={() => setActiveModalAddon(null)}
          onOpenConcierge={onOpenConcierge}
          onToggleSelect={handleToggleAddon}
          isSelected={selectedAddonIds.includes(activeModalAddon.id)}
          onOpenBooking={onOpenBooking}
        />
      )}

    </section>
  );
};
