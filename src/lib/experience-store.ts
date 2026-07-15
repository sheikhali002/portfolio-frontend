import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

const COL = "experience";
const SEED_SENTINEL = "__seeded__";

const seed: ExperienceItem[] = [
  {
    id: "e1",
    company: "BwLogics Software Solutions",
    position: "Project Manager – Scrum Master",
    duration: "Jan 2025 — Jun 2026",
    responsibilities: [
      "Led cross-functional teams of 15 professionals delivering AI-powered and enterprise software projects.",
      "Served as Scrum Master by facilitating sprint planning, daily stand-ups, sprint reviews, retrospectives, and backlog grooming.",
      "Managed stakeholders, project planning, risk mitigation, resource allocation, and executive reporting across multiple concurrent projects.",
    ],
    technologies: [
      "Agile",
      "Scrum",
      "Trello",
      "Google Workspace",
      "AI/LLM",
      "API Integrations",
    ],
  },
  {
    id: "e2",
    company: "Sigma Digital Solutions (Spiralclick UAE)",
    position: "Technical Project Manager",
    duration: "Jul 2022 — Jan 2025",
    responsibilities: [
      "Led software, AI, cloud, and e-commerce projects for clients across the UAE and UK.",
      "Gathered business requirements, managed sprint planning, and coordinated cross-functional development teams.",
      "Mentored technical staff while ensuring timely delivery of high-quality software solutions.",
    ],
    technologies: [
      "Jira",
      "Agile",
      "Scrum",
      "WordPress",
      "PHP",
      "AI Solutions",
    ],
  },
  {
    id: "e3",
    company: "EduSoft System Solutions",
    position: "Software Product Manager",
    duration: "Mar 2022 — Jul 2022",
    responsibilities: [
      "Conducted ERP demonstrations and client solution workshops.",
      "Gathered business requirements (BRD/FRD) and translated them into technical deliverables.",
      "Tracked KPIs, coordinated development teams, and ensured successful software delivery.",
    ],
    technologies: [
      "ERP",
      "Agile",
      "Database Management",
      "Quality Assurance",
    ],
  },
  {
    id: "e4",
    company: "Carbon8 Pvt Ltd",
    position: "Software Support Engineer",
    duration: "Mar 2021 — Mar 2022",
    responsibilities: [
      "Installed and configured Windows and Linux environments for enterprise deployments.",
      "Provided technical support, software troubleshooting, and QA assistance for end users.",
      "Collaborated with developers during software testing, deployment, and issue resolution.",
    ],
    technologies: [
      "Windows",
      "Linux",
      "Quality Assurance",
      "Active Directory",
    ],
  },
];

function toItem(id: string, data: Record<string, unknown>): ExperienceItem {
  return {
    id,
    company: data.company as string,
    position: data.position as string,
    duration: data.duration as string,
    responsibilities: data.responsibilities as string[],
    technologies: data.technologies as string[],
  };
}

async function maybeSeed() {
  const sentinelRef = doc(db, COL, SEED_SENTINEL);
  const sentinelSnap = await getDoc(sentinelRef);
  if (sentinelSnap.exists()) return;

  // Write sentinel first so concurrent tabs can't double-seed
  await setDoc(sentinelRef, { seededAt: serverTimestamp() });

  await Promise.all(
    seed.map((item, i) =>
      setDoc(doc(db, COL, `e${i + 1}`), {
        ...item,
        _createdAt: serverTimestamp(),
        _createdAtMs: Date.now() - (seed.length - i) * 1000,
      })
    )
  );
}

maybeSeed().catch(console.error);

export const experienceStore = {
  async list(): Promise<ExperienceItem[]> {
    const q = query(collection(db, COL), orderBy("_createdAtMs", "desc"));
    const snap = await getDocs(q);
    return snap.docs
      .filter((d) => d.id !== SEED_SENTINEL)
      .map((d) => toItem(d.id, d.data()));
  },

  async create(input: Omit<ExperienceItem, "id">): Promise<ExperienceItem> {
    const ref = await addDoc(collection(db, COL), {
      ...input,
      _createdAt: serverTimestamp(),
      _createdAtMs: Date.now(),
    });
    return { ...input, id: ref.id };
  },

  async update(id: string, patch: Partial<Omit<ExperienceItem, "id">>): Promise<void> {
    await updateDoc(doc(db, COL, id), patch as Record<string, unknown>);
  },

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, COL, id));
  },

  subscribe(cb: () => void): () => void {
    const q = query(collection(db, COL), orderBy("_createdAtMs", "desc"));
    const unsub: Unsubscribe = onSnapshot(q, () => cb());
    return unsub;
  },
};