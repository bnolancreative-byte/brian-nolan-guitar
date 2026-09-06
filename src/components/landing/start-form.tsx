import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ACTS,
  FORMATS,
  TIMINGS,
  saveLead,
  leadShareLinks,
  type Act,
  type Format,
  type Timing,
} from "@/lib/leads";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

const nameField = z
  .string()
  .trim()
  .min(1, "Enter your name")
  .min(2, "Name needs at least two letters")
  .max(80, "Keep the name under 80 characters")
  .refine((value) => /[A-Za-z]/.test(value), "Name needs a letter");

const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .max(254, "That email is too long")
  .email("Use a valid email, like name@email.com");

const lessonSchema = z.object({
  name: nameField,
  email: emailField,
  format: z.enum(["studio", "online"], { message: "Pick in person or live online" }),
  timing: z.enum(["weekday", "evening", "weekend", "flex"], { message: "Pick a time" }),
  goal: z.string().trim().max(280, "Keep this under 280 characters").optional(),
});

const gigSchema = z.object({
  name: nameField,
  email: emailField,
  act: z.enum(["solo", "weekend-update", "lowlight"], { message: "Pick an act" }),
  eventDate: z
    .string()
    .trim()
    .min(1, "Add the date")
    .min(4, "Add a date, like Sat Oct 18")
    .max(40, "Keep the date shorter")
    .refine(
      (value) => /\d/.test(value) || /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(value),
      "Add a real date",
    ),
  venue: z
    .string()
    .trim()
    .min(1, "Add a town or venue")
    .min(2, "Town or venue needs at least two letters")
    .max(80, "Keep the town or venue shorter"),
  notes: z.string().trim().max(400, "Keep notes under 400 characters").optional(),
});

function ChoiceGroup<T extends string>({
  value,
  onChange,
  items,
  columns,
  ariaLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  items: readonly { value: T; label: string }[];
  columns: string;
  ariaLabel: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn("mt-3 grid gap-2", columns)}>
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
              className={cn("size-2.5 shrink-0 rounded-full", selected ? "bg-foreground" : "bg-border")}
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

function SuccessCard({
  share,
  onReset,
}: {
  share: ReturnType<typeof leadShareLinks>;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl bg-card p-8 text-card-foreground shadow-border md:p-10">
      <CheckCircle2 className="size-8 text-foreground" strokeWidth={1.5} />
      <h3 className="mt-4 font-display text-3xl">Send it from your mail app.</h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        Your mail app should open with this request filled in. If it did not, use Email me below.
      </p>
      <pre className="mt-6 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-secondary p-4 text-sm leading-relaxed text-foreground">
        {share.body}
      </pre>
      <div className="mt-6 grid gap-2">
        <Button asChild size="lg">
          <a href={share.mail}>
            <Mail className="size-4" />
            Email me
          </a>
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(share.body);
              setCopied(true);
              toast("Copied. Paste it into the email.");
            } catch {
              toast("Copy failed — select the note above.");
            }
          }}
        >
          <Copy className="size-4" />
          {copied ? "Copied" : "Copy the note"}
        </Button>
      </div>
      <Button type="button" variant="ghost" className="mt-6" onClick={onReset}>
        Start over
      </Button>
    </div>
  );
}

type LessonValues = z.infer<typeof lessonSchema>;
type GigValues = z.infer<typeof gigSchema>;

export function LessonForm() {
  const [share, setShare] = useState<ReturnType<typeof leadShareLinks> | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<LessonValues>({
    resolver: zodResolver(lessonSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      format: "studio",
      timing: "flex",
      goal: "",
    },
  });

  const format = watch("format");
  const timing = watch("timing");

  function onInvalid(formErrors: FieldErrors<LessonValues>) {
    toast("Fix the highlighted fields, then send again.");
    const first = Object.keys(formErrors)[0] as keyof LessonValues | undefined;
    if (first) setFocus(first);
  }

  function onSubmit(values: LessonValues) {
    const payload = {
      name: values.name,
      email: values.email,
      interest: "weekly" as const,
      format: values.format,
      timing: values.timing,
      goal: values.goal,
    };
    const result = saveLead(payload);
    const links = leadShareLinks(payload);
    setShare(links);
    if (result === "duplicate") {
      toast("Same request is ready. Email me.");
    } else {
      toast("Opening your mail app");
      openMail(links.mail);
    }
  }

  if (share) {
    return <SuccessCard share={share} onReset={() => { setShare(null); reset(); }} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-border md:p-8"
      noValidate
    >
      <h3 className="font-display text-2xl tracking-tight">Book a weekly hour</h3>
      <p className="mt-1 text-sm text-muted-foreground">$60 per hour, weekly. I confirm by email.</p>
      {isSubmitted && !isValid ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Fix the highlighted fields, then send again.
        </p>
      ) : null}

      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="lesson-name">Name</Label>
          <Input
            id="lesson-name"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Your name"
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lesson-name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="lesson-name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lesson-email">Your email</Label>
          <Input
            id="lesson-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lesson-email-error" : "lesson-email-hint"}
            {...register("email")}
          />
          {errors.email ? (
            <FieldError id="lesson-email-error" message={errors.email.message} />
          ) : (
            <p id="lesson-email-hint" className="text-sm text-muted-foreground">
              I reply here.
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-foreground">Where</legend>
        <ChoiceGroup
          value={format}
          onChange={(value) => setValue("format", value as Format, { shouldValidate: true })}
          items={FORMATS}
          columns="grid-cols-2"
          ariaLabel="Lesson format"
        />
      </fieldset>
      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-foreground">Best time</legend>
        <ChoiceGroup
          value={timing}
          onChange={(value) => setValue("timing", value as Timing, { shouldValidate: true })}
          items={TIMINGS}
          columns="grid-cols-2"
          ariaLabel="Best time"
        />
      </fieldset>
      <div className="mt-6 grid gap-2">
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

      <Button type="submit" size="lg" className="mt-8 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Opening email…" : "Email this lesson"}
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">Opens your mail app with the request filled in.</p>
    </form>
  );
}

export function GigForm() {
  const [share, setShare] = useState<ReturnType<typeof leadShareLinks> | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<GigValues>({
    resolver: zodResolver(gigSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      act: "solo",
      eventDate: "",
      venue: "",
      notes: "",
    },
  });

  const act = watch("act");

  function onInvalid(formErrors: FieldErrors<GigValues>) {
    toast("Fix the highlighted fields, then send again.");
    const first = Object.keys(formErrors)[0] as keyof GigValues | undefined;
    if (first) setFocus(first);
  }

  function onSubmit(values: GigValues) {
    const payload = {
      name: values.name,
      email: values.email,
      interest: "gig" as const,
      act: values.act,
      eventDate: values.eventDate,
      venue: values.venue,
      notes: values.notes,
    };
    const result = saveLead(payload);
    const links = leadShareLinks(payload);
    setShare(links);
    if (result === "duplicate") {
      toast("Same request is ready. Email me.");
    } else {
      toast("Opening your mail app");
      openMail(links.mail);
    }
  }

  if (share) {
    return <SuccessCard share={share} onReset={() => { setShare(null); reset(); }} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-border md:p-8"
      noValidate
    >
      <h3 className="font-display text-2xl tracking-tight">Request a date</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell me the act, the room, and the night. I will quote back by email.
      </p>
      {isSubmitted && !isValid ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Fix the highlighted fields, then send again.
        </p>
      ) : null}

      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="gig-name">Name</Label>
          <Input
            id="gig-name"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Your name"
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "gig-name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="gig-name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gig-email">Your email</Label>
          <Input
            id="gig-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "gig-email-error" : "gig-email-hint"}
            {...register("email")}
          />
          {errors.email ? (
            <FieldError id="gig-email-error" message={errors.email.message} />
          ) : (
            <p id="gig-email-hint" className="text-sm text-muted-foreground">
              I reply here.
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-foreground">Which act</legend>
        <ChoiceGroup
          value={act}
          onChange={(value) => setValue("act", value as Act, { shouldValidate: true })}
          items={ACTS}
          columns="grid-cols-1"
          ariaLabel="Which act"
        />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="eventDate">Date</Label>
          <Input
            id="eventDate"
            autoComplete="off"
            placeholder="Sat Oct 18"
            maxLength={40}
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
            maxLength={80}
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={errors.venue ? "venue-error" : undefined}
            {...register("venue")}
          />
          <FieldError id="venue-error" message={errors.venue?.message} />
        </div>
      </div>
      <div className="mt-6 grid gap-2">
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

      <Button type="submit" size="lg" className="mt-8 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Opening email…" : "Email this date"}
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">Opens your mail app with the request filled in.</p>
    </form>
  );
}
