import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Download, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  FileSpreadsheet, 
  BrainCircuit, 
  ArrowRight, 
  Check, 
  Lock, 
  Users, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { StoredAppointment, AppointmentStatus, ClinicMetrics } from '../../types/booking';
import { CLIENT_INFO } from '../../data/canonicalCatalog';
import { safeGetSession, safeSetSession, safeRemoveSession } from '../../lib/storage';

interface ClinicAdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicAdminDashboard: React.FC<ClinicAdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeGetSession('drtannuri_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'pipeline' | 'tot' | 'sheets'>('pipeline');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [metrics, setMetrics] = useState<ClinicMetrics | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [modalityFilter, setModalityFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected appointment for Tree of Thoughts analysis
  const [selectedAppForToT, setSelectedAppForToT] = useState<StoredAppointment | null>(null);
  const [totLoading, setTotLoading] = useState(false);
  const [totAnalysis, setTotAnalysis] = useState<string | null>(null);

  // Editing notes
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  // Status update toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'tannuri2026' || passwordInput === 'admin' || passwordInput === 'medico') {
      setIsAuthenticated(true);
      safeSetSession('drtannuri_admin_auth', 'true');
      setAuthError('');
      fetchData();
    } else {
      setAuthError('Senha de acesso incorreta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    safeRemoveSession('drtannuri_admin_auth');
    setPasswordInput('');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, metRes] = await Promise.all([
        fetch(`/api/admin/appointments?status=${statusFilter}&modality=${modalityFilter}&search=${encodeURIComponent(searchQuery)}`),
        fetch('/api/admin/metrics')
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        setAppointments(appData.appointments || []);
        if (appData.appointments?.length > 0 && !selectedAppForToT) {
          setSelectedAppForToT(appData.appointments[0]);
        }
      }

      if (metRes.ok) {
        const metData = await metRes.json();
        setMetrics(metData);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchData();
    }
  }, [isOpen, isAuthenticated, statusFilter, modalityFilter]);

  // Execute ToT analysis for selected appointment
  const handleRunToT = async (appointment: StoredAppointment) => {
    setSelectedAppForToT(appointment);
    setTotLoading(true);
    setTotAnalysis(null);
    try {
      const res = await fetch('/api/admin/tot-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: appointment.id })
      });
      if (res.ok) {
        const data = await res.json();
        setTotAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('[Admin ToT] Failed:', err);
    } finally {
      setTotLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAppointments(prev =>
          prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
        );
        showToast(`Status atualizado para "${newStatus}" com sucesso!`);
        // Refresh metrics
        const metRes = await fetch('/api/admin/metrics');
        if (metRes.ok) setMetrics(await metRes.json());
      }
    } catch (err) {
      console.error('[Admin Status] Update failed:', err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: notesDraft })
      });
      if (res.ok) {
        setAppointments(prev =>
          prev.map(a => (a.id === id ? { ...a, internalNotes: notesDraft } : a))
        );
        setEditingNotesId(null);
        showToast('Observações da clínica salvas.');
      }
    } catch (err) {
      console.error('[Admin Notes] Save failed:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A160F]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-6xl bg-[#FAFDF8] rounded-3xl border border-[#CCD8C4] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#CCD8C4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D24] text-[#AEE938] flex items-center justify-center font-bold shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-[#0A160F]">Gestão & CRM da Clínica</h2>
                <span className="text-[10px] font-mono-data uppercase px-2 py-0.5 rounded-md bg-[#EDF4EA] text-[#1B4D24] font-bold">
                  Dr. Luiz Tannuri
                </span>
              </div>
              <p className="text-xs text-[#566D5D]">
                Inteligência de Atendimento, Funil de Agendamentos e Sincronização
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-[#566D5D] hover:text-[#1B4D24] px-3 py-1.5 rounded-lg border border-[#CCD8C4] hover:bg-[#F4F9F1] cursor-pointer transition-colors"
              >
                Sair
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAFDF8] border border-[#CCD8C4] hover:bg-slate-100 flex items-center justify-center text-[#566D5D] hover:text-[#0A160F] cursor-pointer transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF5E6] border border-[#CCD8C4] text-[#1B4D24] flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[#0A160F]">Acesso Restrito à Equipe</h3>
            <p className="text-xs sm:text-sm text-[#566D5D] mt-2 mb-6">
              Digite a senha de equipe da recepção ou do Dr. Luiz Tannuri para acessar a agenda e dados de pacientes.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Senha de acesso..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-[#CCD8C4] bg-white text-sm text-[#0A160F] focus:outline-none focus:border-[#1B4D24] focus:ring-2 focus:ring-[#1B4D24]/10"
              />
              {authError && <p className="text-xs text-red-600 font-semibold">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1B4D24] hover:bg-[#153e1d] text-white font-bold text-sm transition-colors cursor-pointer shadow-sm"
              >
                Acessar Painel Clínico
              </button>
            </form>
            <p className="text-[11px] text-[#566D5D] mt-4">
              Dica de homologação: utilize a senha <code className="bg-[#EDF4EA] px-1.5 py-0.5 rounded text-[#1B4D24] font-mono">tannuri2026</code>
            </p>
          </div>
        ) : (
          <>
            {/* KPI Cards Strip */}
            {metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#FAFDF8] border-b border-[#CCD8C4]">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs">
                  <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Total de Solicitações</span>
                  <div className="font-display font-black text-2xl text-[#0A160F] mt-1">{metrics.totalRequests}</div>
                  <span className="text-[11px] text-[#566D5D] mt-0.5 block">funil 'Ver Agenda'</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs">
                  <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Taxa de Conversão</span>
                  <div className="font-display font-black text-2xl text-[#1B4D24] mt-1">{metrics.conversionRatePercent}%</div>
                  <span className="text-[11px] text-[#566D5D] mt-0.5 block">{metrics.confirmedCount + metrics.completedCount} fechados</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs">
                  <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Modalidade</span>
                  <div className="font-display font-bold text-base text-[#0A160F] mt-1.5 flex items-center justify-between">
                    <span>DF: <strong className="text-[#1B4D24]">{metrics.byModality.presencial}</strong></span>
                    <span className="text-[#CCD8C4]">/</span>
                    <span>Online: <strong className="text-[#25D366]">{metrics.byModality.online}</strong></span>
                  </div>
                  <span className="text-[11px] text-[#566D5D] mt-0.5 block">distribuição de demanda</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#CCD8C4] shadow-2xs">
                  <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Aguardando Contato</span>
                  <div className="font-display font-black text-2xl text-[#EB651A] mt-1">{metrics.pendingCount + metrics.inContactCount}</div>
                  <span className="text-[11px] text-[#566D5D] mt-0.5 block">em negociação ativa</span>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-[#CCD8C4] bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 overflow-x-auto py-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'pipeline'
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'text-[#566D5D] hover:text-[#0A160F] hover:bg-[#FAFDF8]'
                  }`}
                >
                  Pipeline de Atendimentos ({appointments.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tot')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'tot'
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'text-[#566D5D] hover:text-[#0A160F] hover:bg-[#FAFDF8]'
                  }`}
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-[#AEE938]" />
                  <span>Tree of Thoughts (ToT) & Estratégia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sheets')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'sheets'
                      ? 'bg-[#1B4D24] text-white shadow-xs'
                      : 'text-[#566D5D] hover:text-[#0A160F] hover:bg-[#FAFDF8]'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#1B4D24]" />
                  <span>Sincronização Google Sheets / CSV</span>
                </button>
              </div>

              <button
                type="button"
                onClick={fetchData}
                disabled={loading}
                title="Atualizar dados"
                className="p-2 rounded-xl border border-[#CCD8C4] hover:bg-[#F4F9F1] text-[#1B4D24] cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Tab 1: Pipeline */}
            {activeTab === 'pipeline' && (
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                {/* Filters Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#CCD8C4]">
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-[#566D5D]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && fetchData()}
                      placeholder="Buscar por paciente, protocolo, telefone ou objetivo..."
                      className="w-full text-xs bg-transparent focus:outline-none text-[#0A160F]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="text-xs bg-[#FAFDF8] border border-[#CCD8C4] rounded-lg px-2.5 py-1.5 text-[#0A160F] focus:outline-none"
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="pendente">Pendente</option>
                      <option value="em_contato">Em Contato</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="realizado">Realizado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>

                    <select
                      value={modalityFilter}
                      onChange={e => setModalityFilter(e.target.value)}
                      className="text-xs bg-[#FAFDF8] border border-[#CCD8C4] rounded-lg px-2.5 py-1.5 text-[#0A160F] focus:outline-none"
                    >
                      <option value="todos">Todas Modalidades</option>
                      <option value="presencial">Presencial (DF)</option>
                      <option value="online">Telemedicina HD</option>
                    </select>

                    <a
                      href="/api/admin/export-csv"
                      download
                      className="px-3 py-1.5 rounded-lg bg-[#1B4D24] text-white hover:bg-[#153e1d] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar CSV</span>
                    </a>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-[#CCD8C4] overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAFDF8] border-b border-[#CCD8C4] text-[11px] font-mono-data uppercase text-[#566D5D]">
                        <tr>
                          <th className="py-3 px-4">Protocolo / Data</th>
                          <th className="py-3 px-4">Paciente & Contato</th>
                          <th className="py-3 px-4">Serviço Solicitado</th>
                          <th className="py-3 px-4">Horário Desejado</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Ações Rápidas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CCD8C4]/60">
                        {appointments.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#566D5D]">
                              Nenhuma solicitação encontrada para os filtros selecionados.
                            </td>
                          </tr>
                        ) : (
                          appointments.map(app => (
                            <tr key={app.id} className="hover:bg-[#FAFDF8] transition-colors">
                              <td className="py-3.5 px-4 align-top">
                                <span className="font-mono-data font-bold text-[#1B4D24] block">
                                  {app.bookingCode}
                                </span>
                                <span className="text-[10px] text-[#566D5D] block">
                                  {new Date(app.createdAt).toLocaleDateString('pt-BR')} às {new Date(app.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 align-top">
                                <strong className="text-xs text-[#0A160F] block">{app.patientName}</strong>
                                <div className="flex items-center gap-2 mt-1">
                                  <a
                                    href={`https://wa.me/${app.patientWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${app.patientName}! Aqui é da recepção do Dr. Luiz Tannuri em relação à sua solicitação de consulta (Protocolo: ${app.bookingCode}).`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-[#25D366] hover:underline flex items-center gap-1 font-bold"
                                  >
                                    <Phone className="w-3 h-3" />
                                    <span>{app.patientWhatsApp}</span>
                                  </a>
                                </div>
                                {app.patientEmail && (
                                  <span className="text-[11px] text-[#566D5D] block mt-0.5">{app.patientEmail}</span>
                                )}
                                <p className="text-[11px] text-[#384C3E] mt-1.5 italic line-clamp-2">
                                  "{app.primaryGoal}"
                                </p>
                              </td>

                              <td className="py-3.5 px-4 align-top">
                                <strong className="text-xs text-[#0A160F] block">{app.serviceName}</strong>
                                <span className="text-[11px] text-[#566D5D] block">{app.formattedPrice}</span>
                                <span className="text-[10px] font-mono-data uppercase text-[#1B4D24] block mt-0.5">
                                  {app.modality === 'presencial' ? 'Presencial (Brasília DF)' : 'Telemedicina HD'}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 align-top">
                                <strong className="text-xs text-[#0A160F] block">
                                  {new Date(app.appointmentDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                                </strong>
                                <span className="text-[11px] text-[#1B4D24] font-mono-data font-bold block">
                                  {app.slotTime}
                                </span>
                                {app.isFastingRecommended && (
                                  <span className="text-[10px] text-[#8A5A12] bg-[#FFF8E7] px-1.5 py-0.5 rounded border border-[#ECD9B8] inline-block mt-1">
                                    Jejum InBody
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 align-top">
                                <select
                                  value={app.status}
                                  onChange={e => handleUpdateStatus(app.id, e.target.value as AppointmentStatus)}
                                  className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                                    app.status === 'confirmado'
                                      ? 'bg-[#EBF5E6] text-[#1B4D24] border-[#CCD8C4]'
                                      : app.status === 'em_contato'
                                      ? 'bg-[#FFF8E7] text-[#8A5A12] border-[#ECD9B8]'
                                      : app.status === 'realizado'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : app.status === 'cancelado'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                                >
                                  <option value="pendente">Pendente</option>
                                  <option value="em_contato">Em Contato</option>
                                  <option value="confirmado">Confirmado</option>
                                  <option value="realizado">Realizado</option>
                                  <option value="cancelado">Cancelado</option>
                                </select>

                                {/* Notes trigger */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNotesId(app.id);
                                    setNotesDraft(app.internalNotes || '');
                                  }}
                                  className="text-[10px] text-[#566D5D] hover:text-[#1B4D24] block mt-2 hover:underline cursor-pointer"
                                >
                                  {app.internalNotes ? 'Editar Notas' : '+ Adicionar Notas'}
                                </button>
                              </td>

                              <td className="py-3.5 px-4 align-top text-right space-y-1.5">
                                {/* WhatsApp Direct Action */}
                                <a
                                  href={`https://wa.me/${app.patientWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${app.patientName}! Sou da equipe do Dr. Luiz Tannuri. Recebemos sua solicitação para ${app.serviceName} no dia ${app.appointmentDate} às ${app.slotTime} (Protocolo: ${app.bookingCode}). Podemos confirmar seu atendimento?`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#25D366] text-white hover:bg-[#1EBE5D] text-[11px] font-bold transition-all shadow-2xs"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>

                                {/* ToT Analyze Trigger */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveTab('tot');
                                    handleRunToT(app);
                                  }}
                                  className="block ml-auto text-[11px] text-[#1B4D24] hover:underline font-bold"
                                >
                                  Analisar ToT
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Edit Notes Modal Dialog */}
                {editingNotesId && (
                  <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-[#CCD8C4] shadow-xl">
                      <h4 className="font-bold text-sm text-[#0A160F] mb-2">Notas Clínicas da Recepção</h4>
                      <textarea
                        value={notesDraft}
                        onChange={e => setNotesDraft(e.target.value)}
                        rows={4}
                        placeholder="Ex: Paciente solicitou envio de link do Zoom; possui exames de 2026 para apresentar..."
                        className="w-full text-xs p-3 rounded-xl border border-[#CCD8C4] focus:outline-none focus:border-[#1B4D24]"
                      />
                      <div className="flex items-center justify-end gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1.5 text-xs text-[#566D5D] hover:bg-slate-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(editingNotesId)}
                          className="px-4 py-1.5 text-xs bg-[#1B4D24] text-white font-bold rounded-lg hover:bg-[#153e1d]"
                        >
                          Salvar Notas
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Tree of Thoughts (ToT) */}
            {activeTab === 'tot' && (
              <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
                <div className="bg-gradient-to-r from-[#1B4D24] to-[#2A6536] text-white p-6 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-2.5 text-[#AEE938] font-mono-data text-xs uppercase font-bold tracking-wider mb-1">
                    <BrainCircuit className="w-4 h-4" />
                    <span>Tree of Thoughts (ToT) Framework — Super Prompt Intelligence</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    Potência Máxima de Gestão da Informação & Conversão Clínica
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EDF4EA] mt-1 max-w-2xl leading-relaxed">
                    A IA generativa avalia os objetivos do paciente sob 3 ramos analíticos para encontrar o melhor fechamento ético de consulta e adesão aos protocolos de longevidade e nutrição esportiva do Dr. Luiz Tannuri.
                  </p>
                </div>

                {/* ToT Selector & Interactive Runner */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Select Appointment */}
                  <div className="lg:col-span-1 space-y-3">
                    <label className="text-xs font-mono-data uppercase text-[#566D5D] font-bold block">
                      Selecione um Paciente para Analisar:
                    </label>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                      {appointments.map(app => (
                        <div
                          key={app.id}
                          onClick={() => handleRunToT(app)}
                          className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                            selectedAppForToT?.id === app.id
                              ? 'bg-white border-[#1B4D24] shadow-xs ring-2 ring-[#1B4D24]/10'
                              : 'bg-white/80 border-[#CCD8C4] hover:border-[#1B4D24]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <strong className="text-[#0A160F]">{app.patientName}</strong>
                            <span className="font-mono-data text-[10px] text-[#1B4D24]">{app.bookingCode}</span>
                          </div>
                          <p className="text-[11px] text-[#566D5D] mt-1 line-clamp-1">{app.serviceName}</p>
                          <p className="text-[10px] text-[#384C3E] italic mt-1 line-clamp-1">"{app.primaryGoal}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: ToT Results View */}
                  <div className="lg:col-span-2 bg-white rounded-3xl border border-[#CCD8C4] p-6 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#CCD8C4]">
                        <div>
                          <span className="text-[10px] font-mono-data uppercase text-[#566D5D]">Análise do Lead Selecionado</span>
                          <h4 className="font-display font-bold text-lg text-[#0A160F]">
                            {selectedAppForToT ? selectedAppForToT.patientName : 'Nenhum paciente selecionado'}
                          </h4>
                        </div>
                        {selectedAppForToT && (
                          <button
                            type="button"
                            onClick={() => handleRunToT(selectedAppForToT)}
                            disabled={totLoading}
                            className="px-3 py-1.5 rounded-xl bg-[#1B4D24] text-white hover:bg-[#153e1d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#AEE938]" />
                            <span>{totLoading ? 'Processando ToT...' : 'Recalcular ToT'}</span>
                          </button>
                        )}
                      </div>

                      {totLoading ? (
                        <div className="py-12 text-center text-[#566D5D]">
                          <BrainCircuit className="w-8 h-8 text-[#1B4D24] animate-pulse mx-auto mb-3" />
                          <p className="text-xs font-semibold">Desdobrando a Árvore de Pensamentos (ToT)...</p>
                          <p className="text-[11px] text-[#566D5D] mt-1">Avaliando ramo rápido, valor clínico e script de WhatsApp.</p>
                        </div>
                      ) : totAnalysis ? (
                        <div className="mt-4 prose prose-sm max-w-none text-xs text-[#0A160F] leading-relaxed whitespace-pre-line bg-[#FAFDF8] p-4 rounded-2xl border border-[#CCD8C4]">
                          {totAnalysis}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-[#566D5D]">
                          <p className="text-xs">Clique no botão acima ou selecione um paciente para gerar a análise ToT instantânea.</p>
                        </div>
                      )}
                    </div>

                    {selectedAppForToT && (
                      <div className="pt-4 mt-4 border-t border-[#CCD8C4] flex items-center justify-between">
                        <span className="text-[11px] text-[#566D5D]">
                          Data do Atendimento: <strong>{selectedAppForToT.appointmentDate}</strong> às <strong>{selectedAppForToT.slotTime}</strong>
                        </span>
                        <a
                          href={`https://wa.me/${selectedAppForToT.patientWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${selectedAppForToT.patientName}! Aqui é da equipe do Dr. Luiz Tannuri em Brasília. Validamos sua solicitação para ${selectedAppForToT.serviceName} no dia ${selectedAppForToT.appointmentDate} às ${selectedAppForToT.slotTime}. O Dr. Luiz já alinhou sua pré-triagem focada em "${selectedAppForToT.primaryGoal}". Podemos confirmar sua consulta?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold flex items-center gap-2 shadow-2xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Enviar Script Pronto no WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Google Sheets & Export */}
            {activeTab === 'sheets' && (
              <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
                <div className="bg-white p-6 rounded-3xl border border-[#CCD8C4] shadow-2xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EBF5E6] text-[#1B4D24] flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#0A160F]">
                        Sincronização com Google Sheets & Recepção
                      </h4>
                      <p className="text-xs text-[#566D5D]">
                        Mantenha os agendamentos sempre sincronizados com a planilha de controle diário do consultório.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-2xl bg-[#FAFDF8] border border-[#CCD8C4]">
                      <strong className="text-xs text-[#0A160F] block">Download em Formato Universal (CSV UTF-8 BOM)</strong>
                      <p className="text-[11px] text-[#566D5D] mt-1">
                        Compatível diretamente com Google Planilhas, Microsoft Excel e Apple Numbers com caracteres acentuados preservados.
                      </p>
                      <a
                        href="/api/admin/export-csv"
                        download
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B4D24] text-white text-xs font-bold hover:bg-[#153e1d] transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Baixar Planilha de Agendamentos (.CSV)</span>
                      </a>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAFDF8] border border-[#CCD8C4]">
                      <strong className="text-xs text-[#0A160F] block">Conexão com Google Workspace / Google Sheets API</strong>
                      <p className="text-[11px] text-[#566D5D] mt-1">
                        A equipe pode colar a URL do Google Sheets oficial da clínica para espelhamento automático bidirecional.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value="https://docs.google.com/spreadsheets/d/drtannuri-agenda-2026/edit"
                          className="text-xs px-3 py-2 bg-white border border-[#CCD8C4] rounded-lg text-[#566D5D] flex-1 select-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('https://docs.google.com/spreadsheets/d/drtannuri-agenda-2026/edit');
                            showToast('Link do Google Sheets copiado!');
                          }}
                          className="px-3 py-2 text-xs bg-white border border-[#CCD8C4] hover:bg-[#F4F9F1] rounded-lg font-bold text-[#1B4D24] cursor-pointer"
                        >
                          Copiar Link
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#ECD9B8] text-xs text-[#4A3814] flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#8A5A12] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Privacidade & Conformidade CFN/LGPD:</strong>
                      <p className="mt-0.5 text-[11px] leading-relaxed">
                        Os dados clínicos de pacientes (objetivo metabólico, telefone e e-mail) destinam-se exclusivamente à gestão do ato médico/nutricional e contato pré-consulta, não sendo compartilhados com terceiros nem usados para fins de marketing não autorizados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Toast Feedback */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-70 bg-[#1B4D24] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
                <Check className="w-4 h-4 text-[#AEE938]" />
                <span>{toastMessage}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
