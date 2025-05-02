// app/admin/layout.jsx
"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

function AdminLayout({ children }) {
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
        return <div className={styles.loading}>Loading...</div>;
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

export default AdminLayout;