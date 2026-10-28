import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Shield, 
  FlaskConical, 
  Flame, 
  Clock, 
  Dna, 
  Utensils, 
  Activity, 
  HeartPulse, 
  Check,
  Compass,
  SlidersHorizontal
} from 'lucide-react';
import { DiagnosticState, GoalType, ChallengeType, RoutineType, SupportType, ProgramItem } from '../../types';
import { CANONICAL_PROGRAMS } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { analytics } from '../../lib/analytics';
import { saveDiagnosticState, loadDiagnosticState } from '../../lib/storage';

interface SmartDiagnosticProps {
  onSelectProgram: (program: ProgramItem) => void;
  onExploreTool: (toolId: string) => void;
  onOpenConcierge: (contextPrompt?: string) => void;
}

export const SmartDiagnostic: React.FC<SmartDiagnosticProps> = ({
  onSelectProgram,
  onExploreTool,
  onOpenConcierge
}) => {
  const [state, setState] = useState<DiagnosticState>({
    step: 1,
    goal: null,
    challenge: null,
    routine: null,
    dataInterest: [],
    supportPreference: null,
    completed: false
  });

  // Restore state from sessionStorage if returning
  useEffect(() => {
    const saved = loadDiagnosticState();
    if (saved && saved.completed) {
      setState(saved);
    }
  }, []);

  const handleGoalSelect = (goal: GoalType) => {
    const next = { ...state, goal, step: 2 };
    setState(next);
    saveDiagnosticState(next);
    analytics.track('diagnostic_step', 'funnel', { step: 1, goal });
  };

  const handleChallengeSelect = (challenge: ChallengeType) => {
    const next = { ...state, challenge, step: 3 };
    setState(next);
    saveDiagnosticState(next);
    analytics.track('diagnostic_step', 'funnel', { step: 2, challenge });
  };

  const handleRoutineSelect = (routine: RoutineType) => {
    const next = { ...state, routine, step: 4 };
    setState(next);
    saveDiagnosticState(next);
    analytics.track('diagnostic_step', 'funnel', { step: 3, routine });
  };

  const toggleDataInterest = (item: string) => {
    const exists = state.dataInterest.includes(item);
    const updated = exists 
      ? state.dataInterest.filter(i => i !== item)
      : [...state.dataInterest, item];
    const next = { ...state, dataInterest: updated };
    setState(next);
    saveDiagnosticState(next);
  };

  const handleSupportSelect = (supportPreference: SupportType) => {
    const next: DiagnosticState = { 
      ...state, 
      supportPreference, 
      completed: true, 
      step: 5,
      timestamp: Date.now()
    };
    setState(next);
    saveDiagnosticState(next);
    analytics.track('diagnostic_complete', 'conversion', { 
      goal: next.goal,
      supportPreference 
    });
  };

  const resetDiagnostic = () => {
    const fresh: DiagnosticState = {
      step: 1,
      goal: null,
      challenge: null,
      routine: null,
      dataInterest: [],
      supportPreference: null,
      completed: false
    };
    setState(fresh);
    saveDiagnosticState(fresh);
    analytics.track('diagnostic_reset', 'funnel');
  };

  // Determine recommendation dynamically based on answers
  const recommendedProgram = React.useMemo(() => {
    if (state.goal === 'saude_digestiva') {
      return CANONICAL_PROGRAMS.find(p => p.id === 'vitalidade_digestiva') || CANONICAL_PROGRAMS[0];
    }
    if (state.goal === 'performance_esportiva' || state.goal === 'longevidade_metabolica') {
      return CANONICAL_PROGRAMS.find(p => p.id === 'performance_longevidade') || CANONICAL_PROGRAMS[0];
    }
    if (state.supportPreference === 'assinatura_continua') {
      return CANONICAL_PROGRAMS.find(p => p.id === 'assinatura_continua') || CANONICAL_PROGRAMS[0];
    }
    return CANONICAL_PROGRAMS.find(p => p.id === 'metabolismo_precisao') || CANONICAL_PROGRAMS[0];
  }, [state.goal, state.supportPreference]);

  return (
    <section id="diagnostico" className="py-20 md:py-28 bg-gradient-to-b from-[#EAF2E6] via-[#E4ECE0] to-[#EAF2E6] border-y border-[#CCD8C4] relative overflow-hidden" aria-labelledby="diagnostic-title">
      {/* Subtle organic light accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#72B818]/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-[#F6FAF1] to-[#FFF4ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
            <span>RAIO-X METABÓLICO • 60 SEGUNDOS</span>
          </div>
          <h2 id="diagnostic-title" className="font-display text-3xl sm:text-4xl text-[#0A160F] tracking-tight font-bold">
            Mapeie a assinatura única do seu metabolismo
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal leading-relaxed">
            Descubra em menos de um minuto quais prioridades biológicas destravam mais rápido a sua disposição diária, recomposição corporal e saúde a longo prazo.
          </p>
        </div>

        {/* Diagnostic Card Container - Dynamically widens on completed result */}
        <div className={`mx-auto rounded-3xl bg-gradient-to-br from-white via-[#FAFDF8] to-[#EFF6EB] border border-[#CCD8C4] p-6 sm:p-10 shadow-[0_16px_50px_rgba(20,40,25,0.08),0_2px_8px_rgba(20,40,25,0.03)] relative text-[#0A160F] transition-all duration-500 ${
          state.completed ? 'max-w-5xl' : 'max-w-3xl'
        }`}>
          
          {/* Progress Indicators */}
          {!state.completed && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono-data text-[#566D5D] mb-2 font-semibold">
                <span className="text-[#2C6E14] font-bold">ETAPA {state.step} DE 5</span>
                <span>{Math.round(((state.step - 1) / 5) * 100)}% CONCLUÍDO</span>
              </div>
              <div className="h-2 w-full bg-[#E2ECE0] rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#2C6E14] via-[#72B818] to-[#EB651A] transition-all duration-500 rounded-full"
                  style={{ width: `${(state.step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: GOAL */}
          {state.step === 1 && !state.completed && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold">Passo 1</span>
                <h3 className="font-display text-2xl text-[#0A160F] mt-1 font-semibold">
                  Qual é o seu objetivo prioritário hoje?
                </h3>
                <p className="text-xs sm:text-sm text-[#384C3E] mt-1 font-normal">
                  Selecione o ponto que mais impacta seu bem-estar diário.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'composicao_corporal' as GoalType, label: 'Composição Corporal', desc: 'Perder gordura preservando massa magra', icon: Flame },
                  { id: 'energia_disposicao' as GoalType, label: 'Energia & Vitalidade', desc: 'Eliminar quedas de disposição ao longo do dia', icon: Zap },
                  { id: 'saude_digestiva' as GoalType, label: 'Saúde Digestiva & Intestinal', desc: 'Reduzir inchaço e modular a microbiota', icon: HeartPulse },
                  { id: 'performance_esportiva' as GoalType, label: 'Performance & Treino', desc: 'Recuperação rápida e periodização de nutrientes', icon: Activity },
                  { id: 'longevidade_metabolica' as GoalType, label: 'Longevidade Saudável', desc: 'Prevenção, marcadores inflamatórios e rotina leve', icon: Dna }
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`diag-goal-${item.id}`}
                      onClick={() => handleGoalSelect(item.id)}
                      className="min-h-[44px] p-4 rounded-2xl bg-white border border-[#CCD8C4] text-left hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all flex flex-col justify-between group active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#F2F8ED] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] group-hover:bg-[#2C6E14] group-hover:text-white transition-all">
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-sm text-[#0A160F] group-hover:text-[#2C6E14] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#566D5D] group-hover:text-[#2C6E14] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="text-xs text-[#566D5D] mt-2.5 leading-snug font-normal pl-10">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHALLENGE */}
          {state.step === 2 && !state.completed && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold">Passo 2</span>
                <h3 className="font-display text-2xl text-[#0A160F] mt-1 font-semibold">
                  O que mais tem dificultado sua consistência?
                </h3>
                <p className="text-xs sm:text-sm text-[#384C3E] mt-1 font-normal">
                  Entender o obstáculo permite desenhar uma estratégia que respeita sua rotina.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'constancia_rotina' as ChallengeType, label: 'Constância na Rotina', desc: 'Começo bem, mas desisto após poucas semanas', icon: Clock },
                  { id: 'fome_ansiedade' as ChallengeType, label: 'Fome Emocional & Beliscos', desc: 'Picos de vontade de doce no fim da tarde', icon: Flame },
                  { id: 'falta_tempo_cozinha' as ChallengeType, label: 'Falta de Tempo para Cozinhar', desc: 'Dificuldade para planejar compras e marmitas', icon: Utensils },
                  { id: 'digestao_inchaço' as ChallengeType, label: 'Desconforto Digestivo', desc: 'Sensação frequente de estufamento pós-refeição', icon: HeartPulse },
                  { id: 'estagnacao_resultados' as ChallengeType, label: 'Platô de Resultados', desc: 'Estou me esforçando, mas o corpo parou de responder', icon: SlidersHorizontal }
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`diag-challenge-${item.id}`}
                      onClick={() => handleChallengeSelect(item.id)}
                      className="min-h-[44px] p-4 rounded-2xl bg-white border border-[#CCD8C4] text-left hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all flex flex-col justify-between group active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#F2F8ED] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] group-hover:bg-[#2C6E14] group-hover:text-white transition-all">
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-sm text-[#0A160F] group-hover:text-[#2C6E14] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#566D5D] group-hover:text-[#2C6E14] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="text-xs text-[#566D5D] mt-2.5 leading-snug font-normal pl-10">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: ROUTINE */}
          {state.step === 3 && !state.completed && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold">Passo 3</span>
                <h3 className="font-display text-2xl text-[#0A160F] mt-1 font-semibold">
                  Como é a dinâmica do seu dia a dia?
                </h3>
                <p className="text-xs sm:text-sm text-[#384C3E] mt-1 font-normal">
                  O plano alimentar deve servir à sua vida, nunca o contrário.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'muito_corrida' as RoutineType, label: 'Muito Corrida & Reuniões', desc: 'Muitos almoços fora, viagens e horários imprevisíveis' },
                  { id: 'previsivel_homeoffice' as RoutineType, label: 'Home Office / Previsível', desc: 'Fácil acesso à cozinha, porém com risco de beliscar' },
                  { id: 'moderada' as RoutineType, label: 'Híbrida Equilibrada', desc: 'Alguns dias fora, outros em casa com horários razoáveis' },
                  { id: 'turnos_irregulares' as RoutineType, label: 'Plantões ou Noites', desc: 'Horários invertidos que demandam suporte circadiano' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`diag-routine-${item.id}`}
                    onClick={() => handleRoutineSelect(item.id)}
                    className="min-h-[44px] p-4 rounded-2xl bg-white border border-[#CCD8C4] text-left hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all flex flex-col justify-between group active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span className="font-semibold text-sm text-[#0A160F] group-hover:text-[#2C6E14] flex items-center justify-between">
                      {item.label}
                      <ChevronRight className="w-4 h-4 text-[#566D5D] group-hover:text-[#2C6E14] group-hover:translate-x-0.5 transition-all" />
                    </span>
                    <span className="text-xs text-[#566D5D] mt-1.5 leading-snug font-normal">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: DATA INTEREST */}
          {state.step === 4 && !state.completed && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold">Passo 4</span>
                <h3 className="font-display text-2xl text-[#0A160F] mt-1 font-semibold">
                  Quais dados biológicos você tem interesse em acompanhar?
                </h3>
                <p className="text-xs sm:text-sm text-[#384C3E] mt-1 font-normal">
                  Selecione quantos desejar (ou continue para o próximo passo).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: 'bioimpedancia', label: 'Bioimpedância Segmentada', desc: 'Massa magra por membro e gordura visceral' },
                  { id: 'glicose', label: 'Resposta à Glicose (CGM)', desc: 'Picos de açúcar no sangue e tolerância a carboidratos' },
                  { id: 'exames', label: 'Painel Sanguíneo Completo', desc: 'Lipídios, tireoide, inflamação e vitaminas' },
                  { id: 'digestao', label: 'Rastreamento de Digestão', desc: 'Sensibilidades alimentares e saúde do intestino' }
                ].map((item) => {
                  const isChecked = state.dataInterest.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      id={`diag-data-${item.id}`}
                      type="button"
                      onClick={() => toggleDataInterest(item.id)}
                      className={`min-h-[44px] p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer shadow-2xs ${
                        isChecked 
                          ? 'bg-[#F2F8ED] border-2 border-[#2C6E14] text-[#0A160F]' 
                          : 'bg-white border-[#CCD8C4] text-[#384C3E] hover:border-[#72B818]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm block text-[#0A160F]">{item.label}</span>
                        <span className="text-xs text-[#566D5D] mt-1 block">{item.desc}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-[#2C6E14] border-[#2C6E14] text-white' : 'border-[#CCD8C4]'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="diag-step-4-next"
                  onClick={() => {
                    const next = { ...state, step: 5 };
                    setState(next);
                    saveDiagnosticState(next);
                  }}
                  className="min-h-[44px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1B4D24] to-[#245D2E] text-white font-bold text-xs sm:text-sm hover:opacity-95 hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Avançar para Etapa Final</span>
                  <ArrowRight className="w-4 h-4 text-[#AEE938]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUPPORT PREFERENCE */}
          {state.step === 5 && !state.completed && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold">Passo 5 de 5</span>
                <h3 className="font-display text-2xl text-[#0A160F] mt-1 font-semibold">
                  Qual formato de acompanhamento faz mais sentido para você?
                </h3>
                <p className="text-xs sm:text-sm text-[#384C3E] mt-1 font-normal">
                  Não há fidelidade obrigatória; adaptamos ao seu ritmo e autonomia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  { id: 'consulta_pontual' as SupportType, label: 'Diagnóstico Inicial', desc: 'Consulta avulsa profunda (75 min) para receber plano de largada.' },
                  { id: 'programa_estruturado' as SupportType, label: 'Programa Fechado', desc: '8 a 12 semanas com acompanhamento contínuo e consultas quinzenais.' },
                  { id: 'assinatura_continua' as SupportType, label: 'Assinatura Mensal', desc: 'Apoio contínuo e leve, com cancelamento livre a qualquer momento.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`diag-support-${item.id}`}
                    onClick={() => handleSupportSelect(item.id)}
                    className="min-h-[44px] p-5 rounded-2xl bg-white border border-[#CCD8C4] text-left hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all flex flex-col justify-between group active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <div>
                      <span className="font-semibold text-sm text-[#0A160F] group-hover:text-[#2C6E14]">
                        {item.label}
                      </span>
                      <p className="text-xs text-[#566D5D] mt-2 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-xs text-[#2C6E14] font-bold mt-4 flex items-center gap-1 group-hover:underline">
                      Finalizar Mapa &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COMPLETED RESULT / MICRO-VICTORY STATE (UPGRADED TO MASTER PLUS 120%) */}
          {state.completed && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Micro-Victory Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#CCD8C4]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EAF5E4] to-[#DBECCF] border border-[#AEE938] flex items-center justify-center text-[#2C6E14] shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-data text-[#2C6E14] uppercase tracking-wider font-bold block">
                      Microvitória Alcançada • Mapeamento Concluído
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F]">
                      Seu Mapeamento Metabólico Inicial
                    </h3>
                  </div>
                </div>

                <button
                  id="diag-reset-btn"
                  onClick={resetDiagnostic}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-[#CCD8C4] hover:border-[#2C6E14] text-xs text-[#566D5D] hover:text-[#0A160F] transition-all self-start sm:self-center cursor-pointer font-medium flex items-center gap-1.5 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#EB651A]" />
                  <span>Refazer teste</span>
                </button>
              </div>

              {/* Wide Hollywood Studio Photographic Showcase Frame with Floating Biometric Telemetry HUD */}
              <div className="rounded-3xl overflow-hidden border border-[#CCD8C4] shadow-xl bg-white relative group">
                <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                  <img
                    id="diag-biomarkers-image"
                    src={VISUAL_ASSETS.metabolicBiomarkers?.src || ''}
                    alt={VISUAL_ASSETS.metabolicBiomarkers?.alt || 'Mapeamento Celular & Laboratorial'}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Hollywood Studio Vignette & Subtle Emerald Atmosphere */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/85 via-black/20 to-black/30" 
                    aria-hidden="true" 
                  />

                  {/* Top Left Badge: CFN / Lab Certified Standard */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#CCD8C4] text-[11px] font-mono-data text-[#0A160F] font-bold flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
                    <span>Biomarcadores CFN / CRN-3 Homologados</span>
                  </div>

                  {/* Top Right: Real-time Precision Metric */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#0A160F]/85 backdrop-blur-md border border-white/20 text-[10px] font-mono-data text-[#AEE938] font-bold shadow-sm hidden sm:flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-[#72B818]" />
                    <span>Precisão Bioenergética & HOMA-IR</span>
                  </div>

                  {/* Floating Bottom Telemetry Glass Bar */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data text-[#EB651A] font-bold tracking-wider">
                          Mapeamento Celular & Laboratorial
                        </span>
                        <span className="text-[10px] font-mono-data font-bold text-[#2C6E14] bg-[#EAF5E4] px-2 py-0.5 rounded-full">
                          Alvo Fisiológico Ativo
                        </span>
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#0A160F]">
                        Alvos Bioquímicos do Seu Perfil: {state.goal ? state.goal.replace('_', ' ').toUpperCase() : 'METABOLISMO'}
                      </h4>
                      <p className="text-xs text-[#384C3E] font-medium mt-0.5 leading-snug">
                        Com base nas suas respostas, o protocolo prioriza sensibilidade à insulina (HOMA-IR), perfil lipídico avançado e modulação da microbiota.
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 shrink-0 border-l border-[#CCD8C4] pl-4">
                      <div className="text-right">
                        <span className="text-[10px] font-mono-data text-[#566D5D] block">Confiabilidade</span>
                        <span className="text-xs font-bold text-[#2C6E14]">94% Aderência</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Strategic Priorities Derived - High-End Telemetry Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-mono-data text-[#EB651A] uppercase tracking-wider font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suas 3 Prioridades Estratégicas Recomendadas</span>
                  </h4>
                  <span className="text-[11px] font-mono-data text-[#566D5D] hidden sm:inline font-medium">
                    Metodologia Clínica Validada
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Priority 1 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#F6FAF1] border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#72B818] transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono-data text-[#2C6E14] bg-[#EAF5E4] px-2.5 py-1 rounded-lg border border-[#CCD8C4] font-bold">
                          PRIORIDADE 01
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#EAF5E4] text-[#2C6E14] flex items-center justify-center">
                          <Flame className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      
                      <h5 className="text-sm font-bold text-[#0A160F] group-hover:text-[#2C6E14] transition-colors">
                        Ajuste de Densidade Proteica
                      </h5>
                      <p className="text-xs text-[#384C3E] mt-1.5 leading-relaxed font-medium">
                        Calibrar 1.6 a 2.0g/kg de proteína de alto valor biológico para saciedade e proteção muscular.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data">
                      <span className="text-[#566D5D]">Alvo:</span>
                      <span className="font-bold text-[#2C6E14]">Saciedade +28%</span>
                    </div>
                  </div>

                  {/* Priority 2 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF7F2] border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#EB651A] transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono-data text-[#C84A07] bg-[#FFF0E6] px-2.5 py-1 rounded-lg border border-[#FDCDB3] font-bold">
                          PRIORIDADE 02
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#FFF0E6] text-[#EB651A] flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      
                      <h5 className="text-sm font-bold text-[#0A160F] group-hover:text-[#EB651A] transition-colors">
                        Timing de Carboidratos
                      </h5>
                      <p className="text-xs text-[#384C3E] mt-1.5 leading-relaxed font-medium">
                        Sincronizar fontes de carboidrato com períodos de maior gasto e atividade física, evitando picos.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data">
                      <span className="text-[#566D5D]">Alvo:</span>
                      <span className="font-bold text-[#EB651A]">Zero Queda às 15h</span>
                    </div>
                  </div>

                  {/* Priority 3 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#F2FBF9] border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#198774] transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono-data text-[#156B5C] bg-[#E6F5F2] px-2.5 py-1 rounded-lg border border-[#B2DFD7] font-bold">
                          PRIORIDADE 03
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#E6F5F2] text-[#198774] flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      
                      <h5 className="text-sm font-bold text-[#0A160F] group-hover:text-[#198774] transition-colors">
                        Ritmo Digestivo Estável
                      </h5>
                      <p className="text-xs text-[#384C3E] mt-1.5 leading-relaxed font-medium">
                        Janelas de descanso digestivo de 12h noturnas e hidratação rica em eletrólitos naturais.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data">
                      <span className="text-[#566D5D]">Alvo:</span>
                      <span className="font-bold text-[#198774]">Conforto Gástrico</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Recommended Matched Program Box */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-[#FAFDF7] to-[#EDF6E8] border-2 border-[#72B818] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_12px_35px_rgba(114,184,24,0.14)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EB651A] text-white text-[11px] font-mono-data mb-2.5 font-bold shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>94% DE ADERÊNCIA AO SEU PERFIL</span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0A160F]">
                    {recommendedProgram.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#384C3E] mt-1.5 max-w-xl leading-relaxed font-medium">
                    {recommendedProgram.description}
                  </p>
                </div>

                <button
                  id="diag-select-recommended-program-btn"
                  onClick={() => onSelectProgram(recommendedProgram)}
                  className="min-h-[46px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1B4D24] to-[#245D2E] text-white hover:opacity-95 hover:scale-105 active:scale-[0.98] font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center gap-2.5 shadow-md cursor-pointer relative z-10 group"
                >
                  <span>Conhecer Este Programa</span>
                  <ArrowRight className="w-4 h-4 text-[#AEE938] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Suggested Interactive Lab Tools to Try Next */}
              <div>
                <h4 className="text-xs font-mono-data text-[#566D5D] uppercase tracking-wider mb-3 font-bold">
                  Ferramentas Recomendadas Para Experimentar no Lab Interativo:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    id="diag-explore-twin-btn"
                    onClick={() => onExploreTool('metabolic_twin')}
                    className="min-h-[44px] p-4 rounded-2xl bg-white border border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F2F8ED] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] group-hover:bg-[#2C6E14] group-hover:text-white transition-all">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#0A160F] group-hover:text-[#2C6E14] transition-colors block">
                          Simulador Gêmeo Metabólico
                        </span>
                        <span className="text-[11px] text-[#566D5D] block mt-0.5 font-medium">
                          Veja sua distribuição ideal de macronutrientes (~2 min)
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#566D5D] group-hover:translate-x-1 group-hover:text-[#2C6E14] transition-all" />
                  </button>

                  <button
                    id="diag-explore-pilot-btn"
                    onClick={() => onExploreTool('pilot_day')}
                    className="min-h-[44px] p-4 rounded-2xl bg-white border border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#F4FAF0] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F2F8ED] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] group-hover:bg-[#2C6E14] group-hover:text-white transition-all">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#0A160F] group-hover:text-[#2C6E14] transition-colors block">
                          Plano-Piloto 24h & Lista de Compras
                        </span>
                        <span className="text-[11px] text-[#566D5D] block mt-0.5 font-medium">
                          Exemplo prático de refeições para hoje (~2 min)
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#566D5D] group-hover:translate-x-1 group-hover:text-[#2C6E14] transition-all" />
                  </button>
                </div>
              </div>

              {/* Contextual AI Concierge Trigger */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white via-[#FAFDF7] to-[#F1F8ED] border border-[#CCD8C4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <img 
                    src={VISUAL_ASSETS.conciergeAvatar.src}
                    alt="Clara"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#CCD8C4] shadow-xs shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-[#384C3E] font-medium">
                    Deseja tirar dúvidas sobre seu resultado diretamente com a Assistente de IA?
                  </span>
                </div>
                <button
                  id="diag-concierge-context-btn"
                  onClick={() => onOpenConcierge(`Acabei de responder o Mapa Inicial com objetivo de ${state.goal} e gostaria de entender como o programa recomendado se aplica a mim.`)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1B4D24] text-white hover:bg-[#23582D] hover:shadow-[0_4px_12px_rgba(27,77,36,0.25)] transition-all text-xs font-bold shrink-0 cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <img 
                    src={VISUAL_ASSETS.conciergeAvatar.src}
                    alt="Clara"
                    className="w-4 h-4 rounded-full object-cover border border-[#AEE938]"
                  />
                  <span>Conversar com a Assistente</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#AEE938]" />
                </button>
              </div>

              {/* Mandatory Health/Safety Disclaimer */}
              <div className="flex items-start gap-2.5 pt-3 border-t border-[#CCD8C4] text-[11px] text-[#566D5D]">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#2C6E14]" />
                <p className="leading-relaxed font-medium">
                  <strong>Aviso legal & sanitário:</strong> Este mapa inicial e suas prioridades possuem caráter estritamente educativo e demonstrativo. Não substituem diagnóstico clínico ou prescrição nutricional individualizada, que exigem consulta com profissional habilitado conforme as resoluções do CFN/CRN.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
