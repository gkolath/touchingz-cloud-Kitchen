import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Leaf,
  Phone,
  Mail,
  ShieldCheck,
  Utensils,
  Truck,
  ChefHat,
  Building2,
  PartyPopper,
  Store,
  Sandwich,
  Snowflake,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const nav = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#serve", label: "Who we serve" },
  { href: "#kitchen", label: "Kitchen" },
  { href: "#contact", label: "Contact" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-paper">
        <Leaf className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-semibold tracking-tight text-forest">
          touchingz
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Food Pvt. Ltd
        </span>
      </span>
    </a>
  );
}

// Enquiries are emailed through FormSubmit. The first submission sends an
// activation email to this inbox; nothing is delivered until it is confirmed.
const ENQUIRY_EMAIL = "touchingzfoods@gmail.com";
const ENQUIRY_ENDPOINT = `https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`;

function Home() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSending(true);
    setError("");
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: `New tasting enquiry from ${data.business || data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
      };
      if (!res.ok || String(body.success) !== "true")
        throw new Error("send failed");
      setSent(true);
    } catch {
      setError(
        `Your enquiry didn't go through. Please try again, or email ${ENQUIRY_EMAIL} directly.`,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <div className="bg-forest text-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <p className="font-semibold tracking-wide">Pure · Clean · Crafted</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href="tel:+919740767516"
              className="inline-flex items-center gap-1.5 hover:text-leaf"
            >
              <Phone className="h-3.5 w-3.5" /> +91 97407 67516
            </a>
            <a
              href="mailto:touchingzfoods@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-leaf"
            >
              <Mail className="h-3.5 w-3.5" /> touchingzfoods@gmail.com
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="container-x flex min-h-16 items-center justify-between gap-4 py-3">
          <Logo />
          <nav className="flex shrink-0 items-center gap-4 overflow-x-auto text-sm font-semibold whitespace-nowrap text-forest">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-leaf-deep"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-leaf px-4 py-2 text-sm font-bold text-paper hover:bg-leaf-deep"
            >
              Tasting
            </a>
          </nav>
        </div>
      </header>

      <section className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Kerala cloud kitchen · B2B
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] text-forest sm:text-6xl">
            Crafted convenience foods
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Freshly crafted food solutions for cafés, offices, events, retail
            counters and everyday dining — handmade in spirit, consistent in
            execution, scalable in supply.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-leaf px-6 py-3 text-sm font-bold text-paper hover:bg-leaf-deep"
            >
              Talk to the kitchen
            </a>
            <a
              href="#menu"
              className="rounded-full border border-forest px-6 py-3 text-sm font-bold text-forest hover:bg-forest hover:text-paper"
            >
              See the menu
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ["ISO", "certified process"],
              ["HACCP", "aligned kitchens"],
              ["FSSAI", "guided production"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-2xl text-forest">{k}</dt>
                <dd className="text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <img
            src="/photos/hero.jpg"
            alt="Kerala tea-time snacks, sandwiches and chai arranged on a wooden table"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl"
          />
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-paper px-5 py-4 shadow-lg sm:left-8">
            <p className="font-display text-lg text-forest">
              Authenticity + reliability + speed
            </p>
            <p className="text-sm text-muted">
              Small-batch craft. Professional dispatch.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-4 pb-6 pt-10 sm:grid-cols-3">
        {[
          [
            "/photos/fresh.jpg",
            "Fresh cutlets just out of the kitchen",
            "Fresh daily",
            "Prepared to demand with tight batch discipline.",
          ],
          [
            "/photos/clean.jpg",
            "Curry leaves, coconut and spices",
            "Clean label",
            "No unnecessary additives — clear, recognisable ingredients.",
          ],
          [
            "/photos/office.jpg",
            "Portioned meal boxes ready for offices",
            "B2B ready",
            "Portion control, packing standards and dependable dispatch.",
          ],
        ].map(([src, alt, title, copy]) => (
          <article
            key={title}
            className="overflow-hidden rounded-[1.5rem] bg-paper shadow-sm"
          >
            <img
              src={src}
              alt={alt}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-6">
              <h2 className="font-display text-2xl text-forest">{title}</h2>
              <p className="mt-2 text-muted">{copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section
        id="about"
        className="container-x grid items-center gap-12 py-16 lg:grid-cols-2"
      >
        <div className="relative">
          <img
            src="/photos/chef.jpg"
            alt="Chef plating snacks in a clean commercial kitchen"
            className="aspect-[3/4] w-full max-w-md rounded-[2rem] object-cover"
          />
          <img
            src="/photos/spices.jpg"
            alt="Coconut, spices, onion and curry leaves"
            className="absolute -bottom-6 -right-2 hidden w-40 rounded-3xl border-4 border-cream object-cover shadow-lg sm:block sm:w-48"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Brand DNA
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
            Pure. Clean. Crafted.
          </h2>
          <p className="mt-4 text-lg text-muted">
            A food company built for the modern consumer without losing the soul
            of traditional cooking. Touchingz is a B2B snack and meal producer
            specialising in authentic Kerala tea-time favourites, quick bites,
            sandwiches and curated office meals.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              [
                "Pure",
                "Clear ingredients, honest taste and recipes rooted in real food.",
              ],
              [
                "Clean",
                "Minimal processing, hygiene-led kitchens and transparent sourcing.",
              ],
              [
                "Crafted",
                "Small-batch preparation with care, consistency and culinary discipline.",
              ],
            ].map(([t, c]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf text-paper">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <p>
                  <span className="font-bold text-forest">{t}. </span>
                  <span className="text-muted">{c}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-2xl bg-forest px-5 py-4 text-paper">
            The promise: fresh, safe, consistent food that looks handmade but
            runs with professional discipline.
          </p>
        </div>
      </section>

      <section id="menu" className="bg-paper py-16">
        <div className="container-x">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Product architecture
          </p>
          <h2 className="mt-2 max-w-xl font-display text-4xl text-forest sm:text-5xl">
            One brand. Multiple food missions.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            A clear portfolio that serves daily, occasional and retail demand —
            from nostalgic Kerala snacks to office lunch programs.
          </p>
          <div className="mt-8 divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line">
            {[
              [
                "01",
                "Tea-time classics",
                "Cutlets, samosas, banana fritters, fried rolls, ela ada, unnakkaya and Kerala-style quick snacks.",
              ],
              [
                "02",
                "Quick bites",
                "Grab-and-go items for cafés, office counters, events and evening demand spikes.",
              ],
              [
                "03",
                "Sandwiches",
                "Fresh, filled and portion-controlled sandwiches for cafés, meetings and corporate orders.",
              ],
              [
                "04",
                "Curated meals",
                "Office lunch boxes, team meals, party meal trays and balanced daily menus.",
              ],
              [
                "05",
                "Frozen / chilled line",
                "Scalable packaged favourites for retail counters and future e-commerce.",
              ],
            ].map(([n, t, c]) => (
              <div
                key={n}
                className="grid gap-2 bg-cream/60 px-5 py-5 sm:grid-cols-[4rem_14rem_1fr] sm:items-center sm:gap-6"
              >
                <span className="font-display text-2xl text-leaf-deep">
                  {n}
                </span>
                <h3 className="font-bold text-forest">{t}</h3>
                <p className="text-muted">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <img
              src="/photos/spread.jpg"
              alt="Kerala snacks, sandwiches, burgers, biryani and meal trays laid out on a table"
              className="aspect-[3/2] w-full rounded-[1.5rem] object-cover"
            />
            <img
              src="/photos/sandwich-platter.jpg"
              alt="Club sandwiches, wraps, burgers and chicken bites on serving boards"
              className="aspect-[3/2] w-full rounded-[1.5rem] object-cover sm:aspect-auto sm:h-full"
            />
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Portfolio
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest">
            Kerala tea-time favourites
          </h2>
          <p className="mt-3 text-muted">
            Authentic taste designed for professional supply.
          </p>
          <ul className="mt-5 space-y-3 text-ink">
            {[
              "Chicken, veg and buffalo cutlets",
              "Chicken rolls, fried rolls and samosas",
              "Ela ada, unnakkaya, banana fritters and steamed bites",
              "Party snack packs and event-ready platters",
              "Fresh daily or frozen / chilled supply formats",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Leaf className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <img
          src="/photos/hero.jpg"
          alt="Pazhampori, cutlets and hot tea in clear glasses"
          className="aspect-[4/3] w-full rounded-[2rem] object-cover object-left"
        />
      </section>

      <section className="bg-forest py-14 text-paper">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              Sandwich,
              "Sandwiches & quick bites",
              "Daily fresh ranges, veg, egg and chicken, meeting boxes and display packs.",
            ],
            [
              Building2,
              "Office meals",
              "Lunch boxes, buffet setups and pre-order menus that cut waste.",
            ],
            [
              PartyPopper,
              "Events",
              "High-volume snacks, party trays and menus that are easy to serve.",
            ],
            [
              Snowflake,
              "Retail & frozen",
              "Clean-label packs ready for counters, chillers and later e-commerce.",
            ],
          ].map(([Icon, t, c]) => {
            const I = Icon as typeof Leaf;
            return (
              <div key={t as string}>
                <I className="h-6 w-6 text-leaf" />
                <h3 className="mt-3 font-display text-2xl">{t as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  {c as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="serve" className="container-x py-16">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
          Who we serve
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl text-forest sm:text-5xl">
          Built for B2B buyers who need consistency
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Touchingz solves different food moments with one reliable production
          engine.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            [
              "/photos/cafe-handoff.jpg",
              "Touchingz delivery partner handing an insulated order to a café",
              "Café delivery",
            ],
            [
              "/photos/office-lunch.jpg",
              "Office team serving themselves from boxed Touchingz meals",
              "Office lunch",
            ],
            [
              "/photos/ingredients.jpg",
              "Biryani with fresh vegetables, spices and a Touchingz bag",
              "Event menus",
            ],
          ].map(([src, alt, label]) => (
            <figure
              key={label}
              className="overflow-hidden rounded-[1.5rem] bg-paper shadow-sm"
            >
              <img
                src={src}
                alt={alt}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-5 py-3 text-sm font-semibold text-forest">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Cafés", "Fresh snacks, sandwiches and display-ready bites."],
            ["Offices", "Curated meals, snack boxes and meeting platters."],
            ["Events", "Party packs, high-volume snacks and themed menus."],
            [
              "Restaurants & hotels",
              "Back-end snack production and specialty items.",
            ],
            [
              "Retail counters",
              "Packaged quick bites and clean-label products.",
            ],
            [
              "Cloud / delivery brands",
              "Menu testing, meal prep and fulfilment support.",
            ],
          ].map(([t, c]) => (
            <article
              key={t}
              className="rounded-[1.5rem] bg-paper p-6 shadow-sm"
            >
              <h3 className="font-display text-2xl text-leaf-deep">{t}</h3>
              <p className="mt-2 text-muted">{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kitchen" className="bg-paper py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/photos/kitchen-prep.jpg"
            alt="Kitchen staff in hairnets, masks and gloves preparing Kerala food on banana leaves"
            className="aspect-[16/10] w-full rounded-[2rem] object-cover"
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
              Operating model
            </p>
            <h2 className="mt-2 font-display text-4xl text-forest">
              A dependable supply partner
            </h2>
            <p className="mt-3 text-muted">
              Designed to reduce client kitchen workload while improving menu
              availability and quality consistency.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Menu planning and item selection",
                "Forecast-based production scheduling",
                "Portion control and standardised packing",
                "Dispatch windows and delivery discipline",
                "Client feedback loop for improvement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-semibold text-forest"
                >
                  <span className="h-2 w-2 rounded-full bg-leaf" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-x mt-14">
          <h3 className="font-display text-3xl text-forest">
            Small-batch craft. Process-led execution.
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Recipe SOPs",
                "Every product follows a standard recipe, process and portion logic.",
              ],
              [
                "02",
                "Batch control",
                "Daily batches aligned to confirmed demand and production capacity.",
              ],
              [
                "03",
                "QC checks",
                "Raw material, hygiene, temperature, packing and dispatch checks.",
              ],
              [
                "04",
                "Feedback loop",
                "Client inputs improve recipes, packaging and repeat performance.",
              ],
            ].map(([n, t, c]) => (
              <article
                key={n}
                className="rounded-[1.5rem] border border-line bg-cream p-5"
              >
                <p className="font-display text-3xl text-leaf">{n}</p>
                <h4 className="mt-2 font-bold text-forest">{t}</h4>
                <p className="mt-2 text-sm text-muted">{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
          Quality
        </p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl text-forest">
          Food safety is not a department — it is the system
        </h2>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.3fr]">
          <img
            src="/photos/receiving-area.jpg"
            alt="Touchingz staff checking fresh vegetables in the receiving area"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover lg:aspect-auto lg:h-full"
          />
          <div className="space-y-3">
            {[
              [
                ShieldCheck,
                "Ingredient intake",
                "Supplier checks, expiry review, freshness inspection and rejection control.",
              ],
              [
                ChefHat,
                "Preparation hygiene",
                "Hairnets, masks, hand-wash discipline, clean utensils and work-zone separation.",
              ],
              [
                Utensils,
                "Temperature discipline",
                "Hot and cold holding, chilled storage, batch timing and dispatch checks.",
              ],
              [
                Store,
                "Packing control",
                "Product labels, date and time coding, allergen notes and client-ready packs.",
              ],
              [
                Truck,
                "Traceability",
                "Batch records, consumption logs, complaints handling and corrective action.",
              ],
            ].map(([Icon, t, c]) => {
              const I = Icon as typeof Leaf;
              return (
                <div
                  key={t as string}
                  className="grid gap-2 rounded-2xl bg-paper px-5 py-4 sm:grid-cols-[16rem_1fr] sm:items-center"
                >
                  <h3 className="flex items-center gap-2 font-bold text-leaf-deep">
                    <I className="h-4 w-4" /> {t as string}
                  </h3>
                  <p className="text-muted">{c as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-4">
        <div className="container-x rounded-[2rem] bg-paper p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Sample program
          </p>
          <h2 className="mt-2 font-display text-3xl text-forest sm:text-4xl">
            Curated weekly office meal model
          </h2>
          <p className="mt-2 text-muted">
            A flexible menu architecture that can rotate by client, budget and
            dietary preference.
          </p>
          <div className="mt-6 space-y-3">
            {[
              ["Mon", "Kerala rice bowl + veg thoran + curry + salad"],
              ["Tue", "Chapati + chicken or veg curry + sprouts + fruit"],
              ["Wed", "Lemon rice or biryani + protein side + raita"],
              ["Thu", "Mini sadya inspired meal + payasam add-on"],
              ["Fri", "Sandwich and quick-bite lunch box + fresh juice add-on"],
            ].map(([d, m]) => (
              <div
                key={d}
                className="grid gap-1 rounded-2xl border border-line px-4 py-3 sm:grid-cols-[5rem_1fr] sm:items-center"
              >
                <span className="font-bold text-leaf-deep">{d}</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-forest">
            Add-ons: breakfast boxes · chai & snacks · meeting platters ·
            wellness bowls · executive lunch packs
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
          Why Touchingz
        </p>
        <h2 className="mt-2 font-display text-4xl text-forest">
          Why partners choose us
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "Authenticity",
              "Kerala-first food identity with familiar, nostalgic flavours.",
            ],
            [
              "Reliability",
              "Supply discipline, order planning and consistent batch outcomes.",
            ],
            [
              "Clean production",
              "Hygiene-led process and a clean-label product philosophy.",
            ],
            [
              "Menu depth",
              "Snacks, sandwiches, meals and packaged foods under one brand.",
            ],
            [
              "Scalability",
              "Cloud kitchen testing with packaged-food expansion potential.",
            ],
            [
              "Flexibility",
              "Custom formats for cafés, offices, events and retail counters.",
            ],
          ].map(([t, c]) => (
            <article
              key={t}
              className="rounded-[1.5rem] border border-line bg-paper p-5"
            >
              <h3 className="font-display text-2xl text-forest">{t}</h3>
              <p className="mt-2 text-muted">{c}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center font-display text-2xl text-forest">
          The winning formula: taste people remember + systems businesses can
          trust.
        </p>
      </section>

      <section className="bg-paper py-16">
        <div className="container-x">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Partner with us
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest">
            Ways to work with Touchingz
          </h2>
          <div className="mt-8 space-y-3">
            {[
              [
                "Café supply contract",
                "Daily snacks, sandwiches and quick bites with scheduled delivery.",
              ],
              [
                "Office meal program",
                "Curated lunch boxes, snack breaks and meeting food solutions.",
              ],
              [
                "Event food partner",
                "Party packs, event trays and customised snack menus.",
              ],
              [
                "Retail counter listing",
                "Packaged snacks and clean-label products for shelf or chiller display.",
              ],
              [
                "Menu co-creation",
                "Exclusive flavours, boxes or bundles developed for your brand.",
              ],
            ].map(([t, c]) => (
              <div
                key={t}
                className="grid gap-1 rounded-2xl bg-cream px-5 py-4 sm:grid-cols-[16rem_1fr] sm:items-center"
              >
                <h3 className="font-bold text-leaf-deep">{t}</h3>
                <p className="text-muted">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="container-x grid gap-10 py-16 lg:grid-cols-2"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-deep">
            Enquiries
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
            Food experiences together
          </h2>
          <p className="mt-4 text-muted">
            Corporate orders, café supply, events, retail counters and curated
            office meals. Reach out for proposals or sample tastings.
          </p>
          <ul className="mt-6 space-y-4 text-forest">
            <li>
              <p className="font-bold">Ms Alponse K John</p>
              <p className="text-sm text-muted">Co-founder & Director</p>
              <a
                className="font-semibold text-leaf-deep"
                href="tel:+919740767516"
              >
                +91 97407 67516
              </a>
            </li>
            <li>
              <p className="font-bold">Mr Rojin G Koshy</p>
              <p className="text-sm text-muted">Co-founder · WhatsApp only</p>
              <a
                className="font-semibold text-leaf-deep"
                href="https://wa.me/919980000889"
                target="_blank"
                rel="noreferrer"
              >
                +91 99800 00889
              </a>
            </li>
            <li>
              <p className="font-bold">Email</p>
              <a
                className="font-semibold text-leaf-deep"
                href="mailto:touchingzfoods@gmail.com"
              >
                touchingzfoods@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-[2rem] bg-paper p-6 shadow-sm sm:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-leaf text-paper">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-3xl text-forest">
                Enquiry sent
              </h3>
              <p className="mt-2 text-muted">
                Thank you. The kitchen team will get back to you soon. For a
                faster reply, call or WhatsApp the founders directly.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-3xl text-forest">
                Request a sample tasting
              </h3>
              <div className="mt-5 grid gap-4">
                <label className="grid gap-1 text-sm font-semibold text-forest">
                  Name
                  <input
                    required
                    name="name"
                    suppressHydrationWarning
                    className="rounded-xl border border-line bg-cream px-3 py-3 font-normal outline-none focus:border-leaf"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-forest">
                  Business
                  <input
                    required
                    name="business"
                    suppressHydrationWarning
                    placeholder="Café, office, hotel…"
                    className="rounded-xl border border-line bg-cream px-3 py-3 font-normal outline-none focus:border-leaf"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-forest">
                  Phone or email
                  <input
                    required
                    name="contact"
                    suppressHydrationWarning
                    placeholder="So we can reply to you"
                    className="rounded-xl border border-line bg-cream px-3 py-3 font-normal outline-none focus:border-leaf"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-forest">
                  What do you need?
                  <textarea
                    required
                    name="need"
                    rows={4}
                    suppressHydrationWarning
                    className="rounded-xl border border-line bg-cream px-3 py-3 font-normal outline-none focus:border-leaf"
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-full bg-leaf py-3 font-bold text-paper hover:bg-leaf-deep disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
                {error ? (
                  <p
                    role="alert"
                    className="text-center text-sm font-semibold text-red-700"
                  >
                    {error}
                  </p>
                ) : (
                  <p className="text-center text-xs text-muted">
                    Your enquiry is emailed to {ENQUIRY_EMAIL}.
                  </p>
                )}
              </div>
            </>
          )}
        </form>
      </section>

      <footer className="bg-forest text-paper">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">touchingz</p>
            <p className="mt-2 text-sm text-cream/80">
              Food Pvt. Ltd · Clean · Pure · Crafted
            </p>
          </div>
          <div>
            <p className="font-bold">Kitchen</p>
            <p className="mt-2 text-sm text-cream/80">
              B2B cloud kitchen for Kerala snacks, sandwiches and office meals.
            </p>
          </div>
          <div>
            <p className="font-bold">Channels</p>
            <p className="mt-2 text-sm text-cream/80">
              Recurring supply · Events · Retail · Cloud kitchen · Future
              e-commerce
            </p>
          </div>
          <div>
            <p className="font-bold">Growth</p>
            <p className="mt-2 text-sm text-cream/80">
              More capacity, corporate programs, clean-label products and
              skilled food jobs across India.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="container-x py-4 text-xs text-cream/70">
            © {new Date().getFullYear()} Touchingz Food Pvt. Ltd. Pure · Clean ·
            Crafted.
          </p>
        </div>
      </footer>
    </div>
  );
}
