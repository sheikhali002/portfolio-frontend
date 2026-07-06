import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Alex Morgan" },
      { name: "description", content: "A selection of web and mobile projects delivered across CRM, ERP, SaaS, AI, e-commerce, and enterprise systems." },
      { property: "og:title", content: "Projects — Alex Morgan" },
      { property: "og:description", content: "Web and mobile projects across CRM, ERP, SaaS, AI, and enterprise." },
    ],
  }),
  component: Projects,
});

const TABS = ["All", "Web", "Mobile"] as const;
type Tab = (typeof TABS)[number];

function Projects() {
  const { projects } = useProjects();
  const [tab, setTab] = useState<Tab>("All");
  const [q, setQ] = useState("");
  const [tech, setTech] = useState<string>("All");

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (tab !== "All" && p.category !== tab) return false;
      if (tech !== "All" && !p.technologies.includes(tech)) return false;
      if (q) {
        const needle = q.toLowerCase();
        const hay = `${p.title} ${p.client} ${p.description} ${p.technologies.join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [projects, tab, tech, q]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A curated selection of engagements across industries. Search, filter,
          or browse by category.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === t && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-gradient-primary" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm shadow-soft outline-none focus:ring-2 focus:ring-primary/30 sm:w-64"
            />
          </div>
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2.5 text-sm shadow-soft outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="All">All technologies</option>
            {allTech.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No projects match your filters.</p>
      )}
    </div>
  );
}
