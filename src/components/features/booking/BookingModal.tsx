import React, { useState, useEffect } from 'react';
import { X, Calendar, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { BookingStep, BookingModality, BookingServiceItem, TimeSlot, BookingFormData, BookingAppointment } from '../../../types/booking';
import { BOOKING_SERVICES } from '../../../data/bookingServices';
import { BookingStepModalityService } from './BookingStepModalityService';
import { BookingStepDateTime } from './BookingStepDateTime';
import { BookingStepIntake } from './BookingStepIntake';
import { BookingStepConfirmation } from './BookingStepConfirmation';
import { BookingAuthoritySidebar } from './BookingAuthoritySidebar';
import { analytics } from '../../../lib/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onOpenConcierge: (prompt?: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onOpenConcierge
}) => {
  // Stepper state
  const [step, setStep] = useState<BookingStep>(1);

  // Modality & Service
  const [selectedModality, setSelectedModality] = useState<BookingModality>('presencial');
  const [selectedService, setSelectedService] = useState<BookingServiceItem | null>(() => {
    if (initialServiceId) {
      return BOOKING_SERVICES.find((s) => s.id === initialServiceId) || BOOKING_SERVICES[0];
    }
    return BOOKING_SERVICES[0]; // Default: Diagnóstico Inicial
  });

  // Date & Slot
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // If tomorrow is Sunday, jump to Monday
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Patient Intake Form
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    whatsApp: '',
    email: '',
    primaryGoal: '',
    medicalNotes: '',
    allowReminders: true
  });

  // Confirmed Appointment
  const [confirmedAppointment, setConfirmedAppointment] = useState<BookingAppointment | null>(null);

  // Sync initial service if prop changes
  useEffect(() => {
    if (initialServiceId) {
      const match = BOOKING_SERVICES.find((s) => s.id === initialServiceId);
      if (match) {
        setSelectedService(match);
        if (!match.modalitiesAllowed.includes(selectedModality)) {
          setSelectedModality(match.modalitiesAllowed[0]);
        }
      }
    }
  }, [initialServiceId]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      analytics.track('booking_modal_open', 'navigation', {
        initialService: initialServiceId || 'default'
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, initialServiceId, onClose]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    const next = (step + 1) as BookingStep;
    setStep(next);
    analytics.track('booking_step_change', 'navigation', { fromStep: step, toStep: next });
  };

  const handlePrevStep = () => {
    const prev = (step - 1) as BookingStep;
    setStep(prev);
    analytics.track('booking_step_change', 'navigation', { fromStep: step, toStep: prev });
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedSlot) return;

    // Generate local draft request protocol
    const randomCode = `SOL-${Math.floor(10000 + Math.random() * 90000)}`;
    const appointment: BookingAppointment = {
      modality: selectedModality,
      service: selectedService,
      date: selectedDate,
      dateString: selectedDate.toISOString().split('T')[0],
      slot: selectedSlot,
      patient: formData,
      bookingCode: randomCode,
      createdAt: new Date().toISOString()
    };

    setConfirmedAppointment(appointment);
    setStep(4);

    analytics.track('booking_request_submitted', 'conversion', {
      serviceId: selectedService.id,
      modality: selectedModality,
      slotTime: selectedSlot.time,
      bookingCode: randomCode
    });
  };

  const stepLabels = [
    { num: 1, label: 'Serviço & Modalidade' },
    { num: 2, label: 'Preferência de Data' },
    { num: 3, label: 'Dados de Contato' },
    { num: 4, label: 'Resumo da Solicitação' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A160F]/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl my-auto bg-white rounded-3xl shadow-[0_25px_70px_rgba(10,22,15,0.4)] border border-[#CCD8C4] flex flex-col overflow-hidden max-h-[92vh]">
        {/* Modal Top Navigation Bar */}
        <div className="px-5 py-4 border-b border-[#CCD8C4] bg-[#FAFDF8] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B4D24] text-[#AEE938] flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] bg-[#1B4D24]/10 px-2 py-0.5 rounded-full">
                  Agenda Online Oficial
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <h3 id="booking-modal-title" className="font-display font-bold text-base sm:text-lg text-[#0A160F]">
                Agendamento de Consultas & Protocolos
              </h3>
            </div>
          </div>

          {/* Stepper Indicator Pills (Hidden on very small screens) */}
          <div className="hidden md:flex items-center gap-2">
            {stepLabels.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div
                  key={s.num}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-data transition-all ${
                    isCurrent
                      ? 'bg-[#1B4D24] text-white font-bold shadow-2xs'
                      : isCompleted
                      ? 'bg-[#E7F3E2] text-[#1B4D24] font-semibold'
                      : 'text-[#8A9C8D] bg-[#F2F5F0]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isCurrent ? 'bg-[#AEE938] text-[#0A160F]' : isCompleted ? 'bg-[#1B4D24] text-white' : 'bg-[#DDE5DC] text-[#637567]'
                  }`}>
                    {isCompleted ? <Check className="w-2.5 h-2.5" /> : s.num}
                  </span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Close Button */}
          <button
            type="button"
            id="close-booking-modal-btn"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-[#CCD8C4] hover:bg-[#F0F6EC] text-[#566D5D] hover:text-[#0A160F] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Fechar agenda online"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body (Split Grid: Form Column + Authority Sidebar) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]">
          {/* Main Interactive Flow (8 cols on desktop) */}
          <div className="lg:col-span-8 p-5 sm:p-7 overflow-y-auto">
            {step === 1 && (
              <BookingStepModalityService
                selectedModality={selectedModality}
                onSelectModality={setSelectedModality}
                selectedService={selectedService}
                onSelectService={setSelectedService}
                onNext={handleNextStep}
              />
            )}

            {step === 2 && selectedService && (
              <BookingStepDateTime
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                service={selectedService}
                modality={selectedModality}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}

            {step === 3 && selectedService && selectedSlot && (
              <BookingStepIntake
                formData={formData}
                onChangeFormData={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
                service={selectedService}
                modality={selectedModality}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSubmit={handleConfirmBooking}
                onBack={handlePrevStep}
              />
            )}

            {step === 4 && confirmedAppointment && (
              <BookingStepConfirmation
                appointment={confirmedAppointment}
                onClose={onClose}
                onOpenConcierge={(prompt) => {
                  onClose();
                  onOpenConcierge(prompt);
                }}
              />
            )}
          </div>

          {/* Right Authority Sidebar (4 cols on desktop, hidden on mobile for maximum focus) */}
          <div className="hidden lg:block lg:col-span-4 border-t lg:border-t-0">
            <BookingAuthoritySidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
