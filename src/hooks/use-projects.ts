import { useEffect, useState } from "react";
import { projectsStore, type Project } from "@/lib/projects-store";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = () => projectsStore.list().then((p) => mounted && (setProjects(p), setLoading(false)));
    load();
    const unsub = projectsStore.subscribe(load);
    return () => { mounted = false; unsub(); };
  }, []);

  return { projects, loading };
}
