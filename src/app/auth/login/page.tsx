import { Suspense } from "react";
import { Metadata } from "next";
import { Car } from "lucide-react";
import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";

export const metadata: Metadata = {
  title: "تسجيل الدخول - نيزك",
  description: "تسجيل الدخول إلى لوحة تحكم نيزك",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Car className="h-8 w-8 text-primary-600" />
          </div>
          <CardTitle className="text-2xl">نيزك</CardTitle>
          <CardDescription>تسجيل الدخول إلى لوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>جاري التحميل...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
