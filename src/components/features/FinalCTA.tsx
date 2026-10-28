import React, { useState } from 'react';
import { ArrowRight, PhoneCall, Calendar, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { analytics } from '../../lib/analytics';
import { PatientTrustCluster } from '../common/PatientTrustCluster';
import { GoogleAuthorityCard } from '../common/GoogleAuthorityCard';

interface FinalCTAProps {
  onOpenConcierge: (prompt: string) => void;
  onOpenBooking?: (serviceId?: string) => void;
  onOpenReviews?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConcierge, onOpenBooking, onOpenReviews }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Por favor, informe seu nome e telefone.');
      return;
    }
    if (!consent) {
      setErrorMsg('É necessário concordar com a política de contato.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          interest: 'diagnostico_inicial',
          consent: true
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        analytics.track('lead_opt_in', 'conversion', { leadId: data.leadId });
      } else {
        setErrorMsg(data.error || 'Erro ao enviar dados. Tente pelo WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Falha na conexão. Você pode agendar direto pelo WhatsApp abaixo.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    analytics.track('whatsapp_click', 'conversion', { channel: 'final_cta' });
    if (CLIENT_INFO.isWhatsAppConfirmed) {
      const text = encodeURIComponent('Olá! Gostaria de agendar meu Diagnóstico Inicial com o Dr. Luiz Tannuri.');
      window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
    } else if (onOpenBooking) {
      onOpenBooking('diagnostico_inicial');
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#EAF2E6] via-[#E2EBE0] to-[#E9F3E6] border-t border-[#CCD8C4]" aria-labelledby="cta-heading">
      {/* Organic Light Ambient Spotlights in the background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#72B818]/12 via-[#EB651A]/8 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#72B818]/15 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Direct CTA & Value */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-4 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
              <span>SEU PRÓXIMO PASSO ESTRATÉGICO</span>
            </div>

            <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight leading-tight font-bold">
              Sua melhor performance começa com a decisão de não negociar sua saúde.
            </h2>

            <p className="text-sm sm:text-base text-[#384C3E] font-normal mt-4 leading-relaxed max-w-xl">
              Dê o primeiro passo com um <strong className="text-[#0A160F] font-bold">Diagnóstico Inicial de 60 minutos</strong> com retorno incluso em até 15 dias, presencial em Brasília (DF) ou por Telemedicina.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {onOpenBooking ? (
                <button
                  type="button"
                  id="final-agenda-online-btn"
                  onClick={() => {
                    analytics.track('booking_open_final_cta', 'navigation');
                    onOpenBooking('diagnostico_inicial');
                  }}
                  className="min-h-[48px] px-7 py-4 rounded-2xl bg-gradient-to-r from-[#1B4D24] via-[#245D2E] to-[#1B4D24] hover:opacity-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[rgba(27,77,36,0.25)] cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#AEE938]" />
                  <span>Agendar Diagnóstico Inicial</span>
                </button>
              ) : null}

              <button
                id="final-whatsapp-btn"
                onClick={handleWhatsAppClick}
                className="min-h-[48px] px-6 py-4 rounded-2xl bg-white border border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:text-[#1B4D24] transition-all text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{CLIENT_INFO.isWhatsAppConfirmed ? 'Conversar pelo WhatsApp' : 'Solicitar Atendimento Online'}</span>
              </button>
            </div>

            {/* Social Proof & Google Reviews Authority Dock */}
            <div className="mt-8 pt-6 border-t border-[#CCD8C4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <PatientTrustCluster
                theme="light"
                onClick={onOpenReviews}
                showReviewsHint
              />
              <GoogleAuthorityCard
                variant="hero-badge"
                onOpenReviewsModal={onOpenReviews}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#566D5D]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C6E14]" />
                <span className="font-medium text-[#0A160F]">Consultas Presenciais e Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#198774]" />
                <span className="font-medium text-[#0A160F]">Diretrizes Éticas CFN / CRN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Callback Request Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] shadow-[0_20px_50px_rgba(20,40,25,0.08),0_4px_16px_rgba(20,40,25,0.03)]">
              <h3 className="font-display text-xl font-bold text-[#0A160F] mb-2">
                Solicitar Contato da Recepção
              </h3>
              <p className="text-xs text-[#566D5D] mb-6">
                Prefere que nossa equipe entre em contato com você em horário comercial? Deixe seus dados abaixo:
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#F4FAEE] border border-[#CCD8C4] text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-[#2C6E14] mx-auto" />
                  <h4 className="font-display text-lg font-bold text-[#0A160F]">
                    Mensagem Recebida!
                  </h4>
                  <p className="text-xs text-[#384C3E] leading-relaxed">
                    Nossa equipe de recepção entrará em contato via WhatsApp nas próximas horas úteis para apresentar horários disponíveis.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#2C6E14] hover:underline font-mono-data font-bold pt-2 block mx-auto cursor-pointer"
                  >
                    Enviar outra solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-[#EB651A]/10 border border-[#EB651A]/30 text-xs text-[#C84A07] font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label htmlFor="lead-name" className="text-xs text-[#384C3E] block mb-1 font-bold">
                      Seu Nome Completo:
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      placeholder="Ex: Camila Soares"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#CCD8C4] text-sm text-[#0A160F] placeholder:text-[#8B9A8F] focus:outline-none focus:border-[#72B818] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="text-xs text-[#384C3E] block mb-1 font-bold">
                      WhatsApp com DDD:
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#CCD8C4] text-sm text-[#0A160F] placeholder:text-[#8B9A8F] focus:outline-none focus:border-[#72B818] transition-colors"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="lead-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#72B818] rounded cursor-pointer"
                    />
                    <label htmlFor="lead-consent" className="text-[11px] text-[#566D5D] leading-tight cursor-pointer font-medium">
                      Concordo em receber contato da equipe Dr. Tanutri via WhatsApp para agendamento, conforme nossa política de privacidade (LGPD).
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[46px] py-3.5 rounded-xl bg-gradient-to-r from-[#1B4D24] via-[#245D2E] to-[#1B4D24] text-white hover:opacity-95 hover:shadow-[0_6px_20px_rgba(27,77,36,0.3)] font-bold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Enviando solicitação...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Retorno da Equipe</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
