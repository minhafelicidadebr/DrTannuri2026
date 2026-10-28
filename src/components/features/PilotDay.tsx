import React, { useState } from 'react';
import { Utensils, RefreshCw, ShoppingBag, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { analytics } from '../../lib/analytics';

interface Meal {
  time: string;
  name: string;
  food: string;
  altFood: string;
  isAlternative: boolean;
  macros: { calories: number; protein: number; carbs: number; fat: number };
  highlight: string;
}

export const PilotDay: React.FC = () => {
  const [dietStyle, setDietStyle] = useState<'mediterraneo' | 'lowcarb' | 'sem_lactose' | 'vegetariano'>('mediterraneo');
  const [copied, setCopied] = useState(false);

  // Dynamic meals data based on diet style
  const [meals, setMeals] = useState<Record<string, Meal[]>>({
    mediterraneo: [
      {
        time: "07:30",
        name: "Desjejum Ativador",
        food: "Ovos mexidos com açafrão, azeite extravirgem e torrada de fermentação natural",
        altFood: "Omelete de claras e gema com queijo de cabra e sementes de abóbora tostadas",
        isAlternative: false,
        macros: { calories: 360, protein: 24, carbs: 22, fat: 20 },
        highlight: "Proteína rápida + gordura monoinsaturada para controle de grelina matinal."
      },
      {
        time: "12:30",
        name: "Almoço de Alta Densidade",
        food: "Filé de salmão grelhado, quinoa com legumes assados e mix de folhas com azeite e limão",
        altFood: "Peito de frango marinado com ervas, batata-doce assada e brócolis ao vapor",
        isAlternative: false,
        macros: { calories: 520, protein: 42, carbs: 36, fat: 22 },
        highlight: "Ômega-3 e fibras prebióticas para síntese mitocondrial e saciedade longa."
      },
      {
        time: "16:30",
        name: "Lanche Estratégico",
        food: "Iogurte grego natural com mirtilos frescos, sementes de chia e canela",
        altFood: "Mix de castanhas do Pará e nozes com 2 pedaços de chocolate 70% cacau",
        isAlternative: false,
        macros: { calories: 230, protein: 18, carbs: 16, fat: 10 },
        highlight: "Estabiliza a curva de glicose vespertina e evita compulsão por doces no jantar."
      },
      {
        time: "20:00",
        name: "Jantar Circadiano",
        food: "Bowl de peixe branco em lascas com purê de mandioquinha e aspargos salteados",
        altFood: "Sopa nutritiva de abóbora cabotiá com frango desfiado e sementes de girassol",
        isAlternative: false,
        macros: { calories: 410, protein: 34, carbs: 30, fat: 16 },
        highlight: "Digestão fácil e suporte à síntese de melatonina para sono profundo restaurador."
      }
    ]
  });

  // Toggle food alternative
  const toggleFoodAlternative = (index: number) => {
    setMeals((prev) => {
      const currentList = prev[dietStyle] || prev.mediterraneo;
      const updated = [...currentList];
      updated[index] = {
        ...updated[index],
        isAlternative: !updated[index].isAlternative
      };
      return { ...prev, [dietStyle]: updated };
    });
    analytics.track('interactive_feature_use', 'pilot_day_swap', { mealIndex: index, dietStyle });
  };

  const currentMeals = meals[dietStyle] || meals.mediterraneo;

  // Grocery list
  const groceryItems = [
    "Ovos caipiras orgânicos (1 dúzia)",
    "Azeite extravirgem (acidez < 0,2%)",
    "Pão de fermentação natural ou batata-doce",
    "Filé de peixe (salmão ou pescada) ou frango caipira",
    "Quinoa em grãos ou arroz integral",
    "Mix de vegetais verdes (espinafre, brócolis, rúcula)",
    "Iogurte natural sem aditivos ou sementes de chia",
    "Frutas vermelhas (mirtilos ou morangos) e nozes"
  ];

  const handleCopyList = () => {
    const text = `Lista de Compras Piloto 24h - Dr. Tanutri:\n${groceryItems.map(i => `• ${i}`).join('\n')}\n\n*Exemplo ilustrativo demonstrativo.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    analytics.track('interactive_feature_use', 'pilot_day_copy_grocery');
  };

  return (
    <div className="space-y-6 text-[#0E1A12]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E4D9]">
        <div>
          <span className="text-xs font-mono-data text-[#8C6D2B] font-bold uppercase tracking-wider">
            Simulador de Rotina Real
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0A160F]">
            Plano-Piloto 24h Demonstrativo
          </h3>
          <p className="text-xs sm:text-sm text-[#384C3E]">
            Visualize como refeições equilibradas, saborosas e descomplicadas funcionam em um dia completo.
          </p>
        </div>

        {/* Diet Style Selector */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
          {[
            { id: 'mediterraneo' as const, label: 'Mediterrâneo Flex' },
            { id: 'lowcarb' as const, label: 'Low Carb Funcional' },
            { id: 'sem_lactose' as const, label: 'Digestivo / Sem Leite' },
            { id: 'vegetariano' as const, label: 'Plant-Based' }
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setDietStyle(style.id);
                analytics.track('interactive_feature_use', 'pilot_day_style', { style: style.id });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all border cursor-pointer ${
                dietStyle === style.id
                  ? 'bg-[#1B4D24] text-white font-bold border-[#1B4D24] shadow-sm'
                  : 'bg-[#FAF9F5] text-[#384C3E] border-[#CCD6C0] hover:border-[#8CC62D] hover:bg-white'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
        {currentMeals.map((meal, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-white border border-[#CCD6C0] shadow-[0_4px_20px_rgba(20,38,25,0.06),0_1px_3px_rgba(20,38,25,0.03)] hover:shadow-[0_8px_26px_rgba(20,38,25,0.09)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono-data text-[#1E4413] px-2.5 py-0.5 rounded-md bg-[#E8F5D5] border border-[#8CC62D]/60 font-bold shadow-xs">
                  {meal.time}
                </span>
                <span className="text-xs text-[#5C7262] font-mono-data font-semibold">
                  ~{meal.macros.calories} kcal • {meal.macros.protein}g Prot
                </span>
              </div>

              <h4 className="text-base font-bold text-[#0A160F] mb-2.5">
                {meal.name}
              </h4>

              {/* Meal Food with Swap Feature */}
              <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-[0_1px_3px_rgba(20,38,25,0.03)] mb-3.5">
                <p className="text-xs sm:text-sm text-[#0A160F] font-semibold leading-relaxed">
                  {meal.isAlternative ? meal.altFood : meal.food}
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#E3EBDD] flex items-center justify-between">
                  <span className="text-[10px] text-[#8C6D2B] font-mono-data font-bold">
                    {meal.isAlternative ? 'Opção Alternativa Ativa' : 'Opção Principal'}
                  </span>
                  <button
                    onClick={() => toggleFoodAlternative(idx)}
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#2B6316] hover:text-[#19420B] hover:underline font-bold cursor-pointer"
                    title="Alternar sugestão funcional"
                  >
                    <RefreshCw className="w-3 h-3 text-[#3D7717]" />
                    <span>Trocar ingrediente</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#5C7262] italic leading-relaxed">
                "{meal.highlight}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grocery List & Action Box */}
      <div className="p-5 rounded-2xl bg-[#F8FAF5] border border-[#CCD6C0] shadow-[0_4px_18px_rgba(20,38,25,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-data text-[#8C6D2B] font-bold">
            <ShoppingBag className="w-4 h-4 text-[#8C6D2B]" />
            <span>LISTA DE COMPRAS ENXUTA (8 ITENS ESSENCIAIS)</span>
          </div>
          <p className="text-xs text-[#384C3E] font-medium">
            Ingredientes que resolvem 80% do cardápio semanal sem desperdício na geladeira.
          </p>
        </div>

        <button
          onClick={handleCopyList}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#CCD6C0] text-[#0A160F] hover:border-[#2B6316] hover:bg-[#F2F7EC] transition-all text-xs font-bold flex items-center gap-2 shrink-0 self-start md:self-center shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#2B6316]" />
              <span className="text-[#2B6316]">Lista copiada com sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#5C7262]" />
              <span>Copiar Lista de Compras</span>
            </>
          )}
        </button>
      </div>

      <div className="text-[11px] text-[#5C7262] flex items-center gap-2 justify-center pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D2B]" />
        <span>Demonstração ilustrativa. Restrições severas, intolerâncias e patologias requerem conduta clínica personalizada.</span>
      </div>
    </div>
  );
};
