import artistsData from "@/data/artists.json";

export const CATEGORIES = Array.from(
  artistsData.reduce((set: Set<string>, artist) => {
    artist.category.forEach((cat: string) => set.add(cat));
    return set;
  }, new Set<string>())
).sort();

export const LOCATIONS = Array.from(
  artistsData.reduce((set: Set<string>, artist) => {
    set.add(artist.location);
    return set;
  }, new Set<string>())
).sort();

export const MIN_PRICE = artistsData.reduce((min, artist) => {
  return artist.minPrice < min ? artist.minPrice : min;
}, Infinity);

export const MAX_PRICE = artistsData.reduce((max, artist) => {
  return artist.maxPrice > max ? artist.maxPrice : max;
}, -Infinity);
