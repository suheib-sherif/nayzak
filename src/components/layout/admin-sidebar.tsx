"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  Car,
  LayoutDashboard,
  Plus,
  List,
  LogOut,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
  { name: "السيارات", href: "/admin/cars", icon: List },
  { name: "إضافة سيارة", href: "/admin/cars/new", icon: Plus },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed start-0 top-0 z-40 h-screen w-64 border-e border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">نيزك</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </aside>
  );
}
