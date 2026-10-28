import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Sparkles, BookOpen, Star, MessageSquareQuote } from 'lucide-react';
import { PatientTrustCluster } from '../common/PatientTrustCluster';
import { GoogleAuthorityCard } from '../common/GoogleAuthorityCard';
import { GOOGLE_REVIEWS_META } from '../../data/googleReviewsData';

interface SocialProofProps {
  onOpenReviews?: () => void;
  onOpenBooking?: () => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({ onOpenReviews, onOpenBooking }) => {
  const caseStudies = [
    {
      profile: "Executivo, 42 anos • Rotina Corporativa Intensa",
      challenge: "Cansaço crônico às 15h, almoços em restaurantes e efeito sanfona com dietas restritivas.",
      approach: "Ajuste de timing proteico nos almoços de negócios + estratégias de pré-reunião para evitar picos de cortisol e doces.",
      outcomes: [
        "+1.8 kg de massa magra em 10 semanas",
        "Redução de 3.2% de gordura corporal visceral",
        "Estabilização da energia sem necessidade de 6 cafés/dia"
      ],
      tag: "Metabolismo & Produtividade"
    },
    {
      profile: "Mulher, 36 anos • Queixas Digestivas & Distensão",
      challenge: "Inchaço abdominal recorrente após as refeições, constipação e restrição severa de carboidratos sem sucesso.",
      approach: "Protocolo de modulação da microbiota dos 5Rs com reintrodução gradual de fibras prebióticas e exclusão temporária de gatilhos.",
      outcomes: [
        "Eliminação completa do inchaço pós-prandial aos 21 dias",
        "Regularização do trânsito intestinal",
        "Recuperação da relação de prazer e tranquilidade com a comida"
      ],
      tag: "Microbiota & Saúde Intestinal"
    },
    {
      profile: "Praticante de Corrida e Musculação, 29 anos",
      challenge: "Fadiga muscular nos treinos longos de fim de semana e estagnação no ganho de força.",
      approach: "Periodização de carboidratos complexos sincronizada aos dias de tiro e regenerativo, com reposição de eletrólitos calculada.",
      outcomes: [
        "Melhora de 14% no ritmo (pace) de corrida",
        "Zero câimbras ou quedas bruscas de glicose",
        "Recuperação muscular em menos de 24h"
      ],
      tag: "Performance Esportiva"
    }
  ];

  return (
    <section id="evidencias" className="py-20 md:py-28 relative bg-gradient-to-b from-[#E9F3E6] via-[#F2F7F0] to-[#EBF4E8] border-b border-[#CCD8C4]" aria-labelledby="cases-title">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
            <span>EVIDÊNCIA & CENÁRIOS CLÍNICOS ILUSTRATIVOS</span>
          </div>
          <h2 id="cases-title" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight font-bold">
            Aplicações Práticas da Metodologia
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal">
            Em respeito ao código de ética profissional, não exibimos imagens de antes e depois nem promessas milagrosas. Apresentamos cenários fisiológicos típicos e condutas baseadas em consensos clínicos.
          </p>
        </div>

        {/* Dual Authority Spotlight: Google Reviews 5.0 + Patient Trust Cluster */}
        <div className="mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/90 via-[#FAFDF7] to-[#EDF5E8] border border-[#CCD8C4] shadow-[0_16px_40px_rgba(20,40,25,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Editorial Authority Narrative (7/12) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#CCD8C4] text-[#2C6E14] text-xs font-mono-data font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
              <span>RECONHECIMENTO & REPUTAÇÃO OFICIAL</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-[#0A160F] font-bold tracking-tight mb-4">
              A satisfação dos nossos pacientes traduzida em números reais e consistentes
            </h3>

            <p className="text-sm sm:text-base text-[#384C3E] leading-relaxed mb-6">
              Mais do que métricas, cada avaliação reflete a recuperação do prazer em comer com saúde, a normalização de parâmetros laboratoriais e a conquista de autonomia metabólica sustentável para a vida toda.
            </p>

            {/* Patient Trust Cluster Banner with 3 Avatars and Stars */}
            <div className="p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs w-full max-w-lg mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <PatientTrustCluster
                theme="light"
                onClick={onOpenReviews}
                showReviewsHint
              />
              {onOpenReviews && (
                <button
                  onClick={onOpenReviews}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4FAEE] hover:bg-[#1B4D24] text-[#2C6E14] hover:text-white border border-[#CCD8C4] text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  Ver depoimentos
                </button>
              )}
            </div>

            {/* Core Verification Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A160F]">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
                <span>100% de relatos 5 estrelas</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A160F]">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
                <span>Acompanhamento pós-consulta ativo</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A160F]">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
                <span>Zero terrorismo ou dietas punitivas</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A160F]">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
                <span>Total conformidade com CFN/CRN</span>
              </div>
            </div>
          </div>

          {/* Right / Luxury Google Authority Card (5/12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <GoogleAuthorityCard
              variant="card"
              onOpenReviewsModal={onOpenReviews}
              onOpenBooking={onOpenBooking}
            />
          </div>

        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((item, idx) => (
            <div
              key={idx}
              id={`proof-case-card-${idx}`}
              className="rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] p-6 sm:p-7 flex flex-col justify-between hover:border-[#72B818] transition-all shadow-[0_12px_35px_rgba(20,40,25,0.08),0_2px_8px_rgba(20,40,25,0.03)] hover:shadow-[0_18px_44px_rgba(20,40,25,0.14)]"
            >
              <div>
                <span className={`text-[11px] font-mono-data uppercase tracking-wider block mb-2 font-bold ${idx === 0 ? 'text-[#EB651A]' : 'text-[#2C6E14]'}`}>
                  {item.tag}
                </span>

                <h3 className="text-base font-bold text-[#0A160F] mb-3">
                  {item.profile}
                </h3>

                <div className="space-y-3 text-xs mb-6">
                  <div className="p-3 rounded-xl bg-white/80 border border-[#CCD8C4] shadow-xs">
                    <span className="text-[#566D5D] font-mono-data block text-[10px] uppercase font-bold">Ponto de Partida:</span>
                    <p className="text-[#384C3E] mt-0.5">{item.challenge}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#F4FAEE] to-[#EAF5E4] border border-[#CCD8C4]">
                    <span className="text-[#2C6E14] font-mono-data block text-[10px] uppercase font-bold">Conduta Aplicada:</span>
                    <p className="text-[#0A160F] mt-0.5 font-medium">{item.approach}</p>
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <span className="text-[11px] font-mono-data text-[#198774] uppercase tracking-wider block mb-2 font-bold">
                    Evolução Verificada:
                  </span>
                  <ul className="space-y-2 text-xs text-[#0A160F]">
                    {item.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E14] shrink-0 mt-0.5" />
                        <span className="font-semibold">{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#CCD8C4] flex items-center justify-between text-[11px] text-[#566D5D]">
                <span>Acompanhamento: 8 a 12 semanas</span>
                <span className="text-[#198774] font-mono-data font-bold">Cenário Demonstrativo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Compliance Statement */}
        <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-white via-[#FAFDF7] to-[#F2F8ED] border border-[#CCD8C4] flex items-center justify-center gap-2 text-xs text-[#384C3E] text-center shadow-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-[#EB651A] shrink-0" />
          <span>Respeitamos rigorosamente as normas do Conselho Federal de Nutricionistas (CFN) e a LGPD. Casos sintetizados para preservar a identidade dos pacientes.</span>
        </div>

      </div>
    </section>
  );
};
