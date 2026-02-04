"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteCarButtonProps {
  carId: string;
  carTitle: string;
}

export function DeleteCarButton({ carId, carTitle }: DeleteCarButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`هل أنت متأكد من حذف "${carTitle}"؟`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "فشل حذف السيارة");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("حدث خطأ أثناء حذف السيارة");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
