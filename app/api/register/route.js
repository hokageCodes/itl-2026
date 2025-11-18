import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, ticketType } = body;

    // Validate required fields
    if (!name || !email || !phone || !location || !ticketType) {
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

    // Connect to MongoDB
    const client = await clientPromise.conn;
    const db = client.db('itl-conference');
    const registrationsCollection = db.collection('registrations');

    // Check if email already exists
    const existingRegistration = await registrationsCollection.findOne({ email });
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }

    // Insert registration
    const registrationData = {
      name,
      email,
      phone,
      location,
      ticketType,
      createdAt: new Date(),
    };

    await registrationsCollection.insertOne(registrationData);

    return NextResponse.json(
      { message: 'Registration submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
