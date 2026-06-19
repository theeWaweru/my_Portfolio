// app/admin/projects/[id]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, updateProject } from '../../../lib/supabase/projects';
import ImageGalleryUploader from '../../../components/admin/ImageGalleryUploader';
import { uploadImage, deleteImage } from '../../../lib/supabase/uploadImage';
import styles from '../new/new-project.module.css';

export default function EditProject({ params }) {
    const router = useRouter();
    const [id, setId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const unwrappedParams = await params;
            setId(unwrappedParams.id);
        };
        getId();
    }, [params]);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [initialGallery, setInitialGallery] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        id: '',
        category: '',
        description: '',
        full_description: '',
        client: '',
        timeline: '',
        role: '',
        build: '',
        site_type: '',
        work: '',
        live_url: '',
        logo_url: '',
        color1: '',
        color2: '',
        tags: '',
        cover_image: null,
        cover_image_url: '',
        gallery: [],
        status: 'draft',
        featured: false
    });

    useEffect(() => {
        if (!id) return;
        async function loadProject() {
            setIsLoading(true);
            setError(null);
            try {
                const { data, error } = await getProjectById(id);
                if (error) throw new Error(error);
                if (!data) throw new Error('Project not found');

                const tagsString = Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '';
                const existingGallery = data.gallery || [];

                setFormData({ ...data, tags: tagsString, cover_image: null, gallery: [] });
                setInitialGallery(existingGallery);
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
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, cover_image: file });
    };

    const handleGalleryChange = (newImages) => {
        setFormData({ ...formData, gallery: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
            const projectData = { ...formData, tags: tagsArray };
            delete projectData.cover_image;
            delete projectData.gallery;

            if (formData.cover_image) {
                const { data: imageData, error: imageError } = await uploadImage(formData.cover_image, 'projects', id);
                if (imageError) console.error('Error uploading cover image:', imageError);
                else if (imageData) projectData.cover_image_url = imageData.url;
            }

            let galleryUrls = [...initialGallery];
            if (formData.gallery.length > 0) {
                for (let i = 0; i < formData.gallery.length; i++) {
                    const file = formData.gallery[i];
                    const { data: imageData, error: imageError } = await uploadImage(file, 'projects', `${id}-gallery-${Date.now()}-${i}`);
                    if (imageError) console.error(`Error uploading gallery image ${i}:`, imageError);
                    else if (imageData) galleryUrls.push(imageData.url);
                }
            }
            projectData.gallery = galleryUrls;

            const { error } = await updateProject(id, projectData);
            if (error) throw new Error(error);

            alert('Project updated successfully!');
            router.push('/admin/projects');
        } catch (err) {
            console.error('Error updating project:', err);
            setError(`Failed to update project: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !id) {
        return <div className={styles.loading}>Loading project...</div>;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <Link href="/admin/projects" className={styles.backButton}>Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className={styles.newProject}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Edit Project: {formData.title}</h1>
                <Link href="/admin/projects" className={styles.backButton}>Back to Projects</Link>
            </div>

            <div className={styles.formContainer}>
                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={styles.input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="id" className={styles.label}>Slug (URL)</label>
                            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className={styles.input} required disabled />
                            <p className={styles.helperText}>URL identifier cannot be changed after creation.</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="category" className={styles.label}>Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} className={styles.select} required>
                                <option value="">Select a category</option>
                                <option value="UI/UX & Web Development">UI/UX & Web Development</option>
                                <option value="Strategy, UI/UX & Web">Strategy, UI/UX & Web</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Product Strategy">Product Strategy</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="client" className={styles.label}>Client</label>
                            <input type="text" id="client" name="client" value={formData.client || ''} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="timeline" className={styles.label}>Timeline</label>
                            <input type="text" id="timeline" name="timeline" value={formData.timeline || ''} onChange={handleChange} className={styles.input} placeholder="e.g. 2023 - Present" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="build" className={styles.label}>Build</label>
                            <input type="text" id="build" name="build" value={formData.build || ''} onChange={handleChange} className={styles.input} placeholder="e.g. Next.js, Webflow, WordPress + WooCommerce" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="site_type" className={styles.label}>Site Type</label>
                            <input type="text" id="site_type" name="site_type" value={formData.site_type || ''} onChange={handleChange} className={styles.input} placeholder="e.g. Landing Page, E-commerce Store, Web Platform" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="work" className={styles.label}>Work Done</label>
                            <input type="text" id="work" name="work" value={formData.work || ''} onChange={handleChange} className={styles.input} placeholder="e.g. UI/UX + Web Dev, Strategy + UI/UX + Web" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="live_url" className={styles.label}>Live URL</label>
                            <input type="text" id="live_url" name="live_url" value={formData.live_url || ''} onChange={handleChange} className={styles.input} placeholder="https://example.com (blank if no public link)" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="logo_url" className={styles.label}>Logo URL</label>
                            <input type="text" id="logo_url" name="logo_url" value={formData.logo_url || ''} onChange={handleChange} className={styles.input} placeholder="/images/logos/your-logo.png (shown on the work-page card)" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="color1" className={styles.label}>Brand Colour 1 (card background)</label>
                            <input type="text" id="color1" name="color1" value={formData.color1 || ''} onChange={handleChange} className={styles.input} placeholder="#151515" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="color2" className={styles.label}>Brand Colour 2 (inner-page accent)</label>
                            <input type="text" id="color2" name="color2" value={formData.color2 || ''} onChange={handleChange} className={styles.input} placeholder="#F5D300" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="role" className={styles.label}>Your Role</label>
                            <input type="text" id="role" name="role" value={formData.role || ''} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="tags" className={styles.label}>Tags</label>
                            <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className={styles.input} placeholder="Separate tags with commas" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="status" className={styles.label}>Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="featured" className={styles.label}>Featured</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', height: '100%' }}>
                                <input type="checkbox" id="featured" name="featured" checked={!!formData.featured} onChange={handleChange} />
                                <span className={styles.helperText} style={{ margin: 0 }}>Show on the homepage Featured Work slider</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Short Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows="3" required></textarea>
                        <p className={styles.helperText}>Brief description for project cards. Keep it concise.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="full_description" className={styles.label}>Full Description</label>
                        <textarea id="full_description" name="full_description" value={formData.full_description || ''} onChange={handleChange} className={styles.textarea} rows="6"></textarea>
                        <p className={styles.helperText}>Detailed description for the project page. Leave a blank line between paragraphs.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cover_image" className={styles.label}>Cover Image</label>
                        {formData.cover_image_url && (
                            <div className={styles.currentImageContainer}>
                                <img src={formData.cover_image_url} alt={`${formData.title} cover`} className={styles.currentImage} />
                                <p className={styles.helperText}>Current cover image. Upload a new one to replace it.</p>
                            </div>
                        )}
                        <input type="file" id="cover_image" name="cover_image" onChange={handleFileChange} className={styles.fileInput} accept="image/*" />
                        <p className={styles.helperText}>Card cover: portrait 3:4 (1080 x 1440). See the Guide for sizes.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <ImageGalleryUploader initialImages={initialGallery} onChange={handleGalleryChange} maxImages={10} />
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Project'}
                        </button>
                        <Link href="/admin/projects" className={styles.cancelButton}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
