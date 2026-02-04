import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/layout";
import { CarForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "تعديل السيارة - نيزك",
};

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

async function getCar(id: string) {
  return prisma.carListing.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title="تعديل السيارة"
        description={car.title}
      />

      <div className="p-6">
        <CarForm initialData={car} carId={car.id} />
      </div>
    </>
  );
}
