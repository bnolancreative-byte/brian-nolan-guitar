import { useEffect, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
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
    phone: z
      .string()
      .trim()
      .refine((value) => value.replace(/\D/g, "").length >= 10, "Enter a number I can text"),
    email: z.string().trim().email("Enter a valid email"),
    interest: z.enum(["weekly", "gig"]),
    format: z.enum(["studio", "online"]),
    timing: z.enum(["weekday", "evening", "weekend", "flex"]),
    goal: z.string().max(280).optional(),
    act: z.enum(["solo", "weekend-update", "hat-trick"]),
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

export function StartForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "duplicate">("idle");
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
      phone: "",
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
    const result = saveLead({
      name: values.name,
      phone: values.phone,
      email: values.email,
      interest: values.interest,
      format: values.interest === "weekly" ? values.format : undefined,
      timing: values.interest === "weekly" ? values.timing : undefined,
      goal: values.interest === "weekly" ? values.goal : undefined,
      act: values.interest === "gig" ? values.act : undefined,
      eventDate: values.interest === "gig" ? values.eventDate : undefined,
      venue: values.interest === "gig" ? values.venue : undefined,
      notes: values.interest === "gig" ? values.notes : undefined,
    });
    setStatus(result);
    if (result === "duplicate") {
      toast("That request just came through. I will text you.");
    } else {
      toast("Request received. I will text you within a day.");
    }
  }

  if (status !== "idle") {
    return (
      <div className="rounded-2xl bg-card p-8 text-card-foreground shadow-border md:p-10">
        <CheckCircle2 className="size-8 text-foreground" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-3xl">You are on the list.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          {status === "duplicate"
            ? `I already have this. Watch your phone — or ping ${SITE.instagram.label}.`
            : "I usually text first, then email. You will hear from me within one business day with the hour or the date, plus cash / Zelle / Venmo details."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setStatus("idle");
            reset();
          }}
        >
          Send another request
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
          ? "Tell me the act, the room, and the night. I quote back."
          : "$60 per hour, weekly. I text to lock the slot."}
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
          <Label htmlFor="phone">Mobile</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Number I can text"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            {...register("phone")}
          />
          {errors.phone ? (
            <FieldError id="phone-error" message={errors.phone.message} />
          ) : (
            <p id="phone-hint" className="text-sm text-muted-foreground">
              I text this to confirm.
            </p>
          )}
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
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
            <Label htmlFor="goal">What do you want to play? <span className="font-normal text-muted-foreground">(optional)</span></Label>
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
                placeholder="Wallingford, Foolproof…"
                aria-invalid={Boolean(errors.venue)}
                aria-describedby={errors.venue ? "venue-error" : undefined}
                {...register("venue")}
              />
              <FieldError id="venue-error" message={errors.venue?.message} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Event notes <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Textarea
              id="notes"
              rows={3}
              maxLength={400}
              placeholder="Wedding hour, brewery patio, private party…"
              {...register("notes")}
            />
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : interest === "gig" ? "Request this date" : "Book my weekly hour"}
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">
        I reply within one business day. $60 due at each weekly hour — cash, Zelle, or Venmo.
      </p>
    </form>
  );
}
