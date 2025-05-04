// app/admin/blog/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts, deleteBlogPost } from '../../lib/supabase/blog';
import styles from './blog.module.css';

export default function BlogAdmin() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBlogPosts() {
            setIsLoading(true);
            try {
                const { data, error } = await getBlogPosts();

                if (error) throw error;

                setBlogPosts(data || []);
            } catch (err) {
                console.error('Error loading blog posts:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadBlogPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            const { error } = await deleteBlogPost(id);

            if (error) throw error;

            // Update local state to remove the deleted post
            setBlogPosts(blogPosts.filter(post => post.id !== id));
        } catch (err) {
            console.error('Error deleting blog post:', err);
            alert('Failed to delete blog post');
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading blog posts...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.blogAdmin}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Blog Posts</h1>
                <Link href="/admin/blog/new" className={styles.addButton}>
                    Add New Post
                </Link>
            </div>

            <div className={styles.tableContainer}>
                {blogPosts.length === 0 ? (
                    <div className={styles.noPosts}>
                        <p>No blog posts found. Click the "Add New Post" button to create your first post.</p>
                    </div>
                ) : (
                    <table className={styles.blogTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogPosts.map((post) => (
                                <tr key={post.id} className={styles.postRow}>
                                    <td>
                                        <Link href={`/admin/blog/${post.id}`} className={styles.postTitle}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>{post.category}</td>
                                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[post.status]}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link
                                            href={`/admin/blog/${post.id}`}
                                            className={styles.actionButton}
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            target="_blank"
                                            className={styles.actionButton}
                                        >
                                            View
                                        </Link>
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}