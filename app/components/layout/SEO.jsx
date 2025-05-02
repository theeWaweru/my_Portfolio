// app/components/layout/SEO.jsx

import React from 'react';
import Head from 'next/head';

const SEO = ({
    title,
    description,
    image,
    url,
    keywords,
    ogType = 'website'
}) => {
    // Base values if not provided
    const defaultTitle = "David Waweru | AI Creative Developer";
    const defaultDescription = "Portfolio of David Waweru, an AI Creative Developer based in Nairobi, Kenya, specializing in UI/UX design and web development.";
    const defaultImage = "/images/general/og-image.jpg"; // Default social sharing image
    const defaultUrl = "https://theewaweru.dev"; // Your domain
    const defaultKeywords = "AI Creative Developer, UI/UX Design, Web Development, Nairobi, Kenya, React, Next.js, Three.js";

    // Use provided values or fallback to defaults
    const seoTitle = title ? `${title} | ${defaultTitle.split('|')[0].trim()}` : defaultTitle;
    const seoDescription = description || defaultDescription;
    const seoImage = image || defaultImage;
    const seoUrl = url || defaultUrl;
    const seoKeywords = keywords || defaultKeywords;

    return (
        <Head>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seoUrl} />
            <meta property="twitter:title" content={seoTitle} />
            <meta property="twitter:description" content={seoDescription} />
            <meta property="twitter:image" content={seoImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={seoUrl} />

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />

            {/* Color Theme */}
            <meta name="theme-color" content="#000000" />
        </Head>
    );
};

export default SEO;