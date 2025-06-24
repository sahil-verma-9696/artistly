import artistsData from "@/data/artists.json";

export const categories = Array.from(
  artistsData.reduce((set: Set<string>, artist) => {
    artist.category.forEach((cat: string) => set.add(cat));
    return set;
  }, new Set<string>())
).sort();

export const locations = Array.from(
  artistsData.reduce((set: Set<string>, artist) => {
    set.add(artist.location);
    return set;
  }, new Set<string>())
).sort();

export const priceRanges = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹100,000",
  "₹100,000+",
];
