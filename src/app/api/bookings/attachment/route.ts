import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, ATTACHMENT_BUCKET } from "@/lib/supabase";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["application/pdf"];

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
      return NextResponse.json({ error: "Seuls les PDF sont acceptés" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
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
