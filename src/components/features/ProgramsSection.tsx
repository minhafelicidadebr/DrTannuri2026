import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Shield, 
  Award, 
  Stethoscope, 
  Flame, 
  Activity, 
  Dumbbell, 
  Leaf, 
  Check 
} from 'lucide-react';
import { CANONICAL_PROGRAMS, CLIENT_INFO } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { ProgramItem } from '../../types';
import { analytics } from '../../lib/analytics';

interface ProgramsSectionProps {
  selectedProgramId?: string;
  onBookProgram: (program: ProgramItem) => void;
  onOpenConcierge: (prompt: string) => void;
}

interface CinematicProtocolCard {
  id: string;
  canonicalId: string;
  categoryTag: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  advantages: [string, string, string, string];
  price: string;
  period: string;
  image: string;
  alt: string;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  selectedProgramId,
  onBookProgram,
  onOpenConcierge
}) => {
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  // The 4 cinematic benchmark protocols matching the exact visual architecture of the prints
  const CINEMATIC_PROTOCOLS: CinematicProtocolCard[] = [
    {
      id: 'recomposicao_12_semanas',
      canonicalId: 'metabolismo_precisao',
      categoryTag: 'PRECISÃO',
      icon: Flame,
      title: 'Recomposição 12 semanas',
      description: 'Reduzir gordura visceral e ganhar massa magra com dados de bioimpedância semanal.',
      advantages: [
        'InBody semanal',
        'Cardápio rotativo IA',
        'Suplementação-alvo',
        'Coach de treino'
      ],
      price: 'R$ 4.400',
      period: '12 semanas · scan semanal · app',
      image: VISUAL_ASSETS.culinaryPrecision?.src || VISUAL_ASSETS.programRecomposition?.src || '',
      alt: 'Recomposição 12 semanas - Culinária de Precisão e Alta Densidade Nutricional'
    },
    {
      id: 'reset_glicose',
      canonicalId: 'metabolismo_precisao',
      categoryTag: 'METABÓLICO',
      icon: Activity,
      title: 'Reset de Glicose',
      description: 'Sensor de glicose contínuo por 14 dias + protocolo para estabilizar energia e apetite.',
      advantages: [
        'Sensor CGM 14 dias',
        'Mapa glicêmico',
        'Reeducação de picos',
        'Relatório clínico'
      ],
      price: 'R$ 3.200',
      period: '60 dias · CGM incluso',
      image: VISUAL_ASSETS.cgmGlucoseReset?.src || VISUAL_ASSETS.addonCgmSensor?.src || '',
      alt: VISUAL_ASSETS.cgmGlucoseReset?.alt || 'Reset de Glicose - Sensor CGM, Estabilização Glicêmica e Telemetria Metabólica'
    },
    {
      id: 'alta_performance',
      canonicalId: 'performance_longevidade',
      categoryTag: 'PERFORMANCE',
      icon: Dumbbell,
      title: 'Alta Performance',
      description: 'Periodização nutricional casada ao ciclo de treino para atletas amadores e pro.',
      advantages: [
        'Timing de macros',
        'Estratégia hídrica',
        'Ergogênicos legais',
        'Sono & recuperação'
      ],
      price: 'R$ 4.800',
      period: '3 meses · avaliação semanal',
      image: VISUAL_ASSETS.programPerformance?.src || VISUAL_ASSETS.programRecomposition?.src || '',
      alt: 'Alta Performance - Nutrição Esportiva e Periodização de Treino'
    },
    {
      id: 'eixo_intestino_cerebro',
      canonicalId: 'vitalidade_digestiva',
      categoryTag: 'FUNCIONAL',
      icon: Leaf,
      title: 'Eixo Intestino-Cérebro',
      description: 'Protocolo funcional para disbiose, inflamação e clareza mental com marcadores reais.',
      advantages: [
        'Low-FODMAP guiado',
        'Reintrodução assistida',
        'Probióticos-alvo',
        'Marcadores fecais'
      ],
      price: 'R$ 3.600',
      period: '3 meses · 5 consultas',
      image: VISUAL_ASSETS.programGut?.src || VISUAL_ASSETS.culinaryPrecision?.src || '',
      alt: 'Eixo Intestino-Cérebro - Saúde Digestiva e Microbiota Funcional'
    }
  ];

  const handleCardClick = (card: CinematicProtocolCard) => {
    const matchedCanonical = CANONICAL_PROGRAMS.find(p => p.id === card.canonicalId) || {
      id: card.id,
      name: card.title,
      tagline: card.description,
      duration: card.period,
      targetAudience: card.description,
      bestFor: ['composicao_corporal'],
      description: card.description,
      highlights: card.advantages,
      includes: ['Acesso ao Portal Dr. Tanutri', 'Acompanhamento Contínuo'],
      priceEstimate: card.price
    };
    analytics.track('program_view', 'cinematic_card', { cardId: card.id });
    onBookProgram(matchedCanonical);
  };

  return (
    <section id="programas" className="py-20 md:py-28 bg-gradient-to-b from-[#EBF4E8] via-[#E2ECE0] to-[#EAF2E6] border-y border-[#CCD8C4] relative overflow-hidden" aria-labelledby="programs-title">
      {/* Ambient Bio-Luminescent Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#72B818]/12 via-[#EB651A]/6 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono mb-3 shadow-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
              <Stethoscope className="w-3.5 h-3.5 text-[#EB651A]" />
              <span>PROTOCOLOS CLÍNICOS ESTRUTURADOS • ALTA ADESÃO</span>
            </div>
            <h2 id="programs-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight font-bold">
              Estratégias estruturadas para objetivos de alto impacto
            </h2>
            <p className="text-sm sm:text-base text-[#384C3E] mt-2 font-normal max-w-xl">
              Seja para recomposição corporal profunda, saúde digestiva ou alta performance esportiva: cada programa combina diagnóstico de precisão, periodização nutricional e acompanhamento ativo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="programs-toggle-comparison-btn"
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-white to-[#F6FAF2] border border-[#CCD8C4] text-[#0A160F] hover:border-[#72B818] transition-all text-xs font-mono flex items-center gap-2 cursor-pointer shadow-xs font-bold"
            >
              <Scale className="w-4 h-4 text-[#EB651A]" />
              <span>{showComparisonTable ? 'Ver Cards em Degradê' : 'Comparar Todos Lado a Lado'}</span>
            </button>
          </div>
        </div>

        {/* Clinical Leadership & Empathy Anchor Bar */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-br from-white via-[#F8FAF5] to-[#EEF5E9] border border-[#CCD8C4] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-[0_12px_35px_rgba(20,40,25,0.08)]">
          <div className="md:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] relative border border-[#CCD8C4]">
            <img
              id="clinical-consultation-image"
              src={VISUAL_ASSETS.clinicalConsultation?.src || VISUAL_ASSETS.consultationHuman?.src || ''}
              alt={VISUAL_ASSETS.clinicalConsultation?.alt || VISUAL_ASSETS.consultationHuman?.alt || 'Consulta Clínica'}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/80 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/95 border border-[#CCD8C4] text-[10px] font-mono text-[#0A160F] font-bold shadow-xs">
              Conduta Ética CFN / CRN
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#EB651A] uppercase tracking-wider mb-1 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Coordenação Clínica & Rigor Ético</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A160F] mb-2">
                {CLIENT_INFO.professionalCoordination}
              </h3>
              <p className="text-sm text-[#384C3E] font-normal leading-relaxed mb-4">
                Com prática clínica fundamentada na literatura contemporânea de metabolismo e nutrição de precisão, nossa equipe alia acolhimento empático a diagnósticos baseados em biomarcadores reais. Cada plano é estruturado com atenção individualizada aos sintomas, exames e rotina de cada paciente.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#566D5D] pt-3 border-t border-[#CCD8C4]">
              <span className="flex items-center gap-1.5 text-[#2C6E14] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#EB651A]" />
                Atendimento Clínico Individualizado
              </span>
              <span className="flex items-center gap-1.5 text-[#198774] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#198774]" />
                Consultas Online & Presenciais (Diretrizes CFN)
              </span>
            </div>
          </div>
        </div>

        {/* Cinematic Grid vs Comparison Table */}
        {!showComparisonTable ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CINEMATIC_PROTOCOLS.map((card, idx) => {
              const IconComponent = card.icon;
              const isMetabolic = idx < 2; // Recomposição & Reset de Glicose
              return (
                <article
                  key={card.id}
                  id={`cinematic-card-${card.id}`}
                  className="rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] hover:border-[#72B818] transition-all duration-500 overflow-hidden flex flex-col group shadow-[0_12px_35px_rgba(20,40,25,0.08),0_2px_8px_rgba(20,40,25,0.04)] hover:shadow-[0_22px_50px_rgba(20,40,25,0.16)] relative"
                >
                  {/* Top Rim Light Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${isMetabolic ? 'via-[#EB651A]' : 'via-[#72B818]'} to-transparent z-20 pointer-events-none`} />

                  {/* 1. Imagem Fotográfica 100% Nítida com Iluminação de Estúdio & Sem Névoa */}
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#E2ECE0] border-b border-[#CCD8C4]">
                    <img
                      id={`card-img-${card.id}`}
                      src={card.image}
                      alt={card.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.04] saturate-[1.05] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />

                    {/* Tag de Categoria Flutuante com Alto Contraste & Acabamento Premium */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3.5 py-1 rounded-full font-mono text-xs font-black tracking-widest uppercase shadow-md inline-flex items-center gap-1.5 border border-white/40 backdrop-blur-md ${
                        isMetabolic 
                          ? 'bg-[#EB651A] text-white shadow-[0_4px_16px_rgba(235,101,26,0.45)]' 
                          : 'bg-[#72B818] text-[#0A160F] shadow-[0_4px_16px_rgba(114,184,24,0.4)]'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {card.categoryTag}
                      </span>
                    </div>
                  </div>

                  {/* Corpo do Card com Tipografia Editorial e Fundo Limpo e Estável */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      {/* 2. Badge Squircle + Título em Grafite Profundo */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                          isMetabolic
                            ? 'bg-gradient-to-br from-[#FFF4ED] to-[#FFE8DC] border-[#FDCDB3] text-[#EB651A]'
                            : 'bg-gradient-to-br from-[#F2F8ED] to-[#E5F2DF] border-[#CCD8C4] text-[#2C6E14]'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#0A160F] tracking-tight leading-snug">
                          {card.title}
                        </h3>
                      </div>

                      {/* Descrição em Tom Equilibrado e Confortável */}
                      <p className="text-sm text-[#384C3E] font-normal leading-relaxed mb-6">
                        {card.description}
                      </p>

                      {/* 3. Distribuição de Vantagens em Chips Estruturados */}
                      <div className="grid grid-cols-2 gap-2.5 my-6">
                        {card.advantages.map((adv, idxAdv) => (
                          <div key={idxAdv} className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-[#CCD8C4] shadow-xs">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                              isMetabolic
                                ? 'bg-[#FFF0E6] text-[#C84A07] border-[#FDCDB3]'
                                : 'bg-[#F2F8ED] text-[#2C6E14] border-[#CCD8C4]'
                            }`}>✓</span>
                            <span className="text-xs font-semibold text-[#0A160F] truncate">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Bloco de Preço & Botão de Alta Precisão */}
                    <div className="pt-6 mt-6 border-t border-[#CCD8C4] flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#566D5D] font-bold block mb-0.5">
                          INVESTIMENTO DIRETO
                        </span>
                        <div className="text-3xl sm:text-4xl font-mono font-black text-[#0A160F] tracking-tight leading-none">
                          {card.price}
                        </div>
                        <span className="text-xs text-[#566D5D] font-mono block mt-1.5 font-medium">
                          {card.period}
                        </span>
                      </div>

                      <button
                        id={`btn-select-protocol-${card.id}`}
                        onClick={() => handleCardClick(card)}
                        className="min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-r from-[#1B4D24] via-[#23582D] to-[#1B4D24] text-white hover:opacity-95 hover:shadow-[0_8px_24px_rgba(27,77,36,0.3)] hover:scale-105 active:scale-95 transition-all text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(27,77,36,0.2)] cursor-pointer shrink-0"
                      >
                        <span>Quero este</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Modo Tabela Comparativa Lado a Lado */
          <div className="rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] p-6 overflow-x-auto shadow-[0_12px_40px_rgba(20,40,25,0.08)]">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-[#CCD8C4] text-[#566D5D] font-mono">
                  <th className="py-4 px-3 w-1/4 font-bold">Critério de Precisão</th>
                  {CINEMATIC_PROTOCOLS.map((p) => (
                    <th key={p.id} className="py-4 px-3 text-[#0A160F] font-bold text-sm">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCD8C4] text-[#384C3E]">
                <tr>
                  <td className="py-3 px-3 font-bold text-[#0A160F]">Pilar & Categoria</td>
                  {CINEMATIC_PROTOCOLS.map((p, pIdx) => (
                    <td key={p.id} className={`py-3 px-3 font-mono font-bold ${pIdx < 2 ? 'text-[#C84A07]' : 'text-[#2C6E14]'}`}>{p.categoryTag}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#0A160F]">Investimento Total</td>
                  {CINEMATIC_PROTOCOLS.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-bold text-[#0A160F] text-sm">{p.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#0A160F]">Duração / Frequência</td>
                  {CINEMATIC_PROTOCOLS.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono text-[#566D5D]">{p.period}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#0A160F]">Vantagens Centrais</td>
                  {CINEMATIC_PROTOCOLS.map((p) => (
                    <td key={p.id} className="py-3 px-3">
                      <div className="space-y-1">
                        {p.advantages.map((adv, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#0A160F] font-medium">
                            <span className="text-[#2C6E14] font-bold">✓</span>
                            <span>{adv}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-[#0A160F]">Ação Direta</td>
                  {CINEMATIC_PROTOCOLS.map((p) => (
                    <td key={p.id} className="py-3 px-3">
                      <button
                        id={`comparison-select-btn-${p.id}`}
                        onClick={() => handleCardClick(p)}
                        className="min-h-[40px] px-4 py-2 rounded-full bg-[#1B4D24] text-white hover:bg-[#23582D] hover:shadow-[0_4px_12px_rgba(27,77,36,0.25)] font-bold text-xs transition-all cursor-pointer shadow-xs"
                      >
                        Quero este →
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Floating Concierge Assist Row */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white via-[#FAFDF7] to-[#FFF4ED] border border-[#CCD8C4] shadow-[0_8px_25px_rgba(20,40,25,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={VISUAL_ASSETS.conciergeAvatar.src}
              alt="Clara"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#CCD8C4] shadow-xs shrink-0"
            />
            <p className="text-xs sm:text-sm text-[#384C3E] font-medium">
              Em dúvida sobre qual protocolo é o mais indicado para o seu metabolismo e rotina?
            </p>
          </div>
          <button
            id="concierge-programs-help-btn"
            onClick={() => onOpenConcierge('Olá, gostaria de uma orientação clínica para saber qual dos protocolos (Recomposição 12 semanas, Reset de Glicose, Alta Performance ou Eixo Intestino-Cérebro) melhor se adapta às minhas necessidades atuais.')}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-white border border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:text-[#1B4D24] text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0 transition-all shadow-xs"
          >
            <img 
              src={VISUAL_ASSETS.conciergeAvatar.src}
              alt="Clara"
              className="w-4 h-4 rounded-full object-cover border border-[#CCD8C4]"
            />
            <span>Conversar com Concierge Clínico</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1B4D24]" />
          </button>
        </div>

      </div>
    </section>
  );
};
