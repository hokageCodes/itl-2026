import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';

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

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');

    // Handle file upload if present
    let fileUrl = null;
    let filePublicId = null;
    let fileName = null;
    let fileSize = null;
    let fileType = null;
    
    if (supportingDocument && supportingDocument.size > 0) {
      try {
        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (supportingDocument.size > maxSize) {
          return NextResponse.json(
            { error: 'File size exceeds 10MB limit' },
            { status: 400 }
          );
        }

        fileName = supportingDocument.name;
        fileSize = supportingDocument.size;
        fileType = supportingDocument.type || 'application/octet-stream';

        // Convert File to Buffer
        const arrayBuffer = await supportingDocument.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto', // Automatically detect file type
              folder: 'itl-conference/nominations',
              use_filename: true,
              unique_filename: true,
              overwrite: false,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          
          uploadStream.end(buffer);
        });

        fileUrl = uploadResult.secure_url;
        filePublicId = uploadResult.public_id;
      } catch (fileError) {
        console.error('File upload error:', fileError);
        return NextResponse.json(
          { error: 'Failed to upload file. Please try again.' },
          { status: 500 }
        );
      }
    }

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
      fileUrl: fileUrl,
      filePublicId: filePublicId,
      fileName: fileName,
      fileSize: fileSize,
      fileType: fileType,
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

