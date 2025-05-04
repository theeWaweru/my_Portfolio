// app/work/[id]/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../components/Button/Button';
import styles from './page.module.css';
import { getProjectById } from '../../lib/supabase/projects';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { data: project } = await getProjectById(params.id);

    if (!project) {
        return {
            title: 'Project Not Found | David Waweru',
            description: 'This project does not exist.',
        };
    }

    return {
        title: `${project.title} | Project Case Study`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }) {
    const { data: project, error } = await getProjectById(params.id);

    if (!project || error) {
        return (
            <div className={styles.notFound}>
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist or has been moved.</p>
                <Button href="/work" variant="primary">
                    View All Projects
                </Button>
            </div>
        );
    }

    // Assuming project data structure from your database
    const galleryImages = project.gallery || [];

    return (
        <div className={styles.page}>
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
                            <Image
                                src={project.cover_image_url}
                                alt={project.title}
                                fill
                                className={styles.coverImage}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Project Gallery */}
            {galleryImages.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Project Gallery</h2>
                    <div className={styles.projectGallery}>
                        {galleryImages.map((image, index) => (
                            <div key={index} className={styles.galleryItem}>
                                <Image
                                    src={image}
                                    alt={`${project.title} - Image ${index + 1}`}
                                    width={index === 0 ? 1200 : 600}
                                    height={index === 0 ? 675 : 600}
                                    className={styles.galleryImage}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Tags Section */}
            {project.tags && project.tags.length > 0 && (
                <section className={styles.section}>
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