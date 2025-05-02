// app/blog/page.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '../components/blog/BlogCard';
import BlogFilter from '../components/blog/BlogFilter';

// Generate metadata for page
export const metadata = {
    title: 'Blog & Insights | David Waweru',
    description: 'Thoughts on design, development, AI, and the intersection of creativity and technology by David Waweru.',
};

// This would normally be fetched from Supabase
const blogsData = [
    {
        id: 'integrating-ai-into-design-workflow',
        title: 'Integrating AI into Your Design Workflow',
        description: 'How designers can leverage AI tools to enhance their creative process without sacrificing the human touch.',
        category: 'AI in Creative Work',
        publishedDate: 'May 1, 2025',
        readTime: '6 min read',
        featured: true,
        image: '/images/blog/ai-design-workflow.jpg',
        tags: ['AI', 'Design', 'Workflow']
    },
    {
        id: 'threejs-interactive-experiences',
        title: 'Creating Immersive Experiences with Three.js',
        description: 'A practical guide to building interactive 3D visualizations for your web projects using Three.js.',
        category: 'Development',
        publishedDate: 'April 22, 2025',
        readTime: '8 min read',
        featured: true,
        image: '/images/blog/threejs-experiences.jpg',
        tags: ['Three.js', '3D', 'WebGL']
    },
    {
        id: 'nextjs-supabase-portfolio',
        title: 'Building a Portfolio with Next.js and Supabase',
        description: 'A step-by-step guide to creating a modern, performant portfolio site with Next.js, React, and Supabase.',
        category: 'Development',
        publishedDate: 'April 14, 2025',
        readTime: '10 min read',
        featured: false,
        image: '/images/blog/nextjs-supabase.jpg',
        tags: ['Next.js', 'Supabase', 'React']
    },
    {
        id: 'design-principles-kenyan-startups',
        title: 'Design Principles for Kenyan Startups',
        description: 'Key considerations for designing digital products that resonate with East African users and markets.',
        category: 'Design Thinking',
        publishedDate: 'April 8, 2025',
        readTime: '7 min read',
        featured: false,
        image: '/images/blog/kenyan-design.jpg',
        tags: ['UX Design', 'Kenya', 'Startups']
    },
    {
        id: 'tailwind-component-system',
        title: 'Building a Scalable Component System with Tailwind CSS',
        description: 'How to structure and maintain a growing component library using Tailwind CSS and React.',
        category: 'Development',
        publishedDate: 'March 30, 2025',
        readTime: '9 min read',
        featured: false,
        image: '/images/blog/tailwind-components.jpg',
        tags: ['Tailwind CSS', 'React', 'Components']
    },
    {
        id: 'ux-research-limited-resources',
        title: 'Conducting Effective UX Research with Limited Resources',
        description: 'Practical strategies for gathering meaningful user insights when working with tight budgets and timelines.',
        category: 'Design Thinking',
        publishedDate: 'March 22, 2025',
        readTime: '6 min read',
        featured: false,
        image: '/images/blog/ux-research.jpg',
        tags: ['UX Research', 'Methods', 'Budget']
    },
    {
        id: 'ai-tools-creative-developers',
        title: 'Essential AI Tools for Creative Developers in 2025',
        description: 'A curated selection of AI-powered tools that can enhance your creativity and productivity as a developer.',
        category: 'AI in Creative Work',
        publishedDate: 'March 15, 2025',
        readTime: '8 min read',
        featured: false,
        image: '/images/blog/ai-tools.jpg',
        tags: ['AI Tools', 'Productivity', 'Creativity']
    },
    {
        id: 'fintech-ux-challenges',
        title: 'Navigating UX Challenges in Fintech Applications',
        description: 'Key considerations and solutions for designing user-friendly financial products in emerging markets.',
        category: 'Design Thinking',
        publishedDate: 'March 7, 2025',
        readTime: '7 min read',
        featured: true,
        image: '/images/blog/fintech-ux.jpg',
        tags: ['Fintech', 'UX Design', 'Case Study']
    }
];

// Categories for filtering
const categories = [
    'All Posts',
    'AI in Creative Work',
    'Design Thinking',
    'Development',
    'Career Insights',
    'Tech in East Africa'
];

export default function BlogPage() {
    // In a real implementation with React Server Components and Supabase,
    // you would fetch data using something like:
    // 
    // async function getBlogPosts() {
    //   const { data } = await supabase
    //     .from('blog_posts')
    //     .select('*')
    //     .order('published_date', { ascending: false });
    //   return data || [];
    // }
    // 
    // const posts = await getBlogPosts();

    // Get featured blog posts
    const featuredBlogs = blogsData.filter(blog => blog.featured);
    const mainFeaturedBlog = featuredBlogs[0];
    const secondaryFeaturedBlogs = featuredBlogs.slice(1, 3);

    return (
        <main className="bg-black text-white min-h-screen pb-20">
            {/* Header with 3D background */}
            <div className="relative h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Insights & <span className="text-blue-400">Ideas</span></h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Thoughts on design, development, and the intersection of creativity and technology.
                    </p>
                </div>
            </div>

            {/* Featured Posts */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Main Featured Post */}
                    {mainFeaturedBlog && (
                        <div
                            className="md:col-span-3 cursor-pointer"
                        >
                            <Link href={`/blog/${mainFeaturedBlog.id}`} className="group block h-full">
                                <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 group-hover:opacity-80 transition-all duration-500 opacity-60 z-10"></div>

                                    {mainFeaturedBlog.image && (
                                        <Image
                                            src={mainFeaturedBlog.image}
                                            alt={mainFeaturedBlog.title}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-3">
                                            {mainFeaturedBlog.category}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{mainFeaturedBlog.title}</h2>
                                        <p className="text-gray-200 line-clamp-2">{mainFeaturedBlog.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <p>{mainFeaturedBlog.publishedDate}</p>
                                    <p>{mainFeaturedBlog.readTime}</p>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Secondary Featured Posts */}
                    <div className="md:col-span-2 space-y-8">
                        {secondaryFeaturedBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="cursor-pointer"
                            >
                                <Link href={`/blog/${blog.id}`} className="group block h-full">
                                    <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 group-hover:opacity-80 transition-all duration-500 opacity-60 z-10"></div>

                                        {blog.image && (
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}

                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                            <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-3">
                                                {blog.category}
                                            </span>
                                            <h2 className="text-xl font-bold">{blog.title}</h2>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <p>{blog.publishedDate}</p>
                                        <p>{blog.readTime}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="max-w-6xl mx-auto px-6 border-t border-gray-800">
                <BlogFilter
                    categories={categories}
                    selectedCategory="All Posts"
                    setSelectedCategory={() => { }}  // This would be stateful in a client component
                    searchQuery=""
                    setSearchQuery={() => { }}  // This would be stateful in a client component
                />
            </section>

            {/* All Blog Posts */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogsData.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            index={index}
                            isLoaded={true}
                        />
                    ))}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-800">
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-10 text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
                    <p className="text-gray-200 max-w-xl mx-auto mb-8">
                        Get notified when I publish new articles and insights. No spam, just thoughtful content about design, development, and AI.
                    </p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="flex-grow px-4 py-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-full focus:ring-2 focus:ring-white focus:border-white transition-colors"
                        />
                        <button className="px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-full font-medium transition-all duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}