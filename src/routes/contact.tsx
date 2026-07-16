import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ali Hassan" },
      { name: "description", content: "Get in touch to discuss project management engagements, delivery consulting, or new opportunities." },
      { property: "og:title", content: "Contact — Alex Morgan" },
      { property: "og:description", content: "Let's talk about your next project." },
    ],
  }),
  component: Contact,
});

interface FormData { name: string; email: string; subject: string; message: string; }

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  async function onSubmit(_data: FormData) {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Contact</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Let's discuss your next software project.</h1>
        <p className="mt-4 text-muted-foreground">
          Whether you're planning an AI solution, enterprise platform, SaaS product, or digital transformation initiative, I'd be happy to discuss how I can help deliver it successfully.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a href="mailto:alimagu6234@gmail.com" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Mail className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
              <p className="font-medium">alimagu6234@gmail.com</p>
            </div>
          </a>
          <a href="https://linkedin.com/in/ali-hassan-496b3a197" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Linkedin className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">LinkedIn</p>
              <p className="font-medium">linkedin.com/in/ali-hassan-496b3a197</p>
            </div>
          </a>
          <a href="https://github.com/sheikhali002" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Github className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">GitHub</p>
              <p className="font-medium">github.com/sheikhali002</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><MapPin className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</p>
              <p className="font-medium">Jubail, Kingdom of Saudi Arabia
                Remote • GCC • Worldwide</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card p-8 shadow-elegant"
        >
          {/* <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name", { required: "Name is required" })} className="input" placeholder="Jane Doe" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })} className="input" placeholder="jane@company.com" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Subject" error={errors.subject?.message}>
              <input {...register("subject", { required: "Subject is required" })} className="input" placeholder="Project inquiry" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Message" error={errors.message?.message}>
              <textarea rows={6} {...register("message", { required: "Message is required", minLength: { value: 10, message: "At least 10 characters" } })} className="input resize-none" placeholder="Tell me about your project…" />
            </Field>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sent ? <><CheckCircle2 className="h-4 w-4" /> Message sent</> : <><Send className="h-4 w-4" /> {isSubmitting ? "Sending…" : "Send message"}</>}
          </button> */}
           <LocalTime />

          {/* Interactive map */}
          <div className="flex-1 min-h-[400px] overflow-hidden rounded-2xl border border-border shadow-elegant">
            <iframe
              title="Jubail, Saudi Arabia"
              src="https://www.openstreetmap.org/export/embed.html?bbox=49.5800%2C26.9200%2C49.7200%2C27.0200&layer=mapnik&marker=26.9667%2C49.6500"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", display: "block", filter: "saturate(0.85)" }}
              loading="lazy"
            />
          </div>

          <p className="text-center text-xs text-muted-foreground">
            📍 Jubail Industrial City, Eastern Province, Saudi Arabia
          </p>
        </motion.form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function LocalTime() {
  const [time, setTime] = useState(() => new Date());

  // Tick every second
  useState(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  });

  const formatted = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Riyadh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateFormatted = time.toLocaleDateString("en-US", {
    timeZone: "Asia/Riyadh",
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Riyadh" })).getHours();
  const isWorkingHours = hour >= 9 && hour < 18;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-4 shadow-soft">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Local time in Jubail</p>
        <p className="mt-0.5 text-2xl font-bold tracking-tight tabular-nums">{formatted}</p>
        <p className="text-xs text-muted-foreground">{dateFormatted}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${isWorkingHours ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isWorkingHours ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"}`} />
          {isWorkingHours ? "Available now" : "Outside hours"}
        </span>
        <p className="text-xs text-muted-foreground">AST · UTC+3</p>
      </div>
    </div>
  );
}