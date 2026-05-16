import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Relief Care Support Services" },
      { name: "description", content: "How Relief Care Support Services collects, uses and protects personal information under Nigerian data protection law." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => <Legal title="Privacy Policy">
    <p>This Privacy Policy explains how Relief Care Support Services Limited collects, uses and protects information you share with us when you visit our website, submit a job application, request to hire a worker, or contact us.</p>
    <H>Information we collect</H>
    <p>We collect personal information you provide directly, including your full name, age, date of birth, gender, state of origin, phone number, email address, home address, work history, certifications, photographs, identification documents and any details you share through our forms or chat channels.</p>
    <H>How we use your information</H>
    <p>We use this information to assess your application or enquiry, match suitable staff to households, communicate with you, verify identity, fulfil our service obligations, and improve our offering. We do not sell your data.</p>
    <H>How we protect it</H>
    <p>Information is stored on secured cloud infrastructure with role-based access. Documents are kept only as long as needed for the purpose collected, in line with the Nigeria Data Protection Regulation (NDPR).</p>
    <H>Sharing with third parties</H>
    <p>We share information only with vetted partners who help us deliver our services (for example, background-check providers) and where required by law.</p>
    <H>Your rights</H>
    <p>Under Nigerian law you may request access to, correction or deletion of your personal data, and you may withdraw consent at any time. Reach us at info@reliefcaresupport.com.ng or +234 909 033 6443.</p>
  </Legal>,
});

function Legal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Layout>
      <section className="bg-ivory-texture pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Legal</p>
          <h1 className="font-display text-5xl text-primary mt-3">{title}</h1>
        </div>
      </section>
      <section className="pb-24 bg-cream">
        <article className="max-w-3xl mx-auto px-6 prose prose-stone reveal text-foreground/85 space-y-4">
          {children}
        </article>
      </section>
    </Layout>
  );
}
function H({ children }: { children: React.ReactNode }) { return <h2 className="font-display text-2xl text-primary mt-8">{children}</h2>; }
