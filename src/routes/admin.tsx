import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Plus, Trash2, LogOut, X } from "lucide-react";
import { authStore } from "@/lib/auth-store";
import { projectsStore, type Project, type ProjectCategory } from "@/lib/projects-store";
import { useProjects } from "@/hooks/use-projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Portfolio" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = authStore.isAuthenticated();
    setAuthed(ok);
    setReady(true);
    if (!ok) {
      // Unauthorized users go home. Login form is shown before this fires only if logged out URL first loads.
    }
  }, []);

  if (!ready) return null;
  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} onCancel={() => router.navigate({ to: "/" })} />;
  return <Dashboard onLogout={() => { authStore.logout(); router.navigate({ to: "/" }); }} />;
}

interface LoginData { username: string; password: string; }

function LoginForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(data: LoginData) {
    if (authStore.login(data.username, data.password)) onSuccess();
    else setError("Invalid credentials");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-2xl border border-border bg-card p-8 shadow-elegant"
      >
        <h1 className="text-2xl font-bold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Demo credentials: <code>admin</code> / <code>admin123</code></p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Username</span>
            <input {...register("username", { required: true })} className="admin-input mt-1.5" />
            {errors.username && <span className="text-xs text-destructive">Required</span>}
          </label>
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input type="password" {...register("password", { required: true })} className="admin-input mt-1.5" />
            {errors.password && <span className="text-xs text-destructive">Required</span>}
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" className="flex-1 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Sign in</button>
          <button type="button" onClick={onCancel} className="rounded-full border border-border px-4 py-2.5 text-sm font-medium">Cancel</button>
        </div>
        <style>{`.admin-input{width:100%;border-radius:.6rem;border:1px solid var(--color-border);background:var(--color-background);padding:.6rem .8rem;font-size:.875rem;outline:none} .admin-input:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 20%,transparent)}`}</style>
      </motion.form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { projects } = useProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Project dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4" /> Add project
          </button>
          <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{p.title}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{p.category}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{p.client}</td>
                <td className="px-6 py-4 text-muted-foreground">{p.duration}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(p)} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => { if (confirm(`Delete "${p.title}"?`)) projectsStore.remove(p.id); }}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(creating || editing) && (
          <ProjectFormModal
            project={editing}
            onClose={() => { setCreating(false); setEditing(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface FormValues {
  title: string;
  category: ProjectCategory;
  client: string;
  duration: string;
  teamSize: number;
  description: string;
  technologies: string;
  role: string;
  challenges: string;
  outcomes: string;
  coverImage: string;
}

function ProjectFormModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: project
      ? { ...project, technologies: project.technologies.join(", ") }
      : {
          title: "", category: "Web", client: "", duration: "", teamSize: 5,
          description: "", technologies: "", role: "", challenges: "", outcomes: "",
          coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        },
  });

  async function onSubmit(v: FormValues) {
    const payload = {
      ...v,
      teamSize: Number(v.teamSize),
      technologies: v.technologies.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (project) await projectsStore.update(project.id, payload);
    else await projectsStore.create(payload);
    onClose();
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-8 shadow-elegant"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{project ? "Edit project" : "Add project"}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg border border-border"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
          <F label="Title" error={errors.title?.message}><input {...register("title", { required: "Required" })} className="admin-input" /></F>
          <F label="Category"><select {...register("category")} className="admin-input"><option>Web</option><option>Mobile</option></select></F>
          <F label="Client" error={errors.client?.message}><input {...register("client", { required: "Required" })} className="admin-input" /></F>
          <F label="Duration" error={errors.duration?.message}><input {...register("duration", { required: "Required" })} className="admin-input" placeholder="e.g. 8 months" /></F>
          <F label="Team size" error={errors.teamSize?.message}><input type="number" min={1} {...register("teamSize", { required: "Required", min: 1 })} className="admin-input" /></F>
          <F label="Cover image URL" error={errors.coverImage?.message}><input {...register("coverImage", { required: "Required" })} className="admin-input" /></F>
          <F label="Role" error={errors.role?.message} full><input {...register("role", { required: "Required" })} className="admin-input" /></F>
          <F label="Technologies (comma separated)" error={errors.technologies?.message} full><input {...register("technologies", { required: "Required" })} className="admin-input" placeholder="React, Node.js, AWS" /></F>
          <F label="Description" error={errors.description?.message} full><textarea rows={3} {...register("description", { required: "Required" })} className="admin-input resize-none" /></F>
          <F label="Challenges" error={errors.challenges?.message} full><textarea rows={2} {...register("challenges", { required: "Required" })} className="admin-input resize-none" /></F>
          <F label="Outcomes" error={errors.outcomes?.message} full><textarea rows={2} {...register("outcomes", { required: "Required" })} className="admin-input resize-none" /></F>

          <div className="col-span-full flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60">
              {project ? "Save changes" : "Add project"}
            </button>
          </div>
        </form>
        <style>{`.admin-input{width:100%;border-radius:.6rem;border:1px solid var(--color-border);background:var(--color-background);padding:.6rem .8rem;font-size:.875rem;outline:none} .admin-input:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 20%,transparent)}`}</style>
      </motion.div>
    </motion.div>
  );
}

function F({ label, error, children, full }: { label: string; error?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "col-span-full" : ""}`}>
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
