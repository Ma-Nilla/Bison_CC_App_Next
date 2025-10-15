export default function CancelPage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-4">Your payment was cancelled. You can try again at any time.</p>
      <a href="/" className="underline text-yellow-400">Return to home</a>
    </div>
  );
}