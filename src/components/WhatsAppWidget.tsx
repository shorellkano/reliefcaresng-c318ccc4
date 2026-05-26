import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

const NUMBERS = [
  { label: "+234 909 033 6443", tel: "2349090336443" },
  { label: "+234 903 193 3800", tel: "2349031933800" },
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="rounded-2xl bg-white shadow-2xl border border-border p-4 max-w-xs animate-fade-in">
          <div className="flex justify-between items-start gap-3">
            <div>
              <p className="font-display text-lg text-primary">Need help?</p>
              <p className="text-sm text-muted-foreground mt-1">Call or chat with our team. We reply within minutes.</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {NUMBERS.map((n) => (
              <div key={n.tel} className="flex items-center gap-2">
                <a href={`tel:+${n.tel}`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:bg-primary-dark transition">
                  <Phone className="h-3.5 w-3.5" /> {n.label}
                </a>
                <a href={`https://wa.me/${n.tel}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${n.label}`}
                   className="inline-flex items-center justify-center rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white h-9 w-9 transition">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open WhatsApp chat"
        className="pulse-ring h-14 w-14 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white shadow-xl flex items-center justify-center transition"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
