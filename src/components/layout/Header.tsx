import Link from "next/link";
import { Music } from "lucide-react";
import { Button } from "../ui/button";
import HeaderClient from "./header-client";
import { CTA_LINK } from "@/config/header";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-[5vw] py-4 border-b border-gray-200">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Music className="h-8 w-8 text-purple-600" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Artistly<span className="font-medium text-lg">.com</span>
        </h2>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4 items-center">
        {CTA_LINK.map(({ title, ref }) => (
          <Link
            key={title}
            href={ref}
            className="text-nowrap text-sm font-medium"
          >
            {title}
          </Link>
        ))}
        <Button className="bg-purple-500 hover:bg-purple-600" asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </nav>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden">
        <HeaderClient links={CTA_LINK} />
      </div>
    </header>
  );
}
