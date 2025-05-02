// app/components/Footer/Footer.jsx
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.footerAbout}>
                        <div className={styles.footerLogo}>
                            thee<span className={styles.footerLogoHighlight}>Waweru</span>.dev
                        </div>
                        <p className={styles.footerAboutText}>
                            I'm a creative developer based in Nairobi, Kenya, specializing in UI/UX design and web development.
                        </p>
                        <div className={styles.footerSocial}>
                            <a
                                href="https://github.com/theeWaweru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerSocialLink}
                                aria-label="GitHub"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/theeWaweru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerSocialLink}
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/theeWaweru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerSocialLink}
                                aria-label="LinkedIn"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.footerNav}>
                        <div>
                            <h3 className={styles.footerNavTitle}>Navigation</h3>
                            <ul className={styles.footerNavList}>
                                <li className={styles.footerNavItem}>
                                    <Link href="/" className={styles.footerNavLink}>
                                        Home
                                    </Link>
                                </li>
                                <li className={styles.footerNavItem}>
                                    <Link href="/work" className={styles.footerNavLink}>
                                        Work
                                    </Link>
                                </li>
                                <li className={styles.footerNavItem}>
                                    <Link href="/blog" className={styles.footerNavLink}>
                                        Blog
                                    </Link>
                                </li>
                                <li className={styles.footerNavItem}>
                                    <Link href="/about" className={styles.footerNavLink}>
                                        About
                                    </Link>
                                </li>
                                <li className={styles.footerNavItem}>
                                    <Link href="/contact" className={styles.footerNavLink}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.footerNavTitle}>Contact</h3>
                            <ul className={styles.footerNavList}>
                                <li className={styles.footerNavItem}>
                                    <Link href="mailto:hello@theewaweru.dev" className={styles.footerNavLink}>
                                        hello@theewaweru.dev
                                    </Link>
                                </li>
                                <li className={styles.footerNavItem}>
                                    <p>Nairobi, Kenya</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >

                <div className={styles.footerBottom}>
                    <p className={styles.footerCopyright}>
                        &copy; {currentYear} David Waweru. All rights reserved.
                    </p>
                    <div>
                        <Link href="/privacy" className={styles.footerNavLink}>
                            Privacy Policy
                        </Link>
                        {' | '}
                        <Link href="/terms" className={styles.footerNavLink}>
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div >
        </footer >
    );
};

export default Footer;