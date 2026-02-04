import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header, Footer } from "@/components/layout";
import { CarGrid, CarFilters } from "@/components/cars";
import { Button } from "@/components/ui";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "تصفح السيارات - نيزك",
  description: "تصفح جميع السيارات المتاحة للبيع في ليبيا",
};

interface CarsPageProps {
  searchParams: Promise<{
    page?: string;
    city?: string;
    make?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    featured?: string;
  }>;
}

async function getCars(searchParams: CarsPageProps["searchParams"]) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 12;

  const where: any = {
    status: "PUBLISHED",
  };

  if (params.city) where.city = params.city;
  if (params.make) where.make = params.make;
  if (params.featured === "true") where.featured = true;

  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) where.price.gte = parseInt(params.minPrice);
    if (params.maxPrice) where.price.lte = parseInt(params.maxPrice);
  }

  if (params.minYear) {
    where.year = { gte: parseInt(params.minYear) };
  }

  const [cars, total] = await Promise.all([
    prisma.carListing.findMany({
      where,
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.carListing.count({ where }),
  ]);

  return {
    cars,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    params.set("page", page.toString());
    return `/cars?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      >
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          <ChevronRight className="h-4 w-4" />
          السابق
        </Button>
      </Link>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Link key={pageNum} href={createPageUrl(pageNum)}>
              <Button
                variant={currentPage === pageNum ? "primary" : "outline"}
                size="sm"
              >
                {pageNum}
              </Button>
            </Link>
          );
        })}
      </div>

      <Link
        href={createPageUrl(currentPage + 1)}
        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
      >
        <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
          التالي
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const { cars, pagination } = await getCars(searchParams);
  const params = await searchParams;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">تصفح السيارات</h1>
            <p className="mt-2 text-gray-500">
              {pagination.total} سيارة متاحة للبيع
            </p>
          </div>

          <Suspense fallback={<div>جاري التحميل...</div>}>
            <CarFilters />
          </Suspense>

          <div className="mt-8">
            <CarGrid cars={cars} />
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            searchParams={params as Record<string, string | undefined>}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
