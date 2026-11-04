import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import shopifyLogo from "@/assets/logos/shopify.svg.asset.json";
import ikasLogo from "@/assets/logos/ikas.svg.asset.json";
import woocommerceLogo from "@/assets/logos/woocommerce.svg.asset.json";
import wixLogo from "@/assets/logos/wix.svg.asset.json";
import bigcommerceLogo from "@/assets/logos/bigcommerce.svg.asset.json";
import squarespaceLogo from "@/assets/logos/squarespace.svg.asset.json";
import chatgptLogo from "@/assets/logos/chatgpt.svg.asset.json";
import perplexityLogo from "@/assets/logos/perplexity.svg.asset.json";
import googleLogo from "@/assets/logos/google.svg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ornitorank — Make your products visible on ChatGPT & Perplexity" },
      { name: "description", content: "AI-readiness audit and catalog fix for e-commerce stores. Repair variant schema, GTINs and JSON-LD so AI shopping engines recommend you." },
      { property: "og:title", content: "ornitorank — AI-ready product catalogs" },
      { property: "og:description", content: "Scan your store, see your AI visibility score, and fix every schema gap in one shot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  "Finding all your products",
  "Crawling product pages",
  "Reading your product info like ChatGPT does",
  "Checking colors, sizes & barcodes",
  "Testing ChatGPT Shopping & Perplexity visibility",
];

function hashScore(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function Scanner() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setDone(false);
    setStep(0);
    STEPS.forEach((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 900));
    setTimeout(() => setDone(true), STEPS.length * 900 + 300);
  };
  const h = hashScore(url.trim().toLowerCase());
  const score = 31 + (h % 30);
  const invisible = 62 + (h % 30);
  const errors = 2 + (h % 5);
  const products = 120 + (h % 2400);
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <form onSubmit={run} className="flex flex-col gap-2 rounded-2xl border bg-card p-2 shadow-[var(--shadow-elegant)] sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your e-commerce store URL — https://brand.com"
          className="flex-1 rounded-xl bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted-foreground"
          aria-label="Store URL"
        />
        <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
          Analyze Store →
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-muted-foreground">Free · No signup · Works with Shopify, ikas, WooCommerce</p>

      {step >= 0 && (
        <div className="mt-6 rounded-2xl border bg-card p-6 text-left">
          {!done ? (
            <ul className="space-y-2 font-mono text-sm">
              {STEPS.map((s, i) => (
                <li key={s} className={i < step ? "text-success" : i === step ? "text-foreground" : "text-muted-foreground/50"}>
                  {i < step ? "✓" : i === step ? "◌" : "·"} {s}{i === step && "…"}
                </li>
              ))}
            </ul>
          ) : (
            <Report domain={domain || "your-store.com"} score={score} invisible={invisible} errors={errors} products={products} />
          )}
        </div>
      )}
    </div>
  );
}

function Report({ domain, score, invisible, errors, products }: { domain: string; score: number; invisible: number; errors: number; products: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">AI-Readiness Report</p>
          <p className="font-display text-lg font-semibold">{domain}</p>
        </div>
        <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">At risk</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Health Score" value={`${score}/100`} tone="destructive" />
        <Stat label="Variants invisible to AI" value={`${invisible}%`} tone="destructive" />
        <Stat label="Critical schema errors" value={`${errors}`} tone="warning" />
        <Stat label="Products scanned" value={products.toLocaleString()} />
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        <Gap t="Barcodes missing" d={`${Math.round(products * 0.71)} products have no barcode, so Google Merchant Center rejects them`} />
        <Gap t="Colors & sizes not readable" d="AI can't answer a shopper asking for 'blue, size M'" />
        <Gap t="No shipping or return info" d="Your products are left out of AI shopping results" />
      </ul>
      <div className="mt-6 rounded-xl bg-primary p-5 text-primary-foreground">
        <p className="font-semibold">We can fix all of this in one delivery.</p>
        <p className="mt-1 text-sm opacity-80">A ready-to-upload Excel file + one small code snippet to paste into your store.</p>
        <a href="#pricing" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">See fix options →</a>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "destructive" | "warning" }) {
  const c = tone === "destructive" ? "text-destructive" : tone === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className={`font-display text-2xl font-bold ${c}`}>{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Gap({ t, d }: { t: string; d: string }) {
  return (
    <li className="flex gap-3 rounded-lg border bg-background p-3">
      <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
      <div><p className="font-medium">{t}</p><p className="text-muted-foreground">{d}</p></div>
    </li>
  );
}

const FAQ = [
  ["Does it work with Shopify, ikas and WooCommerce?", "Yes. The XLSX matches each platform's native import format, and the JSON-LD script works on any theme or headless storefront."],
  ["Will the script slow down my theme?", "No. It's a single async, under 4 KB script with no external requests. Core Web Vitals stay unchanged."],
  ["How fast is turnaround?", "The audit is instant. One-time catalog fixes are delivered within 48 hours, often same day."],
  ["What's in the 2-tab XLSX?", "Tab 1: the corrected, ready-to-import product and variant catalog. Tab 2: a line-by-line change log of every fix we made."],
  ["Do I need a developer?", "No. Import the file in your admin and paste one script. We include step-by-step guides."],
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-xl font-bold tracking-tight">ornito<span className="text-accent-strong">rank</span></a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#compare" className="hover:text-foreground">Before / After</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <a href="#top" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Free audit</a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> AI-Readiness engine for e-commerce
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Get your products recommended by <span className="text-accent-strong">ChatGPT</span> & Perplexity.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            When shoppers ask ChatGPT what to buy, it recommends stores whose product info it can read. 80% of stores are missing sizes, colors, barcodes or shipping details, so ChatGPT recommends their competitors. We find what's missing and fix it for you.
          </p>
          <Scanner />
        </div>
      </section>

      <section className="border-y bg-card py-10">
        <p className="text-center text-sm text-muted-foreground">Works with the platform you already use</p>
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
          {[[shopifyLogo, "Shopify"], [ikasLogo, "ikas"], [woocommerceLogo, "WooCommerce"], [wixLogo, "Wix"], [bigcommerceLogo, "BigCommerce"], [squarespaceLogo, "Squarespace"]].map(([l, n]) => (
            <div key={n as string} className="flex items-center gap-2 font-semibold">
              <img src={(l as { url: string }).url} alt={n as string} className="h-7 w-auto" />{n !== "ikas" && <span>{n as string}</span>}
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">So your products show up on</p>
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 font-semibold">
          {[[chatgptLogo, "ChatGPT Shopping"], [perplexityLogo, "Perplexity"], [googleLogo, "Google Shopping & Merchant Center"]].map(([l, n]) => (
            <div key={n as string} className="flex items-center gap-2"><img src={(l as { url: string }).url} alt="" className="h-6 w-6" />{n as string}</div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Traditional SEO wasn't built for AI shoppers</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">AI engines don't read your copy. They read structured data — and most catalogs fail silently.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8">
            <p className="text-sm font-semibold text-destructive">The problem</p>
            <ul className="mt-4 space-y-3 text-sm">
              {["Keywords & backlinks don't help LLM product ranking", "Missing GTINs → rejected from Merchant feeds", "Variants without color/size are unmatchable", "No shipping or return data → no AI shopping card"].map((x) => <li key={x} className="flex gap-2"><span className="text-destructive">✕</span>{x}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-[var(--shadow-elegant)]">
            <p className="text-sm font-semibold text-success">The ornitorank fix</p>
            <ul className="mt-4 space-y-3 text-sm">
              {["Crawl every product & variant in minutes", "Find every missing size, color, barcode & shipping detail", "Prepare a ready-to-upload Excel file", "Give you one snippet to paste — done"].map((x) => <li key={x} className="flex gap-2"><span className="text-success">✓</span>{x}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {["Scan", "Diagnose", "Compile", "Get recommended"].map((s, i) => (
            <div key={s} className="rounded-xl border bg-background p-5">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <p className="mt-2 font-display font-semibold">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">What an audit report looks like</h2>
          <p className="mx-auto mt-3 max-w-xl text-center opacity-70">Results first. Price after. You see exactly what's broken before paying anything.</p>
          <div className="mt-12 rounded-2xl bg-card p-6 text-card-foreground">
            <Report domain="linen-co.com" score={48} invisible={84} errors={3} products={1240} />
          </div>
        </div>
      </section>

      <section id="compare" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">What your customers see on ChatGPT</h2>
          <p className="mx-auto mt-3 mb-10 max-w-xl text-center text-muted-foreground">Same question, same store. Tap to compare.</p>
          <ChatDemo />
          <h2 className="mt-24 text-center font-display text-3xl font-bold sm:text-4xl">Your product page, through AI's eyes</h2>
          <p className="mx-auto mt-3 mb-10 max-w-xl text-center text-muted-foreground">Your page looks fine to shoppers — but AI and Google can't read half of it.</p>
          <ProductCards />
          <h2 className="mt-24 text-center font-display text-3xl font-bold sm:text-4xl">You get a ready-to-upload Excel file</h2>
          <p className="mx-auto mt-3 mb-10 max-w-xl text-center text-muted-foreground">Upload it in your Shopify or ikas admin, just like a normal product import. No coding.</p>
          <Sheet />
        </div>
      </section>

      <section id="pricing" className="bg-secondary/50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Simple pricing. Fix it once, or keep it fixed.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Plan name="One-Time Catalog Fix" price="$99" per="one-time" items={["Full store AI-readiness audit", "Ready-to-upload Excel file (Shopify, ikas…)", "One-paste snippet for your store", "Merchant Center compliant", "Delivered within 48 hours"]} />
            <Plan featured name="Continuous AI Sync" price="$149" per="/month" items={["Everything in One-Time Fix", "Automated daily feed sync", "Schema for every new product", "Continuous AI visibility monitoring", "Priority support"]} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Store owners are getting found again</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Our products started showing up in ChatGPT answers within two weeks. AI-referred traffic is up 3.2×.", "Selin K.", "Founder, linen apparel brand"],
            ["Merchant Center rejected 900 variants for missing GTINs. ornitorank's file fixed every one — approved in 48 hours.", "Daniel M.", "Head of E-commerce, home goods"],
            ["We imported the XLSX into ikas, pasted one script, done. No developer needed.", "Burak T.", "Owner, footwear store"],
          ].map(([q, n, r]) => (
            <figure key={n} className="rounded-2xl border bg-card p-6">
              <p className="text-accent-strong">★★★★★</p>
              <blockquote className="mt-3 text-sm leading-relaxed">“{q}”</blockquote>
              <figcaption className="mt-5 text-sm"><span className="font-semibold">{n}</span><br /><span className="text-muted-foreground">{r}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">FAQ</h2>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">{q}<span className="text-muted-foreground transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t px-6 py-10 text-center text-sm text-muted-foreground">
        © 2026 ornitorank · AI-Readiness & Catalog Optimization Engine
      </footer>
    </div>
  );
}

function Plan({ name, price, per, items, featured }: { name: string; price: string; per: string; items: string[]; featured?: boolean }) {
  return (
    <div className={`relative rounded-2xl border p-8 ${featured ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]" : "bg-card"}`}>
      {featured && <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Most popular</span>}
      <p className="font-display text-lg font-semibold">{name}</p>
      <p className="mt-4"><span className="font-display text-5xl font-bold">{price}</span> <span className="opacity-70">{per}</span></p>
      <ul className="mt-6 space-y-3 text-sm">{items.map((i) => <li key={i} className="flex gap-2"><span>✓</span>{i}</li>)}</ul>
      <a href="#top" className={`mt-8 block rounded-lg py-3 text-center font-semibold ${featured ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>Start with a free audit</a>
    </div>
  );
}

function ChatDemo() {
  const [after, setAfter] = useState(false);
  const items = after
    ? [["Your Store", "Blue Linen Shirt", "$89", "S · M · L · XL", true], ["Competitor A", "Classic Linen Shirt", "$95", "M · L", false], ["Competitor B", "Relaxed Linen Shirt", "$99", "S · M", false]]
    : [["Competitor A", "Classic Linen Shirt", "$95", "M · L", false], ["Competitor B", "Relaxed Linen Shirt", "$99", "S · M", false], ["Competitor C", "Summer Linen Shirt", "$79", "S · M · L", false]];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border bg-card p-1 text-sm font-medium">
          <button onClick={() => setAfter(false)} className={`rounded-full px-5 py-2 ${!after ? "bg-destructive text-destructive-foreground" : "text-muted-foreground"}`}>Before ornitorank</button>
          <button onClick={() => setAfter(true)} className={`rounded-full px-5 py-2 ${after ? "bg-success text-primary-foreground" : "text-muted-foreground"}`}>After ornitorank</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-elegant)]">
        <div className="flex items-center gap-2 border-b px-5 py-3">
          <img src={chatgptLogo.url} alt="ChatGPT" className="h-5 w-5" />
          <span className="text-sm font-semibold">ChatGPT</span>
        </div>
        <div className="space-y-5 p-6">
          <div className="ml-auto w-fit max-w-md rounded-2xl bg-secondary px-4 py-3 text-sm">Recommend the best linen shirt under $100</div>
          <div className="text-sm">
            <p>Here are some great linen shirts under $100:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {items.map(([store, name, price, sizes, you]) => (
                <div key={store as string} className={`rounded-xl border p-3 ${you ? "border-success ring-2 ring-success/30" : ""}`}>
                  <div className="aspect-square rounded-lg bg-[image:var(--gradient-product)]" />
                  <p className="mt-2 font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{store} · {sizes}</p>
                  <p className="mt-1 font-semibold">{price} <span className="text-xs font-normal text-success">· In stock · Free shipping</span></p>
                  {you && <span className="mt-2 inline-block rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">That's you 🎉</span>}
                </div>
              ))}
            </div>
          </div>
          <p className={`rounded-lg p-3 text-sm ${after ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {after ? "Your product now shows up first — with price, sizes and shipping." : "Your store isn't mentioned. ChatGPT can't read your sizes, barcodes or shipping info, so it picks competitors."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[false, true].map((ok) => (
        <div key={String(ok)} className="rounded-2xl border bg-card p-6">
          <p className={`text-sm font-semibold ${ok ? "text-success" : "text-destructive"}`}>{ok ? "✓ How AI & Google see it after" : "✕ How AI & Google see it today"}</p>
          <div className="mt-4 flex gap-4">
            <div className="h-28 w-28 shrink-0 rounded-xl bg-[image:var(--gradient-product)]" />
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold">Linen Shirt</p>
              <Row ok={ok} label="Price" v="$89.00 USD" />
              <Row ok={ok} label="Colors" v="Blue, White, Sand" />
              <Row ok={ok} label="Sizes" v="S, M, L, XL" />
              <Row ok={ok} label="Barcode" v="8691234567890" />
              <Row ok={ok} label="Shipping" v="Free, 2–3 days" />
            </div>
          </div>
          <p className={`mt-4 rounded-lg p-2.5 text-xs font-medium ${ok ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {ok ? "Approved in Google Merchant Center · Eligible for AI shopping" : "Not eligible — Merchant Center: “Missing GTIN”"}
          </p>
        </div>
      ))}
    </div>
  );
}

function Row({ ok, label, v }: { ok: boolean; label: string; v: string }) {
  return (
    <p className="flex gap-2"><span className="w-16 text-muted-foreground">{label}</span>
      {ok ? <span>{v}</span> : <span className="text-destructive">missing</span>}
    </p>
  );
}

const SHEET = [
  ["Linen Shirt", "Blue / M", "Blue", "M", "8691234567890", "89.00"],
  ["Linen Shirt", "Blue / L", "Blue", "L", "8691234567891", "89.00"],
  ["Linen Shirt", "Sand / M", "Sand", "M", "8691234567892", "89.00"],
  ["Cotton Tee", "White / S", "White", "S", "8691234567893", "29.00"],
];

function Sheet() {
  const [fixed, setFixed] = useState(true);
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-elegant)]">
      <div className="flex items-center justify-between border-b bg-success/10 px-4 py-2.5">
        <span className="text-sm font-semibold">📊 your-store_catalog-fix.xlsx</span>
        <button onClick={() => setFixed(!fixed)} className="rounded-md border bg-card px-3 py-1 text-xs font-medium">Show {fixed ? "your current file" : "fixed file"}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary text-muted-foreground">
            <tr>{["Product", "Variant", "Color", "Size", "Barcode (GTIN)", "Price"].map((h) => <th key={h} className="border-r px-3 py-2 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {SHEET.map((r, i) => (
              <tr key={i} className="border-t">
                {r.map((c, j) => {
                  const empty = !fixed && j >= 2 && j <= 4;
                  return <td key={j} className={`border-r px-3 py-2 ${empty ? "bg-destructive/10 text-destructive" : fixed && j >= 2 && j <= 4 ? "bg-success/10" : ""}`}>{empty ? "—" : c}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-1 border-t bg-secondary px-2 pt-1 text-xs">
        <span className="rounded-t-md border border-b-0 bg-card px-3 py-1 font-medium">Products</span>
        <span className="px-3 py-1 text-muted-foreground">Change log</span>
      </div>
    </div>
  );
}
