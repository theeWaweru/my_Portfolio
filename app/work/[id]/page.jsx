// app/work/[id]/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../components/Button/Button';
import styles from './page.module.css';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    // In a real app, you would fetch this data from a database
    const project = getProjectData(params.id);

    return {
        title: `${project.title} | Project Case Study`,
        description: project.description,
    };
}

// Mock function to get project data - would use Supabase in production
function getProjectData(id) {
    // This is mock data - in a real implementation, you would fetch from a database
    const projects = {
        'furaha-financial': {
            id: 'furaha-financial',
            title: 'Furaha Financial',
            description: 'Complete redesign of a digital banking platform focused on improving user experience and accessibility.',
            fullDescription: 'Furaha Financial needed a complete overhaul of their digital banking platform to improve user experience, increase customer satisfaction, and reduce drop-off rates. I led the UI/UX redesign process from research to implementation.',
            category: 'UI/UX Design',
            client: 'Furaha Financial Services',
            timeline: 'January - April 2023',
            role: 'Lead UI/UX Designer',
            tags: ['Fintech', 'Web App', 'Mobile App', 'User Research'],
            coverImage: '/images/projects/placeholder-1.jpg',
            gallery: [
                '/images/projects/placeholder-1.jpg',
                '/images/projects/placeholder-2.jpg',
                '/images/projects/placeholder-3.jpg',
            ],
            challenge: 'The existing platform was outdated, difficult to navigate, and had poor accessibility. Transaction flows were complex, leading to high drop-off rates and customer frustration.',
            solution: 'I redesigned the platform with a focus on simplicity and user-centered design. Key improvements included streamlined transaction flows, intuitive navigation, improved accessibility, and a consistent design system across web and mobile applications.',
            results: [
                'Reduced transaction drop-off rate by 46%',
                'Improved customer satisfaction score from 3.2 to 4.7 out of 5',
                'Increased mobile app usage by 38%',
                'Reduced customer support calls by 27%'
            ],
            testimonial: {
                quote: "David's redesign transformed our platform into a modern, user-friendly experience. His methodical approach to understanding our users' needs resulted in measurable improvements to our key metrics.",
                author: "Sarah Kamau",
                role: "Product Manager, Furaha Financial"
            },
            nextProject: 'chupachap'
        },
        // Add more projects following the same structure
        'chupachap': {
            id: 'chupachap',
            title: 'Chupachap',
            description: 'E-commerce platform for a local marketplace with integrated payment processing.',
            fullDescription: 'Chupachap needed an e-commerce platform to connect local artisans with customers. I designed and developed a marketplace solution that showcases products effectively and streamlines the purchase process.',
            category: 'Web Development',
            client: 'Chupachap Marketplace',
            timeline: 'May - August 2023',
            role: 'UI Designer & Front-end Developer',
            tags: ['E-commerce', 'Web App', 'Payments'],
            coverImage: '/images/projects/placeholder-2.jpg',
            gallery: [
                '/images/projects/placeholder-2.jpg',
                '/images/projects/placeholder-3.jpg',
                '/images/projects/placeholder-4.jpg',
            ],
            challenge: 'Local artisans had limited options to sell their products online. Existing marketplaces were complex to use and had high fees.',
            solution: 'I created a custom marketplace platform that was easy for sellers to manage and for customers to navigate, with integrated local payment options and optimized for the Kenyan market.',
            results: [
                'Platform launched with 50+ local artisans',
                'Over 1,000 products listed in the first month',
                'Average session duration of 5+ minutes',
                'Conversion rate of 3.2% (above industry average)'
            ],
            testimonial: {
                quote: "Working with David was a great experience. He understood our vision and created a platform that truly represents our brand and serves our community of artisans and customers.",
                author: "James Ochieng",
                role: "Founder, Chupachap"
            },
            nextProject: 'furaha-financial'
        }
    };

    return projects[id] || null;
}

export default function ProjectPage({ params }) {
    const project = getProjectData(params.id);

    if (!project) {
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

    return (
        <div className={styles.page}>
            {/* Project Hero */}
            <div className={styles.projectHero}>
                <div className={styles.heroContent}>
                    <Link href="/work" className={styles.backLink}>
                        ← Back to Projects
                    </Link>
                    <h1 className={styles.projectTitle}>{project.title}</h1>
                    <p className={styles.projectDescription}>{project.fullDescription}</p>

                    <div className={styles.projectDetails}>
                        <div className={styles.detailItem}>
                            <h3 className={styles.detailTitle}>Client</h3>
                            <p>{project.client}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3 className={styles.detailTitle}>Timeline</h3>
                            <p>{project.timeline}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3 className={styles.detailTitle}>My Role</h3>
                            <p>{project.role}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h3 className={styles.detailTitle}>Category</h3>
                            <p>{project.category}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.heroCover}>
                    {project.coverImage && (
                        <div className={styles.coverImageContainer}>
                            <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className={styles.coverImage}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Challenge Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>The Challenge</h2>
                <p className={styles.sectionText}>{project.challenge}</p>
            </section>

            {/* Solution Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>The Solution</h2>
                <p className={styles.sectionText}>{project.solution}</p>

                {/* Project Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className={styles.projectGallery}>
                        {project.gallery.map((image, index) => (
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
                )}
            </section>

            {/* Results Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>The Results</h2>
                <div className={styles.resultsGrid}>
                    {project.results.map((result, index) => (
                        <div key={index} className={styles.resultItem}>
                            <p className={styles.resultText}>{result}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonial */}
                {project.testimonial && (
                    <div className={styles.testimonial}>
                        <blockquote className={styles.testimonialQuote}>
                            "{project.testimonial.quote}"
                        </blockquote>
                        <div className={styles.testimonialAuthor}>
                            <p className={styles.authorName}>{project.testimonial.author}</p>
                            <p className={styles.authorRole}>{project.testimonial.role}</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Next Project Section */}
            {project.nextProject && (
                <div className={styles.nextProject}>
                    <h3 className={styles.nextProjectLabel}>Next Project</h3>
                    <Link href={`/work/${project.nextProject}`} className={styles.nextProjectLink}>
                        View Next Project →
                    </Link>
                </div>
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