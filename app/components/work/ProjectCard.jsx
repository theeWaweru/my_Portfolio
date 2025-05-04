// app/components/work/ProjectCard.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

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
        cover_image_url
    } = project;

    return (
        <div
            className={`${styles.card} ${isLoaded ? styles.loaded : styles.loading}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <Link href={`/work/${id}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    {cover_image_url && (
                        <div className={styles.image}>
                            <Image
                                src={cover_image_url}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={styles.imageImg}
                                priority={index < 2}
                            />
                        </div>
                    )}

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
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;