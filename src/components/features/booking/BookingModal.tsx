import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { X, Calendar, ArrowLeft, Check, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { BookingStep, BookingModality, BookingServiceItem, TimeSlot, BookingFormData, BookingAppointment } from '../../../types/booking';
import { BOOKING_SERVICES } from '../../../data/bookingServices';
import { BookingStepModalityService } from './BookingStepModalityService';
import { BookingStepDateTime } from './BookingStepDateTime';
import { BookingStepIntake } from './BookingStepIntake';
import { BookingStepConfirmation } from './BookingStepConfirmation';
import { BookingAuthoritySidebar } from './BookingAuthoritySidebar';
import { analytics } from '../../../lib/analytics';

interface LocalErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface LocalErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class LocalBookingErrorBoundary extends Component<LocalErrorBoundaryProps, LocalErrorBoundaryState> {
  constructor(props: LocalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): LocalErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'Falha temporária' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[BookingModal] Local error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center space-y-4 my-auto bg-white rounded-2xl border border-[#CCD8C4]">
          <div className="w-12 h-12 rounded-xl bg-[#FBF0EA] text-[#EB651A] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-lg text-[#0A160F]">
            Carregamento da Agenda Online
          </h4>
          <p className="text-xs text-[#566D5D] max-w-sm mx-auto">
            Identificamos uma pequena variação nos dados de navegação. Clique no botão abaixo para reiniciar o fluxo de agendamento do Dr. Luiz Tannuri com segurança.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, errorMessage: '' });
              this.props.onReset();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1B4D24] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm hover:bg-[#245D2E]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reiniciar Agendamento</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  const [selectedService, setSelectedService] = useState<BookingServiceItem>(() => {
    if (initialServiceId) {
      const match = BOOKING_SERVICES.find((s) => s.id === initialServiceId);
      if (match) return match;
    }
    return BOOKING_SERVICES[0] || {
      id: 'diagnostico_inicial',
      name: 'Diagnóstico Inicial de Precisão',
      category: 'plano' as const,
      categoryLabel: 'Porta de Entrada',
      price: 'R$ 450 (Online) / R$ 750 (Presencial)',
      priceCentsByModality: { online: 45000, presencial: 75000 },
      duration: '60 min (+1 retorno)',
      description: 'Consulta individual de 60 minutos.',
      modalitiesAllowed: ['online', 'presencial'] as any
    };
  });

  // Date & Slot
  const getInitialDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset/sync whenever modal opens or initialServiceId changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedSlot(null);
      setSelectedDate(getInitialDate());

      const targetId = initialServiceId || selectedService?.id;
      const match = BOOKING_SERVICES.find((s) => s.id === targetId) || BOOKING_SERVICES[0];
      if (match) {
        setSelectedService(match);
        const allowed = Array.isArray(match.modalitiesAllowed) ? match.modalitiesAllowed : ['presencial', 'online'];
        if (!allowed.includes(selectedModality)) {
          setSelectedModality(allowed[0] as BookingModality);
        }
      }

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
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

  const handleResetFlow = () => {
    setStep(1);
    setSelectedSlot(null);
    setSelectedService(BOOKING_SERVICES[0]);
    setSelectedModality('presencial');
  };

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

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedSlot) return;

    setIsSubmitting(true);
    const localCode = `LTN-${Math.floor(10000 + Math.random() * 90000)}`;

    const draftAppointment: BookingAppointment = {
      modality: selectedModality,
      service: selectedService,
      date: selectedDate,
      dateString: selectedDate.toISOString().split('T')[0],
      slot: selectedSlot,
      patient: formData,
      bookingCode: localCode,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsApp: formData.whatsApp,
          email: formData.email,
          primaryGoal: formData.primaryGoal,
          medicalNotes: formData.medicalNotes,
          serviceId: selectedService.id,
          modality: selectedModality,
          dateString: selectedDate.toISOString().split('T')[0],
          slotTime: selectedSlot.time,
          slotPeriod: selectedSlot.period,
          isFastingRecommended: Boolean(selectedSlot.isFastingRecommended),
          source: 'ver_agenda_online_funnel'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.appointment?.bookingCode) {
          draftAppointment.bookingCode = data.appointment.bookingCode;
        }
      }
    } catch (err) {
      console.warn('[Booking] Asynchronous server sync fallback:', err);
    } finally {
      setIsSubmitting(false);
      setConfirmedAppointment(draftAppointment);
      setStep(4);

      analytics.track('booking_request_submitted', 'conversion', {
        serviceId: selectedService.id,
        modality: selectedModality,
        slotTime: selectedSlot.time,
        bookingCode: draftAppointment.bookingCode
      });
    }
  };

  const stepLabels = [
    { num: 1, label: 'Serviço & Modalidade' },
    { num: 2, label: 'Preferência de Data' },
    { num: 3, label: 'Dados de Contato' },
    { num: 4, label: 'Resumo da Solicitação' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[860px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#CCD8C4] flex flex-col overflow-hidden text-[#0A160F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Navigation Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#CCD8C4] bg-[#FAFDF8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B4D24] text-[#AEE938] flex items-center justify-center shadow-xs shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-[#1B4D24] bg-[#1B4D24]/10 px-2 py-0.5 rounded-full">
                  Agenda Online Oficial
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <h3 id="booking-modal-title" className="font-display font-bold text-sm sm:text-base md:text-lg text-[#0A160F] leading-tight">
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
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl border border-[#CCD8C4] hover:bg-[#F0F6EC] text-[#566D5D] hover:text-[#0A160F] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Fechar agenda online"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body (Split Grid: Form Column + Authority Sidebar) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Interactive Flow (8 cols on desktop, scrollable, guarded with min-h-0) */}
          <div className="lg:col-span-8 p-4 sm:p-6 md:p-7 overflow-y-auto min-h-0">
            <LocalBookingErrorBoundary onReset={handleResetFlow}>
              {step === 1 && (
                <BookingStepModalityService
                  selectedModality={selectedModality}
                  onSelectModality={setSelectedModality}
                  selectedService={selectedService}
                  onSelectService={setSelectedService}
                  onNext={handleNextStep}
                />
              )}

              {step === 2 && (
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

              {step === 3 && selectedSlot && (
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
            </LocalBookingErrorBoundary>
          </div>

          {/* Right Authority Sidebar (4 cols on desktop, hidden on mobile for maximum focus) */}
          <div className="hidden lg:block lg:col-span-4 border-l border-[#CCD8C4] bg-gradient-to-b from-[#FAFDF8] to-[#EDF4EA] overflow-y-auto min-h-0">
            <BookingAuthoritySidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
