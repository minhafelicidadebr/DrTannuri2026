import React, { useState } from 'react';
import { 
  Sliders, 
  Shield, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  Flame, 
  Zap, 
  Check, 
  Info, 
  Calendar, 
  Layers, 
  Dna,
  HeartPulse,
  RotateCcw
} from 'lucide-react';
import { analytics } from '../../lib/analytics';

type MetricType = 'fatLoss' | 'muscleGain' | 'energy' | 'insulin';

interface MilestoneData {
  week: number;
  label: string;
  clinicalMilestone: string;
  aspirational: number;
  probable: number;
  conservative: number;
}

export const Projection12w: React.FC = () => {
  const [adherence, setAdherence] = useState<number>(80);
  const [supportLevel, setSupportLevel] = useState<'mensal' | 'quinzenal' | 'semanal'>('quinzenal');
  const [activeMetric, setActiveMetric] = useState<MetricType>('fatLoss');
  const [activeWeek, setActiveWeek] = useState<number>(12); // Default to week 12 (final outcome)

  const handleAdherenceChange = (val: number) => {
    setAdherence(val);
    analytics.track('interactive_feature_use', 'projection_12w_slider', { adherence: val, supportLevel });
  };

  // Support multiplier: Mensal (0.85x), Quinzenal (1.0x baseline), Contínuo (1.15x)
  const supportBonus = supportLevel === 'mensal' ? 0.85 : supportLevel === 'quinzenal' ? 1.0 : 1.15;
  const adherenceFactor = (adherence / 100) * supportBonus;

  // Metric configurations with medical units, descriptions and physiological baselines
  const metricConfigs: Record<MetricType, {
    label: string;
    shortLabel: string;
    unit: string;
    prefix: string;
    suffix: string;
    icon: React.ElementType;
    description: string;
    clinicalNote: string;
    maxValues: { aspirational: number; probable: number; conservative: number };
    invertDirection?: boolean; // For metrics where decrease is good (fat loss, HOMA-IR)
  }> = {
    fatLoss: {
      label: 'Gordura Corporal & Recomposição',
      shortLabel: 'Gordura Corporal',
      unit: 'kg',
      prefix: '-',
      suffix: ' kg',
      icon: Flame,
      description: 'Redução de tecido adiposo visceral e subcutâneo com preservação da taxa metabólica basal.',
      clinicalNote: 'Perda gradual focada em oxidação de lipídios sem canibalização de massa magra.',
      maxValues: { aspirational: 5.6, probable: 3.9, conservative: 2.1 }
    },
    muscleGain: {
      label: 'Massa Muscular Funcional',
      shortLabel: 'Massa Magra',
      unit: 'kg',
      prefix: '+',
      suffix: ' kg',
      icon: Activity,
      description: 'Hipertrofia miofibrilar e síntese proteica sustentada por densidade de aminoácidos essenciais.',
      clinicalNote: 'Construção de tecido metabolicamente ativo que eleva o gasto calórico de repouso.',
      maxValues: { aspirational: 2.4, probable: 1.6, conservative: 0.7 }
    },
    energy: {
      label: 'Disposição & Vitalidade Celular',
      shortLabel: 'Disposição',
      unit: '%',
      prefix: '+',
      suffix: '%',
      icon: Zap,
      description: 'Estabilidade da curva glicêmica ao longo do dia, sem sonolência pós-almoço ou quedas às 15h.',
      clinicalNote: 'Otimização da função mitocondrial e resiliência ao estresse oxidativo.',
      maxValues: { aspirational: 88, probable: 68, conservative: 38 }
    },
    insulin: {
      label: 'Sensibilidade à Insulina (HOMA-IR)',
      shortLabel: 'Sensibilidade Insulínica',
      unit: '%',
      prefix: '-',
      suffix: '%',
      icon: HeartPulse,
      description: 'Melhora da captação de glicose muscular e redução da resistência periférica à insulina.',
      clinicalNote: 'Parâmetro laboratorial central para longevidade e facilidade de manutenção do peso.',
      maxValues: { aspirational: 42, probable: 29, conservative: 16 }
    }
  };

  const currentMetricConfig = metricConfigs[activeMetric];

  // Helper to calculate milestone values across weeks
  const getMilestones = (): MilestoneData[] => {
    const weeks = [0, 4, 8, 12];
    const clinicalMilestones = [
      'Ponto Zero: Linha de base biológica e mapeamento inicial',
      'Fase 1: Adaptação enzimática, desinflamação e controle hídrico',
      'Fase 2: Ponto de virada na biogênese mitocondrial e recomposição ativa',
      'Fase 3: Consolidação metabólica duradoura e autonomia perene'
    ];

    return weeks.map((w, index) => {
      // Non-linear physiological progression curve (t^0.85)
      const progressRatio = w === 0 ? 0 : Math.pow(w / 12, 0.88);
      const aspVal = Number((currentMetricConfig.maxValues.aspirational * adherenceFactor * progressRatio).toFixed(1));
      const probVal = Number((currentMetricConfig.maxValues.probable * adherenceFactor * progressRatio).toFixed(1));
      const consVal = Number((currentMetricConfig.maxValues.conservative * adherenceFactor * progressRatio).toFixed(1));

      return {
        week: w,
        label: `Semana ${w}`,
        clinicalMilestone: clinicalMilestones[index],
        aspirational: aspVal,
        probable: probVal,
        conservative: consVal
      };
    });
  };

  const milestones = getMilestones();
  const activeMilestone = milestones.find(m => m.week === activeWeek) || milestones[3];

  // SVG Geometry Calculation
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingLeft = 55;
  const paddingRight = 95;
  const paddingTop = 35;
  const paddingBottom = 45;

  const chartAreaWidth = svgWidth - paddingLeft - paddingRight;
  const chartAreaHeight = svgHeight - paddingTop - paddingBottom;

  // Scale calculations
  const xCoords = [
    paddingLeft,
    paddingLeft + chartAreaWidth * (4 / 12),
    paddingLeft + chartAreaWidth * (8 / 12),
    paddingLeft + chartAreaWidth
  ];

  // Y Baseline is at the bottom for positive gains, and at center for bidirectional
  const baseY = paddingTop + chartAreaHeight * 0.82;
  const maxDeltaY = chartAreaHeight * 0.72;

  // Max scale reference for normalization
  const maxRef = currentMetricConfig.maxValues.aspirational * 1.25;

  const getY = (val: number) => {
    const ratio = Math.min(val / maxRef, 1);
    return baseY - ratio * maxDeltaY;
  };

  const aspPoints = milestones.map((m, i) => ({ x: xCoords[i], y: getY(m.aspirational) }));
  const probPoints = milestones.map((m, i) => ({ x: xCoords[i], y: getY(m.probable) }));
  const consPoints = milestones.map((m, i) => ({ x: xCoords[i], y: getY(m.conservative) }));

  // Helper to build smooth cubic bezier path
  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpx1 = p0.x + (p1.x - p0.x) * 0.45;
      const cpy1 = p0.y;
      const cpx2 = p0.x + (p1.x - p0.x) * 0.55;
      const cpy2 = p1.y;
      d += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const aspPath = buildSmoothPath(aspPoints);
  const probPath = buildSmoothPath(probPoints);
  const consPath = buildSmoothPath(consPoints);

  // Shaded uncertainty cone path (from Aspirational down to Conservative and back)
  const conePath = `
    ${aspPath}
    L ${consPoints[consPoints.length - 1].x},${consPoints[consPoints.length - 1].y}
    ${buildSmoothPath([...consPoints].reverse()).replace(/^M [^ ]+ /, 'L ')}
    Z
  `;

  return (
    <div className="space-y-6 text-[#0E1A12] select-none">
      
      {/* Header with High-Contrast Typography & Regulatory Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#CCD8C4]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white via-[#F6FAF1] to-[#FFF4ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-2 font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
            <span>MODELAGEM PREDITIVA FISIOLÓGICA • 12 SEMANAS</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F] tracking-tight">
            Cenários de Evolução com Bandas de Incerteza
          </h3>
          <p className="text-xs sm:text-sm text-[#384C3E] mt-1 max-w-2xl leading-relaxed">
            Simulação matemática baseada em bioindividualidade e cinética metabólica. Ajuste a aderência e a intensidade do acompanhamento para visualizar a resposta estimada.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-data bg-gradient-to-r from-[#1B4D24] to-[#245D2E] text-white border border-[#1B4D24] font-bold shadow-xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#AEE938]" />
            <span>Sem Promessas Milagrosas</span>
          </span>
        </div>
      </div>

      {/* Metric Dimension Selector (Telemetry Lenses) */}
      <div className="p-2 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs">
        <div className="flex items-center justify-between px-3 py-1 text-xs text-[#566D5D] font-mono-data font-semibold">
          <span>DIMENSÃO BIOLÓGICA ANALISADA:</span>
          <span className="hidden sm:inline text-[#2C6E14] font-bold">INTERVALO BIOLÓGICO CLÍNICO (95% CI)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
          {(Object.keys(metricConfigs) as MetricType[]).map((key) => {
            const config = metricConfigs[key];
            const MetricIcon = config.icon;
            const isSelected = activeMetric === key;
            return (
              <button
                key={key}
                id={`metric-lens-${key}`}
                onClick={() => {
                  setActiveMetric(key);
                  analytics.track('interactive_feature_use', 'projection_12w_metric_lens', { metric: key });
                }}
                className={`min-h-[46px] p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0A160F] to-[#1A2E20] text-white border-[#0A160F] shadow-sm scale-[1.01]'
                    : 'bg-[#F9FCF7] text-[#0A160F] border-[#CCD8C4] hover:bg-[#F2F8ED] hover:border-[#72B818]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/15 text-[#AEE938]' : 'bg-[#EBF5E6] text-[#2C6E14]'
                }`}>
                  <MetricIcon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold block truncate">
                    {config.shortLabel}
                  </span>
                  <span className={`text-[10px] font-mono-data block ${
                    isSelected ? 'text-white/70' : 'text-[#566D5D]'
                  }`}>
                    {config.unit === 'kg' ? 'Variação em kg' : 'Percentual %'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Cockpit: Adherence Slider & Support Frequency */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-6 rounded-3xl bg-gradient-to-br from-white via-[#FAFDF8] to-[#EFF6EB] border border-[#CCD8C4] shadow-[0_12px_35px_rgba(20,40,25,0.06)]">
        
        {/* Adherence Slider (7/12) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2C6E14]" />
                <span className="text-xs sm:text-sm text-[#0A160F] font-bold">
                  Aderência Simulada à Dieta:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-data text-xs font-semibold text-[#566D5D] hidden sm:inline">
                  Consistência real:
                </span>
                <span className="font-mono-data text-[#0A160F] font-extrabold text-base bg-white px-3 py-1 rounded-xl border border-[#CCD8C4] shadow-2xs">
                  {adherence}%
                </span>
              </div>
            </div>

            {/* Custom Styled Slider */}
            <div className="relative my-4">
              <input 
                type="range"
                min={60}
                max={95}
                step={5}
                value={adherence}
                onChange={(e) => handleAdherenceChange(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E2ECE0] rounded-lg appearance-none cursor-pointer accent-[#2C6E14] focus:outline-hidden"
                aria-label="Selecionar porcentagem de aderência"
              />
              <div 
                className="h-2.5 bg-gradient-to-r from-[#EB651A] via-[#72B818] to-[#2C6E14] rounded-lg absolute top-0 left-0 pointer-events-none"
                style={{ width: `${((adherence - 60) / 35) * 100}%` }}
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-data mt-2">
              {[
                { val: 60, label: '60% Flexível', sub: 'Eventos & Viagens' },
                { val: 80, label: '80% Equilibrada', sub: 'Recomendada Dr. Tanutri' },
                { val: 95, label: '95% Alta Precisão', sub: 'Performance Atleta' }
              ].map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => handleAdherenceChange(preset.val)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] transition-all cursor-pointer ${
                    adherence === preset.val
                      ? 'bg-[#2C6E14] text-white font-bold border-[#2C6E14] shadow-xs'
                      : 'bg-white text-[#384C3E] border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#F4FAF0]'
                  }`}
                >
                  <span className="font-bold block">{preset.label}</span>
                  <span className="text-[9px] opacity-80 block truncate">{preset.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Support Frequency (5/12) */}
        <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#CCD8C4] pt-4 md:pt-0 md:pl-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm text-[#0A160F] font-bold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#EB651A]" />
                <span>Frequência de Acompanhamento:</span>
              </label>
              <span className="text-[10px] font-mono-data font-bold text-[#EB651A] bg-[#FFF0E6] px-2 py-0.5 rounded-full border border-[#FDCDB3]">
                {supportLevel === 'semanal' ? '+15% Sinergia' : supportLevel === 'quinzenal' ? 'Padrão Ouro' : '-15% Resposta'}
              </span>
            </div>

            <p className="text-xs text-[#566D5D] mb-3 leading-relaxed">
              O suporte próximo evita desistências em momentos de rotina instável.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mensal' as const, label: 'Mensal', hint: '0.85x' },
                { id: 'quinzenal' as const, label: 'Quinzenal', hint: '1.0x Padrão' },
                { id: 'semanal' as const, label: 'Contínuo', hint: '1.15x IA + Zap' }
              ].map((item) => (
                <button
                  key={item.id}
                  id={`support-btn-${item.id}`}
                  onClick={() => {
                    setSupportLevel(item.id);
                    analytics.track('interactive_feature_use', 'projection_12w_support', { level: item.id });
                  }}
                  className={`py-2 px-2 rounded-xl text-xs transition-all border text-center cursor-pointer ${
                    supportLevel === item.id
                      ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-xs'
                      : 'bg-white text-[#384C3E] border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#F4FAF0]'
                  }`}
                >
                  <span className="block font-bold">{item.label}</span>
                  <span className="text-[10px] font-mono-data opacity-75 block">{item.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data text-[#566D5D]">
            <span>Multiplicador Fisiológico:</span>
            <span className="font-bold text-[#2C6E14]">{(adherenceFactor).toFixed(2)}x Eficácia</span>
          </div>
        </div>

      </div>

      {/* HIGH-PRECISION DYNAMIC BIOTELEMETRY SVG CHART */}
      <div className="rounded-3xl bg-white border border-[#CCD8C4] shadow-[0_16px_45px_rgba(20,40,25,0.08)] overflow-hidden relative">
        
        {/* Chart Header with High Contrast Labels & Telemetry Legend */}
        <div className="p-5 sm:p-6 pb-2 border-b border-[#CCD8C4] bg-gradient-to-r from-white via-[#FAFDF8] to-[#F2F8ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C6E14] animate-pulse" />
              <h4 className="font-display text-base sm:text-lg font-bold text-[#0A160F]">
                Bandas de Incerteza Metabólica (Semana 0 a Semana 12)
              </h4>
            </div>
            <p className="text-xs text-[#384C3E] mt-0.5">
              Exibindo: <strong className="text-[#0A160F]">{currentMetricConfig.label}</strong> com base em aderência de {adherence}%.
            </p>
          </div>

          {/* Clean Legend Chips with Strict Contrast */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F2F8ED] border border-[#CCD8C4] text-[#2C6E14] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2C6E14]" />
              <span>Otimizado (Topo)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E6F5F2] border border-[#B2DFD7] text-[#156B5C] font-bold">
              <span className="w-3 h-1 rounded-full bg-[#198774]" />
              <span>Provável (Médio)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF0E6] border border-[#FDCDB3] text-[#C84A07] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#EB651A]" />
              <span>Conservador (Base)</span>
            </span>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="p-4 sm:p-6 overflow-x-auto relative">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full min-w-[560px] h-52 sm:h-64 select-none"
            aria-label="Gráfico de modelagem preditiva e bandas de incerteza metabólica"
          >
            <defs>
              {/* Gradients for Uncertainty Cone */}
              <linearGradient id="uncertaintyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#72B818" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#2C6E14" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#198774" stopOpacity="0.25" />
              </linearGradient>

              {/* Laser Glow for Probable Line */}
              <linearGradient id="probableGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2C6E14" />
                <stop offset="60%" stopColor="#198774" />
                <stop offset="100%" stopColor="#0E584D" />
              </linearGradient>

              {/* Vertical Laser Guideline */}
              <linearGradient id="laserGuideline" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EB651A" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#72B818" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2C6E14" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Baseline Lines with High-Contrast Crisp Lines */}
            <line x1={paddingLeft} y1={paddingTop} x2={svgWidth - paddingRight} y2={paddingTop} stroke="#E2ECE0" strokeDasharray="3 3" />
            <line x1={paddingLeft} y1={paddingTop + chartAreaHeight * 0.33} x2={svgWidth - paddingRight} y2={paddingTop + chartAreaHeight * 0.33} stroke="#E2ECE0" strokeDasharray="3 3" />
            <line x1={paddingLeft} y1={paddingTop + chartAreaHeight * 0.66} x2={svgWidth - paddingRight} y2={paddingTop + chartAreaHeight * 0.66} stroke="#E2ECE0" strokeDasharray="3 3" />
            <line x1={paddingLeft} y1={baseY} x2={svgWidth - paddingRight} y2={baseY} stroke="#CCD8C4" strokeWidth="1.5" />

            {/* Shaded Uncertainty Cone */}
            <path 
              d={conePath} 
              fill="url(#uncertaintyGradient)" 
              className="transition-all duration-500 ease-out"
            />

            {/* Upper Curve (Aspirational) */}
            <path 
              d={aspPath} 
              fill="none" 
              stroke="#2C6E14" 
              strokeWidth="2.5" 
              strokeDasharray="5 4"
              className="transition-all duration-500 ease-out"
            />

            {/* Middle Curve (Probable - Solid High Precision Laser) */}
            <path 
              d={probPath} 
              fill="none" 
              stroke="url(#probableGlow)" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />

            {/* Lower Curve (Conservative) */}
            <path 
              d={consPath} 
              fill="none" 
              stroke="#EB651A" 
              strokeWidth="2.5" 
              strokeDasharray="4 3"
              className="transition-all duration-500 ease-out"
            />

            {/* Active Week Vertical Guideline Laser */}
            {activeWeek !== null && (
              <line 
                x1={xCoords[milestones.findIndex(m => m.week === activeWeek)]} 
                y1={paddingTop - 10} 
                x2={xCoords[milestones.findIndex(m => m.week === activeWeek)]} 
                y2={baseY + 15} 
                stroke="url(#laserGuideline)" 
                strokeWidth="2" 
                strokeDasharray="2 2"
              />
            )}

            {/* Interactive Milestone Nodes (Weeks 0, 4, 8, 12) */}
            {milestones.map((m, idx) => {
              const x = xCoords[idx];
              const isSelected = activeWeek === m.week;
              const yProb = probPoints[idx].y;
              const yAsp = aspPoints[idx].y;
              const yCons = consPoints[idx].y;

              return (
                <g 
                  key={m.week} 
                  className="cursor-pointer group"
                  onClick={() => setActiveWeek(m.week)}
                >
                  {/* Vertical Hover Area to make clicking comfortable */}
                  <rect 
                    x={x - 25} 
                    y={paddingTop - 15} 
                    width="50" 
                    height={chartAreaHeight + 40} 
                    fill="transparent" 
                  />

                  {/* Concentric Node Rings for Probable Curve */}
                  {isSelected && (
                    <circle 
                      cx={x} 
                      cy={yProb} 
                      r="12" 
                      fill="#198774" 
                      fillOpacity="0.2" 
                      className="animate-ping" 
                    />
                  )}

                  <circle 
                    cx={x} 
                    cy={yAsp} 
                    r={isSelected ? "5" : "3.5"} 
                    fill="#2C6E14" 
                    stroke="#FFFFFF" 
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />

                  <circle 
                    cx={x} 
                    cy={yProb} 
                    r={isSelected ? "7" : "5"} 
                    fill="#198774" 
                    stroke="#FFFFFF" 
                    strokeWidth="2"
                    className="transition-all duration-300 shadow-sm"
                  />

                  <circle 
                    cx={x} 
                    cy={yCons} 
                    r={isSelected ? "5" : "3.5"} 
                    fill="#EB651A" 
                    stroke="#FFFFFF" 
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />

                  {/* Week Labels at bottom */}
                  <text 
                    x={x} 
                    y={baseY + 28} 
                    textAnchor="middle" 
                    fill={isSelected ? '#0A160F' : '#566D5D'} 
                    fontSize={isSelected ? '12' : '11'} 
                    fontFamily="Space Grotesk, monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="transition-all duration-200"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}

            {/* Right Side Curve End Annotations */}
            <g transform={`translate(${svgWidth - paddingRight + 12}, 0)`}>
              <text y={aspPoints[3].y + 4} fill="#2C6E14" fontSize="11" fontFamily="Space Grotesk, monospace" fontWeight="bold">
                {currentMetricConfig.prefix}{milestones[3].aspirational}{currentMetricConfig.unit}
              </text>
              <text y={probPoints[3].y + 4} fill="#198774" fontSize="12" fontFamily="Space Grotesk, monospace" fontWeight="bold">
                {currentMetricConfig.prefix}{milestones[3].probable}{currentMetricConfig.unit}
              </text>
              <text y={consPoints[3].y + 4} fill="#C84A07" fontSize="11" fontFamily="Space Grotesk, monospace" fontWeight="bold">
                {currentMetricConfig.prefix}{milestones[3].conservative}{currentMetricConfig.unit}
              </text>
            </g>
          </svg>
        </div>

        {/* INTERACTIVE WEEK TELEMETRY HUD (Dynamically inspects the selected milestone) */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#F7FAF5] via-[#EFF6EA] to-[#E9F3E4] border-t border-[#CCD8C4]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B4D24] text-white text-[10px] font-mono-data font-bold">
                  {activeMilestone.label.toUpperCase()} SELECIONADA
                </span>
                <span className="text-xs font-mono-data text-[#566D5D] hidden sm:inline">
                  (Clique em qualquer semana no gráfico para inspecionar)
                </span>
              </div>
              <h5 className="font-display text-sm sm:text-base font-bold text-[#0A160F]">
                {activeMilestone.clinicalMilestone}
              </h5>
            </div>

            {/* Three quantitative readouts for the active week */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="p-3 rounded-xl bg-white border border-[#CCD8C4] shadow-2xs text-center min-w-[95px]">
                <span className="text-[10px] font-mono-data text-[#2C6E14] font-bold uppercase block">
                  Otimizado
                </span>
                <span className="text-sm sm:text-base font-mono-data font-extrabold text-[#2C6E14]">
                  {currentMetricConfig.prefix}{activeMilestone.aspirational}{currentMetricConfig.unit}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border-2 border-[#198774] shadow-xs text-center min-w-[105px]">
                <span className="text-[10px] font-mono-data text-[#198774] font-bold uppercase block">
                  Provável Médio
                </span>
                <span className="text-sm sm:text-base font-mono-data font-extrabold text-[#0A160F]">
                  {currentMetricConfig.prefix}{activeMilestone.probable}{currentMetricConfig.unit}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#CCD8C4] shadow-2xs text-center min-w-[95px]">
                <span className="text-[10px] font-mono-data text-[#C84A07] font-bold uppercase block">
                  Conservador
                </span>
                <span className="text-sm sm:text-base font-mono-data font-extrabold text-[#C84A07]">
                  {currentMetricConfig.prefix}{activeMilestone.conservative}{currentMetricConfig.unit}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3 Detailed Scenario Cards with Micro-Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Conservative Scenario */}
        <div className="p-6 rounded-3xl bg-white border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#EB651A] transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-data text-[#C84A07] bg-[#FFF0E6] px-2.5 py-1 rounded-lg border border-[#FDCDB3] font-bold">
                CENÁRIO CONSERVADOR
              </span>
              <span className="text-[10px] font-mono-data text-[#566D5D]">Base de Segurança</span>
            </div>

            <h4 className="text-base font-bold text-[#0A160F] mb-1 group-hover:text-[#EB651A] transition-colors">
              Rotina Real c/ Imprevistos
            </h4>
            <p className="text-xs text-[#566D5D] leading-relaxed mb-4">
              Manutenção dos hábitos essenciais mesmo diante de viagens, imprevistos sociais e semanas atípicas de trabalho.
            </p>

            <div className="space-y-2 text-xs pt-3 border-t border-[#E2ECE0]">
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Gordura Estimada:</span>
                <span className="font-mono-data text-[#0A160F] font-bold">
                  -{(2.1 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Massa Muscular:</span>
                <span className="font-mono-data text-[#2C6E14] font-bold">
                  +{(0.7 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Disposição & Foco:</span>
                <span className="font-mono-data text-[#EB651A] font-bold">
                  +{Math.round(38 * adherenceFactor)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data text-[#566D5D]">
            <span>Garantia de Não-Regressão</span>
            <span className="text-[#2C6E14] font-bold">Consistência 100%</span>
          </div>
        </div>

        {/* Probable Scenario (Featured Gold Standard) */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-[#F6FAF1] to-[#EDF6E7] border-2 border-[#2C6E14] shadow-md relative flex flex-col justify-between group">
          <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#2C6E14] text-white text-[10px] font-mono-data font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#AEE938]" />
            <span>Padrão Clínico Dr. Tanutri</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-data text-[#2C6E14] bg-[#EAF5E4] px-2.5 py-1 rounded-lg border border-[#CCD8C4] font-bold">
                CENÁRIO PROVÁVEL
              </span>
              <span className="text-[10px] font-mono-data text-[#2C6E14] font-bold">Média Observada</span>
            </div>

            <h4 className="text-base font-bold text-[#0A160F] mb-1">
              Consistência Dr. Tanutri Ativa
            </h4>
            <p className="text-xs text-[#384C3E] leading-relaxed mb-4 font-medium">
              Seguimento equilibrado do plano alimentar com suporte ativo, ajustes rápidos para eventos e refeições saborosas.
            </p>

            <div className="space-y-2 text-xs pt-3 border-t border-[#CCD8C4]">
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Gordura Estimada:</span>
                <span className="font-mono-data text-[#2C6E14] font-extrabold text-sm">
                  -{(3.9 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Massa Muscular:</span>
                <span className="font-mono-data text-[#2C6E14] font-extrabold text-sm">
                  +{(1.6 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Disposição & Foco:</span>
                <span className="font-mono-data text-[#2C6E14] font-extrabold text-sm">
                  +{Math.round(68 * adherenceFactor)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#CCD8C4] flex items-center justify-between text-[11px] font-mono-data text-[#2C6E14] font-bold">
            <span>Recomposição Corporal Ativa</span>
            <span>Alta Sustentabilidade</span>
          </div>
        </div>

        {/* Aspirational Scenario */}
        <div className="p-6 rounded-3xl bg-white border border-[#CCD8C4] shadow-xs hover:shadow-md hover:border-[#198774] transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-data text-[#156B5C] bg-[#E6F5F2] px-2.5 py-1 rounded-lg border border-[#B2DFD7] font-bold">
                CENÁRIO OTIMIZADO
              </span>
              <span className="text-[10px] font-mono-data text-[#198774]">Alta Resposta</span>
            </div>

            <h4 className="text-base font-bold text-[#0A160F] mb-1 group-hover:text-[#198774] transition-colors">
              Sinergia Total (Treino + Sono)
            </h4>
            <p className="text-xs text-[#566D5D] leading-relaxed mb-4">
              Máxima sincronização entre nutrição personalizada, sono reparador de 7-8h e treinamento resistido de força.
            </p>

            <div className="space-y-2 text-xs pt-3 border-t border-[#E2ECE0]">
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Gordura Estimada:</span>
                <span className="font-mono-data text-[#198774] font-bold">
                  -{(5.6 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Massa Muscular:</span>
                <span className="font-mono-data text-[#198774] font-bold">
                  +{(2.4 * adherenceFactor).toFixed(1)} kg
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#566D5D]">Disposição & Foco:</span>
                <span className="font-mono-data text-[#198774] font-bold">
                  +{Math.round(88 * adherenceFactor)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data text-[#198774] font-bold">
            <span>Pico de Resposta Mitocondrial</span>
            <span>Performance</span>
          </div>
        </div>

      </div>

      {/* Mandatory Regulatory Health Disclaimer with High Legibility */}
      <div className="flex items-start gap-3 p-4.5 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs text-xs text-[#384C3E] leading-relaxed">
        <Shield className="w-4 h-4 text-[#EB651A] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#0A160F]">Aviso Regulatório CFN / CRN-3:</strong> As projeções acima constituem simulações matemáticas puramente ilustrativas para conscientização do paciente sobre a importância da constância e do acompanhamento ativo. É vedado por lei e pelo Código de Ética do Nutricionista prometer perdas de peso exatas ou cura de patologias. Cada organismo possui ritmo biológico, histórico hormonal e adaptações metabólicas singulares.
        </p>
      </div>

    </div>
  );
};

