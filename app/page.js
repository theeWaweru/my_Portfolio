// app/page.js

import React from "react";
import Hero from "./components/home/Hero";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import TechEcosystem from "./components/threejs/TechEcosystem";
import { useFeaturedProjects } from "./lib/hooks/useProjects";
import { useFeaturedBlogPosts } from "./lib/hooks/useBlogPosts";
import Image from "next/image";
import Link from "next/link";

// Generate metadata for page
export const metadata = {
  title: "David Waweru | AI Creative Developer",
  description:
    "Portfolio of David Waweru, an AI Creative Developer based in Nairobi, Kenya, specializing in UI/UX design and web development.",
  keywords:
    "AI Creative Developer, UI/UX Design, Web Development, Three.js, React, Next.js, Nairobi, Kenya",
};

export default function Home() {
  // In the App Router, you'll use React Server Components for data fetching
  // Instead of calling hooks like useFeaturedProjects and useFeaturedBlogPosts
  // You would fetch data using async/await at the top level
  // Example:
  // async function getData() {
  //   const projectsData = await fetchFeaturedProjects();
  //   const blogData = await fetchFeaturedBlogPosts();
  //   return { projects: projectsData, blogPosts: blogData };
  // }

  // For demo purposes, using mock data
  const featuredProjects = [
    {
      id: "furaha-financial",
      title: "Furaha Financial",
      description:
        "Complete redesign of a digital banking platform focused on improving user experience and accessibility.",
      category: "UI/UX Design",
      tags: ["Fintech", "Web App", "Mobile App"],
      image: "/images/projects/featured-1.jpg",
    },
    {
      id: "chupachap",
      title: "Chupachap",
      description:
        "E-commerce platform designed and developed for a local marketplace with integrated payment processing.",
      category: "Web Development",
      tags: ["E-commerce", "Web App", "Payments"],
      image: "/images/projects/featured-2.jpg",
    },
    {
      id: "spatial-thinking",
      title: "Spatial Thinking",
      description:
        "Experimental 3D visualization of geographical data using Three.js for educational purposes.",
      category: "3D Visualization",
      tags: ["Education", "Three.js", "Data Viz"],
      image: "/images/projects/featured-3.jpg",
    },
  ];

  const featuredPosts = [
    {
      id: "integrating-ai-into-design-workflow",
      title: "Integrating AI into Your Design Workflow",
      description:
        "How designers can leverage AI tools to enhance their creative process without sacrificing the human touch.",
      category: "AI in Creative Work",
      publishedDate: "May 1, 2025",
      readTime: "6 min read",
      image: "/images/blog/blog-1.jpg",
    },
    {
      id: "threejs-interactive-experiences",
      title: "Creating Immersive Experiences with Three.js",
      description:
        "A practical guide to building interactive 3D visualizations for your web projects using Three.js.",
      category: "Development",
      publishedDate: "April 22, 2025",
      readTime: "8 min read",
      image: "/images/blog/blog-2.jpg",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-blue-500">Me</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                I&apos;m a self-taught UI/UX designer and web developer with
                over 5 years of experience crafting digital solutions in
                Nairobi, Kenya. I began my journey at MB96, where I honed my
                skills across diverse client projects.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                My ambition is to position myself as a multi-disciplinary
                product developer, currently pivoting toward design-led product
                discovery and management work.
              </p>
              <Link
                href="/about"
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
              >
                Learn more about my journey
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            <div>
              <div className="bg-gradient-to-br from-blue-900 to-black p-1 rounded-lg">
                <div className="bg-black p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    Technical Proficiency
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "Figma", level: 9 },
                      { name: "Webflow", level: 9 },
                      { name: "HTML/CSS/JS", level: 8 },
                      { name: "React", level: 7 },
                      { name: "WordPress", level: 8 },
                      { name: "Three.js", level: 4 },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}/10</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${skill.level * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Technology Ecosystem */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              My Technology <span className="text-blue-500">Ecosystem</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore the technologies I work with to create exceptional digital
              experiences. Click on each node to learn more.
            </p>
          </div>

          <div className="h-[70vh] rounded-xl overflow-hidden">
            <TechEcosystem
              onTechClick={(tech) => console.log("Clicked:", tech.name)}
            />
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Featured <span className="text-blue-500">Work</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A selection of projects that showcase my approach to solving
              complex design and development challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                imageAlt={`${project.title} project thumbnail`}
                href={`/work/${project.id}`}
                tags={project.tags}
                imagePosition="top"
                aspectRatio="aspect-[6/9]"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/work" variant="outline" className="rounded-full">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Latest <span className="text-blue-500">Insights</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Thoughts on design, development, and the intersection of
              creativity and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 group-hover:opacity-80 transition-all duration-500 opacity-60 z-10"></div>

                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <p>{post.publishedDate}</p>
                  <p>{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/blog" variant="outline" className="rounded-full">
              Read All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let&apos;s Create Something{" "}
            <span className="text-blue-300">Remarkable</span>
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Ready to collaborate on your next project or just want to say hello?
            I&apos;m always open to discussing new opportunities.
          </p>
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="rounded-full bg-white text-blue-900 hover:bg-gray-100"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
