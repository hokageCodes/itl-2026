import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

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
    const nominations = await db.collection('nominations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB _id to string and include file info
    const formattedNominations = nominations.map(nom => ({
      ...nom,
      _id: nom._id.toString(),
      createdAt: nom.createdAt?.toISOString() || new Date().toISOString(),
      // Keep supportingDocument for backward compatibility
      supportingDocument: nom.supportingDocument || (nom.fileName ? `File: ${nom.fileName} (${nom.fileSize ? (nom.fileSize / 1024).toFixed(2) + ' KB' : ''})` : null),
    }));

    return NextResponse.json({ success: true, data: formattedNominations });
  } catch (err) {
    console.error('Error fetching nominations:', err);
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
    
    // Get nomination to check for associated file
    const nomination = await db.collection('nominations').findOne({ _id: new ObjectId(id) });
    
    if (!nomination) {
      return NextResponse.json({ error: 'Nomination not found' }, { status: 404 });
    }

    // Delete associated file from Cloudinary if it exists
    if (nomination.filePublicId) {
      try {
        await cloudinary.uploader.destroy(nomination.filePublicId);
      } catch (fileError) {
        console.error('Error deleting file from Cloudinary:', fileError);
        // Continue with nomination deletion even if file deletion fails
      }
    }

    // Delete nomination
    const result = await db.collection('nominations').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: 'Nomination deleted successfully' });
  } catch (err) {
    console.error('Error deleting nomination:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

