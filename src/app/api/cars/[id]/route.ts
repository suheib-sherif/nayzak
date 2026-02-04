import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { carListingSchema } from "@/lib/validators";

// GET /api/cars/[id] - Get single car
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const car = await prisma.carListing.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!car) {
      return NextResponse.json(
        { error: "السيارة غير موجودة" },
        { status: 404 }
      );
    }

    // Increment views for public access
    const session = await auth();
    if (!session && car.status === "PUBLISHED") {
      await prisma.carListing.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    }

    // Don't show unpublished cars to public
    if (!session && car.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "السيارة غير موجودة" },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب السيارة" },
      { status: 500 }
    );
  }
}

// PUT /api/cars/[id] - Update car (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { images, ...carData } = body;

    const existingCar = await prisma.carListing.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: "السيارة غير موجودة" },
        { status: 404 }
      );
    }

    const validatedData = carListingSchema.parse(carData);

    // Determine publishedAt
    let publishedAt = existingCar.publishedAt;
    if (validatedData.status === "PUBLISHED" && !existingCar.publishedAt) {
      publishedAt = new Date();
    } else if (validatedData.status !== "PUBLISHED") {
      publishedAt = null;
    }

    // Update car with transaction
    const car = await prisma.$transaction(async (tx: typeof prisma) => {
      // Delete existing images
      await tx.carImage.deleteMany({
        where: { carListingId: id },
      });

      // Update car with new images
      return tx.carListing.update({
        where: { id },
        data: {
          ...validatedData,
          publishedAt,
          images: images?.length
            ? {
                create: images.map((img: any, index: number) => ({
                  url: img.url,
                  isPrimary: img.isPrimary || index === 0,
                  order: img.order ?? index,
                })),
              }
            : undefined,
        },
        include: {
          images: true,
        },
      });
    });

    return NextResponse.json(car);
  } catch (error: any) {
    console.error("Error updating car:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "بيانات غير صالحة", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث السيارة" },
      { status: 500 }
    );
  }
}

// DELETE /api/cars/[id] - Delete car (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existingCar = await prisma.carListing.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: "السيارة غير موجودة" },
        { status: 404 }
      );
    }

    await prisma.carListing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف السيارة" },
      { status: 500 }
    );
  }
}
