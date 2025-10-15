import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

// GET: return job details as JSON
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { user: true, photos: true },
  });
  if (!job) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(JSON.stringify(job));
}

// POST: handle photo upload and/or signature update
export async function POST(req: NextRequest, { params }: { params: Params }) {
  // For simplicity, this endpoint accepts JSON with optional `signature` and `photoUrl`
  const body = await req.json();
  const { signature, photoUrl, status } = body;
  try {
    if (photoUrl) {
      await prisma.photo.create({
        data: { jobId: params.id, url: photoUrl },
      });
    }
    if (signature) {
      await prisma.job.update({
        where: { id: params.id },
        data: { signature },
      });
    }
    if (status) {
      await prisma.job.update({
        where: { id: params.id },
        data: { status },
      });
    }
    return new Response('OK');
  } catch (err) {
    console.error(err);
    return new Response('Error updating job', { status: 500 });
  }
}