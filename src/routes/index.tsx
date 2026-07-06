import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { stats, skills, experience } from "@/lib/portfolio-data";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { projects } = useProjects();
  const featured = projects.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-mesh opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Available for new engagements
            </span>
            <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">
              Alex Morgan
            </h1>
            <p className="mt-4 text-xl font-medium text-gradient md:text-2xl">
              Software Project Manager
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              I lead cross-functional teams to deliver web, mobile, SaaS, and
              enterprise products — on time, on scope, and built for scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-12 max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-elegant md:grid-cols-4 md:p-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-bold tracking-tight text-gradient md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Recent Work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Featured Projects</h2>
          </div>
          <Link to="/projects" className="hidden text-sm font-medium text-primary hover:underline md:inline-flex">
            All projects →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Skills preview */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Toolkit</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Skills at a glance</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(skills).map(([group, items], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="text-sm font-semibold text-muted-foreground">{group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.slice(0, 5).map((s) => (
                    <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/skills" className="text-sm font-medium text-primary hover:underline">See full skillset →</Link>
          </div>
        </div>
      </section>

      {/* Experience preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Journey</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Experience Timeline</h2>
        </div>
        <div className="space-y-4">
          {experience.slice(0, 3).map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-soft md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-semibold">{e.position}</h3>
                <p className="text-sm text-muted-foreground">{e.company}</p>
              </div>
              <span className="text-sm text-muted-foreground">{e.duration}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/experience" className="text-sm font-medium text-primary hover:underline">See full experience →</Link>
        </div>
      </section>
    </div>
  );
}
