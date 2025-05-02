// app/not-found.jsx

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-xl">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
                <p className="text-xl text-gray-400 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 border border-white hover:border-blue-500 hover:text-blue-400 rounded-full font-medium transition-all duration-300"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </div>
    );
}