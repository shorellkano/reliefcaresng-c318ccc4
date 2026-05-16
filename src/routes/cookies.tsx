import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Relief Care Support Services" },
      { name: "description", content: "How Relief Care Support Services uses cookies on this website." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => <Wrap title="Cookie Policy">
    <p>This Cookie Policy explains how Relief Care Support Services Limited uses cookies and similar technologies on this website.</p>
    <H>What cookies we use</H>
    <p>We use a small number of essential cookies for session management and basic analytics that help us understand how the site is used so we can improve it.</p>
    <H>Managing cookies</H>
    <p>You can disable or remove cookies through your browser settings. Disabling cookies may affect parts of the website such as form submissions.</p>
    <H>Contact</H>
    <p>For cookie-related questions reach us at info@reliefcaresupport.com.ng or +234 909 033 6443.</p>
  </Wrap>,
});

function Wrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Legal</p>
          <h1 className="font-display text-5xl text-primary mt-3">{title}</h1>
        </div>
      </section>
      <section className="pb-24 bg-cream">
        <article className="max-w-3xl mx-auto px-6 reveal text-foreground/85 space-y-4">{children}</article>
      </section>
    </Layout>
  );
}
function H({ children }: { children: React.ReactNode }) { return <h2 className="font-display text-2xl text-primary mt-8">{children}</h2>; }
