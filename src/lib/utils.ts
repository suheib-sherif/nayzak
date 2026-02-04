import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-LY", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " د.ل";
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ar-LY").format(num);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("ar-LY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatMileage(mileage: number): string {
  return formatNumber(mileage) + " كم";
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
