import Link from "next/link";
import React from "react";
import styles from "../styles/home.module.css";
import DownloadApp from "../components/downloadApp";

export const revalidate = 0;

export default function Home() {
  return (
    <div className={styles.main}>
      <DownloadApp />
    </div>
  );
}
