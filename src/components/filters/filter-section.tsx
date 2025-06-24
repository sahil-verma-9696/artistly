"use client";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type FilterSectionProps = {
  title: string;
  values: string[];
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
  onClear?: (key?: "category" | "location" | "price") => void;
  filterKey?: "category" | "location" | "price";
  enableShowMore?: boolean;
  initialVisibleCount?: number;
};

export default function FilterSection({
  title,
  values,
  selectedValues,
  onValueChange,
  onClear,
  filterKey,
  enableShowMore = true,
  initialVisibleCount = 7,
}: FilterSectionProps): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const visibleValues = enableShowMore
    ? showMore
      ? values
      : values.slice(0, initialVisibleCount)
    : values;

  return (
    <div>
      {selectedValues.length > 0 && onClear && filterKey && (
        <Button variant="ghost" onClick={() => onClear(filterKey)}>
          Clear
        </Button>
      )}

      <h3 className="font-medium text-gray-900 mb-3">{title}</h3>

      <div className="space-y-2">
        {visibleValues.map((value) => (
          <FilterItem
            key={value}
            label={value}
            checked={selectedValues.includes(value)}
            onChange={(checked) => onValueChange(value, checked)}
          />
        ))}

        {enableShowMore && values.length > initialVisibleCount && (
          <Button onClick={() => setShowMore(!showMore)} variant="ghost">
            {showMore ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
    </div>
  );
}

type FilterItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function FilterItem({
  label,
  checked,
  onChange,
}: FilterItemProps): JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={(checked) => onChange(checked as boolean)}
      />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
