"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  user: { email: string };
  description: string | null;
  status: string;
  photos: { id: string; url: string }[];
  signature: string | null;
  createdAt: string;
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [params.id]);

  // Initialize canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;

    const start = (e: PointerEvent) => {
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };
    const draw = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };
    const end = () => {
      isDrawing.current = false;
      ctx.closePath();
    };
    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointerleave', end);
    return () => {
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', draw);
      canvas.removeEventListener('pointerup', end);
      canvas.removeEventListener('pointerleave', end);
    };
  }, []);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const result = evt.target?.result;
      if (typeof result === 'string') {
        // Send to API
        await fetch(`/api/jobs/${params.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoUrl: result }),
        });
        setMessage('Photo uploaded');
        router.refresh();
      }
    };
    reader.readAsDataURL(file);
  };

  const saveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    await fetch(`/api/jobs/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature: dataUrl }),
    });
    setMessage('Signature saved');
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!job) return <p className="p-4">Job not found.</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Job Details</h1>
      <div className="bg-brand p-4 rounded-lg">
        <p><strong>Customer:</strong> {job.user.email}</p>
        <p><strong>Description:</strong> {job.description ?? '—'}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleString()}</p>
      </div>
      {/* Photos */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Photos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {job.photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt="Job Photo" className="w-full h-40 object-cover rounded" />
          ))}
        </div>
        <input type="file" accept="image/*" onChange={uploadPhoto} className="block" />
      </section>
      {/* Signature pad */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Signature</h2>
        <canvas ref={canvasRef} width={400} height={200} className="border border-dashed border-gray-400 bg-white"></canvas>
        <div className="mt-2 flex space-x-4">
          <button onClick={saveSignature} className="bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-4 py-2 rounded">Save Signature</button>
          <button
            onClick={() => {
              const canvas = canvasRef.current;
              if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
              }
            }}
            className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </section>
      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
}