import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { Car, Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Car className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
          <p className="mb-6 text-xl text-gray-600">الصفحة غير موجودة</p>
          <p className="mb-8 text-gray-500">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
          </p>
          <Link href="/">
            <Button size="lg">
              <Home className="ms-2 h-5 w-5" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
