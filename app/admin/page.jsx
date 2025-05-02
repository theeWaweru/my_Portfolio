// app/admin/page.jsx
import styles from './page.module.css';

export default function AdminDashboard() {
    return (
        <div className={styles.dashboard}>
            <h1 className={styles.pageTitle}>Dashboard</h1>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Projects</h3>
                    <p className={styles.statNumber}>6</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Blog Posts</h3>
                    <p className={styles.statNumber}>5</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Messages</h3>
                    <p className={styles.statNumber}>12</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Visitors (30d)</h3>
                    <p className={styles.statNumber}>1,234</p>
                </div>
            </div>

            <div className={styles.recentSection}>
                <h2>Recent Messages</h2>
                <div className={styles.recentMessages}>
                    <div className={styles.messageCard}>
                        <h3>John Doe</h3>
                        <p className={styles.messageDate}>2 days ago</p>
                        <p className={styles.messageExcerpt}>
                            Hi David, I'm interested in working together on a new fintech project...
                        </p>
                        <button className={styles.viewButton}>View Message</button>
                    </div>
                    <div className={styles.messageCard}>
                        <h3>Sarah Smith</h3>
                        <p className={styles.messageDate}>5 days ago</p>
                        <p className={styles.messageExcerpt}>
                            I love your portfolio! Would you be available for a freelance project starting next month?
                        </p>
                        <button className={styles.viewButton}>View Message</button>
                    </div>
                </div>
            </div>

            <div className={styles.recentSection}>
                <h2>Recent Activity</h2>
                <ul className={styles.activityList}>
                    <li className={styles.activityItem}>
                        <span className={styles.activityDate}>Yesterday</span>
                        <span className={styles.activityDetail}>New blog post published: "Creating Accessible Web Experiences"</span>
                    </li>
                    <li className={styles.activityItem}>
                        <span className={styles.activityDate}>3 days ago</span>
                        <span className={styles.activityDetail}>Updated project: "Furaha Financial"</span>
                    </li>
                    <li className={styles.activityItem}>
                        <span className={styles.activityDate}>1 week ago</span>
                        <span className={styles.activityDetail}>New message from John Doe</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}