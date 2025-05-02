// app/lib/utils/seo.js

/**
 * Generate meta tags for SEO
 * @param {Object} config - SEO configuration
 * @returns {Object} - Meta tag data
 */
export const generateMetadata = (config = {}) => {
  const {
    title,
    description,
    keywords,
    openGraph,
    twitter,
    canonical,
    noIndex = false,
    alternates = {},
    themeColor = "#000000",
  } = config;

  // Base metadata
  const metadata = {
    title: title || "David Waweru | AI Creative Developer",
    description:
      description ||
      "Portfolio of David Waweru, an AI Creative Developer based in Nairobi, Kenya, specializing in UI/UX design and web development.",
    keywords:
      keywords ||
      "AI Creative Developer, UI/UX Design, Web Development, Three.js, React, Next.js, Nairobi, Kenya",
    metadataBase: new URL("https://theewaweru.dev"),
    alternates: {
      canonical: canonical,
      ...alternates,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    themeColor: themeColor,
  };

  // Open Graph metadata
  metadata.openGraph = {
    type: "website",
    locale: "en_US",
    url: canonical || "https://theewaweru.dev",
    title: openGraph?.title || title || metadata.title,
    description: openGraph?.description || description || metadata.description,
    siteName: "theeWaweru.dev",
    images: openGraph?.images || [
      {
        url: "https://theewaweru.dev/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David Waweru - AI Creative Developer",
      },
    ],
    ...openGraph,
  };

  // Twitter metadata
  metadata.twitter = {
    card: "summary_large_image",
    title: twitter?.title || title || metadata.title,
    description: twitter?.description || description || metadata.description,
    images: twitter?.images || metadata.openGraph.images,
    creator: twitter?.creator || "@theeWaweru",
    ...twitter,
  };

  return metadata;
};

/**
 * Generate structured data for rich search results
 * @param {String} type - Type of structured data
 * @param {Object} data - Structured data configuration
 * @returns {Object} - JSON-LD structured data
 */
export const generateStructuredData = (type, data = {}) => {
  switch (type) {
    case "person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.name || "David Waweru",
        alternateName: data.alternateName || "theeWaweru",
        url: data.url || "https://theewaweru.dev",
        image: data.image || "https://theewaweru.dev/images/david-waweru.jpg",
        jobTitle: data.jobTitle || "AI Creative Developer",
        worksFor: data.worksFor || {
          "@type": "Organization",
          name: data.organizationName || "Self-employed",
        },
        sameAs: data.sameAs || [
          "https://github.com/theeWaweru",
          "https://linkedin.com/in/theewaweru",
        ],
        description:
          data.description ||
          "AI Creative Developer specializing in UI/UX design and web development.",
      };

    case "project":
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: data.name || "",
        author: {
          "@type": "Person",
          name: data.authorName || "David Waweru",
        },
        datePublished: data.datePublished || "",
        description: data.description || "",
        image: data.image || "",
        url: data.url || "",
      };

    case "blogPost":
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.headline || "",
        description: data.description || "",
        image: data.image || "",
        datePublished: data.datePublished || "",
        dateModified: data.dateModified || data.datePublished || "",
        author: {
          "@type": "Person",
          name: data.authorName || "David Waweru",
        },
        publisher: {
          "@type": "Person",
          name: data.publisherName || "David Waweru",
          logo: {
            "@type": "ImageObject",
            url: data.publisherLogo || "https://theewaweru.dev/images/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url || "",
        },
      };

    default:
      return {};
  }
};

/**
 * Generate a sitemap entry
 * @param {String} url - URL of the page
 * @param {Object} options - Sitemap options
 * @returns {Object} - Sitemap entry
 */
export const generateSitemapEntry = (url, options = {}) => {
  const {
    changeFrequency = "monthly",
    priority = 0.7,
    lastModified = new Date(),
  } = options;

  return {
    url,
    lastModified,
    changeFrequency,
    priority,
  };
};

export default {
  generateMetadata,
  generateStructuredData,
  generateSitemapEntry,
};
