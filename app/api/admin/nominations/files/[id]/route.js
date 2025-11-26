import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';

function parseCookie(header) {
  if (!header) return null;
  const raw = header.split(';').map(p => p.trim());
  for (const part of raw) {
    if (part.startsWith('token=')) return part.replace('token=', '');
  }
  return null;
}

export async function GET(req, { params }) {
  try {
    // Verify authentication
    const cookieHeader = req.headers.get('cookie') || '';
    const token = parseCookie(cookieHeader);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Nomination ID is required' }, { status: 400 });
    }

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');
    const nomination = await db.collection('nominations').findOne({ _id: new ObjectId(id) });

    if (!nomination) {
      return NextResponse.json({ error: 'Nomination not found' }, { status: 404 });
    }

    if (!nomination.fileUrl && !nomination.filePublicId) {
      return NextResponse.json({ error: 'No file attached to this nomination' }, { status: 404 });
    }

    // Redirect to Cloudinary URL for direct download
    if (nomination.fileUrl) {
      // Add download parameter to force download
      const downloadUrl = nomination.fileUrl.replace('/upload/', '/upload/fl_attachment/');
      return NextResponse.redirect(downloadUrl);
    }

    return NextResponse.json({ error: 'File URL not available' }, { status: 404 });
  } catch (err) {
    console.error('Error fetching file:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

