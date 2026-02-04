"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">حدث خطأ</h1>
        <p className="mb-8 text-gray-500">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
        </p>
        <Button onClick={reset}>
          <RefreshCw className="ms-2 h-5 w-5" />
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
}
