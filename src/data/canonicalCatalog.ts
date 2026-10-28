import { ProgramItem, PlanItem, AddonItem, FAQItem, CareOffer, Modality } from '../types';
import {
  COMMERCIAL_OFFERS,
  COMMERCIAL_ADDONS,
  CLINIC_CONFIG,
  formatBRL,
  TOTAL_ADDONS_CENTS,
  getQuoteForOffer
} from './canonicalOffers';

export { formatBRL, TOTAL_ADDONS_CENTS, getQuoteForOffer, COMMERCIAL_OFFERS, COMMERCIAL_ADDONS, CLINIC_CONFIG };

export const CLIENT_INFO = {
  brandName: CLINIC_CONFIG.brandName,
  tagline: "Nutrição de Precisão & Acompanhamento Contínuo",
  subtagline: "A ciência do seu metabolismo traduzida em comida real, dados compreensíveis e suporte ativo.",
  segment: "Nutrição Esportiva, Precisão Metabólica & Saúde Integrativa",
  cityRegion: "Brasília (DF)",
  primaryWhatsApp: CLINIC_CONFIG.primaryWhatsApp,
  whatsAppClean: CLINIC_CONFIG.whatsAppClean,
  isWhatsAppConfirmed: CLINIC_CONFIG.isWhatsAppConfirmed,
  bookingUrl: CLINIC_CONFIG.bookingUrl,
  isBookingUrlConfirmed: CLINIC_CONFIG.isBookingUrlConfirmed,
  professionalCoordination: CLINIC_CONFIG.professionalCoordination,
  professionalRegistration: CLINIC_CONFIG.academicRegistration,
  crn: CLINIC_CONFIG.crn,
  isCrnConfirmed: CLINIC_CONFIG.isCrnConfirmed,
  specialties: ["Nutrição Esportiva", "Precisão Metabólica", "Composição Corporal"],
  instagram: CLINIC_CONFIG.instagram,
  locationNotice: CLINIC_CONFIG.addressNotice,
  guaranteeNotice: "Condutas nutricionais e terapêuticas são individualizadas em consulta médica e nutricional, conforme as diretrizes éticas do CFN/CRN.",
};

/**
 * Fonte Única da Verdade para as Ofertas Comerciais Canônicas (PDF Página 9)
 */
export const CARE_OFFERS: CareOffer[] = [
  {
    id: "diagnostico_inicial",
    name: "Diagnóstico Inicial de Precisão",
    category: "entrada",
    priceCentsByModality: {
      online: 45000,     // R$ 450
      presencial: 75000  // R$ 750
    },
    billingPeriod: "one_off",
    initialConsultationDurationMinutes: 60,
    returns: {
      quantity: 1,
      intervalDays: 15,
      description: "1 retorno incluso em até 15 dias"
    },
    description: "A porta de entrada ideal: análise minuciosa do seu histórico, sinais clínicos, rotina e elaboração do plano inicial.",
    features: [
      "Consulta individual completa de 60 minutos",
      "1 retorno em até 15 dias incluso",
      "Mapeamento metabólico e hábitos de rotina",
      "Definição das prioridades nutricionais imediatas",
      "Entrega do Plano de Ação individualizado em até 48h",
      "Presencial em Brasília ou Teleconsulta Online HD"
    ],
    ctaLabel: "Agendar Diagnóstico",
    isPopular: false,
    disclaimer: "Ideal para quem quer conhecer a metodologia antes de um programa completo."
  },
  {
    id: "programa_metabolico",
    name: "Programa Metabolismo 12 Semanas",
    category: "programa",
    priceCentsByModality: {
      online: 119900,    // R$ 1.199
      presencial: 199900 // R$ 1.999
    },
    billingPeriod: "one_off",
    initialConsultationDurationMinutes: 60,
    returns: {
      quantity: 3,
      intervalDays: 15,
      description: "3 retornos quinzenais de ajuste fino"
    },
    inPersonBioimpedance: {
      device: "InBody 120",
      intervalDays: 15,
      description: "Bioimpedância presencial quinzenal (InBody 120)"
    },
    externalAppLabel: "App Webidiet",
    description: "O formato mais procurado para recomposição corporal, emagrecimento sustentável e consolidação de hábitos.",
    features: [
      "Consulta inicial completa de 60 minutos",
      "3 retornos quinzenais de acompanhamento e ajuste fino",
      "Bioimpedância presencial quinzenal (InBody 120)",
      "Acesso ao App Webidiet para registro e rotina",
      "Canal de suporte ativo no WhatsApp para dúvidas cotidianas",
      "Análise aprofundada de exames laboratoriais prévios"
    ],
    ctaLabel: "Garantir Vaga no Programa",
    isPopular: true,
    disclaimer: "Atendimento com vagas limitadas para garantir suporte individual de excelência."
  },
  {
    id: "plano_assinatura",
    name: "Assinatura Acompanhamento Contínuo",
    category: "recorrente",
    priceCentsByModality: {
      online: 25900,     // R$ 259 / mês
      presencial: 42900  // R$ 429 / mês
    },
    billingPeriod: "monthly",
    initialConsultationDurationMinutes: 60,
    returns: {
      quantity: null,    // null = retornos quinzenais contínuos sem cap rígido arbitrário
      intervalDays: 15,
      description: "Retornos quinzenais contínuos"
    },
    inPersonBioimpedance: {
      device: "InBody 120",
      intervalDays: 15,
      description: "Bioimpedância presencial quinzenal (InBody 120)"
    },
    description: "A certeza de manter o ritmo após a fase inicial ou para quem prefere evolução constante e sem pressão.",
    features: [
      "Consulta clínica inicial e de alinhamento (60 min)",
      "Retornos quinzenais",
      "Bioimpedância presencial quinzenal (InBody 120)",
      "Suporte para adaptação a viagens, festas e períodos atípicos",
      "Assinatura mensal sem carência ou fidelidade de permanência"
    ],
    ctaLabel: "Assinar Acompanhamento",
    isPopular: false,
    disclaimer: "Válido para continuidade pós-diagnóstico ou pós-programa."
  },
  {
    id: "programa_longevidade_vip",
    name: "Performance & Longevidade Integrada",
    category: "premium",
    priceCentsByModality: {
      online: 199900,    // R$ 1.999
      presencial: 319900 // R$ 3.199
    },
    billingPeriod: "one_off",
    initialConsultationDurationMinutes: 60,
    returns: {
      quantity: 6,
      intervalDays: 15,
      description: "6 retornos quinzenais dedicados à alta performance"
    },
    inPersonBioimpedance: {
      device: "InBody 120",
      intervalDays: 15,
      description: "Bioimpedância presencial quinzenal (InBody 120)"
    },
    description: "A experiência máxima de nutrição funcional e esportiva com monitoramento estreito e integração de rotina.",
    features: [
      "Consulta clínica aprofundada de 60 minutos",
      "6 retornos quinzenais dedicados à alta performance",
      "Bioimpedância presencial quinzenal (InBody 120)",
      "Consultoria de estratégias alimentares para viagens de negócios",
      "Análise minuciosa de biomarcadores e exames laboratoriais",
      "Atendimento prioritário com suporte contínuo"
    ],
    ctaLabel: "Quero a Experiência Completa",
    isPopular: false,
    disclaimer: "Recomendado para atletas amadores, competidores, executivos e alta demanda física/cognitiva."
  }
];

export function getCareOffer(id: string): CareOffer | undefined {
  return CARE_OFFERS.find(o => o.id === id);
}

export function getOfferPriceFormatted(offer: CareOffer, modality: Modality): string {
  const cents = offer.priceCentsByModality[modality];
  return formatBRL(cents);
}

/**
 * Planos formatados derivados diretamente da fonte canônica CARE_OFFERS
 */
export const CANONICAL_PLANS: PlanItem[] = CARE_OFFERS.map(offer => ({
  id: offer.id,
  name: offer.name,
  category: offer.category,
  price: `${formatBRL(offer.priceCentsByModality.online)} (Online) / ${formatBRL(offer.priceCentsByModality.presencial)} (Presencial)`,
  priceCentsByModality: offer.priceCentsByModality,
  period: offer.billingPeriod === 'monthly' ? 'por mês • sem carência' : 'investimento único',
  description: offer.description,
  features: offer.features,
  ctaLabel: offer.ctaLabel,
  isPopular: offer.isPopular,
  disclaimer: offer.disclaimer
}));

export const CANONICAL_ADDONS: AddonItem[] = [
  {
    id: "bioimpedancia_inbody",
    name: "Exame de Bioimpedância Segmentada InBody 120",
    category: "Diagnóstico",
    price: "R$ 99",
    numericPrice: 99,
    description: "Avaliação física com laudo no equipamento InBody 120: medição de massa de músculo esquelético, gordura corporal, água corporal total e estimativa da Taxa Metabólica Basal.",
    benefit: "Permite quantificar sua evolução física e acompanhar o ganho de massa magra e redução de gordura.",
    imageKey: "addonInBody",
    badge: "Precisão InBody 120",
    durationOrFormat: "Presencial • 20 min",
    suitableFor: "Recomposição corporal, controle de percentual de gordura e acompanhamento de treinos.",
    clinicalSpecs: [
      "Massa de Músculo Esquelético e Gordura Corporal",
      "Porcentagem de Gordura Corporal (PBF)",
      "Água Corporal Total",
      "Estimativa de Taxa Metabólica Basal (TMB)",
      "Controle de Massa Muscular e Gordura"
    ],
    preparationTips: [
      "Jejum alimentar de 2 a 3 horas antes do exame",
      "Evitar exercícios físicos extenuantes nas 12h anteriores",
      "Esvaziar a bexiga cerca de 15 minutos antes da medição",
      "Não ingerir bebidas alcoólicas nas 24h que antecedem"
    ]
  },
  {
    id: "sensor_glicose",
    name: "Sensor Contínuo de Glicose + Análise de Dados (14 dias)",
    category: "Biotecnologia",
    price: "R$ 490",
    numericPrice: 490,
    description: "Instalação do sensor intersticial e relatório de tolerância glicêmica personalizada para diferentes refeições.",
    benefit: "Descubra como seu corpo específico reage a aveia, frutas, massas e treinos.",
    imageKey: "addonCgmSensor",
    badge: "Telemetria 24/7",
    durationOrFormat: "Sensor 14 dias + Relatório Clínico",
    suitableFor: "Pico de insulina subclínico, fadiga pós-prandial, atletas que buscam timing de carboidratos e pré-diabetes.",
    clinicalSpecs: [
      "Monitoramento intersticial ininterrupto por 14 dias",
      "Curva de resposta glicêmica para cada refeição típica",
      "Identificação de quedas reativas (hipoglicemia e fadiga)",
      "Correlação com picos de sono, estresse e exercício",
      "Relatório comparativo de tolerância a carboidratos reais"
    ],
    preparationTips: [
      "Aplicação indolor e rápida na parte posterior do braço",
      "Resistente à água (banho, natação e treinos intensos)",
      "Sincronização direta via smartphone (iOS/Android)",
      "Diário fotográfico das refeições durante o período"
    ]
  },
  {
    id: "consultoria_cozinha",
    name: "Consultoria de Cozinha & Meal Prep Prático (Online)",
    category: "Rotina",
    price: "R$ 280",
    numericPrice: 280,
    description: "Sessão prática de 60 minutos para organizar despensa, congelamento correto e montagem de marmitas funcionais em 2h por semana.",
    benefit: "Elimina a desculpa da falta de tempo e barateia o supermercado.",
    imageKey: "addonMealPrep",
    badge: "Autonomia & Economia",
    durationOrFormat: "Online ao Vivo • 60 min",
    suitableFor: "Profissionais com rotina corrida, pessoas que gastam muito com delivery ou buscam consistência na dieta.",
    clinicalSpecs: [
      "Auditoria de despensa e utensílios indispensáveis",
      "Técnicas de pré-preparo e cozimento em lote (batch cooking)",
      "Congelamento correto que preserva nutrientes e textura",
      "Montagem de 10 a 14 refeições funcionais em até 2 horas",
      "Checklist inteligente de compras sazonais de baixo custo"
    ],
    preparationTips: [
      "Sessão individual online por videoconferência HD",
      "Acesso direto à sua cozinha para orientações em tempo real",
      "Guia complementar com cronograma de preparo",
      "Tira-dúvidas direto por 7 dias após a consultoria"
    ]
  }
];

export const CANONICAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Como funciona o primeiro contato e o Diagnóstico Inicial?",
    answer: "O Diagnóstico Inicial é uma consulta detalhada de 60 minutos (presencial em Brasília ou teleconsulta online com envio prévio de orientações). Investigamos seu histórico de saúde, rotina esportiva e de trabalho, sinais clínicos (digestão, sono, disposição), preferências alimentares e exames laboratoriais prévios. Você sai com um plano de ação claro e individualizado para os primeiros 15 dias, com 1 retorno incluso para calibração.",
    category: "metodo"
  },
  {
    id: "faq-2",
    question: "Vou receber uma dieta restritiva e punitiva?",
    answer: "Absolutamente não. Nosso princípio é 'adição antes de subtração'. A prática clínica e a vivência de tatame mostram que dietas baseadas em restrições extremas aumentam o cortisol, prejudicam a força muscular e destroem a adesão. Trabalhamos com comida de verdade, densidade nutricional, prazer à mesa e adaptação real à sua rotina profissional e de treinos.",
    category: "metodo"
  },
  {
    id: "faq-3",
    question: "O atendimento online tem a mesma eficácia do presencial?",
    answer: "Sim. Nossas teleconsultas com prontuário digital seguro e acompanhamento próximo pelo WhatsApp proporcionam um suporte ativo de alto nível. Atendemos atletas e executivos em diversos países (Alemanha, EUA, Oriente Médio) e estados brasileiros com a mesma precisão metodológica.",
    category: "programas"
  },
  {
    id: "faq-4",
    question: "Como a bioimpedância e os dados me ajudam no acompanhamento?",
    answer: "No consultório presencial em Brasília, utilizamos a bioimpedância InBody 120 para acompanhar a evolução real da sua massa muscular esquelética e gordura corporal. No programa de 12 semanas, o acompanhamento via App Webidiet auxilia na organização prática da sua alimentação diária.",
    category: "tecnologia"
  },
  {
    id: "faq-5",
    question: "A Concierge de IA substitui a consulta clínica com o Dr. Luiz Tannuri?",
    answer: "Não. A nossa assistente de IA (Clara) atua como concierge de acolhimento, orientação sobre os formatos de atendimento, valores e agendamento. O diagnóstico clínico, avaliação e prescrição dietética são atos privativos do Dr. Luiz Tannuri em consulta individualizada.",
    category: "tecnologia"
  },
  {
    id: "faq-6",
    question: "Posso utilizar exames de sangue que fiz recentemente?",
    answer: "Com certeza. Exames laboratoriais realizados nos últimos 6 meses são extremamente bem-vindos e enriquecem muito nossa análise inicial de perfil lipídico, glicêmico, tireoidiano, inflamatório e de vitaminas/minerais.",
    category: "agendamento"
  }
];

export const METHOD_PILLARS = [
  {
    step: "01",
    title: "Diagnóstico Bioindividual",
    subtitle: "Mapeamento além do peso na balança",
    description: "Investigamos sua saúde metabólica, rotina de treinos, gasto energético e exames laboratoriais. O corpo responde à precisão biológica de quem entende o esforço do treino.",
    badge: "Precisão Clínica"
  },
  {
    step: "02",
    title: "Marmitaria do Atleta",
    subtitle: "Comida densa em nutrientes, zero punição",
    description: "A alimentação precisa caber na sua rotina real de trabalho e treinos. Ingredientes frescos, técnicas culinárias práticas e saciedade verdadeira para manter seu rendimento sempre alto.",
    badge: "Alta Adesão"
  },
  {
    step: "03",
    title: "Acompanhamento Ativo & Vivo",
    subtitle: "Apoio entre as consultas, quando a vida acontece",
    description: "O maior gargalo das dietas tradicionais é a ausência de suporte entre consultas. Nosso canal direto garante ajustes rápidos para viagens de negócios, treinos e compromissos sociais.",
    badge: "Zero Desistência"
  },
  {
    step: "04",
    title: "Inteligência de Dados sem Estresse",
    subtitle: "Massa Magra e Gordura Corporal",
    description: "Acompanhamos a evolução da composição corporal no InBody 120 e a estabilidade de energia no dia a dia. Dados claros para orientar decisões com segurança.",
    badge: "Autonomia"
  }
];

export const TRUST_POINTS = [
  {
    value: "100%",
    label: "Individualizado",
    description: "Protocolos desenhados para a sua rotina sem dietas genéricas"
  },
  {
    value: "60 min",
    label: "Primeira Consulta",
    description: "Tempo clínico de escuta ativa, avaliação física e planejamento seguro"
  },
  {
    value: "Ciência",
    label: "Baseada em Evidências",
    description: "Diretrizes alinhadas a consensos internacionais de nutrição esportiva"
  },
  {
    value: "CFN / CRN",
    label: "Rigor Ético",
    description: "Conduta profissional e nutricional em total conformidade regulatória"
  }
];

// Preserved for backwards compatibility with any remaining diagnostic references
export const CANONICAL_PROGRAMS: ProgramItem[] = [];
