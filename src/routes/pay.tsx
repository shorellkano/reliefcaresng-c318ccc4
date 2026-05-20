import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Landmark, MessageCircle, Copy, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "Make a Payment | Relief Care Support Services" },
      { name: "description", content: "Make service payments to Relief Care Support Services via GTB bank transfer." },
      { property: "og:title", content: "Make a Payment — Relief Care" },
      { property: "og:description", content: "Pay securely via GTB bank transfer." },
      { property: "og:url", content: "/pay" },
    ],
    links: [{ rel: "canonical", href: "/pay" }],
  }),
  component: Pay,
});

function Pay() {
  const [copied, setCopied] = useState(false);

  function copyAcct() {
    navigator.clipboard.writeText("0617885969");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Payments</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Make a Payment</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">Paying for a placement, service, or training enrollment? Use the bank details below.</p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal bg-card rounded-3xl shadow-lg p-8 border-l-4 border-primary">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center"><Landmark className="h-7 w-7 text-primary" /></div>
              <h2 className="font-display text-2xl text-primary">Bank Transfer</h2>
            </div>
            <div className="mt-5 bg-blue-warm text-white rounded-2xl p-6 space-y-3">
              <div><p className="text-xs uppercase tracking-widest text-amber">Bank</p><p className="font-display text-xl">GTB (Guaranty Trust Bank)</p></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-amber">Account Number</p>
                <div className="flex items-center gap-3">
                  <p className="font-display text-3xl tracking-wider">0617885969</p>
                  <button onClick={copyAcct} className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs inline-flex items-center gap-1 transition">
                    <Copy className="h-3 w-3" /> {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div><p className="text-xs uppercase tracking-widest text-amber">Account Name</p><p className="font-display text-lg">Relief Care Support Services Limited</p></div>
            </div>
            <p className="mt-5 text-sm text-foreground/75">After payment, please send your payment receipt and full name to our WhatsApp number so we can confirm and process your request promptly.</p>
            <a href="https://wa.me/2349090336443?text=Hello%2C%20I%20have%20made%20a%20payment%20to%20Relief%20Care.%20Here%20is%20my%20receipt." target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-5 py-2.5 text-sm font-bold transition">
              <MessageCircle className="h-4 w-4" /> Send Receipt on WhatsApp
            </a>
          </div>

          <div className="mt-8 reveal bg-card rounded-3xl shadow-lg p-8">
            <h3 className="font-display text-2xl text-primary">Payment Reference Guide</h3>
            <p className="text-sm text-foreground/65 mt-1">Not sure what to pay? Send us a message and we will guide you.</p>
            <div className="mt-5 divide-y divide-border">
              {[["New Placement Fee", "Contact us for a quote"], ["Training Enrollment", "Contact us for current rates"], ["Renewal or Replacement Fee", "Contact us for details"]].map(([k, v]) => (
                <div key={k} className="py-3 flex justify-between gap-4">
                  <p className="font-bold text-primary">{k}</p>
                  <p className="text-foreground/75 text-right">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-amber/15 border-l-4 border-amber rounded-2xl p-5 flex gap-3 items-start">
            <AlertCircle className="h-5 w-5 text-orange shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">All payments are processed directly by Relief Care Support Services Limited. For queries regarding a payment, contact us on WhatsApp or by phone.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
