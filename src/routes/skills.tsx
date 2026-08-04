import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { skills } from "@/lib/portfolio-data";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skillset — Ali Hassan" },
      { name: "description", content: "Project management, technical, and soft skills across the full software delivery lifecycle." },
      { property: "og:title", content: "Skillset — Ali Hassan" },
      { property: "og:description", content: "Project management, technical, and soft skills." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Skillset</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          The tools & disciplines I bring
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A blend of delivery frameworks, technical fluency, and the soft
          skills that keep teams aligned and clients confident.
        </p>
      </motion.div>

      <div className="mt-14 space-y-10">
        {Object.entries(skills).map(([group, items], gi) => (
          <motion.section
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: gi * 0.05 }}
          >
            <h2 className="text-lg font-semibold">{group}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {items.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-soft transition-shadow hover:shadow-elegant"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
