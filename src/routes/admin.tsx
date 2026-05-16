import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, LogOut, Save, X } from "lucide-react";

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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
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
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) return setErr(error.message);
      // First user becomes admin via self-grant if no admins exist yet
      if (data.user) {
        const { count } = await supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
        if (!count) await supabase.from("user_roles").insert({ user_id: data.user.id, role: "admin" });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
    }
  }

  if (authed === null) return <Layout hideWhatsApp><p className="text-center py-32 text-muted-foreground">Loading...</p></Layout>;

  if (!authed) {
    return (
      <Layout hideWhatsApp>
        <section className="py-24 bg-ivory-texture min-h-[70vh]">
          <form onSubmit={onAuth} className="max-w-md mx-auto bg-card rounded-3xl shadow-2xl p-8 space-y-5">
            <h1 className="font-display text-3xl text-primary">Admin {mode === "signin" ? "sign in" : "sign up"}</h1>
            <p className="text-sm text-muted-foreground">Manage staff profiles, availability and content.</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required
              className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required minLength={6}
              className="w-full rounded-xl border border-border bg-input/40 px-4 py-3" />
            {err && <p className="text-destructive text-sm">{err}</p>}
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-bold">
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-primary underline w-full">
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
            <p className="text-xs text-muted-foreground text-center">The first account created automatically becomes the admin.</p>
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

function AdminPanel() {
  const [list, setList] = useState<Staff[]>([]);
  const [editing, setEditing] = useState<StaffForm & { id?: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.from("staff_profiles").select("*").order("display_order");
    setList((data ?? []) as Staff[]);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const payload = { ...editing };
    let res;
    if (editing.id) {
      const { id, ...rest } = payload;
      res = await supabase.from("staff_profiles").update(rest).eq("id", id);
    } else {
      const { id: _id, ...rest } = payload;
      res = await supabase.from("staff_profiles").insert(rest);
    }
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
    <Layout hideWhatsApp>
      <section className="py-12 bg-ivory-texture min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display text-4xl text-primary">Staff Admin</h1>
              <p className="text-sm text-muted-foreground">Add, edit and toggle availability.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing({ ...EMPTY })} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-bold">
                <Plus className="h-4 w-4" /> New profile
              </button>
              <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-bold">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
        </div>
      </section>

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
    </Layout>
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
