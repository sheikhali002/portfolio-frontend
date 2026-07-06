import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alex Morgan" },
      { name: "description", content: "Software Project Manager with 10+ years leading web, mobile, SaaS, and enterprise product delivery." },
      { property: "og:title", content: "About — Alex Morgan" },
      { property: "og:description", content: "10+ years leading complex software delivery across industries." },
    ],
  }),
  component: About,
});

const industries = [
  "Web applications", "Mobile applications", "SaaS", "Enterprise software",
  "AI products", "E-commerce", "Blockchain", "CRM systems", "ERP systems",
];

const responsibilities = [
  "Requirement gathering", "Sprint planning", "Scrum", "Agile",
  "Client communication", "Team management", "Risk management",
  "Product roadmaps", "QA coordination", "Delivery management",
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-primary">About</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          A decade of shipping the right things, the right way.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I'm a Software Project Manager with 10+ years leading the delivery of
          web, mobile, SaaS, and enterprise products. I've partnered with
          founders, product leaders, and Fortune 500 stakeholders to translate
          ambitious ideas into pragmatic delivery plans — and then run the
          teams that make them real.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          My work spans startups shipping their first MVP through to
          multi-year enterprise programs with distributed teams of 20+
          engineers. I focus on clarity, momentum, and the operating rhythms
          that keep quality and morale high.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="text-lg font-semibold">Industries & product types</h2>
          <ul className="mt-4 space-y-2.5">
            {industries.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                {i}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="text-lg font-semibold">Core responsibilities</h2>
          <ul className="mt-4 space-y-2.5">
            {responsibilities.map((r) => (
              <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
