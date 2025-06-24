import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type FilterSelectProps = {
  title: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allLabel?: string;
};

export default function FilterSelect({
  title,
  options,
  selectedValue,
  onChange,
  placeholder = "Select option",
  allLabel = "All",
}: FilterSelectProps) {
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">{title}</h3>
      <Select value={selectedValue} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option.toLowerCase().replace(/, /g, "-")}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
