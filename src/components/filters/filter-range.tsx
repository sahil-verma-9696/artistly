import { useState, useEffect } from "react";
import { RangeSlider } from "@/components/ui/range-slider";

type RangeFilterProps = {
  label?: string;
  defaultValue: [number, number];
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (range: [number, number]) => void;
};

export function RangeFilter({
  label,
  defaultValue,
  min,
  max,
  step = 1000,
  unit = "",
  onChange,
}: RangeFilterProps) {
  const [range, setRange] = useState<[number, number]>(defaultValue);

  useEffect(() => {
    onChange(range);
  }, [range,onChange]);

  return (
    <RangeSlider
      label={label}
      value={range}
      onChange={setRange}
      min={min}
      max={max}
      step={step}
      unit={unit}
    />
  );
}
