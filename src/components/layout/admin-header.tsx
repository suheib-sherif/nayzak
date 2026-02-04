"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {session?.user?.name || session?.user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
