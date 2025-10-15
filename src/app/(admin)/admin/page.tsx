import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminPage() {
  // Fetch data from the database using Prisma.
  const [users, jobs, payments] = await Promise.all([
    prisma.user.findMany({ include: { plan: true } }),
    prisma.job.findMany({ include: { user: true } }),
    prisma.payment.findMany(),
  ]);
  // Compute simple KPIs
  const totalCustomers = users.length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0) / 100; // convert cents to units
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* KPI cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-brand-dark p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-2xl">{totalCustomers}</p>
        </div>
        <div className="bg-brand-dark p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jobs</h2>
          <p className="text-2xl">{jobs.length}</p>
        </div>
        <div className="bg-brand-dark p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Revenue (AED)</h2>
          <p className="text-2xl">{totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      {/* Users table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-dark">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="odd:bg-brand">
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.plan?.name ?? '—'}</td>
                  <td className="px-4 py-2 capitalize">{user.role.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Jobs table */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Jobs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-dark">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="odd:bg-brand">
                  <td className="px-4 py-2">{job.user.email}</td>
                  <td className="px-4 py-2 capitalize">{job.status.toLowerCase()}</td>
                  <td className="px-4 py-2">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <Link href={`/crew/job/${job.id}`} className="underline text-yellow-400">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}