import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Briefcase, BedDouble, Coins, MessageCircle, ArrowRight } from "lucide-react";

type Vacancy = {
  id: string; title: string; location: string; work_type: string;
  salary: string | null; accommodation: boolean; description: string;
  requirements: string | null; status: string;
};

export const Route = createFileRoute("/vacancies")({
  head: () => ({
    meta: [
      { title: "Job Vacancies | Relief Care Support Services" },
      { name: "description", content: "Browse current domestic worker and caregiver job openings at Relief Care Support Services. Apply for nanny, housekeeper, caregiver, and cook positions across Lagos and Nigeria." },
      { property: "og:title", content: "Job Vacancies — Relief Care" },
      { property: "og:description", content: "Current domestic and caregiver job openings across Nigeria." },
      { property: "og:url", content: "/vacancies" },
    ],
    links: [{ rel: "canonical", href: "/vacancies" }],
  }),
  component: Vacancies,
});

function Vacancies() {
  const [list, setList] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("vacancies").select("*").order("display_order").then(({ data }) => {
      setList((data ?? []) as Vacancy[]); setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Vacancies</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Work With Families Who Need You</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">Browse our current openings and apply directly. New roles are posted regularly.</p>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {loading && <p className="text-center text-muted-foreground py-16">Loading vacancies...</p>}

          {!loading && list.length === 0 && (
            <div className="bg-card rounded-3xl shadow-lg p-10 text-center max-w-2xl mx-auto reveal">
              <p className="font-display text-2xl text-primary">No vacancies listed at the moment.</p>
              <p className="mt-3 text-foreground/70">Check back soon or send your CV to us on WhatsApp and we will contact you when a suitable role becomes available.</p>
              <a href="https://wa.me/2349090336443?text=Hello%2C%20I%20would%20like%20to%20submit%20my%20CV%20for%20future%20opportunities." target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-6 py-3 font-bold transition">
                <MessageCircle className="h-4 w-4" /> Send CV on WhatsApp
              </a>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {list.map((v, i) => {
              const filled = v.status === "filled";
              const waMsg = encodeURIComponent(`Hello, I would like to apply for the ${v.title} position in ${v.location}.`);
              return (
                <article key={v.id} className={`reveal rounded-3xl border-2 p-7 transition ${
                  filled ? "bg-muted/40 border-border opacity-70" : "bg-card border-primary/15 hover:-translate-y-1 hover:shadow-xl"
                } ${i % 2 === 1 ? "lg:translate-y-6" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="font-display text-2xl lg:text-3xl text-primary">{v.title}</h2>
                    {filled ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground/60 px-3 py-1 text-xs font-bold uppercase">Position Filled</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber text-amber-foreground px-3 py-1 text-xs font-bold uppercase">{v.work_type}</span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/75">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-orange" />{v.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-orange" />{v.work_type}</span>
                    {v.salary && <span className="inline-flex items-center gap-1.5"><Coins className="h-4 w-4 text-orange" />{v.salary}</span>}
                    <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-orange" />{v.accommodation ? "Accommodation Provided" : "No Accommodation"}</span>
                  </div>
                  <p className="mt-4 text-foreground/80 text-sm leading-relaxed">{v.description}</p>
                  {v.requirements && (
                    <p className="mt-3 text-sm text-foreground/70"><span className="font-bold text-primary">Requirements: </span>{v.requirements}</p>
                  )}
                  {!filled && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={`https://wa.me/2349090336443?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-5 py-2.5 text-sm font-bold transition">
                        <MessageCircle className="h-4 w-4" /> Apply via WhatsApp
                      </a>
                      <Link to="/apply" className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 text-sm font-bold transition">
                        Apply Online <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
