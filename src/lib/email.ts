import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Expéditeur : nécessite un domaine vérifié dans Resend pour envoyer à des tiers.
// Par défaut on utilise l'adresse de test Resend (envoi possible vers l'email du compte).
const FROM = process.env.RESEND_FROM || "EE Studio <onboarding@resend.dev>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "contact@ee-studio.info";

type BookingPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  date?: string | null;
  time?: string | null;
  message?: string | null;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
};

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:8px 16px;color:#f5f5f0;font-size:14px;font-weight:500">${value}</td>
  </tr>`;
}

export async function sendBookingNotification(b: BookingPayload) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY manquant — notification ignorée");
    return { skipped: true };
  }

  const html = `
  <div style="background:#0a0a0a;padding:32px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:520px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06)">
        <p style="margin:0;color:#A8D8C8;font-size:11px;letter-spacing:2px;text-transform:uppercase">Nouvelle demande</p>
        <h1 style="margin:6px 0 0;color:#f5f5f0;font-size:20px">Nouveau rendez-vous reçu</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:8px">
        ${row("Nom", b.name)}
        ${row("Email", `<a href="mailto:${b.email}" style="color:#A8D8C8;text-decoration:none">${b.email}</a>`)}
        ${b.phone ? row("Téléphone", `<a href="tel:${b.phone}" style="color:#A8D8C8;text-decoration:none">${b.phone}</a>`) : ""}
        ${b.company ? row("Entreprise", b.company) : ""}
        ${b.service ? row("Service", b.service) : ""}
        ${b.date ? row("Date", b.date) : ""}
        ${b.time ? row("Heure", b.time) : ""}
        ${b.message ? row("Message", b.message) : ""}
        ${b.attachmentUrl ? row("Pièce jointe", `<a href="${b.attachmentUrl}" style="color:#A8D8C8;text-decoration:none">${b.attachmentName || "Télécharger le PDF"}</a>`) : ""}
      </table>
      <div style="padding:20px 28px;border-top:1px solid rgba(255,255,255,0.06)">
        <a href="https://ee-studio.vercel.app/admin/rendez-vous"
           style="display:inline-block;background:#A8D8C8;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:600;padding:12px 24px;border-radius:999px">
          Voir dans le dashboard
        </a>
      </div>
    </div>
    <p style="text-align:center;color:#555;font-size:11px;margin-top:20px">EE Studio - Notification automatique</p>
  </div>`;

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: b.email,
      subject: b.service ? `Nouvelle demande - ${b.name} (${b.service})` : `Nouvelle demande - ${b.name}`,
      html,
    });
    if (result.error) {
      console.error("[email] Resend error", result.error);
      return { error: result.error };
    }
    return { id: result.data?.id };
  } catch (e) {
    console.error("[email] send failed", e);
    return { error: e };
  }
}

type ConfirmationPayload = {
  firstName: string;
  email: string;
  service?: string | null;
  date?: string | null;
  time?: string | null;
};

export async function sendBookingConfirmation(c: ConfirmationPayload) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY manquant — confirmation ignorée");
    return { skipped: true };
  }

  const details =
    c.date || c.time || c.service
      ? `<table style="width:100%;border-collapse:collapse;margin-top:16px">
          ${c.service ? row("Service", c.service) : ""}
          ${c.date ? row("Date", c.date) : ""}
          ${c.time ? row("Heure", c.time) : ""}
        </table>`
      : "";

  const html = `
  <div style="background:#0a0a0a;padding:32px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:520px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
      <div style="padding:28px 28px 8px">
        <p style="margin:0;color:#A8D8C8;font-size:11px;letter-spacing:2px;text-transform:uppercase">EE Studio</p>
        <h1 style="margin:8px 0 0;color:#f5f5f0;font-size:22px">Merci ${c.firstName} !</h1>
        <p style="color:#999;font-size:14px;line-height:1.7;margin-top:14px">
          Nous avons bien reçu ta demande. Notre équipe revient vers toi très vite pour confirmer les détails.
        </p>
      </div>
      <div style="padding:0 28px 8px">${details}</div>
      <div style="padding:16px 28px 28px">
        <p style="color:#999;font-size:14px;line-height:1.7;margin:0">
          Une question en attendant ? Réponds simplement à cet email ou écris-nous sur WhatsApp au
          <strong style="color:#f5f5f0">+243 837 317 990</strong>.
        </p>
      </div>
      <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.06)">
        <p style="margin:0;color:#A8D8C8;font-size:13px;font-weight:600">EE Studio</p>
        <p style="margin:4px 0 0;color:#666;font-size:12px">Stratégie. Création. Impact. — Kinshasa, RDC</p>
      </div>
    </div>
  </div>`;

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: c.email,
      replyTo: NOTIFY_TO,
      subject: "Nous avons bien reçu ta demande - EE Studio",
      html,
    });
    if (result.error) {
      console.error("[email] confirmation error", result.error);
      return { error: result.error };
    }
    return { id: result.data?.id };
  } catch (e) {
    console.error("[email] confirmation failed", e);
    return { error: e };
  }
}

export async function sendMagicLink(to: string, url: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY manquant — lien magique non envoyé");
    return { skipped: true };
  }

  const html = `
  <div style="background:#0a0a0a;padding:32px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:480px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden">
      <div style="padding:28px 28px 8px">
        <p style="margin:0;color:#A8D8C8;font-size:11px;letter-spacing:2px;text-transform:uppercase">EE Studio - Admin</p>
        <h1 style="margin:8px 0 0;color:#f5f5f0;font-size:20px">Connexion à ton dashboard</h1>
        <p style="color:#999;font-size:14px;line-height:1.6;margin-top:12px">
          Clique sur le bouton ci-dessous pour te connecter. Ce lien est valable <strong style="color:#f5f5f0">15 minutes</strong> et ne fonctionne qu'une fois.
        </p>
      </div>
      <div style="padding:12px 28px 28px">
        <a href="${url}"
           style="display:inline-block;background:#A8D8C8;color:#0a0a0a;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:999px">
          Se connecter au dashboard
        </a>
        <p style="color:#555;font-size:12px;margin-top:20px;line-height:1.5">
          Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.
        </p>
      </div>
    </div>
  </div>`;

  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject: "Ton lien de connexion - EE Studio",
      html,
    });
    if (result.error) {
      console.error("[email] magic link error", result.error);
      return { error: result.error };
    }
    return { id: result.data?.id };
  } catch (e) {
    console.error("[email] magic link failed", e);
    return { error: e };
  }
}
