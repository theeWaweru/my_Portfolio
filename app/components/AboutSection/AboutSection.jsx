// app/components/AboutSection/AboutSection.jsx
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    const skills = [
        { name: 'Figma', highlight: true },
        { name: 'HTML/CSS/JS', highlight: true },
        { name: 'React', highlight: true },
        { name: 'Next.js', highlight: false },
        { name: 'WordPress', highlight: false },
        { name: 'Webflow', highlight: true },
        { name: 'UI/UX Design', highlight: false },
        { name: 'Web Development', highlight: false },
        { name: 'Product Strategy', highlight: false },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>About Me</h2>
                    <p className={styles.sectionSubtitle}>
                        A brief introduction to who I am and what I do
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.text}>
                        <p>
                            I'm a self-taught UI/UX designer and web developer with over 5 years of experience
                            crafting digital solutions in Nairobi, Kenya. I began my journey at MB96, where I honed
                            my skills across diverse client projects.
                        </p>
                        <p>
                            My passion lies at the intersection of design and development, creating experiences that
                            are not only visually appealing but also functional and intuitive. I believe in the
                            power of thoughtful design to solve problems and improve people's lives.
                        </p>
                        <p>
                            Currently, I'm focused on expanding my capabilities in AI-driven design and
                            development, exploring how emerging technologies can enhance human experiences.
                        </p>

                        <div className={styles.skillsContainer}>
                            <h3 className={styles.skillsTitle}>Skills & Expertise</h3>
                            <div className={styles.skillsList}>
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`${styles.skillItem} ${skill.highlight ? styles.highlight : ''}`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.imageContainer}>
                        {/* You can add your profile image here */}
                        <div className={styles.imagePlaceholder} style={{ backgroundColor: '#f0f0f0', height: '400px', borderRadius: '8px' }}>
                            {/* This is a placeholder. Replace with an actual image */}
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Profile Image</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Button href="/about" variant="secondary">
                        Learn More About Me
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;