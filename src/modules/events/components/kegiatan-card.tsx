import Link from "next/link";

export interface EventSummary {
  slug: string;
  title: string;
  startAt: Date;
  location: string;
  isRegistrationOpen: boolean;
}

// WHY this formatter lives here instead of a generic utils file: it's
// specific to how event dates read on this site (long month name).
// Keeping it next to the card it serves means the events module stays
// a self-contained unit instead of scattering related pieces around.
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

interface EventCardProps {
  event: EventSummary;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/kegiatan/${event.slug}`}
      className="block h-full rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      {event.isRegistrationOpen ? (
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Pendaftaran Dibuka
        </span>
      ) : null}
      <h3 className="mt-3 text-lg font-semibold text-foreground">
        {event.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {formatEventDate(event.startAt)} · {event.location}
      </p>
    </Link>
  );
}
