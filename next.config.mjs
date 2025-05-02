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
  swcMinify: true,
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
  // Analyze bundle size in production build (uncomment if needed)
  // webpack: (config, { isServer }) => {
  //   if (process.env.ANALYZE && !isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: 8888,
  //         openAnalyzer: true,
  //       })
  //     );
  //   }
  //   return config;
  // },
  // Experimental features
  experimental: {
    optimizeCss: true, // CSS optimization
    esmExternals: true, // Enable tree-shaking for external libraries
  },
};

export default nextConfig;
