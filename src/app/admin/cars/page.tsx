import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/layout";
import { Button, Badge } from "@/components/ui";
import { formatPrice, formatDate } from "@/lib/utils";
import { Plus, Edit, Trash2, Eye, Car } from "lucide-react";
import { DeleteCarButton } from "./delete-button";

export const metadata: Metadata = {
  title: "إدارة السيارات - نيزك",
};

async function getCars() {
  return prisma.carListing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });
}

export default async function AdminCarsPage() {
  const cars = await getCars();

  return (
    <>
      <AdminHeader
        title="إدارة السيارات"
        description="إضافة وتعديل وحذف إعلانات السيارات"
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            إجمالي {cars.length} سيارة
          </p>
          <Link href="/admin/cars/new">
            <Button>
              <Plus className="ms-2 h-5 w-5" />
              إضافة سيارة
            </Button>
          </Link>
        </div>

        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <Car className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              لا توجد سيارات
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              ابدأ بإضافة أول سيارة لعرضها على الموقع
            </p>
            <Link href="/admin/cars/new">
              <Button>
                <Plus className="ms-2 h-5 w-5" />
                إضافة سيارة
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    السيارة
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    المدينة
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    المشاهدات
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-end text-xs font-medium uppercase tracking-wider text-gray-500">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
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
                          <p className="font-medium text-gray-900">
                            {car.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {car.year} • {car.make}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                      {formatPrice(car.price)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {car.city}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge
                        variant={
                          car.status === "PUBLISHED"
                            ? "success"
                            : car.status === "SOLD"
                            ? "info"
                            : "warning"
                        }
                      >
                        {car.status === "PUBLISHED"
                          ? "منشور"
                          : car.status === "SOLD"
                          ? "مباع"
                          : "مسودة"}
                      </Badge>
                      {car.featured && (
                        <Badge variant="info" className="ms-2">
                          مميز
                        </Badge>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {car.views}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(car.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/cars/${car.id}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/cars/${car.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteCarButton carId={car.id} carTitle={car.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
