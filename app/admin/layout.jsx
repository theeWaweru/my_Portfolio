// app/admin/layout.jsx
"use client";

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

// Loading component
function LoadingAdmin() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                textAlign: 'center'
            }}>
                <div style={{
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #0070f3',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }}></div>
                <p style={{ fontFamily: 'var(--font-tektur)' }}>Loading Admin...</p>
            </div>
        </div>
    );
}

// Admin content component
function AdminContent({ children }) {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const auth = localStorage.getItem('isAuthenticated');
            setIsAuthenticated(auth === 'true');
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/admin/login';
    };

    // Show login page if not authenticated
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
            return null;
        }
    }

    // Don't apply the layout to the login page
    if (pathname === '/admin/login') {
        return children;
    }

    // Show loading indicator while checking auth
    if (isLoading) {
        return <LoadingAdmin />;
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Portfolio Admin</h2>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                href="/admin"
                                className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/projects"
                                className={`${styles.navLink} ${pathname.startsWith('/admin/projects') ? styles.active : ''}`}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/blog"
                                className={`${styles.navLink} ${pathname.startsWith('/admin/blog') ? styles.active : ''}`}
                            >
                                Blog Posts
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/messages"
                                className={`${styles.navLink} ${pathname.startsWith('/admin/messages') ? styles.active : ''}`}
                            >
                                Messages
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backToSite}>
                        Back to Site
                    </Link>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}

// Main exported component with Suspense
function AdminLayout({ children }) {
    return (
        <Suspense fallback={<LoadingAdmin />}>
            <AdminContent>{children}</AdminContent>
        </Suspense>
    );
}

export default AdminLayout;