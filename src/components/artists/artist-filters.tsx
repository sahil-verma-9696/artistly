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

export function ArtistFilters() {
  const {
    selectedCategories,
    selectedLocation,
    selectedPriceRange,
    handleCategoryChange,
    handleLocationChange,
    handlePriceRangeChange,
    clearFilters,
  } = useArtistFilterState();

  return (
    <div className="space-y-6">
      <Card>
        {/* Card Header */}
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <FilterSection
            title="Category"
            values={CATEGORIES}
            selectedValues={selectedCategories}
            onValueChange={handleCategoryChange}
            onClear={clearFilters}
            filterKey="category"
          />

          {/* Location */}
          <FilterSelect
            title="Location"
            options={LOCATIONS}
            selectedValue={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Select location"
            allLabel="All Locations"
          />

          {/* Price Range */}
          <RangeFilter
            label="Price Range"
            defaultValue={selectedPriceRange}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1000}
            unit="₹"
            onChange={handlePriceRangeChange}
          />

          {/* Clear Filters */}
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
  );
}
