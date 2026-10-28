import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, AlertCircle, ArrowLeft, ArrowRight, Sun, Sunset, Moon } from 'lucide-react';
import { TimeSlot, BookingServiceItem, BookingModality } from '../../../types/booking';
import { generateTimeSlotsForDate } from '../../../data/bookingServices';

interface BookingStepDateTimeProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  service: BookingServiceItem;
  modality: BookingModality;
  onNext: () => void;
  onBack: () => void;
}

export const BookingStepDateTime: React.FC<BookingStepDateTimeProps> = ({
  selectedDate,
  onSelectDate,
  selectedSlot,
  onSelectSlot,
  service,
  modality,
  onNext,
  onBack
}) => {
  // Current month view state
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date(selectedDate);
    d.setDate(1);
    return d;
  });

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Calculate calendar grid days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean; isPast: boolean; isSunday: boolean }> = [];

    // Today reference
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Padding before 1st of month
    for (let i = 0; i < firstDayIndex; i++) {
      const prevDate = new Date(year, month, -firstDayIndex + i + 1);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isPast: prevDate < today,
        isSunday: prevDate.getDay() === 0
      });
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      days.push({
        date,
        isCurrentMonth: true,
        isPast: date < today,
        isSunday: date.getDay() === 0
      });
    }

    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  // Generate slots for currently selected date
  const availableSlots = useMemo(() => {
    return generateTimeSlotsForDate(selectedDate);
  }, [selectedDate]);

  // Group slots by period
  const morningSlots = availableSlots.filter((s) => s.period === 'manha');
  const afternoonSlots = availableSlots.filter((s) => s.period === 'tarde');
  const eveningSlots = availableSlots.filter((s) => s.period === 'noite');

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Context Pill */}
      <div className="p-3.5 rounded-2xl bg-[#F7FAF4] border border-[#CCD8C4] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1B4D24]" />
          <span className="text-[#384C3E] font-medium">Serviço:</span>
          <strong className="text-[#0A160F]">{service.name}</strong>
        </div>
        <span className="font-mono-data font-bold text-[#1B4D24] bg-white px-2.5 py-1 rounded-lg border border-[#CCD8C4]">
          {service.price}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Calendar (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#CCD8C4] shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-bold text-sm sm:text-base text-[#0A160F] capitalize">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Mês anterior"
                className="w-8 h-8 rounded-lg border border-[#CCD8C4] hover:bg-[#F2F8ED] flex items-center justify-center text-[#2C4032] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
                className="w-8 h-8 rounded-lg border border-[#CCD8C4] hover:bg-[#F2F8ED] flex items-center justify-center text-[#2C4032] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono-data font-bold text-[#566D5D] mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              const isSelected = isSameDay(item.date, selectedDate);
              const isDisabled = item.isPast || item.isSunday || !item.isCurrentMonth;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onSelectDate(item.date)}
                  className={`h-10 sm:h-11 rounded-xl text-xs font-mono-data font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4D24] text-white shadow-xs font-bold'
                      : isDisabled
                      ? 'text-[#B8C7B5] opacity-40 cursor-not-allowed bg-transparent'
                      : 'text-[#0A160F] hover:bg-[#EAF4E6] hover:text-[#1B4D24] bg-[#FAFDF8]'
                  }`}
                >
                  <span>{item.date.getDate()}</span>
                  {!isDisabled && (
                    <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-[#AEE938]' : 'bg-[#72B818]'}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#CCD8C4] flex items-center justify-between text-[11px] text-[#566D5D]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#72B818]" />
              <span>Dias com expediente para preferência</span>
            </span>
            <span>Domingos fechado</span>
          </div>
        </div>

        {/* Right: Time Slots Matrix (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#CCD8C4]">
              <span className="text-xs font-mono-data uppercase font-bold text-[#1B4D24]">
                Janelas para {selectedDate.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
              </span>
              <span className="text-[10px] font-mono-data text-[#566D5D] bg-[#F2F7ED] px-2 py-0.5 rounded border border-[#CCD8C4]">
                Brasília (America/Sao_Paulo)
              </span>
            </div>

            {/* Morning Shift */}
            {morningSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-data font-bold text-[#384C3E] uppercase mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#EB651A]" />
                  <span>Manhã (Jejum Metabólico)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onSelectSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-mono-data transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot?.id === slot.id
                          ? 'bg-[#1B4D24] text-white border-[#1B4D24] font-bold shadow-xs'
                          : slot.available
                          ? 'bg-white border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:bg-[#F4F9F1]'
                          : 'bg-[#F2F5F0] border-transparent text-[#9DAFA1] line-through cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {selectedSlot?.id === slot.id && <Check className="w-3.5 h-3.5 text-[#AEE938]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Afternoon Shift */}
            {afternoonSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-data font-bold text-[#384C3E] uppercase mb-1.5">
                  <Sunset className="w-3.5 h-3.5 text-[#1B4D24]" />
                  <span>Tarde (Clínico & Rotina)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onSelectSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-mono-data transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot?.id === slot.id
                          ? 'bg-[#1B4D24] text-white border-[#1B4D24] font-bold shadow-xs'
                          : slot.available
                          ? 'bg-white border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:bg-[#F4F9F1]'
                          : 'bg-[#F2F5F0] border-transparent text-[#9DAFA1] line-through cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {selectedSlot?.id === slot.id && <Check className="w-3.5 h-3.5 text-[#AEE938]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Evening Shift */}
            {eveningSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-data font-bold text-[#384C3E] uppercase mb-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#2C4032]" />
                  <span>Executivo (Pós-Expediente)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onSelectSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-mono-data transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot?.id === slot.id
                          ? 'bg-[#1B4D24] text-white border-[#1B4D24] font-bold shadow-xs'
                          : slot.available
                          ? 'bg-white border-[#CCD8C4] text-[#0A160F] hover:border-[#1B4D24] hover:bg-[#F4F9F1]'
                          : 'bg-[#F2F5F0] border-transparent text-[#9DAFA1] line-through cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {selectedSlot?.id === slot.id && <Check className="w-3.5 h-3.5 text-[#AEE938]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 2 Actions Footer */}
      <div className="pt-4 border-t border-[#CCD8C4] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-4 py-2.5 rounded-xl border border-[#CCD8C4] hover:border-[#1B4D24] text-xs font-bold text-[#2C4032] flex items-center gap-1.5 cursor-pointer transition-colors bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Serviço</span>
        </button>

        <button
          type="button"
          id="booking-step2-next-btn"
          disabled={!selectedSlot}
          onClick={onNext}
          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1B4D24] hover:bg-[#245D2E] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <span>Avançar para Triagem</span>
          <ArrowRight className="w-4 h-4 text-[#AEE938]" />
        </button>
      </div>
    </div>
  );
};
