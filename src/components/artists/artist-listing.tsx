"use client";

import { useState } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "./artist-card";
import { useFilteredArtists } from "@/hooks/useFilteredArtists";

export function ArtistListing() {
  const { filteredArtists } = useFilteredArtists();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Header with view toggle and results count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredArtists.length} Artists Found
          </h2>
          <p className="text-gray-600">
            Showing results for your selected filters
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Artists Grid/List */}
      {filteredArtists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Grid className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No artists found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more results.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
