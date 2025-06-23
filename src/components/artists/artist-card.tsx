import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle } from "lucide-react";

type Artist = {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  languages: string[];
  bio: string;
  image: string;
  rating: number;
  experience: string;
};

interface ArtistCardProps {
  artist: Artist;
  viewMode: "grid" | "list";
}

export function ArtistCard({ artist, viewMode }: ArtistCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                width={120}
                height={120}
                className="rounded-lg object-cover w-full sm:w-30 h-30"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {artist.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{artist.rating}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {artist.experience}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {artist.category.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">{artist.bio}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{artist.location}</span>
                </div>
                <div className="font-medium text-purple-600">
                  {artist.priceRange}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col justify-between">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask for Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span>{artist.rating}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {artist.name}
            </h3>
            <p className="text-sm text-gray-600">{artist.experience}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {artist.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
            {artist.category.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{artist.category.length - 2}
              </Badge>
            )}
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{artist.bio}</p>

          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{artist.location}</span>
            </div>
            <div className="text-lg font-semibold text-purple-600">
              {artist.priceRange}
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Ask for Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
