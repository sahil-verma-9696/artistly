"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "singer", label: "Singers" },
  { id: "dancer", label: "Dancers" },
  { id: "speaker", label: "Speakers" },
  { id: "dj", label: "DJs" },
  { id: "comedian", label: "Comedians" },
  { id: "instrumentalist", label: "Instrumentalists" },
];

const locations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
];

const priceRanges = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹100,000",
  "₹100,000+",
];

export function ArtistFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const locationParam = searchParams.get("location");
    const priceParam = searchParams.get("price");

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }
    if (locationParam) {
      setSelectedLocation(locationParam);
    }
    if (priceParam) {
      setSelectedPriceRange(priceParam);
    }
  }, [searchParams]);

  const updateURL = (categories: string[], location: string, price: string) => {
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.set("category", categories.join(","));
    }
    if (location !== "all") {
      params.set("location", location);
    }
    if (price !== "all") {
      params.set("price", price);
    }

    const queryString = params.toString();
    router.push(`/artists${queryString ? `?${queryString}` : ""}`);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(newCategories);
    updateURL(newCategories, selectedLocation, selectedPriceRange);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    updateURL(selectedCategories, location, selectedPriceRange);
  };

  const handlePriceRangeChange = (price: string) => {
    setSelectedPriceRange(price);
    updateURL(selectedCategories, selectedLocation, price);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation("all");
    setSelectedPriceRange("all");
    router.push("/artists");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Location</h3>
            <Select
              value={selectedLocation}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem
                    key={location}
                    value={location.toLowerCase().replace(/, /g, "-")}
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
            <Select
              value={selectedPriceRange}
              onValueChange={handlePriceRangeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem
                    key={range}
                    value={range.toLowerCase().replace(/, /g, "-")}
                  >
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
