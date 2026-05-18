import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

type Candidate = {
  id: string; full_name: string; job_role: string; years_experience: number | null;
  languages: string | null; location: string | null; photo_url: string | null; available: boolean;
};

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: "Available Candidates | Relief Care Support Services" },
      { name: "description", content: "Browse vetted and approved domestic workers and caregivers ready for placement with families across Nigeria." },
      { property: "og:title", content: "Available Candidates — Relief Care" },
      { property: "og:description", content: "Verified, trained and approved candidates ready for placement." },
      { property: "og:url", content: "/candidates" },
    ],
    links: [{ rel: "canonical", href: "/candidates" }],
  }),
  component: Candidates,
});

function Candidates() {
  const [list, setList] = useState<Candidate[]>([]);
  const [role, setRole] = useState("");
  const [loc, setLoc] = useState("");
  useEffect(() => {
    supabase.from("candidates").select("id, full_name, job_role, years_experience, languages, location, photo_url, available").order("display_order")
      .then(({ data }) => setList((data ?? []) as Candidate[]));
  }, []);

  const roles = useMemo(() => [...new Set(list.map((c) => c.job_role))], [list]);
  const locs = useMemo(() => [...new Set(list.map((c) => c.location).filter(Boolean) as string[])], [list]);
  const filtered = list.filter((c) => (!role || c.job_role === role) && (!loc || c.location === loc));

  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Available Candidates</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Available Candidates</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">Every candidate listed here has been verified, trained, and approved by Relief Care Support Services. Click a profile to learn more.</p>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-card rounded-2xl shadow-md p-4 flex flex-wrap gap-3 -translate-y-6">
            <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-full border border-border bg-input/40 px-4 py-2.5 text-sm">
              <option value="">All roles</option>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select value={loc} onChange={(e) => setLoc(e.target.value)} className="rounded-full border border-border bg-input/40 px-4 py-2.5 text-sm">
              <option value="">All locations</option>
              {locs.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <Link to="/candidates/$id" params={{ id: c.id }} key={c.id}
                className={`reveal group bg-card rounded-3xl shadow-md hover:shadow-2xl overflow-hidden hover:-translate-y-1 transition ${i % 3 === 1 ? "lg:translate-y-6" : ""}`}>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  {c.photo_url ? (
                    <img src={c.photo_url} alt={c.full_name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-muted-foreground">No photo</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xl text-primary">{c.full_name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.available ? "bg-[oklch(0.85_0.12_150)] text-[oklch(0.30_0.12_150)]" : "bg-amber/30 text-orange"}`}>
                      {c.available ? "Available Now" : "Recently Placed"}
                    </span>
                  </div>
                  <p className="text-sm text-orange font-semibold mt-0.5">{c.job_role}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-foreground/65">
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{c.years_experience ?? 0} yrs</span>
                    {c.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>}
                  </div>
                  {c.languages && <p className="mt-2 text-xs text-foreground/60">Languages: {c.languages}</p>}
                  <span className="mt-4 inline-flex text-sm font-bold text-primary group-hover:text-orange">
                    View Full Profile <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No candidates match your filters right now. Try clearing them or check back soon.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
