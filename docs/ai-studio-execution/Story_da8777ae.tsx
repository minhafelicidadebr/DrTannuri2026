import React, { useState, useEffect, useRef } from 'react';
import { TANNURI_IMAGES } from '../assets/images';
import { useDemo } from '../context/DemoContext';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Maximize2,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserCheck,
  X,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface DiplomaItem {
  id: string;
  title: string;
  category: 'nutricao' | 'artes-marciais';
  subtitle: string;
  institution: string;
  imageSrc: string;
  description: string;
  verificationBadge: string;
}

const DIPLOMAS: DiplomaItem[] = [
  {
    id: 'pos-graduacao-nutricao',
    title: 'Pós-Graduação em Nutrição Esportiva',
    category: 'nutricao',
    subtitle: 'Especialização Lato Sensu em Nutrição Esportiva',
    institution: 'Instituição de Ensino Superior Credenciada pelo MEC',
    imageSrc: TANNURI_IMAGES.diplomaPosGraduacao.src,
    description:
      'Mais de 10 anos de especialização voltados à bioquímica do esforço físico, periodização nutricional, manejo de massa muscular, recuperação glicogênica e modulação metabólica em atletas e praticantes regulares.',
    verificationBadge: 'Documento Acadêmico Registrado',
  },
  {
    id: 'graduacao-nutricao',
    title: 'Graduação Oficial em Nutrição',
    category: 'nutricao',
    subtitle: 'Título de Bacharel em Nutrição',
    institution: 'Instituição de Ensino Superior Credenciada pelo MEC',
    imageSrc: TANNURI_IMAGES.diplomaGraduacao.src,
    description:
      'Formação universitária completa que fundamenta a prática clínica ética, a dietoterapia avançada, a semiologia e a avaliação clínica individualizada, distanciando o atendimento de modismos e receitas genéricas.',
    verificationBadge: 'Bacharelado Oficial Homologado',
  },
  {
    id: 'jiujitsu-graus-faixa-preta',
    title: 'Diploma de 5ª / 6ª Graduação — Faixa Preta',
    category: 'artes-marciais',
    subtitle: 'Mestrado Faixa Preta de Jiu-Jitsu (Graus Superiores)',
    institution: 'Confederação Brasileira de Jiu-Jitsu (CBJJ) / USBJJ',
    imageSrc: TANNURI_IMAGES.diplomaFaixaPreta2.src,
    description:
      'Certificação oficial de alta hierarquia marcial. Mais de 30 anos dedicados à arte suave, culminando no 6º grau da faixa preta — uma vida inteira experimentando na pele as demandas fisiológicas, o corte de peso e a recuperação articular.',
    verificationBadge: 'Certificação Oficial de Mestrado Marcial',
  },
  {
    id: 'jiujitsu-faixa-preta',
    title: 'Diploma Oficial de Faixa Preta de Jiu-Jitsu',
    category: 'artes-marciais',
    subtitle: 'Graduação Oficial de Faixa Preta',
    institution: 'Registro Histórico de Graduação',
    imageSrc: TANNURI_IMAGES.diplomaFaixaPreta1.src,
    description:
      'Registro oficial da consagração à faixa preta. Testemunho de décadas de superação, disciplina inabalável e liderança no tatame, fundamentando a autoridade de quem compreende a mente e o corpo de quem treina forte.',
    verificationBadge: 'Diploma Oficial de Faixa Preta Registrado',
  },
];

export const Story: React.FC = () => {
  const { openRequestModal, logDemoEvent } = useDemo();
  
  // Modal states
  const [selectedDiplomaIndex, setSelectedDiplomaIndex] = useState<number | null>(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modals on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDiplomaIndex(null);
        setIsBioModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenDiploma = (index: number) => {
    setSelectedDiplomaIndex(index);
    logDemoEvent(`open_diploma_${DIPLOMAS[index].id}`, 'Story');
  };

  const handleNextDiploma = () => {
    if (selectedDiplomaIndex !== null) {
      setSelectedDiplomaIndex((selectedDiplomaIndex + 1) % DIPLOMAS.length);
    }
  };

  const handlePrevDiploma = () => {
    if (selectedDiplomaIndex !== null) {
      setSelectedDiplomaIndex(
        (selectedDiplomaIndex - 1 + DIPLOMAS.length) % DIPLOMAS.length
      );
    }
  };

  const currentDiploma = selectedDiplomaIndex !== null ? DIPLOMAS[selectedDiplomaIndex] : null;

  return (
    <section
      id="trajetoria"
      className="py-16 md:py-24 bg-[#F6F3EE] border-b border-[#D7D2CA] transition-colors relative overflow-hidden"
      aria-labelledby="story-title"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#79C14E]/8 via-[#F18536]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#79C14E]/6 to-transparent rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ROW SUPERIOR: Visual Hero com 'tannuri6' + Narrativa de Alta Autoridade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* COLUNA ESQUERDA: Imagem tannuri6 com Moldura Editorial e Badges de Honra */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#D7D2CA] shadow-lg bg-[#FAF8F5] p-3 sm:p-4 group">
              
              {/* Moldura interna com a imagem oficial tannuri6 */}
              <div className="relative flex justify-center items-center overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#D7D2CA]/60">
                <img
                  src={TANNURI_IMAGES.tannuri6.src}
                  alt={TANNURI_IMAGES.tannuri6.alt}
                  className="w-auto h-auto max-h-[520px] object-contain transition-transform duration-700 group-hover:scale-[1.02] block"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width={921}
                  height={1152}
                />

                {/* Badge Flutuante: Faixa Preta 6º Grau */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18191B]/85 backdrop-blur-md text-white border border-[#79C14E]/40 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#79C14E] animate-pulse" />
                  <span>Faixa Preta 6º Grau · Jiu-Jitsu</span>
                </div>

                {/* Badge Flutuante: Nutrição Esportiva */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[#18191B] border border-[#F18536]/40 text-xs font-bold shadow-md">
                  <Award className="w-3.5 h-3.5 text-[#F18536]" />
                  <span>Pós-Graduado há 10+ Anos</span>
                </div>
              </div>

              {/* Legenda institucional sob a foto */}
              <div className="mt-3.5 px-2 py-1 flex items-center justify-between text-xs text-[#56595F]">
                <div>
                  <span className="font-bold text-[#18191B] block text-sm">
                    Dr. Luiz Tannuri
                  </span>
                  <span className="text-[#737780]">
                    Atendimento Clínico em Brasília & Acompanhamento Online
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#79C14E] hover:text-[#5fa536] transition-colors cursor-pointer"
                >
                  <span>Ver Memorial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* COLUNA DIREITA: Narrativa de Prestígio & Autoridade Inquestionável */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            {/* Tag de autoridade máxima */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D7D2CA] shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#79C14E]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#79C14E]">
                Trajetória, Mestrado e Ciência Aplicada
              </span>
            </div>

            {/* Título de alto impacto solicitado */}
            <h2
              id="story-title"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#18191B] tracking-tight leading-[1.08] mb-5"
            >
              Do Tatame à Consulta: Atenção Absoluta ao Contexto Real.
            </h2>

            {/* Subtítulo & Parágrafos Principais com Neuromarketing Ético */}
            <div className="space-y-4 text-base sm:text-lg text-[#56595F] leading-relaxed mb-8">
              <p>
                Como <strong className="text-[#18191B]">nutricionista pós-graduado</strong> e <strong className="text-[#18191B]">mestre de jiu-jitsu faixa preta 6º grau</strong>, Luiz Tannuri conhece de maneira profunda o que acontece dentro e fora do treino. Essa vivência prática dá contexto imediato à conversa; a avaliação bioquímica orienta o atendimento com exatidão.
              </p>
              <p className="text-[#18191B] font-medium text-base sm:text-lg">
                Conhecimento técnico de alto nível, escuta acolhedora e explicações didáticas para você assumir o controle definitivo do seu rendimento e da sua saúde.
              </p>
            </div>

            {/* Fatos Institucionais em Destaque Rápido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D7D2CA] flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9EC] flex items-center justify-center text-[#79C14E] shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#18191B]">Pós-Graduado em Nutrição Esportiva</h3>
                  <p className="text-xs text-[#56595F] mt-0.5">Mais de 10 anos de experiência clínica embasada em evidências.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D7D2CA] flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#FEF4EC] flex items-center justify-center text-[#F18536] shrink-0 mt-0.5">
                  <Medal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#18191B]">Mestre Faixa Preta 6º Grau</h3>
                  <p className="text-xs text-[#56595F] mt-0.5">Mais de 30 anos de prática contínua e vivência esportiva.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D7D2CA] flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9EC] flex items-center justify-center text-[#79C14E] shrink-0 mt-0.5">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#18191B]">Treinador Internacional</h3>
                  <p className="text-xs text-[#56595F] mt-0.5">Responsável por academias no Brasil, Austrália, EUA e Suécia.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D7D2CA] flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-[#FEF4EC] flex items-center justify-center text-[#F18536] shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#18191B]">Atleta Campeão Multidisciplinar</h3>
                  <p className="text-xs text-[#56595F] mt-0.5">Campeão no Jiu-Jitsu, Judô (Faixa Preta desde 2007) e MMA.</p>
                </div>
              </div>
            </div>

            {/* CTAs de Ação Superior */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsBioModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191B] hover:bg-[#2D313A] text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-[#79C14E]" />
                <span>Ler Apresentação Completa do Profissional</span>
                <ArrowRight className="w-4 h-4 text-[#A0A4AE]" />
              </button>

              <button
                type="button"
                onClick={() => openRequestModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F0F9EC] border border-[#D7D2CA] hover:border-[#79C14E] text-[#18191B] text-xs sm:text-sm font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#F18536]" />
                <span>Conversar sobre Consulta</span>
              </button>
            </div>

          </div>

        </div>

        {/* SEÇÃO INFERIOR: PAINEL DE DIPLOMAS E PROVAS DOCUMENTAIS OFICIAIS */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#D7D2CA] p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#79C14E] tracking-wider mb-1">
                <FileCheck className="w-4 h-4" />
                <span>Certificações Oficiais Homologadas</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#18191B]">
                Comprovação Documental: Diplomas & Titulações
              </h3>
              <p className="text-xs sm:text-sm text-[#56595F] mt-0.5">
                Clique em qualquer diploma abaixo para visualizar a via original em alta resolução.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F9EC] border border-[#79C14E]/30 text-xs font-bold text-[#2A5C1B] self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-[#79C14E]" />
              <span>4 Documentos Verificados</span>
            </span>
          </div>

          {/* Grid de Diplomas Clicáveis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIPLOMAS.map((dip, idx) => (
              <button
                key={dip.id}
                type="button"
                onClick={() => handleOpenDiploma(idx)}
                className="group text-left p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#FFFFFF] border border-[#D7D2CA] hover:border-[#79C14E] transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#79C14E]"
              >
                <div>
                  {/* Preview Thumbnail com Efeito de Inspeção */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#EFECE6] border border-[#D7D2CA]/60 flex items-center justify-center">
                    <img
                      src={dip.imageSrc}
                      alt={dip.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#18191B]/20 group-hover:bg-[#18191B]/5 transition-colors" />
                    
                    <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#FFFFFF]/90 backdrop-blur-xs text-[#18191B] shadow-2xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#56595F] group-hover:text-[#79C14E] transition-colors" />
                    </div>

                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#18191B]/80 text-white backdrop-blur-xs">
                      {dip.category === 'nutricao' ? 'Nutrição' : 'Jiu-Jitsu'}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#79C14E] block mb-1">
                    {dip.verificationBadge}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#18191B] leading-snug group-hover:text-[#79C14E] transition-colors mb-1.5">
                    {dip.title}
                  </h4>
                  <p className="text-xs text-[#56595F] line-clamp-2 leading-relaxed">
                    {dip.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs font-semibold text-[#18191B]">
                  <span className="group-hover:text-[#79C14E] transition-colors">Visualizar Diploma</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#737780] group-hover:text-[#79C14E] transition-colors" />
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VISUALIZADOR DE DIPLOMA EM ALTA RESOLUÇÃO COM NAVEGAÇÃO ENTRE ELES */}
      {/* ========================================================================= */}
      {currentDiploma && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="diploma-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#18191B]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedDiplomaIndex(null)}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl border border-[#D7D2CA] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="px-5 sm:px-6 py-4 border-b border-[#EBE7DF] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9EC] flex items-center justify-center text-[#79C14E]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#79C14E] block">
                    Documento {selectedDiplomaIndex! + 1} de {DIPLOMAS.length} · {currentDiploma.verificationBadge}
                  </span>
                  <h3 id="diploma-modal-title" className="font-display font-bold text-base sm:text-lg text-[#18191B]">
                    {currentDiploma.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Botões de Navegação Anterior/Próximo */}
                <button
                  type="button"
                  onClick={handlePrevDiploma}
                  aria-label="Diploma anterior"
                  className="p-2 rounded-full hover:bg-[#EFECE6] text-[#56595F] hover:text-[#18191B] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDiploma}
                  aria-label="Próximo diploma"
                  className="p-2 rounded-full hover:bg-[#EFECE6] text-[#56595F] hover:text-[#18191B] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDiplomaIndex(null)}
                  aria-label="Fechar visualização"
                  className="p-2 rounded-full hover:bg-[#EFECE6] text-[#56595F] hover:text-[#18191B] transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conteúdo do Modal: Imagem do Diploma + Contextualização Técnica */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Moldura de Alta Resolução da Imagem */}
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#D7D2CA] p-2 sm:p-4 flex items-center justify-center">
                <img
                  src={currentDiploma.imageSrc}
                  alt={currentDiploma.title}
                  className="w-auto h-auto max-h-[58vh] object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Informações detalhadas do Documento */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#D7D2CA]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#18191B]">
                    {currentDiploma.subtitle}
                  </span>
                  <span className="text-[11px] font-semibold text-[#56595F]">
                    {currentDiploma.institution}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#56595F] leading-relaxed">
                  {currentDiploma.description}
                </p>
              </div>

              {/* Miniaturas dos outros diplomas para troca instantânea */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737780] block mb-2">
                  Alternar entre os documentos disponíveis:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {DIPLOMAS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedDiplomaIndex(idx)}
                      className={`p-1.5 rounded-xl border transition-all text-left flex items-center gap-2 ${
                        selectedDiplomaIndex === idx
                          ? 'border-[#79C14E] bg-[#F0F9EC]'
                          : 'border-[#D7D2CA] bg-[#FFFFFF] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-8 h-8 object-cover rounded-md shrink-0"
                      />
                      <span className="text-[11px] font-medium text-[#18191B] truncate hidden sm:inline">
                        {item.title.split('—')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer com CTA de Fechamento ou Agendamento */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FAF8F5] border-t border-[#EBE7DF] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#56595F]">
                <CheckCircle2 className="w-4 h-4 text-[#79C14E]" />
                <span>Documento oficial apresentado para transparência ética e credibilidade clínica.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDiplomaIndex(null)}
                  className="px-4 py-2 rounded-full border border-[#D7D2CA] text-xs font-semibold text-[#18191B] hover:bg-[#FFFFFF] transition-colors"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDiplomaIndex(null);
                    openRequestModal();
                  }}
                  className="px-5 py-2 rounded-full bg-[#F18536] hover:bg-[#D96F22] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Agendar com o Especialista
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MEMORIAL COMPLETO DE CARREIRA E APRESENTAÇÃO DO DR. LUIZ TANNURI */}
      {/* ========================================================================= */}
      {isBioModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bio-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#18191B]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsBioModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl border border-[#D7D2CA] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Memorial */}
            <div className="px-6 py-4 border-b border-[#EBE7DF] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F0F9EC] flex items-center justify-center text-[#79C14E]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#79C14E] block">
                    Memorial Profissional & Esportivo
                  </span>
                  <h3 id="bio-modal-title" className="font-display font-bold text-xl text-[#18191B]">
                    Dr. Luiz Tannuri — Apresentação Completa
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                aria-label="Fechar memorial"
                className="p-2 rounded-full hover:bg-[#EFECE6] text-[#56595F] hover:text-[#18191B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo com a Biografia Completa e Estruturada */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Destaque com Foto e Síntese de Vida */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-[#F6F3EE] border border-[#D7D2CA]">
                <img
                  src={TANNURI_IMAGES.tannuri6.src}
                  alt="Dr. Luiz Tannuri"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#D7D2CA] shadow-xs shrink-0"
                />
                <div>
                  <h4 className="font-display font-bold text-xl text-[#18191B]">
                    Luiz Tannuri
                  </h4>
                  <p className="text-xs text-[#79C14E] font-bold uppercase tracking-wider mb-2">
                    Nutricionista Esportivo & Mestre Faixa Preta 6º Grau
                  </p>
                  <p className="text-xs sm:text-sm text-[#56595F] leading-relaxed">
                    Especialista em performance esportiva, emagrecimento sustentável e saúde metabólica. Uma trajetória marcada por mais de três décadas de imersão nos tatames mais competitivos do mundo e mais de uma década de prática clínica científica.
                  </p>
                </div>
              </div>

              {/* Linha do Tempo & Conquistas Principais */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-[#18191B] border-b border-[#EBE7DF] pb-2">
                  Marcos Curriculares & Atuação Internacional
                </h4>

                <div className="space-y-3">
                  
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7D2CA] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#79C14E] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#18191B] block">
                        Pós-Graduação em Nutrição Esportiva (10+ Anos de Prática Clínica)
                      </strong>
                      <p className="text-xs text-[#56595F] mt-1 leading-relaxed">
                        Nutricionista dedicado ao acompanhamento de atletas de alto rendimento e praticantes amadores. Foco em periodização de macronutrientes, timing pré e pós-esforço, hidratação avançada e controle de composição corporal sem extremismos alimentares.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7D2CA] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F18536] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#18191B] block">
                        Mestrado Marcial: Faixa Preta 6º Grau de Jiu-Jitsu (30+ Anos)
                      </strong>
                      <p className="text-xs text-[#56595F] mt-1 leading-relaxed">
                        Mais de 30 anos no tatame com graduação superior homologada pela CBJJ. Uma vivência visceral que compreende as dores articulares, a desidratação em semanas de luta e a necessidade de energia sustentável para treinar forte e trabalhar no dia seguinte.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7D2CA] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#79C14E] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#18191B] block">
                        Professor de Judô Faixa Preta (Desde 2007) & Campeão Multidisciplinar
                      </strong>
                      <p className="text-xs text-[#56595F] mt-1 leading-relaxed">
                        Faixa preta de Judô diplomado desde 2007. Atleta campeão de Jiu-Jitsu, Judô e com vivência em artes marciais mistas (MMA), testando em seu próprio corpo o peso das categorias e os métodos de regeneração fisiológica.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7D2CA] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F18536] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#18191B] block">
                        Liderança Esportiva e Gestão de Academias em 4 Países
                      </strong>
                      <p className="text-xs text-[#56595F] mt-1 leading-relaxed">
                        Treinador responsável pela formação de atletas e gestão de centros esportivos no Brasil, Austrália, Estados Unidos e Suécia. Essa bagagem multicultural permite atender pacientes de diversos fusos horários e realidades com total empatia.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7D2CA] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#79C14E] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#18191B] block">
                        Experiência com Atletas Profissionais & Praticantes Reais
                      </strong>
                      <p className="text-xs text-[#56595F] mt-1 leading-relaxed">
                        Elaboração de planos alimentares para lutadores de ponta, fisiculturistas, corredores e pessoas comuns que desejam emagrecer, ganhar massa magra e ter disposição inabalável no dia a dia.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Filosofia de Atendimento */}
              <div className="p-5 rounded-2xl bg-[#F0F9EC] border border-[#79C14E]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#79C14E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2A5C1B]">
                    A Filosofia Clínica do Dr. Tannuri
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#18191B] leading-relaxed">
                  "O plano alimentar mais sofisticado do mundo é inútil se você não conseguir sustentá-lo na rotina real da sua semana. Meu papel é unir a precisão da ciência à realidade da sua vida profissional e de treino, garantindo prazer, clareza e longevidade aos seus resultados."
                </p>
              </div>

            </div>

            {/* Footer do Memorial */}
            <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#EBE7DF] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#D7D2CA] text-xs font-semibold text-[#18191B] hover:bg-[#FFFFFF] transition-colors"
              >
                Voltar à Página
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsBioModalOpen(false);
                  openRequestModal();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F18536] hover:bg-[#D96F22] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta com Dr. Tannuri</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
