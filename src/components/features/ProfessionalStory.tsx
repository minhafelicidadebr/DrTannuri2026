import React, { useState, useEffect, useRef } from 'react';
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
import { OFFICIAL_DIPLOMAS, TANNURI_PORTRAIT, DiplomaItem } from '../../data/professionalCredentials';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { analytics } from '../../lib/analytics';

interface ProfessionalStoryProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenConcierge?: (prompt?: string) => void;
}

export const ProfessionalStory: React.FC<ProfessionalStoryProps> = ({
  onOpenBooking,
  onOpenConcierge,
}) => {
  const [selectedDiplomaIndex, setSelectedDiplomaIndex] = useState<number | null>(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Close modals on ESC key with focus restoration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDiplomaIndex !== null) {
          setSelectedDiplomaIndex(null);
          lastFocusedElementRef.current?.focus();
        }
        if (isBioModalOpen) {
          setIsBioModalOpen(false);
          lastFocusedElementRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDiplomaIndex, isBioModalOpen]);

  const handleOpenDiploma = (index: number) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setSelectedDiplomaIndex(index);
    analytics.track('diploma_view', 'engagement', { diplomaId: OFFICIAL_DIPLOMAS[index].id });
  };

  const handleCloseDiploma = () => {
    setSelectedDiplomaIndex(null);
    lastFocusedElementRef.current?.focus();
  };

  const handleOpenBio = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsBioModalOpen(true);
  };

  const handleCloseBio = () => {
    setIsBioModalOpen(false);
    lastFocusedElementRef.current?.focus();
  };

  const handleNextDiploma = () => {
    if (selectedDiplomaIndex !== null) {
      setSelectedDiplomaIndex((selectedDiplomaIndex + 1) % OFFICIAL_DIPLOMAS.length);
    }
  };

  const handlePrevDiploma = () => {
    if (selectedDiplomaIndex !== null) {
      setSelectedDiplomaIndex(
        (selectedDiplomaIndex - 1 + OFFICIAL_DIPLOMAS.length) % OFFICIAL_DIPLOMAS.length
      );
    }
  };

  const currentDiploma = selectedDiplomaIndex !== null ? OFFICIAL_DIPLOMAS[selectedDiplomaIndex] : null;

  return (
    <section
      id="trajetoria"
      className="py-16 md:py-24 bg-gradient-to-b from-[#F2F8ED] via-[#EDF5E9] to-[#E5EFE2] border-b border-[#CCD8C4] relative overflow-hidden text-[#0A160F]"
      aria-labelledby="story-title"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#72B818]/10 via-[#EB651A]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-tl from-[#72B818]/8 via-transparent to-transparent rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ROW SUPERIOR: Visual Hero com 'tannuri6' + Narrativa de Alta Autoridade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* COLUNA ESQUERDA: Imagem tannuri6 com Moldura Editorial e Badges de Honra */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#CCD8C4] shadow-[0_16px_40px_rgba(20,40,25,0.08)] bg-white p-3.5 sm:p-4 group">
              
              {/* Moldura interna com a imagem oficial tannuri6 */}
              <div className="relative flex justify-center items-center overflow-hidden rounded-2xl bg-[#F7FAF5] border border-[#CCD8C4]/70">
                <img
                  src={TANNURI_PORTRAIT.src}
                  alt={TANNURI_PORTRAIT.alt}
                  className="w-auto h-auto max-h-[520px] object-contain transition-transform duration-700 group-hover:scale-[1.02] block"
                  loading="lazy"
                  width={921}
                  height={1152}
                />

                {/* Badge Flutuante: Dupla Faixa Preta */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A160F]/90 backdrop-blur-md text-white border border-[#72B818]/60 text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
                  <span>Jiu-Jitsu 6º Grau & Judô Faixa Preta</span>
                </div>

                {/* Badge Flutuante: Nutrição Esportiva */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0A160F] border border-[#EB651A]/40 text-xs font-bold shadow-md">
                  <Award className="w-3.5 h-3.5 text-[#EB651A]" />
                  <span>Pós-Graduado há 10+ Anos</span>
                </div>
              </div>

              {/* Legenda institucional sob a foto */}
              <div className="mt-3.5 px-2 py-1 flex items-center justify-between text-xs text-[#566D5D]">
                <div>
                  <span className="font-bold text-[#0A160F] block text-sm font-display">
                    Dr. Luiz Tannuri
                  </span>
                  <span className="text-[11px] text-[#2C6E14] font-semibold">
                    Consultório em Brasília & Teleconsultas
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C6E14] hover:text-[#1F4A0C] transition-colors cursor-pointer"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CCD8C4] shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#72B818]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#2C6E14] font-mono-data">
                Trajetória, Mestrado e Ciência Aplicada
              </span>
            </div>

            {/* Título de alto impacto solicitado */}
            <h2
              id="story-title"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight leading-[1.12] mb-5"
            >
              Do Tatame à Consulta: Atenção Absoluta ao Contexto Real.
            </h2>

            {/* Subtítulo & Parágrafos Principais com Neuromarketing Ético */}
            <div className="space-y-4 text-base sm:text-lg text-[#384C3E] leading-relaxed mb-8">
              <p>
                Como <strong className="text-[#0A160F] font-semibold">nutricionista pós-graduado</strong>, <strong className="text-[#0A160F] font-semibold">mestre de jiu-jitsu faixa preta 6º grau</strong> e <strong className="text-[#0A160F] font-semibold">faixa preta de judô</strong>, Luiz Tannuri conhece de maneira profunda o que acontece dentro e fora do treino. Essa vivência prática dá contexto imediato à conversa; a avaliação bioquímica orienta o atendimento com exatidão.
              </p>
              <p className="text-[#0A160F] font-medium text-base sm:text-lg">
                Conhecimento técnico de alto nível, escuta acolhedora e explicações didáticas para você assumir o controle definitivo do seu rendimento e da sua saúde.
              </p>
            </div>

            {/* DESTAQUE PRINCIPAL: MESTRADO MARCIAL & DUPLA FAIXA PRETA (ToT Optimized) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0A160F] via-[#102417] to-[#0A160F] border border-[#72B818]/40 p-5 sm:p-7 shadow-[0_16px_40px_rgba(10,22,15,0.18)] mb-8 text-white relative overflow-hidden">
              {/* Glow decorativo sutil */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#72B818]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#AEE938] text-xs font-mono-data font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#AEE938] animate-pulse" />
                  <span>Autoridade de Tatame & Mestrado Marcial</span>
                </div>
                <span className="text-[11px] font-mono-data text-white/70">
                  30+ Anos de Prática Contínua
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                Mestre Faixa Preta 6º Grau de Jiu-Jitsu & Faixa Preta de Judô
              </h3>

              <p className="text-xs sm:text-sm text-[#CCD8C4] leading-relaxed mb-6">
                A união inseparável da tradição marcial com a nutrição esportiva de elite: vivência visceral de corte de peso, desidratação segura, recuperação celular e potência competitiva.
              </p>

              {/* Grid das Duas Artes Marciais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* 1. Jiu-Jitsu 6º Grau */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-[#AEE938]">
                        Jiu-Jitsu Brasileiro
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#72B818]/20 text-[#AEE938] font-bold">
                        6º Grau (2023)
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-white mb-1.5">
                      Mestre Faixa Preta 6º Grau
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed mb-3">
                      Certificado conferido em 2023 pela Fabricio International Team (chancelado por Mestres 8º e 7º Grau) e registro histórico na CBJJ (nº 157721) / IBJJF. Mais de 30 anos de liderança nos tatames.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenDiploma(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AEE938] hover:text-white transition-colors cursor-pointer self-start"
                  >
                    <span>Visualizar Certificado 6º Grau</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Judô Faixa Preta */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-[#EB651A]">
                        Judô Tradicional
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EB651A]/20 text-[#FFA066] font-bold">
                        Desde 2007
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-white mb-1.5">
                      Professor Faixa Preta de Judô
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed mb-3">
                      Diplomado em Judô há quase duas décadas (desde 2007). Rigor de alavancas biomecânicas, controle de potência muscular e vivência como atleta campeão e em Artes Marciais Mistas (MMA).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenDiploma(3)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFA066] hover:text-white transition-colors cursor-pointer self-start"
                  >
                    <span>Visualizar Registro de Graduação</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rodapé do Box: A Ponte Clínica & Alcance Internacional */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#72B818] shrink-0" />
                  <span>Treinador Internacional: Academias no Brasil, Austrália, EUA e Suécia.</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#EB651A] shrink-0" />
                  <span>Pós-Graduado em Nutrição Esportiva há 10+ anos.</span>
                </div>
              </div>
            </div>

            {/* CTAs de Ação Superior */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenBio}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0A160F] hover:bg-[#1B2B20] text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#72B818]" />
                <span>Ler Apresentação Completa do Profissional</span>
                <ArrowRight className="w-4 h-4 text-[#AEE938]" />
              </button>

              <button
                type="button"
                onClick={() => onOpenBooking('diagnostico_inicial')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#F2F8ED] border border-[#CCD8C4] hover:border-[#72B818] text-[#0A160F] text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#EB651A]" />
                <span>Conversar sobre Consulta</span>
              </button>
            </div>

          </div>

        </div>

        {/* SEÇÃO INFERIOR: PAINEL DE DIPLOMAS E TITULAÇÕES FORNECIDOS PELO PROFISSIONAL */}
        <div className="rounded-3xl bg-white border border-[#CCD8C4] p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(20,40,25,0.06)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CCD8C4] pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#2C6E14] font-mono-data tracking-wider mb-1">
                <FileCheck className="w-4 h-4 text-[#72B818]" />
                <span>Documentos Acadêmicos & Desportivos</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0A160F]">
                Diplomas & Titulações Fornecidos pelo Profissional
              </h3>
              <p className="text-xs sm:text-sm text-[#566D5D] mt-0.5">
                Clique em qualquer documento abaixo para visualizar a via em alta resolução com detalhes acadêmicos.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F9EC] border border-[#CCD8C4] text-xs font-bold text-[#2C6E14] self-start sm:self-auto shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#72B818]" />
              <span>4 Documentos Apresentados</span>
            </span>
          </div>

          {/* Grid de 4 Diplomas Clicáveis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {OFFICIAL_DIPLOMAS.map((dip, idx) => (
              <button
                key={dip.id}
                type="button"
                onClick={() => handleOpenDiploma(idx)}
                className="group text-left p-4 rounded-2xl bg-gradient-to-b from-[#FAFDF8] to-[#F2F8ED] hover:bg-white border border-[#CCD8C4] hover:border-[#72B818] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#72B818]"
              >
                <div>
                  {/* Preview Thumbnail com Efeito de Inspeção */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#E5EFE2] border border-[#CCD8C4]/60 flex items-center justify-center">
                    <img
                      src={dip.imageSrc}
                      alt={dip.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A160F]/15 group-hover:bg-[#0A160F]/5 transition-colors" />
                    
                    <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-[#0A160F] shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#566D5D] group-hover:text-[#2C6E14] transition-colors" />
                    </div>

                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0A160F]/80 text-white backdrop-blur-xs font-mono-data">
                      {dip.category === 'nutricao' ? 'Nutrição' : 'Jiu-Jitsu'}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C6E14] font-mono-data block mb-1">
                    {dip.verificationBadge}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#0A160F] leading-snug group-hover:text-[#2C6E14] transition-colors mb-1.5">
                    {dip.title}
                  </h4>
                  <p className="text-xs text-[#566D5D] line-clamp-2 leading-relaxed">
                    {dip.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#CCD8C4] flex items-center justify-between text-xs font-semibold text-[#0A160F]">
                  <span className="group-hover:text-[#2C6E14] transition-colors">Visualizar Documento</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#566D5D] group-hover:text-[#2C6E14] transition-colors" />
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A160F]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseDiploma}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#CCD8C4] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="px-5 sm:px-6 py-4 border-b border-[#CCD8C4] flex items-center justify-between bg-[#F8FAF5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9EC] flex items-center justify-center text-[#2C6E14]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2C6E14] font-mono-data block">
                    Documento {selectedDiplomaIndex! + 1} de {OFFICIAL_DIPLOMAS.length} · {currentDiploma.verificationBadge}
                  </span>
                  <h3 id="diploma-modal-title" className="font-display font-bold text-base sm:text-lg text-[#0A160F]">
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
                  className="p-2 rounded-full hover:bg-[#EDF4EA] text-[#566D5D] hover:text-[#0A160F] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDiploma}
                  aria-label="Próximo diploma"
                  className="p-2 rounded-full hover:bg-[#EDF4EA] text-[#566D5D] hover:text-[#0A160F] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleCloseDiploma}
                  aria-label="Fechar visualização"
                  className="p-2 rounded-full hover:bg-[#EDF4EA] text-[#566D5D] hover:text-[#0A160F] transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conteúdo do Modal: Imagem do Diploma + Contextualização Técnica */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Moldura de Alta Resolução da Imagem */}
              <div className="relative rounded-2xl overflow-hidden bg-[#F2F8ED] border border-[#CCD8C4] p-2 sm:p-4 flex items-center justify-center">
                <img
                  src={currentDiploma.imageSrc}
                  alt={currentDiploma.title}
                  className="w-auto h-auto max-h-[56vh] object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Informações detalhadas do Documento */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAF5] border border-[#CCD8C4]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs sm:text-sm font-bold text-[#0A160F]">
                    {currentDiploma.subtitle}
                  </span>
                  <span className="text-[11px] font-semibold text-[#566D5D]">
                    {currentDiploma.institution}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed">
                  {currentDiploma.description}
                </p>
              </div>

              {/* Miniaturas dos outros diplomas para troca instantânea */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#566D5D] font-mono-data block mb-2">
                  Alternar entre os documentos disponíveis:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OFFICIAL_DIPLOMAS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedDiplomaIndex(idx)}
                      className={`p-1.5 rounded-xl border transition-all text-left flex items-center gap-2 cursor-pointer ${
                        selectedDiplomaIndex === idx
                          ? 'border-[#72B818] bg-[#F0F9EC]'
                          : 'border-[#CCD8C4] bg-white hover:bg-[#F8FAF5]'
                      }`}
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-9 h-9 object-cover rounded-md shrink-0 border border-[#CCD8C4]"
                      />
                      <span className="text-[11px] font-medium text-[#0A160F] truncate">
                        {item.title.split('—')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer com CTA de Fechamento ou Agendamento */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAF5] border-t border-[#CCD8C4] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#566D5D]">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14]" />
                <span>Documento oficial apresentado para transparência ética e credibilidade clínica.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseDiploma}
                  className="px-4 py-2 rounded-xl border border-[#CCD8C4] text-xs font-semibold text-[#0A160F] hover:bg-white transition-colors cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseDiploma();
                    onOpenBooking('diagnostico_inicial');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#EB651A] hover:bg-[#C84A07] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Solicitar Agendamento
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A160F]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsBioModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#CCD8C4] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Memorial */}
            <div className="px-6 py-4 border-b border-[#CCD8C4] flex items-center justify-between bg-[#F8FAF5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F0F9EC] flex items-center justify-center text-[#2C6E14]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E14] font-mono-data block">
                    Memorial Profissional & Esportivo
                  </span>
                  <h3 id="bio-modal-title" className="font-display font-bold text-xl text-[#0A160F]">
                    Dr. Luiz Tannuri — Apresentação Completa
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                aria-label="Fechar memorial"
                className="p-2 rounded-full hover:bg-[#EDF4EA] text-[#566D5D] hover:text-[#0A160F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo com a Biografia Completa e Estruturada */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Destaque com Foto e Síntese de Vida */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-[#F2F8ED] border border-[#CCD8C4]">
                <img
                  src={TANNURI_PORTRAIT.src}
                  alt="Dr. Luiz Tannuri"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#CCD8C4] shadow-xs shrink-0"
                />
                <div>
                  <h4 className="font-display font-bold text-xl text-[#0A160F]">
                    Luiz Tannuri
                  </h4>
                  <p className="text-xs text-[#2C6E14] font-bold uppercase tracking-wider font-mono-data mb-2">
                    Nutricionista Esportivo & Mestre Faixa Preta 6º Grau
                  </p>
                  <p className="text-xs sm:text-sm text-[#384C3E] leading-relaxed">
                    Especialista em performance esportiva, recomposição corporal e saúde metabólica. Uma trajetória marcada por mais de três décadas de imersão nos tatames mais competitivos do mundo e mais de uma década de prática clínica embasada na ciência.
                  </p>
                </div>
              </div>

              {/* Linha do Tempo & Conquistas Principais */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-[#0A160F] border-b border-[#CCD8C4] pb-2">
                  Marcos Curriculares & Atuação Internacional
                </h4>

                <div className="space-y-3">
                  
                  <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#CCD8C4] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#72B818] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#0A160F] block">
                        Pós-Graduação em Nutrição Esportiva (10+ Anos de Prática Clínica)
                      </strong>
                      <p className="text-xs text-[#566D5D] mt-1 leading-relaxed">
                        Nutricionista dedicado ao acompanhamento de atletas de alto rendimento e praticantes de musculação e luta. Foco em periodização de macronutrientes, timing pré e pós-esforço, hidratação avançada e controle de composição corporal sem extremismos alimentares.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#CCD8C4] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#EB651A] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#0A160F] block">
                        Mestrado Marcial: Faixa Preta 6º Grau de Jiu-Jitsu (30+ Anos)
                      </strong>
                      <p className="text-xs text-[#566D5D] mt-1 leading-relaxed">
                        Mais de 30 anos no tatame com graduação superior homologada. Uma vivência visceral que compreende as dores articulares, o corte de peso com preservação de força e a necessidade de energia estável para treinar forte e render no dia a dia executivo.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#CCD8C4] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#72B818] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#0A160F] block">
                        Professor de Judô Faixa Preta (Desde 2007) & Campeão Multidisciplinar
                      </strong>
                      <p className="text-xs text-[#566D5D] mt-1 leading-relaxed">
                        Faixa preta de Judô diplomado desde 2007. Atleta campeão de Jiu-Jitsu, Judô e com vivência em artes marciais mistas (MMA), experimentando no próprio corpo as demandas das categorias de peso e regeneração fisiológica.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAF5] border border-[#CCD8C4] flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#EB651A] mt-2 shrink-0" />
                    <div>
                      <strong className="text-sm text-[#0A160F] block">
                        Liderança Esportiva e Gestão de Centros Esportivos em 4 Países
                      </strong>
                      <p className="text-xs text-[#566D5D] mt-1 leading-relaxed">
                        Treinador responsável pela formação de atletas e gestão de centros esportivos no Brasil, Austrália, Estados Unidos e Suécia. Essa bagagem multicultural permite atender pacientes de diversos fusos horários e realidades com total empatia.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Filosofia de Atendimento */}
              <div className="p-5 rounded-2xl bg-[#F0F9EC] border border-[#CCD8C4]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#72B818]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C6E14] font-mono-data">
                    A Filosofia Clínica do Dr. Tannuri
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0A160F] leading-relaxed italic">
                  "O plano alimentar mais sofisticado do mundo é inútil se você não conseguir sustentá-lo na rotina real da sua semana. Meu papel é unir a precisão da ciência à realidade da sua vida profissional e de treino, garantindo prazer, clareza e longevidade aos seus resultados."
                </p>
              </div>

            </div>

            {/* Footer do Memorial */}
            <div className="px-6 py-4 bg-[#F8FAF5] border-t border-[#CCD8C4] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsBioModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#CCD8C4] text-xs font-semibold text-[#0A160F] hover:bg-white transition-colors cursor-pointer"
              >
                Voltar à Página
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsBioModalOpen(false);
                  onOpenBooking('diagnostico_inicial');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#EB651A] hover:bg-[#C84A07] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
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
