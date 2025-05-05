// app/components/AboutSection/AboutSection.jsx
import Image from 'next/image';
import Button from '../Button/Button';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    const skills = [
        { name: 'Figma', level: 90 },
        { name: 'HTML/CSS/JS', level: 85 },
        { name: 'React', level: 75 },
        { name: 'Next.js', level: 70 },
        { name: 'WordPress', level: 80 },
        { name: 'Webflow', level: 90 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'Web Development', level: 80 },
        { name: 'Product Strategy', level: 75 },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left column - Bio content */}
                    <div className={styles.bioColumn}>
                        <h2 className={styles.sectionTitle}>About Me</h2>

                        <p className={styles.bio}>
                            I'm a self-taught UI/UX designer and web developer with over 5 years of experience
                            crafting digital solutions in Nairobi, Kenya. I began my journey at MB96, where I honed
                            my skills across diverse client projects.
                        </p>

                        <p className={styles.bio}>
                            My passion lies at the intersection of design and development, creating experiences that
                            are not only visually appealing but also functional and intuitive.
                        </p>

                        <Button href="/about" variant="secondary" className={styles.aboutButton}>
                            Know Me Better
                        </Button>
                    </div>

                    {/* Right column - Profile & Skills */}
                    <div className={styles.profileColumn}>
                        <div className={styles.profileContainer}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/profile.jpg"
                                    alt="David Waweru"
                                    width={400}
                                    height={400}
                                    className={styles.profileImage}
                                />
                            </div>

                            <div className={styles.skillsContainer}>
                                <h3 className={styles.skillsTitle}>My Expertise</h3>
                                <div className={styles.skillsList}>
                                    {skills.map((skill, index) => (
                                        <div key={index} className={styles.skillItem}>
                                            <div className={styles.skillInfo}>
                                                <span className={styles.skillName}>{skill.name}</span>
                                                <span className={styles.skillLevel}>{skill.level}%</span>
                                            </div>
                                            <div className={styles.skillBar}>
                                                <div
                                                    className={styles.skillProgress}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;