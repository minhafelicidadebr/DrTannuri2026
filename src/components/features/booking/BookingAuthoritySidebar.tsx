import React, { useState } from 'react';
import { ShieldCheck, Award, MapPin, Receipt, Clock, CheckCircle2, HeartHandshake, User } from 'lucide-react';
import { CLIENT_INFO } from '../../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../../data/imageAssets';

export const BookingAuthoritySidebar: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  // Preferred portrait, with heroMaster fallback
  const doctorImageSrc = VISUAL_ASSETS.drTanutriPortrait?.src || VISUAL_ASSETS.heroMaster?.src || '';

  return (
    <aside className="h-full bg-gradient-to-b from-[#FAFDF8] to-[#EDF4EA] p-6 border-l border-[#CCD8C4] flex flex-col justify-between space-y-6 text-[#0A160F]">
      {/* 1. Specialist Clinical Identity */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#1B4D24] shadow-xs shrink-0 bg-[#E2ECE0] flex items-center justify-center">
            {!imageError && doctorImageSrc ? (
              <img
                src={doctorImageSrc}
                alt="Dr. Tanutri - Nutricionista Clínico e Esportivo"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1B4D24] to-[#245D2E] text-[#AEE938] flex flex-col items-center justify-center text-center p-1">
                <span className="font-display font-bold text-sm tracking-tight text-white">Dr. L.T.</span>
                <span className="text-[8px] font-mono-data uppercase text-[#AEE938]">CRN</span>
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#72B818] border-2 border-white ring-1 ring-[#1B4D24]/20" />
          </div>

          <div>
            <span className="text-[10px] font-mono-data uppercase font-bold text-[#1B4D24] tracking-wider block">
              Coordenação Clínica
            </span>
            <h4 className="font-display font-bold text-base text-[#0A160F]">
              {CLIENT_INFO.professionalCoordination}
            </h4>
            <p className="text-xs text-[#566D5D] font-mono-data">
              CRN {CLIENT_INFO.crn} • {CLIENT_INFO.specialties[0]}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#384C3E] leading-relaxed italic bg-white/70 p-3 rounded-xl border border-[#CCD8C4]">
          &ldquo;Comida de verdade como motor de rendimento e longevidade. Uma abordagem integrativa, consistente e alinhada ao seu estilo de vida.&rdquo;
        </p>
      </div>

      {/* 2. Clinical Environment & Locations */}
      <div className="space-y-2.5 text-xs">
        <div className="text-[11px] font-mono-data uppercase font-bold text-[#1B4D24] tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>Localização & Estrutura</span>
        </div>

        <div className="p-3 rounded-xl bg-white/90 border border-[#CCD8C4] space-y-1">
          <strong className="text-xs text-[#0A160F] block">Consultório Presencial ({CLIENT_INFO.cityRegion})</strong>
          <p className="text-[11px] text-[#566D5D]">
            Ambiente privativo e equipado com bioimpedância segmentada InBody 120 e avaliação física completa.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/90 border border-[#CCD8C4] space-y-1">
          <strong className="text-xs text-[#0A160F] block">Telemedicina Global HD</strong>
          <p className="text-[11px] text-[#566D5D]">
            Atendimento para pacientes em todo o Brasil e no exterior com prontuário digital seguro.
          </p>
        </div>
      </div>

      {/* 3. Guarantees & Health Insurance Reimbursement */}
      <div className="space-y-2 text-xs">
        <div className="text-[11px] font-mono-data uppercase font-bold text-[#1B4D24] tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Garantias & Segurança</span>
        </div>

        <ul className="space-y-2 text-[11px] text-[#384C3E]">
          <li className="flex items-start gap-2">
            <Receipt className="w-3.5 h-3.5 text-[#1B4D24] shrink-0 mt-0.5" />
            <span>
              <strong>Reembolso em Convênios:</strong> Emitimos nota fiscal médica e relatório discriminado para solicitação junto ao seu plano de saúde.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-[#1B4D24] shrink-0 mt-0.5" />
            <span>
              <strong>Remarcação Flexível:</strong> Reagende sua consulta sem taxas com até 24h de antecedência pelo WhatsApp da clínica.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#1B4D24] shrink-0 mt-0.5" />
            <span>
              <strong>Privacidade Médica (LGPD):</strong> Prontuário seguro e dados clínicos protegidos por criptografia de ponta a ponta.
            </span>
          </li>
        </ul>
      </div>

      {/* 4. Direct Assistance Footer */}
      <div className="pt-2 border-t border-[#CCD8C4] text-[11px] text-[#566D5D] flex items-center justify-between">
        <span>Dúvidas pré-agendamento?</span>
        <span className="font-mono-data font-bold text-[#1B4D24]">
          {CLIENT_INFO.primaryWhatsApp}
        </span>
      </div>
    </aside>
  );
};
