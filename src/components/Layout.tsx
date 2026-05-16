import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { WhatsAppWidget } from "./WhatsAppWidget";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/apply", label: "Apply for a Job" },
  { to: "/hire", label: "Hire a Worker" },
  { to: "/staff", label: "Our People" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children, hideWhatsApp = false }: { children: React.ReactNode; hideWhatsApp?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => setOpen(false));
    return unsub;
  }, [router]);

  // reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-ivory/90 backdrop-blur shadow-md" : "bg-ivory/70 backdrop-blur"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Relief Care Support" className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover ring-2 ring-primary/20" />
            <span className="hidden sm:block font-display text-primary text-lg leading-tight">
              Relief Care<br/><span className="text-xs tracking-widest text-orange uppercase">Support Services</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="text-foreground/80 hover:text-primary font-semibold"
                activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
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
          <div className="lg:hidden bg-ivory border-t border-border">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="px-3 py-3 rounded-md text-foreground/90 font-semibold hover:bg-cream"
                  activeProps={{ className: "bg-cream text-primary" }}>
                  {n.label}
                </Link>
              ))}
              <Link to="/hire" className="mt-2 rounded-full bg-amber text-center px-4 py-3 font-bold text-amber-foreground">
                Get Help Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
      {!hideWhatsApp && <WhatsAppWidget />}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-deep-blue text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-display text-xl">Relief Care</p>
              <p className="text-xs uppercase tracking-widest text-amber">Support Services</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/80 italic">Lets give you a helping hand.</p>
        </div>
        <div>
          <p className="font-display text-amber mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber">About Us</Link></li>
            <li><Link to="/services" className="hover:text-amber">Services</Link></li>
            <li><Link to="/staff" className="hover:text-amber">Our People</Link></li>
            <li><Link to="/testimonials" className="hover:text-amber">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-amber">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-amber mb-3">Services</p>
          <ul className="space-y-2 text-sm">
            <li>Caregivers</li>
            <li>Nannies and Babysitters</li>
            <li>Elderly Care Support</li>
            <li>Housekeepers</li>
            <li>Cleaners</li>
            <li>Cooks</li>
            <li>Live-in and Live-out Staff</li>
            <li>General Recruitment</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-amber mb-3">Get in Touch</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-amber shrink-0" />Suite 12 Veteran Plaza, Herbert Macaulay Way, By YABATECH Back Gate, Lagos.</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-amber" /><a href="tel:+2349090336443">+234 909 033 6443</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-amber" /><a href="mailto:info@reliefcaresupport.com">info@reliefcaresupport.com</a></li>
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/70">
          <p>2025 Relief Care Support Services Limited. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-amber">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber">Terms and Conditions</Link>
            <Link to="/cookies" className="hover:text-amber">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
