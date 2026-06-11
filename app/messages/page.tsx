import { MessageCircle } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { getConversations } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

type MessagesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams;
  const recipientId = first(params.recipient);
  const conversations = await getConversations();

  return (
    <PageShell
      eyebrow="Direct messaging"
      title="Keep mentorship and networking conversations organized."
      description="Messaging is protected by authentication, participant-only access, blocking, reporting, and email notification hooks."
    >
      <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
        <section className="space-y-3">
          {conversations.map((conversation) => (
            <article key={conversation.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-950">{conversation.participant_name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{conversation.participant_headline}</p>
                </div>
                {conversation.unread_count ? (
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                    {conversation.unread_count}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-slate-600">{conversation.last_message}</p>
              <p className="mt-3 text-xs text-slate-400">{formatDateTime(conversation.last_message_at)}</p>
            </article>
          ))}
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Start a conversation</h2>
              <p className="text-sm text-slate-500">Email alerts are dispatched asynchronously after message creation.</p>
            </div>
          </div>
          <form action="/api/conversations" method="post" className="mt-6 grid gap-4">
            <input type="hidden" name="recipientId" value={recipientId ?? ""} />
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Recipient profile ID
              <input
                name="recipientIdVisible"
                defaultValue={recipientId}
                placeholder="Open from a profile to prefill"
                className="h-12 rounded-2xl border border-slate-200 px-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2"
                disabled
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Message
              <textarea
                name="body"
                rows={8}
                placeholder="Introduce yourself, be specific, and explain why you are reaching out."
                className="rounded-2xl border border-slate-200 p-3 outline-none ring-blue-500 focus:border-blue-500 focus:ring-2"
                required
              />
            </label>
            <button className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Send message
            </button>
          </form>
        </section>
      </div>
    </PageShell>
  );
}
