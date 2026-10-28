import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  PhoneCall, 
  ShieldCheck, 
  Flame, 
  Activity, 
  Compass, 
  ArrowUpRight, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { analytics } from '../../lib/analytics';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { findAuditedTopic } from '../../data/aiSkillEngine';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: string;
  actionLinks?: Array<{
    label: string;
    targetId?: string;
    isWhatsApp?: boolean;
    customText?: string;
  }>;
}

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: 'Olá! Sou Clara, sua Concierge de Acolhimento Clínico do Dr. Luiz Tannuri.\n\nAtuamos com **nutrição esportiva e clínica de precisão para saúde inegociável e alta performance**. Aqui, aliamos ciência bioquímica, avaliação no InBody 120 e adaptação à sua rotina real.\n\nPosso te orientar sobre nossos 4 planos (Diagnóstico Inicial de 60 min, Programa Metabolismo 12 Semanas, Assinatura Contínua e Performance VIP), bioimpedância e valores transparentes para atendimento online e presencial em Brasília.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)\n• [InBody Clinical Research: Avaliação da Composição Corporal](https://inbody.com/research)\n\nQual objetivo você gostaria de priorizar agora?',
      timestamp: 'Agora',
      actionLinks: [
        { label: 'Ver Planos & Valores', targetId: 'planos' },
        { label: 'Trajetória & Diplomas', targetId: 'trajetoria' },
        { label: 'Falar com Recepção Humana', isWhatsApp: true }
      ]
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick navigation menu buttons
  const categoryMenus = [
    { id: 'todos', label: 'Início', icon: Compass },
    { id: 'planos', label: 'Planos & Valores', icon: Sparkles, query: 'Quais são os 4 planos do Dr. Luiz Tannuri, o que cada um inclui e quais são os valores para atendimento online e presencial?' },
    { id: 'inbody', label: 'Bioimpedância InBody 120', icon: Activity, query: 'Como funciona o exame de bioimpedância InBody 120 e o que ele afere?' },
    { id: 'trajetoria', label: 'Trajetória & Diplomas', icon: Flame, query: 'Quem é o Dr. Luiz Tannuri e quais são suas titulações e histórico nas artes marciais?' },
  ];

  // Smart functional tags with icons
  const smartTags = [
    { label: 'Valores dos Planos (Online/Presencial)', query: 'Quais são os valores dos planos de acompanhamento para online e presencial?' },
    { label: 'Composição corporal & InBody 120', query: 'Como funciona a bioimpedância InBody 120 e o que ela avalia na composição corporal?' },
    { label: 'Atendimento para quem viaja', query: 'Qual o melhor acompanhamento para quem viaja com frequência ou mora fora de Brasília?' },
    { label: 'Trajetória & Diplomas do Dr. Tannuri', query: 'Qual a formação acadêmica e trajetória esportiva do Dr. Luiz Tannuri?' },
    { label: 'Agendar Diagnóstico Inicial (60 min)', query: 'Como agendar minha primeira consulta de Diagnóstico Inicial de 60 minutos?' }
  ];

  // Auto-trigger initial prompt if provided
  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  // Detect relevant section links and audited conversion CTAs from AI response text
  const extractActionLinks = (text: string) => {
    const links: Array<{ label: string; targetId?: string; isWhatsApp?: boolean; customText?: string }> = [];
    const lower = text.toLowerCase();

    // Check audited topic suggestion
    const audited = findAuditedTopic(text);
    if (audited && audited.suggestedAction) {
      links.push(audited.suggestedAction);
    }

    if (lower.includes('plano') || lower.includes('valor') || lower.includes('preço') || lower.includes('investimento') || lower.includes('assinatura') || lower.includes('vip')) {
      if (!links.some(l => l.targetId === 'planos')) {
        links.push({ label: 'Explorar Planos & Valores', targetId: 'planos' });
      }
    }
    if (lower.includes('diploma') || lower.includes('formação') || lower.includes('faixa preta') || lower.includes('tatame') || lower.includes('trajetória')) {
      if (!links.some(l => l.targetId === 'trajetoria')) {
        links.push({ label: 'Ver Trajetória & Diplomas', targetId: 'trajetoria' });
      }
    }
    if (lower.includes('método') || lower.includes('marmitaria') || lower.includes('inbody')) {
      if (!links.some(l => l.targetId === 'metodo')) {
        links.push({ label: 'Ver Método & InBody 120', targetId: 'metodo' });
      }
    }
    if (lower.includes('whatsapp') || lower.includes('agendar') || lower.includes('equipe') || lower.includes('recepção') || lower.includes('humano') || lower.includes('falar com') || lower.includes('atendente') || lower.includes('telefone') || lower.includes('contato')) {
      if (!links.some(l => l.isWhatsApp)) {
        links.push({ label: 'Chamar Recepção Humana no WhatsApp', isWhatsApp: true, customText: 'Olá! Estava tirando dúvidas com a Clara no site e gostaria de falar diretamente com uma atendente humana da clínica do Dr. Luiz Tannuri.' });
      }
    }

    return links;
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    analytics.track('ai_concierge_query', 'interaction', { queryLength: query.length, queryText: query.substring(0, 40) });

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: { source: 'clara_concierge_master_plus' },
          history: newHistory.slice(-8).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await res.json();
      const replyText = data.reply || 'Tive uma oscilação momentânea de conexão, mas você pode falar diretamente com nossa equipe no WhatsApp para atendimento imediato.';
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks: extractActionLinks(replyText)
      };

      setMessages([...newHistory, assistantMessage]);
      analytics.track('ai_concierge_response', 'interaction');
    } catch (e) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: 'Nossa conexão oscilou por um segundo. Não se preocupe: você pode falar diretamente com nossa equipe de recepção no WhatsApp pelo botão logo abaixo.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks: [
          { label: 'Conversar com Atendente Humano', isWhatsApp: true, customText: 'Olá! Gostaria de falar diretamente com uma atendente humana da clínica do Dr. Luiz Tannuri no WhatsApp (+55 61 9 9128-3139).' }
        ]
      };
      setMessages([...newHistory, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (customMessage?: string) => {
    analytics.track('whatsapp_click', 'conversion', { channel: 'ai_concierge_clara' });
    const text = encodeURIComponent(
      customMessage || 'Olá! Estive conversando com a Clara no site do Dr. Luiz Tannuri e gostaria de falar com a equipe de recepção humana para tirar dúvidas sobre os protocolos.'
    );
    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
  };

  const handleNavigateToSection = (sectionId: string) => {
    // Map any legacy targets to active sections
    let resolvedId = sectionId;
    if (sectionId === 'programas' || sectionId === 'lab' || sectionId === 'diagnostico' || sectionId === 'portal-preview') {
      resolvedId = 'planos';
    } else if (sectionId === 'metodologia') {
      resolvedId = 'metodo';
    }

    analytics.track('concierge_section_jump', 'navigation', { sectionId: resolvedId });
    const el = document.getElementById(resolvedId);
    if (el) {
      onClose();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'assistant',
        text: 'Conversa reiniciada! Sou Clara, sua Concierge do Dr. Luiz Tannuri. Em qual objetivo de saúde ou rendimento esportivo posso te orientar agora?',
        timestamp: 'Agora',
        actionLinks: [
          { label: 'Ver Planos & Valores', targetId: 'planos' },
          { label: 'Trajetória & Diplomas', targetId: 'trajetoria' },
          { label: 'Falar com Recepção no WhatsApp', isWhatsApp: true }
        ]
      }
    ]);
  };

  // Helper to render formatted Markdown text with bold, verified markdown links, and scientific badges
  const renderFormattedText = (text: string, isAssistant: boolean = true) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <div key={pIdx} className={pIdx > 0 ? 'mt-3' : ''}>
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || /^\d+\./.test(trimmed);
            const isEvidenceHeader = trimmed.toLowerCase().includes('evidência científica auditada') || trimmed.toLowerCase().includes('evidencia cientifica');

            // Regex tokenizing markdown links [Label](URL) and bold **bold**
            const regex = /(\[.*?\]\(https?:\/\/.*?\)|\*\*.*?\*\*)/g;
            const parts = line.split(regex);
            
            const formattedContent = parts.map((part, i) => {
              // Check markdown link [Label](url)
              const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
              if (linkMatch) {
                const [, label, url] = linkMatch;
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg bg-[#EAF5E4] text-[#1D540D] font-bold text-xs border border-[#CCD8C4] hover:bg-[#DEEED6] hover:border-[#72B818] transition-all no-underline shadow-2xs group cursor-pointer"
                    title={`Verificar fonte científica auditada: ${label}`}
                  >
                    <ExternalLink className="w-3 h-3 text-[#2C6E14] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="underline decoration-[#72B818]/60 underline-offset-2">{label}</span>
                  </a>
                );
              }

              // Check bold **bold**
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong 
                    key={i} 
                    className={`font-bold ${isAssistant ? 'text-[#0A160F]' : 'text-white'}`}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }

              return part;
            });

            if (isEvidenceHeader) {
              return (
                <div key={lIdx} className="flex items-center gap-2 my-2.5 pt-2.5 border-t border-[#DCE8D6] text-[11px] font-mono-data font-bold text-[#2C6E14] tracking-wide">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#72B818] shrink-0" />
                  <span>{formattedContent}</span>
                </div>
              );
            }

            if (isBullet) {
              return (
                <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
                  <span className={`${isAssistant ? 'text-[#2C6E14]' : 'text-[#AEE938]'} font-bold text-xs mt-0.5 shrink-0`}>✦</span>
                  <span className={`flex-1 leading-relaxed ${isAssistant ? 'text-[#24382B]' : 'text-white'}`}>{formattedContent}</span>
                </div>
              );
            }

            return (
              <p key={lIdx} className={`leading-relaxed mb-1.5 last:mb-0 ${isAssistant ? 'text-[#24382B]' : 'text-white'}`}>
                {formattedContent}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="concierge-title"
    >
      <div 
        className={`w-full bg-white border border-[#CCD8C4] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_70px_rgba(10,25,15,0.25)] flex flex-col transition-all duration-300 overflow-hidden ${
          isExpanded 
            ? 'sm:w-[720px] h-[92vh] max-h-[95vh]' 
            : 'sm:w-[540px] md:w-[580px] h-[700px] max-h-[90vh]'
        }`}
      >
        {/* =========================================================================
            1. MASTER HEADER: AVATAR DE CLARA + STATUS ONLINE + CONTROLES
           ========================================================================= */}
        <div className="bg-gradient-to-r from-white via-[#F8FAF5] to-[#EEF5E9] p-4 sm:p-5 border-b border-[#CCD8C4] flex items-center justify-between gap-3 relative z-20">
          
          <div className="flex items-center gap-3.5">
            {/* Avatar Hiper-realista de Clara com Iluminação de Hollywood & Anel Ativo */}
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#72B818] shadow-[0_4px_16px_rgba(114,184,24,0.3)] bg-[#E2ECE0]">
                <img
                  src={VISUAL_ASSETS.conciergeAvatar?.src || ''}
                  alt={VISUAL_ASSETS.conciergeAvatar?.alt || 'Clara - Assistente Dr. Tanutri'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Badge pulsante de status online */}
              <span 
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#72B818] border-2 border-white shadow-xs flex items-center justify-center"
                title="Online agora"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 id="concierge-title" className="font-display text-base sm:text-lg font-bold text-[#0A160F] tracking-tight">
                  Clara
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-data bg-[#2C6E14] text-white font-bold tracking-wider uppercase">
                  Assistente de IA
                </span>
              </div>
              <p className="text-xs text-[#566D5D] font-medium leading-snug">
                Inteligência Metabólica & Acolhimento Dr. Tanutri
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-mono-data text-[#2C6E14] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-pulse" />
                <span>Online agora • Resposta em tempo real</span>
              </div>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Reset chat button */}
            <button
              onClick={handleResetChat}
              title="Reiniciar conversa"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-xl bg-white border border-[#CCD8C4] text-[#566D5D] hover:text-[#0A160F] hover:bg-[#F4FAF0] flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Expand / Collapse window button (Desktop) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Reduzir tamanho' : 'Expandir janela'}
              className="hidden sm:flex w-8 h-8 rounded-xl bg-white border border-[#CCD8C4] text-[#566D5D] hover:text-[#0A160F] hover:bg-[#F4FAF0] items-center justify-center transition-colors shadow-2xs cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fechar concierge"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-xl bg-white border border-[#CCD8C4] text-[#566D5D] hover:text-[#EA4335] hover:border-[#FBC4C4] hover:bg-[#FDF2F2] flex items-center justify-center transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* =========================================================================
            2. MENU SUPERIOR DE CATEGORIAS RÁPIDAS
           ========================================================================= */}
        <div className="px-4 py-2 bg-gradient-to-r from-[#F6FAF2] via-white to-[#FAFDF8] border-b border-[#CCD8C4] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categoryMenus.map((menu) => {
            const MenuIcon = menu.icon;
            const isCurrent = activeCategory === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveCategory(menu.id);
                  if (menu.query) {
                    handleSend(menu.query);
                  }
                }}
                className={`text-xs px-3 py-1.5 rounded-xl font-mono-data font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#1B4D24] text-white border-[#1B4D24] shadow-xs'
                    : 'bg-white text-[#384C3E] border-[#CCD8C4] hover:border-[#72B818] hover:text-[#0A160F]'
                }`}
              >
                <MenuIcon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#AEE938]' : 'text-[#72B818]'}`} />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </div>

        {/* Regulatory Ethics Pill */}
        <div className="bg-[#F4FAF0] px-4 py-2 border-b border-[#DCE8D6] flex items-center justify-between gap-2 text-[10px] text-[#384C3E] font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E14] shrink-0" />
            <span className="truncate">Auditoria Clínica & Super Skill CFN/CRN • Links de verificação científica em tempo real.</span>
          </div>
          <button
            onClick={() => handleWhatsApp('Olá! Gostaria de falar diretamente com uma atendente humana da recepção do Dr. Luiz Tannuri.')}
            className="text-[#2C6E14] hover:text-[#1E3B27] font-bold font-mono-data flex items-center gap-1 underline shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Falar com Humano</span>
          </button>
        </div>

        {/* =========================================================================
            3. ÁREA DE MENSAGENS COM RENDERIZAÇÃO MASTER PLUS
           ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-[#FCFDFB]">
          {messages.map((m) => {
            const isAssistant = m.role === 'assistant';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {/* Assistant Mini Avatar */}
                {isAssistant && (
                  <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#72B818] shadow-2xs shrink-0 mt-0.5 bg-[#E2ECE0]">
                    <img
                      src={VISUAL_ASSETS.conciergeAvatar?.src || ''}
                      alt="Clara"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                <div className="max-w-[85%] sm:max-w-[82%]">
                  {/* Sender Name & Timestamp */}
                  <div className={`flex items-center gap-2 mb-1 text-[11px] font-mono-data text-[#566D5D] ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                    <span className="font-bold text-[#0A160F]">{isAssistant ? 'Clara' : 'Você'}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  {/* Message Bubble with High Contrast WCAG AAA */}
                  <div
                    className={`p-4 rounded-2xl shadow-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-white text-[#0A160F] border border-[#CCD8C4] rounded-tl-none'
                        : 'bg-[#122418] text-white border border-[#2C6E14]/40 font-medium rounded-tr-none shadow-[0_4px_16px_rgba(18,36,24,0.25)]'
                    }`}
                  >
                    {renderFormattedText(m.text, isAssistant)}

                    {/* Action Links / Micro CTAs embedded in Assistant Messages */}
                    {isAssistant && m.actionLinks && m.actionLinks.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#E2ECE0] flex flex-wrap gap-2">
                        {m.actionLinks.map((link, lIdx) => (
                          <button
                            key={lIdx}
                            onClick={() => {
                              if (link.isWhatsApp) {
                                handleWhatsApp(link.customText);
                              } else if (link.targetId) {
                                handleNavigateToSection(link.targetId);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono-data font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                              link.isWhatsApp
                                ? 'bg-[#25D366]/10 text-[#0F6F2C] border-[#25D366]/30 hover:bg-[#25D366]/20'
                                : 'bg-[#F2F8ED] text-[#2C6E14] border-[#CCD8C4] hover:border-[#72B818] hover:bg-[#E7F3DF]'
                            }`}
                          >
                            {link.isWhatsApp ? (
                              <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                            ) : (
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#2C6E14]" />
                            )}
                            <span>{link.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-3 items-center text-xs text-[#566D5D]">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#72B818] shadow-2xs shrink-0 bg-[#E2ECE0]">
                <img
                  src={VISUAL_ASSETS.conciergeAvatar?.src || ''}
                  alt="Clara digitando"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl border border-[#CCD8C4] shadow-xs flex items-center gap-2">
                <span className="text-xs font-medium text-[#384C3E]">Clara está consultando a base de dados clínicos...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#72B818] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================================
            4. SMART TAGS / SUGESTÕES RÁPIDAS COM SCROLL HORIZONTAL
           ========================================================================= */}
        <div className="px-4 py-2 bg-[#F8FAF5] border-t border-[#DCE8D6] overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-mono-data text-[#566D5D] font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#EB651A]" />
            Perguntas Frequentes:
          </span>
          {smartTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => handleSend(tag.query)}
              className="text-xs px-3 py-1 rounded-xl bg-white border border-[#CCD8C4] text-[#384C3E] hover:border-[#72B818] hover:text-[#0A160F] hover:bg-[#F2F8ED] transition-all whitespace-nowrap shrink-0 shadow-2xs font-medium cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* =========================================================================
            5. INPUT BAR MASTER PLUS COM ENTRADA ERGONÔMICA
           ========================================================================= */}
        <div className="p-3 sm:p-4 bg-[#F8FAF5] border-t border-[#CCD8C4] flex items-center gap-2 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Digite sua dúvida sobre programas, exames InBody, valores..."
            className="flex-1 bg-white border border-[#CCD8C4] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0A160F] placeholder-[#8B9A8F] focus:outline-none focus:border-[#2C6E14] focus:ring-2 focus:ring-[#2C6E14]/15 transition-all shadow-xs"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            aria-label="Enviar mensagem para Clara"
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A160F] to-[#1A2E20] text-[#AEE938] flex items-center justify-center hover:opacity-95 active:scale-95 transition-all disabled:opacity-35 shrink-0 font-bold shadow-md cursor-pointer border border-[#CCD8C4]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================================
            6. BARRA DE ATENDIMENTO HUMANO & WHATSAPP MASTER PLUS
           ========================================================================= */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-white via-[#FAFDF8] to-[#F2F8ED] border-t border-[#CCD8C4] flex items-center justify-between gap-3 text-xs pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2 text-[#566D5D]">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
            <span className="hidden sm:inline font-medium">Prefere conversar com uma atendente humana da clínica?</span>
            <span className="sm:hidden font-medium">Atendimento humano:</span>
          </div>

          <button
            onClick={() => handleWhatsApp()}
            className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs font-mono-data flex items-center gap-1.5 shadow-[0_2px_10px_rgba(37,211,102,0.3)] transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Falar no WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
