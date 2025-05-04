"use client";
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '../lib/supabase/blog';
import styles from './page.module.css';

// Create a separate component for the blog content
function BlogContent() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [categories, setCategories] = useState(['All Posts']);
    const [selectedCategory, setSelectedCategory] = useState('All Posts');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBlogPosts() {
            setIsLoading(true);
            try {
                const { data, error } = await getBlogPosts();
                if (error) throw error;

                setBlogPosts(data || []);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(post => post.category))];
                setCategories(['All Posts', ...uniqueCategories]);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadBlogPosts();
    }, []);

    // Filter and search posts
    const filteredPosts = blogPosts
        .filter(post => selectedCategory === 'All Posts' || post.category === selectedCategory)
        .filter(post =>
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className={styles.page}>
            {/* Blog Header */}
            <div className={styles.blogHeader}>
                <h1 className={styles.blogTitle}>Blog</h1>
                <p className={styles.blogDescription}>
                    Thoughts, articles, and insights on design, development, and creative technology
                </p>
            </div>

            {/* Filter and Search */}
            <div className={styles.contentContainer}>
                {/* Categories Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.categoriesContainer}>
                        <h3 className={styles.sidebarTitle}>Categories</h3>
                        <ul className={styles.categoriesList}>
                            {categories.map((category) => (
                                <li key={category} className={styles.categoryItem}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`${styles.categoryButton} ${category === selectedCategory ? styles.activeCategory : ''}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Blog Posts */}
                <div className={styles.postsContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>Loading posts...</div>
                    ) : error ? (
                        <div className={styles.error}>{error}</div>
                    ) : filteredPosts.length === 0 ? (
                        <div className={styles.noPosts}>No posts found</div>
                    ) : (
                        <div className={styles.postsList}>
                            {filteredPosts.map((post) => (
                                <article key={post.id} className={styles.postCard}>
                                    <Link href={`/blog/${post.id}`} className={styles.postLink}>
                                        <span className={styles.postCategory}>{post.category}</span>
                                        <h2 className={styles.postTitle}>{post.title}</h2>
                                        <p className={styles.postExcerpt}>{post.description}</p>
                                        <div className={styles.postMeta}>
                                            <span className={styles.postDate}>{new Date(post.created_at).toLocaleDateString()}</span>
                                            <span className={styles.postReadTime}>{post.read_time || '5 min read'}</span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <Suspense fallback={<div className={styles.page}><div className={styles.loading}>Loading...</div></div>}>
            <BlogContent />
        </Suspense>
    );
}