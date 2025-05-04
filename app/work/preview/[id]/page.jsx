// app/work/preview/[id]/page.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button/Button';
import ProjectGallery from '../../../components/ProjectGallery';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import styles from '../../[id]/page.module.css';
import previewStyles from './preview.module.css';

export default function ProjectPreviewPage({ params }) {
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get preview data from session storage
        const getPreviewData = () => {
            const previewMode = sessionStorage.getItem('preview_mode');
            const previewType = sessionStorage.getItem('preview_type');

            if (previewMode !== 'true' || previewType !== 'project') {
                // Not in preview mode or wrong type, redirect to regular project page
                router.push('/work/' + params.id);
                return;
            }

            try {
                const previewData = JSON.parse(sessionStorage.getItem('preview_data'));
                if (!previewData) {
                    throw new Error('No preview data found');
                }
                setProject(previewData);
            } catch (error) {
                console.error('Error loading preview data:', error);
                // Redirect to projects list
                router.push('/work');
            } finally {
                setLoading(false);
            }
        };

        getPreviewData();
    }, [params.id, router]);

    const exitPreview = () => {
        // Clear preview mode but keep data for editing
        sessionStorage.setItem('preview_mode', 'false');

        // Go back to edit page
        router.push('/admin/projects/' + (project.id || 'new'));
    };

    if (loading) {
        return (
            <div className={previewStyles.loadingContainer}>
                <div className={previewStyles.loading}>Loading preview...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className={styles.notFound}>
                <h1>Preview Not Available</h1>
                <p>The project preview you're looking for doesn't exist or has expired.</p>
                <Button href="/work" variant="primary">
                    View All Projects
                </Button>
            </div>
        );
    }

    // Convert gallery_urls to regular gallery array if needed
    const galleryImages = project.gallery_urls || project.gallery || [];

    // Ensure cover image is first in gallery if not already included
    const allImages = project.cover_image_url && !galleryImages.includes(project.cover_image_url)
        ? [project.cover_image_url, ...galleryImages]
        : galleryImages;

    return (
        <div className={`${styles.page} ${previewStyles.previewPage}`}>
            {/* Preview Banner */}
            <div className={previewStyles.previewBanner}>
                <div className={previewStyles.previewMessage}>
                    <span>Preview Mode</span> - This is how your project will appear when published
                </div>
                <button
                    className={previewStyles.exitButton}
                    onClick={exitPreview}
                >
                    Exit Preview & Edit
                </button>
            </div>

            {/* Rest of the component remains the same */}
            {/* Project Hero */}
            <div className={styles.projectHero}>
                <div className={styles.heroContent}>
                    <Link href="/work" className={styles.backLink}>
                        ← Back to Projects
                    </Link>
                    <h1 className={styles.projectTitle}>{project.title}</h1>
                    <p className={styles.projectDescription}>{project.full_description || project.description}</p>

                    <div className={styles.projectDetails}>
                        {project.client && (
                            <div className={styles.detailItem}>
                                <h3 className={styles.detailTitle}>Client</h3>
                                <p>{project.client}</p>
                            </div>
                        )}

                        {project.timeline && (
                            <div className={styles.detailItem}>
                                <h3 className={styles.detailTitle}>Timeline</h3>
                                <p>{project.timeline}</p>
                            </div>
                        )}

                        {project.role && (
                            <div className={styles.detailItem}>
                                <h3 className={styles.detailTitle}>My Role</h3>
                                <p>{project.role}</p>
                            </div>
                        )}

                        {project.category && (
                            <div className={styles.detailItem}>
                                <h3 className={styles.detailTitle}>Category</h3>
                                <p>{project.category}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.heroCover}>
                    {project.cover_image_url && (
                        <div className={styles.coverImageContainer}>
                            <img
                                src={project.cover_image_url}
                                alt={project.title}
                                className={styles.coverImage}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Project Gallery */}
            {allImages.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Project Gallery</h2>
                    <ProjectGallery images={allImages} />
                </section>
            )}

            {/* Description Section */}
            {project.full_description && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Project Details</h2>
                    <MarkdownRenderer content={project.full_description} />
                </section>
            )}

            {/* Tags Section */}
            {project.tags && project.tags.length > 0 && (
                <section className={styles.tagsSection}>
                    <h2 className={styles.sectionTitle}>Technologies & Skills</h2>
                    <div className={styles.tagsList}>
                        {project.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <div className={styles.cta}>
                <h2 className={styles.ctaTitle}>Interested in working together?</h2>
                <p className={styles.ctaText}>
                    Let's discuss how I can help with your next project.
                </p>
                <Button href="/contact" variant="primary" size="large">
                    Get In Touch
                </Button>
            </div>
        </div>
    );
}