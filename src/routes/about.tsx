import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Heart, Shield, Award, Users, Sparkles, Star } from "lucide-react";
import aboutImg from "@/assets/about-family.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Relief Care Support Services" },
      { name: "description", content: "Relief Care Support Services Limited is a trusted Nigerian recruitment and domestic staffing agency dedicated to connecting families with vetted, professional staff." },
      { property: "og:title", content: "About Us | Relief Care Support Services" },
      { property: "og:description", content: "Trusted recruitment and domestic staffing across Nigeria." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { icon: Shield, label: "Trust" },
  { icon: Heart, label: "Care" },
  { icon: Award, label: "Professionalism" },
  { icon: Users, label: "Reliability" },
  { icon: Star, label: "Excellence" },
  { icon: Sparkles, label: "Safety" },
];

function About() {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">About Us</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Relief Care Support<br/><span className="italic text-orange">Services Limited</span></h1>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-lg italic font-display">Lets give you a helping hand.</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal relative">
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-amber/30 rounded-full blur-3xl" />
            <img src={aboutImg} alt="Nanny holding a smiling child" width={1024} height={1024} loading="lazy" className="rounded-[2rem] shadow-2xl w-full object-cover" />
          </div>
          <div className="reveal">
            <p className="text-orange uppercase tracking-widest text-sm">Our story</p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary mt-2">Helping hands you can count on.</h2>
            <p className="mt-6 text-foreground/80 leading-relaxed text-lg">
              Relief Care Support Services Limited is a trusted recruitment and domestic staffing agency dedicated to connecting families and individuals with reliable, well-trained, and professional domestic workers.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed text-lg">
              We specialise in providing qualified caregivers and domestic staff to meet different household and personal care needs with professionalism, safety, and excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-deep-blue text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-amber uppercase tracking-widest text-sm reveal">Our values</p>
          <h2 className="font-display text-4xl lg:text-5xl mt-3 max-w-2xl reveal">Six commitments we live by.</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {VALUES.map((v) => (
              <div key={v.label} className="reveal flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-amber/20 flex items-center justify-center"><v.icon className="h-7 w-7 text-amber" /></div>
                <div>
                  <p className="font-display text-2xl">{v.label}</p>
                  <p className="text-white/60 text-sm mt-1">A non-negotiable in every placement we make.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-amber-warm text-amber-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-primary text-sm">Our mission</p>
          <p className="font-display text-3xl lg:text-4xl mt-4 leading-snug italic">
            To bring peace of mind to every Nigerian home by placing skilled, vetted and caring professionals where they are needed most.
          </p>
        </div>
      </section>
    </Layout>
  );
}
