'use client'

import { useEffect, useRef, useState } from "react";
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  startOfToday,
} from "date-fns";
import clsx from "clsx";

const DAYS_VISIBLE = 5;

export default function HorizontalDatePicker() {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [startIndex, setStartIndex] = useState(0);

  // Genera todas las fechas del mes actual
  const dates = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Subset visible
  const visibleDates = dates.slice(startIndex, startIndex + DAYS_VISIBLE);

  const goToPrevMonth = () => {
    const newMonth = addMonths(currentMonth, -1);
    setCurrentMonth(newMonth);
    setStartIndex(0);
  };

  const goToNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setStartIndex(0);
  };

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(prev - DAYS_VISIBLE, 0));
  };

  const scrollRight = () => {
    setStartIndex((prev) =>
      Math.min(prev + DAYS_VISIBLE, dates.length - DAYS_VISIBLE)
    );
  };

  // Selecciona hoy automáticamente si está en el mes visible
  useEffect(() => {
    if (isSameMonth(today, currentMonth)) {
      const index = dates.findIndex((d) => isSameDay(d, today));
      const centeredIndex = Math.max(0, index - Math.floor(DAYS_VISIBLE / 2));
      setStartIndex(centeredIndex);
      setSelectedDate(today);
    } else {
      setStartIndex(0);
      setSelectedDate(dates[0]);
    }
  }, [currentMonth]);

  return (
    <div className="flex flex-col gap-2 bg-black px-4 py-2 w-full mx-auto">
      {/* Header con mes actual y navegación */}
      <div className="flex justify-between items-center text-white mb-2 w-full">
        <button onClick={goToPrevMonth}>←</button>
        <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={goToNextMonth}>→</button>
      </div>

      {/* Carrusel con navegación */}
      <div className="flex justify-between items-center gap-2 w-full">
        <button
          onClick={scrollLeft}
          disabled={startIndex === 0}
          className="text-white px-2 disabled:opacity-30"
        >
          ←
        </button>

        <div className="flex gap-4 justify-center items-center overflow-hidden flex-1">
          {visibleDates.map((date) => {
            const isActive = isSameDay(date, selectedDate);
            const key = format(date, "yyyy-MM-dd");

            return (
              <div
                key={key}
                onClick={() => setSelectedDate(date)}
                className={clsx(
                  "flex flex-col items-center cursor-pointer px-3 py-1 rounded-md transition gap-1 min-w-[60px] w-[20%]",
                  isActive ? "text-[#4AFF50]" : "text-white"
                )}
              >
                <span className="text-xs font-semibold uppercase">
                  {format(date, "EEE")}
                </span>
                <span className="text-sm font-medium">
                  {format(date, "dd/MM")}
                </span>
                <div 
                    className={clsx(
                        "mt-1 w-full h-[2px]",
                        isActive ? "bg-[#4AFF50]" : "bg-transparent"
                    )} 
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          disabled={startIndex + DAYS_VISIBLE >= dates.length}
          className="text-white px-2 disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
