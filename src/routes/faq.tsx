import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Relief Care Support Services" },
      { name: "description", content: "Get answers to common questions about hiring domestic staff, applying for jobs, staff verification, placement timelines, and more at Relief Care Support Services." },
      { property: "og:title", content: "FAQ — Relief Care" },
      { property: "og:description", content: "Common questions from clients and applicants, answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const CLIENTS = [
  ["How do I hire a domestic worker through Relief Care?", "Simply fill out our Hire a Worker form on the website or send us a message on WhatsApp. Tell us what type of staff you need, your location, and your preferred arrangement. Our team will review your request and match you with suitable candidates within 48 to 72 hours."],
  ["How long does the recruitment process take?", "Most placements are completed within 48 to 72 hours of receiving your request. For specialist roles or specific requirements, it may take slightly longer. We keep you informed throughout the process."],
  ["Are all workers verified and background checked?", "Yes. Every staff member on our platform goes through a thorough vetting process including identity verification, reference checks, and a personal interview before they are approved for placement."],
  ["Do you provide live-in domestic staff?", "Yes. We provide both live-in and live-out domestic workers depending on your household's needs. You can specify your preference when filling out the hire request form."],
  ["Do you provide live-out domestic staff?", "Yes. Live-out arrangements are available for clients who prefer staff to work during set hours and return home afterward. This option is flexible and can be arranged on a daily, weekly, or monthly basis."],
  ["Is there a replacement policy if the worker is not a good fit?", "Yes. If a placement does not meet your expectations within an agreed period, we will work to find a suitable replacement at no additional cost. Contact our team directly to discuss."],
  ["Do you offer hourly or daily staffing?", "Yes. We offer hourly, daily, weekly, and monthly staffing arrangements. See our Work Plans page for full details."],
  ["What types of domestic staff can I hire?", "We provide caregivers, nannies, babysitters, housekeepers, cleaners, cooks, elderly care support workers, hospital sitters, physical therapy assistants, and general domestic workers. See our full services page for the complete list."],
  ["Can I hire staff outside of Lagos?", "Yes. While we are based in Lagos, we match clients across Nigeria. Contact us to discuss placements in your state."],
  ["How do I pay for your services?", "You can pay online via the payment section on our website. We accept bank transfers to our GTB account. Details are available on the Pay Now page."],
];

const APPLICANTS = [
  ["How do I apply for a job through Relief Care?", "Fill out the Apply for a Job form on our website. You will need to provide your personal details, work experience, job category preference, a passport photograph, and a valid ID. Our team will review your application and contact you if you match an available vacancy."],
  ["Is there a fee to register as a worker?", "No application fees are charged to domestic workers registering with Relief Care. We match you with families and employers at no cost to you."],
  ["How long does it take to get placed after applying?", "Placement time depends on available vacancies that match your skills and location. We recommend keeping your profile up to date and following our vacancies page for current openings."],
  ["Do I need experience to apply?", "Experience is preferred for most roles but not always required. We encourage applicants with strong willingness to learn to apply and consider enrolling in one of our training programs to increase their chances."],
  ["Will I be trained before placement?", "We offer professional training programs for caregivers and domestic workers. Completing our training increases your likelihood of being matched with a suitable employer quickly."],
  ["Can I choose whether I want live-in or live-out work?", "Yes. You can state your preference in the application form and we will try to match you with opportunities that align with your availability and living arrangements."],
  ["What happens after I submit my application?", "Our team reviews your application, shortlists candidates that match current or upcoming vacancies, and contacts you via phone or WhatsApp to proceed. Shortlisted candidates may have their profiles displayed on our website for client browsing."],
];

function FAQ() {
  const [tab, setTab] = useState<"clients" | "applicants">("clients");
  const data = tab === "clients" ? CLIENTS : APPLICANTS;

  return (
    <Layout>
      <section className="bg-ivory-texture pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">FAQ</p>
          <h1 className="font-display text-5xl lg:text-7xl text-primary mt-3">Your Questions, Answered</h1>
          <p className="mt-5 text-foreground/70 max-w-2xl mx-auto text-lg">We have put together answers to the questions we hear most from clients and job applicants.</p>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center -translate-y-6">
            <div className="inline-flex bg-card shadow-xl rounded-full p-1.5 border border-border">
              <button onClick={() => setTab("clients")} className={`px-6 sm:px-8 py-3 rounded-full font-display transition ${tab === "clients" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>For Clients</button>
              <button onClick={() => setTab("applicants")} className={`px-6 sm:px-8 py-3 rounded-full font-display transition ${tab === "applicants" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>For Applicants</button>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {data.map(([q, a], i) => (
              <details key={i} className="reveal group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition">
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                  <span className="font-display text-lg text-primary">{q}</span>
                  <ChevronDown className="h-5 w-5 text-orange shrink-0 mt-1 group-open:rotate-180 transition" />
                </summary>
                <p className="px-5 pb-5 text-foreground/80 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep-blue text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <h2 className="font-display text-4xl">Still have questions?</h2>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/2349090336443" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] hover:bg-[oklch(0.58_0.18_150)] text-white px-6 py-3 font-bold transition">
              <MessageCircle className="h-4 w-4" /> Chat with Us on WhatsApp
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber text-amber-foreground px-6 py-3 font-bold">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
