"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "السيارات", href: "/cars" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">نيزك</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
