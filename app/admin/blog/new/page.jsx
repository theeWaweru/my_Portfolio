// app/admin/blog/new/page.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '../../../lib/supabase/blog';
import { uploadImage } from '../../../lib/supabase/uploadImage';
import styles from './new-post.module.css';

export default function NewBlogPost() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        id: '',
        category: '',
        excerpt: '',
        content: '',
        tags: '',
        cover_image: null,
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
                id: slug
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
            cover_image: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Process tags into an array
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim())
                : [];

            // Prepare the blog post data
            const postData = {
                ...formData,
                tags: tagsArray,
            };

            // Remove the file from the data
            delete postData.cover_image;

            let coverImageUrl = null;

            // Upload cover image if present
            if (formData.cover_image) {
                const { data: imageData, error: imageError } = await uploadImage(
                    formData.cover_image,
                    'blog',
                    formData.id
                );

                if (imageError) {
                    console.error('Error uploading cover image:', imageError);
                } else if (imageData) {
                    coverImageUrl = imageData.url;
                    postData.cover_image_url = coverImageUrl;
                }
            }

            // Create the blog post in the database
            const { data, error } = await createBlogPost(postData);

            if (error) {
                throw new Error(error);
            }

            alert('Blog post created successfully!');
            router.push('/admin/blog');
        } catch (err) {
            console.error('Error creating blog post:', err);
            setError(`Failed to create blog post: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
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
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

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
                            <label htmlFor="id" className={styles.label}>Slug (URL)</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
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
                        <label htmlFor="cover_image" className={styles.label}>Cover Image</label>
                        <input
                            type="file"
                            id="cover_image"
                            name="cover_image"
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
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Post'}
                        </button>
                        <Link href="/admin/blog" className={styles.cancelButton}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div >
        </div >
    );
}