"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import artistsData from "@/data/artists.json";

export type Artist = {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  languages: string[];
  bio: string;
  image: string;
  rating: number;
  experience: string;
};

export function useFilteredArtistList() {
  const searchParams = useSearchParams();
  const [artists] = useState<Artist[]>(artistsData);

  const filteredArtists = useMemo(() => {
    const categoryParam = searchParams.get("category");
    const locationParam = searchParams.get("location");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    let filtered = [...artists];

    if (categoryParam) {
      const categories = categoryParam.split(",");
      filtered = filtered.filter((artist) =>
        categories.some((cat) =>
          artist.category.some((artistCat) =>
            artistCat.toLowerCase().includes(cat.toLowerCase())
          )
        )
      );
    }

    if (locationParam) {
      filtered = filtered.filter((artist) =>
        artist.location
          .toLowerCase()
          .replace(/, /g, "-")
          .includes(locationParam.toLowerCase())
      );
    }

    if (minPriceParam && maxPriceParam) {
      const min = Number(minPriceParam);
      const max = Number(maxPriceParam);
      filtered = filtered.filter(
        (artist) => artist.minPrice >= min && artist.maxPrice <= max
      );
    }

    return filtered;
  }, [artists, searchParams]);

  return {
    filteredArtists,
  };
}
