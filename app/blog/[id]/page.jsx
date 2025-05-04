// app/blog/[id]/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getBlogPostById } from '../../lib/supabase/blog';
import MarkdownRenderer from '../../components/MarkdownRenderer';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { data: post } = await getBlogPostById(params.id);

    if (!post) {
        return {
            title: 'Post Not Found | Blog - David Waweru',
            description: 'The article you are looking for does not exist or has been moved.'
        };
    }

    return {
        title: `${post.title} | Blog - David Waweru`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }) {
    const { data: post, error } = await getBlogPostById(params.id);

    if (!post || error) {
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
                            <div className={styles.authorName}>{post.author || 'David Waweru'}</div>
                        </div>
                        <div className={styles.articleDetails}>
                            <span className={styles.articleDate}>
                                {new Date(post.published_date || post.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.articleReadTime}>
                                {Math.ceil(post.content?.split(/\s+/).length / 200)} min read
                            </span>
                        </div>
                    </div>
                </header>

                {post.cover_image_url && (
                    <div className={styles.coverImageContainer}>
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className={styles.coverImage}
                            priority
                        />
                    </div>
                )}

                <div className={styles.articleContent}>
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>

            {post.tags && post.tags.length > 0 && (
                <div className={styles.tagSection}>
                    <h3 className={styles.tagTitle}>Tags</h3>
                    <div className={styles.tagList}>
                        {post.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
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