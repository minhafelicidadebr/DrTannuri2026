import React, { useState } from 'react';
import { Building2, Video, Check, Sparkles, ArrowRight, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { BookingModality, BookingServiceItem } from '../../../types/booking';
import { BOOKING_SERVICES } from '../../../data/bookingServices';
import { CLIENT_INFO, formatBRL } from '../../../data/canonicalCatalog';

interface BookingStepModalityServiceProps {
  selectedModality: BookingModality;
  onSelectModality: (modality: BookingModality) => void;
  selectedService: BookingServiceItem | null;
  onSelectService: (service: BookingServiceItem) => void;
  onNext: () => void;
}

export const BookingStepModalityService: React.FC<BookingStepModalityServiceProps> = ({
  selectedModality,
  onSelectModality,
  selectedService,
  onSelectService,
  onNext
}) => {
  const [filterCategory, setFilterCategory] = useState<'todos' | 'protocolo' | 'plano' | 'addon'>('todos');

  // Filter services compatible with current modality and category
  const filteredServices = BOOKING_SERVICES.filter((service) => {
    const matchesCategory = filterCategory === 'todos' || service.category === filterCategory;
    const matchesModality = service.modalitiesAllowed.includes(selectedModality);
    return matchesCategory && matchesModality;
  });

  const handleModalityChange = (modality: BookingModality) => {
    onSelectModality(modality);
    // If selected service isn't allowed in new modality, auto-adjust to a valid one
    if (selectedService && !selectedService.modalitiesAllowed.includes(modality)) {
      const fallback = BOOKING_SERVICES.find((s) => s.modalitiesAllowed.includes(modality));
      if (fallback) onSelectService(fallback);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Modality Selector: Presencial vs Online */}
      <div>
        <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-2.5">
          1. Escolha a Modalidade de Atendimento
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Option A: Presencial */}
          <button
            type="button"
            id="modality-presencial-btn"
            onClick={() => handleModalityChange('presencial')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 relative ${
              selectedModality === 'presencial'
                ? 'bg-white border-[#1B4D24] ring-2 ring-[#1B4D24]/15 shadow-sm'
                : 'bg-white/60 border-[#CCD8C4] hover:bg-white hover:border-[#1B4D24]/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              selectedModality === 'presencial' ? 'bg-[#1B4D24] text-[#AEE938]' : 'bg-[#EAF3E7] text-[#1B4D24]'
            }`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0A160F]">Presencial ({CLIENT_INFO.cityRegion})</span>
                {selectedModality === 'presencial' && (
                  <span className="w-5 h-5 rounded-full bg-[#1B4D24] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-[#566D5D] mt-1 leading-snug">
                Consultório com Bioimpedância InBody 120 e avaliação física completa.
              </p>
            </div>
          </button>

          {/* Option B: Online HD */}
          <button
            type="button"
            id="modality-online-btn"
            onClick={() => handleModalityChange('online')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 relative ${
              selectedModality === 'online'
                ? 'bg-white border-[#1B4D24] ring-2 ring-[#1B4D24]/15 shadow-sm'
                : 'bg-white/60 border-[#CCD8C4] hover:bg-white hover:border-[#1B4D24]/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              selectedModality === 'online' ? 'bg-[#1B4D24] text-[#AEE938]' : 'bg-[#EAF3E7] text-[#1B4D24]'
            }`}>
              <Video className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0A160F]">Telemedicina Online HD</span>
                {selectedModality === 'online' && (
                  <span className="w-5 h-5 rounded-full bg-[#1B4D24] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-[#566D5D] mt-1 leading-snug">
                Videoconferência criptografada, prontuário digital e atendimento para qualquer cidade/país.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Service Category Tabs */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24]">
            2. Selecione o Programa ou Consulta
          </label>
          <span className="text-[11px] text-[#566D5D] font-mono-data">
            {filteredServices.length} {filteredServices.length === 1 ? 'opção disponível' : 'opções disponíveis'}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'todos', label: 'Todos os Serviços' },
            { id: 'plano', label: 'Consultas & Diagnóstico' },
            { id: 'protocolo', label: 'Programas de Transformação' },
            { id: 'addon', label: 'Add-ons de Precisão' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer text-xs ${
                filterCategory === cat.id
                  ? 'bg-[#1B4D24] text-white shadow-2xs font-bold'
                  : 'bg-white/80 border border-[#CCD8C4] text-[#384C3E] hover:bg-white hover:border-[#1B4D24]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Services Grid */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {filteredServices.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onSelectService(service)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-gradient-to-r from-white to-[#F4F9F1] border-[#1B4D24] ring-2 ring-[#1B4D24]/15 shadow-sm'
                  : 'bg-white/80 border-[#CCD8C4] hover:bg-white hover:border-[#1B4D24]/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono-data font-bold uppercase px-2 py-0.5 rounded-md bg-[#1B4D24]/10 text-[#1B4D24]">
                    {service.categoryLabel}
                  </span>
                  {service.highlight && (
                    <span className="text-[11px] font-mono-data font-semibold px-2 py-0.5 rounded-md bg-[#EB651A]/10 text-[#C84A07] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{service.highlight}</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#0A160F]">
                  {service.name}
                </h4>

                <p className="text-xs text-[#566D5D] leading-relaxed max-w-xl">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] text-[#384C3E] font-mono-data">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1B4D24]" />
                    <span>{service.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{selectedModality === 'presencial' ? 'Consultório Físico' : 'Telemedicina HD'}</span>
                </div>
              </div>

              {/* Price & Selection Indicator */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#CCD8C4]/60">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono-data text-[#566D5D] block">Valor ({selectedModality})</span>
                  <div className="text-base sm:text-lg font-mono-data font-black text-[#0A160F]">
                    {service.priceCentsByModality?.[selectedModality]
                      ? `${formatBRL(service.priceCentsByModality[selectedModality])}${service.id === 'recorrente_mensal' ? '/mês' : ''}`
                      : service.price}
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'bg-[#1B4D24] text-[#AEE938]' : 'bg-[#EDF4EA] text-[#A2B3A6]'
                }`}>
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step CTA */}
      <div className="pt-4 border-t border-[#CCD8C4] flex items-center justify-between">
        <div className="text-xs text-[#566D5D]">
          {selectedService ? (
            <span>Serviço selecionado: <strong className="text-[#0A160F]">{selectedService.name}</strong></span>
          ) : (
            <span>Selecione um serviço para prosseguir</span>
          )}
        </div>

        <button
          type="button"
          id="booking-step1-next-btn"
          disabled={!selectedService}
          onClick={onNext}
          className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#1B4D24] hover:bg-[#245D2E] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <span>Escolher Data e Horário</span>
          <ArrowRight className="w-4 h-4 text-[#AEE938]" />
        </button>
      </div>
    </div>
  );
};
