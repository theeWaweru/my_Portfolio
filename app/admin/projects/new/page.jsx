// app/admin/projects/new/page.jsx

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProject, updateProject } from '../../../lib/supabase/projects'; // Add updateProject import
import ImageGalleryUploader from '../../../components/admin/ImageGalleryUploader';
import { uploadImage } from '../../../lib/supabase/uploadImage';
import styles from './new-project.module.css';

export default function NewProject() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        id: '', // we'll use this as the slug
        category: '',
        description: '',
        full_description: '',
        client: '',
        timeline: '',
        role: '',
        tags: '',
        cover_image: null,
        gallery: [], // Add gallery array
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

    const handleGalleryChange = (images) => {
        setFormData({
            ...formData,
            gallery: images
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

            // Create initial project data
            const projectData = {
                ...formData,
                tags: tagsArray,
            };

            // Remove files from the project data
            delete projectData.cover_image;
            delete projectData.gallery;

            // Create the project in the database first
            const { data, error } = await createProject(projectData);

            if (error) {
                throw new Error(error);
            }

            let coverImageUrl = null;
            let galleryUrls = [];

            // Upload cover image
            if (formData.cover_image) {
                const { data: imageData, error: imageError } = await uploadImage(
                    formData.cover_image,
                    'projects',
                    data.id
                );

                if (imageError) {
                    console.error('Error uploading cover image:', imageError);
                } else if (imageData) {
                    coverImageUrl = imageData.url;
                }
            }

            // Upload gallery images
            if (formData.gallery.length > 0) {
                for (let i = 0; i < formData.gallery.length; i++) {
                    const file = formData.gallery[i];
                    const { data: imageData, error: imageError } = await uploadImage(
                        file,
                        'projects',
                        `${data.id}-gallery-${i}`
                    );

                    if (imageError) {
                        console.error(`Error uploading gallery image ${i}:`, imageError);
                    } else if (imageData) {
                        galleryUrls.push(imageData.url);
                    }
                }
            }

            // Update project with image URLs
            if (coverImageUrl || galleryUrls.length > 0) {
                const updateData = {};
                if (coverImageUrl) {
                    updateData.cover_image_url = coverImageUrl;
                }
                if (galleryUrls.length > 0) {
                    updateData.gallery = galleryUrls;
                }

                const { error: updateError } = await updateProject(data.id, updateData);

                if (updateError) {
                    console.error('Error updating project with images:', updateError);
                    throw new Error(updateError);
                }
            }

            alert('Project created successfully!');
            router.push('/admin/projects');
        } catch (err) {
            console.error('Error creating project:', err);
            setError('Failed to create project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.newProject}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>New Project</h1>
                <Link href="/admin/projects" className={styles.backButton}>
                    Back to Projects
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
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Product Strategy">Product Strategy</option>
                                <option value="3D Visualization">3D Visualization</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="client" className={styles.label}>Client</label>
                            <input
                                type="text"
                                id="client"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="timeline" className={styles.label}>Timeline</label>
                            <input
                                type="text"
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="e.g. January - March 2024"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="role" className={styles.label}>Your Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={styles.input}
                            />
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
                        <label htmlFor="description" className={styles.label}>Short Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.textarea}
                            rows="3"
                            required
                        ></textarea>
                        <p className={styles.helperText}>Brief description for project cards. Keep it concise.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="full_description" className={styles.label}>Full Description</label>
                        <textarea
                            id="full_description"
                            name="full_description"
                            value={formData.full_description}
                            onChange={handleChange}
                            className={styles.textarea}
                            rows="6"
                        ></textarea>
                        <p className={styles.helperText}>Detailed description for the project page.</p>
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
                        <p className={styles.helperText}>Recommended size: 1200x800 pixels</p>
                    </div>

                    <div className={styles.formGroup}>
                        <ImageGalleryUploader
                            initialImages={formData.gallery}
                            onChange={handleGalleryChange}
                            maxImages={10}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Project'}
                        </button>
                        <Link href="/admin/projects" className={styles.cancelButton}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}