import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useExperience } from "@/hooks/use-experience";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Ali Hassan" },
      { name: "description", content: "Career timeline: roles, responsibilities, and technologies managed across a decade of software delivery." },
      { property: "og:title", content: "Experience — Alex Morgan" },
      { property: "og:description", content: "A decade of software delivery leadership." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { items } = useExperience();
  const experience = [...items].reverse();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Experience</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">A decade of delivery</h1>
      </motion.div>

      <div className="relative mt-16 pl-8 md:pl-12">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent md:left-4" />
        <div className="space-y-12">
          {experience.map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[26px] top-2 grid h-4 w-4 place-items-center rounded-full bg-gradient-primary shadow-glow md:-left-[34px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold">{e.position}</h3>
                    <p className="text-sm text-muted-foreground">{e.company}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {e.duration}
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {e.technologies.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
