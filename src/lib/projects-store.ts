// Local storage-backed project store.
// The API surface (list/get/create/update/remove) is intentionally async-shaped
// so it can be swapped for a real backend without touching consumers.

export type ProjectCategory = "Web" | "Mobile";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  duration: string;
  teamSize: number;
  description: string;
  technologies: string[];
  role: string;
  challenges: string;
  outcomes: string;
  coverImage: string;
}

const KEY = "portfolio:projects";

const seed: Project[] = [
  {
    id: "1",
    title: "Enterprise CRM Platform",
    category: "Web",
    client: "Nordbank Group",
    duration: "14 months",
    teamSize: 18,
    description:
      "End-to-end delivery of a modular CRM used by 4,000+ relationship managers across 6 countries.",
    technologies: ["React", "Node.js", ".NET", "Azure", "PostgreSQL"],
    role: "Senior Project Manager",
    challenges:
      "Coordinating cross-timezone teams, complex regulatory constraints, and legacy data migration from three siloed systems.",
    outcomes:
      "Delivered 3 weeks ahead of schedule with a 32% reduction in average client onboarding time.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: "2",
    title: "HealthTrack Mobile App",
    category: "Mobile",
    client: "Vitalis Health",
    duration: "9 months",
    teamSize: 11,
    description:
      "iOS and Android patient companion app with wearable sync, medication reminders, and secure messaging.",
    technologies: ["Flutter", "Firebase", "Node.js", "AWS"],
    role: "Product & Project Manager",
    challenges:
      "HIPAA compliance, offline-first sync, and a tight go-to-market window aligned with a hardware launch.",
    outcomes:
      "Reached 120K active users within the first quarter with a 4.8 App Store rating.",
    coverImage:
      "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=1200&q=80",
  },
  {
    id: "3",
    title: "Retail Analytics SaaS",
    category: "Web",
    client: "MarketPulse Inc.",
    duration: "12 months",
    teamSize: 14,
    description:
      "Multi-tenant analytics dashboard with real-time inventory forecasting and AI-driven recommendations.",
    technologies: ["React", "Python", "AWS", "Docker", "Snowflake"],
    role: "Delivery Manager",
    challenges:
      "Scaling data pipelines to 200M events/day while keeping dashboard load times under 1s.",
    outcomes:
      "Signed 40+ enterprise clients in the first year, driving $6M ARR.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: "4",
    title: "FinFlow Payments App",
    category: "Mobile",
    client: "PayNorth",
    duration: "10 months",
    teamSize: 12,
    description:
      "Cross-border peer-to-peer payments app with real-time FX and biometric authentication.",
    technologies: ["React Native", "Node.js", "AWS", "PostgreSQL"],
    role: "Project Manager",
    challenges:
      "Regulatory approval across 4 markets and integrating with 9 banking partners.",
    outcomes:
      "Processed $85M in transactions during the first 6 months post-launch.",
    coverImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
  },
  {
    id: "5",
    title: "LogiChain ERP",
    category: "Web",
    client: "Meridian Logistics",
    duration: "16 months",
    teamSize: 22,
    description:
      "Enterprise resource planning suite for logistics operations across warehouses, fleet, and finance.",
    technologies: ["Laravel", ".NET", "React", "AWS", "Docker"],
    role: "Program Manager",
    challenges:
      "Migrating 15 years of legacy data and rolling out to 30 warehouses without operational downtime.",
    outcomes:
      "Reduced operational reporting cycle from 5 days to 4 hours.",
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
  },
  {
    id: "6",
    title: "AI Content Studio",
    category: "Web",
    client: "Loom Creative",
    duration: "7 months",
    teamSize: 9,
    description:
      "AI-assisted content generation platform for marketing teams with brand-safe workflows and approvals.",
    technologies: ["React", "Python", "OpenAI", "AWS"],
    role: "Product Delivery Lead",
    challenges:
      "Balancing rapid AI iteration with enterprise-grade governance and audit logging.",
    outcomes:
      "Cut client campaign production time by 60% and secured a Series B follow-on.",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  },
];

function read(): Project[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Project[];
  } catch {
    return seed;
  }
}

function write(items: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("projects:changed"));
}

export const projectsStore = {
  async list(): Promise<Project[]> {
    return read();
  },
  async create(input: Omit<Project, "id">): Promise<Project> {
    const items = read();
    const project = { ...input, id: crypto.randomUUID() };
    write([project, ...items]);
    return project;
  },
  async update(id: string, patch: Partial<Omit<Project, "id">>): Promise<void> {
    write(read().map((p) => (p.id === id ? { ...p, ...patch } : p)));
  },
  async remove(id: string): Promise<void> {
    write(read().filter((p) => p.id !== id));
  },
  subscribe(cb: () => void) {
    if (typeof window === "undefined") return () => {};
    const handler = () => cb();
    window.addEventListener("projects:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("projects:changed", handler);
      window.removeEventListener("storage", handler);
    };
  },
};
