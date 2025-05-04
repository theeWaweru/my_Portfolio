// app/components/Header/Header.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Only run scroll handling on client side
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                if (window.scrollY > 30) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.headerContainer}>
                <Link href="/" className={styles.logo}>
                    thee<span className={styles.logoHighlight}>Waweru</span>.dev
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.path} className={styles.navItem}>
                                <Link
                                    href={link.path}
                                    className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
                        onClick={handleMenuToggle}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.menuLine}></span>
                        <span className={styles.menuLine}></span>
                        <span className={styles.menuLine}></span>
                    </button>
                </nav>
            </div>

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <ul className={styles.mobileNavList}>
                    {navLinks.map((link) => (
                        <li key={link.path} className={styles.mobileNavItem}>
                            <Link
                                href={link.path}
                                className={`${styles.mobileNavLink} ${pathname === link.path ? styles.active : ''}`}
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;