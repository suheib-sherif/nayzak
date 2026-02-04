import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ps-64">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
