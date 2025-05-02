// app/components/ProjectGallery.jsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProjectGallery.module.css';

const ProjectGallery = ({
    images,
    aspectRatio = '16/9',
    className = ''
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Handle keyboard navigation in lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return;

            switch (e.key) {
                case 'ArrowLeft':
                    navigateGallery('prev');
                    break;
                case 'ArrowRight':
                    navigateGallery('next');
                    break;
                case 'Escape':
                    setIsLightboxOpen(false);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, activeIndex]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isLightboxOpen]);

    // Navigate through gallery images
    const navigateGallery = (direction) => {
        if (images.length <= 1) return;

        if (direction === 'prev') {
            setActiveIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        } else {
            setActiveIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Open lightbox with specific image
    const openLightbox = (index) => {
        setActiveIndex(index);
        setIsLightboxOpen(true);
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className={`${styles.gallery} ${className}`}>
            {/* Main gallery layout */}
            <div className={styles.mainGrid}>
                {/* Featured image (first image displayed larger) */}
                <div
                    className={styles.featuredImage}
                    style={{ aspectRatio }}
                    onClick={() => openLightbox(0)}
                >
                    <Image
                        src={images[0]}
                        alt="Project featured image"
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className={styles.image}
                    />
                    <div className={styles.imageOverlay}>
                        <span className={styles.viewIcon}>🔍</span>
                    </div>
                </div>

                {/* Thumbnail grid for additional images */}
                {images.length > 1 && (
                    <div className={styles.thumbnailGrid}>
                        {images.slice(1, 5).map((image, index) => (
                            <div
                                key={index}
                                className={styles.thumbnail}
                                onClick={() => openLightbox(index + 1)}
                            >
                                <Image
                                    src={image}
                                    alt={`Project image ${index + 2}`}
                                    fill
                                    sizes="(max-width: 768px) 25vw, 15vw"
                                    className={styles.image}
                                />
                                <div className={styles.imageOverlay}>
                                    <span className={styles.viewIcon}>🔍</span>
                                </div>
                            </div>
                        ))}

                        {/* "View all" button if more than 5 images */}
                        {images.length > 5 && (
                            <div
                                className={`${styles.thumbnail} ${styles.viewAllThumbnail}`}
                                onClick={() => openLightbox(5)}
                            >
                                <div className={styles.viewAllOverlay}>
                                    <span className={styles.viewAllText}>
                                        +{images.length - 5} more
                                    </span>
                                </div>
                                <Image
                                    src={images[5]}
                                    alt={`Project image ${6}`}
                                    fill
                                    sizes="(max-width: 768px) 25vw, 15vw"
                                    className={styles.image}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div className={styles.lightbox}>
                    <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}></div>

                    <button
                        className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                        onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
                        aria-label="Previous image"
                    >
                        &#10094;
                    </button>

                    <div className={styles.lightboxContent}>
                        <img
                            src={images[activeIndex]}
                            alt={`Project image ${activeIndex + 1}`}
                            className={styles.lightboxImage}
                        />

                        <div className={styles.lightboxCaption}>
                            <span>{activeIndex + 1} / {images.length}</span>
                        </div>
                    </div>

                    <button
                        className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                        onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
                        aria-label="Next image"
                    >
                        &#10095;
                    </button>

                    <button
                        className={styles.lightboxClose}
                        onClick={() => setIsLightboxOpen(false)}
                        aria-label="Close lightbox"
                    >
                        &#10005;
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectGallery;