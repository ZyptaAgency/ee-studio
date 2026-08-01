import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, ATTACHMENT_BUCKET } from "@/lib/supabase";

const MAX_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
];

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Stockage non configuré" }, { status: 503 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non pris en charge" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 15 Mo)" }, { status: 400 });
    }

    // Ensure the bucket exists (public so the admin can open the link).
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    if (!buckets?.some((b) => b.name === ATTACHMENT_BUCKET)) {
      await supabaseAdmin.storage.createBucket(ATTACHMENT_BUCKET, { public: true });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-60);
    const path = `${crypto.randomUUID()}-${safeName}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabaseAdmin.storage
      .from(ATTACHMENT_BUCKET)
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Storage upload error", error);
      return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(ATTACHMENT_BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, name: file.name });
  } catch (e) {
    console.error("Attachment error", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
