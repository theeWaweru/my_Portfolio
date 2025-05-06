// app/components/Header/Header.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Icons } from '../icons/MinimalIcons';

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
        { name: 'Welcome', path: '/' },
        { name: 'From the Lab', path: '/work' },
        { name: 'Mind Bytes', path: '/blog' },
        { name: 'Meet Waweru', path: '/about' },
        { name: 'Wanna Chat?', path: '/contact' }
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
                <div>
                    <svg width="100%" height="auto" viewBox="0 0 1361 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 15.6782L35.9363 5.13165V38.8805H76.8568V68.4108H35.9363V123.253H76.8568V152.783H25.8116L0.5 127.471V15.6782Z" fill="var(--dark-blue)" />
                        <path d="M91.1341 152.783V5.13165H126.57V34.6619H176.35L201.662 59.9735V152.783H166.225V64.1921H126.57V152.783H91.1341Z" fill="var(--dark-blue)" />
                        <path d="M220.248 128.737V58.708L244.294 34.6619H327.823V101.316H255.684V123.253H323.604V152.783H244.294L220.248 128.737ZM255.684 84.0196L297.871 81.9103V61.661H255.684V84.0196Z" fill="var(--dark-blue)" />
                        <path d="M344.664 128.737V58.708L368.71 34.6619H452.239V101.316H380.1V123.253H448.02V152.783H368.71L344.664 128.737ZM380.1 84.0196L422.286 81.9103V61.661H380.1V84.0196Z" fill="var(--dark-blue)" />
                        <path d="M485.954 152.783L462.33 5.13165H500.298L515.274 115.659H522.024L537.632 28.334H563.788L579.397 115.659H586.146L601.122 5.13165H639.09L615.466 152.783H565.053L550.71 74.1059L536.367 152.783H485.954Z" fill="var(--marooned)" />
                        <path d="M648.69 127.471V85.2852L721.672 83.1759V64.1921H652.909V34.6619H731.797L757.109 59.9735V152.783H674.002L648.69 127.471ZM684.127 104.691V124.518H721.672V100.472L684.127 104.691Z" fill="var(--marooned)" />
                        <path d="M790.142 152.783L772.424 34.6619H808.282L819.251 123.253H824.946L839.289 46.474H872.194L886.538 123.253H892.233L903.201 34.6619H939.059L921.341 152.783H870.085L855.742 82.1212L841.398 152.783H790.142Z" fill="var(--marooned)" />
                        <path d="M952.737 128.737V58.708L976.783 34.6619H1060.31V101.316H988.173V123.253H1056.09V152.783H976.783L952.737 128.737ZM988.173 84.0196L1030.36 81.9103V61.661H988.173V84.0196Z" fill="var(--marooned)" />
                        <path d="M1078.84 152.783V59.9735L1104.15 34.6619H1163.63V66.7233H1114.28V152.783H1078.84Z" fill="var(--marooned)" />
                        <path d="M1288.45 34.6619V152.783H1203.23L1177.92 127.471V34.6619H1213.36V121.987H1253.01V34.6619H1288.45Z" fill="var(--marooned)" />
                        <path d="M1314.8 41.9103V22.0927L1322.64 14.2545H1346.15V23.7195H1325.01V40.2835H1346.15V49.7485H1322.64L1314.8 41.9103ZM1300.46 55.0726V8.93035L1308.44 0.944183H1352.51L1360.5 8.93035V55.0726L1352.51 63.0588H1308.44L1300.46 55.0726ZM1308.89 8.33878V55.6642H1352.07V8.33878H1308.89Z" fill="var(--dark-blue)" />
                    </svg>
                </div>
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
                <div className={styles.headerSocial}>
                    <a href="https://github.com/theeWaweru" className={styles.headerSocialLink}>
                        <Icons.Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/waweru-ngari/" className={styles.headerSocialLink}>
                        <Icons.Linkedin size={20} />
                    </a>
                    <a href="mailto:davidngari47@gmail.com" className={styles.headerSocialLink}>
                        <Icons.Mail size={20} />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;