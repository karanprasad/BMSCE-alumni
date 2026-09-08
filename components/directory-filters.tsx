import { Search } from "lucide-react";

type DirectoryFiltersProps = {
  defaults: Record<string, string | undefined>;
};

export function DirectoryFilters({ defaults }: DirectoryFiltersProps) {
  return (
    <form className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" action="/directory">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
        <label className="relative lg:col-span-2">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            name="q"
            defaultValue={defaults.q}
            placeholder="Search name, company, skill"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <input
          name="company"
          defaultValue={defaults.company}
          placeholder="Company"
          className="h-11 rounded-2xl border border-slate-200 px-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <input
          name="location"
          defaultValue={defaults.location}
          placeholder="Location"
          className="h-11 rounded-2xl border border-slate-200 px-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <input
          name="industry"
          defaultValue={defaults.industry}
          placeholder="Industry"
          className="h-11 rounded-2xl border border-slate-200 px-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <button className="h-11 rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
          Search
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          name="skills"
          defaultValue={defaults.skills}
          placeholder="Skills, comma separated"
          className="h-11 rounded-2xl border border-slate-200 px-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
        <input
          name="graduationYear"
          defaultValue={defaults.graduationYear}
          placeholder="Graduation year"
          inputMode="numeric"
          className="h-11 rounded-2xl border border-slate-200 px-3 text-sm outline-none ring-blue-500 transition focus:border-blue-500 focus:ring-2"
        />
      </div>
    </form>
  );
}
