import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { createUser, findUserByEmail } from '@/lib/users';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const client = await clientPromise.conn;
    const db = client.db();
    const count = await db.collection('users').countDocuments();
    // Only allow registration when no users exist (safe seed)
    if (count > 0) {
      return NextResponse.json({ error: 'Registration closed' }, { status: 403 });
    }

    const existing = await findUserByEmail(email);
    if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 });

    const created = await createUser({ email, password, name });
    return NextResponse.json({ ok: true, created });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
