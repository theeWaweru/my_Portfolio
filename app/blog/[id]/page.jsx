// app/blog/[id]/page.jsx
import Link from 'next/link';
import styles from './page.module.css';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    // In a real app, this would fetch data from a database
    const post = getBlogPostData(params.id);

    return {
        title: `${post.title} | Blog - David Waweru`,
        description: post.excerpt,
    };
}

// Mock function to get blog post data - would use Supabase in production
function getBlogPostData(id) {
    // This is mock data - in a real implementation, you would fetch from a database
    const posts = {
        'integrating-ai-into-design-workflow': {
            id: 'integrating-ai-into-design-workflow',
            title: 'Integrating AI into Your Design Workflow',
            excerpt: 'How designers can leverage AI tools to enhance their creative process without sacrificing the human touch.',
            category: 'AI & Design',
            date: 'May 1, 2025',
            readTime: '6 min read',
            author: 'David Waweru',
            content: [
                {
                    type: 'paragraph',
                    text: 'The design landscape is changing rapidly with the rise of artificial intelligence. For designers whove spent years honing their craft, AI tools can seem threatening or disruptive.However, Ive found that integrating AI thoughtfully into my workflow has enhanced my creativity rather than replacing it. In this article, Ill share my approach to using AI as a creative partner rather than a replacement.'
                },
                {
                    type: 'heading',
                    text: 'Understanding the Role of AI in Design'
                },
                {
                    type: 'paragraph',
                    text: 'Before we dive into specific workflows, its important to establish a healthy perspective on AIs role in the creative process. AI tools excel at generating variations, processing large datasets, and automating repetitive tasks. However, they lack the contextual understanding, empathy, and strategic thinking that human designers bring to the table.'
                },
                {
                    type: 'paragraph',
                    text: 'The most effective approach is to view AI as an augmentation of your skills rather than a replacement. Think of it as having a tireless assistant who can help with specific aspects of your process while you focus on the areas where human insight is most valuable.'
                },
                {
                    type: 'heading',
                    text: 'Key Areas Where AI Can Enhance Design Workflows'
                },
                {
                    type: 'paragraph',
                    text: 'After experimenting with various AI tools over the past year, Ive identified several areas where they provide the most value in my design process: '
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
                    text: 'My AI-Enhanced Design Workflow'
                },
                {
                    type: 'paragraph',
                    text: 'Heres how Ive integrated AI tools into my design process, with examples from recent projects:'
                },
                {
                    type: 'subheading',
                    text: '1. Research and Problem Definition'
                },
                {
                    type: 'paragraph',
                    text: 'During the initial research phase, I use AI to help analyze user research data, identify patterns, and synthesize insights. For a recent fintech project, I used natural language processing tools to analyze hundreds of customer support conversations, which helped identify key pain points that might have taken weeks to uncover manually.'
                },
                {
                    type: 'subheading',
                    text: '2. Ideation and Concept Development'
                },
                {
                    type: 'paragraph',
                    text: 'During ideation, I use generative AI tools to expand my thinking and explore directions I might not have considered. The key is to start with intentional prompts based on the projects strategic goals and constraints.'
                }
            ],
            relatedPosts: [
                'creating-accessible-web-experiences',
                'design-systems-for-startups',
                'nextjs-vs-traditional-react'
            ]
        },
        // Add more blog posts as needed
        'creating-accessible-web-experiences': {
            id: 'creating-accessible-web-experiences',
            title: 'Creating Accessible Web Experiences',
            excerpt: 'A guide to designing and developing websites that are usable by people of all abilities and disabilities.',
            category: 'Web Accessibility',
            date: 'April 15, 2025',
            readTime: '8 min read',
            author: 'David Waweru',
            content: [
                {
                    type: 'paragraph',
                    text: 'Web accessibility is often overlooked in the design and development process, yet its crucial for creating inclusive digital experiences.In this article, Ill share practical approaches to making your websites more accessible to everyone, including people with visual, auditory, motor, or cognitive disabilities.'
                }
                // Add more content blocks as needed
            ],
            relatedPosts: [
                'integrating-ai-into-design-workflow',
                'design-systems-for-startups',
                'nextjs-vs-traditional-react'
            ]
        }
    };

    return posts[id] || null;
}

export default function BlogPostPage({ params }) {
    const post = getBlogPostData(params.id);

    if (!post) {
        return (
            <div className={styles.notFound}>
                <h1>Article Not Found</h1>
                <p>The article you're looking for doesn't exist or has been moved.</p>
                <Link href="/blog" className={styles.backButton}>
                    View All Articles
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <article className={styles.article}>
                <Link href="/blog" className={styles.backLink}>
                    ← Back to Blog
                </Link>

                <header className={styles.articleHeader}>
                    <span className={styles.articleCategory}>{post.category}</span>
                    <h1 className={styles.articleTitle}>{post.title}</h1>

                    <div className={styles.articleMeta}>
                        <div className={styles.authorInfo}>
                            {/* You can add an author image here */}
                            <div className={styles.authorName}>{post.author}</div>
                        </div>
                        <div className={styles.articleDetails}>
                            <span className={styles.articleDate}>{post.date}</span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.articleReadTime}>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                <div className={styles.articleContent}>
                    {post.content.map((block, index) => {
                        switch (block.type) {
                            case 'paragraph':
                                return <p key={index} className={styles.paragraph}>{block.text}</p>;
                            case 'heading':
                                return <h2 key={index} className={styles.heading}>{block.text}</h2>;
                            case 'subheading':
                                return <h3 key={index} className={styles.subheading}>{block.text}</h3>;
                            case 'list':
                                return (
                                    <ul key={index} className={styles.list}>
                                        {block.items.map((item, i) => (
                                            <li key={i} className={styles.listItem}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </article>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div className={styles.relatedPosts}>
                    <h3 className={styles.relatedTitle}>Related Articles</h3>
                    <div className={styles.relatedList}>
                        {post.relatedPosts.map((relatedId) => {
                            const relatedPost = getBlogPostData(relatedId);
                            if (!relatedPost) return null;

                            return (
                                <div key={relatedId} className={styles.relatedCard}>
                                    <Link href={`/blog/${relatedId}`} className={styles.relatedLink}>
                                        <span className={styles.relatedCategory}>{relatedPost.category}</span>
                                        <h4 className={styles.relatedPostTitle}>{relatedPost.title}</h4>
                                        <p className={styles.relatedExcerpt}>{relatedPost.excerpt}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={styles.subscribeSection}>
                <h3 className={styles.subscribeTitle}>Enjoyed this article?</h3>
                <p className={styles.subscribeText}>
                    Subscribe to my newsletter to receive updates when I publish new content.
                </p>
                <form className={styles.subscribeForm}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className={styles.subscribeInput}
                        required
                    />
                    <button type="submit" className={styles.subscribeButton}>
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}