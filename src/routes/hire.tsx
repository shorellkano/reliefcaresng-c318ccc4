import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sendFormNotification } from "@/lib/notify.functions";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire a Worker | Relief Care Support Services" },
      { name: "description", content: "Tell us what your home needs and we will match you with a vetted, professionally trained domestic worker or caregiver within 24 hours." },
      { property: "og:title", content: "Hire a Worker" },
      { property: "og:description", content: "Find the right help for your home." },
      { property: "og:url", content: "/hire" },
    ],
    links: [{ rel: "canonical", href: "/hire" }],
  }),
  component: Hire,
});

const TYPES = ["Caregiver","Nanny/Babysitter","Housekeeper","Cleaner","Cook","Elderly Care Support","Live-in Staff","Live-out Staff","General Domestic Worker"];
const HEAR = ["WhatsApp","Instagram","Google","Referral","Other"];

function Hire() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const f = new FormData(e.currentTarget);
    const payload = {
      full_name: String(f.get("full_name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      whatsapp: String(f.get("whatsapp") ?? ""),
      email: String(f.get("email") ?? ""),
      home_address: String(f.get("address") ?? ""),
      staff_type: String(f.get("type") ?? ""),
      live_preference: String(f.get("live") ?? ""),
      number_of_staff: f.get("count") ? Number(f.get("count")) : null,
      requirements: String(f.get("notes") ?? ""),
      preferred_start_date: f.get("start") ? String(f.get("start")) : null,
      hear_about_us: String(f.get("hear") ?? ""),
    };
    const { error } = await supabase.from("hire_requests").insert(payload);
    if (!error) {
      sendFormNotification({ data: { kind: "hire", subject: `New Hire Request — ${payload.full_name}`, fields: payload } }).catch(() => {});
    }
    setBusy(false);
    if (error) { console.error("hire submit", error); setErr("Submission failed. Please check your details and try again."); return; }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-14">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Hire</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">Find the right help for your home.</h1>
          <p className="mt-5 text-foreground/75 max-w-2xl mx-auto text-lg">
            Tell us what you need and we will match you with a vetted, professionally trained domestic worker or caregiver. Our team gets in touch within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {done ? (
            <div className="bg-card rounded-3xl shadow-xl p-10 text-center reveal">
              <CheckCircle2 className="h-14 w-14 text-orange mx-auto" />
              <h2 className="font-display text-3xl text-primary mt-4">Enquiry received.</h2>
              <p className="mt-3 text-foreground/75">Thank you. We will reach out within 24 hours with the next steps.</p>
            </div>
          ) : (
          <form onSubmit={onSubmit} className="bg-card rounded-3xl shadow-xl p-6 sm:p-10 space-y-5 reveal">
            <Field label="Full Name" name="full_name" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="WhatsApp Number" name="whatsapp" type="tel" />
            </div>
            <Field label="Email Address" name="email" type="email" />
            <Field label="Home Address" name="address" />
            <Select label="Type of Staff Needed" name="type" options={TYPES} required />
            <fieldset>
              <legend className="text-sm font-bold text-primary mb-2">Live-in or Live-out preference</legend>
              <div className="flex flex-wrap gap-4">
                {["Live-in","Live-out","Either"].map((o) => (
                  <label key={o} className="inline-flex items-center gap-2 text-sm">
                    <input type="radio" name="live" value={o} className="accent-primary" /> {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Number of staff needed" name="count" type="number" />
              <Field label="Preferred start date" name="start" type="date" />
            </div>
            <Area label="Specific requirements or special needs" name="notes" />
            <Select label="How did you hear about us" name="hear" options={HEAR} />
            {err && <p className="text-destructive text-sm">{err}</p>}
            <button disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-4 font-bold shadow hover:shadow-xl disabled:opacity-60 transition">
              {busy ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
          )}
        </div>
      </section>
    </Layout>
  );
}

function Field(p: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-primary mb-1.5">{p.label}{p.required && " *"}</span>
      <input name={p.name} type={p.type ?? "text"} required={p.required}
        className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
function Area(p: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-primary mb-1.5">{p.label}</span>
      <textarea name={p.name} rows={3}
        className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
function Select(p: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-primary mb-1.5">{p.label}{p.required && " *"}</span>
      <select name={p.name} required={p.required}
        className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40">
        <option value="">Select...</option>
        {p.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
