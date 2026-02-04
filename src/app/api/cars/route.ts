import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { carListingSchema } from "@/lib/validators";

// GET /api/cars - List all cars (public, with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const make = searchParams.get("make");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const where: any = {};

    // Only show published cars for public requests
    const session = await auth();
    if (!session) {
      where.status = "PUBLISHED";
    } else if (status) {
      where.status = status;
    }

    if (city) where.city = city;
    if (make) where.make = make;
    if (featured === "true") where.featured = true;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }

    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year.gte = parseInt(minYear);
      if (maxYear) where.year.lte = parseInt(maxYear);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { make: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ];
    }

    const [cars, total] = await Promise.all([
      prisma.carListing.findMany({
        where,
        include: {
          images: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: [
          { featured: "desc" },
          { publishedAt: "desc" },
          { createdAt: "desc" },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.carListing.count({ where }),
    ]);

    return NextResponse.json({
      cars,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب السيارات" },
      { status: 500 }
    );
  }
}

// POST /api/cars - Create new car (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { images, ...carData } = body;

    const validatedData = carListingSchema.parse(carData);

    const car = await prisma.carListing.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
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

    return NextResponse.json(car, { status: 201 });
  } catch (error: any) {
    console.error("Error creating car:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "بيانات غير صالحة", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء السيارة" },
      { status: 500 }
    );
  }
}
