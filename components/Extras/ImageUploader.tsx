'use client';

import { useState } from 'react';

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    setUploading(false);

    if (data.secure_url) {
      setPreview(data.secure_url);
      onUpload(data.secure_url); // ✅ pass to parent
    } else {
      setError('Upload failed');
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p className="text-muted text-sm">Uploading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded object-cover" />}
    </div>
  );
}
