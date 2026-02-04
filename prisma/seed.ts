import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nayzak.ly" },
    update: {},
    create: {
      email: "admin@nayzak.ly",
      passwordHash,
      name: "مدير النظام",
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", admin.email);

  // Create sample car listings
  const sampleCars = [
    {
      title: "تويوتا كامري 2023 فل كامل",
      make: "toyota",
      model: "Camry",
      year: 2023,
      price: 120000,
      priceNegotiable: true,
      mileage: 15000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "SEDAN" as const,
      condition: "USED" as const,
      color: "white",
      city: "tripoli",
      description: "سيارة بحالة ممتازة، صيانة دورية في الوكالة، كراسي جلد، شاشة، كاميرا خلفية",
      contactPhone: "+218912345678",
      contactWhatsApp: "+218912345678",
      featured: true,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "هيونداي توسان 2022 دفع رباعي",
      make: "hyundai",
      model: "Tucson",
      year: 2022,
      price: 95000,
      priceNegotiable: false,
      mileage: 35000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "SUV" as const,
      condition: "USED" as const,
      color: "gray",
      city: "benghazi",
      description: "سيارة عائلية مريحة، فتحة سقف، حساسات أمامية وخلفية",
      contactPhone: "+218923456789",
      contactWhatsApp: "+218923456789",
      featured: true,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "كيا سبورتاج 2024 جديدة",
      make: "kia",
      model: "Sportage",
      year: 2024,
      price: 150000,
      priceNegotiable: true,
      mileage: 0,
      fuelType: "HYBRID" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "SUV" as const,
      condition: "NEW" as const,
      color: "black",
      city: "misrata",
      description: "سيارة جديدة زيرو، ضمان الوكالة، هايبرد اقتصادية",
      contactPhone: "+218934567890",
      contactWhatsApp: "+218934567890",
      featured: false,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "نيسان صني 2021 اقتصادية",
      make: "nissan",
      model: "Sunny",
      year: 2021,
      price: 45000,
      priceNegotiable: true,
      mileage: 60000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "SEDAN" as const,
      condition: "USED" as const,
      color: "silver",
      city: "tripoli",
      description: "سيارة اقتصادية في الوقود، مناسبة للاستخدام اليومي",
      contactPhone: "+218945678901",
      contactWhatsApp: "+218945678901",
      featured: false,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "مرسيدس E200 2020 فخمة",
      make: "mercedes",
      model: "E200",
      year: 2020,
      price: 250000,
      priceNegotiable: false,
      mileage: 40000,
      fuelType: "PETROL" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "SEDAN" as const,
      condition: "CERTIFIED" as const,
      color: "black",
      city: "tripoli",
      description: "سيارة فاخرة بمواصفات عالية، AMG kit، بانوراما، نظام صوت بورميستر",
      contactPhone: "+218956789012",
      contactWhatsApp: "+218956789012",
      featured: true,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "تويوتا هايلكس 2023 بيك أب",
      make: "toyota",
      model: "Hilux",
      year: 2023,
      price: 180000,
      priceNegotiable: true,
      mileage: 20000,
      fuelType: "DIESEL" as const,
      transmission: "AUTOMATIC" as const,
      bodyType: "PICKUP" as const,
      condition: "USED" as const,
      color: "white",
      city: "sabha",
      description: "بيك أب قوي للطرق الوعرة، دبل كابينة، دفع رباعي",
      contactPhone: "+218967890123",
      contactWhatsApp: "+218967890123",
      featured: false,
      status: "PUBLISHED" as const,
      userId: admin.id,
      publishedAt: new Date(),
    },
  ];

  for (const car of sampleCars) {
    const existing = await prisma.carListing.findFirst({
      where: { title: car.title },
    });

    if (!existing) {
      await prisma.carListing.create({
        data: car,
      });
      console.log("Created car listing:", car.title);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
