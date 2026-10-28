/**
 * Fonte Única da Verdade Compartilhada para Ofertas Comerciais e Configurações Clínicas
 * Módulo puro em TypeScript (zero dependência de DOM ou React).
 * Importável tanto pelo frontend (React/Vite) quanto pelo backend (server.ts).
 */

export type Modality = 'online' | 'presencial';
export type BillingPeriod = 'one_time' | 'month';

export interface CommercialOffer {
  id: string;
  name: string;
  category: 'entrada' | 'programa' | 'recorrente' | 'premium';
  allowedModalities: Modality[];
  pricesCents: Record<Modality, number>;
  billingPeriod: BillingPeriod;
  appointmentDurationMinutes: number;
  followUpCount: number | null;
  followUpCadenceDays: number | null;
  bioimpedancePresencialIncluded: boolean;
  externalAppLabel: string | null;
  description: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
}

export interface CommercialAddon {
  id: string;
  name: string;
  categoryLabel: string;
  allowedModalities: Modality[];
  pricesCents: Partial<Record<Modality, number>>;
  appointmentDurationMinutes: number | null;
  deviceWearDurationDays?: number | null;
  badge: string;
  description: string;
  benefit: string;
}

/**
 * 4 Ofertas Canônicas Auditadas (PDF Páginas 9 e 10)
 * diagnostico_inicial: R$ 450 online / R$ 750 presencial (60 min + 1 retorno em 15 dias)
 * programa_metabolico: R$ 1.199 online / R$ 1.999 presencial (60 min + 3 retornos + App Webidiet)
 * plano_assinatura: R$ 259/mês online / R$ 429/mês presencial (60 min + retornos quinzenais)
 * programa_longevidade_vip: R$ 1.999 online / R$ 3.199 presencial (60 min + 6 retornos + estratégias de viagem)
 */
export const COMMERCIAL_OFFERS: CommercialOffer[] = [
  {
    id: 'diagnostico_inicial',
    name: 'Diagnóstico Inicial de Precisão',
    category: 'entrada',
    allowedModalities: ['online', 'presencial'],
    pricesCents: {
      online: 45000,
      presencial: 75000
    },
    billingPeriod: 'one_time',
    appointmentDurationMinutes: 60,
    followUpCount: 1,
    followUpCadenceDays: 15,
    bioimpedancePresencialIncluded: false, // InBody não incluso gratuitamente no plano de entrada
    externalAppLabel: null,
    description: 'A porta de entrada ideal: análise minuciosa do seu histórico, sinais clínicos, rotina e elaboração do plano inicial.',
    features: [
      'Consulta individual completa de 60 minutos',
      '1 retorno incluso em até 15 dias',
      'Mapeamento metabólico e hábitos de rotina',
      'Definição das prioridades nutricionais imediatas',
      'Entrega do Plano de Ação individualizado em até 48h',
      'Presencial em Brasília (DF) ou Teleconsulta Online HD'
    ],
    ctaLabel: 'Solicitar Diagnóstico Inicial'
  },
  {
    id: 'programa_metabolico',
    name: 'Programa Metabolismo 12 Semanas',
    category: 'programa',
    allowedModalities: ['online', 'presencial'],
    pricesCents: {
      online: 119900,
      presencial: 199900
    },
    billingPeriod: 'one_time',
    appointmentDurationMinutes: 60,
    followUpCount: 3,
    followUpCadenceDays: 15,
    bioimpedancePresencialIncluded: true,
    externalAppLabel: 'App Webidiet',
    description: 'O formato mais procurado para recomposição corporal, emagrecimento sustentável e consolidação de hábitos.',
    features: [
      'Consulta inicial completa de 60 minutos',
      '3 retornos quinzenais de acompanhamento e ajuste fino',
      'Bioimpedância presencial quinzenal InBody 120 (modalidade presencial)',
      'Acesso ao App Webidiet para registro alimentar e rotina',
      'Canal de suporte para dúvidas durante o protocolo',
      'Análise aprofundada de exames laboratoriais prévios'
    ],
    ctaLabel: 'Solicitar Vaga no Programa',
    isPopular: true
  },
  {
    id: 'plano_assinatura',
    name: 'Assinatura Acompanhamento Contínuo',
    category: 'recorrente',
    allowedModalities: ['online', 'presencial'],
    pricesCents: {
      online: 25900,
      presencial: 42900
    },
    billingPeriod: 'month',
    appointmentDurationMinutes: 60,
    followUpCount: null, // Quantidade contínua não especificada rigidamente
    followUpCadenceDays: 15,
    bioimpedancePresencialIncluded: true,
    externalAppLabel: null,
    description: 'A certeza de manter o ritmo após a fase inicial ou para quem prefere evolução constante e sem pressão.',
    features: [
      'Consulta clínica inicial e de alinhamento (60 min)',
      'Retornos quinzenais de ajuste',
      'Bioimpedância presencial quinzenal InBody 120 (modalidade presencial)',
      'Apoio contínuo para viagens, eventos e períodos atípicos',
      'Assinatura mensal sem fidelidade ou carência contratual'
    ],
    ctaLabel: 'Solicitar Assinatura Contínua'
  },
  {
    id: 'programa_longevidade_vip',
    name: 'Programa 6 Meses: Performance & Longevidade',
    category: 'premium',
    allowedModalities: ['online', 'presencial'],
    pricesCents: {
      online: 199900,
      presencial: 319900
    },
    billingPeriod: 'one_time',
    appointmentDurationMinutes: 60,
    followUpCount: 6,
    followUpCadenceDays: 15,
    bioimpedancePresencialIncluded: true,
    externalAppLabel: 'App Webidiet',
    description: 'Programa completo de 6 meses (24 semanas) com 6 consultas aprofundadas e 6 retornos de ajuste fino para máxima performance e longevidade.',
    features: [
      'Programa completo de 6 meses (24 semanas)',
      '6 consultas clínicas aprofundadas individuais de 60 minutos',
      '6 retornos dedicados à alta performance e evolução',
      'Bioimpedância presencial quinzenal InBody 120 (modalidade presencial)',
      'Estratégias alimentares para viagens de negócios e compromissos',
      'Análise minuciosa de biomarcadores celulares e exames',
      'Atendimento prioritário com suporte contínuo'
    ],
    ctaLabel: 'Quero o Programa de 6 Meses'
  }
];

/**
 * 3 Adicionais de Precisão (Soma aritmética R$ 869)
 */
export const COMMERCIAL_ADDONS: CommercialAddon[] = [
  {
    id: 'bioimpedancia_inbody',
    name: 'Exame de Bioimpedância Segmentada InBody 120',
    categoryLabel: 'Diagnóstico Físico Presencial',
    allowedModalities: ['presencial'],
    pricesCents: {
      presencial: 9900
    },
    appointmentDurationMinutes: 20,
    badge: 'InBody 120 • R$ 99',
    description: 'Avaliação física direta no equipamento InBody 120 no consultório de Brasília (DF). Medição da massa muscular esquelética, gordura corporal segmentada e taxa metabólica basal.',
    benefit: 'Precisão milimétrica para acompanhar ganho de massa magra e perda de gordura.'
  },
  {
    id: 'sensor_glicose',
    name: 'Sensor Contínuo de Glicose + Análise de Dados (14 dias)',
    categoryLabel: 'Telemetria Metabólica',
    allowedModalities: ['presencial', 'online'],
    pricesCents: {
      presencial: 49000,
      online: 49000
    },
    appointmentDurationMinutes: null, // A duração da consulta de instalação/orientação é definida na recepção; não confundir com os 14 dias de uso!
    deviceWearDurationDays: 14,
    badge: '14 Dias de Uso • R$ 490',
    description: 'Aplicação do biossensor intersticial e acompanhamento dos padrões glicêmicos durante 14 dias para identificar alimentos inflamatórios e resposta pós-prandial.',
    benefit: 'Compreensão exata de como seu organismo reage a cada refeição sem suposições.'
  },
  {
    id: 'consultoria_cozinha',
    name: 'Consultoria de Cozinha & Preparação de Refeições',
    categoryLabel: 'Rotina & Autonomia',
    allowedModalities: ['online'],
    pricesCents: {
      online: 28000
    },
    appointmentDurationMinutes: 60,
    badge: 'Sessão Online 60 min • R$ 280',
    description: 'Consultoria individual por videoconferência com o Dr. Luiz Tannuri para organização da despensa, planejamento de compras e preparação eficiente de marmitas.',
    benefit: 'Autonomia para cozinhar refeições ricas em nutrientes em menos de duas horas semanais.'
  }
];

export const TOTAL_ADDONS_CENTS = 9900 + 49000 + 28000; // 86900 cents = R$ 869

/**
 * Contrato de Configuração Externa Validável da Clínica
 * Campos marcados com `isConfirmed: false` são identificados como pendentes de homologação pelo cliente.
 */
export const CLINIC_CONFIG = {
  brandName: 'Dr. Luiz Tannuri',
  professionalCoordination: 'Dr. Luiz Tannuri — Nutrição Esportiva & Clínica',
  academicRegistration: 'Graduação em Nutrição (UNIEURO / MEC) • Pós-Graduação em Nutrição Esportiva (Faculdade Laboro / MEC)',
  cityRegion: 'Brasília (DF)',
  addressNotice: 'Consultório presencial em Brasília (DF) e Telemedicina para pacientes no Brasil e exterior.',
  
  // Contatos oficiais homologados pelo Dr. Tannuri
  primaryWhatsApp: '+55 61 9 9128-3139',
  whatsAppClean: '5561991283139',
  isWhatsAppConfirmed: true, // Homologado oficialmente pelo Dr. Tannuri (Brasília-DF)
  
  bookingUrl: 'https://agendamento.drtannuri.com.br',
  isBookingUrlConfirmed: false, // CONDICIONADO: Domínio não autenticado

  crn: 'CRN em validação cadastral (DF)',
  isCrnConfirmed: false, // Evitar divergência arbitrária CRN-3 vs CRN-1/DF
  
  instagram: '@drtannuri',
  isInstagramConfirmed: false
};

export function formatBRL(cents: number): string {
  const value = cents / 100;
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });
}

/**
 * Validador de Cotação Comercial Puro (P0)
 */
export function getQuoteForOffer(offerId: string, modality: Modality) {
  const offer = COMMERCIAL_OFFERS.find(o => o.id === offerId);
  if (!offer) return null;
  if (!offer.allowedModalities.includes(modality)) return null;

  const priceCents = offer.pricesCents[modality];
  return {
    offerId: offer.id,
    name: offer.name,
    modality,
    priceCents,
    formattedPrice: `${formatBRL(priceCents)}${offer.billingPeriod === 'month' ? '/mês' : ''}`,
    appointmentDurationMinutes: offer.appointmentDurationMinutes,
    billingPeriod: offer.billingPeriod
  };
}
