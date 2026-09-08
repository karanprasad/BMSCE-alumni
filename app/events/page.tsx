import { EventCard } from "@/components/event-card";
import { PageShell } from "@/components/page-shell";
import { getEvents } from "@/lib/data";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageShell
      eyebrow="Events"
      title="Discover alumni talks, mixers, and community events."
      description="Admins can publish events, manage capacity, and track RSVPs. Students and alumni can RSVP from any device."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageShell>
  );
}
