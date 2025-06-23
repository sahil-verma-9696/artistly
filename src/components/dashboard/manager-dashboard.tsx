"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Eye,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock data for artist submissions
const artistSubmissions = [
  {
    id: 1,
    name: "Priya Sharma",
    category: "Singer",
    city: "Mumbai",
    fee: "₹25,000 - ₹50,000",
    status: "pending",
    submittedAt: "2024-01-15",
    rating: 4.8,
    bookings: 12,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    category: "DJ",
    city: "Delhi",
    fee: "₹15,000 - ₹30,000",
    status: "approved",
    submittedAt: "2024-01-14",
    rating: 4.6,
    bookings: 8,
  },
  {
    id: 3,
    name: "Ananya Dance Troupe",
    category: "Dancer",
    city: "Bangalore",
    fee: "₹20,000 - ₹40,000",
    status: "approved",
    submittedAt: "2024-01-13",
    rating: 4.9,
    bookings: 15,
  },
  {
    id: 4,
    name: "Dr. Vikram Patel",
    category: "Speaker",
    city: "Pune",
    fee: "₹50,000 - ₹100,000",
    status: "pending",
    submittedAt: "2024-01-12",
    rating: 4.7,
    bookings: 6,
  },
  {
    id: 5,
    name: "Comedy Central Crew",
    category: "Comedian",
    city: "Chennai",
    fee: "₹20,000 - ₹45,000",
    status: "rejected",
    submittedAt: "2024-01-11",
    rating: 4.5,
    bookings: 3,
  },
];

const stats = [
  {
    title: "Total Artists",
    value: "156",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Bookings",
    value: "43",
    change: "+8%",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Revenue",
    value: "₹2.4L",
    change: "+23%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Growth",
    value: "18%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

export function ManagerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSubmissions = artistSubmissions.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || artist.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAction = (artistId: number, action: string) => {
    console.log(`${action} artist with ID: ${artistId}`);
    // In a real app, this would make an API call
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your artists and track performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Artist Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Artist Submissions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("approved")}
              >
                Approved
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artist Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((artist) => (
                  <TableRow key={artist.id}>
                    <TableCell className="font-medium">{artist.name}</TableCell>
                    <TableCell>{artist.category}</TableCell>
                    <TableCell>{artist.city}</TableCell>
                    <TableCell>{artist.fee}</TableCell>
                    <TableCell>{getStatusBadge(artist.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{artist.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </TableCell>
                    <TableCell>{artist.bookings}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(artist.id, "view")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(artist.id, "message")}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        {artist.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAction(artist.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAction(artist.id, "reject")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No artists found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
