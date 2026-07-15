import { useEffect, useState } from "react";
import { experienceStore, type ExperienceItem } from "@/lib/experience-store";
export function useExperience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    const load = () => experienceStore.list().then((p) => mounted && (setItems(p), setLoading(false)));
    load();
    const unsub = experienceStore.subscribe(load);
    return () => { mounted = false; unsub(); };
  }, []);
  return { items, loading };
}