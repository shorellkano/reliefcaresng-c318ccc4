import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { CalendarDays, CalendarRange, Clock, Home, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/work-plans")({
  head: () => ({
    meta: [
      { title: "Flexible Work Plans | Hire Domestic Staff by the Day, Week, or Month — Relief Care" },
      { name: "description", content: "Relief Care offers flexible domestic staffing arrangements including daily, weekly, hourly, live-in, and live-out options to suit every household in Lagos and across Nigeria." },
      { property: "og:title", content: "Work Plans — Relief Care" },
      { property: "og:description", content: "Daily, weekly, hourly, live-in and live-out staffing arrangements." },
      { property: "og:url", content: "/work-plans" },
    ],
    links: [{ rel: "canonical", href: "/work-plans" }],
  }),
  component: WorkPlans,
});

const PLANS = [
  { icon: CalendarDays, title: "Daily Workers", desc: "Need help for a day? Our daily domestic workers are available for one-off or recurring daily assignments including cleaning, cooking, or childcare support." },
  { icon: CalendarRange, title: "Weekly Workers", desc: "Hire staff for a specific number of days per week on a recurring basis. Ideal for households that need regular support without a full-time live-in arrangement." },
  { icon: Clock, title: "Hourly Workers", desc: "Our hourly service is perfect for short-term tasks, post-event cleaning, or additional support during busy periods. Book by the hour with flexible scheduling." },
  { icon: Home, title: "Live-in Workers", desc: "A dedicated domestic staff member who resides with your household and is available around the clock. Ideal for families with young children, the elderly, or high-support needs." },
  { icon: Briefcase, title: "Live-out Workers", desc: "Staff who work at your home during agreed hours and return to their own residence afterward. A cost-effective option for households that need consistent daily help without accommodation requirements." },
];

function WorkPlans() {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Work Plans</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">We Work Around Your Schedule</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">Every household is different. Choose the arrangement that works best for you.</p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANS.map((p, i) => (
            <article key={p.title} className={`reveal rounded-3xl p-8 shadow-lg hover:-translate-y-1 transition ${
              i % 3 === 0 ? "bg-blue-warm text-white" : i % 3 === 1 ? "bg-amber-warm text-amber-foreground" : "bg-card border-2 border-primary/15"
            } ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}>
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                i % 3 === 0 ? "bg-white/15" : i % 3 === 1 ? "bg-primary/15" : "bg-amber/20"
              }`}>
                <p.icon className={`h-7 w-7 ${i % 3 === 0 ? "text-amber" : i % 3 === 1 ? "text-primary" : "text-orange"}`} />
              </div>
              <h3 className="font-display text-2xl mt-5">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-deep-blue text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <h2 className="font-display text-4xl lg:text-5xl">Tell us what you need</h2>
          <p className="mt-4 text-white/75">Send us a brief and we will match a candidate to your schedule.</p>
          <Link to="/hire" className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber text-amber-foreground px-7 py-3.5 font-bold shadow hover:shadow-xl transition">
            Hire a Worker <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
