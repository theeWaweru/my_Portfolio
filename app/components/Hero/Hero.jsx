// app/components/Hero/Hero.jsx
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <span className={styles.pretitle}>UI/UX Designer & Creative Developer</span>
                    <h1 className={styles.title}>
                        Hi, I'm <span className={styles.titleHighlight}>David Waweru</span>
                    </h1>
                    <p className={styles.subtitle}>
                        I'm a creative developer based in Nairobi, building elegant, user-focused digital
                        experiences through thoughtful design and clean code.
                    </p>

                    {/* Skills showcase */}
                    <div className={styles.skillsHighlight}>
                        <div className={styles.skill}>
                            <span className={styles.skillValue}>5+</span>
                            <span className={styles.skillLabel}>Years Experience</span>
                        </div>
                        <div className={styles.skill}>
                            <span className={styles.skillValue}>50+</span>
                            <span className={styles.skillLabel}>Projects Completed</span>
                        </div>
                        <div className={styles.skill}>
                            <span className={styles.skillValue}>AI</span>
                            <span className={styles.skillLabel}>Driven Solutions</span>
                        </div>
                    </div>

                    <div className={styles.heroButtons}>
                        <Button href="/work" variant="primary" size="large">
                            View My Work
                        </Button>
                        <a
                            href="/dave_thee_ui_designer.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadButton}
                        >
                            Download Portfolio
                        </a>
                        <Button href="/contact" variant="secondary" size="large">
                            Get In Touch
                        </Button>
                    </div>
                </div>
                <div className={styles.heroDecoration}>
                    {/* Decorative elements */}
                    <div className={styles.decorativeCircle}></div>
                    <div className={styles.decorativeShape}></div>
                </div>
                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>
                        Scroll Down
                        <div className={styles.scrollIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 5v14"></path>
                                <path d="M19 12l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;