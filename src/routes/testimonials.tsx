import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Relief Care Support Services" },
      { name: "description", content: "Stories from Nigerian families served by Relief Care Support Services. Real reviews from clients across Lagos, Abuja, Port Harcourt and Enugu." },
      { property: "og:title", content: "Testimonials" },
      { property: "og:description", content: "Stories from the families we serve." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

const ITEMS = [
  { quote: "Relief Care found us the perfect nanny within days. She has become part of our family.", who: "Mrs. Adeyemi", city: "Lagos", tone: "amber" },
  { quote: "Professional service from start to finish. Our housekeeper is wonderful and so reliable.", who: "Mr. Okafor", city: "Abuja", tone: "blue" },
  { quote: "I was nervous about hiring domestic staff but their vetting process gave me complete confidence.", who: "Mrs. Balogun", city: "Port Harcourt", tone: "orange" },
  { quote: "My elderly mother needed a caregiver and Relief Care matched us with someone exceptional.", who: "Dr. Nwosu", city: "Enugu", tone: "amber" },
];

const TONES: Record<string, string> = {
  amber: "bg-amber/15 text-amber-foreground",
  blue: "bg-primary/10 text-primary",
  orange: "bg-orange/10 text-orange",
};

function Testimonials() {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-14">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Testimonials</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">Stories from the families we serve.</h1>
        </div>
      </section>
      <section className="pb-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {ITEMS.map((t, i) => (
            <figure key={i} className={`reveal rounded-3xl p-8 lg:p-10 shadow-md ${TONES[t.tone]} ${i % 2 === 1 ? "md:translate-y-10" : ""}`}>
              <Quote className="h-10 w-10 opacity-70" />
              <blockquote className="font-display italic text-xl lg:text-2xl mt-4 leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold uppercase tracking-widest text-primary">{t.who}, {t.city}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  );
}
