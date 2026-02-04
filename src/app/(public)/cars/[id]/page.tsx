import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Header, Footer } from "@/components/layout";
import { CarGallery } from "@/components/cars";
import { Button, Badge } from "@/components/ui";
import {
  formatPrice,
  formatMileage,
  formatDate,
  generateWhatsAppLink,
} from "@/lib/utils";
import { LIBYAN_CITIES } from "@/constants/cities";
import {
  CAR_MAKES,
  FUEL_TYPES,
  TRANSMISSIONS,
  BODY_TYPES,
  CONDITIONS,
  CAR_COLORS,
} from "@/constants/car-options";
import {
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Car,
  MapPin,
  Palette,
  Eye,
  ArrowRight,
} from "lucide-react";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getCar(id: string) {
  const car = await prisma.carListing.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (car && car.status === "PUBLISHED") {
    // Increment views
    await prisma.carListing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  return car;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.carListing.findUnique({
    where: { id },
    select: { title: true, description: true },
  });

  if (!car) {
    return { title: "سيارة غير موجودة - نيزك" };
  }

  return {
    title: `${car.title} - نيزك`,
    description: car.description || `${car.title} للبيع في ليبيا`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car || car.status !== "PUBLISHED") {
    notFound();
  }

  const cityLabel = LIBYAN_CITIES.find((c) => c.value === car.city)?.label || car.city;
  const makeLabel = CAR_MAKES.find((m) => m.value === car.make)?.label || car.make;
  const fuelLabel = FUEL_TYPES.find((f) => f.value === car.fuelType)?.label || car.fuelType;
  const transmissionLabel = TRANSMISSIONS.find((t) => t.value === car.transmission)?.label || car.transmission;
  const bodyLabel = BODY_TYPES.find((b) => b.value === car.bodyType)?.label || car.bodyType;
  const conditionLabel = CONDITIONS.find((c) => c.value === car.condition)?.label || car.condition;
  const colorLabel = CAR_COLORS.find((c) => c.value === car.color)?.label || car.color;

  const whatsappMessage = `مرحباً، أنا مهتم بالسيارة: ${car.title}`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">
              الرئيسية
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link href="/cars" className="hover:text-primary-600">
              السيارات
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900">{car.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="mb-8 rounded-xl bg-white p-4">
                <CarGallery images={car.images} title={car.title} />
              </div>

              {/* Details */}
              <div className="rounded-xl bg-white p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  المواصفات
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">الشركة المصنعة</p>
                      <p className="font-medium text-gray-900">{makeLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">سنة الصنع</p>
                      <p className="font-medium text-gray-900">{car.year}</p>
                    </div>
                  </div>

                  {car.mileage && (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                      <Gauge className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">المسافة المقطوعة</p>
                        <p className="font-medium text-gray-900">
                          {formatMileage(car.mileage)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <Fuel className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">نوع الوقود</p>
                      <p className="font-medium text-gray-900">{fuelLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">ناقل الحركة</p>
                      <p className="font-medium text-gray-900">{transmissionLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">نوع الهيكل</p>
                      <p className="font-medium text-gray-900">{bodyLabel}</p>
                    </div>
                  </div>

                  {car.color && (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                      <Palette className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">اللون</p>
                        <p className="font-medium text-gray-900">{colorLabel}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">المدينة</p>
                      <p className="font-medium text-gray-900">{cityLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {car.description && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      الوصف
                    </h3>
                    <p className="whitespace-pre-line text-gray-600">
                      {car.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="rounded-xl bg-white p-6">
                  <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-900">{car.title}</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={car.condition === "NEW" ? "success" : "default"}>
                        {conditionLabel}
                      </Badge>
                      {car.featured && <Badge variant="info">مميز</Badge>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary-600">
                      {formatPrice(car.price)}
                    </p>
                    {car.priceNegotiable && (
                      <p className="mt-1 text-sm text-gray-500">قابل للتفاوض</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {car.contactPhone && (
                      <a href={`tel:${car.contactPhone}`} className="block">
                        <Button className="w-full" size="lg">
                          <Phone className="ms-2 h-5 w-5" />
                          اتصل الآن
                        </Button>
                      </a>
                    )}

                    {car.contactWhatsApp && (
                      <a
                        href={generateWhatsAppLink(car.contactWhatsApp, whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button variant="secondary" className="w-full bg-green-500 text-white hover:bg-green-600" size="lg">
                          <MessageCircle className="ms-2 h-5 w-5" />
                          واتساب
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="rounded-xl bg-white p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{car.views} مشاهدة</span>
                    </div>
                    <span>نشر في {formatDate(car.publishedAt || car.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
