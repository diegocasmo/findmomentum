import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MS_PER_MIN, MS_PER_SECOND } from "@/lib/utils/time";
import {
  MAX_MIN,
  MAX_SEC,
} from "@/app/dashboard/schemas/create-activity-schema";

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MIN);
  const seconds = Math.floor((ms % MS_PER_MIN) / MS_PER_SECOND);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function formatInput(input: string): string {
  const [minutes, seconds] = input.split(":");
  const formattedMinutes = minutes ? minutes.padStart(2, "0") : "00";
  const formattedSeconds = seconds ? seconds.padStart(2, "0") : "00";
  return `${formattedMinutes}:${formattedSeconds}`;
}

type DurationInputProps = {
  id: string;
  value: number;
  onChange: (value: number) => void;
};

export function DurationInput({ id, value, onChange }: DurationInputProps) {
  const [inputValue, setInputValue] = useState(formatDuration(value));

  useEffect(() => {
    setInputValue(formatDuration(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^\d:]/g, "");

    if (newValue.length > 5) return;

    if (newValue.length === 2 && !newValue.includes(":")) {
      newValue += ":";
    }

    const [minutes, seconds] = newValue.split(":").map(Number);

    if (minutes > MAX_MIN || (seconds !== undefined && seconds > MAX_SEC))
      return;

    setInputValue(newValue);

    if (newValue.length === 5) {
      const totalMs = minutes * MS_PER_MIN + (seconds || 0) * MS_PER_SECOND;
      onChange(totalMs);
    }
  };

  const handleBlur = () => {
    setInputValue(formatInput(inputValue));
  };

  return (
    <Input
      id={id}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="MM:ss"
      className="w-24 text-center"
      maxLength={5}
    />
  );
}
