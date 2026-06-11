import { AlumniCard } from "@/components/alumni-card";
import { DirectoryFilters } from "@/components/directory-filters";
import { PageShell } from "@/components/page-shell";
import { getAlumniProfiles } from "@/lib/data";

type DirectoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const filters = {
    q: first(params.q),
    company: first(params.company),
    location: first(params.location),
    industry: first(params.industry),
    graduationYear: first(params.graduationYear),
    skills: first(params.skills)
  };
  const profiles = await getAlumniProfiles(filters);

  return (
    <PageShell
      eyebrow="Alumni directory"
      title="Find the right BMSCE alumni for guidance, referrals, and networking."
      description="Search verified alumni by company, location, industry, graduation year, and skills."
    >
      <DirectoryFilters defaults={filters} />
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{profiles.length} alumni found</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => (
          <AlumniCard key={profile.id} profile={profile} />
        ))}
      </div>
    </PageShell>
  );
}
