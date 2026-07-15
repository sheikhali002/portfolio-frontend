import { motion } from "framer-motion";
import type { Project } from "@/lib/projects-store";
import { Users, Clock, Briefcase } from "lucide-react";

interface Props {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elegant"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.projectUrl ? (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="block h-full w-full"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ) : (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {project.role.split(" ")[0]}</div>
          <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {project.duration}</div>
          <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {project.teamSize}</div>
        </div>

        <details className="group/details">
          <summary className="cursor-pointer text-xs font-medium text-primary hover:underline">
            View details
          </summary>
          <div className="mt-3 space-y-2 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Role:</strong> {project.role}</p>
            <p><strong className="text-foreground">Challenges:</strong> {project.challenges}</p>
            <p><strong className="text-foreground">Outcomes:</strong> {project.outcomes}</p>
          </div>
        </details>
      </div>
    </motion.article>
  );
}
