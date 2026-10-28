import React from 'react';
import { Award, GraduationCap, Medal, ShieldCheck, Globe2 } from 'lucide-react';

export interface ApprovedAuthorityClaim {
  id: string;
  eyebrow: string;
  metric: string;
  caption: string;
  Icon: React.ElementType;
  accent: string;
}

/**
 * R04: Faixa de Autoridade Profissional Compacta
 * Adaptada estritamente aos tokens da aplicação e às 5 credenciais factualmente comprovadas pelos diplomas homologados.
 * Métricas não confirmadas documentalmente (+1.000 alunos, +100 seminários, nota estática do Google)
 * foram omitidas e registradas como pendências editoriais do cliente, sem dados fictícios.
 */
export const APPROVED_AUTHORITY_CLAIMS: ApprovedAuthorityClaim[] = [
  {
    id: 'jiujitsu_6grau',
    eyebrow: 'Mestre 6º Grau',
    metric: '30+ Anos',
    caption: 'De vivência nos tatames de Jiu-Jitsu com certificação homologada (Fabricio International Team).',
    Icon: Medal,
    accent: '#2C6E14'
  },
  {
    id: 'pos_graduacao',
    eyebrow: 'Nutrição Esportiva',
    metric: '10+ Anos',
    caption: 'Prática clínica pós-graduada (Faculdade Laboro / MEC) voltada a rendimento e metabolismo.',
    Icon: Award,
    accent: '#EB651A'
  },
  {
    id: 'graduacao_nutricao',
    eyebrow: 'Graduação Acadêmica',
    metric: 'UNIEURO',
    caption: 'Bacharelado oficial em Nutrição pelo Centro Universitário Euro-Americano em Brasília (DF).',
    Icon: GraduationCap,
    accent: '#198774'
  },
  {
    id: 'judo_preta',
    eyebrow: 'Artes Marciais',
    metric: 'Faixa Preta',
    caption: 'Diplomado em Judô desde 2007, unindo a disciplina do combate à fisiologia nutricional.',
    Icon: ShieldCheck,
    accent: '#2C6E14'
  },
  {
    id: 'alcance_clinico',
    eyebrow: 'Atendimento Clínico',
    metric: 'Brasília & Global',
    caption: 'Consultório presencial no DF e acompanhamento por Telemedicina para pacientes no Brasil e exterior.',
    Icon: Globe2,
    accent: '#EB651A'
  }
];

export const ProfessionalAuthorityRibbon: React.FC = () => {
  return (
    <section
      aria-label="Indicadores de Autoridade Profissional do Dr. Luiz Tannuri"
      className="border-y border-[#CCD8C4] bg-gradient-to-r from-[#F4F9F1] via-[#FAFDF8] to-[#EDF5E9] py-6 sm:py-8 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {APPROVED_AUTHORITY_CLAIMS.map(({ id, eyebrow, metric, caption, Icon, accent }) => (
            <li
              key={id}
              className="rounded-2xl border border-[#CCD8C4] bg-white/95 p-4 sm:p-5 shadow-2xs hover:border-[#72B818] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-[#566D5D]">
                    {eyebrow}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}15`, color: accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0A160F]"
                  style={{ color: '#0A160F' }}
                >
                  {metric}
                </div>
              </div>

              <p className="mt-2.5 text-xs text-[#384C3E] leading-relaxed font-normal">
                {caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
