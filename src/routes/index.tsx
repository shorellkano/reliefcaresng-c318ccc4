import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Home as HomeIcon, ShieldCheck, Sparkles, Quote, HandHeart } from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-care.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relief Care Support Services | Trusted Domestic Staff in Nigeria" },
      { name: "description", content: "Relief Care Support Services connects Nigerian families with vetted, professionally trained caregivers, nannies, housekeepers, cooks and domestic staff." },
      { property: "og:title", content: "Relief Care Support Services" },
      { property: "og:description", content: "Reliable hands for every home. Vetted domestic staff and caregivers across Nigeria." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

type Staff = { id: string; full_name: string; job_role: string; photo_url: string | null; years_experience: number | null };

function Index() {
  const [staff, setStaff] = useState<Staff[]>([]);
  useEffect(() => {
    supabase.from("staff_profiles").select("id, full_name, job_role, photo_url, years_experience").order("display_order").limit(6)
      .then(({ data }) => setStaff(data ?? []));
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative bg-ivory-texture overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center pt-14 pb-24 lg:py-28">
          <div className="lg:col-span-6 relative z-10">
            <p className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/20 text-amber-foreground text-xs font-bold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Lets give you a helping hand
            </p>
            <h1 className="animate-fade-up font-display text-5xl sm:text-6xl lg:text-7xl text-primary leading-[1.05] mt-5" style={{animationDelay:'.1s'}}>
              Reliable Hands<br />for Every <span className="italic text-orange">Home</span>
            </h1>
            <p className="animate-fade-up mt-6 text-lg text-foreground/75 max-w-xl" style={{animationDelay:'.2s'}}>
              Relief Care Support Services connects families and individuals across Nigeria with trusted, professionally trained domestic staff and caregivers.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-4" style={{animationDelay:'.3s'}}>
              <Link to="/hire" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition">
                Hire a Worker <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-full border-2 border-amber bg-transparent text-foreground px-7 py-3.5 font-bold hover:bg-amber hover:text-amber-foreground transition">
                Apply for a Job
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-amber/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-1">
              <img src={heroImg} alt="A caregiver helping an elderly woman in her home" width={1280} height={1280} className="w-full h-[28rem] lg:h-[34rem] object-cover" />
              <div className="absolute bottom-5 left-5 right-5 backdrop-blur bg-deep-blue/80 text-white rounded-2xl p-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber flex items-center justify-center text-amber-foreground">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-lg leading-tight">Placement in 48 to 72 hours</p>
                  <p className="text-xs text-white/70">Vetted, trained, ready to serve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-PHASE STRIP */}
      <section className="grid md:grid-cols-2">
        <Link to="/services" search={{ tab: "care" }} className="bg-blue-warm text-white p-10 lg:p-14 hover:brightness-110 transition reveal">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center"><Heart className="h-7 w-7 text-amber" /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-amber">Phase One</p>
              <h2 className="font-display text-3xl lg:text-4xl mt-1">Care Giving</h2>
              <p className="mt-3 text-white/85 max-w-md">Compassionate caregivers, trained nannies and elderly care professionals matched to your family with care.</p>
              <p className="mt-4 inline-flex items-center gap-2 font-semibold text-amber">Explore care giving <ArrowRight className="h-4 w-4" /></p>
            </div>
          </div>
        </Link>
        <Link to="/services" search={{ tab: "domestic" }} className="bg-amber-warm text-amber-foreground p-10 lg:p-14 hover:brightness-105 transition reveal">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center"><HomeIcon className="h-7 w-7 text-primary" /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Phase Two</p>
              <h2 className="font-display text-3xl lg:text-4xl mt-1">Domestic Workers</h2>
              <p className="mt-3 text-amber-foreground/85 max-w-md">Housekeepers, cleaners, cooks and live-in staff. Recruited, vetted and placed for households of every size.</p>
              <p className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">Explore domestic workers <ArrowRight className="h-4 w-4" /></p>
            </div>
          </div>
        </Link>
      </section>

      {/* WHY US */}
      <section className="bg-deep-blue text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 30% 30%, oklch(0.78 0.16 70 / 0.4), transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.66 0.16 50 / 0.3), transparent 40%)'}} />
        <div className="max-w-6xl mx-auto px-6 relative">
          <p className="text-amber uppercase tracking-widest text-sm reveal">Why Families Trust Us</p>
          <h2 className="font-display text-4xl lg:text-6xl mt-3 max-w-3xl reveal">Care that earns its place in your home.</h2>
          <div className="mt-14 grid md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              ["Thorough background checks", "On every staff member, every time, before placement."],
              ["Professional vetting and training", "We invest in skill, character and presentation."],
              ["Fast placement in 48 to 72 hours", "Because your family cannot wait when help is needed."],
              ["Ongoing support after placement", "We stay close long after the first day on the job."],
            ].map(([t, d], i) => (
              <div key={i} className="reveal">
                <ShieldCheck className="h-7 w-7 text-amber" />
                <p className="font-display text-2xl lg:text-3xl mt-3">{t}</p>
                <p className="mt-2 text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAFF PREVIEW */}
      <section className="py-24 bg-ivory-texture">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 reveal">
            <div>
              <p className="text-orange uppercase tracking-widest text-sm">Our People</p>
              <h2 className="font-display text-4xl lg:text-5xl text-primary mt-2">Meet some of our team</h2>
            </div>
            <Link to="/staff" className="font-semibold text-primary hover:text-orange inline-flex items-center gap-2">View all staff <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {staff.map((s) => (
              <div key={s.id} className="reveal min-w-[260px] sm:min-w-[300px] snap-start bg-card rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={s.photo_url ?? ""} alt={s.full_name} className="w-full h-full object-cover hover:scale-105 transition duration-700" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="font-display text-xl text-primary">{s.full_name}</p>
                  <p className="text-sm text-orange font-semibold">{s.job_role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.years_experience} years of experience</p>
                  <Link to="/staff/$id" params={{ id: s.id }} className="mt-4 inline-flex text-sm font-bold text-primary hover:text-orange">
                    View Profile <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL PREVIEW */}
      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-6 text-center reveal">
          <p className="text-orange uppercase tracking-widest text-sm">What Our Clients Say</p>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mt-2">Stories from real families.</h2>
          <Quote className="mx-auto mt-10 h-12 w-12 text-amber" />
          <p className="font-display italic text-2xl lg:text-3xl text-foreground/85 mt-6 leading-relaxed">
            Relief Care found us the perfect nanny within days. She has become part of our family.
          </p>
          <p className="mt-4 text-sm font-bold tracking-widest uppercase text-primary">Mrs. Adeyemi, Lagos</p>
          <Link to="/testimonials" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary-dark transition">
            Read more stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:'radial-gradient(circle at 20% 50%, oklch(0.78 0.16 70 / 0.5), transparent 40%)'}} />
        <div className="relative max-w-4xl mx-auto text-center px-6 reveal">
          <h2 className="font-display text-4xl lg:text-5xl">Ready to find the right help for your home?</h2>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/hire" className="rounded-full bg-amber text-amber-foreground px-8 py-3.5 font-bold shadow hover:shadow-xl transition">Hire a Worker</Link>
            <Link to="/apply" className="rounded-full border-2 border-white/60 px-8 py-3.5 font-bold hover:bg-white hover:text-primary transition">Apply for a Job</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
