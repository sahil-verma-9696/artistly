import { useCallback, useEffect, useState } from "react";
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

  // ✅ Load initial values from URL once
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

  // ✅ Update URL only after state changes — this prevents render-time router updates
  useEffect(() => {
    const [min, max] = selectedPriceRange;
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }

    if (selectedLocation !== "all") {
      params.set("location", selectedLocation);
    }

    if (!(min === MIN_PRICE && max === MAX_PRICE)) {
      params.set("minPrice", String(min));
      params.set("maxPrice", String(max));
    }

    router.push(`/artists${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  }, [selectedCategories, selectedLocation, selectedPriceRange, router]);

  // ✅ Safe handlers: only set state here
  const handleCategoryChange = useCallback(
    (category: string, checked: boolean) => {
      setSelectedCategories((prev) =>
        checked ? [...prev, category] : prev.filter((c) => c !== category)
      );
    },
    []
  );

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setSelectedPriceRange(range);
  }, []);

  const clearFilters = useCallback(
    (type?: "category" | "location" | "price") => {
      const query = new URLSearchParams(window.location.search);

      if (!type || type === "category") {
        setSelectedCategories([]);
        query.delete("category");
      }

      if (!type || type === "location") {
        setSelectedLocation("all");
        query.delete("location");
      }

      if (!type || type === "price") {
        setSelectedPriceRange([MIN_PRICE, MAX_PRICE]);
        query.delete("minPrice");
        query.delete("maxPrice");
      }

      router.push(`/artists${query.toString() ? `?${query.toString()}` : ""}`);
    },
    [router]
  );

  // Helper to format price range
  const priceLabel =
    selectedPriceRange[0] === MIN_PRICE && selectedPriceRange[1] === MAX_PRICE
      ? null
      : `₹${selectedPriceRange[0]} - ₹${selectedPriceRange[1]}`;

  type AppliedFilter = { label: string; onRemove: () => void } | null;
  const appliedFilters: AppliedFilter[] = [
    ...selectedCategories.map((cat) => ({
      label: cat,
      onRemove: () => {
        console.log("removing", cat);

        handleCategoryChange(cat, false);
      },
    })),
    selectedLocation && selectedLocation !== "all"
      ? {
          label: selectedLocation,
          onRemove: () => handleLocationChange("all"),
        }
      : null,
    priceLabel
      ? {
          label: priceLabel,
          onRemove: () => handlePriceRangeChange([MIN_PRICE, MAX_PRICE]),
        }
      : null,
  ].filter(Boolean);

  return {
    selectedCategories,
    selectedLocation,
    selectedPriceRange,
    appliedFilters,
    handleCategoryChange,
    handleLocationChange,
    handlePriceRangeChange,
    clearFilters,
  };
}
