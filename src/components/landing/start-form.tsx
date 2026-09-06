import { useEffect, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, Facebook, Instagram, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ACTS,
  FORMATS,
  INTERESTS,
  TIMINGS,
  saveLead,
  leadShareLinks,
  type Act,
  type Format,
  type Interest,
  type Timing,
} from "@/lib/leads";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().trim().min(2, "Name needs at least two letters"),
    email: z.string().trim().email("Enter a valid email"),
    interest: z.enum(["weekly", "gig"]),
    format: z.enum(["studio", "online"]),
    timing: z.enum(["weekday", "evening", "weekend", "flex"]),
    goal: z.string().max(280).optional(),
    act: z.enum(["solo", "weekend-update", "lowlight"]),
    eventDate: z.string().optional(),
    venue: z.string().optional(),
    notes: z.string().max(400).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.interest !== "gig") return;
    if (!value.eventDate?.trim() || value.eventDate.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["eventDate"],
        message: "Add the date",
      });
    }
    if (!value.venue?.trim() || value.venue.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["venue"],
        message: "Town or venue",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

const routeApi = getRouteApi("/");

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

function ChoiceGroup<T extends string>({
  value,
  onChange,
  items,
  columns,
  ariaLabel,
  errorId,
  invalid,
}: {
  value: T;
  onChange: (value: T) => void;
  items: readonly { value: T; label: string }[];
  columns: string;
  ariaLabel: string;
  errorId?: string;
  invalid?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
      className={cn("mt-3 grid gap-2", columns)}
    >
      {items.map((item) => {
        const selected = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex min-h-12 items-center justify-between rounded-md border px-4 text-left text-sm font-medium transition-[border-color,background-color] duration-150",
              selected
                ? "border-foreground bg-secondary text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {item.label}
            <span
              className={cn(
                "size-2.5 shrink-0 rounded-full",
                selected ? "bg-foreground" : "bg-border",
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

function openMail(href: string) {
  window.location.assign(href);
}

export function StartForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "duplicate">("idle");
  const [share, setShare] = useState<ReturnType<typeof leadShareLinks> | null>(null);
  const [copied, setCopied] = useState(false);
  const { book } = routeApi.useSearch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      interest: "weekly",
      format: "studio",
      timing: "flex",
      goal: "",
      act: "solo",
      eventDate: "",
      venue: "",
      notes: "",
    },
  });

  const interest = watch("interest");
  const format = watch("format");
  const timing = watch("timing");
  const act = watch("act");

  useEffect(() => {
    if (book === "gig") setValue("interest", "gig");
    if (book === "lesson") setValue("interest", "weekly");
  }, [book, setValue]);

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      email: values.email,
      interest: values.interest,
      format: values.interest === "weekly" ? values.format : undefined,
      timing: values.interest === "weekly" ? values.timing : undefined,
      goal: values.interest === "weekly" ? values.goal : undefined,
      act: values.interest === "gig" ? values.act : undefined,
      eventDate: values.interest === "gig" ? values.eventDate : undefined,
      venue: values.interest === "gig" ? values.venue : undefined,
      notes: values.interest === "gig" ? values.notes : undefined,
    };
    const result = saveLead(payload);
    const links = leadShareLinks(payload);
    setShare(links);
    setCopied(false);
    setStatus(result);
    if (result === "duplicate") {
      toast("Same request is ready. Email, Instagram, or Facebook.");
    } else {
      toast(`Opening mail to ${SITE.email.address}`);
      openMail(links.mail);
    }
  }

  if (status !== "idle") {
    return (
      <div className="rounded-2xl bg-card p-8 text-card-foreground shadow-border md:p-10">
        <CheckCircle2 className="size-8 text-foreground" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-3xl">Send it from your mail app.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          To: {SITE.email.address}. Subject and the request are filled in. If
          mail did not open, use a button below — email, Instagram, or Facebook.
          I do not take texts from this page.
        </p>
        {share ? (
          <>
            <pre className="mt-6 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-secondary p-4 text-sm leading-relaxed text-foreground">
              {share.body}
            </pre>
            <div className="mt-6 grid gap-2">
              <Button asChild size="lg">
                <a href={share.mail}>
                  <Mail className="size-4" />
                  Email {SITE.email.address}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={share.dm} target="_blank" rel="noreferrer">
                  <Instagram className="size-4" />
                  Instagram DM
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={share.facebook} target="_blank" rel="noreferrer">
                  <Facebook className="size-4" />
                  Facebook message
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(share.body);
                    setCopied(true);
                    toast("Copied. Paste it in email, Instagram, or Facebook.");
                  } catch {
                    toast("Copy failed — select the note above.");
                  }
                }}
              >
                <Copy className="size-4" />
                {copied ? "Copied" : "Copy the note"}
              </Button>
            </div>
          </>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setShare(null);
            setCopied(false);
            reset();
          }}
        >
          Start over
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-border md:p-8"
      noValidate
    >
      <h3 className="font-display text-2xl tracking-tight">
        {interest === "gig" ? "Request a date" : "Book a weekly hour"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {interest === "gig"
          ? "Tell me the act, the room, and the night. I quote back by email."
          : "$60 per hour, weekly. I confirm by email."}
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-foreground">What do you want?</legend>
        <ChoiceGroup
          value={interest}
          onChange={(value) => setValue("interest", value as Interest, { shouldValidate: true })}
          items={INTERESTS}
          columns="sm:grid-cols-2"
          ariaLabel="What do you want?"
        />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            {...register("email")}
          />
          {errors.email ? (
            <FieldError id="email-error" message={errors.email.message} />
          ) : (
            <p id="email-hint" className="text-sm text-muted-foreground">
              I reply here.
            </p>
          )}
        </div>
      </div>

      {interest === "weekly" ? (
        <div className="mt-6 grid gap-6">
          <fieldset>
            <legend className="text-sm font-medium text-foreground">Where</legend>
            <ChoiceGroup
              value={format}
              onChange={(value) => setValue("format", value as Format, { shouldValidate: true })}
              items={FORMATS}
              columns="sm:grid-cols-2"
              ariaLabel="Lesson format"
            />
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-foreground">Best time</legend>
            <ChoiceGroup
              value={timing}
              onChange={(value) => setValue("timing", value as Timing, { shouldValidate: true })}
              items={TIMINGS}
              columns="grid-cols-2"
              ariaLabel="Best time"
            />
          </fieldset>
          <div className="grid gap-2">
            <Label htmlFor="goal">
              What do you want to play? <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="goal"
              rows={3}
              maxLength={280}
              placeholder="A standard, a solo, a song on your phone…"
              {...register("goal")}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6">
          <fieldset>
            <legend className="text-sm font-medium text-foreground">Which act</legend>
            <ChoiceGroup
              value={act}
              onChange={(value) => setValue("act", value as Act, { shouldValidate: true })}
              items={ACTS}
              columns="sm:grid-cols-3"
              ariaLabel="Which act"
            />
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                autoComplete="off"
                placeholder="Sat Oct 18"
                aria-invalid={Boolean(errors.eventDate)}
                aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                {...register("eventDate")}
              />
              <FieldError id="eventDate-error" message={errors.eventDate?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="venue">Town or venue</Label>
              <Input
                id="venue"
                autoComplete="address-level2"
                placeholder={act === "lowlight" ? "Cafe, speakeasy…" : "Wallingford, Foolproof…"}
                aria-invalid={Boolean(errors.venue)}
                aria-describedby={errors.venue ? "venue-error" : undefined}
                {...register("venue")}
              />
              <FieldError id="venue-error" message={errors.venue?.message} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">
              Event notes <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              rows={3}
              maxLength={400}
              placeholder={
                act === "lowlight"
                  ? "Speakeasy, cafe, listening room…"
                  : "Wedding hour, brewery patio, private party…"
              }
              {...register("notes")}
            />
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Opening email…" : interest === "gig" ? "Email this date" : "Email this lesson"}
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">
        Opens mail to {SITE.email.address}. Or{" "}
        <a
          href={SITE.instagram.dm}
          className="font-medium text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        {" / "}
        <a
          href={SITE.facebook.message}
          className="font-medium text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        . No phone number on this page.
      </p>
    </form>
  );
}
