import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // expire cookie
  const cookie = `token=deleted; Path=/; HttpOnly; Max-Age=0; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`;
  res.headers.set('Set-Cookie', cookie);
  return res;
}
