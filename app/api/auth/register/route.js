import { NextResponse } from 'next/server';

export async function POST(req) {
  // Registration is disabled - admin users must be seeded via seed script
  return NextResponse.json({ error: 'Registration is disabled. Use the seed script to create admin users.' }, { status: 403 });
}
