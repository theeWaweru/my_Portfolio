// app/blog/page.jsx
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
    title: 'Blog | David Waweru',
    description: 'Thoughts, articles, and insights on UI/UX design, web development, and creative technology by David Waweru.',
};

export default function BlogPage() {
    // Mock blog post data - this would come from a database in a real app
    const blogPosts = [
        {
            id: 'integrating-ai-into-design-workflow',
            title: 'Integrating AI into Your Design Workflow',
            excerpt: 'How designers can leverage AI tools to enhance their creative process without sacrificing the human touch.',
            category: 'AI & Design',
            date: 'May 1, 2025',
            readTime: '6 min read',
        },
        {
            id: 'creating-accessible-web-experiences',
            title: 'Creating Accessible Web Experiences',
            excerpt: 'A guide to designing and developing websites that are usable by people of all abilities and disabilities.',
            category: 'Web Accessibility',
            date: 'April 15, 2025',
            readTime: '8 min read',
        },
        {
            id: 'designing-for-kenyan-users',
            title: 'Designing for Kenyan Users',
            excerpt: 'Insights on creating digital products that consider local context, connectivity constraints, and cultural nuances.',
            category: 'UX Research',
            date: 'April 2, 2025',
            readTime: '5 min read',
        },
        {
            id: 'nextjs-vs-traditional-react',
            title: 'Next.js vs Traditional React',
            excerpt: 'Comparing development approaches and when to choose each framework for your web projects.',
            category: 'Web Development',
            date: 'March 18, 2025',
            readTime: '7 min read',
        },
        {
            id: 'design-systems-for-startups',
            title: 'Design Systems for Startups',
            excerpt: 'How early-stage companies can benefit from implementing design systems without heavy investment.',
            category: 'Design Systems',
            date: 'March 5, 2025',
            readTime: '9 min read',
        },
    ];

    const categories = [
        'All Posts',
        'UX Research',
        'Web Development',
        'Design Systems',
        'AI & Design',
        'Web Accessibility'
    ];

    return (
        <div className={styles.page}>
            <div className={styles.blogHeader}>
                <h1 className={styles.blogTitle}>Blog</h1>
                <p className={styles.blogDescription}>
                    Thoughts, articles, and insights on design, development, and creative technology
                </p>
            </div>

            <div className={styles.contentContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.categoriesContainer}>
                        <h3 className={styles.sidebarTitle}>Categories</h3>
                        <ul className={styles.categoriesList}>
                            {categories.map((category) => (
                                <li key={category} className={styles.categoryItem}>
                                    <button
                                        className={`${styles.categoryButton} ${category === 'All Posts' ? styles.activeCategory : ''}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.newsletterContainer}>
                        <h3 className={styles.sidebarTitle}>Newsletter</h3>
                        <p className={styles.newsletterDescription}>
                            Subscribe to get notified when new articles are published
                        </p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className={styles.newsletterInput}
                                required
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </aside>

                <div className={styles.postsContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.postsList}>
                        {blogPosts.map((post) => (
                            <article key={post.id} className={styles.postCard}>
                                <Link href={`/blog/${post.id}`} className={styles.postLink}>
                                    <span className={styles.postCategory}>{post.category}</span>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                                    <div className={styles.postMeta}>
                                        <span className={styles.postDate}>{post.date}</span>
                                        <span className={styles.postReadTime}>{post.readTime}</span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <span className={styles.currentPage}>Page 1 of 1</span>
                        <div className={styles.paginationButtons}>
                            <button className={`${styles.paginationButton} ${styles.disabled}`} disabled>
                                Previous
                            </button>
                            <button className={`${styles.paginationButton} ${styles.disabled}`} disabled>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}