import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// COMMENTED OUT: Volunteer functionality disabled
export async function POST(req) {
  return NextResponse.json(
    { error: 'Volunteer applications are currently disabled.' },
    { status: 503 }
  );
  
  /* COMMENTED OUT - Original functionality
  try {
    const body = await req.json();
    const { name, email, phone, location, committee } = body;

    // Validate required fields
    if (!name || !email || !phone || !location || !committee) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Check if volunteer already exists with this email
    const existing = await db.collection('volunteers').findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'You have already submitted a volunteer application with this email' },
        { status: 409 }
      );
    }

    // Create volunteer document
    const volunteer = {
      name,
      email,
      phone,
      location,
      committee,
      createdAt: new Date(),
      status: 'pending', // pending, approved, rejected
    };

    // Insert into database
    const result = await db.collection('volunteers').insertOne(volunteer);

    return NextResponse.json(
      {
        success: true,
        message: 'Volunteer application submitted successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Volunteer submission error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
  */
}

