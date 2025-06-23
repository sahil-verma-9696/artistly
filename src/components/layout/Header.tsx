import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Music } from "lucide-react";

const CTA_LINK = [
  {
    title: "Home",
    ref: "/",
  },
  {
    title: "Browse Artists",
    ref: "/artists",
  },
  {
    title: "Join as Artist",
    ref: "/onboarding",
  },
  {
    title: "Dashboard",
    ref: "/dashboard",
  },
];

export default function Header(): React.ReactNode {
  return (
    <header className="flex items-center justify-between px-[5vw] py-4">
      <Link href={"/"} className="flex items-center gap-2">
        <Music className="h-8 w-8 text-purple-600" />
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Artistly<span className="font-medium text-lg">.com</span>
        </h2>
      </Link>

      <nav className="flex gap-4 items-center">
        {CTA_LINK.map(({ title, ref }) => (
          <Link key={title} href={ref} className="text-nowrap">
            {title}
          </Link>
        ))}
        <Button
          className="bg-purple-500 hover:bg-purple-600 focus:bg-purple-700"
          asChild
        >
          <Link href="/login">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
