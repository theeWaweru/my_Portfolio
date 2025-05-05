// app/components/MinimalistHero/MinimalistHero.jsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './MinimalistHero.module.css';

const MinimalistHero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.name}>DAVID WAWERU<sup className={styles.copyright}>©</sup></h1>

                    <div className={styles.description}>
                        <p>
                            I help brands and startups craft digital experiences
                            that stand out through thoughtful design and innovative solutions.
                        </p>

                        <Link href="/contact" className={styles.bookButton}>
                            BOOK A CALL ↗
                        </Link>
                    </div>

                    <div className={styles.profileContainer}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/david-waweru-profile.jpg" // Replace with your profile image
                                alt="David Waweru"
                                width={400}
                                height={400}
                                className={styles.profileImage}
                                priority
                            />
                        </div>

                        <div className={styles.availability}>
                            <p>AVAILABLE FOR FREELANCE WORK</p>
                            <p className={styles.date}>APR '25</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MinimalistHero;