"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterSection from "../filters/filter-section";
import FilterSelect from "../filters/filter-select";
import { RangeFilter } from "../filters/filter-range";
import {
  CATEGORIES,
  LOCATIONS,
  MAX_PRICE,
  MIN_PRICE,
} from "@/config/filterConfig";
import { useArtistFilterState } from "@/hooks/useArtistFilterState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export function ArtistFilters() {
  const {
    selectedCategories,
    selectedLocation,
    selectedPriceRange,
    appliedFilters,
    handleCategoryChange,
    handleLocationChange,
    handlePriceRangeChange,
    clearFilters,
  } = useArtistFilterState();

  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Filter Button on Mobile */}
      <div className="md:hidden">
        <Sheet open={isMobileFilterOpen} onOpenChange={setMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button className="w-full">Filters</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-11/12 max-w-sm p-4">
            <SheetHeader>
              <SheetTitle className="text-lg">Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-4">
              <FilterSection
                title="Category"
                values={CATEGORIES}
                selectedValues={selectedCategories}
                onValueChange={handleCategoryChange}
                onClear={clearFilters}
                filterKey="category"
              />
              <FilterSelect
                title="Location"
                options={LOCATIONS}
                selectedValue={selectedLocation}
                onChange={handleLocationChange}
                placeholder="Select location"
                allLabel="All Locations"
              />
              <RangeFilter
                label="Price Range"
                defaultValue={selectedPriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1000}
                unit="₹"
                onChange={handlePriceRangeChange}
              />
              <Button
                variant="outline"
                onClick={() => clearFilters()}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filters Panel on Desktop */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FilterSection
              title="Category"
              values={CATEGORIES}
              selectedValues={selectedCategories}
              onValueChange={handleCategoryChange}
              onClear={clearFilters}
              filterKey="category"
            />
            <FilterSelect
              title="Location"
              options={LOCATIONS}
              selectedValue={selectedLocation}
              onChange={handleLocationChange}
              placeholder="Select location"
              allLabel="All Locations"
            />
            <RangeFilter
              label="Price Range"
              defaultValue={selectedPriceRange}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={1000}
              unit="₹"
              onChange={handlePriceRangeChange}
            />
            <Button
              variant="outline"
              onClick={() => clearFilters()}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Applied Filters Badges */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.map((filter, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter?.label}
              <Button variant={"ghost"} onClick={filter?.onRemove}>
                <X
                  size={14}
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    console.log("hello");
                  }}
                />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
