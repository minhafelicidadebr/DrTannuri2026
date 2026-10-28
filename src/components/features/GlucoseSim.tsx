import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Sparkles, 
  Zap, 
  Flame, 
  Clock, 
  Layers, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { analytics } from '../../lib/analytics';

type MealType = 'ultraprocessada' | 'padrao' | 'drtanutri';

interface PointDetail {
  time: number;
  val: number;
  phaseName: string;
  physiologicalAction: string;
  hormoneState: string;
}

interface MealScenario {
  name: string;
  subtitle: string;
  example: string;
  peakMgDl: number;
  baselineTimeMin: number;
  satietyScore: string;
  satietyTimeMin: number;
  points: PointDetail[];
  color: string;
  gradientStart: string;
  gradientStop: string;
  badgeLabel: string;
  zoneStatus: 'Alerta Inflamatório' | 'Atenção Moderada' | 'Zona Otimizada';
  analysis: string;
  macronutrientHighlight: string;
}

export const GlucoseSim: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>('drtanutri');
  const [activePointIndex, setActivePointIndex] = useState<number>(2); // Default to peak point
  const [showComparison, setShowComparison] = useState<boolean>(true); // Compare against Dr. Tanutri reference

  const mealScenarios: Record<MealType, MealScenario> = {
    ultraprocessada: {
      name: "Refeição Rápida com Açúcar/Refinados",
      subtitle: "Alta Carga Glicêmica & Baixa Densidade de Fibras",
      example: "Refrigerante ou suco adoçado + salgado folhado/frito ou lanche de pão branco",
      peakMgDl: 168,
      baselineTimeMin: 150,
      satietyScore: "Baixa (Fome severa aos 90 min)",
      satietyTimeMin: 90,
      color: "#EA4335",
      gradientStart: "#EA4335",
      gradientStop: "#FFA07A",
      badgeLabel: "Pico Agressivo & Queda Brusca",
      zoneStatus: "Alerta Inflamatório",
      macronutrientHighlight: "0g Fibras Prebióticas • Gorduras Saturadas • Absorção Gástrica Instantânea",
      points: [
        { time: 0, val: 90, phaseName: "Jejum / Ingestão", physiologicalAction: "Início da hidrólise de amilases salivares na mucosa oral.", hormoneState: "Insulina basal normal" },
        { time: 20, val: 122, phaseName: "Rápida Absorção", physiologicalAction: "Esvaziamento gástrico acelerado; glicose entra velozmente na veia porta.", hormoneState: "Pâncreas inicia secreção aguda" },
        { time: 45, val: 168, phaseName: "Pico Hiperglicêmico", physiologicalAction: "Concentração máxima sérica. Estresse oxidativo endotelial e sonolência.", hormoneState: "Hipersecreção de insulina" },
        { time: 75, val: 138, phaseName: "Depuração Maciça", physiologicalAction: "Transportadores GLUT-4 absorvem glicose em excesso para estocagem.", hormoneState: "Pico insulínico residual" },
        { time: 105, val: 78, phaseName: "Hipoglicemia Reativa", physiologicalAction: "Rebote hipoglicêmico ('Crash'). Fadiga aguda, confusão e fissura por açúcar.", hormoneState: "Grelina & Cortisol disparam" },
        { time: 135, val: 84, phaseName: "Reequilíbrio Instável", physiologicalAction: "O fígado aciona glicogenólise para restabelecer os níveis normais de glicose.", hormoneState: "Sensação de esgotamento" },
        { time: 180, val: 90, phaseName: "Estabilização Tardia", physiologicalAction: "Retorno aos níveis basais, porém com déficit energético e fome intensa.", hormoneState: "Sinal de busca por lanches" }
      ],
      analysis: "A ausência de fibras e proteínas estruturantes provoca um esvaziamento gástrico quase imediato. O pâncreas é obrigado a produzir uma descarga maciça de insulina para evitar toxicidade da glicose. Esse excesso de insulina derruba os níveis de açúcar abaixo da linha de base (rebote hipoglicêmico aos 105 min), gerando a clássica 'fome de leão' no meio da tarde e lentidão mental."
    },
    padrao: {
      name: "Prato Comercial Tradicional",
      subtitle: "Carboidratos Predominantes sem Ordem Estratégica",
      example: "Arroz branco comum, feijão, porção modesta de carne e pouca salada sem azeite",
      peakMgDl: 138,
      baselineTimeMin: 125,
      satietyScore: "Média (Fome aos 150 min)",
      satietyTimeMin: 150,
      color: "#C68A1E",
      gradientStart: "#C68A1E",
      gradientStop: "#F5C469",
      badgeLabel: "Elevação Típica Moderada",
      zoneStatus: "Atenção Moderada",
      macronutrientHighlight: "Pouca Fibra Viscosa • Absorção Média • Carboidratos sem Blindagem Lipídica",
      points: [
        { time: 0, val: 90, phaseName: "Jejum / Ingestão", physiologicalAction: "Ingestão mista tradicional sem precedência de fibras vegetais.", hormoneState: "Insulina basal normal" },
        { time: 20, val: 106, phaseName: "Digestão Moderada", physiologicalAction: "Digestão gastrointestinal padrão de carboidratos com amido.", hormoneState: "Liberação gradual de insulina" },
        { time: 45, val: 138, phaseName: "Pico Moderado", physiologicalAction: "Supera o teto ótimo pós-prandial (120 mg/dL), exigindo trabalho pancreático.", hormoneState: "Insulina moderada-alta" },
        { time: 75, val: 122, phaseName: "Descida Regular", physiologicalAction: "Absorção muscular e hepática contínua sem colapso reativo severo.", hormoneState: "Insulina em declínio" },
        { time: 105, val: 98, phaseName: "Declínio de Energia", physiologicalAction: "Leve quebra de atenção e vontade sutil de 'beliscar' após o almoço.", hormoneState: "Homeostase razoável" },
        { time: 135, val: 92, phaseName: "Fase de Transição", physiologicalAction: "Esvaziamento gástrico finalizando; redução do foco cognitivo profundo.", hormoneState: "Início de elevação de grelina" },
        { time: 180, val: 90, phaseName: "Retorno à Linha Base", physiologicalAction: "Estabilidade alcançada, mas com depleção precoce de saciedade.", hormoneState: "Sinal de fome fisiológica" }
      ],
      analysis: "Embora seja uma refeição comum e caseira, a ordem de ingestão tradicional (arroz e feijão com pouca fibra vegetal prebiótica) permite uma digestão rápida do amido. O pico atinge 138 mg/dL — acima do teto pós-prandial ideal de 120 mg/dL —, gerando sonolência branda após o almoço e necessidade de café açucarado ou docinhos às 15h."
    },
    drtanutri: {
      name: "Combinação de Precisão Dr. Tanutri",
      subtitle: "Bioquímica Nutricional: Fibras Primeiro + Proteína Nobre + Gorduras Boas",
      example: "Vegetais ricos em fibras primeiro + proteína de alto valor biológico + carboidrato complexo + azeite extravirgem",
      peakMgDl: 116,
      baselineTimeMin: 85,
      satietyScore: "Alta & Contínua (> 4 horas de Foco)",
      satietyTimeMin: 260,
      color: "#2C6E14",
      gradientStart: "#2C6E14",
      gradientStop: "#72B818",
      badgeLabel: "Curva Eufisiológica Otimizada",
      zoneStatus: "Zona Otimizada",
      macronutrientHighlight: "Malha Viscosa Prebiótica • Liberação Gradual • GLP-1 & PYY Estimulados",
      points: [
        { time: 0, val: 90, phaseName: "Jejum / Fibras Primeiro", physiologicalAction: "Vegetais consumidos primeiro criam uma malha prebiótica na mucosa gástrica.", hormoneState: "GLP-1 começa a subir suavemente" },
        { time: 20, val: 98, phaseName: "Absorção Blindada", physiologicalAction: "A glicose é absorvida lentamente através da rede de fibras viscosas solúveis.", hormoneState: "Liberação insulínica mínima" },
        { time: 45, val: 116, phaseName: "Pico Protegido", physiologicalAction: "Pico seguro e contido: permanece estritamente abaixo de 120 mg/dL.", hormoneState: "Proteção vascular e mitocondrial" },
        { time: 75, val: 110, phaseName: "Platô de Foco", physiologicalAction: "Fornecimento equilibrado de glicose ao córtex pré-frontal sem sobrecarga.", hormoneState: "Sensação plena de clareza e vigor" },
        { time: 105, val: 102, phaseName: "Estabilidade Estendida", physiologicalAction: "Aminoácidos e ácidos graxos mantêm a saciedade por feedback gástrico.", hormoneState: "Grelina totalmente suprimida" },
        { time: 135, val: 95, phaseName: "Descida Suave", physiologicalAction: "Transição orgânica para a queima basal sem nenhum vestígio de 'crash'.", hormoneState: "Sem desejo impulsivo por comida" },
        { time: 180, val: 91, phaseName: "Autonomia Metabólica", physiologicalAction: "4 horas após a refeição, o indivíduo segue com foco, vitalidade e saciedade.", hormoneState: "Saciedade sustentada e estável" }
      ],
      analysis: "Ao ingerir vegetais com fibras viscosas antes dos amidos, cria-se um gel protetor na parede duodenal. A proteína nobre e o azeite retardam o esvaziamento gástrico, permitindo que as mitocôndrias utilizem energia contínua. A insulina se eleva apenas o estritamente necessário: sem picos, sem inflamação endotelial e com foco mental sustentado por horas."
    }
  };

  const current = mealScenarios[selectedMeal];
  const referenceDrTanutri = mealScenarios.drtanutri;

  const handleSelect = (meal: MealType) => {
    setSelectedMeal(meal);
    // Reset active point to peak (index 2)
    setActivePointIndex(2);
    analytics.track('interactive_feature_use', 'glucose_sim', { meal });
  };

  // Dimensions for high-resolution responsive SVG Canvas
  const svgWidth = 760;
  const svgHeight = 340;
  const paddingLeft = 65;
  const paddingRight = 45;
  const paddingTop = 40;
  const paddingBottom = 55;

  const chartAreaWidth = svgWidth - paddingLeft - paddingRight;
  const chartAreaHeight = svgHeight - paddingTop - paddingBottom;

  // X scale: 0 to 180 minutes
  const getX = (t: number) => paddingLeft + (t / 180) * chartAreaWidth;

  // Y scale: 65 mg/dL (bottom) to 185 mg/dL (top)
  const minMg = 65;
  const maxMg = 185;
  const getY = (mg: number) => {
    const ratio = (mg - minMg) / (maxMg - minMg);
    return paddingTop + (1 - ratio) * chartAreaHeight;
  };

  // Time grid marks
  const timeMarks = [
    { t: 0, label: '0 min', sub: 'Início' },
    { t: 30, label: '30 min', sub: '' },
    { t: 60, label: '60 min', sub: 'Pico Geral' },
    { t: 90, label: '90 min', sub: '' },
    { t: 120, label: '120 min', sub: 'Teto 2h' },
    { t: 150, label: '150 min', sub: '' },
    { t: 180, label: '180 min', sub: '3 Horas' }
  ];

  // Glucose level grid lines
  const glucoseLevels = [
    { val: 180, label: '180', note: 'Hiperglicemia', color: '#EA4335', alert: true },
    { val: 150, label: '150', note: 'Alerta de Pico', color: '#EB651A', alert: false },
    { val: 120, label: '120', note: 'Teto Pós-Prandial Ótimo', color: '#2C6E14', alert: false, isOptimalTop: true },
    { val: 90, label: '90', note: 'Basal Saudável', color: '#566D5D', alert: false, isBaseline: true },
    { val: 70, label: '70', note: 'Piso Hipoglicêmico', color: '#C68A1E', alert: false }
  ];

  // Cubic spline generator for smooth clinical curves
  const buildSmoothSpline = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      // Hermite tension control
      const tension = 0.45;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return path;
  };

  // Calculate coordinates for current scenario
  const currentPts = current.points.map((pt) => ({
    x: getX(pt.time),
    y: getY(pt.val),
    data: pt
  }));

  const currentSplinePath = buildSmoothSpline(currentPts);

  // Closed area under the curve down to baseline
  const areaBottomY = getY(minMg);
  const currentAreaPath = `
    ${currentSplinePath}
    L ${currentPts[currentPts.length - 1].x.toFixed(1)},${areaBottomY.toFixed(1)}
    L ${currentPts[0].x.toFixed(1)},${areaBottomY.toFixed(1)}
    Z
  `;

  // Calculate coordinates for Dr. Tanutri Reference Ghost Curve
  const nutriPts = referenceDrTanutri.points.map((pt) => ({
    x: getX(pt.time),
    y: getY(pt.val),
    data: pt
  }));
  const nutriSplinePath = buildSmoothSpline(nutriPts);

  const activePoint = currentPts[activePointIndex] || currentPts[2];

  return (
    <div className="space-y-6 text-[#0E1A12] select-none">
      
      {/* Header Section with Regulatory Clinical Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#CCD8C4]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white via-[#F6FAF1] to-[#FFF4ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-2 font-bold shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-[#2C6E14]" />
            <span>BIOCINÉTICA PRANDIAL • MONITOR DE RESPOSTA GLICÊMICA</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F] tracking-tight">
            Simulador de Curva Glicêmica & Saciedade
          </h3>
          <p className="text-xs sm:text-sm text-[#384C3E] mt-1 max-w-2xl leading-relaxed">
            Entenda como a composição molecular e a ordem de ingestão dos alimentos modulam a liberação de insulina, o foco mental e a fome reativa nas 3 horas seguintes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-data bg-gradient-to-r from-[#1B4D24] to-[#245D2E] text-white border border-[#1B4D24] font-bold shadow-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#AEE938]" />
            <span>Janela 0 a 180 min</span>
          </span>
        </div>
      </div>

      {/* Meal Archetype Selector Buttons (Large Ergonomic Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {[
          { 
            id: 'ultraprocessada' as MealType, 
            label: 'Refeição Rápida & Refinados', 
            sub: 'Refrigerante + Sanduíche branco / Frito',
            badge: 'Pico Agressivo: ~168 mg/dL', 
            color: '#EA4335',
            badgeBg: '#FDF2F2',
            badgeBorder: '#FBC4C4',
            icon: Flame
          },
          { 
            id: 'padrao' as MealType, 
            label: 'Prato Comercial Padrão', 
            sub: 'Arroz branco, feijão, pouca salada e carne',
            badge: 'Pico Moderado: ~138 mg/dL', 
            color: '#C68A1E',
            badgeBg: '#FEF9EE',
            badgeBorder: '#F9E5BA',
            icon: Layers
          },
          { 
            id: 'drtanutri' as MealType, 
            label: 'Precisão Dr. Tanutri', 
            sub: 'Fibras vegetais 1º + Proteína + Azeite',
            badge: 'Curva Eufisiológica: ~116 mg/dL', 
            color: '#2C6E14',
            badgeBg: '#F0F9EC',
            badgeBorder: '#C2E5B5',
            icon: Sparkles
          }
        ].map((item) => {
          const isSelected = selectedMeal === item.id;
          const CardIcon = item.icon;
          return (
            <button
              key={item.id}
              id={`meal-select-${item.id}`}
              onClick={() => handleSelect(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-2 shadow-[0_8px_25px_rgba(20,40,25,0.1)] ring-2 scale-[1.01]'
                  : 'bg-[#FBFDF9] border-[#CCD8C4] hover:bg-white hover:border-[#72B818] shadow-xs'
              }`}
              style={{
                borderColor: isSelected ? item.color : undefined,
                // @ts-ignore
                '--tw-ring-color': isSelected ? `${item.color}33` : undefined
              }}
            >
              {isSelected && (
                <div 
                  className="absolute top-0 left-0 right-0 h-1" 
                  style={{ backgroundColor: item.color }}
                />
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <CardIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold text-[#0A160F]">
                      {item.label}
                    </span>
                  </div>
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: item.color }} 
                  />
                </div>

                <p className="text-xs text-[#566D5D] leading-relaxed mb-3">
                  {item.sub}
                </p>
              </div>

              <div 
                className="px-2.5 py-1 rounded-lg text-xs font-mono-data font-bold inline-flex items-center justify-between border"
                style={{ 
                  backgroundColor: item.badgeBg, 
                  borderColor: item.badgeBorder,
                  color: item.color
                }}
              >
                <span>{item.badge}</span>
                {isSelected && <span className="text-[10px] uppercase font-bold tracking-wider">ATIVO</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* TOP BIOTELEMETRY HUD (3 High-Impact Precision Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1: Pico Máximo Estimado */}
        <div className="p-5 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-data text-[#566D5D] font-semibold flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#566D5D]" />
              PICO MÁXIMO ESTIMADO
            </span>
            <span 
              className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded-md border"
              style={{
                backgroundColor: current.zoneStatus === 'Zona Otimizada' ? '#F0F9EC' : current.zoneStatus === 'Atenção Moderada' ? '#FEF9EE' : '#FDF2F2',
                borderColor: current.zoneStatus === 'Zona Otimizada' ? '#C2E5B5' : current.zoneStatus === 'Atenção Moderada' ? '#F9E5BA' : '#FBC4C4',
                color: current.color
              }}
            >
              {current.zoneStatus}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono-data tracking-tight" style={{ color: current.color }}>
              ~{current.peakMgDl}
            </span>
            <span className="text-xs sm:text-sm font-mono-data font-semibold text-[#566D5D]">mg/dL</span>
            <span className="text-xs text-[#566D5D] ml-auto font-mono-data">aos 45 min</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2ECE0] flex items-center justify-between text-xs">
            <span className="text-[#566D5D]">Limite Ótimo Clínico:</span>
            <span className="font-bold text-[#2C6E14] font-mono-data">&lt; 120 mg/dL</span>
          </div>
        </div>

        {/* Metric 2: Duração do Estresse / Estabilidade */}
        <div className="p-5 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-data text-[#566D5D] font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#566D5D]" />
              RETORNO À LINHA DE BASE
            </span>
            <span className="text-[10px] font-mono-data font-bold text-[#566D5D] bg-[#F4FAF0] px-2 py-0.5 rounded-md border border-[#CCD8C4]">
              {current.baselineTimeMin <= 90 ? 'Depuração Eficiente' : 'Trabalho Pancreático Prolongado'}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono-data text-[#0A160F] tracking-tight">
              {current.baselineTimeMin}
            </span>
            <span className="text-xs sm:text-sm font-mono-data font-semibold text-[#566D5D]">minutos</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2ECE0]">
            <div className="w-full bg-[#E2ECE0] h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, (current.baselineTimeMin / 180) * 100)}%`,
                  backgroundColor: current.color 
                }}
              />
            </div>
          </div>
        </div>

        {/* Metric 3: Nível de Saciedade & Grelina */}
        <div className="p-5 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-data text-[#566D5D] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#566D5D]" />
              JANELA DE SACIEDADE
            </span>
            <span className="text-[10px] font-mono-data font-bold text-[#2C6E14]">
              GLP-1 / PYY
            </span>
          </div>

          <div className="mt-1">
            <span className="text-base sm:text-lg font-bold text-[#0A160F] block">
              {current.satietyScore}
            </span>
            <span className="text-xs text-[#566D5D] block mt-0.5">
              {selectedMeal === 'drtanutri' ? 'Sem sonolência ou fissura por doce' : 'Gera queda de energia e compulsão'}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2ECE0] flex items-center justify-between text-xs">
            <span className="text-[#566D5D]">Previsão de Fome:</span>
            <span className="font-bold text-[#0A160F] font-mono-data">
              {selectedMeal === 'drtanutri' ? 'Apenas após 4h+' : `Crítica aos ${current.satietyTimeMin} min`}
            </span>
          </div>
        </div>

      </div>

      {/* MASTER PLUS WIDESCREEN GLYCEMIC BIOTELEMETRY CANVAS */}
      <div className="rounded-3xl bg-white border border-[#CCD8C4] shadow-[0_16px_45px_rgba(20,40,25,0.08)] overflow-hidden relative">
        
        {/* Chart Header Bar with Interactive Toolbar & Ghost Comparison Toggle */}
        <div className="p-4 sm:p-6 pb-2 border-b border-[#CCD8C4] bg-gradient-to-r from-white via-[#FAFDF8] to-[#F2F8ED] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0" 
                style={{ backgroundColor: current.color }}
              />
              <h4 className="font-display text-base sm:text-lg font-bold text-[#0A160F]">
                Curva de Concentração Plasmática de Glicose (0 a 180 min)
              </h4>
            </div>
            <p className="text-xs text-[#566D5D] mt-0.5">
              Clique em qualquer ponto do gráfico para auditar a fisiologia minuto a minuto.
            </p>
          </div>

          {/* Controls: Comparison Ghost Toggle & Status Legends */}
          <div className="flex flex-wrap items-center gap-3">
            {selectedMeal !== 'drtanutri' && (
              <button
                id="toggle-drtanutri-comparison"
                onClick={() => setShowComparison(!showComparison)}
                className={`min-h-[38px] px-3 py-1 rounded-xl text-xs font-mono-data font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  showComparison
                    ? 'bg-[#2C6E14] text-white border-[#2C6E14] shadow-xs'
                    : 'bg-[#F0F9EC] text-[#2C6E14] border-[#CCD8C4] hover:bg-[#E5F5DD]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#AEE938]" />
                <span>{showComparison ? 'Ocultar Comparativo' : 'Comparar c/ Dr. Tanutri'}</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs font-mono-data">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F0F9EC] border border-[#CCD8C4] text-[#2C6E14] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C6E14]" />
                <span>Faixa Ótima (&lt;120)</span>
              </span>
            </div>
          </div>
        </div>

        {/* High-Resolution SVG Canvas */}
        <div className="p-4 sm:p-6 overflow-x-auto relative">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full min-w-[620px] h-64 sm:h-80 md:h-[380px] select-none"
            aria-label="Monitor telemétrico de curva glicêmica e estabilidade insulínica"
          >
            <defs>
              {/* Dynamic Gradient for the Active Curve Area */}
              <linearGradient id="curveGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={current.gradientStart} stopOpacity="0.30" />
                <stop offset="60%" stopColor={current.gradientStop} stopOpacity="0.10" />
                <stop offset="100%" stopColor={current.gradientStop} stopOpacity="0.0" />
              </linearGradient>

              {/* Safe Zone Healthy Emerald Gradient */}
              <linearGradient id="optimalZoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#72B818" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#2C6E14" stopOpacity="0.04" />
              </linearGradient>

              {/* Laser guideline gradient for the active point */}
              <linearGradient id="activePointLaser" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={current.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={current.color} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* OPTIMAL POSTPRANDIAL ZONE BAND (70 to 120 mg/dL) */}
            <rect 
              x={paddingLeft} 
              y={getY(120)} 
              width={chartAreaWidth} 
              height={getY(70) - getY(120)} 
              fill="url(#optimalZoneGradient)" 
              rx="4"
            />

            {/* Optimal Zone Label Banner */}
            <g transform={`translate(${paddingLeft + chartAreaWidth - 190}, ${getY(120) + 16})`}>
              <rect 
                x="0" 
                y="-11" 
                width="185" 
                height="20" 
                rx="6" 
                fill="#FFFFFF" 
                stroke="#CCD8C4" 
                strokeWidth="1"
                opacity="0.95"
              />
              <circle cx="10" cy="-1" r="3.5" fill="#2C6E14" />
              <text 
                x="20" 
                y="3" 
                fill="#2C6E14" 
                fontSize="10" 
                fontFamily="Space Grotesk, monospace" 
                fontWeight="bold"
              >
                FAIXA EUFISIOLÓGICA (&lt;120)
              </text>
            </g>

            {/* Horizontal Grid Baseline Lines with High Contrast Numeric Scale */}
            {glucoseLevels.map((lvl) => {
              const y = getY(lvl.val);
              return (
                <g key={lvl.val}>
                  <line 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={paddingLeft + chartAreaWidth} 
                    y2={y} 
                    stroke={lvl.isOptimalTop ? '#2C6E14' : lvl.isBaseline ? '#CCD8C4' : '#E2ECE0'} 
                    strokeWidth={lvl.isOptimalTop ? 1.5 : 1} 
                    strokeDasharray={lvl.isOptimalTop ? '4 3' : '2 3'}
                  />
                  <text 
                    x={paddingLeft - 10} 
                    y={y + 4} 
                    fill={lvl.color} 
                    fontSize="11" 
                    textAnchor="end" 
                    fontFamily="Space Grotesk, monospace" 
                    fontWeight="bold"
                  >
                    {lvl.label}
                  </text>
                  <text 
                    x={paddingLeft - 38} 
                    y={y + 4} 
                    fill="#566D5D" 
                    fontSize="9" 
                    textAnchor="end" 
                    fontFamily="Space Grotesk, monospace"
                    className="hidden sm:inline"
                  >
                    {lvl.val === 120 ? 'TETO' : lvl.val === 90 ? 'BASAL' : ''}
                  </text>
                </g>
              );
            })}

            {/* Vertical Time Grid Lines */}
            {timeMarks.map((tm) => {
              const x = getX(tm.t);
              return (
                <line 
                  key={tm.t} 
                  x1={x} 
                  y1={paddingTop} 
                  x2={x} 
                  y2={paddingTop + chartAreaHeight} 
                  stroke="#EFF4ED" 
                  strokeWidth="1" 
                />
              );
            })}

            {/* COMPARISON GHOST CURVE (Dr. Tanutri Reference) if looking at other meals */}
            {selectedMeal !== 'drtanutri' && showComparison && (
              <g className="transition-opacity duration-300">
                <path 
                  d={nutriSplinePath} 
                  fill="none" 
                  stroke="#2C6E14" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4"
                  opacity="0.65"
                />
                <g transform={`translate(${getX(45) + 8}, ${getY(116) - 10})`}>
                  <rect 
                    x="-6" 
                    y="-12" 
                    width="145" 
                    height="18" 
                    rx="5" 
                    fill="#F0F9EC" 
                    stroke="#C2E5B5" 
                    strokeWidth="1" 
                  />
                  <text 
                    x="2" 
                    y="0" 
                    fill="#2C6E14" 
                    fontSize="9" 
                    fontFamily="Space Grotesk, monospace" 
                    fontWeight="bold"
                  >
                    Padrão Dr. Tanutri: 116 mg/dL
                  </text>
                </g>
              </g>
            )}

            {/* Shaded Area Under Current Curve */}
            <path 
              d={currentAreaPath} 
              fill="url(#curveGradientFill)" 
              className="transition-all duration-500 ease-out"
            />

            {/* Active Glycemic Smooth Curve Line */}
            <path 
              d={currentSplinePath} 
              fill="none" 
              stroke={current.color} 
              strokeWidth="4" 
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />

            {/* Active Point Vertical Laser Guide Line */}
            {activePoint && (
              <line 
                x1={activePoint.x} 
                y1={paddingTop - 15} 
                x2={activePoint.x} 
                y2={paddingTop + chartAreaHeight + 10} 
                stroke="url(#activePointLaser)" 
                strokeWidth="2" 
                strokeDasharray="3 3"
              />
            )}

            {/* Interactive Milestone Nodes (0, 20, 45, 75, 105, 135, 180 min) */}
            {currentPts.map((pt, idx) => {
              const isSelected = activePointIndex === idx;
              const isPeak = pt.data.val === current.peakMgDl;

              return (
                <g 
                  key={pt.data.time} 
                  className="cursor-pointer group"
                  onClick={() => {
                    setActivePointIndex(idx);
                    analytics.track('interactive_feature_use', 'glucose_point_click', { time: pt.data.time, val: pt.data.val });
                  }}
                >
                  {/* Broad transparent touch hit area */}
                  <rect 
                    x={pt.x - 22} 
                    y={paddingTop - 15} 
                    width="44" 
                    height={chartAreaHeight + 35} 
                    fill="transparent" 
                  />

                  {/* Pulsing rings for peak or active node */}
                  {isSelected && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="16" 
                      fill={current.color} 
                      fillOpacity="0.25" 
                      className="animate-ping" 
                    />
                  )}

                  {isPeak && !isSelected && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="10" 
                      fill={current.color} 
                      fillOpacity="0.2" 
                      className="animate-pulse" 
                    />
                  )}

                  {/* Base Data Point Circle */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={isSelected ? "8" : isPeak ? "6.5" : "5"} 
                    fill="#FFFFFF" 
                    stroke={current.color} 
                    strokeWidth={isSelected ? "3.5" : "2.5"} 
                    className="transition-all duration-200 shadow-sm"
                  />

                  {/* Inside core dot for selected */}
                  {isSelected && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="3.5" 
                      fill={current.color} 
                    />
                  )}

                  {/* Value callout above peak or selected point */}
                  {(isSelected || isPeak) && (
                    <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                      <rect 
                        x="-26" 
                        y="-16" 
                        width="52" 
                        height="18" 
                        rx="5" 
                        fill="#0A160F" 
                        stroke="#CCD8C4" 
                        strokeWidth="0.5" 
                      />
                      <text 
                        x="0" 
                        y="-4" 
                        fill="#FFFFFF" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="Space Grotesk, monospace" 
                        fontWeight="bold"
                      >
                        {pt.data.val} mg
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* X-Axis Time Labels at the Bottom */}
            {timeMarks.map((tm) => {
              const x = getX(tm.t);
              return (
                <g key={tm.t}>
                  <text 
                    x={x} 
                    y={paddingTop + chartAreaHeight + 22} 
                    textAnchor="middle" 
                    fill="#0A160F" 
                    fontSize="11" 
                    fontFamily="Space Grotesk, monospace"
                    fontWeight="bold"
                  >
                    {tm.label}
                  </text>
                  {tm.sub && (
                    <text 
                      x={x} 
                      y={paddingTop + chartAreaHeight + 35} 
                      textAnchor="middle" 
                      fill="#566D5D" 
                      fontSize="9" 
                      fontFamily="Space Grotesk, monospace"
                    >
                      {tm.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* MINUTE-BY-MINUTE TELEMETRY INSPECTOR HUD (Interactive Bottom Panel) */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#F7FAF5] via-[#EFF6EA] to-[#E9F3E4] border-t border-[#CCD8C4]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#1B4D24] text-white text-[10px] font-mono-data font-bold uppercase">
                  {activePoint.data.time} MINUTOS APÓS A REFEIÇÃO
                </span>
                <span 
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono-data font-bold border"
                  style={{
                    backgroundColor: current.zoneStatus === 'Zona Otimizada' ? '#F0F9EC' : '#FFF0E6',
                    borderColor: current.color,
                    color: current.color
                  }}
                >
                  {activePoint.data.phaseName}
                </span>
              </div>

              <h5 className="font-display text-sm sm:text-base font-bold text-[#0A160F]">
                {activePoint.data.physiologicalAction}
              </h5>

              <p className="text-xs text-[#384C3E] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E14]" />
                <span className="font-medium">Estado Hormonal:</span> {activePoint.data.hormoneState}
              </p>
            </div>

            {/* Instantaneous Readout Gauge */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#CCD8C4] shadow-xs flex items-center gap-4 min-w-[210px] shrink-0">
              <div>
                <span className="text-[10px] font-mono-data text-[#566D5D] block uppercase font-semibold">
                  Glicemia no Ponto
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-mono-data font-extrabold" style={{ color: current.color }}>
                    {activePoint.data.val}
                  </span>
                  <span className="text-xs font-mono-data text-[#566D5D]">mg/dL</span>
                </div>
              </div>

              <div className="border-l border-[#E2ECE0] pl-3">
                <span className="text-[10px] font-mono-data text-[#566D5D] block uppercase font-semibold">
                  Delta vs. Basal
                </span>
                <span className={`text-sm font-mono-data font-bold flex items-center gap-1 ${
                  activePoint.data.val >= 90 ? 'text-[#0A160F]' : 'text-[#EA4335]'
                }`}>
                  {activePoint.data.val >= 90 ? `+${activePoint.data.val - 90}` : `${activePoint.data.val - 90}`} mg/dL
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Physiological Mechanism & Food Sequencing Insight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-6 rounded-3xl bg-gradient-to-br from-white via-[#FAFDF8] to-[#EFF6EB] border border-[#CCD8C4] shadow-xs">
        
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2C6E14] text-white flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-[#0A160F]">
                Análise Bioquímica da Refeição
              </h4>
              <span className="text-[11px] font-mono-data text-[#2C6E14] font-semibold">
                {current.macronutrientHighlight}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed">
            {current.analysis}
          </p>
        </div>

        {/* The Golden Food Sequencing Rule Box (Actionable Clinical Micro-Protocol) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono-data font-bold text-[#2C6E14] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
              <span>PROTOCOLO CLÍNICO: A REGRA DA ORDEM</span>
            </div>
            <p className="text-xs text-[#566D5D] leading-relaxed mb-3">
              Como achatar a curva glicêmica sem abrir mão de carboidratos prazerosos:
            </p>

            <div className="space-y-2 text-xs font-mono-data">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F0F9EC] border border-[#C2E5B5] text-[#2C6E14] font-bold">
                <span className="w-5 h-5 rounded-full bg-[#2C6E14] text-white flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Fibras Vegetais Primeiro (Salada/Cruas)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAFDF8] border border-[#CCD8C4] text-[#0A160F] font-semibold">
                <span className="w-5 h-5 rounded-full bg-[#1B4D24] text-white flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Proteínas & Gorduras Nobres (Carne/Peixe/Azeite)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FAFDF8] border border-[#CCD8C4] text-[#566D5D]">
                <span className="w-5 h-5 rounded-full bg-[#566D5D] text-white flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Carboidratos & Amidos por Último</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E2ECE0] flex items-center justify-between text-[11px] font-mono-data text-[#2C6E14] font-bold">
            <span>Redução de Pico Comprovada:</span>
            <span>Até -40% Glicemia</span>
          </div>
        </div>

      </div>

      {/* Regulatory Health Disclaimer (CFN / CRN-3 Compliant) */}
      <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-[#F8FAF5] border border-[#CCD8C4] text-xs text-[#384C3E]">
        <Info className="w-4 h-4 text-[#2C6E14] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Aviso Regulatório CFN/CRN:</strong> Esta simulação reflete princípios validados da cinética pós-prandial e fisiologia gastrointestinal humana com finalidade exclusivamente educativa e pedagógica. Variações interindividuais ocorrem em função da microbiota, taxa de filtração renal, sensibilidade insulínica tecidual e nível de treinamento.
        </p>
      </div>

    </div>
  );
};

