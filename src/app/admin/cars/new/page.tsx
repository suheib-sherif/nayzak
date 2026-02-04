import { Metadata } from "next";
import { AdminHeader } from "@/components/layout";
import { CarForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "إضافة سيارة جديدة - نيزك",
};

export default function NewCarPage() {
  return (
    <>
      <AdminHeader
        title="إضافة سيارة جديدة"
        description="أضف إعلان سيارة جديد للموقع"
      />

      <div className="p-6">
        <CarForm />
      </div>
    </>
  );
}
