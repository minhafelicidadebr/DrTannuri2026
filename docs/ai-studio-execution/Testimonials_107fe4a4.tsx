import React, { useState } from 'react';
import { TESTIMONIALS_IMAGES } from '../assets/images';
import { useDemo } from '../context/DemoContext';
import { GoogleAuthorityCard } from './common/GoogleAuthorityCard';
import { PatientTrustCluster } from './common/PatientTrustCluster';
import {
  Trophy,
  Medal,
  Award,
  Globe2,
  CheckCircle2,
  Quote,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Flame,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  location: string;
  countryFlag: string;
  imageSrc: string;
  alt: string;
  championships: string[];
  primaryBenefit: string;
  shortQuote: string;
  fullQuote: string;
  tag: string;
  accentColor: string;
  verifiedBadge: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    id: 'sergio-zimmermann',
    name: 'Sergio Zimmermann',
    role: 'Head Coach BJJ & MMA @poundforpoundmunich',
    location: 'Munique, Alemanha',
    countryFlag: '🇩🇪',
    imageSrc: TESTIMONIALS_IMAGES.sergioZimmermann.src,
    alt: TESTIMONIALS_IMAGES.sergioZimmermann.alt,
    championships: [
      '2X Campeão Mundial Master IBJJF',
      '12X Campeão Europeu IBJJF (Gi)',
      'Campeão Europeu IBJJF (No-Gi)',
    ],
    primaryBenefit: 'Recuperação Muscular & Peso Competitivo Sem Perda de Força',
    shortQuote:
      'Como atleta de Jiu-Jitsu, o trabalho do Luiz foi essencial para otimizar minha performance. Melhorei a recuperação, mantive o peso para lutas e elevei meu rendimento nos treinos. Fez diferença real na minha rotina de atleta.',
    fullQuote:
      '"Como atleta de Jiu-Jitsu, contar com o acompanhamento do Luiz Tannuri foi essencial para otimizar minha performance. Com um plano alimentar personalizado, consegui melhorar minha recuperação, manter o peso adequado para competições e elevar meu rendimento nos treinos. Seu trabalho fez uma diferença real na minha rotina como atleta."',
    tag: 'Mundial & Europeu IBJJF',
    accentColor: '#F18536',
    verifiedBadge: 'Atleta Internacional Verificado',
  },
  {
    id: 'zaid-mirza',
    name: 'Zaid Mirza',
    role: 'Empreendedor, Diplomata e CEO Desert Force',
    location: 'Amã, Jordânia (MENA)',
    countryFlag: '🇯🇴',
    imageSrc: TESTIMONIALS_IMAGES.zaidMirza.src,
    alt: TESTIMONIALS_IMAGES.zaidMirza.alt,
    championships: [
      'Ambassador Mercosul MENA',
      'Former Consultant JAF 🇯🇴',
      'Founder Arab MMA Federation & BJJ Jordânia',
      'CEO Desert Force • Faixa-Preta BJJ',
    ],
    primaryBenefit: 'Saúde Otimizada & Suporte à Rotina Executiva Global',
    shortQuote:
      'Luiz é extremamente profissional, organizado e entrega resultados de altíssima qualidade. Seu plano alimentar aprimorou meu desempenho nos treinos e deu suporte sólido à minha rotina executiva intensa.',
    fullQuote:
      '"Fiquei muito satisfeito com o serviço prestado. Luiz foi profissional, organizado e entregou resultados de qualidade. Seu plano alimentar não só melhorou minha saúde, mas também aprimorou meu desempenho nos treinos e deu suporte à minha rotina de trabalho bastante ocupada. No geral, eu o recomendo fortemente e espero continuar sendo acompanhado por este ótimo nutricionista."',
    tag: 'Liderança Global & MMA',
    accentColor: '#79C14E',
    verifiedBadge: 'Executivo & Diplomata Internacional',
  },
  {
    id: 'rodrigo-francioni',
    name: 'Rodrigo Francioni Dias',
    role: 'BJJ Coach @fightsportsmiami & Medalhista Internacional',
    location: 'Miami, Estados Unidos',
    countryFlag: '🇺🇸',
    imageSrc: TESTIMONIALS_IMAGES.rodrigoFrancioni.src,
    alt: TESTIMONIALS_IMAGES.rodrigoFrancioni.alt,
    championships: [
      'Medalhista Pan Ams & Mundial IBJJF',
      'Medalhista ADCC Submission Fighting',
      'Campeão Orlando Open 2025',
      'Campeão AJP Tour Abu Dhabi 2024',
    ],
    primaryBenefit: 'Atendimento 100% Online de Precisão & Ajuste Fino para Luta',
    shortQuote:
      'Por ser nutricionista e faixa-preta, o Luiz entende na prática as necessidades dos atletas de luta. O atendimento foi totalmente online, super prático, disponível e decisivo para o meu corte de peso e pódios nos EUA.',
    fullQuote:
      '"Quero deixar meu agradecimento ao meu nutricionista esportivo Luiz, que além de ser um excelente profissional, também é faixa preta de Jiu Jitsu e entende na prática as necessidades dos atletas de luta. O trabalho dele foi essencial para minha performance, recuperação e controle de peso durante a preparação para minhas competições. A dieta personalizada que ele montou fez toda a diferença nos meus treinos e nos resultados. O atendimento foi totalmente on-line, super prático, e mesmo à distância ele foi extremamente atencioso, sempre disponível para tirar dúvidas e ajustar o plano conforme minha rotina. Recomendo de olhos fechados para qualquer lutador que leve o esporte a sério e queira evoluir com segurança e eficiência."',
    tag: 'Medalhista ADCC & AJP Abu Dhabi',
    accentColor: '#F18536',
    verifiedBadge: 'Coach Fight Sports Miami',
  },
];

export const Testimonials: React.FC = () => {
  const { openRequestModal } = useDemo();
  const [activeImageModal, setActiveImageModal] = useState<TestimonialData | null>(null);
  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string | null>(null);

  return (
    <section
      id="depoimentos"
      className="py-16 md:py-24 bg-[#F6F3EE] border-b border-[#D7D2CA] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(121,193,78,0.06),transparent_70%)]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(241,133,54,0.04),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Neuromarketing Authority & Google 5.0 Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          
          {/* Left Column: Narrative & Chancelas */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#EFECE5] px-3.5 py-1.5 rounded-full border border-[#D7D2CA] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#79C14E] animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#79C14E]">
                O que os atletas e pacientes estão dizendo
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#18191B] tracking-tight leading-[1.08] mb-4 text-balance"
            >
              Chancelado por campeões mundiais, treinadores de elite e líderes globais.
            </h2>

            <p className="text-base sm:text-lg text-[#56595F] leading-relaxed max-w-2xl mb-6">
              Da preparação para o ADCC e Mundiais da IBJJF à alta produtividade executiva internacional: a ciência nutricional do Dr. Luiz Tannuri comprovada na prática do mais alto nível competitivo.
            </p>

            {/* Trust Cluster & International Reach Badges */}
            <div className="space-y-3.5">
              <PatientTrustCluster showGoogleHint={false} />

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-semibold text-[#56595F] pt-1">
                <span className="text-[#18191B] font-bold">Atendimento validado em:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFECE5] border border-[#D7D2CA]">
                  <span>🇩🇪</span> Munique (Alemanha)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFECE5] border border-[#D7D2CA]">
                  <span>🇯🇴</span> Amã (Oriente Médio)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFECE5] border border-[#D7D2CA]">
                  <span>🇺🇸</span> Miami (EUA)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFECE5] border border-[#D7D2CA]">
                  <span>🇧🇷</span> Brasília & Todo o Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Google Authority Card 5.0 */}
          <div className="lg:col-span-5 xl:col-span-4 w-full flex justify-center lg:justify-end">
            <GoogleAuthorityCard variant="standalone-card" className="w-full max-w-md" />
          </div>

        </div>

        {/* 3 Master Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {TESTIMONIALS.map((t) => {
            const isExpanded = expandedTestimonialId === t.id;

            return (
              <article
                key={t.id}
                className="group bg-[#EFECE5] rounded-2xl border border-[#D7D2CA] shadow-2xs hover:border-[#79C14E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Media Header: Official Screenshot & Portrait Card */}
                  <div className="relative aspect-square w-full bg-[#18191B] overflow-hidden">
                    <img
                      src={t.imageSrc}
                      alt={t.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18191B]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Tag & Zoom Inspect Button */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18191B]/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white tracking-wide shadow-md">
                        <Trophy className="w-3.5 h-3.5 text-[#F18536]" />
                        <span>{t.tag}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveImageModal(t)}
                        className="pointer-events-auto p-2 rounded-full bg-[#18191B]/85 hover:bg-[#79C14E] text-white hover:text-[#18191B] backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                        title="Inspecionar depoimento em alta resolução"
                        aria-label={`Inspecionar depoimento oficial de ${t.name}`}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom overlay: Location badge and Verification */}
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/95 bg-[#18191B]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                        <span>{t.countryFlag}</span>
                        <span>{t.location}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#79C14E] bg-[#18191B]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#79C14E]/30">
                        <ShieldCheck className="w-3 h-3 text-[#79C14E]" />
                        <span>Verificado</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 sm:p-7">
                    {/* Athlete Name & Role */}
                    <div className="mb-4">
                      <h3 className="font-display font-bold text-2xl text-[#18191B] tracking-tight group-hover:text-[#79C14E] transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#79C14E] mt-0.5">
                        {t.role}
                      </p>
                    </div>

                    {/* Championships Badges */}
                    <div className="mb-5 space-y-1.5">
                      {t.championships.map((champ, cIdx) => (
                        <div
                          key={cIdx}
                          className="inline-flex items-center gap-1.5 w-full text-[11px] font-semibold text-[#18191B] bg-[#F6F3EE] px-2.5 py-1 rounded-md border border-[#D7D2CA]/70"
                        >
                          <Medal className="w-3.5 h-3.5 text-[#F18536] shrink-0" />
                          <span className="truncate">{champ}</span>
                        </div>
                      ))}
                    </div>

                    {/* Primary Benefit Callout (Neuromarketing anchor) */}
                    <div className="mb-4 p-3 rounded-lg bg-[#79C14E]/10 border border-[#79C14E]/25">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#79C14E] block mb-0.5">
                        Impacto na Performance:
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#18191B] leading-snug">
                        {t.primaryBenefit}
                      </p>
                    </div>

                    {/* Quote text */}
                    <div className="relative pt-1">
                      <Quote className="w-6 h-6 text-[#D7D2CA] mb-2" aria-hidden="true" />
                      <p className="text-sm sm:text-base text-[#56595F] leading-relaxed italic">
                        {isExpanded ? t.fullQuote : `"${t.shortQuote}"`}
                      </p>

                      <button
                        type="button"
                        onClick={() => setExpandedTestimonialId(isExpanded ? null : t.id)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#79C14E] hover:text-[#56595F] transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Ver síntese executiva' : 'Ler relato completo na íntegra'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveImageModal(t)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F6F3EE] hover:bg-[#18191B] text-[#18191B] hover:text-white border border-[#D7D2CA] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:border-[#79C14E]"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#79C14E]" />
                    <span>Ver Prova Documental Original</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Social Proof Metrics Bar (Estado da Arte) */}
        <div className="bg-[#18191B] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto flex-1">
            <div className="border-l-2 border-[#79C14E] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                +10 Anos
              </div>
              <div className="text-xs text-[#EFECE5]/70 mt-0.5">
                Prática clínica com atletas
              </div>
            </div>

            <div className="border-l-2 border-[#F18536] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                +12 Países
              </div>
              <div className="text-xs text-[#EFECE5]/70 mt-0.5">
                Pacientes atendidos online
              </div>
            </div>

            <div className="border-l-2 border-[#79C14E] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                100%
              </div>
              <div className="text-xs text-[#EFECE5]/70 mt-0.5">
                Individualizado ao seu treino
              </div>
            </div>

            <div className="border-l-2 border-[#F18536] pl-4">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Faixa-Preta
              </div>
              <div className="text-xs text-[#EFECE5]/70 mt-0.5">
                Vivência real do tatame
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => openRequestModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#79C14E] hover:bg-[#68A842] text-[#18191B] font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Quero uma estratégia deste nível</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Original Testimonial Screenshot Inspection */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-[#18191B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Comprovante do depoimento de ${activeImageModal.name}`}
        >
          <div
            className="relative max-w-2xl w-full bg-[#1F2124] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#18191B]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#79C14E]" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {activeImageModal.name} · {activeImageModal.location}
                  </h4>
                  <p className="text-[11px] text-[#79C14E]">
                    {activeImageModal.role}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Documental Image Frame */}
            <div className="relative aspect-square w-full bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img
                src={activeImageModal.imageSrc}
                alt={activeImageModal.alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-inner"
              />
            </div>

            {/* Full text in modal */}
            <div className="p-4 sm:p-6 bg-[#18191B] border-t border-white/10">
              <div className="flex items-start gap-2 mb-2 text-xs font-semibold text-[#79C14E]">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Depoimento Documentado e Autêntico</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic">
                {activeImageModal.fullQuote}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
