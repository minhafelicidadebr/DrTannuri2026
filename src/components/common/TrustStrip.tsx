import React from 'react';
import { TRUST_POINTS } from '../../data/canonicalCatalog';
import { PatientTrustCluster } from './PatientTrustCluster';
import { GoogleAuthorityCard } from './GoogleAuthorityCard';

interface TrustStripProps {
  onOpenReviews?: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onOpenReviews }) => {
  return (
    <section className="border-y border-[#CFDCC8] bg-gradient-to-b from-[#E7EFE3] via-[#F4F9F1] to-[#E5EFE0] py-6 sm:py-8 backdrop-blur-xs relative overflow-hidden" aria-label="Credenciais e Pilares de Confiança">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Top Authority Anchor: Social Proof & Google Review Badges */}
        <div className="mb-6 pb-6 border-b border-[#CCD8C4]/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
            <span className="text-xs font-mono-data uppercase tracking-wider text-[#2C6E14] font-bold">
              Confiança Clínica Comprovada
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <PatientTrustCluster
              theme="light"
              onClick={onOpenReviews}
              showReviewsHint
            />
            <div className="hidden sm:block w-px h-8 bg-[#CCD8C4]" />
            <GoogleAuthorityCard
              variant="hero-badge"
              onOpenReviewsModal={onOpenReviews}
            />
          </div>
        </div>

        {/* 4 Clinical Pillar Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TRUST_POINTS.map((item, index) => (
            <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2">
                <span className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  index === 1 ? 'text-[#EB651A]' : 'text-[#2C6E14]'
                }`}>
                  {item.value}
                </span>
              </div>
              <span className="text-sm font-bold text-[#0A160F] mt-0.5">
                {item.label}
              </span>
              <span className="text-xs text-[#566D5D] mt-1 leading-snug font-medium">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

