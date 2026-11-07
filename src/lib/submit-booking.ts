import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { formatLeadMessage, type Lead } from "@/lib/leads";
import { SITE } from "@/lib/site";
import { isValidEmail, isValidEventDate, isValidName } from "@/lib/validation";

const bookingSchema = z.discriminatedUnion("interest", [
  z.object({
    interest: z.literal("weekly"),
    name: z.string().trim().refine(isValidName),
    email: z.string().trim().refine(isValidEmail),
    format: z.enum(["studio", "online"]),
    timing: z.enum(["weekday", "evening", "weekend", "flex"]),
    goal: z.string().trim().max(280).optional(),
    fax: z.string().max(200).optional(),
  }),
  z.object({
    interest: z.literal("gig"),
    name: z.string().trim().refine(isValidName),
    email: z.string().trim().refine(isValidEmail),
    act: z.enum(["solo", "weekend-update", "lowlight"]),
    eventDate: z.string().trim().refine(isValidEventDate),
    venue: z.string().trim().min(2).max(80),
    notes: z.string().trim().max(400).optional(),
    fax: z.string().max(200).optional(),
  }),
]);

type Booking = z.infer<typeof bookingSchema>;

async function postForm(url: string, fields: Record<string, string>) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) body.set(key, value);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Origin: SITE.url,
      Referer: `${SITE.url}/`,
    },
    body,
    signal: AbortSignal.timeout(12000),
  });
  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean | string;
    status?: string;
    ok?: boolean;
  };
  return (
    res.ok &&
    (json.ok === true || json.success === true || json.success === "true" || json.status === "success")
  );
}

export const submitBooking = createServerFn({ method: "POST" })
  .validator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.fax?.trim()) return { ok: true as const };

    const lead = { ...data };
    delete lead.fax;
    const body = formatLeadMessage(lead as Omit<Lead, "createdAt">);
    const subject =
      data.interest === "gig" ? "Gig request — Brian Nolan Guitar" : "Lesson request — Brian Nolan Guitar";
    const key = process.env.BOOKING_ACCESS_KEY;

    try {
      if (key) {
        const sent = await postForm("https://silentforms.com/api/submit", {
          accessKey: key,
          name: data.name,
          email: data.email,
          subject,
          message: body,
          replyto: data.email,
        });
        if (sent) return { ok: true as const };
      }

      const sent = await postForm(
        `https://shipmyform.com/to/${encodeURIComponent(SITE.email.address)}`,
        {
          name: data.name,
          email: data.email,
          _subject: subject,
          message: body,
          _gotcha: "",
        },
      );
      if (sent) return { ok: true as const };

      const backup = await postForm(
        `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email.address)}`,
        {
          name: data.name,
          email: data.email,
          _replyto: data.email,
          _subject: subject,
          _template: "box",
          _captcha: "false",
          message: body,
        },
      );
      if (backup) return { ok: true as const };
      return { ok: false as const };
    } catch {
      return { ok: false as const };
    }
  });

export type { Booking };
