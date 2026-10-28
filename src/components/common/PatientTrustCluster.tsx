import React from 'react';
import { GOOGLE_REVIEWS_META } from '../../data/googleReviewsData';

interface PatientTrustClusterProps {
  theme?: 'dark' | 'light' | 'hero';
  className?: string;
  onClick?: () => void;
  showReviewsHint?: boolean;
}

// Curated high-resolution avatars representing diverse, healthy patients
const PATIENT_AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    alt: "Paciente atendida com sucesso — Clínica Dr. Tanutri",
    name: "Mariana"
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    alt: "Paciente em acompanhamento de saúde metabólica",
    name: "Roberto"
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80",
    alt: "Paciente com recuperação de vitalidade e digestão",
    name: "Camila"
  }
];

export const PatientTrustCluster: React.FC<PatientTrustClusterProps> = ({
  theme = 'dark',
  className = '',
  onClick,
  showReviewsHint = false
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex items-center gap-3.5 sm:gap-4 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      aria-label={`${GOOGLE_REVIEWS_META.patientsServed}, avaliação 5 estrelas`}
    >
      {/* 1. Overlapping Circular Avatar Cluster */}
      <div className="flex items-center -space-x-2.5 sm:-space-x-3 shrink-0">
        {PATIENT_AVATARS.map((avatar, idx) => (
          <div
            key={idx}
            className={`relative rounded-full transition-transform duration-300 ease-out group-hover:scale-105 ${
              idx === 0 ? 'z-30' : idx === 1 ? 'z-20' : 'z-10'
            }`}
            style={{ transitionDelay: `${idx * 40}ms` }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              loading="lazy"
              width="44"
              height="44"
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover object-center ring-2 ${
                isDark 
                  ? 'ring-[#0A160F] shadow-[0_4px_12px_rgba(0,0,0,0.5)]' 
                  : 'ring-white shadow-[0_4px_12px_rgba(20,40,25,0.12)]'
              }`}
            />
          </div>
        ))}
      </div>

      {/* 2. Stars & Authority Copy */}
      <div className="flex flex-col justify-center">
        {/* 5 Golden Amber Stars */}
        <div className="flex items-center gap-1 mb-0.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#F59E0B] fill-current drop-shadow-[0_1px_2px_rgba(245,158,11,0.35)]"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          {showReviewsHint && (
            <span className={`text-[11px] font-mono-data ml-1.5 font-bold ${
              isDark ? 'text-[#AEE938]' : 'text-[#2C6E14]'
            }`}>
              5.0
            </span>
          )}
        </div>

        {/* Metric Label */}
        <div className="flex items-center gap-1.5">
          <span
            className={`font-sans text-xs sm:text-sm font-semibold tracking-tight transition-colors ${
              isDark
                ? 'text-[#F1ECE0] group-hover:text-white'
                : 'text-[#0A160F] group-hover:text-[#2C6E14]'
            }`}
          >
            {GOOGLE_REVIEWS_META.patientsServed}
          </span>
          {onClick && (
            <span
              className={`text-[10px] font-mono-data underline decoration-dotted transition-colors ${
                isDark ? 'text-[#8DA693] group-hover:text-[#AEE938]' : 'text-[#566D5D] group-hover:text-[#2C6E14]'
              }`}
            >
              ver relatos
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
