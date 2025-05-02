// app/components/ContactCTA/ContactCTA.jsx
import Link from 'next/link';
import styles from './ContactCTA.module.css';

const ContactCTA = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Let's Work Together</h2>
                <p className={styles.subtitle}>
                    Have a project in mind? I'd love to hear about it. Let's discuss how I can help bring your ideas to life.
                </p>
                <Link href="/contact" className={styles.ctaButton}>
                    Get In Touch
                </Link>
            </div>
        </section>
    );
};

export default ContactCTA;