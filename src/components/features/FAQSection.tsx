import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import { CANONICAL_FAQS } from '../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../data/imageAssets';
import { analytics } from '../../lib/analytics';

interface FAQSectionProps {
  onOpenConcierge: (question: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConcierge }) => {
  const [openId, setOpenId] = useState<string | null>(CANONICAL_FAQS[0]?.id || null);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) {
      analytics.track('faq_open', 'interaction', { faqId: id });
    }
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-gradient-to-b from-[#EAF2E6] via-[#F2F7F0] to-[#E9F3E6] text-[#0E1A12] border-y border-[#CCD8C4] overflow-hidden" aria-labelledby="faq-title">
      {/* Subtle Precision Bio-Metric Grid in pale green */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(114,184,24,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(114,184,24,0.08)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#72B818]/10 via-[#EB651A]/5 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#EB651A]" />
            <span>DÚVIDAS FREQUENTES</span>
          </div>
          <h2 id="faq-title" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight font-bold">
            Tudo o Que Você Precisa Saber
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal">
            Respostas diretas sobre a metodologia clínica, consultas, tecnologia e o acompanhamento contínuo.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {CANONICAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] overflow-hidden shadow-[0_4px_20px_rgba(20,40,25,0.06),0_1px_3px_rgba(20,40,25,0.03)] hover:shadow-[0_12px_32px_rgba(20,40,25,0.1)] hover:border-[#72B818] transition-all"
              >
                <button
                  type="button"
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[52px] p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:bg-[#F4FAEE] hover:bg-white/90 cursor-pointer transition-colors"
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[#0A160F]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1B4D24] text-white' : 'bg-[#EAF5E4] text-[#2C6E14]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-[#384C3E] leading-relaxed border-t border-[#CCD8C4] pt-4 animate-fadeIn">
                    <p>{faq.answer}</p>
                    <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#566D5D] border-t border-[#CCD8C4]">
                      <span>Ainda tem dúvidas sobre este ponto?</span>
                      <button
                        id={`faq-ask-concierge-${faq.id}`}
                        onClick={() => onOpenConcierge(`Gostaria de saber mais sobre: ${faq.question}`)}
                        className="text-[#2C6E14] hover:text-[#0A160F] hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
                      >
                        <img 
                          src={VISUAL_ASSETS.conciergeAvatar.src}
                          alt="Clara"
                          className="w-4 h-4 rounded-full object-cover border border-[#CCD8C4]"
                        />
                        <span>Perguntar à Assistente de IA</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
