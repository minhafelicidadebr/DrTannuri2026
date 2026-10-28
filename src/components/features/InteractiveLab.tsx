import React, { useState } from 'react';
import { Activity, Utensils, Zap, Sliders, LineChart, Sparkles, HelpCircle } from 'lucide-react';
import { MetabolicTwin } from './MetabolicTwin';
import { PilotDay } from './PilotDay';
import { GlucoseSim } from './GlucoseSim';
import { BodyDashboard } from './BodyDashboard';
import { Projection12w } from './Projection12w';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { analytics } from '../../lib/analytics';

interface InteractiveLabProps {
  initialTool?: string;
  onOpenConcierge: (context?: string) => void;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ initialTool = 'metabolic_twin', onOpenConcierge }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTool);

  const tabs = [
    { id: 'metabolic_twin', label: 'Gêmeo Metabólico', icon: Activity, badge: 'Energia' },
    { id: 'pilot_day', label: 'Plano-Piloto 24h', icon: Utensils, badge: 'Cardápio' },
    { id: 'glucose_sim', label: 'Curva Glicêmica', icon: Zap, badge: 'Fisiologia' },
    { id: 'body_dashboard', label: 'Painel de Composição', icon: LineChart, badge: 'InBody' },
    { id: 'projection_12w', label: 'Cenários 12 Semanas', icon: Sliders, badge: 'Projeção' },
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    analytics.track('interactive_feature_start', 'lab_tab', { tool: id });
  };

  return (
    <section id="lab-interativo" className="py-20 md:py-28 relative bg-gradient-to-b from-[#EAF2E6] via-[#E4EDE0] to-[#EAF2E6] text-[#0E1A12] border-y border-[#CCD8C4] overflow-hidden" aria-labelledby="lab-title">
      {/* Subtle Precision Bio-Metric Grid in pale green */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(114,184,24,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(114,184,24,0.12)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Organic Light Ambient Spotlights in the background band */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-[#72B818]/15 via-[#EB651A]/8 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#EB651A]/10 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-[#72B818]/10 to-transparent rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with High Contrast and Precision Badging */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
            <span>SIMULADORES BIOMÉTRICOS • CIÊNCIA VISUAL</span>
          </div>
          <h2 id="lab-title" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight leading-[1.15] font-bold">
            Sinta a precisão da metodologia antes da sua consulta
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal max-w-xl mx-auto leading-relaxed">
            Traduzimos fisiologia complexa em clareza imediata. Interaja com os simuladores abaixo para entender como ajustes estratégicos potencializam sua queima energética, saciedade e longevidade.
          </p>
        </div>

        {/* Tab Navigation Pill Bar on Luminous Surface - Wrapped, No Clipping */}
        <div 
          role="tablist" 
          aria-label="Simuladores do Laboratório Interativo"
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 px-2 max-w-full"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`lab-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`lab-panel-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`min-h-[46px] flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-[0_4px_16px_rgba(27,77,36,0.25)] scale-[1.02]'
                    : 'bg-gradient-to-br from-white to-[#F8FAF5] text-[#384C3E] border-[#CCD8C4] hover:border-[#72B818] hover:text-[#0A160F] shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#EB651A]' : 'text-[#566D5D]'}`} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold ${
                  isActive 
                    ? 'bg-[#EB651A] text-white' 
                    : 'bg-[#EDF4EA] text-[#2C6E14]'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lab Content Container - Frame em degradê acetinado com detalhes sutis */}
        <div 
          id={`lab-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`lab-tab-${activeTab}`}
          className="rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] p-6 sm:p-9 shadow-[0_16px_50px_rgba(20,40,25,0.08),0_2px_6px_rgba(20,40,25,0.03)] relative overflow-hidden text-[#0E1A12]"
        >
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EB651A] to-transparent pointer-events-none" />

          {/* Micro Status Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#CCD8C4] text-xs font-mono-data text-[#566D5D]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
              <span className="text-[#0A160F] font-bold">CONSOLE BIOMÉTRICA DE PRECISÃO</span>
            </div>
            <span className="text-[#2C6E14] bg-[#EDF4EA] px-2.5 py-0.5 rounded-full border border-[#CCD8C4] hidden sm:inline-block font-bold">
              SIMULAÇÃO FISIOLÓGICA ATIVA
            </span>
          </div>

          {activeTab === 'metabolic_twin' && <MetabolicTwin />}
          {activeTab === 'pilot_day' && <PilotDay />}
          {activeTab === 'glucose_sim' && <GlucoseSim />}
          {activeTab === 'body_dashboard' && <BodyDashboard />}
          {activeTab === 'projection_12w' && <Projection12w />}
        </div>

        {/* Contextual Disclaimers & Concierge Bridge */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs font-mono-data text-[#5C7262]">
          <span className="text-center sm:text-left">
            * Simulação ilustrativa com base em modelos de cinética de glicose e balanço energético. CFN/CRN-3.
          </span>
          <button
            id="lab-concierge-context-btn"
            onClick={() => onOpenConcierge(`Gostaria de tirar uma dúvida sobre os dados mostrados no simulador ${activeTab}`)}
            className="min-h-[44px] inline-flex items-center gap-2 text-[#2B6316] hover:text-[#19420B] hover:underline font-semibold cursor-pointer py-1"
          >
            <img 
              src={VISUAL_ASSETS.conciergeAvatar.src}
              alt="Clara"
              className="w-5 h-5 rounded-full object-cover border border-[#AEE938] shadow-2xs"
            />
            <span>Tirar dúvida sobre este simulador com a Assistente de IA</span>
          </button>
        </div>

      </div>
    </section>
  );
};
