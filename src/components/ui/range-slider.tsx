// components/ui/RangeSlider.tsx
import { Slider } from "@/components/ui/slider";

type RangeSliderProps = {
  label?: string;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export function RangeSlider({
  label = "Select Range",
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
}: RangeSliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(val) => onChange([val[0], val[1]])}
        className="w-full"
      />
      <div className="text-sm text-muted-foreground">
        {unit}
        {value[0].toLocaleString()} – {unit}
        {value[1].toLocaleString()}
      </div>
    </div>
  );
}
