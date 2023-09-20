import Link from "next/link";
import React from "react";
import { Suspense } from "react";
import Preloader from "./Loading";
import styles from "./styles/home.module.css";
import dots from "./styles/particles.module.css";
import Particles from "./components/particles";
import Logo from "./components/logo";
import { Sedgwick_Ave_Display, Tektur, Lemonada } from "next/font/google";
import clsx from "clsx";
import { Tek } from "./layout";
import Button from "./components/button";

export const revalidate = 0;

const navigation = [
  // { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];
export const Sedwig = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className={styles.main}>
      <nav className={styles.nav_container}>
        <ul className={styles.nav_ul}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(Tek.className, styles.nav_link)}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <Particles className={dots.particles_container} quantity={300} />
      <Suspense fallback={<Preloader />}>
        <div className={styles.hero_container}>
          <div className={styles.circle}></div>
          <div className={styles.home_logo}>
            <Logo />
          </div>
          <div className={styles.animation}></div>
        </div>
        <div className={styles.text_container}>
          <h5 className={clsx(Tek.className, "text-m text-white-600")}>
            Hi, I&apos;m Dave
            <br />
          </h5>
          <h1 className={clsx(Tek.className, styles.home_title)}>
            Creative Developer
            <br />
            Digital Designer
          </h1>
          <Button />
        </div>
      </Suspense>
    </div>
  );
}
