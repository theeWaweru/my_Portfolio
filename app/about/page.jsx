// app/about/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
    title: 'About Me | David Waweru',
    description: 'Learn about David Waweru, a creative developer based in Nairobi, Kenya with experience in UI/UX design and web development.',
};

export default function AboutPage() {
    const skills = [
        { category: 'Design', items: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design Systems', 'Interaction Design'] },
        { category: 'Development', items: ['HTML/CSS/JavaScript', 'React', 'Next.js', 'Responsive Design', 'WordPress'] },
        { category: 'Tools', items: ['Figma', 'Adobe XD', 'Webflow', 'VS Code', 'Git'] },
    ];

    // Timeline/milestones
    const milestones = [
        {
            period: '2019 - 2020',
            title: 'Started as Web Developer',
            company: 'MB96',
            description: 'Began my career at MB96, developing practical skills across diverse client projects including WildRose and Furaha Financial.',
        },
        {
            period: '2020 - 2021',
            title: 'Expanded to UI/UX Design',
            company: 'MB96',
            description: 'Recognized the importance of design in development, focused on UI/UX principles while working on projects like Vault22 and Chupachap.',
        },
        {
            period: '2021 - 2022',
            title: 'Freelance Projects',
            description: 'Started taking on independent projects to diversify my experience and client base, working on B-WEL and Chui Ventures Capital.',
        },
        {
            period: '2022 - Present',
            title: 'Building Product Expertise',
            description: 'Focused on understanding product management principles and strategy while working on Prometheus X Talent and other projects.',
        },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.heroSection}>
                <h1 className={styles.pageTitle}>About Me</h1>
                <p className={styles.pageSubtitle}>
                    My journey in design and development
                </p>
            </div>

            <section className={styles.bioSection}>
                <div className={styles.bioContent}>
                    <h2 className={styles.sectionTitle}>My Story</h2>
                    <div className={styles.bioText}>
                        <p>
                            I'm David Waweru, a self-taught UI/UX designer and web developer based in Nairobi, Kenya.
                            My journey in tech began with a curiosity about how digital products are built and a desire
                            to create experiences that make technology more accessible and enjoyable.
                        </p>
                        <p>
                            Over the past five years, I've evolved from building basic websites to crafting
                            comprehensive digital experiences that merge thoughtful design with technical execution.
                            I believe great digital products emerge at the intersection of three elements: human-centered
                            design thinking, clean efficient code, and strategic business alignment.
                        </p>
                        <p>
                            Being based in Nairobi has given me a unique perspective on creating technology for diverse
                            audiences with varying levels of technical literacy and access. This environment has taught
                            me to build solutions that are not just beautiful but also practical and efficient.
                        </p>
                        <p>
                            Today, I'm focused on expanding my capabilities in AI-driven design and development,
                            exploring how emerging technologies can enhance human experiences rather than replace them.
                        </p>
                    </div>
                </div>
                <div className={styles.bioImage}>
                    {/* Replace with your actual profile image */}
                    <div className={styles.profileImageContainer}>
                        <div className={styles.profileImagePlaceholder}>
                            <span>Profile Image</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.skillsSection}>
                <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
                <div className={styles.skillsGrid}>
                    {skills.map((skillGroup) => (
                        <div key={skillGroup.category} className={styles.skillCategory}>
                            <h3 className={styles.skillCategoryTitle}>{skillGroup.category}</h3>
                            <ul className={styles.skillList}>
                                {skillGroup.items.map((skill) => (
                                    <li key={skill} className={styles.skillItem}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.timelineSection}>
                <h2 className={styles.sectionTitle}>Career Journey</h2>
                <div className={styles.timeline}>
                    {milestones.map((milestone, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <span className={styles.timelinePeriod}>{milestone.period}</span>
                                <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                                {milestone.company && (
                                    <span className={styles.timelineCompany}>{milestone.company}</span>
                                )}
                                <p className={styles.timelineDescription}>{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Let's build something amazing together</h2>
                <p className={styles.ctaText}>
                    Looking for a creative developer who can turn your ideas into reality? I'd love to discuss
                    how I can help with your next project.
                </p>
                <Link href="/contact" className={styles.ctaButton}>Get In Touch</Link>
            </section>
        </div>
    );
}