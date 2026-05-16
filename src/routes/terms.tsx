import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Relief Care Support Services" },
      { name: "description", content: "Terms governing use of the Relief Care Support Services website and recruitment service." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => <Wrap title="Terms and Conditions">
    <p>By using this website or engaging the services of Relief Care Support Services Limited, you agree to the terms below.</p>
    <H>Use of the website</H>
    <p>You agree to use this website for lawful purposes only and to provide accurate information when filling in any form.</p>
    <H>Nature of the service</H>
    <p>Relief Care Support Services is a recruitment and placement agency. We introduce vetted candidates to households and organisations. We are not the employer of placed staff. The employment relationship is between you and the staff member.</p>
    <H>Client and applicant responsibilities</H>
    <p>Clients agree to treat placed staff with dignity and pay agreed wages. Applicants agree to provide truthful information and conduct themselves professionally during placement.</p>
    <H>Placement disclaimer</H>
    <p>While we vet every candidate, we do not guarantee any particular outcome from a placement. Clients are encouraged to maintain ongoing supervision.</p>
    <H>Limitation of liability</H>
    <p>To the fullest extent permitted by law, Relief Care Support Services Limited is not liable for indirect, incidental or consequential losses arising from use of this website or our services.</p>
    <H>Governing law</H>
    <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
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
