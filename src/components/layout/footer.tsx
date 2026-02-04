import Link from "next/link";
import { Car, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">نيزك</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              أكبر سوق للسيارات الجديدة والمستعملة في ليبيا. ابحث عن سيارتك المثالية الآن.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              روابط سريعة
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 transition-colors hover:text-primary-600"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-sm text-gray-500 transition-colors hover:text-primary-600"
                >
                  تصفح السيارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              تواصل معنا
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                طرابلس، ليبيا
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+218 91 234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                info@nayzak.ly
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} نيزك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
