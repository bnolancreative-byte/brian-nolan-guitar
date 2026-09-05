export const INTERESTS = [
  { value: "weekly", label: "Weekly lesson — $60/hr" },
  { value: "gig", label: "Book a gig" },
] as const;

export const FORMATS = [
  { value: "studio", label: "In-county studio" },
  { value: "online", label: "Live online" },
] as const;

export const TIMINGS = [
  { value: "weekday", label: "Weekday" },
  { value: "evening", label: "Evening" },
  { value: "weekend", label: "Weekend" },
  { value: "flex", label: "Flexible" },
] as const;

export const ACTS = [
  { value: "solo", label: "Solo" },
  { value: "weekend-update", label: "Weekend Update" },
  { value: "hat-trick", label: "Hat Trick" },
] as const;

export type Interest = (typeof INTERESTS)[number]["value"];
export type Format = (typeof FORMATS)[number]["value"];
export type Timing = (typeof TIMINGS)[number]["value"];
export type Act = (typeof ACTS)[number]["value"];

export type Lead = {
  name: string;
  phone: string;
  email: string;
  interest: Interest;
  format?: Format;
  timing?: Timing;
  goal?: string;
  act?: Act;
  eventDate?: string;
  venue?: string;
  notes?: string;
  createdAt: string;
};

const STORAGE_KEY = "brian-nolan-guitar-leads";
const DUP_WINDOW_MS = 30_000;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function readLeads(): Lead[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<Lead, "createdAt">): "ok" | "duplicate" {
  const existing = readLeads();
  const email = lead.email.trim().toLowerCase();
  const phone = digits(lead.phone);
  const now = Date.now();
  const recent = existing.some((item) => {
    const age = now - Date.parse(item.createdAt);
    if (Number.isNaN(age) || age > DUP_WINDOW_MS) return false;
    return item.email.toLowerCase() === email || digits(item.phone) === phone;
  });
  if (recent) return "duplicate";

  const next: Lead = {
    ...lead,
    email,
    phone,
    name: lead.name.trim(),
    goal: lead.goal?.trim() || undefined,
    venue: lead.venue?.trim() || undefined,
    notes: lead.notes?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([next, ...existing]));
  return "ok";
}
