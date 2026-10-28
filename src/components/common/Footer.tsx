import React from 'react';
import { Activity, ShieldCheck, Heart, Instagram, PhoneCall } from 'lucide-react';
import { CLIENT_INFO } from '../../data/canonicalCatalog';

interface FooterProps {
  onOpenTelemetry?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTelemetry }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#E6EFE2] to-[#D8E6D3] border-t border-[#CCD8C4] pt-16 pb-12 text-[#384C3E]" aria-label="Rodapé do site">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#CCD8C4]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo drtannuri.png"
                alt="Logo Dr. Tannuri - Nutrição de Precisão"
                className="h-10 sm:h-12 w-auto max-w-[180px] object-contain object-left"
                loading="lazy"
              />
            </div>

            <p className="text-xs text-[#384C3E] max-w-sm leading-relaxed font-normal">
              {CLIENT_INFO.subtagline}
            </p>

            <div className="text-xs space-y-1 pt-2">
              <p className="text-[#0A160F] font-bold">{CLIENT_INFO.professionalCoordination}</p>
              <p className="font-mono-data text-[11px] text-[#EB651A] font-bold">{CLIENT_INFO.professionalRegistration}</p>
              <p className="text-[11px] text-[#566D5D]">{CLIENT_INFO.cityRegion}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono-data text-[#0A160F] uppercase tracking-wider block font-bold">
              Navegação
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button id="footer-nav-trajetoria" onClick={() => scrollTo('trajetoria')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Trajetória & Diplomas
                </button>
              </li>
              <li>
                <button id="footer-nav-depoimentos" onClick={() => scrollTo('depoimentos')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Depoimentos de Atletas
                </button>
              </li>
              <li>
                <button id="footer-nav-metodo" onClick={() => scrollTo('metodo')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Método & Marmitaria do Atleta
                </button>
              </li>
              <li>
                <button id="footer-nav-planos" onClick={() => scrollTo('planos')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Planos & Add-ons
                </button>
              </li>
              <li>
                <button id="footer-nav-evidencias" onClick={() => scrollTo('evidencias')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Casos & Evidências Clínicas
                </button>
              </li>
              <li>
                <button id="footer-nav-faq" onClick={() => scrollTo('faq')} className="hover:text-[#EB651A] transition-colors cursor-pointer font-medium">
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono-data text-[#0A160F] uppercase tracking-wider block font-bold">
              Conformidade & Ética
            </span>
            <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD8C4] text-[11px] leading-relaxed text-[#384C3E] space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C6E14] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#EB651A] shrink-0" />
                <span>Diretrizes CFN / CRN / LGPD</span>
              </div>
              <p>
                As informações contidas neste WebApp têm caráter informativo e educacional. Simulações bioenergéticas e curvas glicêmicas são modelos ilustrativos e não substituem prescrição clínica ou médica individual.
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-1 text-xs">
              {CLIENT_INFO.isWhatsAppConfirmed ? (
                <a 
                  id="footer-whatsapp-link"
                  href={`https://wa.me/${CLIENT_INFO.whatsAppClean}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#2C6E14] font-bold hover:text-[#EB651A] hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#EB651A]" />
                  <span>{CLIENT_INFO.primaryWhatsApp}</span>
                </a>
              ) : (
                <span className="flex items-center gap-1.5 text-[#2C6E14] font-bold">
                  <PhoneCall className="w-3.5 h-3.5 text-[#EB651A]" />
                  <span>Atendimento Online em Brasília (DF)</span>
                </span>
              )}
              <span className="text-[#CCD8C4]">•</span>
              <span className="text-xs text-[#566D5D] font-medium">{CLIENT_INFO.instagram}</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#566D5D]">
          <p>© {new Date().getFullYear()} Dr. Luiz Tannuri • Nutrição Esportiva & de Precisão. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-medium">
            <span className="hover:text-[#0A160F] cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-[#0A160F] cursor-pointer">Política de Privacidade (LGPD)</span>
            <span>•</span>
            <span className="hover:text-[#0A160F] cursor-pointer">Segurança de Dados</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
