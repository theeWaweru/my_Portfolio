// app/sitemap.js

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function sitemap() {
  const baseUrl = "https://theewaweru.dev";

  // Define static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Fetch projects
  let projectPages = [];
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, updated_at")
      .order("updated_at", { ascending: false });

    if (!error && projects) {
      projectPages = projects.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: new Date(project.updated_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  // Fetch blog posts
  let blogPages = [];
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, updated_at")
      .order("updated_at", { ascending: false });

    if (!error && posts) {
      blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.updated_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  // Combine all pages
  return [...staticPages, ...projectPages, ...blogPages];
}
