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
import { CalendarIcon, X } from "lucide-react";

interface ExpirationPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function ExpirationPicker({
  value,
  onChange,
}: ExpirationPickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [time, setTime] = useState<string | null>(
    value ? format(new Date(value), "HH:mm") : null
  );

  // Gerar horários disponíveis (24 horas)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const timeString = `${hour.toString().padStart(2, "0")}:${minute}`;

    return {
      time: timeString,
      available: true,
    };
  });

  const handleDateSelect = useCallback(
    (newDate: Date | undefined) => {
      if (newDate) {
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
    [time, onChange]
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
    return "Selecionar data de expiração";
  }, [date, time]);

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`w-full flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
              date && time
                ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600 text-purple-200"
                : "bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 border-purple-700 text-purple-300 hover:bg-purple-800/50"
            }`}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
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
                ]}
                classNames={{
                  day_selected:
                    "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
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
                                ? "bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
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
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/40">
          <div className="text-purple-200 text-sm">
            <span className="font-medium">Link expira em:</span>{" "}
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
            Clique no botão acima para definir quando o link expirará
          </p>
        </div>
      )}
    </div>
  );
}
