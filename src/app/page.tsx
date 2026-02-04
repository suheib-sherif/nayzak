import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header, Footer } from "@/components/layout";
import { CarGrid } from "@/components/cars";
import { Button } from "@/components/ui";
import { Search, Car, Shield, Clock } from "lucide-react";

async function getFeaturedCars() {
  return prisma.carListing.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 8,
  });
}

async function getLatestCars() {
  return prisma.carListing.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 8,
  });
}

export default async function HomePage() {
  const [featuredCars, latestCars] = await Promise.all([
    getFeaturedCars(),
    getLatestCars(),
  ]);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                ابحث عن سيارتك المثالية
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-primary-100">
                أكبر سوق للسيارات الجديدة والمستعملة في ليبيا.
                تصفح آلاف السيارات من جميع أنحاء ليبيا.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/cars">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    <Search className="ms-2 h-5 w-5" />
                    تصفح السيارات
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="rgb(249 250 251)"
              />
            </svg>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                  <Car className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  تشكيلة واسعة
                </h3>
                <p className="text-sm text-gray-500">
                  آلاف السيارات الجديدة والمستعملة من مختلف الشركات والموديلات
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <Shield className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  إعلانات موثوقة
                </h3>
                <p className="text-sm text-gray-500">
                  جميع الإعلانات تتم مراجعتها للتأكد من صحة المعلومات
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  تواصل مباشر
                </h3>
                <p className="text-sm text-gray-500">
                  تواصل مباشرة مع البائعين عبر الهاتف أو الواتساب
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        {featuredCars.length > 0 && (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  سيارات مميزة
                </h2>
                <Link href="/cars?featured=true">
                  <Button variant="outline">عرض الكل</Button>
                </Link>
              </div>
              <CarGrid cars={featuredCars} />
            </div>
          </section>
        )}

        {/* Latest Cars */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                أحدث السيارات
              </h2>
              <Link href="/cars">
                <Button variant="outline">عرض الكل</Button>
              </Link>
            </div>
            <CarGrid cars={latestCars} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white">
              ابدأ البحث عن سيارتك الآن
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              تصفح جميع السيارات المتاحة في ليبيا واعثر على سيارة أحلامك
            </p>
            <div className="mt-8">
              <Link href="/cars">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  تصفح السيارات
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
