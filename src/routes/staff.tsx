import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Our People | Relief Care Support Services" },
      { name: "description", content: "Meet the vetted, trained staff at Relief Care Support Services. Browse caregivers, nannies, housekeepers, cooks and more across Nigeria." },
      { property: "og:title", content: "Our People" },
      { property: "og:description", content: "Vetted domestic staff and caregivers." },
      { property: "og:url", content: "/staff" },
    ],
    links: [{ rel: "canonical", href: "/staff" }],
  }),
  component: StaffList,
});

type Staff = { id: string; full_name: string; job_role: string; photo_url: string | null; years_experience: number | null; available: boolean };

function StaffList() {
  const [list, setList] = useState<Staff[]>([]);
  useEffect(() => {
    supabase.from("staff_profiles").select("id, full_name, job_role, photo_url, years_experience, available").order("display_order")
      .then(({ data }) => setList(data ?? []));
  }, []);

  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Our People</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">The team behind every placement.</h1>
          <p className="mt-5 text-foreground/75 max-w-2xl mx-auto text-lg">Every member of our team is vetted, trained, and placed with care.</p>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((s, i) => (
              <article key={s.id} className={`reveal bg-card rounded-3xl shadow-md hover:shadow-xl overflow-hidden ${i % 3 === 1 ? "lg:translate-y-6" : ""}`}>
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={s.photo_url ?? ""} alt={s.full_name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                  <span className={`absolute top-4 right-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${s.available ? "bg-amber text-amber-foreground" : "bg-foreground/70 text-white"}`}>
                    {s.available ? "Available" : "Currently Placed"}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-display text-2xl text-primary">{s.full_name}</p>
                  <p className="text-orange font-semibold">{s.job_role}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.years_experience} years of experience</p>
                  <Link to="/staff/$id" params={{ id: s.id }} className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:text-orange">
                    View Full Profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {list.length === 0 && <p className="text-center text-muted-foreground py-20">Loading staff...</p>}
        </div>
      </section>
    </Layout>
  );
}
