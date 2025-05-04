// app/admin/test-upload/page.jsx
"use client";

import ImageUploadTest from '../../components/admin/ImageUploadTest';

export default function TestUploadPage() {
    return (
        <div className="max-w-3xl mx-auto my-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Supabase Storage Testing</h1>
            <ImageUploadTest />
        </div>
    );
}