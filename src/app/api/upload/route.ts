import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "خدمة التخزين غير متاحة" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "الملف مطلوب" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف غير مدعوم" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "حجم الملف يجب أن يكون أقل من 5 ميجابايت" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}-${randomString}.${extension}`;
    const filePath = `cars/${filename}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "فشل رفع الصورة" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء رفع الصورة" },
      { status: 500 }
    );
  }
}
