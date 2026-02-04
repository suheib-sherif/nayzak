"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import { Button, Input } from "@/components/ui";
import { LogIn, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Input
        label="البريد الإلكتروني"
        type="email"
        placeholder="admin@nayzak.ly"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="كلمة المرور"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        <LogIn className="ms-2 h-5 w-5" />
        تسجيل الدخول
      </Button>
    </form>
  );
}
