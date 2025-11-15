import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/users';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = await verifyUser(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ sub: user._id?.toString?.() || user._id, email: user.email, name: user.name, role: user.role });

    const res = NextResponse.json({ ok: true, user: { email: user.email, name: user.name, role: user.role } });
    const secure = process.env.NODE_ENV === 'production';
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax; ${secure ? 'Secure; ' : ''}`;
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
