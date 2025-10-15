import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function CrewHome() {
  const jobs = await prisma.job.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Crew Jobs</h1>
      <p className="mb-6">Below is a list of active jobs assigned to your team.</p>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/crew/job/${job.id}`}
            className="block bg-brand p-4 rounded-lg shadow hover:bg-brand-light transition-colors"
          >
            <h2 className="text-xl font-semibold mb-1">{job.user.email}</h2>
            <p className="text-sm mb-2">{job.description ?? 'No description provided.'}</p>
            <span className="text-xs uppercase">Status: {job.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}