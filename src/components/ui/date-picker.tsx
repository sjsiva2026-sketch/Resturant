"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  isAfter,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function DatePicker({
  value,
  onChange,
  minDate = new Date(), // default to no past dates
  maxDate,
  disabledDates = [],
  placeholder = "Select date",
  label,
  error,
  fullWidth = true,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(value || new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Calculate empty days at start of month to align correctly (0 = Sunday, 1 = Monday)
  const startDay = startOfMonth(currentMonth).getDay();
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const isDateDisabled = (date: Date) => {
    const normalizedDate = startOfDay(date);
    
    if (minDate && isBefore(normalizedDate, startOfDay(minDate))) return true;
    if (maxDate && isAfter(normalizedDate, startOfDay(maxDate))) return true;
    
    return disabledDates.some((disabledDate) => 
      isSameDay(startOfDay(disabledDate), normalizedDate)
    );
  };

  const handleSelectDate = (date: Date) => {
    if (isDateDisabled(date)) return;
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative flex flex-col gap-1.5", fullWidth && "w-full")} ref={containerRef}>
      {label && <label className="text-sm font-medium text-[#1B4D3E]">{label}</label>}
      <div
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#C9A96E]",
          error ? "border-red-500" : "border-gray-300",
          !value && "text-gray-400"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[#1B4D3E]" />
          <span>{value ? format(value, "PPP") : placeholder}</span>
        </div>
        {value && (
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] z-50 w-[300px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <div className="font-semibold text-[#1B4D3E]">
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}
            
            {daysInMonth.map((date, i) => {
              const disabled = isDateDisabled(date);
              const selected = value && isSameDay(date, value);
              
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => handleSelectDate(date)}
                  className={cn(
                    "h-8 w-8 rounded-md text-sm transition-colors flex items-center justify-center",
                    selected
                      ? "bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90 font-semibold shadow-sm"
                      : disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-[#F8F5F0] hover:text-[#1B4D3E]",
                    isToday(date) && !selected && !disabled && "bg-gray-100 font-semibold"
                  )}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
