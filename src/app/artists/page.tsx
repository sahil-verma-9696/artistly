import { ArtistListing } from "@/components/artists/artist-listing";
import { ArtistFilters } from "@/components/artists/artist-filters";
import { Suspense } from "react";

export const metadata = {
  title: "Browse Artists - Artistly",
  description:
    "Discover talented performing artists for your events. Filter by category, location, and price range.",
};

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Artists
          </h1>
          <p className="text-gray-600">
            Find the perfect performer for your event
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ArtistFilters />
            </Suspense>
          </div>

          {/* Artist Listing */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading artists...</div>}>
              <ArtistListing />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
