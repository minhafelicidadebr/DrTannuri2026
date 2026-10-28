import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Activity, 
  HeartHandshake, 
  ChevronRight, 
  ArrowUpRight, 
  Lock, 
  Eye, 
  EyeOff,
  KeyRound,
  X,
  AlertCircle,
  Compass, 
  Zap, 
  Award, 
  Calendar,
  Share2,
  Check
} from 'lucide-react';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { PatientTrustCluster } from '../common/PatientTrustCluster';
import { GoogleAuthorityCard } from '../common/GoogleAuthorityCard';
import { GoogleReviewsModal } from '../common/GoogleReviewsModal';

interface ComingSoonLandingProps {
  onExploreFullApp: () => void;
}

// Dr. Tannuri portraits in /public
const DOCTOR_PORTRAITS = [
  {
    id: 'hero-1',
    src: '/Dr.tannuri-hero.png',
    title: 'Dr. Tannuri (Retrato Principal)',
    subtitle: 'Medicina e Nutrição de Precisão'
  },
  {
    id: 'hero-2',
    src: '/Dr.tannuri-hero 2.png',
    title: 'Dr. Tannuri (Perspectiva Clínica 2)',
    subtitle: 'Atendimento Humanizado'
  },
  {
    id: 'hero-3',
    src: '/Dr.tannuri-hero 3.png',
    title: 'Dr. Tannuri (Perspectiva Clínica 3)',
    subtitle: 'Foco e Longevidade'
  },
  {
    id: 'hero-4',
    src: '/Dr.tannuri-hero 4.png',
    title: 'Dr. Tannuri (Perspectiva Clínica 4)',
    subtitle: 'Composição Corporal'
  },
  {
    id: 'hero-5',
    src: '/Dr.tannuri-hero 5.png',
    title: 'Dr. Tannuri (Perspectiva Clínica 5)',
    subtitle: 'Inovação Científica'
  }
];

const HEALTH_GOALS = [
  { id: 'emagrecimento', label: 'Emagrecimento & Recomposição', icon: Activity },
  { id: 'longevidade', label: 'Longevidade & Vitalidade', icon: Zap },
  { id: 'glicemia', label: 'Controle Glicêmico & CGM', icon: Award },
  { id: 'digestiva', label: 'Saúde Digestiva & Intestinal', icon: HeartHandshake },
  { id: 'performance', label: 'Energia, Disposição & Foco', icon: Compass },
];

export function ComingSoonLanding({ onExploreFullApp }: ComingSoonLandingProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('emagrecimento');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vipPosition, setVipPosition] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  // Team preview password protection
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleOpenPasswordModal = () => {
    setPasswordInput('');
    setPasswordError(null);
    setShowPassword(false);
    setIsPasswordModalOpen(true);
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const normalized = passwordInput.trim().toLowerCase();
    if (normalized === 'drtannuri') {
      setPasswordError(null);
      setIsPasswordModalOpen(false);
      onExploreFullApp();
    } else {
      setPasswordError('Senha incorreta. Por favor, digite a senha autorizada da equipe.');
    }
  };

  // Check if previously subscribed
  useEffect(() => {
    try {
      const savedLead = localStorage.getItem('drtannuri_vip_subscriber');
      if (savedLead) {
        const parsed = JSON.parse(savedLead);
        setIsSubmitted(true);
        setVipPosition(parsed.position || 48);
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    
    // Format (XX) XXXXX-XXXX
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    setWhatsapp(val);
  };

  const handleSubmitVip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const assignedPosition = Math.floor(Math.random() * 15) + 38;
      const subscriberData = {
        name,
        whatsapp,
        email,
        goal: selectedGoal,
        date: new Date().toISOString(),
        position: assignedPosition
      };

      try {
        localStorage.setItem('drtannuri_vip_subscriber', JSON.stringify(subscriberData));
        const allLeads = JSON.parse(localStorage.getItem('drtannuri_vip_leads') || '[]');
        allLeads.push(subscriberData);
        localStorage.setItem('drtannuri_vip_leads', JSON.stringify(allLeads));
      } catch {
        // ignore
      }

      setVipPosition(assignedPosition);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 600);
  };

  const handleDirectWhatsapp = () => {
    const text = encodeURIComponent(
      `Olá, equipe do Dr. Tannuri! Vi que a nova plataforma digital está em preparação. Gostaria de saber sobre a disponibilidade atual para agendamento de consulta particular.`
    );
    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dr. Tannuri — Em Breve Nova Plataforma Digital',
        text: 'Uma nova era em Nutrologia e Medicina Metabólica de Precisão está sendo preparada.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentPortrait = DOCTOR_PORTRAITS[selectedPhotoIndex];

  return (
    <div className="min-h-screen bg-[#EDF4EA] text-[#0A160F] selection:bg-[#72B818] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Ambient Lighting Layers - Warm Botanical Sunlight & Sage Reflections */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_900px_at_50%_-100px,rgba(114,184,24,0.18),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_700px_at_85%_35%,rgba(235,101,26,0.08),transparent)] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_15%_75%,rgba(25,135,116,0.08),transparent)] pointer-events-none -z-10" aria-hidden="true" />

      {/* Top Notification / Team Preview Bar */}
      <div className="border-b border-[#CCD8C4] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Brand Monogram */}
            <div className="w-9 h-9 rounded-xl bg-[#0A160F] text-white flex items-center justify-center font-bold font-serif text-base shadow-sm">
              DT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-[#0A160F]">
                  DR. TANNURI
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-data font-semibold bg-[#E2ECE0] text-[#2C6E14] border border-[#CCD8C4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-pulse" />
                  Calibração 2026
                </span>
              </div>
              <p className="text-[11px] text-[#566D5D] hidden sm:block">
                Medicina Metabólica & Nutrição de Alta Precisão
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={handleDirectWhatsapp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#CCD8C4] text-[#0A160F] hover:border-[#25D366] hover:text-[#128C7E] shadow-2xs transition-all cursor-pointer"
              title="Atendimento e agendamento particular"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              Consultas em Andamento
            </button>

            {/* Discreet Team Full App Preview Toggle with Password Protection */}
            <button
              onClick={handleOpenPasswordModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0A160F] text-white hover:bg-[#2C6E14] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              title="Acesso restrito para a equipe médica e técnica"
            >
              <Lock className="w-3.5 h-3.5 text-[#72B818] group-hover:text-white transition-colors" />
              <span className="hidden md:inline">Acesso da Equipe ·</span> Ver App Completo
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero & Welcome Narrative */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20">
        
        {/* Editorial Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#CCD8C4] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EB651A]" />
            <span className="text-xs font-mono-data font-bold tracking-wider text-[#2C6E14] uppercase">
              Em Breve · Nova Experiência Digital
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE0] text-[#566D5D] text-xs font-medium border border-[#CCD8C4]/60">
            <Clock className="w-3 h-3 text-[#566D5D]" />
            Fase Final de Consolidação
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-[#0A160F] tracking-tight leading-[1.15] mb-5">
            Uma nova era em <span className="italic font-normal text-[#2C6E14]">Nutrologia & Medicina Metabólica</span> está sendo preparada.
          </h1>
          <p className="text-base sm:text-lg text-[#3E5244] leading-relaxed max-w-2xl mx-auto mb-6">
            Estamos integrando os últimos detalhes da nossa plataforma digital. Uma experiência sem precedentes com telemetria celular, diagnóstico em tempo real e acompanhamento médico contínuo para transformar a sua saúde.
          </p>

          {/* Social Proof & Google Reviews Authority Dock (Attachments Inspiration) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-[#CCD8C4] shadow-xs backdrop-blur-xs">
            <PatientTrustCluster
              theme="light"
              onClick={() => setReviewsModalOpen(true)}
              showReviewsHint
            />
            <div className="hidden sm:block w-px h-8 bg-[#CCD8C4]" />
            <GoogleAuthorityCard
              variant="hero-badge"
              onOpenReviewsModal={() => setReviewsModalOpen(true)}
            />
          </div>
        </div>

        {/* Dual Column: Dr. Tannuri Portrait Card + VIP Early Access Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          
          {/* Left / Top: Master Portrait Presentation */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md group">
              
              {/* Decorative Subtle Aura Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#72B818]/25 via-transparent to-[#EB651A]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
              
              {/* Main Portrait Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#CCD8C4] shadow-[0_24px_50px_rgba(10,22,15,0.12)] p-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#E2ECE0]">
                  <img
                    src={encodeURI(currentPortrait.src)}
                    alt="Dr. Tannuri"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Gradient Overlay for bottom text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A160F]/90 via-[#0A160F]/25 to-transparent pointer-events-none" />

                  {/* Badges on Top of Photo */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#0A160F] shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E14]" />
                      Prática Ética & Evidência
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono-data font-bold bg-[#0A160F]/80 text-[#72B818] backdrop-blur-md">
                      HD 2026
                    </span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-[#CCD8C4] shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-[#0A160F] leading-tight">
                          Dr. Tannuri
                        </h3>
                        <p className="text-[11px] text-[#566D5D]">
                          Coordenação Clínica, Nutrologia & Precisão Metabólica
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#EBF3E8] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14]">
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Selector Strip (Allows checking all 5 user uploaded photos!) */}
                <div className="mt-3 pt-2 border-t border-[#E2ECE0] flex items-center justify-between px-1">
                  <span className="text-[11px] text-[#566D5D] font-medium flex items-center gap-1">
                    Retratos Oficiais:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {DOCTOR_PORTRAITS.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`w-7 h-7 rounded-md overflow-hidden border transition-all cursor-pointer ${
                          selectedPhotoIndex === idx
                            ? 'border-[#2C6E14] ring-2 ring-[#72B818]/40 scale-105'
                            : 'border-[#CCD8C4] opacity-70 hover:opacity-100'
                        }`}
                        title={`Visualizar foto ${idx + 1}`}
                      >
                        <img src={encodeURI(p.src)} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Discreet Quote below photo */}
              <p className="mt-4 text-center text-xs text-[#566D5D] italic">
                "Não tratamos apenas exames. Transformamos o metabolismo com ciência rigorosa, respeito à sua rotina e comida de verdade."
              </p>
            </div>
          </div>

          {/* Right / Bottom: VIP Early Access Form & Direct Concierge */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-[#CCD8C4] p-6 sm:p-8 shadow-[0_16px_40px_rgba(10,22,15,0.06)] relative">
              
              {/* Header inside Card */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF2EB] text-[#EB651A] text-xs font-mono-data font-bold mb-2">
                  <Sparkles className="w-3 h-3" />
                  Lista VIP de Abertura & Pré-Lançamento
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#0A160F] tracking-tight">
                  Seja o primeiro a vivenciar a nova plataforma
                </h2>
                <p className="text-xs sm:text-sm text-[#566D5D] mt-2">
                  Cadastre-se para garantir prioridade na liberação gradual das vagas de consulta e receber em primeira mão o novo protocolo de saúde integrativa.
                </p>
              </div>

              {/* Form or Success State */}
              {isSubmitted ? (
                <div className="bg-[#EBF3E8] border border-[#CCD8C4] rounded-xl p-6 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2C6E14] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A160F] mb-1">
                    Inscrição Confirmada na Lista VIP!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2C4032] mb-4">
                    Você garantiu a posição <strong className="font-mono-data text-[#2C6E14]">#{vipPosition || 42}</strong> na fila de prioridade. Assim que a plataforma for publicada, você receberá a notificação em primeira mão.
                  </p>
                  
                  <div className="p-3 bg-white rounded-lg border border-[#CCD8C4] text-left text-xs text-[#566D5D] mb-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Nome:</span>
                      <strong className="text-[#0A160F]">{name || 'Cadastrado'}</strong>
                    </div>
                    {whatsapp && (
                      <div className="flex justify-between">
                        <span>WhatsApp:</span>
                        <strong className="text-[#0A160F]">{whatsapp}</strong>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleDirectWhatsapp}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Falar com a Equipe Agora
                    </button>
                    <button
                      onClick={handleShare}
                      className="py-2.5 px-4 rounded-lg bg-white border border-[#CCD8C4] hover:bg-[#E2ECE0] text-[#0A160F] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2C6E14]" /> : <Share2 className="w-3.5 h-3.5" />}
                      {copiedLink ? 'Link Copiado!' : 'Compartilhar'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitVip} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#0A160F] uppercase tracking-wider mb-1.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dra. Mariana Costa ou Roberto Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F9F2] border border-[#CCD8C4] text-sm text-[#0A160F] placeholder-[#8DA693] focus:bg-white focus:border-[#72B818] focus:ring-1 focus:ring-[#72B818] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0A160F] uppercase tracking-wider mb-1.5">
                        WhatsApp (com DDD)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(61) 99128-3139"
                        value={whatsapp}
                        onChange={handlePhoneChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F9F2] border border-[#CCD8C4] text-sm text-[#0A160F] placeholder-[#8DA693] focus:bg-white focus:border-[#72B818] focus:ring-1 focus:ring-[#72B818] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A160F] uppercase tracking-wider mb-1.5">
                        E-mail (Opcional)
                      </label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F9F2] border border-[#CCD8C4] text-sm text-[#0A160F] placeholder-[#8DA693] focus:bg-white focus:border-[#72B818] focus:ring-1 focus:ring-[#72B818] transition-all"
                      />
                    </div>
                  </div>

                  {/* Health Goal Preference */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A160F] uppercase tracking-wider mb-2">
                      Qual seu foco principal de saúde?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HEALTH_GOALS.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;
                        return (
                          <button
                            type="button"
                            key={goal.id}
                            onClick={() => setSelectedGoal(goal.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer text-xs ${
                              isSelected
                                ? 'bg-[#EBF3E8] border-[#2C6E14] text-[#0A160F] font-bold shadow-xs'
                                : 'bg-[#F5F9F2] border-[#CCD8C4]/60 text-[#566D5D] hover:border-[#CCD8C4] hover:bg-white'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#2C6E14]' : 'text-[#8DA693]'}`} />
                            <span className="truncate">{goal.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2C6E14] hover:bg-[#1E4D0E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Cadastrando na Lista VIP...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#72B818]" />
                        Entrar na Lista VIP de Abertura
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#8DA693]">
                    Garantia de privacidade. Seus dados não serão compartilhados com terceiros.
                  </p>
                </form>
              )}

              {/* Direct Urgent Care Banner */}
              <div className="mt-6 pt-5 border-t border-[#CCD8C4]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F5F9F2] p-4 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-[#0A160F] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2C6E14]" />
                    Precisa de consulta imediata?
                  </h4>
                  <p className="text-[11px] text-[#566D5D]">
                    A agenda do consultório funciona normalmente pelo WhatsApp.
                  </p>
                </div>
                <button
                  onClick={handleDirectWhatsapp}
                  className="shrink-0 text-xs font-bold text-[#2C6E14] hover:text-[#1E4D0E] flex items-center gap-1 cursor-pointer underline underline-offset-2"
                >
                  Falar no WhatsApp
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars of the Upcoming App (Benchmark State-of-the-Art) */}
        <section className="mt-8 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono-data font-bold text-[#2C6E14] uppercase tracking-wider">
              O que está por vir
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#0A160F] mt-1">
              Pilares da Nova Experiência Dr. Tannuri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl border border-[#CCD8C4] p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#EBF3E8] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#0A160F] mb-1">
                Telemetria & Biomarcadores
              </h4>
              <p className="text-xs text-[#566D5D] leading-relaxed">
                Integração de Bioimpedância InBody segmentada e monitoramento de glicose contínua (CGM) para decisões baseadas em dados reais.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl border border-[#CCD8C4] p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2EB] border border-[#CCD8C4] flex items-center justify-center text-[#EB651A] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#0A160F] mb-1">
                Gêmeo Metabólico Digital
              </h4>
              <p className="text-xs text-[#566D5D] leading-relaxed">
                Simulações interativas para prever sua curva de energia, saciedade e impacto metabólico antes de cada refeição.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl border border-[#CCD8C4] p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#EBF3E8] border border-[#CCD8C4] flex items-center justify-center text-[#2C6E14] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#0A160F] mb-1">
                Protocolos Personalizados
              </h4>
              <p className="text-xs text-[#566D5D] leading-relaxed">
                Planos alimentares quinzenais dinâmicos, cardápios de alta densidade nutricional e adaptação contínua à sua rotina.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-xl border border-[#CCD8C4] p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#F5F9F2] border border-[#CCD8C4] flex items-center justify-center text-[#0A160F] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#0A160F] mb-1">
                Portal do Paciente & IA
              </h4>
              <p className="text-xs text-[#566D5D] leading-relaxed">
                Acesso contínuo pelo celular com receitas sob medida, canal prioritário de mensagens e assistente inteligente 24/7.
              </p>
            </div>

          </div>
        </section>

        {/* Authority & Google Reviews Showcase (Inspired by Attachments) */}
        <section className="my-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-[#FAFDF8] to-[#EEF5E9] border border-[#CCD8C4] shadow-[0_16px_40px_rgba(20,40,25,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5E5] border border-[#CCD8C4] text-[#2C6E14] text-xs font-mono-data font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E14]" />
                <span>EXPERIÊNCIA CLÍNICA & REPUTAÇÃO OFICIAL</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F] tracking-tight mb-3">
                Mais de 2.000 pacientes transformados com ciência, humanização e zero terrorismo
              </h3>

              <p className="text-sm text-[#384C3E] leading-relaxed mb-6">
                Enquanto preparamos a nova plataforma digital, nossa clínica mantém a nota máxima de satisfação nas avaliações do Google, com atendimento individualizado e focado em resultados reais.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-xs w-full max-w-lg mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <PatientTrustCluster
                  theme="light"
                  onClick={() => setReviewsModalOpen(true)}
                  showReviewsHint
                />
                <button
                  onClick={() => setReviewsModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4FAEE] hover:bg-[#1B4D24] text-[#2C6E14] hover:text-white border border-[#CCD8C4] text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  Ver relatos reais
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#566D5D]">
                <span className="flex items-center gap-1.5 text-[#0A160F] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6E14]" />
                  100% 5 estrelas
                </span>
                <span>•</span>
                <span>Consultas presenciais e online</span>
                <span>•</span>
                <span>Conformidade CFN / CRN</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <GoogleAuthorityCard
                variant="card"
                onOpenReviewsModal={() => setReviewsModalOpen(true)}
              />
            </div>

          </div>
        </section>

        {/* Development Roadmap / Transparency Indicator */}
        <section className="bg-white rounded-2xl border border-[#CCD8C4] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xs mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono-data font-bold text-[#2C6E14] uppercase tracking-wider">
                Status dos Sistemas
              </span>
              <h3 className="text-lg font-bold text-[#0A160F]">
                Calibração da Plataforma em Andamento
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#EBF3E8] text-[#2C6E14] text-xs font-mono-data font-bold border border-[#CCD8C4]">
              94% Concluído
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-[#E2ECE0] overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-[#2C6E14] to-[#72B818] rounded-full w-[94%] transition-all duration-1000" />
          </div>

          {/* Milestones Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#0A160F]">
              <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
              <span>Protocolos Clínicos Validados</span>
            </div>
            <div className="flex items-center gap-2 text-[#0A160F]">
              <CheckCircle2 className="w-4 h-4 text-[#2C6E14] shrink-0" />
              <span>Diagnóstico Inteligente Pronto</span>
            </div>
            <div className="flex items-center gap-2 text-[#0A160F]">
              <div className="w-4 h-4 rounded-full border-2 border-[#72B818] border-t-transparent animate-spin shrink-0" />
              <span className="font-semibold text-[#2C6E14]">Polimento de Design Mobile</span>
            </div>
            <div className="flex items-center gap-2 text-[#8DA693]">
              <div className="w-4 h-4 rounded-full border border-[#CCD8C4] shrink-0" />
              <span>Abertura da Lista VIP</span>
            </div>
          </div>
        </section>

        {/* Developer / Client Action Callout */}
        <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#E2ECE0] to-[#EBF3E8] border border-[#CCD8C4] max-w-2xl mx-auto">
          <div className="w-8 h-8 rounded-full bg-white border border-[#CCD8C4] flex items-center justify-center mx-auto mb-2 text-[#0A160F]">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-[#0A160F] mb-1">
            Espaço de Desenvolvimento & Validação
          </h4>
          <p className="text-xs text-[#566D5D] max-w-md mx-auto mb-4">
            Você é da equipe ou deseja testar todas as funcionalidades interativas do aplicativo enquanto ele não é publicado oficialmente?
          </p>
          <button
            onClick={handleOpenPasswordModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A160F] hover:bg-[#2C6E14] text-white text-xs font-bold shadow-sm transition-all cursor-pointer group"
          >
            <Lock className="w-3.5 h-3.5 text-[#72B818] group-hover:text-white transition-colors" />
            Acessar Prévia da Plataforma Completa
          </button>
        </div>

      </main>

      {/* Regulatory & Institutional Footer */}
      <footer className="border-t border-[#CCD8C4] bg-white/70 py-8 px-4 text-center text-xs text-[#566D5D]">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-[#0A160F]">
            Dr. Tannuri — Nutrologia & Nutrição de Precisão
          </p>
          <p className="text-[11px] max-w-2xl mx-auto">
            Prática médica e nutricional fundamentada em evidências científicas e ética profissional (CFN/CRN/CRM). Todas as simulações e dados do aplicativo têm finalidade ilustrativa e educativa. Condutas individuais são determinadas em consulta.
          </p>
          <div className="pt-3 text-[11px] text-[#8DA693] flex items-center justify-center gap-4">
            <span>{CLIENT_INFO.cityRegion}</span>
            <span>•</span>
            <button 
              onClick={handleDirectWhatsapp}
              className="hover:text-[#2C6E14] underline cursor-pointer"
            >
              WhatsApp Oficial: {CLIENT_INFO.primaryWhatsApp}
            </button>
          </div>
        </div>
      </footer>

      {/* Team Password Access Modal */}
      {isPasswordModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A160F]/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-auth-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPasswordModalOpen(false);
            }
          }}
        >
          <div 
            className="w-full max-w-md bg-white rounded-2xl border border-[#CCD8C4] shadow-2xl p-6 sm:p-7 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#566D5D] hover:text-[#0A160F] hover:bg-[#E2ECE0] transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge & Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0A160F] text-[#72B818] flex items-center justify-center shadow-xs">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono-data font-bold bg-[#E2ECE0] text-[#2C6E14] border border-[#CCD8C4] mb-1">
                  Ambiente Protegido
                </span>
                <h3 id="team-auth-title" className="text-base font-bold text-[#0A160F]">
                  Acesso da Equipe & Desenvolvimento
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#566D5D] mb-5 leading-relaxed">
              O aplicativo completo está em fase de refinamento. Digite a senha autorizada da equipe médica para acessar a prévia interativa.
            </p>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <label htmlFor="team-password" className="block text-xs font-semibold text-[#0A160F] mb-1.5">
                  Senha da Equipe
                </label>
                <div className="relative">
                  <input
                    id="team-password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    autoFocus
                    placeholder="Digite a senha..."
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-[#CCD8C4] bg-[#EDF4EA]/40 text-[#0A160F] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C6E14]/30 focus:border-[#2C6E14] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#566D5D] hover:text-[#0A160F] cursor-pointer"
                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-rose-600 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#566D5D] hover:text-[#0A160F] hover:bg-[#E2ECE0] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A160F] hover:bg-[#2C6E14] text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#72B818]" />
                  Acessar Plataforma
                </button>
              </div>
            </form>

            <div className="mt-5 pt-3.5 border-t border-[#CCD8C4]/60 text-center">
              <span className="text-[11px] text-[#8DA693]">
                Em caso de dúvidas sobre as credenciais, consulte o Dr. Tannuri ou a equipe de desenvolvimento.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Google Reviews Modal */}
      <GoogleReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />

    </div>
  );
}
