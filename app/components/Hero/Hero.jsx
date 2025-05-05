// app/components/Hero/Hero.jsx
import Link from 'next/link';
import Button from '../Button/Button';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './Hero.module.css';
import StyledButton from '../StyledButton/StyledButton';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContainer}>
                <div>
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
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.heroContent_divs}>
                        <p className={styles.subtitle}>
                            Hi, I'm Waweru Ngari, a creative based in Nairobi, Kenya.
                            I help growing brands and startups gain an unfair advantage through premium, results driven websites.
                            I'm a creative developer on a mission to build elegance, user-focused digital
                            experiences through thoughtful design and development.
                            <br />
                            Actively working on the website, but let guys have a sneak peek of what's to come!
                        </p>{/* Skills showcase */}
                        <div className={styles.skillsHighlight}>
                            <div className={styles.skill}>
                                <span className={styles.skillValue}>5+</span>
                                <span className={styles.skillLabel}>Years Experience</span>
                            </div>
                            <div className={styles.skill}>
                                <span className={styles.skillValue}>20+</span>
                                <span className={styles.skillLabel}>Projects Completed</span>
                            </div>
                            <div className={styles.skill}>
                                <span className={styles.skillValue}>AI</span>
                                <span className={styles.skillLabel}>Driven Solutions</span>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.heroContent_divs_image, styles.heroContent_divs)}>
                        <Image src="/images/placeholder.jpg"
                            width={446}
                            height={512}
                            className={clsx(styles.heroContent_image)}
                            alt="Picture of the Waweru Ngari" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg..." />
                    </div>
                    <div className={clsx(styles.heroContent_divs, styles.heroContent_divs_end_div)}>
                        <div className={styles.heroButtons}>
                            <StyledButton href="/work" variant="primary" size="medium">View My Work</StyledButton>
                            <StyledButton href="/dave_thee_ui_designer.pdf" variant="accent" target="_blank" size="medium">Download Portfolio</StyledButton>
                            <StyledButton href="/contact" variant="vibrant" size="medium">Get In Touch</StyledButton>
                        </div>
                    </div>
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