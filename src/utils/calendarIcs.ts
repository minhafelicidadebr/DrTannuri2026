import { BookingAppointment } from '../types/booking';
import { CLIENT_INFO } from '../data/canonicalCatalog';

/**
 * Format a Date to iCalendar UTC timestamp format (YYYYMMDDTHHMMSSZ)
 */
function formatDateToICS(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

/**
 * Retorna a duração numérica exata do atendimento em minutos
 * - Consultas clínicas e de diagnóstico: 60 minutos
 * - Bioimpedância avulsa presencial (InBody 120): 20 minutos
 */
export function getAppointmentDurationMinutes(serviceId: string): number {
  if (serviceId === 'bioimpedancia_inbody') {
    return 20;
  }
  if (serviceId === 'sensor_glicose') {
    // 14 dias é a duração de uso do biossensor; a consulta de instalação e orientação é de 30 minutos
    return 30;
  }
  return 60;
}

/**
 * Parses time string (e.g. "09:30" or "08:00 - 09:00") and date into start and end Date objects
 * Handles Horário de Brasília (America/Sao_Paulo).
 */
function calculateStartEndDates(dateInput: Date | string, timeStr?: string, durationMinutes: number = 60) {
  try {
    const rawDate = dateInput instanceof Date ? dateInput : new Date(dateInput || Date.now());
    const validDate = isNaN(rawDate.getTime()) ? new Date() : rawDate;

    let hours = 9;
    let minutes = 0;
    if (timeStr && typeof timeStr === 'string') {
      const cleanTime = timeStr.split('-')[0].trim();
      const parts = cleanTime.split(':').map(Number);
      if (typeof parts[0] === 'number' && !isNaN(parts[0])) hours = parts[0];
      if (typeof parts[1] === 'number' && !isNaN(parts[1])) minutes = parts[1];
    }

    const startDate = new Date(validDate);
    startDate.setHours(hours, minutes, 0, 0);
    const dur = typeof durationMinutes === 'number' && !isNaN(durationMinutes) ? durationMinutes : 60;
    const endDate = new Date(startDate.getTime() + dur * 60 * 1000);
    return { startDate, endDate };
  } catch {
    const fallbackStart = new Date();
    return { startDate: fallbackStart, endDate: new Date(fallbackStart.getTime() + 60 * 60 * 1000) };
  }
}

/**
 * Generates an .ics file Blob and triggers a browser download
 * Strictly marked as TENTATIVE / Solicitado (not confirmed)
 */
export function downloadAppointmentICS(appointment: BookingAppointment) {
  const duration = getAppointmentDurationMinutes(appointment.service.id);
  const { startDate, endDate } = calculateStartEndDates(
    appointment.date,
    appointment.slot.time,
    duration
  );

  const location =
    appointment.modality === 'presencial'
      ? `Consultório Dr. Luiz Tannuri - ${CLIENT_INFO.cityRegion}`
      : `Telemedicina Online HD (Link fornecido após confirmação)`;

  const description = [
    `Consulta: ${appointment.service.name}`,
    `Modalidade: ${appointment.modality === 'presencial' ? `Presencial (${CLIENT_INFO.cityRegion})` : 'Telemedicina Online HD'}`,
    `Paciente: ${appointment.patient.fullName}`,
    `Status: Horário pretendido, ainda não confirmado pela recepção`,
    `Profissional: ${CLIENT_INFO.professionalCoordination}`,
    `Duração prevista da sessão: ${duration} minutos`,
    `Fuso horário: Horário de Brasília (America/Sao_Paulo)`,
    '',
    'Importante:',
    '• Este registro é um lembrete pessoal do horário pretendido solicitado no site.',
    '• A confirmação definitiva da agenda é realizada diretamente pela equipe da clínica.',
    '• Para bioimpedância presencial InBody 120: jejum prévio de 2 a 3 horas.'
  ].join('\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr. Luiz Tannuri//Solicitação de Horário Online//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:drtannuri-solicitacao-${Date.now()}@drtannuri.com.br`,
    `DTSTAMP:${formatDateToICS(new Date())}`,
    `DTSTART:${formatDateToICS(startDate)}`,
    `DTEND:${formatDateToICS(endDate)}`,
    `SUMMARY:Dr. Luiz Tannuri - Horário Pretendido (${appointment.service.name})`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:TENTATIVE',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete: Horário pretendido para atendimento com Dr. Luiz Tannuri amanhã',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `horario-pretendido-dr-tannuri-${Date.now()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates a direct Google Calendar Web intent URL
 * Strictly describes intended tentative slot, not confirmed
 */
export function getGoogleCalendarUrl(appointment: BookingAppointment): string {
  const duration = getAppointmentDurationMinutes(appointment.service.id);
  const { startDate, endDate } = calculateStartEndDates(
    appointment.date,
    appointment.slot.time,
    duration
  );

  const formatGCal = (d: Date) => {
    try {
      const valid = isNaN(d.getTime()) ? new Date() : d;
      return valid.toISOString().replace(/-|:|\.\d+/g, '');
    } catch {
      return new Date().toISOString().replace(/-|:|\.\d+/g, '');
    }
  };

  const title = encodeURIComponent(`Dr. Luiz Tannuri - Horário Pretendido (${appointment.service.name})`);
  const details = encodeURIComponent(
    `Solicitação de preferência de horário com ${CLIENT_INFO.professionalCoordination}.\nStatus: Horário pretendido, ainda não confirmado pela recepção.\nDuração prevista: ${duration} minutos.\nModalidade: ${
      appointment.modality === 'presencial' ? `Presencial em ${CLIENT_INFO.cityRegion}` : 'Telemedicina Online HD'
    }\nFuso: America/Sao_Paulo (Horário de Brasília).`
  );
  const location = encodeURIComponent(
    appointment.modality === 'presencial'
      ? `Consultório Dr. Luiz Tannuri, ${CLIENT_INFO.cityRegion}`
      : 'Telemedicina Online HD'
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGCal(
    startDate
  )}/${formatGCal(endDate)}&details=${details}&location=${location}`;
}
