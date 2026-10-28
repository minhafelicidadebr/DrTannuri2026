import React, { useState } from 'react';
import { Activity, Info, Sparkles, Scale, RefreshCw } from 'lucide-react';
import { analytics } from '../../lib/analytics';

export const MetabolicTwin: React.FC = () => {
  const [age, setAge] = useState(34);
  const [activity, setActivity] = useState<'leve' | 'moderada' | 'intensa'>('moderada');
  const [goal, setGoal] = useState<'recomposicao' | 'energia' | 'longevidade'>('recomposicao');
  const [compareMode, setCompareMode] = useState(false);

  // Calculations for illustrative metabolic twin
  const baseTMB = Math.round(1450 + (40 - age) * 4);
  const activityMultiplier = activity === 'leve' ? 1.25 : activity === 'moderada' ? 1.45 : 1.7;
  const estimatedTEE = Math.round(baseTMB * activityMultiplier);

  // Macro distributions (%):
  const macros = {
    recomposicao: { p: 30, c: 40, g: 30, fiber: 32 },
    energia: { p: 25, c: 45, g: 30, fiber: 35 },
    longevidade: { p: 25, c: 40, g: 35, fiber: 38 }
  }[goal];

  const standardMacros = { p: 15, c: 55, g: 30, fiber: 18 };

  const handleGoalChange = (newGoal: typeof goal) => {
    setGoal(newGoal);
    analytics.track('interactive_feature_use', 'metabolic_twin', { goal: newGoal, age, activity });
  };

  return (
    <div className="space-y-6 text-[#0E1A12]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E4D9]">
        <div>
          <span className="text-xs font-mono-data text-[#2B6316] font-bold uppercase tracking-wider">
            Simulador de Precisão
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0A160F]">
            Gêmeo Metabólico Virtual
          </h3>
          <p className="text-xs sm:text-sm text-[#384C3E]">
            Simule como idade, rotina de treino e objetivos alteram a partição energética e os macronutrientes ideais.
          </p>
        </div>

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono-data transition-all border self-start sm:self-center flex items-center gap-1.5 cursor-pointer shadow-xs ${
            compareMode 
              ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-sm' 
              : 'bg-white text-[#384C3E] border-[#CCD6C0] hover:border-[#8CC62D] hover:text-[#0A160F]'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-[#3D7717]" />
          <span>{compareMode ? 'Modo Normal' : 'Comparar c/ Dieta Padrão'}</span>
        </button>
      </div>

      {/* Control Sliders & Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)]">
        
        {/* Age */}
        <div>
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-[#5C7262] font-medium">Idade Declarada:</span>
            <span className="font-mono-data text-[#1E4413] font-bold text-sm bg-[#EBF7DA] px-2 py-0.5 rounded border border-[#AEE938]">{age} anos</span>
          </div>
          <input 
            type="range"
            min={20}
            max={65}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-[#3D7717] cursor-pointer"
            aria-label="Selecionar idade"
          />
          <div className="flex justify-between text-[10px] text-[#5C7262] font-mono-data mt-1">
            <span>20 anos</span>
            <span>40 anos</span>
            <span>65 anos</span>
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="text-xs text-[#5C7262] font-medium block mb-2">Nível de Atividade Física:</label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['leve', 'moderada', 'intensa'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActivity(lvl)}
                className={`py-1.5 px-2 rounded-lg text-xs capitalize transition-all border cursor-pointer ${
                  activity === lvl
                    ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-xs'
                    : 'bg-[#FAF9F5] text-[#384C3E] border-[#CCD6C0] hover:border-[#8CC62D]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="text-xs text-[#5C7262] font-medium block mb-2">Alvo Metabólico:</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'recomposicao' as const, label: 'Músculo' },
              { id: 'energia' as const, label: 'Energia' },
              { id: 'longevidade' as const, label: 'Saúde' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => handleGoalChange(g.id)}
                className={`py-1.5 px-2 rounded-lg text-xs transition-all border cursor-pointer ${
                  goal === g.id
                    ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-xs'
                    : 'bg-[#FAF9F5] text-[#384C3E] border-[#CCD6C0] hover:border-[#8CC62D]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Numerical Estimates Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_24px_rgba(20,38,25,0.08)] transition-all">
          <span className="text-[11px] text-[#5C7262] font-mono-data font-semibold">Taxa Basal Estimada</span>
          <div className="text-xl font-bold font-display text-[#0A160F] mt-1">
            {baseTMB} <span className="text-xs font-normal text-[#5C7262]">kcal/dia</span>
          </div>
          <span className="text-[10px] text-[#8C6D2B] font-bold block mt-1">Metabolismo em repouso</span>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_24px_rgba(20,38,25,0.08)] transition-all">
          <span className="text-[11px] text-[#5C7262] font-mono-data font-semibold">Gasto Diário Total</span>
          <div className="text-xl font-bold font-display text-[#224816] mt-1">
            {estimatedTEE} <span className="text-xs font-normal text-[#5C7262]">kcal/dia</span>
          </div>
          <span className="text-[10px] text-[#2B6316] font-bold block mt-1">Com atividade ajustada</span>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_24px_rgba(20,38,25,0.08)] transition-all">
          <span className="text-[11px] text-[#5C7262] font-mono-data font-semibold">Proteína Alvo</span>
          <div className="text-xl font-bold font-display text-[#0A160F] mt-1">
            {macros.p}% <span className="text-xs font-normal text-[#5C7262]">do VET</span>
          </div>
          <span className="text-[10px] text-[#1E7266] font-bold block mt-1">Alta saciedade e reparo</span>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_24px_rgba(20,38,25,0.08)] transition-all">
          <span className="text-[11px] text-[#5C7262] font-mono-data font-semibold">Fibras Funcionais</span>
          <div className="text-xl font-bold font-display text-[#0A160F] mt-1">
            {macros.fiber}g <span className="text-xs font-normal text-[#5C7262]">meta/dia</span>
          </div>
          <span className="text-[10px] text-[#2B6316] font-bold block mt-1">Microbiota & controle</span>
        </div>
      </div>

      {/* Visual Macro Bar Chart */}
      <div className="p-5.5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-[#0A160F]">
            Distribuição de Macronutrientes {compareMode ? '(Comparativo c/ Dieta Padrão)' : ''}
          </span>
          <span className="text-[#5C7262] font-mono-data text-[11px]">Base 100% Calórica</span>
        </div>

        {/* Dr. Tanutri Distribution Bar */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs text-[#384C3E]">
            <span className="font-semibold text-[#1E4413]">Abordagem Dr. Tanutri ({goal}):</span>
            <span className="font-mono-data text-[11px] text-[#5C7262] font-medium">
              {macros.p}% P • {macros.c}% C • {macros.g}% G
            </span>
          </div>
          <div className="h-6 w-full rounded-xl overflow-hidden flex text-[10px] font-mono-data font-bold leading-6 text-center shadow-inner">
            <div style={{ width: `${macros.p}%` }} className="bg-[#8CC62D] text-[#0A160F]">
              Prot {macros.p}%
            </div>
            <div style={{ width: `${macros.c}%` }} className="bg-[#3FD9C0] text-[#0A160F]">
              Carb {macros.c}%
            </div>
            <div style={{ width: `${macros.g}%` }} className="bg-[#C6A56A] text-[#0A160F]">
              Gord {macros.g}%
            </div>
          </div>
        </div>

        {/* Standard Diet Comparison Bar (if toggled) */}
        {compareMode && (
          <div className="space-y-1 pt-3 border-t border-[#E8E4D9]">
            <div className="flex justify-between text-xs text-[#5C7262]">
              <span className="font-medium">Dieta Tradicional Comum (Glicose Instável):</span>
              <span className="font-mono-data text-[11px]">
                {standardMacros.p}% P • {standardMacros.c}% C • {standardMacros.g}% G
              </span>
            </div>
            <div className="h-6 w-full rounded-xl overflow-hidden flex text-[10px] font-mono-data font-bold leading-6 text-center opacity-85">
              <div style={{ width: `${standardMacros.p}%` }} className="bg-[#BDC5BE] text-[#0A160F]">
                Prot 15%
              </div>
              <div style={{ width: `${standardMacros.c}%` }} className="bg-[#F17455] text-white">
                Carb 55%
              </div>
              <div style={{ width: `${standardMacros.g}%` }} className="bg-[#E4CFA8] text-[#0A160F]">
                Gord 30%
              </div>
            </div>
            <p className="text-[11px] text-[#384C3E] mt-2">
              <strong>Nota comparativa:</strong> A dieta comum costuma ter excesso de carboidratos refinados e carência proteica, gerando picos glicêmicos e fome precoce 2h após as refeições.
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C7262] mt-4 pt-3 border-t border-[#E8E4D9]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8CC62D]" />
            <span>Proteína (massa muscular & saciedade)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3FD9C0]" />
            <span>Carboidratos Complexos (energia limpa)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#C6A56A]" />
            <span>Lipídios Benéficos (hormônios & membranas)</span>
          </div>
        </div>
      </div>

      {/* Regulatory Health Notice */}
      <p className="text-[11px] text-[#5C7262] text-center pt-2">
        *Estimativa bioenergética de caráter pedagógico e ilustrativo. Prescrições calóricas e dietoterápicas exatas são formuladas exclusivamente em consulta individual com nutricionista habilitado.
      </p>
    </div>
  );
};
