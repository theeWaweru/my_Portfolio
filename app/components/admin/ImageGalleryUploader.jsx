// app/components/admin/ImageGalleryUploader.jsx
"use client";
import { useState, useEffect } from 'react';
import styles from './ImageGalleryUploader.module.css';

const ImageGalleryUploader = ({
    initialImages = [],
    onChange,
    maxImages = 10,
    className = ''
}) => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    // Initialize with any provided images
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            setImages(initialImages);

            // Create preview URLs for existing images
            setPreviewImages(initialImages.map(img => {
                if (typeof img === 'string') {
                    // It's already a URL
                    return img;
                } else if (img instanceof File) {
                    // It's a File object
                    return URL.createObjectURL(img);
                } else if (img && img.url) {
                    // It's an object with a URL property
                    return img.url;
                }
                return null;
            }).filter(Boolean));
        }
    }, [initialImages]);

    // Clean up preview URLs when component unmounts
    useEffect(() => {
        return () => {
            previewImages.forEach(preview => {
                if (preview && !preview.startsWith('http')) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [previewImages]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > maxImages) {
            alert(`You can upload a maximum of ${maxImages} images.`);
            return;
        }

        // Create preview URLs for new files
        const newPreviews = files.map(file => URL.createObjectURL(file));

        // Update state
        const newImages = [...images, ...files];
        setImages(newImages);
        setPreviewImages([...previewImages, ...newPreviews]);

        // Notify parent component
        onChange(newImages);

        // Reset file input
        e.target.value = '';
    };

    const removeImage = (index) => {
        // Create new arrays without the removed image
        const newImages = [...images];
        const newPreviews = [...previewImages];

        // Clean up preview URL if it's a blob URL
        if (newPreviews[index] && !newPreviews[index].startsWith('http')) {
            URL.revokeObjectURL(newPreviews[index]);
        }

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        // Update state
        setImages(newImages);
        setPreviewImages(newPreviews);

        // Notify parent component
        onChange(newImages);
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Required for Firefox
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === index) {
            return;
        }

        // Reorder images
        const newImages = [...images];
        const newPreviews = [...previewImages];

        const draggedImage = newImages[draggedIndex];
        const draggedPreview = newPreviews[draggedIndex];

        newImages.splice(draggedIndex, 1);
        newPreviews.splice(draggedIndex, 1);

        newImages.splice(index, 0, draggedImage);
        newPreviews.splice(index, 0, draggedPreview);

        // Update state
        setImages(newImages);
        setPreviewImages(newPreviews);
        setDraggedIndex(index);

        // Notify parent component
        onChange(newImages);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>Project Gallery</h3>
                <div className={styles.uploadContainer}>
                    <label htmlFor="gallery-upload" className={styles.uploadButton}>
                        Add Images
                    </label>
                    <input
                        id="gallery-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                    />
                    <span className={styles.counter}>
                        {images.length} / {maxImages} images
                    </span>
                </div>
            </div>

            {previewImages.length > 0 ? (
                <div className={styles.galleryGrid}>
                    {previewImages.map((preview, index) => (
                        <div
                            key={index}
                            className={`${styles.imageItem} ${draggedIndex === index ? styles.dragging : ''}`}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            data-index={index}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={preview} alt={`Gallery image ${index + 1}`} className={styles.image} />
                                <div className={styles.imageOverlay}>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className={styles.removeButton}
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className={styles.imageNumber}>{index + 1}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyGallery}>
                    <p>No images added yet. Click "Add Images" to upload.</p>
                </div>
            )}

            <p className={styles.helperText}>
                Drag and drop to reorder images. The first image will be used as the cover image.
            </p>
        </div>
    );
};

export default ImageGalleryUploader;