// app/not-found.jsx
import React from 'react';
import Link from 'next/link';
import Button from './components/Button/Button';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.errorCode}>404</h1>
                    <h2 className={styles.title}>Page Not Found</h2>
                    <p className={styles.description}>
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className={styles.actions}>
                        <Button href="/" variant="primary">
                            Back to Home
                        </Button>
                        <Button href="/contact" variant="secondary">
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}