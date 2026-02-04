export const CAR_MAKES = [
  { value: "toyota", label: "تويوتا" },
  { value: "hyundai", label: "هيونداي" },
  { value: "kia", label: "كيا" },
  { value: "nissan", label: "نيسان" },
  { value: "mercedes", label: "مرسيدس" },
  { value: "bmw", label: "بي إم دبليو" },
  { value: "audi", label: "أودي" },
  { value: "volkswagen", label: "فولكس فاجن" },
  { value: "ford", label: "فورد" },
  { value: "chevrolet", label: "شيفروليه" },
  { value: "honda", label: "هوندا" },
  { value: "mazda", label: "مازدا" },
  { value: "mitsubishi", label: "ميتسوبيشي" },
  { value: "suzuki", label: "سوزوكي" },
  { value: "peugeot", label: "بيجو" },
  { value: "renault", label: "رينو" },
  { value: "fiat", label: "فيات" },
  { value: "jeep", label: "جيب" },
  { value: "land-rover", label: "لاند روفر" },
  { value: "lexus", label: "لكزس" },
  { value: "infiniti", label: "إنفينيتي" },
  { value: "porsche", label: "بورشه" },
  { value: "volvo", label: "فولفو" },
  { value: "skoda", label: "سكودا" },
  { value: "chery", label: "شيري" },
  { value: "geely", label: "جيلي" },
  { value: "haval", label: "هافال" },
  { value: "mg", label: "إم جي" },
  { value: "byd", label: "بي واي دي" },
  { value: "other", label: "أخرى" },
] as const;

export const FUEL_TYPES = [
  { value: "PETROL", label: "بنزين" },
  { value: "DIESEL", label: "ديزل" },
  { value: "HYBRID", label: "هايبرد" },
  { value: "ELECTRIC", label: "كهربائي" },
  { value: "LPG", label: "غاز" },
] as const;

export const TRANSMISSIONS = [
  { value: "AUTOMATIC", label: "أوتوماتيك" },
  { value: "MANUAL", label: "عادي" },
] as const;

export const BODY_TYPES = [
  { value: "SEDAN", label: "سيدان" },
  { value: "SUV", label: "دفع رباعي" },
  { value: "HATCHBACK", label: "هاتشباك" },
  { value: "COUPE", label: "كوبيه" },
  { value: "PICKUP", label: "بيك أب" },
  { value: "VAN", label: "فان" },
  { value: "WAGON", label: "ستيشن" },
] as const;

export const CONDITIONS = [
  { value: "NEW", label: "جديدة" },
  { value: "USED", label: "مستعملة" },
  { value: "CERTIFIED", label: "معتمدة" },
] as const;

export const LISTING_STATUSES = [
  { value: "DRAFT", label: "مسودة" },
  { value: "PUBLISHED", label: "منشور" },
  { value: "SOLD", label: "مباع" },
] as const;

export const CAR_COLORS = [
  { value: "white", label: "أبيض" },
  { value: "black", label: "أسود" },
  { value: "silver", label: "فضي" },
  { value: "gray", label: "رمادي" },
  { value: "red", label: "أحمر" },
  { value: "blue", label: "أزرق" },
  { value: "green", label: "أخضر" },
  { value: "beige", label: "بيج" },
  { value: "brown", label: "بني" },
  { value: "gold", label: "ذهبي" },
  { value: "orange", label: "برتقالي" },
  { value: "yellow", label: "أصفر" },
  { value: "purple", label: "بنفسجي" },
  { value: "other", label: "أخرى" },
] as const;

export const YEAR_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 1970 + 2 },
  (_, i) => {
    const year = new Date().getFullYear() + 1 - i;
    return { value: year.toString(), label: year.toString() };
  }
);

export const PRICE_RANGES = [
  { value: "0-25000", label: "أقل من 25,000 د.ل", min: 0, max: 25000 },
  { value: "25000-50000", label: "25,000 - 50,000 د.ل", min: 25000, max: 50000 },
  { value: "50000-100000", label: "50,000 - 100,000 د.ل", min: 50000, max: 100000 },
  { value: "100000-200000", label: "100,000 - 200,000 د.ل", min: 100000, max: 200000 },
  { value: "200000+", label: "أكثر من 200,000 د.ل", min: 200000, max: Infinity },
] as const;
