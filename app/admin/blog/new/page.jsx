// app/admin/blog/new/page.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './new-post.module.css';

export default function NewBlogPost() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        content: '',
        tags: '',
        coverImage: null,
        status: 'draft'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            setFormData({
                ...formData,
                title: value,
                slug
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            coverImage: file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Here you would implement the actual data submission to your backend
        // For now, we're just logging to the console
        alert('Blog post saved! (This is a mock implementation)');
    };

    return (
        <div className={styles.newPost}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>New Blog Post</h1>
                <Link href="/admin/blog" className={styles.backButton}>
                    Back to Posts
                </Link>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="slug" className={styles.label}>Slug (URL)</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                            <p className={styles.helperText}>Auto-generated from title. Can be edited.</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="category" className={styles.label}>Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={styles.select}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="UX Research">UX Research</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Design Systems">Design Systems</option>
                                <option value="AI & Design">AI & Design</option>
                                <option value="Web Accessibility">Web Accessibility</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="status" className={styles.label}>Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="excerpt" className={styles.label}>Excerpt</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            className={styles.textarea}
                            rows="3"
                            required
                        ></textarea>
                        <p className={styles.helperText}>Brief summary of the post. This appears in blog listings.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tags" className={styles.label}>Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Separate tags with commas"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="coverImage" className={styles.label}>Cover Image</label>
                        <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                            accept="image/*"
                        />
                        <p className={styles.helperText}>Recommended size: 1200x630 pixels</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content" className={styles.label}>Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className={styles.contentTextarea}
                            rows="15"
                            required
                        ></textarea>
                        <p className={styles.helperText}>
                            You can use Markdown for formatting.
                            <a
                                href="https://www.markdownguide.org/cheat-sheet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.helperLink}
                            >
                                Markdown Cheat Sheet
                            </a>
                        </p>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitButton}>
                            Save Post
                        </button>
                        <Link href="/admin/blog" className={styles.cancelButton}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}