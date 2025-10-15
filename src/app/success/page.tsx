import { redirect } from 'next/navigation';

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id;
  // Optionally, we could verify the session or show success details.
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
      <p className="mb-4">Thank you for subscribing! Your transaction was successful.</p>
      <a href="/" className="underline text-yellow-400">Return to home</a>
    </div>
  );
}