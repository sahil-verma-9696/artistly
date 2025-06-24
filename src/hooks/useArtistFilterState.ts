import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MAX_PRICE, MIN_PRICE } from "@/config/filterConfig";

export function useArtistFilterState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([MIN_PRICE, MAX_PRICE]);

  // Extract params from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const locationParam = searchParams.get("location");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    if (categoryParam) setSelectedCategories(categoryParam.split(","));
    if (locationParam) setSelectedLocation(locationParam);
    if (minPriceParam && maxPriceParam) {
      setSelectedPriceRange([Number(minPriceParam), Number(maxPriceParam)]);
    }
  }, [searchParams]);

  // Update URL helper
  const updateURL = (
    categories: string[],
    location: string,
    priceRange: [number, number]
  ) => {
    const [min, max] = priceRange;
    const params = new URLSearchParams();

    if (categories.length > 0) params.set("category", categories.join(","));
    if (location !== "all") params.set("location", location);
    if (!(min === MIN_PRICE && max === MAX_PRICE)) {
      params.set("minPrice", String(min));
      params.set("maxPrice", String(max));
    }
    router.push(`/artists${params.toString() ? `?${params.toString()}` : ""}`);
  };

  // Handlers
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    setSelectedCategories(updated);
    updateURL(updated, selectedLocation, selectedPriceRange);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    updateURL(selectedCategories, location, selectedPriceRange);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setSelectedPriceRange(range);
    updateURL(selectedCategories, selectedLocation, range);
  };

  const clearFilters = (type?: "category" | "location" | "price") => {
    const query = new URLSearchParams(window.location.search);
    switch (type) {
      case "category":
        setSelectedCategories([]);
        query.delete("category");
        break;
      case "location":
        setSelectedLocation("all");
        query.delete("location");
        break;
      case "price":
        setSelectedPriceRange([7000, 80000]);
        query.delete("minPrice");
        query.delete("maxPrice");
        break;
      default:
        setSelectedCategories([]);
        setSelectedLocation("all");
        setSelectedPriceRange([7000, 80000]);
        router.push("/artists");
        return;
    }
    router.push(`/artists?${query.toString()}`);
  };

  return {
    selectedCategories,
    selectedLocation,
    selectedPriceRange,
    handleCategoryChange,
    handleLocationChange,
    handlePriceRangeChange,
    clearFilters,
  };
}
