import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ali Hassan" },
      { name: "description", content: "Senior Project Manager & Scrum Master specializing in Agile software delivery, AI-powered solutions, enterprise applications, and digital transformation." },
      { property: "og:title", content: "About — Ali Hassan" },
      { property: "og:description", content: "5+ years leading complex software delivery across industries." },
    ],
  }),
  component: About,
});

const industries = [
  "Enterprise Software",
  "AI & LLM Solutions",
  "E-commerce",
  "Cloud Applications",
  "ERP Systems",
  "Travel Platforms",
  "Real Estate",
  "SaaS Products",
  "Digital Transformation",
];

const responsibilities = [
  "Project Planning",
  "Stakeholder Management",
  "Requirements Gathering",
  "Sprint Planning",
  "Scrum Master",
  "Risk Management",
  "Budget & Resource Planning",
  "Executive Reporting",
  "Cross-functional Team Leadership",
  "Digital Transformation",
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
          Delivering software projects with clarity, agility, and measurable business impact.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I'm a Senior Project Manager and Scrum Master with 5+ years of experience delivering enterprise software, AI-powered products, e-commerce platforms, and cloud-based solutions for clients across Saudi Arabia, the UAE, and the UK.

        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          My background combines technical understanding with strong project leadership, allowing me to bridge business goals and engineering execution. I specialize in Agile delivery, stakeholder management, requirements gathering, sprint planning, risk management, and leading cross-functional teams from project initiation through successful production releases.
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
