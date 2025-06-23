"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-purple-200 mb-4">404</div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <Search className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It
                might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/artists">
              <Search className="mr-2 h-5 w-5" />
              Browse Artists
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/artists"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-purple-200"
            >
              <div className="text-purple-600 font-medium">Browse Artists</div>
              <div className="text-sm text-gray-600">
                Find talented performers
              </div>
            </Link>
            <Link
              href="/onboarding"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-purple-200"
            >
              <div className="text-purple-600 font-medium">Join as Artist</div>
              <div className="text-sm text-gray-600">Register your talent</div>
            </Link>
            <Link
              href="/dashboard"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-purple-200"
            >
              <div className="text-purple-600 font-medium">Dashboard</div>
              <div className="text-sm text-gray-600">Manage your account</div>
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-sm text-gray-500">
          Still can&rsquo;t find what you&rsquo;re looking for?{" "}
          <Link
            href="mailto:support@artistly.com"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
