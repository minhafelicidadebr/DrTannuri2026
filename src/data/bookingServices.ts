import { BookingServiceItem, TimeSlot } from '../types/booking';
import { COMMERCIAL_OFFERS, COMMERCIAL_ADDONS, formatBRL } from './canonicalOffers';

export const BOOKING_SERVICES: BookingServiceItem[] = [
  // 1. Planos Canônicos Reconciliados (Derivados diretamente de COMMERCIAL_OFFERS)
  ...COMMERCIAL_OFFERS.map((offer) => {
    const isMonthly = offer.billingPeriod === 'month';
    const durationLabel = offer.followUpCount !== null
      ? `${offer.appointmentDurationMinutes} min (+${offer.followUpCount} retornos)`
      : `${offer.appointmentDurationMinutes} min (+retornos quinzenais)`;

    return {
      id: offer.id,
      name: offer.name,
      category: (offer.category === 'entrada' || offer.category === 'recorrente' ? 'plano' : 'protocolo') as any,
      categoryLabel: offer.category === 'entrada'
        ? 'Porta de Entrada'
        : offer.category === 'programa'
        ? 'Programa Completo'
        : offer.category === 'recorrente'
        ? 'Sustentação Mensal'
        : 'Experiência VIP',
      price: `${formatBRL(offer.pricesCents.online)}${isMonthly ? '/mês' : ''} (Online) / ${formatBRL(offer.pricesCents.presencial)}${isMonthly ? '/mês' : ''} (Presencial)`,
      priceCentsByModality: {
        online: offer.pricesCents.online,
        presencial: offer.pricesCents.presencial
      },
      duration: durationLabel,
      description: offer.description,
      highlight: offer.isPopular ? 'Mais Procurado para Recomposição' : undefined,
      modalitiesAllowed: offer.allowedModalities as any
    };
  }),

  // 2. Add-ons de Precisão Canônicos (Derivados diretamente de COMMERCIAL_ADDONS)
  ...COMMERCIAL_ADDONS.map((addon) => {
    const isPresencialOnly = !addon.allowedModalities.includes('online');
    const isOnlineOnly = !addon.allowedModalities.includes('presencial');
    
    let priceString = '';
    if (isPresencialOnly && addon.pricesCents.presencial) {
      priceString = `${formatBRL(addon.pricesCents.presencial)} (Presencial)`;
    } else if (isOnlineOnly && addon.pricesCents.online) {
      priceString = `${formatBRL(addon.pricesCents.online)} (Online)`;
    } else {
      priceString = `${formatBRL(addon.pricesCents.online || addon.pricesCents.presencial || 0)}`;
    }

    const durationDisplay = addon.appointmentDurationMinutes !== null
      ? `${addon.appointmentDurationMinutes} min`
      : 'Uso de 14 dias (Duração da consulta sob alinhamento com recepção)';

    return {
      id: addon.id,
      name: addon.name,
      category: 'addon' as const,
      categoryLabel: addon.categoryLabel,
      price: priceString,
      priceCentsByModality: {
        online: addon.pricesCents.online || addon.pricesCents.presencial || 0,
        presencial: addon.pricesCents.presencial || addon.pricesCents.online || 0
      },
      duration: durationDisplay,
      description: addon.description,
      highlight: addon.badge,
      modalitiesAllowed: addon.allowedModalities as any
    };
  })
];

/**
 * Retorna as faixas de horário preferenciais para solicitação de agendamento.
 * Ramo Sem Integração Validada (Honestidade P0):
 * Não gera slots falsamente "ocupados" ou "livres" nem simula sincronia com agenda médica externa.
 * Todas as faixas representam preferências pretendidas pelo paciente para confirmação pela recepção de Brasília (DF).
 */
export function generateTimeSlotsForDate(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
  if (dayOfWeek === 0) {
    return []; // Domingo sem expediente regular
  }

  // Sábado (Expediente matutino preferencial)
  if (dayOfWeek === 6) {
    return [
      { id: 'sab-1', time: '08:30 - 09:30', period: 'manha', label: '08:30 - Manhã', available: true, isFastingRecommended: true },
      { id: 'sab-2', time: '09:45 - 10:45', period: 'manha', label: '09:45 - Manhã', available: true, isFastingRecommended: true },
      { id: 'sab-3', time: '11:00 - 12:00', period: 'manha', label: '11:00 - Manhã', available: true, isFastingRecommended: false },
      { id: 'sab-4', time: '12:15 - 13:15', period: 'tarde', label: '12:15 - Início da Tarde', available: true, isFastingRecommended: false }
    ];
  }

  // Segunda a Sexta (Turnos regulares de preferência clínica)
  return [
    // Turno Manhã (Preparo para jejum e bioimpedância presencial)
    { id: 'm1', time: '08:00 - 09:00', period: 'manha', label: '08:00 - Jejum Ideal', available: true, isFastingRecommended: true },
    { id: 'm2', time: '09:15 - 10:15', period: 'manha', label: '09:15 - Jejum Ideal', available: true, isFastingRecommended: true },
    { id: 'm3', time: '10:30 - 11:30', period: 'manha', label: '10:30 - Manhã', available: true, isFastingRecommended: true },
    { id: 'm4', time: '11:45 - 12:45', period: 'manha', label: '11:45 - Final da Manhã', available: true, isFastingRecommended: false },

    // Turno Tarde
    { id: 't1', time: '14:00 - 15:00', period: 'tarde', label: '14:00 - Tarde', available: true, isFastingRecommended: false },
    { id: 't2', time: '15:15 - 16:15', period: 'tarde', label: '15:15 - Tarde', available: true, isFastingRecommended: false },
    { id: 't3', time: '16:30 - 17:30', period: 'tarde', label: '16:30 - Tarde', available: true, isFastingRecommended: false },

    // Turno Executivo / Noturno
    { id: 'n1', time: '17:45 - 18:45', period: 'noite', label: '17:45 - Executivo', available: true, isFastingRecommended: false },
    { id: 'n2', time: '19:00 - 20:00', period: 'noite', label: '19:00 - Noite', available: true, isFastingRecommended: false }
  ];
}
