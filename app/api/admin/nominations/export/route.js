import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import XLSX from 'xlsx';

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
    // Verify authentication
    const cookieHeader = req.headers.get('cookie') || '';
    const token = parseCookie(cookieHeader);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise.conn;
    const db = client.db('itl-conference');
    const nominations = await db.collection('nominations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Prepare data for Excel
    const excelData = nominations.map((nom) => ({
      'Nominator Name': nom.nominatorName || '',
      'Nominator Email': nom.nominatorEmail || '',
      'Nominator Phone': nom.nominatorPhone || '',
      'Nominee Name': nom.nomineeName || '',
      'Nominee Email': nom.nomineeEmail || '',
      'Category': nom.category || '',
      'Reasons': nom.reasons || '',
      'Supporting Links': nom.supportingLinks || '',
      'File Name': nom.fileName || 'No file',
      'File Info': nom.supportingDocument || (nom.fileSize ? `${(nom.fileSize / 1024).toFixed(2)} KB` : 'No file uploaded'),
      'File URL': nom.fileUrl || 'N/A',
      'File Download Link': nom.fileName 
        ? `${req.nextUrl.origin}/api/admin/nominations/files/${nom._id.toString()}`
        : 'N/A',
      'Date': nom.createdAt ? new Date(nom.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) : '',
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Nominator Name
      { wch: 30 }, // Nominator Email
      { wch: 15 }, // Nominator Phone
      { wch: 20 }, // Nominee Name
      { wch: 30 }, // Nominee Email
      { wch: 35 }, // Category
      { wch: 50 }, // Reasons
      { wch: 40 }, // Supporting Links
      { wch: 25 }, // File Name
      { wch: 40 }, // File Info
      { wch: 60 }, // File URL
      { wch: 60 }, // File Download Link
      { wch: 15 }, // Date
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Nominations');

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Return Excel file
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="nominations-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch (err) {
    console.error('Error exporting nominations:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

