import React from 'react';

/**
 * Apenas referência de composição visual; não é uma implementação pronta.
 * O conteúdo é fornecido pelo cliente depois de validação editorial.
 * O app deve adaptar classes/tokens aos componentes já existentes.
 */
export type ApprovedAuthorityClaim = {
  id: string;
  eyebrow: string;
  metric: string;
  caption: string;
};

export function AuthorityRibbonDesignReference({
  approvedClaims,
}: {
  approvedClaims: ApprovedAuthorityClaim[];
}) {
  if (!approvedClaims.length) return null;

  return (
    <section aria-label="Trajetória profissional" className="border-y border-neutral-200 bg-neutral-50 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {approvedClaims.map(({ id, eyebrow, metric, caption }) => (
            <li key={id} className="rounded-2xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">{eyebrow}</p>
              <p className="mt-3 text-2xl font-bold leading-tight text-neutral-900">{metric}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
