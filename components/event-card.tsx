import { CalendarDays, MapPin, Users } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import type { Event } from "@/types/domain";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {event.status}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {event.audience.join(" + ")}
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-950">{event.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-slate-500">
        <span className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {formatDateTime(event.starts_at)}
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {event.location ?? "Virtual event"}
        </span>
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {event.attendee_count} RSVPs
        </span>
      </div>
      <button className="mt-6 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
        RSVP
      </button>
    </article>
  );
}
