// app/admin/projects/[id]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, updateProject } from '../../../lib/supabase/projects';
import styles from '../new/new-project.module.css';

export default function EditProject({ params }) {
    const router = useRouter();
    const { id } = params;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        id: '',
        category: '',
        description: '',
        full_description: '',
        client: '',
        timeline: '',
        role: '',
        tags: '',
        cover_image: null,
        status: 'draft'
    });

    useEffect(() => {
        async function loadProject() {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await getProjectById(id);

                if (error) throw new Error(error);

                if (!data) {
                    throw new Error('Project not found');
                }

                // Format tags back to a string for the form
                const tagsString = Array.isArray(data.tags)
                    ? data.tags.join(', ')
                    : data.tags || '';

                setFormData({
                    ...data,
                    tags: tagsString,
                    cover_image: null // We'll handle image display separately
                });
            } catch (err) {
                console.error('Failed to load project:', err);
                setError(`Failed to load project: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        }

        loadProject();
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

    // Update the handleSubmit function in app/admin/projects/[id]/page.jsx

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Process tags into an array
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim())
                : [];

            // Prepare the project data
            const projectData = {
                ...formData,
                tags: tagsArray,
            };

            // Remove the file from the data
            delete projectData.cover_image;

            // If we have a new cover image, upload it
            if (formData.cover_image) {
                const { uploadImage, deleteImage } = await import('../../../lib/supabase/uploadImage');

                // If there's an existing image, delete it first
                if (formData.cover_image_path) {
                    await deleteImage(formData.cover_image_path);
                }

                // Upload the new image
                const { data: imageData, error: imageError } = await uploadImage(
                    formData.cover_image,
                    'projects',
                    id
                );

                if (imageError) {
                    console.error('Error uploading image:', imageError);
                    // Continue anyway
                } else if (imageData) {
                    // Add the new image URL to the project data
                    projectData.cover_image_url = imageData.url;
                    projectData.cover_image_path = imageData.path;
                }
            }

            // Update the project in the database
            const { data, error } = await updateProject(id, projectData);

            if (error) {
                throw new Error(error);
            }

            alert('Project updated successfully!');
            router.push('/admin/projects');
        } catch (err) {
            console.error('Error updating project:', err);
            setError(`Failed to update project: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading project...</div>;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <Link href="/admin/projects" className={styles.backButton}>
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.newProject}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Edit Project: {formData.title}</h1>
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
                        <p className={styles.helperText}>Recommended size: 1200x800 pixels</p>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Project'}
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