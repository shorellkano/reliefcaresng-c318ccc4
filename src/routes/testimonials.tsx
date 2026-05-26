import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Relief Care Support Services" },
      { name: "description", content: "Real stories from families served by Relief Care across Lagos, Ibadan, Ogun State and the diaspora in the US and UK." },
      { property: "og:title", content: "Testimonials" },
      { property: "og:description", content: "Stories from the families we serve, at home and abroad." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

type T = { quote: string; who: string; location: string; tag?: string };

const LAGOS: T[] = [
  {
    quote: "I have tried getting househelp through relatives and it never ended well. Relief Care changed everything. Their process is structured, their staff are screened and they follow up after placement to make sure everything is going smoothly. Very professional.",
    who: "Mrs. Olawuyi",
    location: "Maryland, Lagos",
  },
];

const OUTSIDE: T[] = [
  {
    quote: "I am a grandmother in Ijebu, Ogun State. My grandchildren thought because I live far from Lagos I would not get good care. But Relief Care came all the way to me. My caregiver is respectful, hardworking and treats me with so much dignity. I thank God for this company.",
    who: "Mama Akinlade",
    location: "Ijebu, Ogun State",
  },
  {
    quote: "I am based in Ibadan and I was not sure Relief Care would reach us here. But they did and they did not disappoint. My caregiver arrived well trained and settled in immediately. My family in America checks in and they are always impressed by the updates they receive. Relief Care truly goes beyond Lagos.",
    who: "Chief Mrs. Olawale",
    location: "Ibadan, Oyo State",
  },
  {
    quote: "I honestly did not think Relief Care would serve Ibadan but I decided to reach out anyway. I am so glad I did. They sent me a househelp who is thorough, honest and hardworking. My home has never been this organised. People come to visit and always compliment how clean everything is. Relief Care brought Lagos quality service all the way to Ibadan and I am beyond impressed.",
    who: "Mrs. Akinwale",
    location: "Ibadan, Oyo State",
  },
  {
    quote: "Finding a trustworthy nanny in Ibadan was so stressful until someone referred me to Relief Care. I was not sure they covered Ibadan but they did and they delivered. The nanny they sent is warm, experienced and so gentle with my baby. My husband and I both work and knowing our child is in safe hands every day means everything to us. Relief Care truly surprised us.",
    who: "Mrs. Olabisi",
    location: "Ibadan, Oyo State",
  },
];

const DIASPORA: T[] = [
  {
    quote: "My dad lives alone in Surulere and I am here in the United States. I was always anxious knowing he had no one close by to check on him. I reached out to Relief Care from the US and they took it from there. Everything was sorted on the ground without me having to fly back home. Within days a caregiver was with him. My dad calls me now sounding so happy and well taken care of. Relief Care gave me the peace of mind I never thought I could have from this far. I am so grateful.",
    who: "Tolu A.",
    location: "United States · son of client in Surulere, Lagos",
    tag: "🇺🇸 USA",
  },
  {
    quote: "My mum is a widow and has been living alone in Magodo since my dad passed. Being in the UK and knowing she had no one to talk to, no one to sit with or share her day with broke my heart every single day. I contacted Relief Care and explained exactly what I needed, not just a carer but a companion for her. Someone warm, patient and kind who could just be there with her. Relief Care understood immediately and found her the perfect match. Now my mum has someone who sits with her, watches TV with her, talks with her and makes her laugh again. The difference in her voice when I call is everything. I cannot thank Relief Care enough for giving my mother her joy back.",
    who: "Mr Evoh",
    location: "United Kingdom · son of client in Magodo, Lagos",
    tag: "🇬🇧 UK",
  },
];

function Card({ t, i }: { t: T; i: number }) {
  return (
    <figure className={`reveal relative rounded-3xl p-8 lg:p-10 shadow-lg bg-card border border-amber/20 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}>
      {t.tag && (
        <span className="absolute -top-3 right-6 text-[11px] font-bold tracking-widest uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full shadow">
          {t.tag}
        </span>
      )}
      <Quote className="h-14 w-14 text-amber" strokeWidth={1.5} />
      <blockquote className="mt-2 text-foreground/90 text-[17px] lg:text-lg leading-relaxed">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-bold tracking-wide uppercase text-primary">{t.who}</p>
        <p className="text-xs italic text-muted-foreground mt-0.5">{t.location}</p>
      </figcaption>
    </figure>
  );
}

function Group({ title, sub, items }: { title: string; sub: string; items: T[] }) {
  return (
    <div className="mt-16 first:mt-0">
      <div className="reveal text-center mb-10">
        <p className="text-orange uppercase tracking-widest text-xs font-bold">{sub}</p>
        <h2 className="font-display text-3xl lg:text-4xl text-primary mt-2">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((t, i) => <Card key={t.who} t={t} i={i} />)}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <Layout>
      <section className="pt-20 pb-14 bg-gradient-to-br from-ivory via-cream to-amber/15">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <p className="uppercase tracking-widest text-orange text-sm">Testimonials</p>
          <h1 className="font-display text-5xl lg:text-6xl text-primary mt-3">Stories from the families we serve.</h1>
          <p className="mt-5 text-foreground/75 max-w-2xl mx-auto text-lg">
            From homes across Lagos to families in Ibadan, Ogun State and the diaspora in the US and UK, these are the real voices of clients who trust Relief Care.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-gradient-to-b from-cream via-ivory to-amber/10">
        <div className="max-w-6xl mx-auto px-6">
          <Group title="Lagos families" sub="In our home city" items={LAGOS} />
          <Group title="Beyond Lagos" sub="Ibadan & Ogun State" items={OUTSIDE} />
          <Group title="Serving the diaspora" sub="From abroad, with peace of mind" items={DIASPORA} />
        </div>
      </section>
    </Layout>
  );
}
