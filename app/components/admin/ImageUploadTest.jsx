// app/components/admin/ImageUploadTest.jsx
"use client";

import { useState } from 'react';
import { uploadImage } from '../../lib/supabase/uploadImage';

export default function ImageUploadTest() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // Reset states
        setResult(null);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setUploading(true);
        setError(null);
        setResult(null);

        try {
            // Use a test ID for testing purposes
            const { data, error } = await uploadImage(file, 'test', 'test-upload');

            if (error) {
                throw new Error(error);
            }

            setResult(data);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'An error occurred during upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Image Upload Test</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Select an image to upload
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded p-2"
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`px-4 py-2 rounded ${!file || uploading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <h3 className="font-bold">Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <h3 className="font-bold">Upload Successful!</h3>
                    <p>Path: {result.path}</p>
                    <div className="mt-2">
                        <p>Preview:</p>
                        <img
                            src={result.url}
                            alt="Uploaded image preview"
                            className="mt-2 max-w-full h-auto max-h-48 rounded"
                        />
                    </div>
                    <p className="mt-2">
                        <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Open image in new tab
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}