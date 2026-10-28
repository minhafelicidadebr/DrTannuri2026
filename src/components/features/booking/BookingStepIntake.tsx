import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Phone, Mail, Target, FileText, ShieldCheck, Check } from 'lucide-react';
import { BookingFormData, BookingServiceItem, BookingModality, TimeSlot } from '../../../types/booking';

interface BookingStepIntakeProps {
  formData: BookingFormData;
  onChangeFormData: (data: Partial<BookingFormData>) => void;
  service: BookingServiceItem;
  modality: BookingModality;
  selectedDate: Date;
  selectedSlot: TimeSlot;
  onSubmit: () => void;
  onBack: () => void;
}

export const BookingStepIntake: React.FC<BookingStepIntakeProps> = ({
  formData,
  onChangeFormData,
  service,
  modality,
  selectedDate,
  selectedSlot,
  onSubmit,
  onBack
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Auto-mask for Brazilian phone numbers: (XX) 9XXXX-XXXX
  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatPhone(e.target.value);
    onChangeFormData({ whatsApp: masked });
  };

  const goals = [
    'Recomposição Corporal & Massa Magra',
    'Disposição & Controle de Glicemia',
    'Saúde Digestiva & Vitalidade Intestinal',
    'Performance Esportiva & Endurance',
    'Longevidade & Rotina Sustentável'
  ];

  const isPhoneValid = formData.whatsApp.replace(/\D/g, '').length >= 10;
  const isNameValid = formData.fullName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isGoalValid = formData.primaryGoal.length > 0;

  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isGoalValid;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Summary Strip of Chosen Time & Service */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-white to-[#F4F9F0] border border-[#CCD8C4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-mono-data uppercase text-[#566D5D] block">Resumo do Horário Selecionado</span>
          <div className="font-bold text-[#0A160F] text-sm mt-0.5">
            {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })} às {selectedSlot.time}
          </div>
          <p className="text-[#566D5D] text-[11px] mt-0.5">
            {service.name} • {modality === 'presencial' ? 'Presencial: Brasília (DF)' : 'Telemedicina HD'}
          </p>
        </div>

        <div className="font-mono-data font-black text-base text-[#1B4D24] bg-white px-3 py-1.5 rounded-xl border border-[#CCD8C4] shadow-2xs self-start sm:self-center">
          {service.price}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Nome Completo *</span>
            </label>
            <input
              type="text"
              id="booking-name-input"
              value={formData.fullName}
              onChange={(e) => onChangeFormData({ fullName: e.target.value })}
              onBlur={() => setTouched((p) => ({ ...p, name: true }))}
              placeholder="Como prefere ser chamado(a)?"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs text-[#0A160F] transition-all outline-none focus:ring-2 focus:ring-[#1B4D24]/20 ${
                touched.name && !isNameValid ? 'border-red-400 bg-red-50/20' : 'border-[#CCD8C4] focus:border-[#1B4D24]'
              }`}
            />
            {touched.name && !isNameValid && (
              <span className="text-[10px] text-red-500 mt-1 block">Informe seu nome completo.</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp / Celular *</span>
            </label>
            <input
              type="tel"
              id="booking-whatsapp-input"
              value={formData.whatsApp}
              onChange={handlePhoneChange}
              onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
              placeholder="(11) 98765-4321"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-mono-data text-[#0A160F] transition-all outline-none focus:ring-2 focus:ring-[#1B4D24]/20 ${
                touched.phone && !isPhoneValid ? 'border-red-400 bg-red-50/20' : 'border-[#CCD8C4] focus:border-[#1B4D24]'
              }`}
            />
            {touched.phone && !isPhoneValid && (
              <span className="text-[10px] text-red-500 mt-1 block">Insira um WhatsApp válido com DDD.</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>E-mail para Convite e Prontuário *</span>
          </label>
          <input
            type="email"
            id="booking-email-input"
            value={formData.email}
            onChange={(e) => onChangeFormData({ email: e.target.value })}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
            placeholder="seu.email@exemplo.com"
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs font-mono-data text-[#0A160F] transition-all outline-none focus:ring-2 focus:ring-[#1B4D24]/20 ${
              touched.email && !isEmailValid ? 'border-red-400 bg-red-50/20' : 'border-[#CCD8C4] focus:border-[#1B4D24]'
            }`}
          />
          {touched.email && !isEmailValid && (
            <span className="text-[10px] text-red-500 mt-1 block">Insira um e-mail válido para receber o link do calendário.</span>
          )}
        </div>

        {/* Primary Goal Selector */}
        <div>
          <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] mb-2 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>Qual é o seu objetivo prioritário no momento? *</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => {
              const isSelected = formData.primaryGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => onChangeFormData({ primaryGoal: goal })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1B4D24] text-white font-bold shadow-2xs'
                      : 'bg-white border border-[#CCD8C4] text-[#384C3E] hover:border-[#1B4D24] hover:bg-[#F4F9F1]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#AEE938]" />}
                  <span>{goal}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-mono-data font-bold uppercase tracking-wider text-[#566D5D] mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Exames Recentes, Alergias ou Observações (Opcional)</span>
          </label>
          <textarea
            rows={2}
            id="booking-notes-input"
            value={formData.medicalNotes}
            onChange={(e) => onChangeFormData({ medicalNotes: e.target.value })}
            placeholder="Ex: Tenho exames de sangue do mês passado, intolerância à lactose, treino corrida..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCD8C4] bg-white text-xs text-[#0A160F] transition-all outline-none focus:ring-2 focus:ring-[#1B4D24]/20 focus:border-[#1B4D24]"
          />
        </div>

        {/* LGPD & Reminder Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 text-xs text-[#384C3E] cursor-pointer select-none">
            <input
              type="checkbox"
              id="booking-reminders-checkbox"
              checked={formData.allowReminders}
              onChange={(e) => onChangeFormData({ allowReminders: e.target.checked })}
              className="mt-0.5 rounded border-[#CCD8C4] text-[#1B4D24] focus:ring-[#1B4D24]"
            />
            <span className="leading-snug text-[#566D5D]">
              Concordo em receber lembretes de consulta por WhatsApp e convite de calendário, respeitando a privacidade médica (LGPD).
            </span>
          </label>
        </div>
      </div>

      {/* Step 3 Actions Footer */}
      <div className="pt-4 border-t border-[#CCD8C4] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-4 py-2.5 rounded-xl border border-[#CCD8C4] hover:border-[#1B4D24] text-xs font-bold text-[#2C4032] flex items-center gap-1.5 cursor-pointer transition-colors bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Horário</span>
        </button>

        <button
          type="button"
          id="booking-step3-submit-btn"
          disabled={!isFormValid}
          onClick={onSubmit}
          className="min-h-[44px] px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#1B4D24] to-[#245D2E] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          <span>Revisar Solicitação de Horário</span>
          <ShieldCheck className="w-4 h-4 text-[#AEE938]" />
        </button>
      </div>
    </div>
  );
};
