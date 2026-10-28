import React, { useState } from 'react';
import { Calendar, MessageSquare, BookOpen, Activity, CheckCircle2, ChevronRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { analytics } from '../../lib/analytics';

export const ClientPortalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plano_vivo' | 'checkin' | 'chat' | 'agenda' | 'biomarcadores'>('plano_vivo');

  const handleTab = (t: typeof activeTab) => {
    setActiveTab(t);
    analytics.track('interactive_feature_use', 'client_portal_preview', { tab: t });
  };

  return (
    <section id="portal-preview" className="py-20 md:py-28 relative bg-gradient-to-b from-[#EBF4E8] via-[#F2F7F0] to-[#EAF2E6] border-b border-[#CCD8C4]" aria-labelledby="portal-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-white to-[#F2F8ED] border border-[#CCD8C4] text-[#1E3B27] text-xs font-mono-data mb-3 font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#EB651A] animate-pulse" />
            <span>EXPERIÊNCIA PÓS-COMPRA</span>
          </div>
          <h2 id="portal-heading" className="font-display text-3xl sm:text-4xl md:text-5xl text-[#0A160F] tracking-tight font-bold">
            Seu Acompanhamento por Dentro
          </h2>
          <p className="text-sm sm:text-base text-[#384C3E] mt-3 font-normal leading-relaxed">
            Veja exatamente como é a interface que você e seu nutricionista usarão no dia a dia para ajustar sua rotina, registrar conquistas e trocar mensagens.
          </p>
        </div>

        {/* Portal Mockup Device Window */}
        <div className="rounded-3xl bg-gradient-to-br from-white via-[#F9FCF7] to-[#EFF6EB] border border-[#CCD8C4] shadow-[0_16px_50px_rgba(20,40,25,0.08),0_4px_16px_rgba(20,40,25,0.03)] overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="bg-gradient-to-r from-[#F4FAEE] to-[#EBF4E7] px-6 py-4 border-b border-[#CCD8C4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB651A]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5B54F]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#72B818]" />
              </div>
              <span className="text-xs font-mono-data text-[#566D5D]">
                portal.drtanutri.com.br/paciente/demonstracao-clinica
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#72B818] animate-pulse" />
              <span className="text-xs text-[#0A160F] font-bold">
                Programa Ativo • Semana 4 de 12 (Simulação)
              </span>
            </div>
          </div>

          {/* Portal Navigation Tabs */}
          <div className="bg-white/60 px-4 sm:px-6 border-b border-[#CCD8C4] flex items-center overflow-x-auto gap-2 no-scrollbar py-2.5">
            {[
              { id: 'plano_vivo' as const, label: 'Plano Vivo da Semana', icon: BookOpen },
              { id: 'checkin' as const, label: 'Check-in Semanal', icon: CheckCircle2 },
              { id: 'chat' as const, label: 'Chat com Nutricionista', icon: MessageSquare },
              { id: 'agenda' as const, label: 'Agenda & Consultas', icon: Calendar },
              { id: 'biomarcadores' as const, label: 'Biomarcadores', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`portal-tab-${tab.id}`}
                  onClick={() => handleTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'text-[#384C3E] hover:bg-white hover:text-[#0A160F]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Portal Screen Body */}
          <div className="p-6 sm:p-8 min-h-[380px] bg-white/70">
            
            {/* TAB 1: PLANO VIVO DA SEMANA */}
            {activeTab === 'plano_vivo' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#CCD8C4]">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A160F]">
                      Cardápio Vigente (Fase 2: Otimização Nutricional)
                    </h4>
                    <p className="text-xs text-[#566D5D]">Atualizado pela Equipe Nutricional Titular</p>
                  </div>
                  <span className="text-xs font-mono-data text-[#2C6E14] font-bold px-2.5 py-1 rounded-full bg-[#EAF5E4] border border-[#72B818]/40">
                    Ajuste Dinâmico Ativo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-[11px] font-mono-data text-[#2B6316] font-bold">REFEIÇÃO 01 • 07:30</span>
                    <h5 className="text-sm font-bold text-[#0A160F] mt-1">Ovos mexidos com cúrcuma + Fruta</h5>
                    <p className="text-xs text-[#5C7262] mt-1">2 ovos inteiros caipiras, azeite extravirgem, 1 fatia de mamão com sementes de chia.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-[11px] font-mono-data text-[#1E7266] font-bold">REFEIÇÃO 02 • 12:45</span>
                    <h5 className="text-sm font-bold text-[#0A160F] mt-1">Peixe grelhado + Quinoa & Rúcula</h5>
                    <p className="text-xs text-[#5C7262] mt-1">150g de filé de peixe ou proteína vegetal, 4 colheres de quinoa cozida, prato farto de folhas verdes.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-[11px] font-mono-data text-[#8C6D2B] font-bold">REFEIÇÃO 03 • 19:30</span>
                    <h5 className="text-sm font-bold text-[#0A160F] mt-1">Sopa funcional de abóbora c/ frango</h5>
                    <p className="text-xs text-[#5C7262] mt-1">Creme aveludado de abóbora com gengibre, frango desfiado e sementes tostadas.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4FAEE] border border-[#DCE4D4] flex items-center justify-between text-xs text-[#1E4413] font-medium">
                  <span>Precisa de uma substituição para o almoço de hoje fora de casa?</span>
                  <button 
                    onClick={() => handleTab('chat')}
                    className="text-[#2B6316] hover:underline font-bold cursor-pointer"
                  >
                    Acionar nutricionista no chat &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: CHECK-IN SEMANAL */}
            {activeTab === 'checkin' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#E3EBDD]">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A160F]">Check-in da Semana 4</h4>
                    <p className="text-xs text-[#5C7262]">Preenchimento rápido de 2 minutos para calibrar a semana seguinte</p>
                  </div>
                  <span className="text-xs text-[#2B6316] font-mono-data font-bold">Respondido (Simulação)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-xs text-[#5C7262] block mb-1 font-bold">Nível de Disposição Geral:</span>
                    <div className="text-lg font-black font-mono-data text-[#1E4413]">8.5 / 10</div>
                    <span className="text-[11px] text-[#384C3E] mt-1 block italic">"Zero sonolência após o almoço nesta semana."</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-xs text-[#5C7262] block mb-1 font-bold">Qualidade do Sono:</span>
                    <div className="text-lg font-black font-mono-data text-[#1E7266]">7.8 horas</div>
                    <span className="text-[11px] text-[#384C3E] mt-1 block italic">"Sono profundo aumentou segundo o monitor."</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                    <span className="text-xs text-[#5C7262] block mb-1 font-bold">Conforto Intestinal:</span>
                    <div className="text-lg font-black font-mono-data text-[#8C6D2B]">Sem Inchaço</div>
                    <span className="text-[11px] text-[#384C3E] mt-1 block italic">"A retirada de gatilhos alimentares reduziu o estufamento."</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CHAT COM A EQUIPE */}
            {activeTab === 'chat' && (
              <div className="space-y-3 max-w-xl mx-auto">
                <div className="flex items-center gap-3 pb-3 border-b border-[#E3EBDD]">
                  <div className="w-8 h-8 rounded-full bg-[#1B4D24] text-[#AEE938] font-bold flex items-center justify-center text-xs">
                    DT
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0A160F]">Nutricionista Responsável</span>
                    <span className="text-[10px] text-[#2B6316] font-bold block">Equipe Clínica Dr. Tanutri • Online hoje</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-[#F8FAF5] p-3 rounded-2xl rounded-tl-none border border-[#DCE4D4] text-[#0A160F] max-w-[85%] shadow-xs">
                    "Olá! Analisei seu check-in semanal e vi que o nível de energia permaneceu estável. Para o almoço de confraternização do fim de semana, monte um prato iniciando pelos vegetais e mantenha a hidratação adequada."
                  </div>
                  <div className="bg-[#EBF7DA] p-3 rounded-2xl rounded-tr-none border border-[#CCD6C0] text-[#0A160F] font-medium ml-auto max-w-[85%] shadow-xs">
                    "Perfeito! Vou seguir exatamente essa estratégia. Muito obrigado pelo suporte rápido!"
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: AGENDA & CONSULTAS */}
            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                  <div>
                    <span className="text-xs font-mono-data text-[#2B6316] font-bold">PRÓXIMA CONSULTA AGENDADA</span>
                    <h5 className="text-base font-bold text-[#0A160F] mt-1">Reavaliação Metabólica & Bioimpedância</h5>
                    <p className="text-xs text-[#5C7262] mt-1">Quinta-feira às 15h30 • Presencial / Online (Simulação)</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-white border border-[#CCD6C0] text-xs font-bold text-[#0A160F] hover:border-[#8CC62D] hover:bg-[#EBF7DA] transition-all shrink-0 cursor-pointer shadow-xs">
                    Reagendar ou Alterar
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: BIOMARCADORES */}
            {activeTab === 'biomarcadores' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                  <span className="text-[11px] text-[#5C7262] font-mono-data font-bold">Massa Muscular</span>
                  <div className="text-xl font-black font-mono-data text-[#1E4413] mt-1">+1.8 kg</div>
                  <span className="text-[10px] text-[#2B6316] font-bold">Evolução estimada</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                  <span className="text-[11px] text-[#5C7262] font-mono-data font-bold">% Gordura</span>
                  <div className="text-xl font-black font-mono-data text-[#1E7266] mt-1">-3.2%</div>
                  <span className="text-[10px] text-[#1E7266] font-bold">Redução consistente</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                  <span className="text-[11px] text-[#5C7262] font-mono-data font-bold">Glicemia Jejum</span>
                  <div className="text-xl font-black font-mono-data text-[#0A160F] mt-1">86 mg/dL</div>
                  <span className="text-[10px] text-[#8C6D2B] font-bold">Faixa de controle</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE4D4] shadow-xs">
                  <span className="text-[11px] text-[#5C7262] font-mono-data font-bold">Adesão Média</span>
                  <div className="text-xl font-black font-mono-data text-[#1E4413] mt-1">92%</div>
                  <span className="text-[10px] text-[#2B6316] font-bold">Excelente</span>
                </div>
              </div>
            )}

          </div>

        </div>

        <p className="text-[11px] text-[#8B9A8F] text-center mt-4">
          Demonstração do Portal do Cliente Dr. Tanutri (Web e Mobile App). Recursos liberados instantaneamente após o início do acompanhamento.
        </p>

      </div>
    </section>
  );
};
