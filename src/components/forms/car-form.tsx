"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carListingSchema, type CarListingFormData } from "@/lib/validators";
import { Button, Input, Select, Textarea, Checkbox } from "@/components/ui";
import { ImageUpload } from "./image-upload";
import { LIBYAN_CITIES } from "@/constants/cities";
import {
  CAR_MAKES,
  FUEL_TYPES,
  TRANSMISSIONS,
  BODY_TYPES,
  CONDITIONS,
  LISTING_STATUSES,
  CAR_COLORS,
  YEAR_OPTIONS,
} from "@/constants/car-options";
import { Save, Loader2 } from "lucide-react";

interface CarImage {
  url: string;
  isPrimary: boolean;
  order: number;
}

interface CarFormProps {
  initialData?: {
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    priceNegotiable: boolean;
    mileage: number | null;
    fuelType: string;
    transmission: string;
    bodyType: string;
    condition: string;
    color: string | null;
    city: string;
    description: string | null;
    contactPhone: string | null;
    contactWhatsApp: string | null;
    featured: boolean;
    status: string;
    images?: CarImage[];
  };
  carId?: string;
}

type UploadedImage = CarImage;

export function CarForm({ initialData, carId }: CarFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(
    initialData?.images?.map((img: any) => ({
      url: img.url,
      isPrimary: img.isPrimary,
      order: img.order,
    })) || []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CarListingFormData>({
    resolver: zodResolver(carListingSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          year: initialData.year,
          price: initialData.price,
          mileage: initialData.mileage,
        }
      : {
          fuelType: "PETROL",
          transmission: "AUTOMATIC",
          bodyType: "SEDAN",
          condition: "USED",
          status: "DRAFT",
          priceNegotiable: false,
          featured: false,
        },
  });

  const onSubmit = async (data: CarListingFormData) => {
    setIsSubmitting(true);

    try {
      const url = carId ? `/api/cars/${carId}` : "/api/cars";
      const method = carId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "حدث خطأ");
        return;
      }

      router.push("/admin/cars");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء حفظ السيارة");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Images */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">صور السيارة</h3>
        <ImageUpload images={images} onChange={setImages} maxImages={10} />
      </div>

      {/* Basic Info */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">المعلومات الأساسية</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="عنوان الإعلان"
              placeholder="مثال: تويوتا كامري 2023 فل كامل"
              error={errors.title?.message}
              {...register("title")}
            />
          </div>

          <Select
            label="الشركة المصنعة"
            options={CAR_MAKES}
            placeholder="اختر الشركة"
            error={errors.make?.message}
            {...register("make")}
          />

          <Input
            label="الموديل"
            placeholder="مثال: Camry"
            error={errors.model?.message}
            {...register("model")}
          />

          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select
                label="سنة الصنع"
                options={YEAR_OPTIONS}
                placeholder="اختر السنة"
                error={errors.year?.message}
                value={field.value?.toString()}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />

          <Select
            label="اللون"
            options={CAR_COLORS}
            placeholder="اختر اللون"
            error={errors.color?.message}
            {...register("color")}
          />
        </div>
      </div>

      {/* Technical Specs */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">المواصفات الفنية</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Controller
            name="mileage"
            control={control}
            render={({ field }) => (
              <Input
                label="المسافة المقطوعة (كم)"
                type="number"
                placeholder="مثال: 50000"
                error={errors.mileage?.message}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            )}
          />

          <Select
            label="نوع الوقود"
            options={FUEL_TYPES}
            error={errors.fuelType?.message}
            {...register("fuelType")}
          />

          <Select
            label="ناقل الحركة"
            options={TRANSMISSIONS}
            error={errors.transmission?.message}
            {...register("transmission")}
          />

          <Select
            label="نوع الهيكل"
            options={BODY_TYPES}
            error={errors.bodyType?.message}
            {...register("bodyType")}
          />

          <Select
            label="الحالة"
            options={CONDITIONS}
            error={errors.condition?.message}
            {...register("condition")}
          />
        </div>
      </div>

      {/* Pricing & Location */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">السعر والموقع</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                label="السعر (دينار ليبي)"
                type="number"
                placeholder="مثال: 100000"
                error={errors.price?.message}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />

          <Select
            label="المدينة"
            options={LIBYAN_CITIES}
            placeholder="اختر المدينة"
            error={errors.city?.message}
            {...register("city")}
          />

          <div className="md:col-span-2">
            <Controller
              name="priceNegotiable"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="السعر قابل للتفاوض"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">معلومات الاتصال</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="رقم الهاتف"
            placeholder="+218912345678"
            error={errors.contactPhone?.message}
            {...register("contactPhone")}
          />

          <Input
            label="رقم الواتساب"
            placeholder="+218912345678"
            error={errors.contactWhatsApp?.message}
            {...register("contactWhatsApp")}
          />
        </div>
      </div>

      {/* Description */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">الوصف</h3>
        <Textarea
          label="وصف السيارة"
          placeholder="أضف وصفاً تفصيلياً للسيارة..."
          rows={5}
          error={errors.description?.message}
          {...register("description")}
        />
      </div>

      {/* Publishing Options */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">خيارات النشر</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="حالة الإعلان"
            options={LISTING_STATUSES}
            error={errors.status?.message}
            {...register("status")}
          />

          <div className="flex items-end">
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="إعلان مميز (يظهر في الصفحة الرئيسية)"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="ms-2 h-5 w-5 animate-spin" />
          ) : (
            <Save className="ms-2 h-5 w-5" />
          )}
          {carId ? "حفظ التغييرات" : "إضافة السيارة"}
        </Button>
      </div>
    </form>
  );
}
