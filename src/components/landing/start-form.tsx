import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  saveLead,
  leadShareLinks,
  type Act,
  type Format,
  type Timing,
} from "@/lib/leads";
import { submitBooking } from "@/lib/submit-booking";
import {
  EMAIL_PATTERN,
  isValidEmail,
  isValidEventDate,
  isValidName,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

function ErrorSummary({
  id,
  items,
}: {
  id: string;
  items: { href: string; label: string; message: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div
      id={id}
      role="alert"
      tabIndex={-1}
      className="mt-4 rounded-md border border-destructive/40 p-4 outline-none"
    >
      <p className="text-sm font-medium text-destructive">
        Please correct the fields below, then send again.
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-sm text-destructive underline-offset-4 hover:underline"
            >
              {item.label}: {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nameField = z
  .string()
  .trim()
  .min(1, "Enter your name")
  .min(2, "Name needs at least two letters")
  .max(80, "Keep the name under 80 characters")
  .refine(isValidName, "Use letters. Hyphens and apostrophes are fine.");

const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .max(254, "That email is too long")
  .refine(isValidEmail, "Use a valid email, like name@email.com");

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
    .refine(isValidEventDate, "Pick a date from today on"),
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
  ariaLabelledBy,
}: {
  value: T;
  onChange: (value: T) => void;
  items: readonly { value: T; label: string; hint?: string }[];
  columns: string;
  ariaLabelledBy: string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % items.length;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + items.length) % items.length;
    }
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    onChange(items[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div role="radiogroup" aria-labelledby={ariaLabelledBy} aria-required="true" className={cn("mt-3 grid gap-2", columns)}>
      {items.map((item, index) => {
        const selected = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            ref={(node) => {
              refs.current[index] = node;
            }}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => move(event, index)}
            className={cn(
              "flex min-h-14 items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-[border-color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-foreground bg-secondary text-foreground"
                : "border-border bg-background text-foreground hover:border-foreground/40",
            )}
          >
            <span>
              <span className="block text-sm font-medium">{item.label}</span>
              {item.hint ? (
                <span className="mt-0.5 block text-sm font-normal text-muted-foreground">{item.hint}</span>
              ) : null}
            </span>
            <span
              className={cn(
                "size-4 shrink-0 rounded-full border",
                selected ? "border-foreground bg-foreground shadow-[inset_0_0_0_3px_var(--color-secondary)]" : "border-input bg-background",
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

const LESSON_FORMATS = [
  { value: "studio" as const, label: "In person", hint: "North Haven or Wallingford" },
  { value: "online" as const, label: "Online", hint: "A live video call" },
];

const LESSON_TIMES = [
  { value: "weekday" as const, label: "Weekday", hint: "Daytime" },
  { value: "evening" as const, label: "Evening", hint: "After work or school" },
  { value: "weekend" as const, label: "Weekend", hint: "Saturday or Sunday" },
  { value: "flex" as const, label: "Flexible", hint: "I’m open" },
];

const GIG_ACTS = [
  { value: "solo" as const, label: "Solo", hint: "I sing and play, acoustic or electric" },
  { value: "weekend-update" as const, label: "Weekend Update", hint: "The six-piece band I lead" },
  { value: "lowlight" as const, label: "Lowlight Collective", hint: "The small jazz group I lead" },
];

function SentCard({
  email,
  kind,
  onReset,
}: {
  email: string;
  kind: "lesson" | "gig";
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl bg-card p-8 text-card-foreground shadow-border md:p-10" role="status">
      <CheckCircle2 className="size-8 text-foreground" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="mt-4 font-display text-3xl">Got it.</h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        {kind === "gig"
          ? `I’ll email a quote to ${email}.`
          : `I’ll email ${email} to set the weekly time.`}
      </p>
      <Button type="button" variant="ghost" className="mt-6" onClick={onReset}>
        Send another
      </Button>
    </div>
  );
}

function Trap({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Fax
        <input ref={inputRef} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
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
      <CheckCircle2 className="size-8 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-4 font-display text-3xl">Send this from your email.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Your email should open with this filled in. If it doesn’t, use Send email below.
        </p>
      <pre className="mt-6 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-secondary p-4 text-sm leading-relaxed text-foreground">
        {share.body}
      </pre>
      <div className="mt-6 grid gap-2">
        <Button asChild size="lg">
          <a href={share.mail}>
            <Mail className="size-4" />
            Send email
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
  const [sentTo, setSentTo] = useState<string | null>(null);
  const trap = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<LessonValues>({
    resolver: zodResolver(lessonSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
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

  useEffect(() => {
    if (isSubmitted && !isValid) {
      document.getElementById("lesson-errors")?.focus();
    }
  }, [isSubmitted, isValid]);

  function onInvalid() {
    toast("Fix the highlighted fields, then send again.");
  }

  async function onSubmit(values: LessonValues) {
    const payload = {
      name: values.name,
      email: values.email,
      interest: "weekly" as const,
      format: values.format,
      timing: values.timing,
      goal: values.goal,
    };
    saveLead(payload);
    const links = leadShareLinks(payload);
    try {
      const result = await submitBooking({ data: { ...payload, fax: trap.current?.value ?? "" } });
      if (result.ok) {
        setSentTo(values.email.trim());
        toast("Request sent.");
        return;
      }
    } catch {
      // Fall through to the email backup.
    }
    setShare(links);
    toast("Could not send it directly. Use the email button.");
  }

  if (sentTo) {
    return (
      <SentCard
        kind="lesson"
        email={sentTo}
        onReset={() => {
          setSentTo(null);
          reset();
        }}
      />
    );
  }

  if (share) {
    return <SuccessCard share={share} onReset={() => { setShare(null); reset(); }} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="relative rounded-2xl bg-card p-6 text-card-foreground shadow-border md:p-8"
      noValidate
    >
      <Trap inputRef={trap} />
      <h3 className="font-display text-2xl tracking-tight">Book a weekly lesson</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        $60 for one hour, once a week. Tell me who you are and when you can meet.
      </p>
      {isSubmitted && !isValid ? (
        <ErrorSummary
          id="lesson-errors"
          items={[
            errors.name?.message
              ? { href: "#lesson-name", label: "Name", message: errors.name.message }
              : null,
            errors.email?.message
              ? { href: "#lesson-email", label: "Email", message: errors.email.message }
              : null,
          ].filter((item): item is { href: string; label: string; message: string } => Boolean(item))}
        />
      ) : null}

      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="lesson-name">Your name</Label>
          <Input
            id="lesson-name"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Alex Rivera"
            maxLength={80}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lesson-name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="lesson-name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lesson-email">Email for my reply</Label>
          <Input
            id="lesson-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@email.com"
            maxLength={254}
            required
            aria-required="true"
            pattern={EMAIL_PATTERN.source}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lesson-email-error" : "lesson-email-hint"}
            {...register("email")}
          />
          {errors.email ? (
            <FieldError id="lesson-email-error" message={errors.email.message} />
          ) : (
            <p id="lesson-email-hint" className="text-sm text-muted-foreground">
              I’ll write you here.
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend id="lesson-format-legend" className="text-sm font-medium text-foreground">
          Where should we meet?
        </legend>
        <ChoiceGroup
          value={format}
          onChange={(value) => setValue("format", value as Format, { shouldValidate: true })}
          items={LESSON_FORMATS}
          columns="grid-cols-1 sm:grid-cols-2"
          ariaLabelledBy="lesson-format-legend"
        />
      </fieldset>
      <fieldset className="mt-6">
        <legend id="lesson-timing-legend" className="text-sm font-medium text-foreground">
          What time works best?
        </legend>
        <ChoiceGroup
          value={timing}
          onChange={(value) => setValue("timing", value as Timing, { shouldValidate: true })}
          items={LESSON_TIMES}
          columns="grid-cols-1 sm:grid-cols-2"
          ariaLabelledBy="lesson-timing-legend"
        />
      </fieldset>
      <div className="mt-6 grid gap-2">
        <Label htmlFor="goal">
          Anything you want to play? <span className="font-normal text-muted-foreground">Optional</span>
        </Label>
        <Textarea
          id="goal"
          rows={3}
          maxLength={280}
          placeholder="A song, a part that’s stuck, or just getting started"
          {...register("goal")}
        />
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send my lesson request"}
      </Button>
      <p className="mt-3 text-center text-sm text-muted-foreground">I’ll reply by email. No account needed.</p>
    </form>
  );
}

export function GigForm() {
  const [share, setShare] = useState<ReturnType<typeof leadShareLinks> | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const trap = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<GigValues>({
    resolver: zodResolver(gigSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
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

  useEffect(() => {
    if (isSubmitted && !isValid) {
      document.getElementById("gig-errors")?.focus();
    }
  }, [isSubmitted, isValid]);

  function onInvalid() {
    toast("Fix the highlighted fields, then send again.");
  }

  async function onSubmit(values: GigValues) {
    const payload = {
      name: values.name,
      email: values.email,
      interest: "gig" as const,
      act: values.act,
      eventDate: values.eventDate,
      venue: values.venue,
      notes: values.notes,
    };
    saveLead(payload);
    const links = leadShareLinks(payload);
    try {
      const result = await submitBooking({ data: { ...payload, fax: trap.current?.value ?? "" } });
      if (result.ok) {
        setSentTo(values.email.trim());
        toast("Request sent.");
        return;
      }
    } catch {
      // Fall through to the email backup.
    }
    setShare(links);
    toast("Could not send it directly. Use the email button.");
  }

  if (sentTo) {
    return (
      <SentCard
        kind="gig"
        email={sentTo}
        onReset={() => {
          setSentTo(null);
          reset();
        }}
      />
    );
  }

  if (share) {
    return <SuccessCard share={share} onReset={() => { setShare(null); reset(); }} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="relative rounded-2xl bg-card p-6 text-card-foreground shadow-border md:p-8"
      noValidate
    >
      <Trap inputRef={trap} />
      <h3 className="font-display text-2xl tracking-tight">Book a gig</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick what you want, then the date and the room. I’ll email you a quote.
      </p>
      {isSubmitted && !isValid ? (
        <ErrorSummary
          id="gig-errors"
          items={[
            errors.name?.message
              ? { href: "#gig-name", label: "Name", message: errors.name.message }
              : null,
            errors.email?.message
              ? { href: "#gig-email", label: "Email", message: errors.email.message }
              : null,
            errors.eventDate?.message
              ? { href: "#eventDate", label: "Date", message: errors.eventDate.message }
              : null,
            errors.venue?.message
              ? { href: "#venue", label: "Town or venue", message: errors.venue.message }
              : null,
          ].filter((item): item is { href: string; label: string; message: string } => Boolean(item))}
        />
      ) : null}

      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="gig-name">Your name</Label>
          <Input
            id="gig-name"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Alex Rivera"
            maxLength={80}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "gig-name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="gig-name-error" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gig-email">Email for my reply</Label>
          <Input
            id="gig-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@email.com"
            maxLength={254}
            required
            aria-required="true"
            pattern={EMAIL_PATTERN.source}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "gig-email-error" : "gig-email-hint"}
            {...register("email")}
          />
          {errors.email ? (
            <FieldError id="gig-email-error" message={errors.email.message} />
          ) : (
            <p id="gig-email-hint" className="text-sm text-muted-foreground">
              I’ll write you here.
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend id="gig-act-legend" className="text-sm font-medium text-foreground">
          What do you want to book?
        </legend>
        <ChoiceGroup
          value={act}
          onChange={(value) => setValue("act", value as Act, { shouldValidate: true })}
          items={GIG_ACTS}
          columns="grid-cols-1"
          ariaLabelledBy="gig-act-legend"
        />
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="eventDate">Date of the gig</Label>
          <Input
            id="eventDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            autoComplete="off"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.eventDate)}
            aria-describedby={errors.eventDate ? "eventDate-error" : "eventDate-hint"}
            {...register("eventDate")}
          />
          {errors.eventDate ? (
            <FieldError id="eventDate-error" message={errors.eventDate.message} />
          ) : (
            <p id="eventDate-hint" className="text-sm text-muted-foreground">
              Within about 60 miles of Wallingford.
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="venue">Town or room</Label>
          <Input
            id="venue"
            autoComplete="address-level2"
            placeholder={act === "lowlight" ? "Cafe or speakeasy" : "Wallingford, Foolproof Brewing"}
            maxLength={80}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={errors.venue ? "venue-error" : undefined}
            {...register("venue")}
          />
          <FieldError id="venue-error" message={errors.venue?.message} />
        </div>
      </div>
      <div className="mt-6 grid gap-2">
        <Label htmlFor="notes">
          Anything else? <span className="font-normal text-muted-foreground">Optional</span>
        </Label>
        <Textarea
          id="notes"
          rows={3}
          maxLength={400}
          placeholder={
            act === "lowlight"
              ? "Listening room, cafe, or private dinner"
              : act === "weekend-update"
                ? "Brewery, hall, or private event"
                : "Acoustic or electric; dinner, reception, or private event"
          }
          {...register("notes")}
        />
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send my gig request"}
      </Button>
      <p className="mt-3 text-center text-sm text-muted-foreground">I’ll reply by email with a quote. No account needed.</p>
    </form>
  );
}
