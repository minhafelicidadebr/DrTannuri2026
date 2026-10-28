import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import { analytics } from '../../lib/analytics';

type Period = '4w' | '8w' | '12w';

export const BodyDashboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('12w');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Demo Dataset tracking recomposition evolution over 12 weeks
  const dataset = {
    '4w': {
      weight: { initial: 78.4, current: 77.1, delta: -1.3, isPositive: true },
      muscle: { initial: 31.2, current: 31.9, delta: +0.7, isPositive: true },
      fatPercent: { initial: 24.8, current: 23.2, delta: -1.6, isPositive: true },
      water: { initial: 52.1, current: 53.4, delta: +1.3, isPositive: true },
      visceral: { initial: 7, current: 6, delta: -1, isPositive: true },
      sparklines: {
        weight: [78.4, 78.0, 77.5, 77.1],
        muscle: [31.2, 31.4, 31.6, 31.9],
        fatPercent: [24.8, 24.1, 23.6, 23.2]
      }
    },
    '8w': {
      weight: { initial: 78.4, current: 75.8, delta: -2.6, isPositive: true },
      muscle: { initial: 31.2, current: 32.5, delta: +1.3, isPositive: true },
      fatPercent: { initial: 24.8, current: 21.6, delta: -3.2, isPositive: true },
      water: { initial: 52.1, current: 54.6, delta: +2.5, isPositive: true },
      visceral: { initial: 7, current: 5, delta: -2, isPositive: true },
      sparklines: {
        weight: [78.4, 77.8, 77.1, 76.6, 76.2, 75.8],
        muscle: [31.2, 31.5, 31.8, 32.0, 32.3, 32.5],
        fatPercent: [24.8, 24.0, 23.2, 22.7, 22.1, 21.6]
      }
    },
    '12w': {
      weight: { initial: 78.4, current: 74.9, delta: -3.5, isPositive: true },
      muscle: { initial: 31.2, current: 33.1, delta: +1.9, isPositive: true },
      fatPercent: { initial: 24.8, current: 19.8, delta: -5.0, isPositive: true },
      water: { initial: 52.1, current: 55.8, delta: +3.7, isPositive: true },
      visceral: { initial: 7, current: 4, delta: -3, isPositive: true },
      sparklines: {
        weight: [78.4, 77.9, 77.3, 76.8, 76.4, 75.9, 75.5, 75.2, 75.0, 74.9],
        muscle: [31.2, 31.4, 31.7, 32.0, 32.2, 32.5, 32.7, 32.8, 33.0, 33.1],
        fatPercent: [24.8, 24.2, 23.5, 22.8, 22.1, 21.5, 20.9, 20.5, 20.1, 19.8]
      }
    }
  };

  const currentData = dataset[period];

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    analytics.track('interactive_feature_use', 'body_dashboard_period', { period: p });
  };

  // Helper to draw clean SVG sparkline
  const renderSparkline = (points: number[], color: string) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 120;
    const height = 28;
    const step = width / (points.length - 1);

    const coords = points.map((val, i) => ({
      x: i * step,
      y: height - ((val - min) / range) * (height - 6) - 3
    }));

    const d = coords.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, '');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-24 h-6 overflow-visible">
        <path 
          d={d} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <circle 
          cx={coords[coords.length - 1].x} 
          cy={coords[coords.length - 1].y} 
          r="3" 
          fill={color} 
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6 text-[#0E1A12]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E4D9]">
        <div>
          <span className="text-xs font-mono-data text-[#8C6D2B] font-bold uppercase tracking-wider">
            Evolução de Bioimpedância Clínica
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0A160F]">
            Painel de Composição Corporal
          </h3>
          <p className="text-xs sm:text-sm text-[#384C3E]">
            Veja a diferença entre perder peso na balança e conquistar recomposição corporal verdadeira.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF9F5] border border-[#CCD6C0] shadow-xs self-start sm:self-center">
          {(['4w', '8w', '12w'] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-3 py-1 rounded-lg text-xs font-mono-data transition-all cursor-pointer ${
                period === p
                  ? 'bg-[#1B4D24] text-white font-bold shadow-sm'
                  : 'text-[#5C7262] hover:text-[#0A160F]'
              }`}
            >
              {p === '4w' ? '4 Semanas' : p === '8w' ? '8 Semanas' : '12 Semanas'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
        
        {/* Muscle Mass */}
        <div className="p-5.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_26px_rgba(20,38,25,0.09)] transition-all relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-data text-[#1E4413] font-bold">Massa Muscular Esquelética</span>
            {renderSparkline(currentData.sparklines.muscle, '#2B6316')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-[#0A160F]">
              {currentData.muscle.current} <span className="text-sm font-normal text-[#5C7262]">kg</span>
            </span>
            <span className="text-xs font-mono-data text-[#2B6316] font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +{currentData.muscle.delta} kg
            </span>
          </div>
          <div className="mt-3.5 pt-3 border-t border-[#E8E4D9] flex items-center justify-between text-[11px] text-[#5C7262]">
            <span>Início: {currentData.muscle.initial} kg</span>
            <span className="text-[#2B6316] font-bold">Ganho funcional limpo</span>
          </div>
        </div>

        {/* Body Fat % */}
        <div className="p-5.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_26px_rgba(20,38,25,0.09)] transition-all relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-data text-[#1E7266] font-bold">% Gordura Corporal</span>
            {renderSparkline(currentData.sparklines.fatPercent, '#1E7266')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-[#0A160F]">
              {currentData.fatPercent.current} <span className="text-sm font-normal text-[#5C7262]">%</span>
            </span>
            <span className="text-xs font-mono-data text-[#1E7266] font-bold flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              {currentData.fatPercent.delta}%
            </span>
          </div>
          <div className="mt-3.5 pt-3 border-t border-[#E8E4D9] flex items-center justify-between text-[11px] text-[#5C7262]">
            <span>Início: {currentData.fatPercent.initial}%</span>
            <span className="text-[#1E7266] font-bold">Redução adiposa seletiva</span>
          </div>
        </div>

        {/* Visceral Fat & Hydration */}
        <div className="p-5.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_26px_rgba(20,38,25,0.09)] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-data text-[#8C6D2B] font-bold">Nível de Gordura Visceral</span>
              <span className="text-xs font-mono-data px-2.5 py-0.5 rounded-md bg-[#E8F5D5] text-[#1E4413] border border-[#8CC62D]/60 font-bold">
                Nível {currentData.visceral.current} (Ótimo)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-[#0A160F]">
                {currentData.visceral.current} <span className="text-sm font-normal text-[#5C7262]">/ 20</span>
              </span>
              <span className="text-xs font-mono-data text-[#2B6316] font-bold">
                {currentData.visceral.delta} níveis
              </span>
            </div>
          </div>
          <div className="mt-3.5 pt-3 border-t border-[#E8E4D9] flex items-center justify-between text-[11px] text-[#5C7262]">
            <span>Hidratação Celular: {currentData.water.current}%</span>
            <span className="text-[#8C6D2B] font-bold">Zero retenção</span>
          </div>
        </div>

      </div>

      {/* Clinical Recomposition Insight */}
      <div className="p-5.5 rounded-2xl bg-[#F8FAF5] border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-[#0A160F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3D7717]" />
            A Mágica da Recomposição Corporal: Peso Estável, Corpo Transformado
          </h4>
          <p className="text-xs text-[#384C3E] mt-1 max-w-2xl leading-relaxed">
            Neste período simulado de {period === '4w' ? '4' : period === '8w' ? '8' : '12'} semanas, a balança comum registrou apenas {Math.abs(currentData.weight.delta)} kg perdidos. No entanto, o paciente ganhou <strong className="text-[#1E4413]">+{currentData.muscle.delta} kg de músculo</strong> e eliminou <strong className="text-[#1E7266]">{Math.abs(currentData.fatPercent.delta)}% de gordura pura</strong>.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] font-mono-data text-[#8C6D2B] font-semibold block">Protocolo Associado:</span>
          <span className="text-xs font-bold text-[#0A160F]">Metabolismo de Precisão</span>
        </div>
      </div>

      <p className="text-[11px] text-[#5C7262] text-center pt-1">
        *Dataset demonstrativo ilustrativo extraído de caso padrão com acompanhamento quinzenal. Resultados clínicos reais variam individualmente conforme genética, adesão e histórico médico.
      </p>
    </div>
  );
};
