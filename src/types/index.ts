export type GoalType = 
  | 'composicao_corporal' 
  | 'energia_disposicao' 
  | 'saude_digestiva' 
  | 'performance_esportiva' 
  | 'longevidade_metabolica';

export type ChallengeType = 
  | 'constancia_rotina' 
  | 'fome_ansiedade' 
  | 'falta_tempo_cozinha' 
  | 'digestao_inchaço' 
  | 'estagnacao_resultados';

export type RoutineType = 
  | 'muito_corrida' 
  | 'moderada' 
  | 'previsivel_homeoffice' 
  | 'turnos_irregulares';

export type SupportType = 
  | 'consulta_pontual' 
  | 'programa_estruturado' 
  | 'assinatura_continua';

export interface DiagnosticState {
  step: number;
  goal: GoalType | null;
  challenge: ChallengeType | null;
  routine: RoutineType | null;
  dataInterest: string[];
  supportPreference: SupportType | null;
  completed: boolean;
  timestamp?: number;
}

export interface ProgramItem {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  targetAudience: string;
  bestFor: GoalType[];
  description: string;
  highlights: string[];
  includes: string[];
  priceEstimate?: string;
  badge?: string;
  isPopular?: boolean;
}

export type Modality = 'online' | 'presencial';
export type BillingPeriod = 'one_off' | 'monthly';

export interface CareOffer {
  id: string;
  name: string;
  category: 'entrada' | 'programa' | 'recorrente' | 'premium';
  priceCentsByModality: Record<Modality, number>;
  billingPeriod: BillingPeriod;
  initialConsultationDurationMinutes: number;
  returns: {
    quantity: number | null; // null represents recurring fortnightly returns without fixed total cap
    intervalDays: number;
    description: string;
  };
  inPersonBioimpedance?: {
    device: 'InBody 120';
    intervalDays: number;
    description: string;
  };
  externalAppLabel?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
  disclaimer?: string;
}

export interface PlanItem {
  id: string;
  name: string;
  category: 'entrada' | 'programa' | 'recorrente' | 'premium';
  price: string;
  priceCentsByModality?: Record<Modality, number>;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
  disclaimer?: string;
}

export interface AddonItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  benefit: string;
  imageKey?: string;
  badge?: string;
  durationOrFormat?: string;
  clinicalSpecs?: string[];
  preparationTips?: string[];
  numericPrice?: number;
  suitableFor?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'metodo' | 'programas' | 'tecnologia' | 'agendamento';
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    action: 'scroll_to' | 'open_modal' | 'whatsapp' | 'book';
    target: string;
  }[];
}

export interface AnalyticsEvent {
  eventName: string;
  category: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean | undefined>;
}
