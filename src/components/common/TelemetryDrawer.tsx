import React, { useState, useEffect } from 'react';
import { X, Activity, RefreshCw, Shield, Trash2, CheckCircle, ArrowUpRight } from 'lucide-react';
import { analytics } from '../../lib/analytics';
import { AnalyticsEvent } from '../../types';

interface TelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryDrawer: React.FC<TelemetryDrawerProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = analytics.subscribe((updated) => {
      setEvents(updated);
    });
    return unsubscribe;
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))];
  const filteredEvents = activeFilter === 'all' ? events : events.filter(e => e.category === activeFilter);

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-drawer-title"
    >
      <div 
        className="w-full max-w-lg bg-white border-l border-[#CCD6C0] h-full flex flex-col shadow-2xl text-[#0A160F]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#CCD6C0] flex items-center justify-between bg-[#F8FAF5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EBF7DA] border border-[#8CC62D]/40 flex items-center justify-center text-[#2B6316]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 id="telemetry-drawer-title" className="font-display text-base font-bold text-[#0A160F]">
                Auditoria de Telemetria & Eventos
              </h2>
              <p className="text-[11px] font-mono-data text-[#5C7262]">
                {events.length} microinterações registradas localmente
              </p>
            </div>
          </div>
          <button
            id="telemetry-drawer-close"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white border border-[#CCD6C0] text-[#5C7262] hover:text-[#0A160F] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            aria-label="Fechar gaveta de telemetria"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy notice */}
        <div className="px-5 py-2.5 bg-[#F4FAEE] border-b border-[#DCE4D4] flex items-center gap-2 text-[11px] text-[#384C3E] font-medium">
          <Shield className="w-3.5 h-3.5 text-[#1E7266] shrink-0" />
          <span>Filtro ético ativo: Nenhum dado de saúde clínica ou histórico sensível é rastreado.</span>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-3 border-b border-[#E3EBDD] flex items-center gap-1.5 overflow-x-auto bg-[#F8FAF5]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono-data uppercase transition-all cursor-pointer ${
                activeFilter === cat 
                  ? 'bg-[#1B4D24] text-white font-semibold shadow-xs' 
                  : 'bg-white border border-[#CCD6C0] text-[#5C7262] hover:text-[#0A160F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#FCFDFB]">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-[#5C7262] text-xs font-medium">
              Nenhum evento registrado nesta categoria ainda. Interaja com a página para ver os sinais em tempo real.
            </div>
          ) : (
            filteredEvents.map((evt, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-[#CCD6C0] font-mono-data text-xs space-y-1.5 hover:border-[#8CC62D] transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#2B6316] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8CC62D]" />
                    {evt.eventName}
                  </span>
                  <span className="text-[10px] text-[#5C7262]">{evt.timestamp}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#5C7262]">
                  <span className="px-2 py-0.5 rounded bg-[#F8FAF5] border border-[#DCE4D4] font-medium text-[#384C3E]">
                    {evt.category}
                  </span>
                </div>
                {evt.metadata && Object.keys(evt.metadata).length > 0 && (
                  <pre className="p-2.5 rounded bg-[#F8FAF5] border border-[#DCE4D4] text-[10px] text-[#1E7266] overflow-x-auto mt-1 leading-relaxed">
                    {JSON.stringify(evt.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#CCD6C0] bg-[#F8FAF5] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#5C7262] font-mono-data font-semibold">
            Status: Telemetria Funcional Ativa
          </span>
          <button
            onClick={() => analytics.track('telemetry_manual_ping', 'audit', { triggeredAt: Date.now() })}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CCD6C0] text-xs text-[#0A160F] hover:border-[#8CC62D] hover:bg-[#EBF7DA] font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Emitir Ping de Teste</span>
          </button>
        </div>
      </div>
    </div>
  );
};
