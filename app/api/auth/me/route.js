import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

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
    const cookieHeader = req.headers.get('cookie') || '';
    const token = parseCookie(cookieHeader);
    if (!token) return NextResponse.json({ ok: false, user: null }, { status: 200 });
    const data = verifyToken(token);
    if (!data) return NextResponse.json({ ok: false, user: null }, { status: 200 });
    return NextResponse.json({ ok: true, user: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, user: null }, { status: 500 });
  }
}
