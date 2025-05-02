// app/blog/[slug]/page.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TableOfContents from '../../components/blog/TableOfContents';
import { formatDate } from '../../lib/utils/formatDate';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    // In a real implementation, you would fetch this data from Supabase
    const post = getBlogPostData(params.slug);

    return {
        title: `${post.title} | Blog - David Waweru`,
        description: post.description,
        openGraph: {
            title: `${post.title} | Blog - David Waweru`,
            description: post.description,
            images: [{ url: post.coverImage }]
        }
    };
}

// Mock function to get blog post data - would use Supabase in production
function getBlogPostData(slug) {
    // This is mock data - in a real implementation, you would fetch from Supabase
    const posts = {
        'integrating-ai-into-design-workflow': {
            id: 'integrating-ai-into-design-workflow',
            title: 'Integrating AI into Your Design Workflow',
            description: 'How designers can leverage AI tools to enhance their creative process without sacrificing the human touch.',
            category: 'AI in Creative Work',
            publishedDate: '2025-05-01',
            readTime: '6 min read',
            author: {
                name: 'David Waweru',
                role: 'AI Creative Developer',
                image: '/images/author-profile.jpg'
            },
            coverImage: '/images/blog/ai-design-workflow-cover.jpg',
            tags: ['AI', 'Design', 'Workflow', 'Creativity', 'Productivity'],
            content: [
                {
                    type: 'paragraph',
                    content: `The design landscape is changing rapidly with the rise of artificial intelligence. For designers who've spent years honing their craft, AI tools can seem threatening or disruptive. However, I've found that integrating AI thoughtfully into my workflow has enhanced my creativity rather than replacing it. In this article, I'll share my approach to using AI as a creative partner rather than a replacement.`
                },
                {
                    type: 'heading',
                    content: 'Understanding the Role of AI in Design'
                },
                {
                    type: 'paragraph',
                    content: `Before we dive into specific workflows, it's important to establish a healthy perspective on AI's role in the creative process. AI tools excel at generating variations, processing large datasets, and automating repetitive tasks. However, they lack the contextual understanding, empathy, and strategic thinking that human designers bring to the table.`
                },
                {
                    type: 'paragraph',
                    content: `The most effective approach is to view AI as an augmentation of your skills rather than a replacement. Think of it as having a tireless assistant who can help with specific aspects of your process while you focus on the areas where human insight is most valuable.`
                },
                {
                    type: 'image',
                    url: '/images/blog/ai-design-tools.jpg',
                    alt: 'Designer working with AI tools',
                    caption: 'Finding the right balance between human creativity and AI assistance is key to an effective workflow.'
                },
                {
                    type: 'heading',
                    content: 'Key Areas Where AI Can Enhance Design Workflows'
                },
                {
                    type: 'paragraph',
                    content: `After experimenting with various AI tools over the past year, I've identified several areas where they provide the most value in my design process:`
                },
                {
                    type: 'list',
                    items: [
                        'Ideation and exploration',
                        'Content generation and refinement',
                        'Style experimentation',
                        'Accessibility improvements',
                        'Design system maintenance',
                        'User research analysis'
                    ]
                },
                {
                    type: 'heading',
                    content: 'My AI-Enhanced Design Workflow'
                },
                {
                    type: 'paragraph',
                    content: `Here's how I've integrated AI tools into my design process, with examples from recent projects:`
                },
                {
                    type: 'subheading',
                    content: '1. Research and Problem Definition'
                },
                {
                    type: 'paragraph',
                    content: `During the initial research phase, I use AI to help analyze user research data, identify patterns, and synthesize insights. For a recent fintech project, I used natural language processing tools to analyze hundreds of customer support conversations, which helped identify key pain points that might have taken weeks to uncover manually.`
                },
                {
                    type: 'blockquote',
                    content: `The ability to quickly process and find patterns in large datasets has transformed how I approach the research phase, allowing me to build on a much more comprehensive foundation of user insights.`
                },
                {
                    type: 'subheading',
                    content: '2. Ideation and Concept Development'
                },
                {
                    type: 'paragraph',
                    content: `During ideation, I use generative AI tools to expand my thinking and explore directions I might not have considered. The key is to start with intentional prompts based on the project's strategic goals and constraints.`
                },
                {
                    type: 'paragraph',
                    content: `For example, when designing an educational app for children, I prompted an AI with specific learning objectives and age-appropriate constraints, then used the generated concepts as inspiration rather than final solutions. This approach yielded several unexpected interaction patterns that we ultimately refined and incorporated into the final design.`
                },
                {
                    type: 'image',
                    url: '/images/blog/ai-concept-generation.jpg',
                    alt: 'AI-generated design concepts with designer annotations',
                    caption: 'AI-generated concepts serve as a starting point for further refinement and human creativity.'
                },
                {
                    type: 'subheading',
                    content: '3. Visual Design Exploration'
                },
                {
                    type: 'paragraph',
                    content: `For visual design, I've found AI particularly helpful for exploring style variations and generating visual assets. After establishing a clear direction and brand parameters, AI tools can quickly generate multiple options that adhere to these guidelines.`
                },
                {
                    type: 'paragraph',
                    content: `However, I've learned that the most successful outcomes come from providing very specific constraints and carefully curating the results. Without clear direction, AI-generated visuals often lack coherence or fail to align with brand guidelines.`
                },
                {
                    type: 'subheading',
                    content: '4. Prototyping and Iteration'
                },
                {
                    type: 'paragraph',
                    content: `During the prototyping phase, I use AI to help generate placeholder content, simulate user data, and even create simple animations. This allows me to focus on the interaction design and overall user experience rather than getting bogged down in creating realistic test data.`
                },
                {
                    type: 'paragraph',
                    content: `AI-assisted coding tools have also been valuable for quickly implementing and testing interactive prototypes, particularly for complex interactions that would be difficult to simulate in traditional prototyping tools.`
                },
                {
                    type: 'heading',
                    content: 'Ethical Considerations and Best Practices'
                },
                {
                    type: 'paragraph',
                    content: `As with any powerful tool, using AI in design requires thoughtful consideration of ethical implications. Here are some guidelines I follow:`
                },
                {
                    type: 'list',
                    items: [
                        'Always disclose AI usage to clients and stakeholders',
                        'Verify that AI-generated content is free from bias and stereotypes',
                        'Ensure accessibility isn't compromised by AI - generated elements',
            'Maintain final human oversight on all design decisions',
                        'Use AI ethically by respecting copyright and intellectual property',
                        'Prioritize user needs over technological novelty'
                    ]
                },
                {
                    type: 'heading',
                    content: 'Looking Forward: The Future of AI in Design'
                },
                {
                    type: 'paragraph',
                    content: `The integration of AI into design workflows is still in its early stages, and we can expect significant advancements in the coming years. The most exciting opportunities lie not in AI replacing designers, but in new creative possibilities that emerge from human-AI collaboration.`
                },
                {
                    type: 'paragraph',
                    content: `As designers, our role may shift toward becoming skilled AI collaborators—defining problems, establishing constraints, curating outputs, and ensuring human-centered solutions. By embracing these tools while maintaining our critical human perspective, we can create better, more innovative designs while focusing our energy on the aspects of design that require human creativity, empathy, and strategic thinking.`
                },
                {
                    type: 'blockquote',
                    content: `The future belongs to designers who can harness AI as a powerful creative ally while remaining grounded in human needs and experiences.`
                },
                {
                    type: 'paragraph',
                    content: `Have you integrated AI tools into your design workflow? I'd love to hear about your experiences and approaches in the comments below.`
                }
            ],
            relatedPosts: [
                {
                    id: 'ai-tools-creative-developers',
                    title: 'Essential AI Tools for Creative Developers in 2025',
                    category: 'AI in Creative Work',
                    image: '/images/blog/ai-tools.jpg'
                },
                {
                    id: 'ux-research-limited-resources',
                    title: 'Conducting Effective UX Research with Limited Resources',
                    category: 'Design Thinking',
                    image: '/images/blog/ux-research.jpg'
                },
                {
                    id: 'threejs-interactive-experiences',
                    title: 'Creating Immersive Experiences with Three.js',
                    category: 'Development',
                    image: '/images/blog/threejs-experiences.jpg'
                }
            ]
        },
        // Additional blog post data would be added here
    };

    return posts[slug] || null;
}

export default function BlogPostPage({ params }) {
    const post = getBlogPostData(params.slug);

    if (!post) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                    <Link
                        href="/blog"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        );
    }

    // Generate table of contents from content
    const tableOfContents = post.content
        .filter(item => item.type === 'heading' || item.type === 'subheading')
        .map((item, index) => ({
            id: `section-${index}`,
            title: item.content,
            isSubheading: item.type === 'subheading'
        }));

    return (
        <main className="bg-black text-white min-h-screen">
            {/* Hero Header */}
            <div className="relative">
                <div className="h-[60vh] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    {post.coverImage && (
                        <div className="relative h-full w-full">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="absolute inset-0 flex items-end">
                        <div className="container max-w-4xl mx-auto px-6 pb-16">
                            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Articles
                            </Link>

                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {post.title}
                            </h1>

                            <p className="text-xl text-gray-300 mb-6">
                                {post.description}
                            </p>

                            <div className="flex items-center">
                                {post.author.image && (
                                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden mr-3">
                                        <Image
                                            src={post.author.image}
                                            alt={post.author.name}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium">{post.author.name}</p>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <span>{formatDate(post.publishedDate, { format: 'medium' })}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 lg:sticky top-6 self-start">
                        <div className="hidden lg:block">
                            <TableOfContents
                                tableOfContents={tableOfContents}
                                activeSection=""
                                onSectionClick={(id) => {
                                    document.getElementById(id)?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                            />

                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4">Share</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>

                                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>

                                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1 15c-1.381 0-2.5-1.119-2.5-2.5v-6c0-1.381 1.119-2.5 2.5-2.5h2c.276 0 .5.224.5.5v.5h-2.5c-.828 0-1.5.672-1.5 1.5v6c0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5V13h-2v1.5c0 .276-.224.5-.5.5h-3z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <article className="prose prose-lg prose-invert max-w-none">
                            {post.content.map((block, index) => {
                                // Generate an ID for headings to enable navigation
                                const blockId = block.type === 'heading' || block.type === 'subheading'
                                    ? `section-${tableOfContents.findIndex(item => item.title === block.content)}`
                                    : '';

                                switch (block.type) {
                                    case 'paragraph':
                                        return <p key={index}>{block.content}</p>;

                                    case 'heading':
                                        return <h2 key={index} id={blockId} className="text-3xl font-bold mt-12 mb-6">{block.content}</h2>;

                                    case 'subheading':
                                        return <h3 key={index} id={blockId} className="text-2xl font-bold mt-8 mb-4">{block.content}</h3>;

                                    case 'image':
                                        return (
                                            <figure key={index} className="my-8">
                                                <div className="aspect-video rounded-lg overflow-hidden relative">
                                                    {block.url && (
                                                        <Image
                                                            src={block.url}
                                                            alt={block.alt || ''}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                {block.caption && (
                                                    <figcaption className="text-center text-sm text-gray-400 mt-2">{block.caption}</figcaption>
                                                )}
                                            </figure>
                                        );

                                    case 'list':
                                        return (
                                            <ul key={index} className="space-y-2 my-6">
                                                {block.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start">
                                                        <span className="text-blue-400 mr-2">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );

                                    case 'blockquote':
                                        return (
                                            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 my-6 text-xl italic">
                                                {block.content}
                                            </blockquote>
                                        );

                                    default:
                                        return null;
                                }
                            })}
                        </article>

                        {/* Author Bio */}
                        <div className="mt-16 p-8 bg-gray-900 rounded-xl">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden relative">
                                    {post.author.image && (
                                        <Image
                                            src={post.author.image}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                                    <p className="text-blue-400 mb-4">{post.author.role}</p>
                                    <p className="text-gray-300 mb-4">
                                        David is a UI/UX designer and creative developer based in Nairobi, Kenya. He specializes in creating
                                        immersive digital experiences at the intersection of design, code, and artificial intelligence.
                                    </p>
                                    <div className="flex space-x-4">
                                        <a href="https://github.com/theeWaweru" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">GitHub</span>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">Twitter</span>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-6">Comments</h3>

                            <div className="mb-8">
                                <form className="mb-6">
                                    <div className="mb-4">
                                        <textarea
                                            placeholder="Share your thoughts..."
                                            rows="4"
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                            Post Comment
                                        </button>
                                    </div>
                                </form>

                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-900 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold">Sarah Johnson</h4>
                                                    <span className="text-sm text-gray-400">2 days ago</span>
                                                </div>
                                                <p className="text-gray-300 mb-3">
                                                    Great article! I've been experimenting with AI in my design workflow and found many of the same benefits. The key, as you mentioned, is using it as an enhancement to human creativity rather than a replacement.
                                                </p>
                                                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-900 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold">Marcus Chen</h4>
                                                    <span className="text-sm text-gray-400">5 days ago</span>
                                                </div>
                                                <p className="text-gray-300 mb-3">
                                                    I'd be interested to hear more about how you handle the ethical considerations, especially around data privacy when using AI tools with client work. Have you found any good frameworks for approaching this?
                                                </p>
                                                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>

                                        <div className="ml-14 mt-4 p-4 bg-gray-800 rounded-lg">
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <h4 className="font-bold">David Waweru</h4>
                                                        <span className="text-sm text-gray-400">4 days ago</span>
                                                    </div>
                                                    <p className="text-gray-300">
                                                        Great question, Marcus! I'm working on a follow-up article specifically about ethical AI usage in client work. The short version is that I always disclose AI usage to clients upfront and have a clear data policy that outlines how their information might be processed.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            <section className="container max-w-6xl mx-auto px-6 py-16 border-t border-gray-800">
                <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {post.relatedPosts.map((relatedPost) => (
                        <div
                            key={relatedPost.id}
                            className="cursor-pointer group"
                        >
                            <Link href={`/blog/${relatedPost.id}`}>
                                <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-80 transition-all duration-500 opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="px-4 py-2 bg-white text-blue-900 rounded-full text-sm font-medium">Read Article</button>
                                    </div>

                                    {relatedPost.image && (
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                <div>
                                    <span className="text-sm font-medium text-blue-400">{relatedPost.category}</span>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{relatedPost.title}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="px-8 py-3 border border-white hover:border-blue-500 hover:text-blue-400 rounded-full font-medium transition-all duration-300"
                    >
                        View All Articles
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Get notified when I publish new articles about AI, design, and development.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
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