// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "rvbruxscpsohtbkbhjcn.supabase.co", // Supabase storage domain
      "images.unsplash.com", // Unsplash for placeholder images if needed
      "theewaweru.dev", // Your own domain for self-hosted images
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60, // Cache duration in seconds
  },
  // Compression and performance optimizations
  compress: true,
  // swcMinify has been removed as it's now the default
  // Configure redirects if needed
  redirects: async () => {
    return [
      // Example redirect (uncomment if needed)
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },
  // Configure headers for security and caching
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Remove the experimental section or keep it empty
  experimental: {
    // Removed incrementalCacheHandlerPath as it's invalid
  },
};

export default nextConfig;
