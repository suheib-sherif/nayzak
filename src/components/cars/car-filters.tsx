"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, Button } from "@/components/ui";
import { LIBYAN_CITIES } from "@/constants/cities";
import { CAR_MAKES, YEAR_OPTIONS, PRICE_RANGES } from "@/constants/car-options";
import { Search, X } from "lucide-react";

export function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters = {
    city: searchParams.get("city") || "",
    make: searchParams.get("make") || "",
    minYear: searchParams.get("minYear") || "",
    priceRange: searchParams.get("priceRange") || "",
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);

      // Handle price range
      if (key === "priceRange") {
        const range = PRICE_RANGES.find((r) => r.value === value);
        if (range) {
          params.set("minPrice", range.min.toString());
          if (range.max !== Infinity) {
            params.set("maxPrice", range.max.toString());
          } else {
            params.delete("maxPrice");
          }
        }
      }
    } else {
      params.delete(key);
      if (key === "priceRange") {
        params.delete("minPrice");
        params.delete("maxPrice");
      }
    }

    params.set("page", "1");
    router.push(`/cars?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/cars");
  };

  const hasFilters = Object.values(currentFilters).some((v) => v);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">تصفية النتائج</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            مسح الكل
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="المدينة"
          options={[{ value: "", label: "جميع المدن" }, ...LIBYAN_CITIES]}
          value={currentFilters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
        />

        <Select
          label="الشركة المصنعة"
          options={[{ value: "", label: "جميع الشركات" }, ...CAR_MAKES]}
          value={currentFilters.make}
          onChange={(e) => updateFilter("make", e.target.value)}
        />

        <Select
          label="السنة (من)"
          options={[{ value: "", label: "جميع السنوات" }, ...YEAR_OPTIONS]}
          value={currentFilters.minYear}
          onChange={(e) => updateFilter("minYear", e.target.value)}
        />

        <Select
          label="نطاق السعر"
          options={[
            { value: "", label: "جميع الأسعار" },
            ...PRICE_RANGES.map((r) => ({ value: r.value, label: r.label })),
          ]}
          value={currentFilters.priceRange}
          onChange={(e) => updateFilter("priceRange", e.target.value)}
        />
      </div>
    </div>
  );
}
