import Link from "next/link";
import { Car, MapPin, Calendar, Gauge, Fuel } from "lucide-react";
import { Badge } from "@/components/ui";
import { formatPrice, formatMileage } from "@/lib/utils";
import { LIBYAN_CITIES } from "@/constants/cities";
import { FUEL_TYPES } from "@/constants/car-options";

interface CarCardProps {
  car: {
    id: string;
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    priceNegotiable: boolean;
    mileage: number | null;
    fuelType: string;
    city: string;
    featured: boolean;
    images: { url: string; isPrimary: boolean }[];
  };
}

export function CarCard({ car }: CarCardProps) {
  const primaryImage = car.images.find((img) => img.isPrimary) || car.images[0];
  const cityLabel = LIBYAN_CITIES.find((c) => c.value === car.city)?.label || car.city;
  const fuelLabel = FUEL_TYPES.find((f) => f.value === car.fuelType)?.label || car.fuelType;

  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={car.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Car className="h-16 w-16 text-gray-300" />
            </div>
          )}

          {/* Featured Badge */}
          {car.featured && (
            <div className="absolute start-3 top-3">
              <Badge variant="info">مميز</Badge>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-lg font-bold text-white">
              {formatPrice(car.price)}
            </p>
            {car.priceNegotiable && (
              <span className="text-xs text-gray-200">قابل للتفاوض</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-primary-600">
            {car.title}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{cityLabel}</span>
            </div>
            {car.mileage && (
              <div className="flex items-center gap-1">
                <Gauge className="h-4 w-4" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              <span>{fuelLabel}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
