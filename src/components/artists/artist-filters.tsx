"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterSection from "../filters/filter-section";
import FilterSelect from "../filters/filter-select";
import { useArtistFilters } from "@/hooks/useArtistFilters";
import { categories, locations, priceRanges } from "@/config/filterConfig";
import { RangeFilter } from "../filters/filter-range";

export function ArtistFilters() {
  const {
    selectedCategories,
    selectedLocation,
    selectedPriceRange,
    handleCategoryChange,
    handleLocationChange,
    handlePriceRangeChange,
    clearFilters,
  } = useArtistFilters();

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
            values={categories}
            selectedValues={selectedCategories}
            onValueChange={handleCategoryChange}
            onClear={clearFilters}
            filterKey="category"
          />

          {/* Location */}
          <FilterSelect
            title="Location"
            options={locations}
            selectedValue={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Select location"
            allLabel="All Locations"
          />

          {/* Price Range */}
          <RangeFilter
            label="Price Range"
            defaultValue={selectedPriceRange}
            min={7000}
            max={80000}
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
