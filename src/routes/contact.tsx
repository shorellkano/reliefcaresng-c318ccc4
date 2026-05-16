import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Relief Care Support Services" },
      { name: "description", content: "Reach Relief Care Support Services in Lagos. Call, WhatsApp, email or visit us at Suite 12 Veteran Plaza, Herbert Macaulay Way, YABATECH Back Gate." },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Get in touch with Relief Care Support Services." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.currentTarget);
    await supabase.from("contact_messages").insert({
      full_name: String(f.get("full_name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      email: String(f.get("email") ?? ""),
      subject: String(f.get("subject") ?? ""),
      message: String(f.get("message") ?? ""),
    });
    setBusy(false); setDone(true);
  }

  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-14">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Contact</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">Get in touch.</h1>
          <p className="mt-5 text-foreground/75 max-w-2xl mx-auto text-lg">
            We respond to every enquiry within 24 hours. Call, message us on WhatsApp or send us a note below.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            {done ? (
              <div className="bg-card rounded-3xl shadow-xl p-10 text-center reveal">
                <CheckCircle2 className="h-14 w-14 text-orange mx-auto" />
                <h2 className="font-display text-3xl text-primary mt-4">Message sent.</h2>
                <p className="mt-3 text-foreground/75">Thank you. We will be in touch shortly.</p>
              </div>
            ) : (
            <form onSubmit={onSubmit} className="bg-card rounded-3xl shadow-xl p-6 sm:p-10 space-y-5 reveal">
              <Field label="Full Name" name="full_name" required />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Email Address" name="email" type="email" />
              </div>
              <Field label="Subject" name="subject" />
              <label className="block">
                <span className="block text-sm font-bold text-primary mb-1.5">Message *</span>
                <textarea name="message" rows={5} required
                  className="w-full rounded-xl border border-border bg-input/40 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
              </label>
              <button disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-4 font-bold shadow hover:shadow-xl transition disabled:opacity-60">
                {busy ? "Sending..." : "Send Message"}
              </button>
            </form>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-deep-blue text-white rounded-3xl p-8 reveal">
              <h2 className="font-display text-2xl text-amber">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-amber shrink-0 mt-0.5" /><span>Suite 12 Veteran Plaza, Herbert Macaulay Way, By YABATECH Back Gate Staff Quarters, Lagos State.</span></li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-amber" /><a href="tel:+2349090336443">+234 909 033 6443</a></li>
                <li className="flex gap-3"><MessageCircle className="h-5 w-5 text-amber" /><a href="https://wa.me/2349090336443" target="_blank" rel="noopener noreferrer">WhatsApp +234 909 033 6443</a></li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-amber" /><a href="mailto:info@reliefcaresupport.com.ng">info@reliefcaresupport.com.ng</a></li>
                <li className="flex gap-3"><Instagram className="h-5 w-5 text-amber" /><a href="https://www.instagram.com/reliefcaredomestic" target="_blank" rel="noopener noreferrer">@reliefcaredomestic</a></li>
                <li className="flex gap-3"><Instagram className="h-5 w-5 text-amber" /><a href="https://www.instagram.com/reliefcaresupport" target="_blank" rel="noopener noreferrer">@reliefcaresupport</a></li>
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md reveal">
              <iframe
                title="Relief Care location"
                src="https://www.google.com/maps?q=Yaba+Lagos+Nigeria&output=embed"
                className="w-full h-64 border-0" loading="lazy"
              />
            </div>
          </aside>
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
