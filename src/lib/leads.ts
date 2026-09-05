export const INTERESTS = [
  { value: "weekly", label: "Weekly lesson — $60/hr" },
  { value: "gig", label: "Book a gig" },
] as const;

export const FORMATS = [
  { value: "studio", label: "In person" },
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
  { value: "lowlight", label: "Lowlight Collective" },
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

export function actLabel(value?: Act) {
  return ACTS.find((item) => item.value === value)?.label ?? value ?? "";
}

export function formatLeadMessage(lead: Omit<Lead, "createdAt">) {
  const lines =
    lead.interest === "gig"
      ? [
          "Gig request — Brian Nolan Guitar",
          `Name: ${lead.name.trim()}`,
          `Phone: ${lead.phone.trim()}`,
          `Email: ${lead.email.trim()}`,
          `Act: ${actLabel(lead.act)}`,
          `Date: ${lead.eventDate?.trim() ?? ""}`,
          `Venue: ${lead.venue?.trim() ?? ""}`,
          lead.notes?.trim() ? `Notes: ${lead.notes.trim()}` : "",
        ]
      : [
          "Lesson request — Brian Nolan Guitar",
          `Name: ${lead.name.trim()}`,
          `Phone: ${lead.phone.trim()}`,
          `Email: ${lead.email.trim()}`,
          `Format: ${lead.format === "online" ? "Live online" : "In person"}`,
          `Time: ${TIMINGS.find((item) => item.value === lead.timing)?.label ?? ""}`,
          lead.goal?.trim() ? `Wants to play: ${lead.goal.trim()}` : "",
        ];
  return lines.filter(Boolean).join("\n");
}

export function leadShareLinks(lead: Omit<Lead, "createdAt">) {
  const body = formatLeadMessage(lead);
  const subject =
    lead.interest === "gig" ? "Gig request — Brian Nolan Guitar" : "Lesson request — Brian Nolan Guitar";
  const encodedBody = encodeURIComponent(body);
  const iOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return {
    body,
    subject,
    sms: iOS ? `sms:&body=${encodedBody}` : `sms:?body=${encodedBody}`,
    mail: `mailto:?subject=${encodeURIComponent(subject)}&body=${encodedBody}`,
  };
}
