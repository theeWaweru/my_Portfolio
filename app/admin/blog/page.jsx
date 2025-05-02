// app/admin/blog/page.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

export default function BlogAdmin() {
    const [blogPosts, setBlogPosts] = useState([
        {
            id: 'integrating-ai-into-design-workflow',
            title: 'Integrating AI into Your Design Workflow',
            category: 'AI & Design',
            date: 'May 1, 2025',
            status: 'published'
        },
        {
            id: 'creating-accessible-web-experiences',
            title: 'Creating Accessible Web Experiences',
            category: 'Web Accessibility',
            date: 'April 15, 2025',
            status: 'published'
        },
        {
            id: 'designing-for-kenyan-users',
            title: 'Designing for Kenyan Users',
            category: 'UX Research',
            date: 'April 2, 2025',
            status: 'published'
        },
        {
            id: 'draft-post',
            title: 'New Blog Post (Draft)',
            category: 'Web Development',
            date: 'May 3, 2025',
            status: 'draft'
        }
    ]);

    return (
        <div className={styles.blogAdmin}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Blog Posts</h1>
                <Link href="/admin/blog/new" className={styles.addButton}>
                    Add New Post
                </Link>
            </div>

            <div className={styles.tableContainer}>
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
                                <td>{post.date}</td>
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
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}