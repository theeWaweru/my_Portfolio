// app/components/Footer/Footer.jsx
import Link from 'next/link';
import styles from './Footer.module.css';
import { Icons } from '../icons/MinimalIcons';

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
                        <ul className={styles.footerNavList}>
                            <li className={styles.footerNavItem}>
                                <Link href="mailto:davidngari47@gmail.com" className={styles.footerNavLink}>
                                    davidngari47@gmail.com
                                </Link>
                            </li>
                        </ul>
                        <div className={styles.footerSocial}>
                            <a href="https://github.com/theeWaweru" className={styles.footerSocialLink}>
                                <Icons.Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/waweru-ngari/" className={styles.footerSocialLink}>
                                <Icons.Linkedin size={20} />
                            </a>
                            <a href="mailto:davidngari47@gmail.com" className={styles.footerSocialLink}>
                                <Icons.Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div >

                <div className={styles.footerBottom}>
                    <div className={styles.footerNav}>
                        <h3 className={styles.footerNavTitle}>Navigation</h3>
                        <ul className={styles.footerNavList}>
                            <li className={styles.footerNavItem}>
                                <Link href="/" className={styles.footerNavLink}>
                                    Welcome
                                </Link>
                            </li>
                            <li className={styles.footerNavItem}>
                                <Link href="/work" className={styles.footerNavLink}>
                                    From the Lab
                                </Link>
                            </li>
                            <li className={styles.footerNavItem}>
                                <Link href="/blog" className={styles.footerNavLink}>
                                    Mind Bytes
                                </Link>
                            </li>
                            <li className={styles.footerNavItem}>
                                <Link href="/about" className={styles.footerNavLink}>
                                    Meet Waweru
                                </Link>
                            </li>
                            <li className={styles.footerNavItem}>
                                <Link href="/contact" className={styles.footerNavLink}>
                                    Wanna Chat?
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link href="/privacy" className={styles.footerNavLink}>
                            Privacy Policy
                        </Link>
                        {' | '}
                        <Link href="/terms" className={styles.footerNavLink}>
                            Terms of Service
                        </Link>
                    </div>
                    <p className={styles.footerCopyright}>
                        &copy; {currentYear} theeWaweru. All rights reserved.
                    </p>
                </div>
            </div >
        </footer >
    );
};

export default Footer;