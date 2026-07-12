import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ali Hassan. Built with React, TypeScript & Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <a href="mailto:alimagu6234@gmail.com" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary" aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com/in/ali-hassan-496b3a197" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <Link to="/admin" className="ml-2 text-xs text-muted-foreground hover:text-primary">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
