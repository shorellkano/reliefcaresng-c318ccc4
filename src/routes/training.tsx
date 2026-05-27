import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { sendFormNotification } from "@/lib/notify.functions";
import { GraduationCap, CheckCircle2, MessageCircle, BookOpen, ShieldCheck, Heart, Baby, UserCheck } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Caregiver and Domestic Worker Training | Relief Care Support Services" },
      { name: "description", content: "Enroll in professional caregiver and domestic worker training programs. Learn elderly care, childcare, wound care awareness and professional conduct in Lagos." },
      { property: "og:title", content: "Training Programs — Relief Care" },
      { property: "og:description", content: "Build the skills to thrive as a caregiver or domestic worker." },
      { property: "og:url", content: "/training" },
    ],
    links: [{ rel: "canonical", href: "/training" }],
  }),
  component: Training,
});

const PROGRAMS = [
  { icon: Heart, title: "Caregiver Training", desc: "A comprehensive program covering basic nursing skills, patient hygiene, wound dressing awareness, medication reminders, emotional support, and care documentation. Suitable for individuals who want to work with elderly or ill patients in home settings.", format: "In-person, Lagos" },
  { icon: BookOpen, title: "Domestic Worker Orientation", desc: "Covers the fundamentals of professional home management including cleaning standards, laundry and ironing, kitchen hygiene, household organization, and understanding employer expectations.", format: "In-person, Lagos" },
  { icon: ShieldCheck, title: "Professional Conduct Training", desc: "Trains domestic workers and caregivers in workplace etiquette, communication, punctuality, confidentiality, handling conflict, and building trust with employers and families.", format: "In-person or virtual" },
  { icon: Baby, title: "Childcare Basics", desc: "Covers child development stages, age-appropriate activities, safe handling of infants, school preparation support, feeding and nutrition basics, and emergency first aid for children.", format: "In-person, Lagos" },
  { icon: UserCheck, title: "Elderly Care Assistance", desc: "Teaches mobility assistance techniques, companionship and mental health support for the elderly, daily routine management, medication awareness, and communication with family members and medical professionals.", format: "In-person, Lagos" },
];

function Training() {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Training</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Build Skills. Build a Career.</h1>
          <p className="mt-5 text-foreground/70 max-w-3xl mx-auto text-lg">Our training programs are designed to equip individuals with the practical and professional skills needed to thrive as caregivers and domestic workers.</p>
          <p className="mt-4 text-foreground/65 max-w-3xl mx-auto">Whether you are new to domestic work or looking to upgrade your skills, Relief Care Support Services offers structured training programs that prepare you for real-world placements. Completing our training increases your chances of getting matched with a family quickly.</p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          {PROGRAMS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.title} className={`reveal grid lg:grid-cols-5 gap-6 items-center bg-card rounded-3xl shadow-lg overflow-hidden`}>
                <div className={`lg:col-span-2 bg-blue-warm text-white p-10 h-full flex items-center justify-center ${flip ? "lg:order-last" : ""}`}>
                  <div className="text-center">
                    <p.icon className="h-16 w-16 mx-auto text-amber" />
                    <p className="mt-3 text-xs uppercase tracking-widest text-amber/90">Program {i + 1}</p>
                  </div>
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <h3 className="font-display text-3xl text-primary">{p.title}</h3>
                  <p className="mt-3 text-foreground/80 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 bg-amber/15 text-orange rounded-full px-3 py-1.5 font-bold"><GraduationCap className="h-4 w-4" /> Certificate provided</span>
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1.5 font-bold">Format: {p.format}</span>
                    <span className="inline-flex items-center gap-1.5 bg-muted text-foreground/70 rounded-full px-3 py-1.5">Duration: TBA</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <EnquirySection />
    </Layout>
  );
}

function EnquirySection() {
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
      email: String(f.get("email") ?? ""),
      program: String(f.get("program") ?? ""),
      message: String(f.get("message") ?? ""),
    };
    const { error } = await supabase.from("training_enquiries").insert(payload);
    if (error) { console.error("training submit", error); setErr("Submission failed. Please check your details and try again."); setBusy(false); return; }
    try {
      await sendFormNotification({ data: { kind: "contact", subject: `Training enquiry: ${payload.program || "general"}`, fields: payload } });
    } catch {}
    setBusy(false); setDone(true);
  }

  return (
    <section className="bg-deep-blue text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center reveal">
          <h2 className="font-display text-4xl lg:text-5xl">Ready to enroll or want to know more?</h2>
          <p className="mt-3 text-white/75">Reach out and our team will guide you through the next cohort.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/2349090336443?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Relief%20Care%20training%20programs." target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-6 py-3 font-bold transition">
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-12 bg-card text-foreground rounded-3xl shadow-2xl p-8 space-y-4">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 className="h-14 w-14 mx-auto text-[oklch(0.65_0.18_150)]" />
              <p className="font-display text-2xl text-primary mt-4">Enquiry received.</p>
              <p className="mt-2 text-foreground/70">Our training team will reach out shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-2xl text-primary">Fill an enquiry form</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field name="full_name" label="Full Name" required />
                <Field name="phone" label="Phone Number" type="tel" required />
                <Field name="email" label="Email" type="email" />
                <div>
                  <label className="block text-sm font-bold text-primary mb-1">Program of Interest</label>
                  <select name="program" required className="w-full rounded-xl border border-border bg-input/40 px-4 py-3">
                    <option value="">Select a program</option>
                    {PROGRAMS.map((p) => <option key={p.title}>{p.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-1">Message</label>
                <textarea name="message" rows={4} className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" placeholder="Tell us a little about yourself and any questions you have." />
              </div>
              {err && <p className="text-destructive text-sm">{err}</p>}
              <button disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-bold disabled:opacity-60">
                {busy ? "Sending..." : "Submit enquiry"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-bold text-primary mb-1">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" />
    </div>
  );
}
