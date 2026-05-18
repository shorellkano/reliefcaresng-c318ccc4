import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Heart, Baby, UserCheck, Sparkles, Brush, ChefHat, Home, Users, ArrowRight,
  Bandage, Brain, HandHeart, Activity, Building2, Apple, Footprints, Smile } from "lucide-react";

const search = z.object({ tab: z.enum(["care", "domestic"]).optional().default("care") });

export const Route = createFileRoute("/services")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Our Services | Relief Care Support Services" },
      { name: "description", content: "Caregivers, nannies, elderly care, wound care, palliative care, hospital sitting, housekeepers, cleaners, cooks and domestic staff across Nigeria." },
      { property: "og:title", content: "Our Services | Relief Care Support Services" },
      { property: "og:description", content: "Care giving and domestic staffing services across Nigeria." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const CARE = [
  { icon: UserCheck, title: "Caregivers", desc: "Trained professionals who attend to personal care, hygiene, and companionship in your home.", tone: "blue" },
  { icon: Baby, title: "Nannies and Babysitters", desc: "Loving, screened nannies for newborns, toddlers and older children.", tone: "amber" },
  { icon: Heart, title: "Elderly Care Support", desc: "Patient, kind support for older loved ones who deserve dignity and warmth.", tone: "orange" },
  { icon: Bandage, title: "Wound Care", desc: "Trained attendants for dressing, hygiene and monitoring of healing wounds at home.", tone: "blue" },
  { icon: Brain, title: "Counseling and Therapy", desc: "Compassionate emotional support and structured therapy sessions for individuals and families.", tone: "amber" },
  { icon: HandHeart, title: "Palliative Care", desc: "Dignified, gentle care for patients managing serious illness, focused on comfort and presence.", tone: "orange" },
  { icon: Activity, title: "Physical Therapy Assistance", desc: "Support with mobility exercises and recovery routines under professional guidance.", tone: "blue" },
  { icon: Building2, title: "Hospital Sitting", desc: "Reliable companions for hospital stays, helping with daily needs and family updates.", tone: "amber" },
  { icon: Apple, title: "Nutrition and Meal Planning", desc: "Thoughtful, balanced meal plans tailored to medical needs and personal preferences.", tone: "orange" },
  { icon: Footprints, title: "Errands and Escort", desc: "Trusted help with shopping, appointments and accompanied outings for safety and ease.", tone: "blue" },
  { icon: Smile, title: "Childcare Basics", desc: "Foundational childcare support including feeding, play and routine management.", tone: "amber" },
];
const DOM = [
  { icon: Sparkles, title: "Housekeepers", desc: "Reliable housekeepers who keep your home running with care and discretion.", tone: "blue" },
  { icon: Brush, title: "Cleaners", desc: "Detailed cleaning routines, deep cleans and tidy-ups on schedules that work for you.", tone: "orange" },
  { icon: ChefHat, title: "Cooks", desc: "Nigerian and continental cuisine prepared with hygiene and craft.", tone: "amber" },
  { icon: Home, title: "Live-in and Live-out Staff", desc: "Flexible arrangements designed around your household rhythm.", tone: "blue" },
  { icon: Users, title: "General Recruitment", desc: "Need something specific? We source, vet and place to your brief.", tone: "amber" },
];

const TONES: Record<string, string> = {
  blue: "bg-primary/10 text-primary border-primary/20",
  amber: "bg-amber/15 text-orange border-amber/30",
  orange: "bg-orange/10 text-orange border-orange/20",
};

function Services() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const items = tab === "care" ? CARE : DOM;

  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Our services</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Two phases, one promise.</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">From bedside care to a sparkling kitchen, we place the right person in the right home.</p>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center -translate-y-6">
            <div className="inline-flex bg-card shadow-xl rounded-full p-1.5 border border-border">
              <button onClick={() => navigate({ search: { tab: "care" } })}
                className={`px-6 sm:px-8 py-3 rounded-full font-display text-base sm:text-lg transition ${tab === "care" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}>
                Care Giving
              </button>
              <button onClick={() => navigate({ search: { tab: "domestic" } })}
                className={`px-6 sm:px-8 py-3 rounded-full font-display text-base sm:text-lg transition ${tab === "domestic" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}>
                Domestic Workers
              </button>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s, i) => (
              <article key={s.title} className={`reveal rounded-3xl border p-7 hover:-translate-y-1 transition ${TONES[s.tone]} ${i % 3 === 1 ? "lg:translate-y-8" : ""}`}>
                <div className="h-14 w-14 rounded-2xl bg-card flex items-center justify-center shadow-sm">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl mt-5 text-foreground">{s.title}</h3>
                <p className="mt-3 text-foreground/75 text-sm leading-relaxed">{s.desc}</p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-bold text-sm">
                  Enquire about this service <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <Link to="/work-plans" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-bold shadow hover:shadow-xl transition">
              See our work plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
