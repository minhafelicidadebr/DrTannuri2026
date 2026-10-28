import React from 'react';
import { METHOD_PILLARS } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { 
  Check, 
  Compass, 
  Utensils, 
  Activity, 
  Users, 
  Sparkles, 
  ShieldCheck,
  FileX,
  AlertTriangle,
  Scale,
  RefreshCw,
  Apple,
  MessageCircle,
  HeartPulse,
  Zap,
  ArrowRight,
  TrendingUp,
  Dna,
  Flame,
  Clock
} from 'lucide-react';

export const MethodSection: React.FC = () => {
  // Enhanced clinical pillars with distinct biomarkers, metrics and telemetry
  const enhancedPillars = [
    {
      step: "01",
      badge: "Precisão Clínica",
      title: "Diagnóstico Bioindividual",
      subtitle: "Mapeamento além do peso na balança",
      description: "Investigamos sua saúde mitocondrial, tolerância a carboidratos, microbiota intestinal e ciclo circadiano. O corpo não mente quando sabemos ler os sinais certos.",
      biomarker: "Exames Laboratoriais, Bioimpedância & TMB",
      metricLabel: "Mapeamento Inicial",
      metricValue: "+45 marcadores celulares",
      Icon: Dna,
      accentColor: "#2C6E14",
      tagBg: "bg-[#F2F8ED]",
      tagText: "text-[#2C6E14]",
      tagBorder: "border-[#CCD8C4]"
    },
    {
      step: "02",
      badge: "Alta Adesão",
      title: "Nutrição Gastronômica Real",
      subtitle: "Comida densa em nutrientes, zero punição",
      description: "A alimentação precisa caber na sua rotina de trabalho e família. Ingredientes frescos, técnicas culinárias simples e sabor que gera prazer verdadeiro, sem ultraprocessados disfarçados.",
      biomarker: "Índice de Saciedade Pós-Prandial",
      metricLabel: "Poder de Saciedade",
      metricValue: "+32% saciedade sem rebote",
      Icon: Utensils,
      accentColor: "#EB651A",
      tagBg: "bg-[#FFF0E6]",
      tagText: "text-[#C84A07]",
      tagBorder: "border-[#FDCDB3]"
    },
    {
      step: "03",
      badge: "Zero Desistência",
      title: "Acompanhamento Ativo & Vivo",
      subtitle: "Apoio entre as consultas, quando a vida acontece",
      description: "O maior gargalo das dietas tradicionais é a solidão entre consultas mensais. O App Webidiet e nosso canal direto garantem ajustes rápidos para jantares sociais, viagens e imprevistos.",
      biomarker: "Latência no Canal Prioritário",
      metricLabel: "Tempo de Resposta",
      metricValue: "< 15 min em dias úteis",
      Icon: MessageCircle,
      accentColor: "#198774",
      tagBg: "bg-[#E6F5F2]",
      tagText: "text-[#156B5C]",
      tagBorder: "border-[#B2DFD7]"
    },
    {
      step: "04",
      badge: "Autonomia",
      title: "Inteligência de Dados sem Estresse",
      subtitle: "Métricas que ensinam, não que aprisionam",
      description: "Acompanhamos tendência de composição corporal, estabilidade de energia e qualidade de sono. Os números servem para orientar decisões com calma, nunca para gerar obsessão.",
      biomarker: "Massa Magra e Gordura Corporal",
      metricLabel: "Curva de Sustentação",
      metricValue: "100% foco em autonomia perene",
      Icon: TrendingUp,
      accentColor: "#2C6E14",
      tagBg: "bg-[#F2F8ED]",
      tagText: "text-[#2C6E14]",
      tagBorder: "border-[#CCD8C4]"
    }
  ];

  return (
    <section id="metodo" className="py-20 md:py-28 relative bg-gradient-to-b from-[#F7FAF5] via-[#EFF6EA] to-[#E5EFE2] text-[#0E1A12] border-y border-[#CCD8C4] overflow-hidden" aria-labelledby="method-heading">
      {/* Subtle Precision Bio-Metric Grid in pale green */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(114,184,24,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(114,184,24,0.08)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Organic Light Ambient Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#72B818]/10 via-[#EB651A]/6 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#72B818]/10 to-transparent rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white via-[#F6FAF1] to-[#FFF4ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-4 shadow-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
            <span>ENGENHARIA METABÓLICA INDIVIDUALIZADA</span>
          </div>
          <h2 id="method-heading" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight leading-[1.15] font-semibold">
            Da tentativa e erro à engenharia metabólica individualizada.
          </h2>
          <p className="text-[#384C3E] text-base sm:text-lg mt-4 font-normal leading-relaxed">
            Seu metabolismo não responde a fórmulas prontas. Mapeamos sua fisiologia como um ecossistema inteligente, garantindo que cada caloria e nutriente trabalhe a favor da sua energia e longevidade.
          </p>
        </div>

        {/* Feature Bento-Grid with Hollywood Studio Gastronomic Photography Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Visual Showcase: Gastronomic Culinary Precision Photography (5/12) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden border border-[#CCD8C4] shadow-[0_16px_40px_rgba(20,40,25,0.09)] bg-gradient-to-br from-white via-[#F9FCF7] to-[#EEF5E9] group flex-1 flex flex-col justify-between">
              
              {/* Image Frame with Hollywood Studio Lighting & Delicate Rim Highlights */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#EDF4EA]">
                <img
                  id="method-culinary-image"
                  src={VISUAL_ASSETS.culinaryPrecision?.src || ''}
                  alt={VISUAL_ASSETS.culinaryPrecision?.alt || 'Culinária de Precisão Dr. Tanutri'}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                
                {/* Hollywood Studio Lighting Rim & Soft Vignette */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/70 via-transparent to-black/20" 
                  aria-hidden="true" 
                />

                {/* Top Badge: Comida de Verdade */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#CCD8C4] text-[11px] font-mono-data text-[#0A160F] font-bold shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EB651A]" />
                  <span>Comida de Verdade • Alta Densidade</span>
                </div>

                {/* Top Right: Standard Michelin / Gastronomic Tag */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#0A160F]/85 backdrop-blur-md border border-white/20 text-[10px] font-mono-data text-[#AEE938] font-bold shadow-xs hidden sm:flex items-center gap-1">
                  <span>Padrão Gastronômico</span>
                </div>

                {/* Bottom Overlay on Image: Micro-nutritional Density Highlights */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-white/92 backdrop-blur-md border border-white/40 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-data text-[10px] text-[#EB651A] font-bold uppercase tracking-wider">
                      Nutrientes de Alta Biodisponibilidade
                    </span>
                    <span className="text-[10px] font-mono-data font-bold text-[#2C6E14]">
                      94% Absorção Celular
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0A160F] font-semibold mt-1">
                    Salmão grelhado, abacate Hass, folhas escuras & beterraba assada
                  </p>
                </div>
              </div>

              {/* Lower Narrative Card */}
              <div className="p-6 sm:p-7 border-t border-[#CCD8C4] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-data text-[#EB651A] font-bold uppercase tracking-wider">
                      Pilar 02 em Destaque • Vitalidade
                    </span>
                    <span className="text-[10px] font-mono-data font-bold text-[#198774] bg-[#E6F5F2] px-2 py-0.5 rounded-full border border-[#B2DFD7]">
                      Zero Punição
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A160F] mb-2">
                    Marmitaria do Atleta
                  </h3>
                  
                  <p className="text-sm text-[#384C3E] font-normal leading-relaxed mb-4">
                    Ingredientes frescos da estação, gorduras nobres protetoras, carboidratos complexos e técnicas práticas de organização culinária. Saciedade profunda para treinar com potência e nunca mais passar fome.
                  </p>

                  {/* Micro-Pills of Functional Food Science */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F2F8ED] border border-[#CCD8C4] text-[10px] font-mono-data text-[#2C6E14] font-semibold">
                      Ômega-3 EPA/DHA
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFF4ED] border border-[#FDCDB3] text-[10px] font-mono-data text-[#C84A07] font-semibold">
                      Lipídios Nobres & Fibras
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#EBF5E6] border border-[#CCD8C4] text-[10px] font-mono-data text-[#1E3B27] font-semibold">
                      Polifenóis Protetores
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#CCD8C4] flex items-center justify-between text-xs font-mono-data text-[#566D5D]">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2C6E14]" />
                    <span>Biodisponibilidade Comprovada</span>
                  </span>
                  <span className="text-[#198774] font-bold">Otimização Celular</span>
                </div>
              </div>
            </div>
          </div>

          {/* The 4 Clinical Pillars (7/12 Bento-Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {enhancedPillars.map((pillar, idx) => {
              const Icon = pillar.Icon;
              return (
                <div 
                  key={idx}
                  id={`method-pillar-card-${idx}`}
                  className="rounded-3xl bg-gradient-to-br from-white via-[#FAFDF7] to-[#EFF6EA] border border-[#CCD8C4] p-6 sm:p-7 shadow-[0_8px_25px_rgba(20,40,25,0.06)] hover:shadow-[0_16px_40px_rgba(20,40,25,0.12)] hover:border-[#72B818] transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle Corner Glow on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#72B818]/5 rounded-full blur-xl group-hover:bg-[#72B818]/15 transition-all pointer-events-none" />

                  <div>
                    {/* Header with Step, Badge and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-data text-2xl font-extrabold text-[#0A160F]">
                          {pillar.step}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#CCD8C4] shadow-2xs flex items-center justify-center text-[#2C6E14] group-hover:border-[#72B818] group-hover:scale-110 transition-all">
                          <Icon className="w-4 h-4" style={{ color: pillar.accentColor }} />
                        </div>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-mono-data font-bold border ${pillar.tagBg} ${pillar.tagText} ${pillar.tagBorder}`}>
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#0A160F] mb-1.5 group-hover:text-[#2C6E14] transition-colors">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-xs font-bold mb-3" style={{ color: pillar.accentColor }}>
                      {pillar.subtitle}
                    </p>

                    <p className="text-sm text-[#384C3E] font-normal leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Enhanced Clinical Biomarker & Quantitative Metric Footer */}
                  <div className="pt-4 mt-2 border-t border-[#CCD8C4]">
                    <div className="flex items-center justify-between text-[11px] font-mono-data mb-1.5">
                      <span className="text-[#566D5D]">Biomarcador-Alvo:</span>
                      <span className="font-bold text-[#0A160F]">{pillar.biomarker}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#CCD8C4] flex items-center justify-between text-xs shadow-2xs">
                      <span className="text-[10px] font-mono-data text-[#566D5D]">
                        {pillar.metricLabel}:
                      </span>
                      <span className="font-bold text-[#2C6E14] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-[#72B818]" />
                        <span>{pillar.metricValue}</span>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Contrast Comparison Box: "Dieta Antiga vs. Método Dr. Tanutri" */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white/95 via-[#FAFDF8] to-[#EEF5E8] border border-[#CCD8C4] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(20,40,25,0.08)] overflow-hidden">
          
          {/* Subtle Ambient Radial Highlights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#72B818]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EB651A]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Module Header */}
          <div className="max-w-2xl mx-auto text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
              <Scale className="w-3.5 h-3.5 text-[#EB651A]" />
              <span>PARADIGMA CLÍNICO: DA RESTRIÇÃO À ADAPTAÇÃO</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A160F] tracking-tight mb-3">
              A diferença real na sua rotina do dia a dia
            </h3>
            <p className="text-sm sm:text-base text-[#485C4E] font-normal max-w-xl mx-auto leading-relaxed">
              Por que a mudança definitiva acontece quando substituímos imposição por compreensão fisiológica.
            </p>
          </div>

          {/* Dual Interactive Grid with Visual Center Bridge */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch z-10">
            
            {/* The Old Way: O Modelo Tradicional Punitivo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFF8F5] via-[#FFF1ED] to-[#FCE8E2] border border-[#FDC2B4] flex flex-col justify-between shadow-[0_10px_30px_rgba(200,60,30,0.05)] hover:border-[#F99B84] transition-all group">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#FDC2B4]/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFEAE5] border border-[#FDC2B4] flex items-center justify-center text-[#C93816] shadow-2xs group-hover:scale-105 transition-transform">
                      <FileX className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#3B1710] leading-tight">
                        Abordagem Convencional Estática
                      </h4>
                      <span className="text-[11px] font-mono-data text-[#A63C24] font-semibold">
                        Fórmulas genéricas & isolamento
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-[#C93816] px-3 py-1 rounded-full bg-[#FF6A45]/15 border border-[#FF6A45]/30 font-mono-data font-extrabold shrink-0 shadow-2xs">
                    Resultados voláteis
                  </span>
                </div>

                {/* 4 Contrast Points */}
                <div className="space-y-3.5">
                  {/* Point 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 border border-[#FDC2B4]/70 hover:bg-white transition-colors shadow-2xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE6E1] text-[#D9381E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      &times;
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#C93816] bg-[#FFEAE5] px-2 py-0.5 rounded-md">
                          Prescrições de Gaveta
                        </span>
                        <FileX className="w-3.5 h-3.5 text-[#C93816]/70" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#4D271E] font-medium leading-relaxed">
                        Dietas genéricas pré-impressas que desconsideram sua rotina e preferências reais
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 border border-[#FDC2B4]/70 hover:bg-white transition-colors shadow-2xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE6E1] text-[#D9381E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      &times;
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#C93816] bg-[#FFEAE5] px-2 py-0.5 rounded-md">
                          Isolamento Entre Consultas
                        </span>
                        <AlertTriangle className="w-3.5 h-3.5 text-[#C93816]/70" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#4D271E] font-medium leading-relaxed">
                        Ausência de suporte diário para imprevistos, jantares de negócios ou viagens
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 border border-[#FDC2B4]/70 hover:bg-white transition-colors shadow-2xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE6E1] text-[#D9381E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      &times;
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#C93816] bg-[#FFEAE5] px-2 py-0.5 rounded-md">
                          Foco Míope na Balança
                        </span>
                        <Scale className="w-3.5 h-3.5 text-[#C93816]/70" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#4D271E] font-medium leading-relaxed">
                        Obsessão por números brutos, ignorando massa muscular e vitalidade celular
                      </p>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 border border-[#FDC2B4]/70 hover:bg-white transition-colors shadow-2xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE6E1] text-[#D9381E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      &times;
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#C93816] bg-[#FFEAE5] px-2 py-0.5 rounded-md">
                          Oscilações de Energia
                        </span>
                        <RefreshCw className="w-3.5 h-3.5 text-[#C93816]/70" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#4D271E] font-medium leading-relaxed">
                        Quedas bruscas de rendimento e cansaço recorrente por estratégias insustentáveis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Clinical Metric for Old Way */}
              <div className="mt-6 pt-4 border-t border-[#FDC2B4]/80 flex items-center justify-between text-xs text-[#A63C24]">
                <span className="font-semibold">Histórico Clínico:</span>
                <span className="font-mono-data font-bold bg-[#FFEAE5] px-2.5 py-1 rounded-md">85% abandonam protocolos rígidos</span>
              </div>
            </div>

            {/* The Dr. Tanutri Way: Metodologia Dr. Tanutri */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-[#F5FAF0] to-[#E9F4E1] border-2 border-[#72B818] flex flex-col justify-between shadow-[0_16px_40px_rgba(114,184,24,0.12)] hover:shadow-[0_20px_48px_rgba(114,184,24,0.18)] transition-all group relative">
              
              {/* Highlight Shimmer Pill */}
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#72B818] to-[#589610] text-white text-[10px] font-mono-data font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#AEE938]" />
                <span>Padrão Ouro Clínico</span>
              </div>

              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#CCD8C4]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#72B818] to-[#51880F] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#0A160F] leading-tight">
                        Metodologia Dr. Luiz Tannuri
                      </h4>
                      <span className="text-[11px] font-mono-data text-[#2C6E14] font-semibold">
                        Precisão metabólica & alta adesão
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-[#1F4A0C] px-3 py-1 rounded-full bg-gradient-to-r from-[#72B818]/25 to-[#EB651A]/20 border border-[#72B818]/50 font-mono-data font-extrabold flex items-center gap-1.5 shadow-2xs shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
                    Consistente
                  </span>
                </div>

                {/* 4 Transformative Points */}
                <div className="space-y-3.5">
                  {/* Point 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-[#CCD8C4] hover:border-[#72B818] hover:shadow-xs transition-all flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF5E4] text-[#2C6E14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#2C6E14] bg-[#EAF5E4] px-2 py-0.5 rounded-md">
                          Calibragem por Biomarcadores
                        </span>
                        <Apple className="w-3.5 h-3.5 text-[#EB651A]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#0A160F] font-semibold leading-relaxed">
                        Ajuste milimétrico baseado em bioimpedância InBody 120, exames e rotina
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-[#CCD8C4] hover:border-[#72B818] hover:shadow-xs transition-all flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF5E4] text-[#2C6E14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#2C6E14] bg-[#EAF5E4] px-2 py-0.5 rounded-md">
                          Acompanhamento Ativo
                        </span>
                        <MessageCircle className="w-3.5 h-3.5 text-[#72B818]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#0A160F] font-semibold leading-relaxed">
                        Suporte e acompanhamento contínuo via App Webidiet para soluções práticas no seu cotidiano
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-[#CCD8C4] hover:border-[#72B818] hover:shadow-xs transition-all flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF5E4] text-[#2C6E14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#2C6E14] bg-[#EAF5E4] px-2 py-0.5 rounded-md">
                          Vitalidade & Massa Magra
                        </span>
                        <HeartPulse className="w-3.5 h-3.5 text-[#EB651A]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#0A160F] font-semibold leading-relaxed">
                        Preservação muscular ativa, sono reparador e suporte mitocondrial para energia estável
                      </p>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-[#CCD8C4] hover:border-[#72B818] hover:shadow-xs transition-all flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF5E4] text-[#2C6E14] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider text-[#2C6E14] bg-[#EAF5E4] px-2 py-0.5 rounded-md">
                          Alta Adesão Gastronômica
                        </span>
                        <Zap className="w-3.5 h-3.5 text-[#72B818]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#0A160F] font-semibold leading-relaxed">
                        Comida de verdade com prazer sensorial que transforma a conduta em estilo de vida permanente
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Clinical Metric for Dr. Tanutri */}
              <div className="mt-6 pt-4 border-t border-[#CCD8C4] flex items-center justify-between text-xs text-[#2C6E14]">
                <span className="font-bold">Aderência Comprovada:</span>
                <span className="font-mono-data font-extrabold bg-[#EAF5E4] border border-[#72B818]/40 text-[#1F4A0C] px-3 py-1 rounded-md flex items-center gap-1.5 shadow-2xs">
                  <TrendingUp className="w-3.5 h-3.5 text-[#EB651A]" />
                  94% de sustentabilidade a longo prazo
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Clinical Insight Banner */}
          <div className="mt-8 pt-6 border-t border-[#CCD8C4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566D5D] relative z-10">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#EB651A] shrink-0" />
              <span>
                <strong>Atenção individualizada:</strong> Você aprende a comer de forma intuitiva e fundamentada pela ciência, sem proibições irracionais.
              </span>
            </div>
            <span className="font-mono-data text-[11px] text-[#2C6E14] font-bold bg-white px-3 py-1.5 rounded-xl border border-[#CCD8C4] shadow-2xs">
              Diretrizes éticas e científicas CFN / CRN
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
