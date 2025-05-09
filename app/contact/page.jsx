// app/contact/page.jsx
"use client";

import { useState, Suspense, useCallback } from 'react';
import styles from './page.module.css';
import ReCaptcha from '../components/ui/ReCaptcha';

function ContactFormContent() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        inquiryType: 'Project',
        subject: '',
        message: '',
        referral: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitting: false,
        submitted: false,
        error: null,
    });
    
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaKey, setCaptchaKey] = useState(0); // Key to force reCAPTCHA reset

    const handleVerify = useCallback((token) => {
        setCaptchaToken(token);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    }, []);

    const resetForm = useCallback(() => {
        setFormState({
            name: '',
            email: '',
            inquiryType: 'Project',
            subject: '',
            message: '',
            referral: ''
        });
        setFormStatus({ submitting: false, submitted: false, error: null });
        setCaptchaToken(null);
        setCaptchaKey(prev => prev + 1); // Force reCAPTCHA to reset
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            setFormStatus({
                submitting: false,
                submitted: false,
                error: 'Please complete the reCAPTCHA verification.',
            });
            return;
        }

        setFormStatus({
            submitting: true,
            submitted: false,
            error: null
        });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formState,
                    recaptchaToken: captchaToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit form');
            }

            setFormStatus({ submitting: false, submitted: true, error: null });
            setFormState({
                name: '',
                email: '',
                inquiryType: 'Project',
                subject: '',
                message: '',
                referral: ''
            });

            // Reset reCAPTCHA by incrementing the key
            setCaptchaKey(prev => prev + 1);
            setCaptchaToken(null);

        } catch (error) {
            setFormStatus({
                submitting: false,
                submitted: false,
                error: error.message || 'Something went wrong. Please try again later.',
            });
            // Reset reCAPTCHA on error as well
            setCaptchaKey(prev => prev + 1);
            setCaptchaToken(null);
        }
    }, [formState, captchaToken]);

    return (
        <>
            <div className={styles.contactHeader}>
                <h1 className={styles.contactTitle}>Get In Touch</h1>
                <p className={styles.contactDescription}>
                    Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
                </p>
            </div>

            <div className={styles.contactContainer}>
                <div className={styles.contactInfo}>
                    <div className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>Contact Information</h3>
                        <p className={styles.infoText}>
                            Feel free to reach out through the form or directly via email or social media.
                        </p>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoItemTitle}>Email</h4>
                                <a href="mailto:davidngari47@gmail.com" className={styles.infoItemText}>
                                    davidngari47@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoItemTitle}>Location</h4>
                                <p className={styles.infoItemText}>Nairobi, Kenya</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h4 className={styles.infoItemTitle}>Response Time</h4>
                                <p className={styles.infoItemText}>Usually within 24-48 hours</p>
                            </div>
                        </div>

                        <div className={styles.social}>
                            <h4 className={styles.socialTitle}>Connect with me</h4>
                            <div className={styles.socialLinks}>
                                <a href="https://github.com/theeWaweru" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/waweru-ngari/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contactForm}>
                    <h3 className={styles.formTitle}>Send a Message</h3>

                    {formStatus.submitted ? (
                        <div className={styles.formSuccess}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h4>Message Sent!</h4>
                            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            <button
                                className={styles.resetButton}
                                onClick={resetForm}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {formStatus.error && (
                                <div className={styles.formError}>
                                    <div className={styles.errorIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                    </div>
                                    <p>{formStatus.error}</p>
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>
                                    Name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    className={styles.formInput}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    Email <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.formInput}
                                    placeholder="Your email address"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="inquiryType" className={styles.formLabel}>
                                    Type of Inquiry
                                </label>
                                <select
                                    id="inquiryType"
                                    name="inquiryType"
                                    value={formState.inquiryType}
                                    onChange={handleChange}
                                    className={styles.formSelect}
                                >
                                    <option value="Project">Project Inquiry</option>
                                    <option value="Collaboration">Collaboration</option>
                                    <option value="Job">Job Opportunity</option>
                                    <option value="General">General Message</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.formLabel}>
                                    Subject <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    required
                                    className={styles.formInput}
                                    placeholder="What is this regarding?"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>
                                    Message <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    className={styles.formTextarea}
                                    placeholder="Tell me about your project, questions, or just say hello..."
                                    rows="5"
                                ></textarea>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="referral" className={styles.formLabel}>
                                    How did you find me? (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="referral"
                                    name="referral"
                                    value={formState.referral}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    placeholder="Google, LinkedIn, Referral, etc."
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <ReCaptcha
                                    key={captchaKey}
                                    siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onVerify={handleVerify}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={formStatus.submitting}
                            >
                                {formStatus.submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

function ContactPageLoading() {
    return (
        <div className={styles.page}>
            <div className={styles.loading}>Loading contact form...</div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <Suspense fallback={<ContactPageLoading />}>
                <ContactFormContent />
            </Suspense>
        </div>
    );
}