import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, MapPin, Briefcase, Calendar, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/staff/$id")({
  head: ({ params }) => ({
    meta: [
      { title: "Staff Profile | Relief Care Support Services" },
      { name: "description", content: "View the profile of a vetted Relief Care staff member." },
      { property: "og:url", content: `/staff/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `/staff/${params.id}` }],
  }),
  component: StaffProfile,
  notFoundComponent: () => (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-5xl text-primary">Profile not found</h1>
        <Link to="/staff" className="mt-6 inline-flex text-primary font-bold">Back to all staff</Link>
      </div>
    </Layout>
  ),
  errorComponent: () => (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-5xl text-primary">Could not load profile</h1>
        <Link to="/staff" className="mt-6 inline-flex text-primary font-bold">Back to all staff</Link>
      </div>
    </Layout>
  ),
});

type Staff = {
  id: string; full_name: string; age: number | null; gender: string | null;
  state_of_origin: string | null; job_role: string;
  years_experience: number | null; duration_with_company: string | null;
  bio: string | null; skills: string | null; photo_url: string | null; available: boolean;
};

function StaffProfile() {
  const { id } = Route.useParams();
  const [s, setS] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("staff_profiles").select("*").eq("id", id).maybeSingle()
      .then(({ data }) => { setS(data as Staff | null); setLoading(false); });
  }, [id]);

  if (loading) return <Layout><p className="text-center py-32 text-muted-foreground">Loading...</p></Layout>;
  if (!s) throw notFound();

  return (
    <Layout>
      <section className="bg-ivory-texture py-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div className="reveal relative">
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-amber/30 rounded-full blur-3xl" />
            <img src={s.photo_url ?? ""} alt={s.full_name} className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/5]" />
          </div>
          <div className="reveal">
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${s.available ? "bg-amber text-amber-foreground" : "bg-foreground/70 text-white"}`}>
              {s.available ? "Available" : "Currently Placed"}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">{s.full_name}</h1>
            <p className="text-orange font-bold text-lg mt-1">{s.job_role}</p>

            <dl className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <Detail icon={Calendar} label="Age" value={s.age?.toString()} />
              <Detail icon={Briefcase} label="Years of experience" value={`${s.years_experience ?? 0} years`} />
              <Detail icon={MapPin} label="State of origin" value={s.state_of_origin} />
              <Detail icon={Briefcase} label="With Relief Care" value={s.duration_with_company} />
            </dl>

            {s.bio && (
              <>
                <p className="mt-8 text-orange uppercase tracking-widest text-xs font-bold">In their words</p>
                <p className="mt-2 font-display italic text-xl text-foreground/85 leading-relaxed">{s.bio}</p>
              </>
            )}

            {s.skills && (
              <>
                <p className="mt-6 text-orange uppercase tracking-widest text-xs font-bold">Skills</p>
                <p className="mt-2 text-foreground/80">{s.skills}</p>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/hire" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary-dark transition">
                Enquire about this staff <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`https://wa.me/2349090336443?text=${encodeURIComponent(`Hello, I am interested in ${s.full_name} (${s.job_role}).`)}`} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] text-white px-6 py-3 font-bold hover:bg-[oklch(0.58_0.18_150)] transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-orange mt-0.5" />
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="font-semibold text-foreground">{value}</dd>
      </div>
    </div>
  );
}
