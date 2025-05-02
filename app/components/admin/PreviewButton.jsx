// app/components/admin/PreviewButton.jsx
"use client";
import { useRouter } from 'next/navigation';
import styles from './PreviewButton.module.css';

const PreviewButton = ({
    formData,
    formType = 'project',
    className = '',
    validateForm = () => true
}) => {
    const router = useRouter();

    const handlePreview = () => {
        // Validate form data before proceeding
        if (!validateForm()) {
            alert('Please fill in all required fields before previewing.');
            return;
        }

        // Process form data for preview
        const previewData = { ...formData };

        // Process specific fields based on form type
        if (formType === 'project') {
            // Process tags into an array if needed
            if (typeof previewData.tags === 'string') {
                previewData.tags = previewData.tags
                    ? previewData.tags.split(',').map(tag => tag.trim())
                    : [];
            }

            // Create URL from File objects if present
            if (previewData.cover_image instanceof File) {
                previewData.cover_image_url = URL.createObjectURL(previewData.cover_image);
            }

            // Process gallery images if present
            if (previewData.gallery && Array.isArray(previewData.gallery)) {
                previewData.gallery_urls = previewData.gallery.map(img => {
                    if (img instanceof File) {
                        return URL.createObjectURL(img);
                    } else if (typeof img === 'string') {
                        return img;
                    } else if (img && img.url) {
                        return img.url;
                    }
                    return null;
                }).filter(Boolean);
            }
        } else if (formType === 'blog') {
            // Process blog post specific fields
            if (previewData.cover_image instanceof File) {
                previewData.cover_image_url = URL.createObjectURL(previewData.cover_image);
            }
        }

        // Add timestamp to ensure we're using the latest preview
        previewData.preview_timestamp = Date.now();

        // Store in session storage
        sessionStorage.setItem('preview_data', JSON.stringify(previewData));
        sessionStorage.setItem('preview_mode', 'true');
        sessionStorage.setItem('preview_type', formType);

        // Navigate to preview page
        const previewPath = formType === 'project'
            ? `/work/preview/${previewData.id || 'new-project'}`
            : `/blog/preview/${previewData.id || 'new-post'}`;

        // Open in new tab
        window.open(previewPath, '_blank');
    };

    return (
        <button
            type="button"
            onClick={handlePreview}
            className={`${styles.previewButton} ${className}`}
        >
            <span className={styles.previewIcon}>👁️</span>
            Preview
        </button>
    );
};

export default PreviewButton;