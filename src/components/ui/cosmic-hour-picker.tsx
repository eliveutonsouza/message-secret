"use client";

import { useState, useEffect } from "react";
import { CosmicCard, CardContent } from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { cn } from "@/lib/utils";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

interface HourPickerProps {
  value?: string;
  onChange?: (time: string) => void;
  format?: "12h" | "24h";
  className?: string;
  disabled?: boolean;
}

export function CosmicHourPicker({
  value = "12:00",
  onChange,
  format = "24h",
  className,
  disabled = false,
}: HourPickerProps) {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [time, periodPart] = value.split(" ");
      const [hour, minute] = time.split(":").map(Number);

      setSelectedHour(hour);
      setSelectedMinute(minute);

      if (format === "12h" && periodPart) {
        setPeriod(periodPart as "AM" | "PM");
      }
    }
  }, [value, format]);

  const formatTime = (hour: number, minute: number, period?: "AM" | "PM") => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    if (format === "12h" && period) {
      return `${formattedHour}:${formattedMinute} ${period}`;
    }

    return `${formattedHour}:${formattedMinute}`;
  };

  const handleTimeChange = (
    newHour: number,
    newMinute: number,
    newPeriod?: "AM" | "PM"
  ) => {
    const timeString = formatTime(newHour, newMinute, newPeriod || period);
    onChange?.(timeString);
  };

  const incrementHour = () => {
    const maxHour = format === "12h" ? 12 : 23;
    const minHour = format === "12h" ? 1 : 0;
    const newHour = selectedHour >= maxHour ? minHour : selectedHour + 1;
    setSelectedHour(newHour);
    handleTimeChange(newHour, selectedMinute, period);
  };

  const decrementHour = () => {
    const maxHour = format === "12h" ? 12 : 23;
    const minHour = format === "12h" ? 1 : 0;
    const newHour = selectedHour <= minHour ? maxHour : selectedHour - 1;
    setSelectedHour(newHour);
    handleTimeChange(newHour, selectedMinute, period);
  };

  const incrementMinute = () => {
    const newMinute = selectedMinute >= 55 ? 0 : selectedMinute + 5;
    setSelectedMinute(newMinute);
    handleTimeChange(selectedHour, newMinute, period);
  };

  const decrementMinute = () => {
    const newMinute = selectedMinute <= 0 ? 55 : selectedMinute - 5;
    setSelectedMinute(newMinute);
    handleTimeChange(selectedHour, newMinute, period);
  };

  const currentTime = formatTime(selectedHour, selectedMinute, period);

  return (
    <div className={cn("relative", className)}>
      {/* Display Button */}
      <CosmicButton
        variant="cosmic-outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full justify-start text-left font-mono"
      >
        <Clock className="h-4 w-4 mr-2" />
        {currentTime}
      </CosmicButton>

      {/* Picker Dropdown */}
      {isOpen && (
        <CosmicCard className="absolute top-full left-0 right-0 z-50 mt-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-4">
              {/* Hour Picker */}
              <div className="flex flex-col items-center space-y-2">
                <CosmicButton
                  variant="cosmic-ghost"
                  onClick={incrementHour}
                  disabled={disabled}
                >
                  <ChevronUp className="h-4 w-4" />
                </CosmicButton>

                <CosmicBadge
                  variant="cosmic"
                  className="text-lg font-mono min-w-[3rem] text-center"
                >
                  {selectedHour.toString().padStart(2, "0")}
                </CosmicBadge>

                <CosmicButton
                  variant="cosmic-ghost"
                  onClick={decrementHour}
                  disabled={disabled}
                >
                  <ChevronDown className="h-4 w-4" />
                </CosmicButton>
              </div>

              {/* Separator */}
              <div className="text-2xl font-bold text-purple-300">:</div>

              {/* Minute Picker */}
              <div className="flex flex-col items-center space-y-2">
                <CosmicButton
                  variant="cosmic-ghost"
                  onClick={incrementMinute}
                  disabled={disabled}
                >
                  <ChevronUp className="h-4 w-4" />
                </CosmicButton>

                <CosmicBadge
                  variant="cosmic"
                  className="text-lg font-mono min-w-[3rem] text-center"
                >
                  {selectedMinute.toString().padStart(2, "0")}
                </CosmicBadge>

                <CosmicButton
                  variant="cosmic-ghost"
                  onClick={decrementMinute}
                  disabled={disabled}
                >
                  <ChevronDown className="h-4 w-4" />
                </CosmicButton>
              </div>

              {/* AM/PM Toggle for 12h format */}
              {format === "12h" && (
                <>
                  <div className="w-px h-12 bg-purple-300/30" />
                  <div className="flex flex-col items-center space-y-1">
                    <CosmicButton
                      variant={period === "AM" ? "cosmic" : "cosmic-ghost"}
                      onClick={() => {
                        setPeriod("AM");
                        handleTimeChange(selectedHour, selectedMinute, "AM");
                      }}
                      disabled={disabled}
                      className="min-w-[3rem]"
                    >
                      AM
                    </CosmicButton>
                    <CosmicButton
                      variant={period === "PM" ? "cosmic" : "cosmic-ghost"}
                      onClick={() => {
                        setPeriod("PM");
                        handleTimeChange(selectedHour, selectedMinute, "PM");
                      }}
                      disabled={disabled}
                      className="min-w-[3rem]"
                    >
                      PM
                    </CosmicButton>
                  </div>
                </>
              )}
            </div>

            {/* Quick Time Buttons */}
            <div className="mt-4 pt-4 border-t border-purple-300/20">
              <div className="text-xs text-purple-300 mb-2 text-center">
                Horários Rápidos
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "Manhã",
                    time: format === "12h" ? "09:00 AM" : "09:00",
                  },
                  {
                    label: "Tarde",
                    time: format === "12h" ? "02:00 PM" : "14:00",
                  },
                  {
                    label: "Noite",
                    time: format === "12h" ? "08:00 PM" : "20:00",
                  },
                ].map((preset) => (
                  <CosmicButton
                    key={preset.label}
                    variant="cosmic-ghost"
                    onClick={() => {
                      const [time, periodPart] = preset.time.split(" ");
                      const [hour, minute] = time.split(":").map(Number);
                      setSelectedHour(hour);
                      setSelectedMinute(minute);
                      if (periodPart) setPeriod(periodPart as "AM" | "PM");
                      onChange?.(preset.time);
                    }}
                    disabled={disabled}
                    className="text-xs"
                  >
                    {preset.label}
                  </CosmicButton>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-4 pt-4 border-t border-purple-300/20">
              <CosmicButton
                variant="cosmic-outline"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Confirmar
              </CosmicButton>
            </div>
          </CardContent>
        </CosmicCard>
      )}
    </div>
  );
}
