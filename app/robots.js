// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://theewaweru.dev/sitemap.xml",
    host: "https://theewaweru.dev",
  };
}
