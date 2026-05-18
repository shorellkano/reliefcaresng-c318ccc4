import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Phone, MapPin, Mail, ArrowLeft, Lock, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { WhatsAppWidget } from "./WhatsAppWidget";

type NavItem = { to: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: (NavItem | NavGroup)[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  {
    label: "For Clients",
    items: [
      { to: "/hire", label: "Hire a Worker" },
      { to: "/candidates", label: "Available Candidates" },
      { to: "/work-plans", label: "Work Plans" },
      { to: "/pay", label: "Pay Now" },
    ],
  },
  {
    label: "For Job Seekers",
    items: [
      { to: "/apply", label: "Apply for a Job" },
      { to: "/vacancies", label: "Vacancies" },
      { to: "/training", label: "Training" },
    ],
  },
  { to: "/staff", label: "Our People" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function isGroup(n: NavItem | NavGroup): n is NavGroup { return "items" in n; }

export function Layout({ children, hideWhatsApp = false }: { children: React.ReactNode; hideWhatsApp?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => { setOpen(false); setOpenGroup(null); });
    return unsub;
  }, [router]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  const showBack = pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-ivory/90 backdrop-blur shadow-md" : "bg-ivory/70 backdrop-blur"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2" aria-label="Go to home">
            <img src={logo} alt="Relief Care Support" className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="hidden sm:block font-display text-primary text-lg leading-tight">
              Relief Care<br/><span className="text-xs tracking-widest text-orange uppercase">Support Services</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            {NAV.map((n) =>
              isGroup(n) ? (
                <div key={n.label} className="relative group">
                  <button className="inline-flex items-center gap-1 text-foreground/80 hover:text-primary font-semibold">
                    {n.label} <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="bg-card rounded-2xl shadow-2xl border border-border p-2 min-w-[220px]">
                      {n.items.map((i) => (
                        <Link key={i.to} to={i.to}
                          className="block px-3 py-2 rounded-lg text-sm font-semibold text-foreground/80 hover:bg-cream hover:text-primary"
                          activeProps={{ className: "bg-cream text-primary" }}>
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className="text-foreground/80 hover:text-primary font-semibold"
                  activeProps={{ className: "text-primary" }}>
                  {n.label}
                </Link>
              )
            )}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.instagram.com/reliefcaresupport" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-orange">
              <Instagram className="h-5 w-5" />
            </a>
            <Link to="/hire" className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-amber-foreground shadow hover:shadow-lg hover:-translate-y-0.5 transition">
              Get Help Now
            </Link>
          </div>
          <button className="lg:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden bg-ivory border-t border-border max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map((n) =>
                isGroup(n) ? (
                  <div key={n.label}>
                    <button onClick={() => setOpenGroup(openGroup === n.label ? null : n.label)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-md text-foreground/90 font-semibold hover:bg-cream">
                      {n.label}
                      <ChevronDown className={`h-4 w-4 transition ${openGroup === n.label ? "rotate-180" : ""}`} />
                    </button>
                    {openGroup === n.label && (
                      <div className="pl-4 border-l-2 border-amber ml-3">
                        {n.items.map((i) => (
                          <Link key={i.to} to={i.to} className="block px-3 py-2 rounded-md text-sm text-foreground/80 hover:bg-cream hover:text-primary"
                            activeProps={{ className: "bg-cream text-primary" }}>
                            {i.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={n.to} to={n.to} className="px-3 py-3 rounded-md text-foreground/90 font-semibold hover:bg-cream"
                    activeProps={{ className: "bg-cream text-primary" }}>
                    {n.label}
                  </Link>
                )
              )}
              <Link to="/hire" className="mt-2 rounded-full bg-amber text-center px-4 py-3 font-bold text-amber-foreground">
                Get Help Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {showBack && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
          <button
            onClick={() => (window.history.length > 1 ? window.history.back() : router.navigate({ to: "/" }))}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card/60 backdrop-blur px-3.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <Footer />
      {!hideWhatsApp && <WhatsAppWidget />}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-deep-blue text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3" aria-label="Go to home">
            <img src={logo} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-display text-xl">Relief Care</p>
              <p className="text-xs uppercase tracking-widest text-amber">Support Services</p>
            </div>
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/80 italic">Lets give you a helping hand.</p>
        </div>
        <div>
          <p className="font-display text-amber mb-3">For Clients</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/hire" className="hover:text-amber">Hire a Worker</Link></li>
            <li><Link to="/work-plans" className="hover:text-amber">Work Plans</Link></li>
            <li><Link to="/pay" className="hover:text-amber">Pay Now</Link></li>
            <li><Link to="/candidates" className="hover:text-amber">Available Candidates</Link></li>
            <li><Link to="/faq" className="hover:text-amber">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-amber mb-3">For Job Seekers</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/apply" className="hover:text-amber">Apply for a Job</Link></li>
            <li><Link to="/vacancies" className="hover:text-amber">Vacancies</Link></li>
            <li><Link to="/training" className="hover:text-amber">Training</Link></li>
            <li><Link to="/faq" className="hover:text-amber">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-amber mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber">About Us</Link></li>
            <li><Link to="/services" className="hover:text-amber">Our Services</Link></li>
            <li><Link to="/staff" className="hover:text-amber">Our People</Link></li>
            <li><Link to="/testimonials" className="hover:text-amber">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-amber mb-3">Get in Touch</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-amber shrink-0" />Suite 12 Veteran Plaza, Herbert Macaulay Way, By YABATECH Back Gate, Lagos.</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-amber" /><a href="tel:+2349090336443">+234 909 033 6443</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-amber" /><a href="mailto:info@reliefcaresupport.com.ng">info@reliefcaresupport.com.ng</a></li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="https://www.instagram.com/reliefcaredomestic" target="_blank" rel="noopener noreferrer" aria-label="Instagram reliefcaredomestic" className="h-10 w-10 rounded-full bg-amber/20 hover:bg-amber flex items-center justify-center transition"><Instagram className="h-5 w-5" /></a>
            <a href="https://www.instagram.com/reliefcaresupport" target="_blank" rel="noopener noreferrer" aria-label="Instagram reliefcaresupport" className="h-10 w-10 rounded-full bg-amber/20 hover:bg-amber flex items-center justify-center transition"><Instagram className="h-5 w-5" /></a>
            <a href="https://wa.me/2349090336443" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] flex items-center justify-center transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.34 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.515 5.276l-.999 3.648 3.973-1.023zM17.06 14.5c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© 2026 Relief Care Support Services Limited. All rights reserved.</p>
          <div className="flex gap-5 items-center flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-amber">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber">Terms and Conditions</Link>
            <Link to="/cookies" className="hover:text-amber">Cookie Policy</Link>
            <Link to="/admin" className="inline-flex items-center gap-1 hover:text-amber" aria-label="Admin login">
              <Lock className="h-3 w-3" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
