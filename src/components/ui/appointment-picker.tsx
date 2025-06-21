"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppointmentPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function AppointmentPicker({
  value,
  onChange,
}: AppointmentPickerProps) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14); // 15 dias contando hoje
  const initialDate = value ? new Date(value) : today;
  const initialTime = value ? value.split("T")[1]?.slice(0, 5) : null;

  const [date, setDate] = useState<Date>(initialDate);
  const [time, setTime] = useState<string | null>(initialTime || null);

  useEffect(() => {
    if (date && time && onChange) {
      const iso = `${date.toISOString().split("T")[0]}T${time}`;
      onChange(iso);
    }
  }, [date, time, onChange]);

  const timeSlots = [
    { time: "09:00", available: false },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: false },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: false },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
  ];

  return (
    <div className="rounded-lg border border-purple-800/40 bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md p-2">
      <div className="flex max-sm:flex-col gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate && newDate >= today && newDate <= maxDate) {
              setDate(newDate);
              setTime(null);
            }
          }}
          className="p-2 sm:pe-5"
          disabled={[{ before: today }, { after: maxDate }]}
        />
        <div className="relative w-full max-sm:h-48">
          <div className="absolute inset-0 py-4 max-sm:border-t">
            <ScrollArea className="h-full sm:border-s">
              <div className="space-y-3">
                <div className="flex h-5 shrink-0 items-center px-5">
                  <p className="text-sm font-medium text-purple-100">
                    {format(date, "EEEE, d", { locale: undefined })}
                  </p>
                </div>
                <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                  {timeSlots.map(({ time: timeSlot, available }) => (
                    <Button
                      key={timeSlot}
                      variant={time === timeSlot ? "default" : "outline"}
                      size="sm"
                      className={`w-full text-sm shadow-md border-none ${
                        time === timeSlot
                          ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 text-white"
                          : "bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 text-purple-200 hover:text-white"
                      }`}
                      onClick={() => setTime(timeSlot)}
                      disabled={!available}
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      {date && time && (
        <div className="mt-4 text-center text-fuchsia-300 text-sm">
          Selecionado: {format(date, "dd/MM/yyyy")} às {time}
        </div>
      )}
    </div>
  );
}
