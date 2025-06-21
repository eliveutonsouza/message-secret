import * as React from "react";

interface TimePickerProps {
  value?: string; // formato HH:mm
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value = "",
  onChange,
  disabled,
  className,
}: TimePickerProps) {
  // Extrai hora e minuto do valor
  const [hour, setHour] = React.useState<string>(value.split(":")[0] || "00");
  const [minute, setMinute] = React.useState<string>(
    value.split(":")[1] || "00"
  );

  // Atualiza o estado interno apenas se o valor externo mudar de fato
  React.useEffect(() => {
    const [h, m] = value.split(":");
    if (h !== hour) setHour(h || "00");
    if (m !== minute) setMinute(m || "00");
    // eslint-disable-next-line
  }, [value]);

  // Só chama onChange se o valor final for diferente do prop value
  React.useEffect(() => {
    const formatted = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    if (onChange && formatted !== value) {
      onChange(formatted);
    }
    // eslint-disable-next-line
  }, [hour, minute]);

  return (
    <div
      className={`flex items-center gap-2 bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 rounded-md px-2 py-1 shadow-md border border-purple-800/40 ${className || ""}`}
    >
      <select
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        disabled={disabled}
        className="bg-transparent text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60 rounded"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <option key={i} value={i.toString().padStart(2, "0")}>
            {i.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
      <span className="text-fuchsia-300 font-bold">:</span>
      <select
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        disabled={disabled}
        className="bg-transparent text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60 rounded"
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <option key={i} value={i.toString().padStart(2, "0")}>
            {i.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
  );
}
