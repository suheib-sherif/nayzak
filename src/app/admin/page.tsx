import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Car, Eye, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "لوحة التحكم - نيزك",
};

async function getStats() {
  const [totalCars, publishedCars, draftCars, soldCars, totalViews] =
    await Promise.all([
      prisma.carListing.count(),
      prisma.carListing.count({ where: { status: "PUBLISHED" } }),
      prisma.carListing.count({ where: { status: "DRAFT" } }),
      prisma.carListing.count({ where: { status: "SOLD" } }),
      prisma.carListing.aggregate({ _sum: { views: true } }),
    ]);

  return {
    totalCars,
    publishedCars,
    draftCars,
    soldCars,
    totalViews: totalViews._sum.views || 0,
  };
}

async function getRecentCars() {
  return prisma.carListing.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });
}

export default async function AdminDashboard() {
  const [stats, recentCars] = await Promise.all([getStats(), getRecentCars()]);

  const statCards = [
    {
      title: "إجمالي السيارات",
      value: stats.totalCars,
      icon: Car,
      color: "bg-blue-500",
    },
    {
      title: "السيارات المنشورة",
      value: stats.publishedCars,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "المسودات",
      value: stats.draftCars,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "إجمالي المشاهدات",
      value: stats.totalViews,
      icon: Eye,
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <AdminHeader
        title="لوحة التحكم"
        description="نظرة عامة على إحصائيات الموقع"
      />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                      {formatNumber(stat.value)}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Cars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              آخر السيارات المضافة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentCars.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                لا توجد سيارات مضافة بعد
              </p>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentCars.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
                        {car.images[0] ? (
                          <img
                            src={car.images[0].url}
                            alt={car.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Car className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{car.title}</p>
                        <p className="text-sm text-gray-500">
                          {car.year} • {car.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          car.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : car.status === "SOLD"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status === "PUBLISHED"
                          ? "منشور"
                          : car.status === "SOLD"
                          ? "مباع"
                          : "مسودة"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
