import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Upload } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for a Job | Relief Care Support Services" },
      { name: "description", content: "Join Relief Care Support Services. Apply to be considered for placement as a caregiver, nanny, housekeeper, cook or domestic worker in Nigeria." },
      { property: "og:title", content: "Apply for a Job" },
      { property: "og:description", content: "Apply to join the Relief Care team." },
      { property: "og:url", content: "/apply" },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: Apply,
});

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

const CATS = ["Caregiver","Nanny/Babysitter","Housekeeper","Cleaner","Cook","Elderly Care Support","Live-in Domestic Staff","General Domestic Worker"];

function Apply() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function uploadFile(file: File | null, prefix: string) {
    if (!file) return null;
    const path = `${prefix}/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from("applications").upload(path, file);
    if (error) throw error;
    return path;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const f = new FormData(e.currentTarget);
    try {
      const photo = await uploadFile(f.get("photo") as File, "photos");
      const idDoc = await uploadFile(f.get("id_doc") as File, "ids");
      const { error } = await supabase.from("job_applications").insert({
        full_name: String(f.get("full_name") ?? ""),
        date_of_birth: f.get("date_of_birth") ? String(f.get("date_of_birth")) : null,
        age: f.get("age") ? Number(f.get("age")) : null,
        gender: String(f.get("gender") ?? ""),
        state_of_origin: String(f.get("state") ?? ""),
        phone: String(f.get("phone") ?? ""),
        email: String(f.get("email") ?? ""),
        home_address: String(f.get("address") ?? ""),
        years_experience: f.get("years") ? Number(f.get("years")) : null,
        job_category: String(f.get("category") ?? ""),
        work_history: String(f.get("history") ?? ""),
        certifications: String(f.get("certs") ?? ""),
        personal_statement: String(f.get("statement") ?? ""),
        photo_url: photo,
        id_url: idDoc,
      });
      if (error) throw error;
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setErr(msg);
    } finally { setBusy(false); }
  }

  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Careers</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">Join our team.</h1>
          <p className="mt-5 text-foreground/75 max-w-2xl mx-auto text-lg">
            Are you a skilled, experienced and reliable domestic worker or caregiver? We are always looking for professionals who share our values of trust, care and excellence.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {done ? (
            <div className="bg-card rounded-3xl shadow-xl p-10 text-center reveal">
              <CheckCircle2 className="h-14 w-14 text-orange mx-auto" />
              <h2 className="font-display text-3xl text-primary mt-4">Application received.</h2>
              <p className="mt-3 text-foreground/75">Thank you. Our team will review your application and reach out if there is a suitable placement.</p>
            </div>
          ) : (
          <form onSubmit={onSubmit} className="bg-card rounded-3xl shadow-xl p-6 sm:p-10 space-y-5 reveal">
            <Field label="Full Name" name="full_name" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Date of Birth" name="date_of_birth" type="date" required />
              <Field label="Age" name="age" type="number" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Select label="Gender" name="gender" options={["Male","Female"]} required />
              <Select label="State of Origin" name="state" options={STATES} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" />
            </div>
            <Field label="Home Address" name="address" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Years of Experience" name="years" type="number" />
              <Select label="Job Category" name="category" options={CATS} required />
            </div>
            <Area label="Previous Work History" name="history" />
            <Area label="Certifications or Training" name="certs" />
            <FileField label="Recent Passport Photograph" name="photo" accept="image/*" />
            <FileField label="Valid ID" name="id_doc" />
            <Area label="Tell us about yourself and why you want to work with Relief Care" name="statement" />
            {err && <p className="text-destructive text-sm">{err}</p>}
            <button disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-4 font-bold shadow hover:shadow-xl disabled:opacity-60 transition">
              {busy ? "Submitting..." : "Submit My Application"}
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
function FileField(p: { label: string; name: string; accept?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-primary mb-1.5">{p.label}</span>
      <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-amber/60 bg-amber/5 px-4 py-4">
        <Upload className="h-5 w-5 text-orange" />
        <input name={p.name} type="file" accept={p.accept} className="text-sm" />
      </div>
    </label>
  );
}
