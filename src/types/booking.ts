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

export interface BookingAppointment {
  modality: BookingModality;
  service: BookingServiceItem;
  date: Date;
  dateString: string; // e.g., '2026-09-22'
  slot: TimeSlot;
  patient: BookingFormData;
  bookingCode: string;
  createdAt: string;
}
