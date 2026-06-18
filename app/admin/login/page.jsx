// app/admin/login/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase/client';
import styles from './login.module.css';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // If a valid session already exists, skip the login screen
    useEffect(() => {
        const checkAuth = async () => {
            if (!supabase) return;
            const { data } = await supabase.auth.getSession();
            if (data?.session) {
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
            if (!formData.email || !formData.password) {
                throw new Error('Email and password are required');
            }

            if (!supabase) {
                throw new Error('Authentication is not configured.');
            }

            // Real authentication against Supabase Auth
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (signInError) {
                throw new Error('Invalid email or password');
            }

            router.push('/admin');
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