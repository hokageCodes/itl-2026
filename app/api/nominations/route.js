import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const maxDuration = 30;

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
    if (!client) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
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

        // Validate file type by extension (more reliable than MIME type)
        const fileNameLower = supportingDocument.name.toLowerCase();
        const validExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
        const hasValidExtension = validExtensions.some(ext => fileNameLower.endsWith(ext));
        if (!hasValidExtension) {
          return NextResponse.json(
            { error: 'Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files only.' },
            { status: 400 }
          );
        }

        fileName = supportingDocument.name;
        fileSize = supportingDocument.size;
        fileType = supportingDocument.type || 'application/octet-stream';

        // Check Cloudinary configuration
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
          console.error('Cloudinary configuration missing');
          return NextResponse.json(
            { error: 'File upload service is not configured. Please contact support.' },
            { status: 500 }
          );
        }

        // Convert File to Buffer
        const arrayBuffer = await supportingDocument.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Upload to Cloudinary with timeout
        const uploadResult = await Promise.race([
          new Promise((resolve, reject) => {
            try {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  resource_type: 'auto', // Automatically detect file type
                  folder: 'itl-conference/nominations',
                  use_filename: true,
                  unique_filename: true,
                  overwrite: false,
                },
                (error, result) => {
                  if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(new Error(error.message || 'Failed to upload file to cloud storage'));
                  } else {
                    resolve(result);
                  }
                }
              );
              
              uploadStream.end(buffer);
            } catch (streamError) {
              console.error('Stream creation error:', streamError);
              reject(new Error('Failed to create upload stream'));
            }
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Upload timeout - file is too large or connection is slow')), 25000)
          )
        ]);

        if (!uploadResult || !uploadResult.secure_url) {
          throw new Error('Upload completed but no URL was returned');
        }

        fileUrl = uploadResult.secure_url;
        filePublicId = uploadResult.public_id;
      } catch (fileError) {
        console.error('File upload error:', fileError);
        const errorMessage = fileError.message || 'Failed to upload file. Please try again.';
        return NextResponse.json(
          { error: errorMessage },
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
    
    // Provide more specific error messages
    let errorMessage = 'Server error. Please try again later.';
    if (err.message) {
      if (err.message.includes('timeout')) {
        errorMessage = 'Upload timeout. Please try with a smaller file or check your connection.';
      } else if (err.message.includes('Cloudinary') || err.message.includes('cloud')) {
        errorMessage = 'File upload service error. Please try again or contact support.';
      } else if (err.message.includes('MongoDB') || err.message.includes('database')) {
        errorMessage = 'Database error. Please try again later.';
      } else {
        errorMessage = err.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

