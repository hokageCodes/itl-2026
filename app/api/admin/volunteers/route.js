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

export async function GET(req) {
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

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');
    const volunteers = await db.collection('volunteers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB _id to string
    const formattedVolunteers = volunteers.map(vol => ({
      ...vol,
      _id: vol._id.toString(),
      createdAt: vol.createdAt?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formattedVolunteers });
  } catch (err) {
    console.error('Error fetching volunteers:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');
    
    const result = await db.collection('volunteers').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Volunteer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Volunteer deleted successfully' });
  } catch (err) {
    console.error('Error deleting volunteer:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
