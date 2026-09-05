"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  isAfter,
  differenceInDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (range: { startDate?: Date; endDate?: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
  minNights?: number;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate = new Date(), // default to today
  maxDate,
  minNights = 1,
  label,
  error,
  fullWidth = true,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(startDate || new Date());
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  
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

  const isDateDisabled = (date: Date) => {
    const normalizedDate = startOfDay(date);
    if (minDate && isBefore(normalizedDate, startOfDay(minDate))) return true;
    if (maxDate && isAfter(normalizedDate, startOfDay(maxDate))) return true;
    
    // If start date is selected, disable dates that don't meet minNights
    if (startDate && !endDate) {
      if (isBefore(normalizedDate, startDate)) return true;
      if (isSameDay(normalizedDate, startDate)) return false; // allow clicking start date again to reset
      const nights = differenceInDays(normalizedDate, startDate);
      if (nights < minNights) return true;
    }
    
    return false;
  };

  const handleSelectDate = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!startDate || (startDate && endDate) || isBefore(date, startDate)) {
      onChange({ startDate: date, endDate: undefined });
    } else if (isSameDay(date, startDate)) {
       // Reset
       onChange({ startDate: undefined, endDate: undefined });
    } else {
      onChange({ startDate, endDate: date });
      setIsOpen(false);
    }
  };

  const renderMonth = (month: Date, index: number) => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    });

    const startDay = startOfMonth(month).getDay();
    const emptyDays = Array.from({ length: startDay }, (_, i) => i);

    return (
      <div key={`month-${index}`} className="flex-1 w-[280px]">
        <div className="flex items-center justify-between mb-4 px-2">
          {index === 0 ? (
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-md">
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          ) : (
            <div className="w-7" />
          )}
          <div className="font-semibold text-[#1B4D3E]">
            {format(month, "MMMM yyyy")}
          </div>
          {index === 1 || (window.innerWidth < 768 && index === 0) ? (
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-md">
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          ) : (
            <div className="w-7" />
          )}
        </div>
        
        <div className="grid grid-cols-7 gap-y-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-y-1">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="h-10 w-full" />
          ))}
          
          {daysInMonth.map((date, i) => {
            const disabled = isDateDisabled(date);
            const isStart = startDate && isSameDay(date, startDate);
            const isEnd = endDate && isSameDay(date, endDate);
            
            const isHovered = hoverDate && startDate && !endDate && isAfter(date, startDate) && !isAfter(date, hoverDate);
            const isBetween = startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate);
            
            const inRange = isBetween || isHovered;

            return (
              <div 
                key={i} 
                className={cn(
                  "relative h-10 w-full",
                  inRange && !isStart && !isEnd && "bg-[#F8F5F0]",
                  isStart && (endDate || hoverDate) && "bg-[#F8F5F0] rounded-l-md",
                  isEnd && startDate && "bg-[#F8F5F0] rounded-r-md",
                  isHovered && "bg-[#F8F5F0]"
                )}
                onMouseEnter={() => {
                  if (startDate && !endDate && !disabled) setHoverDate(date);
                }}
                onMouseLeave={() => {
                  setHoverDate(null);
                }}
              >
                <button
                  disabled={disabled}
                  onClick={() => handleSelectDate(date)}
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 h-10 w-10 rounded-md text-sm transition-colors flex items-center justify-center",
                    (isStart || isEnd)
                      ? "bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90 font-semibold shadow-sm z-10"
                      : disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : inRange 
                      ? "text-[#1B4D3E] bg-transparent hover:bg-[#C9A96E]/20"
                      : "text-gray-700 hover:bg-[#F8F5F0] hover:text-[#1B4D3E]",
                    isToday(date) && !isStart && !isEnd && !disabled && !inRange && "bg-gray-100 font-semibold"
                  )}
                >
                  {format(date, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  return (
    <div className={cn("relative flex flex-col gap-1.5", fullWidth && "w-full")} ref={containerRef}>
      {label && (
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-[#1B4D3E]">{label}</label>
          {nights > 0 && <span className="text-xs text-gray-500 font-medium">{nights} Night{nights > 1 ? 's' : ''}</span>}
        </div>
      )}
      
      <div
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-sm cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#C9A96E]",
          error ? "border-red-500" : "border-gray-300"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center divide-x divide-gray-200 w-full">
          <div className="flex items-center gap-2 flex-1 pr-4">
            <CalendarIcon className="h-4 w-4 text-[#C9A96E]" />
            <span className={cn("font-medium", !startDate && "text-gray-400 font-normal")}>
              {startDate ? format(startDate, "MMM d, yyyy") : "Check-in"}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1 pl-4">
            <span className={cn("font-medium", !endDate && "text-gray-400 font-normal")}>
              {endDate ? format(endDate, "MMM d, yyyy") : "Check-out"}
            </span>
          </div>
        </div>
        {(startDate || endDate) && (
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 ml-2"
            onClick={(e) => {
              e.stopPropagation();
              onChange({ startDate: undefined, endDate: undefined });
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] z-50 rounded-xl border border-gray-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
          <div className="flex flex-col md:flex-row gap-8">
            {renderMonth(currentMonth, 0)}
            <div className="hidden md:block">
              {renderMonth(addMonths(currentMonth, 1), 1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
