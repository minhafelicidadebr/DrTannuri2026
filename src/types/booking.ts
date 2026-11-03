export type BookingModality = 'presencial' | 'online';

export type BookingServiceCategory = 'protocolo' | 'plano' | 'addon';

export interface BookingServiceItem {
  id: string;
  name: string;
  category: BookingServiceCategory;
  categoryLabel: string;
  price: string;
  priceCentsByModality?: Record<BookingModality, number>;
  duration: string;
  description: string;
  highlight?: string;
  modalitiesAllowed: BookingModality[];
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'manha' | 'tarde' | 'noite';
  label: string;
  available: boolean;
  isFastingRecommended?: boolean;
}

export interface BookingFormData {
  fullName: string;
  whatsApp: string;
  email: string;
  primaryGoal: string;
  medicalNotes: string;
  allowReminders: boolean;
}

export type BookingStep = 1 | 2 | 3 | 4;

export type AppointmentStatus = 'pendente' | 'em_contato' | 'confirmado' | 'cancelado' | 'realizado';

export interface BookingAppointment {
  modality: BookingModality;
  service: BookingServiceItem;
  date: Date;
  dateString: string; // e.g., '2026-09-22'
  slot: TimeSlot;
  patient: BookingFormData;
  bookingCode: string;
  createdAt: string;
  status?: AppointmentStatus;
  internalNotes?: string;
  source?: string;
}

export interface StoredAppointment {
  id: string;
  bookingCode: string;
  patientName: string;
  patientWhatsApp: string;
  patientEmail: string;
  primaryGoal: string;
  medicalNotes?: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  modality: BookingModality;
  priceCents: number;
  formattedPrice: string;
  appointmentDate: string; // YYYY-MM-DD
  slotTime: string;
  slotPeriod: 'manha' | 'tarde' | 'noite';
  isFastingRecommended: boolean;
  status: AppointmentStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string;
}

export interface ClinicMetrics {
  totalRequests: number;
  pendingCount: number;
  inContactCount: number;
  confirmedCount: number;
  completedCount: number;
  conversionRatePercent: number;
  byModality: {
    presencial: number;
    online: number;
  };
  byService: Record<string, { name: string; count: number; totalEstimatedValue: number }>;
  recentRequests: StoredAppointment[];
}

