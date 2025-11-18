import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const nominatorName = formData.get('nominatorName');
    const nominatorPhone = formData.get('nominatorPhone');
    const nominatorEmail = formData.get('nominatorEmail');
    const nomineeName = formData.get('nomineeName');
    const nomineeEmail = formData.get('nomineeEmail');
    const category = formData.get('category');
    const reasons = formData.get('reasons');
    const supportingLinks = formData.get('supportingLinks') || '';
    const supportingDocument = formData.get('supportingDocument');

    // Validate required fields
    if (!nominatorName || !nominatorPhone || !nominatorEmail || !nomineeName || !nomineeEmail || !category || !reasons) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nominatorEmail) || !emailRegex.test(nomineeEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(nominatorPhone) || nominatorPhone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Handle file upload if present
    let fileUrl = null;
    let fileName = null;
    
    if (supportingDocument && supportingDocument.size > 0) {
      // In a production environment, you would upload to cloud storage (S3, Cloudinary, etc.)
      // For now, we'll store file metadata
      fileName = supportingDocument.name;
      fileUrl = `File uploaded: ${supportingDocument.name} (${(supportingDocument.size / 1024).toFixed(2)} KB)`;
      
      // Note: In production, upload the file to cloud storage and store the URL
      // Example: const fileUrl = await uploadToCloudStorage(supportingDocument);
    }

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');

    // Check if nomination already exists with this combination
    const existing = await db.collection('nominations').findOne({
      nominatorEmail,
      nomineeEmail,
      category,
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You have already submitted a nomination for this nominee in this category' },
        { status: 409 }
      );
    }

    // Create nomination document
    const nomination = {
      nominatorName,
      nominatorPhone,
      nominatorEmail,
      nomineeName,
      nomineeEmail,
      category,
      reasons,
      supportingLinks: supportingLinks || '',
      supportingDocument: fileUrl,
      fileName: fileName,
      createdAt: new Date(),
      status: 'pending', // pending, reviewed, shortlisted, rejected
    };

    // Insert into database
    const result = await db.collection('nominations').insertOne(nomination);

    return NextResponse.json(
      {
        success: true,
        message: 'Nomination submitted successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Nomination submission error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}

