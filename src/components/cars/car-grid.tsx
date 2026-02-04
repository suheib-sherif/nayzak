import { CarCard } from "./car-card";

interface CarGridProps {
  cars: any[];
}

export function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-lg font-medium text-gray-900">لا توجد سيارات</p>
        <p className="mt-2 text-sm text-gray-500">
          جرب تغيير معايير البحث
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
