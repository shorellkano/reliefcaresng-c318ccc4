import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TO = ["reliefcare@zohomail.com", "info@reliefcaresupport.com.ng"];
const FROM = "Relief Care Website <onboarding@resend.dev>";

const schema = z.object({
  kind: z.enum(["hire", "apply", "contact"]),
  subject: z.string().min(1).max(200),
  fields: z.record(z.string(), z.union([z.string(), z.number(), z.null()])),
});

function renderHtml(kind: string, fields: Record<string, unknown>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== null && v !== "" && v !== undefined)
    .map(([k, v]) => {
      const label = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const safe = String(v).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
      return `<tr><td style="padding:8px 12px;font-weight:700;background:#f8f5f0;border-bottom:1px solid #eee;vertical-align:top;width:200px">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${safe}</td></tr>`;
    }).join("");
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
    <div style="background:#1A3FA0;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
      <h2 style="margin:0;font-size:20px">New ${kind} submission</h2>
      <p style="margin:6px 0 0;color:#F5A623;font-size:13px">Relief Care Support Services</p>
    </div>
    <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px">${rows}</table>
  </div>`;
}

export const sendFormNotification = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { ok: false, error: "missing_key" };
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: FROM,
          to: TO,
          subject: data.subject,
          html: renderHtml(data.kind, data.fields),
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        console.error("Resend error", res.status, t);
        return { ok: false, error: t };
      }
      return { ok: true };
    } catch (e) {
      console.error("Resend exception", e);
      return { ok: false, error: String(e) };
    }
  });
