"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

interface LinkType {
  title: string;
  ref: string;
}

export default function HeaderClient({ links }: { links: LinkType[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="text-purple-600"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md border rounded-lg p-4 flex flex-col gap-3 z-50 min-w-[180px]">
          {links.map(({ title, ref }) => (
            <Link
              key={title}
              href={ref}
              className="text-sm font-medium text-gray-800 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              {title}
            </Link>
          ))}
          <Button className="bg-purple-500 hover:bg-purple-600 mt-2" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
