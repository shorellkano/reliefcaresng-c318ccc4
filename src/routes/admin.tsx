import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, LogOut, Save, X, Mail, Briefcase, MessageSquare, Users, Megaphone, GraduationCap, UserCheck } from "lucide-react";



export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Relief Care Support Services" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

type Staff = {
  id: string;
  full_name: string;
  age: number | null;
  gender: string | null;
  state_of_origin: string | null;
  job_role: string;
  years_experience: number | null;
  duration_with_company: string | null;
  bio: string | null;
  skills: string | null;
  photo_url: string | null;
  available: boolean;
  display_order: number;
};
type StaffForm = Omit<Staff, "id">;

const EMPTY: StaffForm = {
  full_name: "", age: null, gender: "", state_of_origin: "",
  job_role: "", years_experience: 0, duration_with_company: "",
  bio: "", skills: "", photo_url: "", available: true, display_order: 0,
};

function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
      if (session) checkAdmin(session.user.id);
    });
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      if (data.session) checkAdmin(data.session.user.id);
    });
    return () => sub.data.subscription.unsubscribe();
  }, []);

  async function checkAdmin(uid: string) {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
  }

  async function onAuth(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const normalized = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithPassword({ email: normalized, password });
    if (error) setErr("Invalid email or password.");
  }

  if (authed === null) return <Layout hideWhatsApp><p className="text-center py-32 text-muted-foreground">Loading...</p></Layout>;

  if (!authed) {
    return (
      <Layout hideWhatsApp>
        <section className="py-16 bg-ivory-texture min-h-[70vh]">
          <form onSubmit={onAuth} className="max-w-md mx-auto bg-card rounded-3xl shadow-2xl p-8 space-y-5">
            <h1 className="font-display text-3xl text-primary">Admin sign in</h1>
            <p className="text-sm text-muted-foreground">Access restricted to authorised administrators. Accounts are provisioned manually.</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required
              className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required minLength={6}
              className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" />
            {err && <p className="text-destructive text-sm">{err}</p>}
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-bold">
              Sign in
            </button>
          </form>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout hideWhatsApp>
        <div className="py-24 text-center">
          <h1 className="font-display text-3xl text-primary">No admin access</h1>
          <p className="mt-3 text-muted-foreground">Your account does not have admin privileges.</p>
          <button onClick={() => supabase.auth.signOut()} className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-2 font-bold">Sign out</button>
        </div>
      </Layout>
    );
  }

  return <AdminPanel />;
}

type Tab = "hire" | "apply" | "contact" | "staff" | "adverts" | "vacancies" | "candidates" | "training";

function AdminPanel() {
  const [tab, setTab] = useState<Tab>("hire");

  return (
    <Layout hideWhatsApp>
      <section className="py-10 bg-ivory-texture min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display text-4xl text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">All form submissions and content management.</p>
            </div>
            <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-bold">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-border">
            <TabBtn active={tab === "hire"} onClick={() => setTab("hire")} icon={<Briefcase className="h-4 w-4" />}>Hire requests</TabBtn>
            <TabBtn active={tab === "apply"} onClick={() => setTab("apply")} icon={<Mail className="h-4 w-4" />}>Applications</TabBtn>
            <TabBtn active={tab === "contact"} onClick={() => setTab("contact")} icon={<MessageSquare className="h-4 w-4" />}>Messages</TabBtn>
            <TabBtn active={tab === "training"} onClick={() => setTab("training")} icon={<GraduationCap className="h-4 w-4" />}>Training</TabBtn>
            <TabBtn active={tab === "staff"} onClick={() => setTab("staff")} icon={<Users className="h-4 w-4" />}>Staff</TabBtn>
            <TabBtn active={tab === "candidates"} onClick={() => setTab("candidates")} icon={<UserCheck className="h-4 w-4" />}>Candidates</TabBtn>
            <TabBtn active={tab === "vacancies"} onClick={() => setTab("vacancies")} icon={<Briefcase className="h-4 w-4" />}>Vacancies</TabBtn>
            <TabBtn active={tab === "adverts"} onClick={() => setTab("adverts")} icon={<Megaphone className="h-4 w-4" />}>Adverts</TabBtn>
          </div>

          <div className="mt-6">
            {tab === "hire" && <HireList />}
            {tab === "apply" && <ApplyList />}
            {tab === "contact" && <ContactList />}
            {tab === "training" && <TrainingList />}
            {tab === "staff" && <StaffManager />}
            {tab === "candidates" && <CandidatesManager />}
            {tab === "vacancies" && <VacanciesManager />}
            {tab === "adverts" && <AdvertsManager />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-lg transition ${
        active ? "bg-card text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-primary"
      }`}>
      {icon}{children}
    </button>
  );
}

function fmtDate(s: string) { return new Date(s).toLocaleString(); }

function HireList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("hire_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <div className="space-y-3">
      {rows.length === 0 && <Empty label="No hire requests yet." />}
      {rows.map((r) => (
        <details key={r.id} className="bg-card rounded-xl shadow-sm p-4">
          <summary className="cursor-pointer flex flex-wrap gap-2 items-center justify-between">
            <div>
              <p className="font-bold text-primary">{r.full_name}</p>
              <p className="text-xs text-muted-foreground">{r.staff_type} · {r.phone}</p>
            </div>
            <span className="text-xs text-muted-foreground">{fmtDate(r.created_at)}</span>
          </summary>
          <dl className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
            <KV k="Email" v={r.email} /><KV k="WhatsApp" v={r.whatsapp} />
            <KV k="Address" v={r.home_address} /><KV k="Live preference" v={r.live_preference} />
            <KV k="Number of staff" v={r.number_of_staff} /><KV k="Start date" v={r.preferred_start_date} />
            <KV k="Heard about us" v={r.hear_about_us} />
            <KV k="Requirements" v={r.requirements} full />
          </dl>
        </details>
      ))}
    </div>
  );
}

function ApplyList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("job_applications").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <div className="space-y-3">
      {rows.length === 0 && <Empty label="No job applications yet." />}
      {rows.map((r) => (
        <details key={r.id} className="bg-card rounded-xl shadow-sm p-4">
          <summary className="cursor-pointer flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              {r.photo_url && <img src={r.photo_url} alt="" className="h-12 w-12 rounded-full object-cover" />}
              <div>
                <p className="font-bold text-primary">{r.full_name}</p>
                <p className="text-xs text-muted-foreground">{r.job_category} · {r.phone}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{fmtDate(r.created_at)}</span>
          </summary>
          <dl className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
            <KV k="Email" v={r.email} /><KV k="DOB" v={r.date_of_birth} />
            <KV k="Age" v={r.age} /><KV k="Gender" v={r.gender} />
            <KV k="State of origin" v={r.state_of_origin} /><KV k="Years experience" v={r.years_experience} />
            <KV k="Address" v={r.home_address} full />
            <KV k="Work history" v={r.work_history} full />
            <KV k="Certifications" v={r.certifications} full />
            <KV k="Statement" v={r.personal_statement} full />
            {r.id_url && <KV k="ID" v={<a href={r.id_url} target="_blank" rel="noreferrer" className="text-primary underline">View ID document</a>} full />}
          </dl>
        </details>
      ))}
    </div>
  );
}

function ContactList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <div className="space-y-3">
      {rows.length === 0 && <Empty label="No contact messages yet." />}
      {rows.map((r) => (
        <div key={r.id} className="bg-card rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-bold text-primary">{r.full_name} <span className="text-xs font-normal text-muted-foreground">· {r.subject}</span></p>
              <p className="text-xs text-muted-foreground">{r.email} · {r.phone}</p>
            </div>
            <span className="text-xs text-muted-foreground">{fmtDate(r.created_at)}</span>
          </div>
          <p className="mt-2 text-sm whitespace-pre-wrap text-foreground/85">{r.message}</p>
        </div>
      ))}
    </div>
  );
}

function KV({ k, v, full }: { k: string; v: any; full?: boolean }) {
  if (v == null || v === "") return null;
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
      <dd className="text-sm text-foreground/90 break-words">{v}</dd>
    </div>
  );
}
function Empty({ label }: { label: string }) { return <p className="text-center text-muted-foreground py-12">{label}</p>; }

function StaffManager() {
  const [list, setList] = useState<Staff[]>([]);
  const [editing, setEditing] = useState<(StaffForm & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.from("staff_profiles").select("*").order("display_order");
    setList((data ?? []) as Staff[]);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const { id, ...rest } = editing;
    const res = id
      ? await supabase.from("staff_profiles").update(rest).eq("id", id)
      : await supabase.from("staff_profiles").insert(rest);
    setBusy(false);
    if (res.error) return alert(res.error.message);
    setEditing(null); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this staff profile?")) return;
    const { error } = await supabase.from("staff_profiles").delete().eq("id", id);
    if (error) return alert(error.message);
    load();
  }

  async function toggle(s: Staff) {
    await supabase.from("staff_profiles").update({ available: !s.available }).eq("id", s.id);
    load();
  }

  async function uploadPhoto(file: File) {
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from("staff-photos").upload(path, file, { upsert: true });
    if (error) { alert(error.message); return; }
    const { data } = supabase.storage.from("staff-photos").getPublicUrl(path);
    setEditing((p) => p ? { ...p, photo_url: data.publicUrl } : p);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing({ ...EMPTY })} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-bold">
          <Plus className="h-4 w-4" /> New profile
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((s) => (
          <div key={s.id} className="bg-card rounded-2xl shadow p-4 flex gap-4">
            <img src={s.photo_url ?? ""} alt="" className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-primary truncate">{s.full_name}</p>
              <p className="text-xs text-orange font-semibold">{s.job_role}</p>
              <button onClick={() => toggle(s)} className={`mt-1 text-xs px-2 py-0.5 rounded-full ${s.available ? "bg-amber text-amber-foreground" : "bg-muted text-foreground"}`}>
                {s.available ? "Available" : "Currently Placed"}
              </button>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setEditing({ ...s })} className="text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(s.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-card rounded-3xl shadow-2xl max-w-2xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl text-primary">{editing.id ? "Edit profile" : "New profile"}</h2>
              <button onClick={() => setEditing(null)}><X /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={editing.full_name} onChange={(v) => setEditing({ ...editing, full_name: v })} />
              <Input label="Job Role" value={editing.job_role} onChange={(v) => setEditing({ ...editing, job_role: v })} />
              <Input label="Age" type="number" value={String(editing.age ?? "")} onChange={(v) => setEditing({ ...editing, age: v ? Number(v) : null })} />
              <Input label="Years of Experience" type="number" value={String(editing.years_experience ?? "")} onChange={(v) => setEditing({ ...editing, years_experience: v ? Number(v) : null })} />
              <Input label="Gender" value={editing.gender ?? ""} onChange={(v) => setEditing({ ...editing, gender: v })} />
              <Input label="State of Origin" value={editing.state_of_origin ?? ""} onChange={(v) => setEditing({ ...editing, state_of_origin: v })} />
              <Input label="Duration with Company" value={editing.duration_with_company ?? ""} onChange={(v) => setEditing({ ...editing, duration_with_company: v })} />
              <Input label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) || 0 })} />
            </div>
            <Textarea label="Skills" value={editing.skills ?? ""} onChange={(v) => setEditing({ ...editing, skills: v })} />
            <Textarea label="Bio" rows={4} value={editing.bio ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} />
            <div className="mt-4">
              <label className="block text-sm font-bold text-primary mb-1">Photo</label>
              {editing.photo_url && <img src={editing.photo_url} alt="" className="h-24 w-24 rounded-lg object-cover mb-2" />}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
              <input type="text" value={editing.photo_url ?? ""} onChange={(e) => setEditing({ ...editing, photo_url: e.target.value })}
                placeholder="Or paste photo URL" className="mt-2 w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-sm" />
            </div>
            <label className="mt-4 inline-flex items-center gap-2">
              <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} className="accent-primary" />
              <span className="text-sm font-semibold">Available</span>
            </label>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="rounded-full px-5 py-2 border border-border font-bold">Cancel</button>
              <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 font-bold">
                <Save className="h-4 w-4" /> {busy ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input(p: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-primary mb-1">{p.label}</span>
      <input type={p.type ?? "text"} value={p.value} onChange={(e) => p.onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-sm" />
    </label>
  );
}
function Textarea(p: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block mt-4">
      <span className="block text-xs font-bold text-primary mb-1">{p.label}</span>
      <textarea rows={p.rows ?? 2} value={p.value} onChange={(e) => p.onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-sm" />
    </label>
  );
}

/* ---------- Training enquiries ---------- */
function TrainingList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("training_enquiries").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <div className="space-y-3">
      {rows.length === 0 && <Empty label="No training enquiries yet." />}
      {rows.map((r) => (
        <div key={r.id} className="bg-card rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-bold text-primary">{r.full_name} <span className="text-xs font-normal text-muted-foreground">· {r.program ?? "General"}</span></p>
              <p className="text-xs text-muted-foreground">{r.email} · {r.phone}</p>
            </div>
            <span className="text-xs text-muted-foreground">{fmtDate(r.created_at)}</span>
          </div>
          {r.message && <p className="mt-2 text-sm whitespace-pre-wrap text-foreground/85">{r.message}</p>}
        </div>
      ))}
    </div>
  );
}

/* ---------- Adverts manager ---------- */
type Advert = { id: string; category: string; title: string; description: string; link_url: string | null; visible: boolean; display_order: number };
const EMPTY_AD: Omit<Advert, "id"> = { category: "COMPANY NEWS", title: "", description: "", link_url: "", visible: true, display_order: 0 };

function AdvertsManager() {
  const [list, setList] = useState<Advert[]>([]);
  const [editing, setEditing] = useState<(Omit<Advert, "id"> & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.from("adverts").select("*").order("display_order");
    setList((data ?? []) as Advert[]);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const { id, ...rest } = editing;
    const res = id ? await supabase.from("adverts").update(rest).eq("id", id) : await supabase.from("adverts").insert(rest);
    setBusy(false);
    if (res.error) return alert(res.error.message);
    setEditing(null); load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this advert?")) return;
    const { error } = await supabase.from("adverts").delete().eq("id", id);
    if (error) return alert(error.message); load();
  }
  async function toggle(a: Advert) {
    await supabase.from("adverts").update({ visible: !a.visible }).eq("id", a.id); load();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing({ ...EMPTY_AD })} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-bold">
          <Plus className="h-4 w-4" /> New advert
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((a) => (
          <div key={a.id} className="bg-card rounded-2xl shadow p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-amber/30 text-orange px-2 py-0.5 rounded-full">{a.category}</span>
                <p className="font-display text-lg text-primary mt-2">{a.title}</p>
                <p className="text-sm text-foreground/75 mt-1">{a.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing({ ...a })} className="text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(a.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <button onClick={() => toggle(a)} className={`mt-3 text-xs px-2 py-0.5 rounded-full ${a.visible ? "bg-amber text-amber-foreground" : "bg-muted text-foreground"}`}>
              {a.visible ? "Visible" : "Hidden"}
            </button>
          </div>
        ))}
      </div>
      {editing && (
        <Modal title={editing.id ? "Edit advert" : "New advert"} onClose={() => setEditing(null)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
            <Input label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) || 0 })} />
            <div className="sm:col-span-2"><Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} /></div>
            <div className="sm:col-span-2"><Input label="Link URL (optional)" value={editing.link_url ?? ""} onChange={(v) => setEditing({ ...editing, link_url: v })} /></div>
          </div>
          <Textarea label="Description" rows={4} value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
          <label className="mt-4 inline-flex items-center gap-2">
            <input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="accent-primary" />
            <span className="text-sm font-semibold">Visible on home page</span>
          </label>
          <ModalActions onCancel={() => setEditing(null)} onSave={save} busy={busy} />
        </Modal>
      )}
    </div>
  );
}

/* ---------- Vacancies manager ---------- */
type Vacancy = { id: string; title: string; location: string; work_type: string; salary: string | null; accommodation: boolean; description: string; requirements: string | null; status: string; display_order: number };
const EMPTY_VAC: Omit<Vacancy, "id"> = { title: "", location: "", work_type: "Live-in", salary: "", accommodation: false, description: "", requirements: "", status: "active", display_order: 0 };

function VacanciesManager() {
  const [list, setList] = useState<Vacancy[]>([]);
  const [editing, setEditing] = useState<(Omit<Vacancy, "id"> & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() { const { data } = await supabase.from("vacancies").select("*").order("display_order"); setList((data ?? []) as Vacancy[]); }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const { id, ...rest } = editing;
    const res = id ? await supabase.from("vacancies").update(rest).eq("id", id) : await supabase.from("vacancies").insert(rest);
    setBusy(false);
    if (res.error) return alert(res.error.message);
    setEditing(null); load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this vacancy?")) return;
    const { error } = await supabase.from("vacancies").delete().eq("id", id);
    if (error) return alert(error.message); load();
  }
  async function setStatus(v: Vacancy, status: string) {
    await supabase.from("vacancies").update({ status }).eq("id", v.id); load();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing({ ...EMPTY_VAC })} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-bold">
          <Plus className="h-4 w-4" /> New vacancy
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((v) => (
          <div key={v.id} className="bg-card rounded-2xl shadow p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-lg text-primary">{v.title}</p>
                <p className="text-xs text-orange font-semibold uppercase tracking-wide">{v.work_type} · {v.location}</p>
                {v.salary && <p className="text-xs text-muted-foreground mt-1">{v.salary}</p>}
                <p className="text-sm text-foreground/75 mt-2 line-clamp-3">{v.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing({ ...v })} className="text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(v.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {["active", "filled", "closed"].map((s) => (
                <button key={s} onClick={() => setStatus(v, s)} className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${v.status === s ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-amber/40"}`}>{s}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Modal title={editing.id ? "Edit vacancy" : "New vacancy"} onClose={() => setEditing(null)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Input label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <Input label="Work Type" value={editing.work_type} onChange={(v) => setEditing({ ...editing, work_type: v })} />
            <Input label="Salary" value={editing.salary ?? ""} onChange={(v) => setEditing({ ...editing, salary: v })} />
            <Input label="Status" value={editing.status} onChange={(v) => setEditing({ ...editing, status: v })} />
            <Input label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) || 0 })} />
          </div>
          <Textarea label="Description" rows={4} value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
          <Textarea label="Requirements" rows={3} value={editing.requirements ?? ""} onChange={(v) => setEditing({ ...editing, requirements: v })} />
          <label className="mt-4 inline-flex items-center gap-2">
            <input type="checkbox" checked={editing.accommodation} onChange={(e) => setEditing({ ...editing, accommodation: e.target.checked })} className="accent-primary" />
            <span className="text-sm font-semibold">Accommodation provided</span>
          </label>
          <ModalActions onCancel={() => setEditing(null)} onSave={save} busy={busy} />
        </Modal>
      )}
    </div>
  );
}

/* ---------- Candidates manager ---------- */
type Candidate = { id: string; full_name: string; job_role: string; years_experience: number | null; languages: string | null; location: string | null; preferred_job_type: string | null; skills: string | null; bio: string | null; photo_url: string | null; available: boolean; display_order: number };
const EMPTY_CAND: Omit<Candidate, "id"> = { full_name: "", job_role: "", years_experience: 0, languages: "", location: "", preferred_job_type: "", skills: "", bio: "", photo_url: "", available: true, display_order: 0 };

function CandidatesManager() {
  const [list, setList] = useState<Candidate[]>([]);
  const [editing, setEditing] = useState<(Omit<Candidate, "id"> & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() { const { data } = await supabase.from("candidates").select("*").order("display_order"); setList((data ?? []) as Candidate[]); }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const { id, ...rest } = editing;
    const res = id ? await supabase.from("candidates").update(rest).eq("id", id) : await supabase.from("candidates").insert(rest);
    setBusy(false);
    if (res.error) return alert(res.error.message);
    setEditing(null); load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this candidate?")) return;
    const { error } = await supabase.from("candidates").delete().eq("id", id);
    if (error) return alert(error.message); load();
  }
  async function toggle(c: Candidate) { await supabase.from("candidates").update({ available: !c.available }).eq("id", c.id); load(); }

  async function uploadPhoto(file: File) {
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from("staff-photos").upload(path, file, { upsert: true });
    if (error) { alert(error.message); return; }
    const { data } = supabase.storage.from("staff-photos").getPublicUrl(path);
    setEditing((p) => p ? { ...p, photo_url: data.publicUrl } : p);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing({ ...EMPTY_CAND })} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-bold">
          <Plus className="h-4 w-4" /> New candidate
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((c) => (
          <div key={c.id} className="bg-card rounded-2xl shadow p-4 flex gap-4">
            <img src={c.photo_url ?? ""} alt="" className="h-20 w-20 rounded-xl object-cover bg-muted" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-primary truncate">{c.full_name}</p>
              <p className="text-xs text-orange font-semibold">{c.job_role}</p>
              <p className="text-xs text-muted-foreground">{c.years_experience ?? 0} yrs · {c.location ?? "—"}</p>
              <button onClick={() => toggle(c)} className={`mt-1 text-xs px-2 py-0.5 rounded-full ${c.available ? "bg-[oklch(0.85_0.12_150)] text-[oklch(0.30_0.12_150)]" : "bg-muted text-foreground"}`}>
                {c.available ? "Available" : "Placed"}
              </button>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setEditing({ ...c })} className="text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(c.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Modal title={editing.id ? "Edit candidate" : "New candidate"} onClose={() => setEditing(null)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={editing.full_name} onChange={(v) => setEditing({ ...editing, full_name: v })} />
            <Input label="Job Role" value={editing.job_role} onChange={(v) => setEditing({ ...editing, job_role: v })} />
            <Input label="Years of Experience" type="number" value={String(editing.years_experience ?? "")} onChange={(v) => setEditing({ ...editing, years_experience: v ? Number(v) : null })} />
            <Input label="Location" value={editing.location ?? ""} onChange={(v) => setEditing({ ...editing, location: v })} />
            <Input label="Languages" value={editing.languages ?? ""} onChange={(v) => setEditing({ ...editing, languages: v })} />
            <Input label="Preferred Job Type" value={editing.preferred_job_type ?? ""} onChange={(v) => setEditing({ ...editing, preferred_job_type: v })} />
            <Input label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) || 0 })} />
          </div>
          <Textarea label="Skills (comma separated)" value={editing.skills ?? ""} onChange={(v) => setEditing({ ...editing, skills: v })} />
          <Textarea label="Bio" rows={4} value={editing.bio ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} />
          <div className="mt-4">
            <label className="block text-sm font-bold text-primary mb-1">Photo</label>
            {editing.photo_url && <img src={editing.photo_url} alt="" className="h-24 w-24 rounded-lg object-cover mb-2" />}
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
            <input type="text" value={editing.photo_url ?? ""} onChange={(e) => setEditing({ ...editing, photo_url: e.target.value })}
              placeholder="Or paste photo URL" className="mt-2 w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-sm" />
          </div>
          <label className="mt-4 inline-flex items-center gap-2">
            <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} className="accent-primary" />
            <span className="text-sm font-semibold">Available now</span>
          </label>
          <ModalActions onCancel={() => setEditing(null)} onSave={save} busy={busy} />
        </Modal>
      )}
    </div>
  );
}

/* ---------- Shared modal pieces ---------- */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-card rounded-3xl shadow-2xl max-w-2xl w-full p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl text-primary">{title}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function ModalActions({ onCancel, onSave, busy }: { onCancel: () => void; onSave: () => void; busy: boolean }) {
  return (
    <div className="mt-6 flex gap-3 justify-end">
      <button onClick={onCancel} className="rounded-full px-5 py-2 border border-border font-bold">Cancel</button>
      <button onClick={onSave} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 font-bold">
        <Save className="h-4 w-4" /> {busy ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
