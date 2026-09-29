import HeroStage from "@/components/hero/HeroStage";

const services = [
  {
    title: "Brand Identity",
    body: "Naming, logos, and visual systems that give your company a clear, memorable voice.",
  },
  {
    title: "Product Design",
    body: "Research-driven interfaces for web and mobile, from first sketch to shipped pixels.",
  },
  {
    title: "Web Development",
    body: "Fast, accessible sites built with modern tooling and designed to grow with you.",
  },
];

const projects = [
  { name: "Northwind", tag: "Brand · Web", shape: "circle", hue: "from-orange-400 to-rose-500" },
  { name: "Lumen Health", tag: "Product", shape: "square", hue: "from-sky-400 to-indigo-500" },
  { name: "Fieldnotes", tag: "Brand", shape: "triangle", hue: "from-emerald-400 to-teal-600" },
  { name: "Orbit Pay", tag: "Product · Web", shape: "ring", hue: "from-violet-400 to-fuchsia-500" },
];

function Shape({ shape }: { shape: string }) {
  const base = "bg-white/85 dark:bg-white/80";
  switch (shape) {
    case "circle":
      return <div className={`size-24 rounded-full ${base}`} />;
    case "square":
      return <div className={`size-20 rotate-12 rounded-xl ${base}`} />;
    case "triangle":
      return (
        <div
          className={`size-24 ${base}`}
          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />
      );
    default:
      return <div className="size-24 rounded-full border-[14px] border-white/85" />;
  }
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between h-17 px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-block size-5 rounded-full bg-accent" />
            Abstract
          </a>
          <div className="hidden gap-8 text-sm text-muted sm:flex">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#work" className="hover:text-foreground">Work</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-85"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <HeroStage />

        {/* Services */}
        <section id="services" className="scroll-mt-20 border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What we do</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <article
                  key={s.title}
                  className="rounded-2xl border border-border bg-background p-8 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
              <p className="hidden text-muted sm:block">2023 — 2026</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <a key={p.name} href="#" className="group block">
                  <div
                    className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${p.hue}`}
                  >
                    <div className="transition duration-500 group-hover:rotate-45 group-hover:scale-110">
                      <Shape shape={p.shape} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-medium">{p.name}</h3>
                    <span className="text-sm text-muted">{p.tag}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 px-6 pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Have something in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-md opacity-70">
              Tell us about your project and we&apos;ll get back to you within two business days.
            </p>
            <a
              href="mailto:hello@example.com"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:brightness-110"
            >
              hello@example.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Abstract Studio</p>
          <p>Made with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
