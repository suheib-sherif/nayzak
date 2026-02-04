import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const carListingSchema = z.object({
  title: z.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل"),
  make: z.string().min(1, "الشركة المصنعة مطلوبة"),
  model: z.string().min(1, "الموديل مطلوب"),
  year: z.coerce.number().min(1970, "السنة غير صالحة").max(new Date().getFullYear() + 1, "السنة غير صالحة"),
  price: z.coerce.number().min(1, "السعر مطلوب"),
  priceNegotiable: z.boolean(),
  mileage: z.coerce.number().min(0).optional().nullable(),
  fuelType: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC", "LPG"]),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  bodyType: z.enum(["SEDAN", "SUV", "HATCHBACK", "COUPE", "PICKUP", "VAN", "WAGON"]),
  condition: z.enum(["NEW", "USED", "CERTIFIED"]),
  color: z.string().optional().nullable(),
  city: z.string().min(1, "المدينة مطلوبة"),
  description: z.string().optional().nullable(),
  contactPhone: z.string().optional().nullable(),
  contactWhatsApp: z.string().optional().nullable(),
  featured: z.boolean(),
  status: z.enum(["DRAFT", "PUBLISHED", "SOLD"]),
});

export type CarListingFormData = z.infer<typeof carListingSchema>;

export const imageUploadSchema = z.object({
  file: z.instanceof(File),
  carListingId: z.string().optional(),
});
