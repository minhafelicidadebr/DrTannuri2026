import React, { useState } from 'react';
import { CheckCircle2, Calendar, Download, MessageCircle, ExternalLink, ShieldCheck, Clock, MapPin, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { BookingAppointment } from '../../../types/booking';
import { downloadAppointmentICS, getGoogleCalendarUrl } from '../../../utils/calendarIcs';
import { CLIENT_INFO } from '../../../data/canonicalCatalog';
import { VISUAL_ASSETS } from '../../../data/imageAssets';

interface BookingStepConfirmationProps {
  appointment: BookingAppointment;
  onClose: () => void;
  onOpenConcierge: (prompt: string) => void;
}

export const BookingStepConfirmation: React.FC<BookingStepConfirmationProps> = ({
  appointment,
  onClose,
  onOpenConcierge
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const googleUrl = getGoogleCalendarUrl(appointment);

  const handleDownloadICS = () => {
    downloadAppointmentICS(appointment);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appointment.bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopySummary = () => {
    const summaryText = [
      `Solicitação de Horário — Dr. Luiz Tannuri`,
      `Protocolo: ${appointment.bookingCode}`,
      `Paciente: ${appointment.patient.fullName}`,
      `WhatsApp: ${appointment.patient.whatsApp}`,
      `E-mail: ${appointment.patient.email}`,
      `Serviço: ${appointment.service.name}`,
      `Modalidade: ${appointment.modality === 'presencial' ? `Presencial em ${CLIENT_INFO.cityRegion}` : 'Telemedicina Online HD'}`,
      `Data Pretendida: ${appointment.date.toLocaleDateString('pt-BR')} (${appointment.slot.time})`,
      `Investimento: ${appointment.service.price}`,
      `Objetivo: ${appointment.patient.primaryGoal}`,
      appointment.patient.medicalNotes ? `Observações: ${appointment.patient.medicalNotes}` : '',
      `Status: Solicitação pendente de validação pela recepção.`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleWhatsAppSend = () => {
    if (!CLIENT_INFO.isWhatsAppConfirmed) {
      handleCopySummary();
      return;
    }
    const text = encodeURIComponent(
      `Olá! Registrei uma solicitação de preferência de horário no site:\n\n• Protocolo: ${appointment.bookingCode}\n• Paciente: ${appointment.patient.fullName}\n• Serviço: ${appointment.service.name}\n• Data: ${appointment.date.toLocaleDateString('pt-BR')} às ${appointment.slot.time}\n• Modalidade: ${appointment.modality === 'presencial' ? `Presencial (${CLIENT_INFO.cityRegion})` : 'Telemedicina HD'}\n\nAguardo contato para alinhamento e confirmação!`
    );
    window.open(`https://wa.me/${CLIENT_INFO.whatsAppClean}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Honest Request Header */}
      <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-[#EBF5E6] via-[#F4FAF0] to-white border border-[#CCD8C4] shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#1B4D24] text-[#AEE938] flex items-center justify-center mx-auto mb-3 shadow-md">
          <Clock className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono-data uppercase tracking-wider text-[#1B4D24] font-bold">
          Solicitação de Horário Registrada
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0A160F] mt-1">
          Preferência de Atendimento Recebida
        </h3>
        <p className="text-xs sm:text-sm text-[#566D5D] mt-2 max-w-md mx-auto leading-relaxed">
          Sua preferência foi salva com sucesso. Para garantir a qualidade clínica e ausência de conflitos, a vaga definitiva será validada diretamente pela recepção no horário civil de Brasília (DF).
        </p>
      </div>

      {/* Clinical Receipt Card */}
      <div className="rounded-2xl bg-white border border-[#CCD8C4] overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-[#CCD8C4] bg-[#FAFDF8] flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Protocolo Local (Rascunho)</span>
            <div className="font-mono-data font-black text-lg text-[#1B4D24] flex items-center gap-2">
              <span>{appointment.bookingCode}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                title="Copiar código"
                className="p-1 rounded-md hover:bg-white text-[#566D5D] hover:text-[#1B4D24] cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl border border-[#CCD8C4] bg-white hover:bg-[#F2F7ED] text-xs font-bold text-[#1B4D24] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Resumo Copiado!' : 'Copiar Resumo'}</span>
            </button>
            <div className="text-right pl-3 border-l border-[#CCD8C4]">
              <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Investimento</span>
              <span className="font-mono-data font-black text-lg text-[#0A160F]">
                {appointment.service.price}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[11px] font-mono-data uppercase text-[#566D5D] block">Serviço Selecionado</span>
            <strong className="text-sm text-[#0A160F] block mt-0.5">{appointment.service.name}</strong>
            <span className="text-[#566D5D] text-[11px]">{appointment.service.duration}</span>
          </div>

          <div>
            <span className="text-[11px] font-mono-data uppercase text-[#566D5D] block">Data & Turno Pretendido</span>
            <strong className="text-sm text-[#0A160F] block mt-0.5">
              {appointment.date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </strong>
            <span className="text-[#1B4D24] font-mono-data font-bold">{appointment.slot.time} ({appointment.slot.label})</span>
          </div>

          <div>
            <span className="text-[11px] font-mono-data uppercase text-[#566D5D] block">Modalidade</span>
            <strong className="text-xs text-[#0A160F] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#1B4D24]" />
              <span>
                {appointment.modality === 'presencial'
                  ? `Presencial: ${CLIENT_INFO.cityRegion}`
                  : 'Telemedicina Online HD'}
              </span>
            </strong>
          </div>

          <div>
            <span className="text-[11px] font-mono-data uppercase text-[#566D5D] block">Responsável Técnico</span>
            <strong className="text-xs text-[#0A160F] block mt-0.5">
              {CLIENT_INFO.professionalCoordination}
            </strong>
          </div>
        </div>
      </div>

      {/* Sincronização de Calendário Pretendido */}
      <div>
        <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-2.5">
          Lembrete Pessoal de Horário Pretendido (Não confirmado)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Google Calendar Link */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-[#CCD8C4] hover:border-[#1B4D24] bg-white hover:bg-[#F4F9F1] text-xs font-bold text-[#0A160F] flex items-center justify-between transition-all cursor-pointer shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1B4D24]" />
              <span>Salvar Lembrete no Google Calendar</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#566D5D]" />
          </a>

          {/* Download ICS */}
          <button
            type="button"
            onClick={handleDownloadICS}
            className="p-3 rounded-xl border border-[#CCD8C4] hover:border-[#1B4D24] bg-white hover:bg-[#F4F9F1] text-xs font-bold text-[#0A160F] flex items-center justify-between transition-all cursor-pointer shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#1B4D24]" />
              <span>Baixar Lembrete .ICS (Apple / Outlook)</span>
            </span>
            <Download className="w-3.5 h-3.5 text-[#566D5D]" />
          </button>
        </div>
      </div>

      {/* Notice on unconfirmed external channel */}
      {!CLIENT_INFO.isWhatsAppConfirmed && (
        <div className="p-3.5 rounded-xl bg-[#F6FAF1] border border-[#CCD8C4] text-xs text-[#384C3E] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#EB651A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Canal oficial em validação:</strong> O canal direto de WhatsApp da clínica encontra-se em homologação cadastral. Utilize o botão <strong>Copiar Resumo</strong> acima para guardar seus dados ou consulte a Concierge Clara para dúvidas sobre os planos.
          </p>
        </div>
      )}

      {/* Checklist de Preparo Clínico */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#ECD9B8] text-xs text-[#4A3814]">
        <div className="flex items-center gap-2 font-mono-data font-bold uppercase text-[#8A5A12] mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>Orientações para o Atendimento</span>
        </div>
        <ul className="space-y-1.5 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#8A5A12] font-bold">•</span>
            <span><strong>Exames de Sangue:</strong> Separe arquivos PDF de exames realizados nos últimos 6 meses para apresentação.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8A5A12] font-bold">•</span>
            <span><strong>Recordatório:</strong> Não altere sua dieta antes da consulta; precisamos mapear seus hábitos reais.</span>
          </li>
          {appointment.modality === 'presencial' && (
            <li className="flex items-start gap-2">
              <span className="text-[#8A5A12] font-bold">•</span>
              <span><strong>Bioimpedância InBody 120:</strong> Recomenda-se jejum alimentar de 2 a 3 horas no dia da avaliação presencial.</span>
            </li>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenConcierge(`Olá, Clara! Registrei uma solicitação de horário para a consulta ${appointment.service.name}. Gostaria de entender mais detalhes sobre a conduta.`);
          }}
          className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#CCD8C4] hover:border-[#1B4D24] text-xs font-bold text-[#1B4D24] bg-white flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
        >
          <img 
            src={VISUAL_ASSETS.conciergeAvatar.src} 
            alt="Clara" 
            className="w-5 h-5 rounded-full object-cover border border-[#CCD8C4]"
          />
          <span>Tirar Dúvidas com a Clara</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {CLIENT_INFO.isWhatsAppConfirmed ? (
            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="min-h-[46px] flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar via WhatsApp</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopySummary}
              className="min-h-[46px] flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white border border-[#1B4D24] hover:bg-[#F4F9F1] text-[#1B4D24] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Copy className="w-4 h-4 text-[#1B4D24]" />
              <span>{copiedSummary ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#1B4D24] hover:bg-[#245D2E] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
