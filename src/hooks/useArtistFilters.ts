import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useArtistFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const locationParam = searchParams.get("location");
    const priceParam = searchParams.get("price");

    if (categoryParam) setSelectedCategories(categoryParam.split(","));
    if (locationParam) setSelectedLocation(locationParam);
    if (priceParam) setSelectedPriceRange(priceParam);
  }, [searchParams]);

  const updateURL = (categories: string[], location: string, price: string) => {
    const params = new URLSearchParams();

    if (categories.length > 0) params.set("category", categories.join(","));
    if (location !== "all") params.set("location", location);
    if (price !== "all") params.set("price", price);

    router.push(`/artists${params.toString() ? `?${params.toString()}` : ""}`);
  };

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

  const handlePriceRangeChange = (price: string) => {
    setSelectedPriceRange(price);
    updateURL(selectedCategories, selectedLocation, price);
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
        setSelectedPriceRange("all");
        query.delete("price");
        break;
      default:
        setSelectedCategories([]);
        setSelectedLocation("all");
        setSelectedPriceRange("all");
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
