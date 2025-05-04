// app/admin/blog/[id]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostById, updateBlogPost } from '../../../lib/supabase/blog';
import { uploadImage } from '../../../lib/supabase/uploadImage';
import styles from '../new/new-post.module.css';

export default function EditBlogPost({ params }) {
    const router = useRouter();
    const { id } = params;

    const [isLoading, setIsLoading] = useState(true);
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
        cover_image_url: '',
        status: 'draft'
    });

    useEffect(() => {
        async function loadBlogPost() {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await getBlogPostById(id);

                if (error) throw new Error(error);

                if (!data) {
                    throw new Error('Blog post not found');
                }

                // Format tags back to a string for the form
                const tagsString = Array.isArray(data.tags)
                    ? data.tags.join(', ')
                    : data.tags || '';

                setFormData({
                    ...data,
                    tags: tagsString,
                    cover_image: null // Reset file input
                });
            } catch (err) {
                console.error('Failed to load blog post:', err);
                setError(`Failed to load blog post: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        }

        loadBlogPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Only auto-generate slug from title if ID/slug hasn't been set yet
        if (name === 'title' && !formData.id) {
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

            // If we have a new cover image, upload it
            if (formData.cover_image) {
                const { data: imageData, error: imageError } = await uploadImage(
                    formData.cover_image,
                    'blog',
                    id
                );

                if (imageError) {
                    console.error('Error uploading image:', imageError);
                } else if (imageData) {
                    postData.cover_image_url = imageData.url;
                }
            }

            // Update the blog post in the database
            const { data, error } = await updateBlogPost(id, postData);

            if (error) {
                throw new Error(error);
            }

            alert('Blog post updated successfully!');
            router.push('/admin/blog');
        } catch (err) {
            console.error('Error updating blog post:', err);
            setError(`Failed to update blog post: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading blog post...</div>;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <Link href="/admin/blog" className={styles.backButton}>
                    Back to Blog Posts
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.newPost}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Edit Blog Post: {formData.title}</h1>
                <Link href="/admin/blog" className={styles.backButton}>
                    Back to Blog Posts
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
                                disabled // Don't allow changing the ID/slug once set
                            />
                            <p className={styles.helperText}>URL identifier cannot be changed after creation.</p>
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
                        {/* Display current image if available */}
                        {formData.cover_image_url && (
                            <div className={styles.currentImageContainer}>
                                <img
                                    src={formData.cover_image_url}
                                    alt={`${formData.title} cover`}
                                    className={styles.currentImage}
                                />
                                <p className={styles.helperText}>Current cover image. Upload a new one to replace it.</p>
                            </div>
                        )}
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
                            {isSubmitting ? 'Updating...' : 'Update Post'}
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