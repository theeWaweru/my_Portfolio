// app/components/work/ProjectCard.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

// Placeholder image path
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

const ProjectCard = ({
    project,
    index = 0,
    isLoaded = true
}) => {
    const {
        id,
        title,
        description,
        category,
        tags,
        cover_image_url,
        coverImage,
        image
    } = project;

    // Use the first available image or fall back to placeholder
    const imageUrl = cover_image_url || coverImage || image || PLACEHOLDER_IMAGE;

    return (
        <div
            className={`${styles.card} ${isLoaded ? styles.loaded : styles.loading}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <Link href={`/work/${id}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <Image
                            src={imageUrl}
                            alt={title || 'Project image'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.imageImg}
                            priority={index < 2}
                        />
                    </div>

                    <div className={styles.overlay}></div>

                    <div className={styles.hoverOverlay}>
                        <button className={styles.viewButton}>
                            View Details
                        </button>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.tags}>
                            {tags?.slice(0, 2).map(tag => (
                                <span
                                    key={tag}
                                    className={styles.tag}
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags?.length > 2 && (
                                <span className={styles.moreTagsBadge}>
                                    +{tags.length - 2}
                                </span>
                            )}
                        </div>
                        <h3 className={styles.title}>{title || 'Untitled Project'}</h3>
                        <p className={styles.description}>{description || 'No description available.'}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;