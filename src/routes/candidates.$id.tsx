import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, MapPin, Briefcase, Languages, ArrowLeft } from "lucide-react";

type Candidate = {
  id: string; full_name: string; job_role: string; years_experience: number | null;
  languages: string | null; location: string | null; preferred_job_type: string | null;
  skills: string | null; bio: string | null; photo_url: string | null; available: boolean;
};

export const Route = createFileRoute("/candidates/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Candidate Profile | Relief Care Support Services` },
      { name: "description", content: "View the profile of a verified candidate available for placement through Relief Care Support Services." },
      { property: "og:url", content: `/candidates/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `/candidates/${params.id}` }],
  }),
  component: Profile,
});

function Profile() {
  const { id } = Route.useParams();
  const [c, setC] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("candidates").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      setC(data as Candidate | null); setLoading(false);
    });
  }, [id]);

  if (loading) return <Layout><p className="text-center py-32 text-muted-foreground">Loading...</p></Layout>;
  if (!c) return (
    <Layout>
      <section className="py-32 text-center px-6">
        <h1 className="font-display text-4xl text-primary">Candidate not found</h1>
        <Link to="/candidates" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold">
          <ArrowLeft className="h-4 w-4" /> Back to all candidates
        </Link>
      </section>
    </Layout>
  );

  const skills = c.skills ? c.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const waMsg = encodeURIComponent(`Hello, I would like to enquire about ${c.full_name} (${c.job_role}).`);

  return (
    <Layout>
      <section className="bg-ivory-texture py-12">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 reveal">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] bg-muted">
              {c.photo_url ? <img src={c.photo_url} alt={c.full_name} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-muted-foreground">No photo</div>}
            </div>
          </div>
          <div className="lg:col-span-3 reveal">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${c.available ? "bg-[oklch(0.85_0.12_150)] text-[oklch(0.30_0.12_150)]" : "bg-amber/30 text-orange"}`}>
              {c.available ? "Available Now" : "Recently Placed"}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">{c.full_name}</h1>
            <p className="mt-2 text-xl text-orange font-semibold">{c.job_role}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <Info icon={<Briefcase className="h-4 w-4" />} label="Experience" value={`${c.years_experience ?? 0} years`} />
              {c.location && <Info icon={<MapPin className="h-4 w-4" />} label="Location" value={c.location} />}
              {c.languages && <Info icon={<Languages className="h-4 w-4" />} label="Languages" value={c.languages} />}
              {c.preferred_job_type && <Info icon={<Briefcase className="h-4 w-4" />} label="Preferred Job Type" value={c.preferred_job_type} />}
            </div>

            {skills.length > 0 && (
              <div className="mt-6">
                <p className="text-sm uppercase tracking-widest text-orange">Key Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((s) => <span key={s} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">{s}</span>)}
                </div>
              </div>
            )}

            {c.bio && (
              <div className="mt-6">
                <p className="text-sm uppercase tracking-widest text-orange">About</p>
                <p className="mt-2 text-foreground/80 leading-relaxed italic">{c.bio}</p>
              </div>
            )}

            <a href={`https://wa.me/2349090336443?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-7 py-3.5 font-bold transition shadow-lg">
              <MessageCircle className="h-5 w-5" /> Enquire About This Candidate
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <p className="text-xs uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">{icon} {label}</p>
      <p className="mt-1 font-bold text-foreground">{value}</p>
    </div>
  );
}
