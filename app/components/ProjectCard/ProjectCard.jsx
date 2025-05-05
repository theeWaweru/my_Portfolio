// app/components/ProjectCard/ProjectCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
    const { id, title, description, category, tags, coverImage } = project;

    // Use coverImage directly, with a fallback to the old image field if needed
    const imageUrl = coverImage || project.image;

    return (
        <article className={styles.card}>
            <Link href={`/work/${id}`}>
                <div className={styles.imageContainer}>
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.image}
                        />
                    ) : (
                        <div
                            className={styles.image}
                            style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <span>Image Placeholder</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className={styles.content}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                {tags && tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <Link href={`/work/${id}`} className={styles.link}>
                    View Project
                    <span className={styles.icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;