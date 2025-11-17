import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');

    // Check if sponsor inquiry already exists with this email
    const existing = await db.collection('sponsors').findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'You have already submitted a sponsorship inquiry with this email' },
        { status: 409 }
      );
    }

    // Create sponsor document
    const sponsor = {
      name,
      email,
      phone,
      company,
      message: message || '',
      createdAt: new Date(),
      status: 'pending', // pending, contacted, approved, rejected
    };

    // Insert into database
    const result = await db.collection('sponsors').insertOne(sponsor);

    return NextResponse.json(
      {
        success: true,
        message: 'Sponsorship inquiry submitted successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Sponsor submission error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}

