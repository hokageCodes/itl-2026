"use client";


export default function AdminPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of site activity and quick actions.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Visitors<br/><div className="text-2xl font-semibold">1,234</div></div>
        <div className="p-4 bg-white rounded shadow">Posts<br/><div className="text-2xl font-semibold">42</div></div>
        <div className="p-4 bg-white rounded shadow">Storage<br/><div className="text-2xl font-semibold">12.3 GB</div></div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Media upload (Cloudinary unsigned example)</h2>
        <p className="text-sm text-gray-600 mb-3">Use an unsigned upload preset from Cloudinary for direct client uploads.</p>
        <MediaUploader />
      </section>
    </>
  );
}


function MediaUploader() {
  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    // REPLACE with your cloudinary upload preset and cloud name in env and expose them to client via next config or a small endpoint
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!uploadPreset || !cloudName) {
      alert('Cloudinary not configured (set NEXT_PUBLIC_CLOUDINARY_* env variables)');
      return;
    }
    form.append('file', file);
    form.append('upload_preset', uploadPreset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data?.secure_url) {
      alert('Uploaded: ' + data.secure_url);
    } else {
      alert('Upload failed');
    }
  }
  return (
    <div className="flex items-center gap-3">
      <input type="file" onChange={handleFile} />
    </div>
  );
}
