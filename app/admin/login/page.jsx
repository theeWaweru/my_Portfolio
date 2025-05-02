// app/admin/login/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('isAuthenticated');
            if (auth === 'true') {
                router.push('/admin');
            }
        };

        checkAuth();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // This is just a simple mock authentication
            // In a real application, you would connect to your backend

            // Basic form validation
            if (!formData.email || !formData.password) {
                throw new Error('Email and password are required');
            }

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock credentials check - hardcoded for testing
            // In production, this would be an API call
            if (formData.email === 'admin@theewaweru.dev' && formData.password === 'admin123') {
                // Success, store auth state in localStorage
                localStorage.setItem('isAuthenticated', 'true');

                // Redirect to admin dashboard
                console.log('Login successful, redirecting...');
                router.push('/admin');
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <h1 className={styles.logoText}>
                        thee<span className={styles.highlight}>Waweru</span>.dev
                    </h1>
                    <h2 className={styles.loginTitle}>Admin Login</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className={styles.loginFooter}>
                    <a href="/" className={styles.backLink}>
                        Back to Site
                    </a>
                </div>
            </div>
        </div>
    );
}