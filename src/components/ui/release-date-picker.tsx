"use client";

import { useState, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CosmicCard } from "@/components/ui/cosmic-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, Clock } from "lucide-react";

interface ReleaseDatePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function ReleaseDatePicker({
  value,
  onChange,
}: ReleaseDatePickerProps) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14); // 15 dias contando hoje

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [time, setTime] = useState<string | null>(
    value ? format(new Date(value), "HH:mm") : null
  );

  // Horários disponíveis para liberação (mais limitados que expiração)
  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
    { time: "18:00", available: true },
    { time: "18:30", available: true },
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: true },
    { time: "20:30", available: true },
  ];

  const handleDateSelect = useCallback(
    (newDate: Date | undefined) => {
      if (newDate && newDate >= today && newDate <= maxDate) {
        setDate(newDate);
        // Se já tem um horário selecionado, combina com a nova data
        if (time) {
          const [hours, minutes] = time.split(":");
          const combinedDate = new Date(newDate);
          combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          onChange(combinedDate.toISOString());
        }
      }
    },
    [time, onChange, today, maxDate]
  );

  const handleTimeSelect = useCallback(
    (selectedTime: string) => {
      setTime(selectedTime);
      if (date) {
        const [hours, minutes] = selectedTime.split(":");
        const combinedDate = new Date(date);
        combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        onChange(combinedDate.toISOString());
      }
    },
    [date, onChange]
  );

  const clearSelection = useCallback(() => {
    setDate(undefined);
    setTime(null);
    onChange("");
    setOpen(false);
  }, [onChange]);

  const getDisplayText = useCallback(() => {
    if (date && time) {
      return format(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          parseInt(time.split(":")[0]),
          parseInt(time.split(":")[1])
        ),
        "dd/MM/yyyy 'às' HH:mm",
        { locale: ptBR }
      );
    }
    return "Selecionar data de liberação";
  }, [date, time]);

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`w-full flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
              date && time
                ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-600 text-green-200"
                : "bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 border-purple-700 text-purple-300 hover:bg-purple-800/50"
            }`}
          >
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span className="text-sm">{getDisplayText()}</span>
            </div>
            {date && time && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="h-6 w-6 p-0 text-red-400 hover:bg-red-900/20"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CosmicCard className="rounded-md border border-purple-800/40 bg-gradient-to-r from-purple-950/90 via-purple-900/90 to-blue-950/90 backdrop-blur-sm">
            <div className="flex max-sm:flex-col">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="p-2 sm:pe-5"
                disabled={[
                  { before: today }, // Datas antes de hoje
                  { after: maxDate }, // Máximo 15 dias
                ]}
                classNames={{
                  day_selected: "bg-green-500 text-white hover:bg-green-600",
                  day_today: "bg-purple-500 text-white",
                  day: "hover:bg-purple-800/50",
                  head_cell: "text-purple-300",
                  nav_button: "hover:bg-purple-800/50",
                  caption: "text-purple-200",
                }}
              />
              <div className="relative w-full max-sm:h-48 sm:w-40">
                <div className="absolute inset-0 py-4 max-sm:border-t sm:border-l border-purple-800/40">
                  <ScrollArea className="h-full">
                    <div className="space-y-3">
                      <div className="flex h-5 shrink-0 items-center px-5">
                        <p className="text-sm font-medium text-purple-200">
                          {date
                            ? format(date, "EEEE, d 'de' MMMM", {
                                locale: ptBR,
                              })
                            : "Selecione uma data"}
                        </p>
                      </div>
                      <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                        {timeSlots.map(({ time: timeSlot, available }) => (
                          <Button
                            key={timeSlot}
                            variant={time === timeSlot ? "default" : "outline"}
                            size="sm"
                            className={`w-full ${
                              time === timeSlot
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-purple-900/50 border-purple-700 text-purple-200 hover:bg-purple-800/50"
                            }`}
                            onClick={() => handleTimeSelect(timeSlot)}
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
          </CosmicCard>
        </PopoverContent>
      </Popover>

      {date && time && (
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-700/40">
          <div className="text-green-200 text-sm">
            <span className="font-medium">Carta será liberada em:</span>{" "}
            {format(
              new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(time.split(":")[0]),
                parseInt(time.split(":")[1])
              ),
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              { locale: ptBR }
            )}
          </div>
        </div>
      )}

      {!date && !time && (
        <div className="text-center p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-700/30">
          <p className="text-purple-300 text-xs">
            Clique no botão acima para definir quando a carta será liberada
            (máximo 15 dias)
          </p>
        </div>
      )}
    </div>
  );
}
