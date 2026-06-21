// app/not-found.jsx : on-brand, playful 404
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.tag}>Error 404</p>
        <h1 className={styles.code} data-text="404">404</h1>
        <h2 className={styles.headline}>This page wandered off the canvas.</h2>
        <p className={styles.desc}>
          The link is broken, the page moved, or it never existed in the first
          place. Let us get you back to something real.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-accent">Back Home</Link>
          <Link href="/work" className="btn btn-ghost">See the Work</Link>
        </div>
      </div>
    </section>
  );
}
