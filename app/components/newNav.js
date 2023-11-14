"use client";

import React from "react";
import styles from "../styles/home.module.css";
import style from "../styles/nav.module.css";
import Logo from "./logo";
import clsx from "clsx";
import { Tek } from "../layout";

export const revalidate = 0;

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Newnav() {
  return (
    <>
      <nav className={styles.nav_container}>
        <ul className={style.nav_ul}>
          {navigation.map((item) => (
            <a
              key={item}
              href={item.href}
              className={clsx(Tek.className, style.nav_link)}
            >
              {item.name}
            </a>
          ))}
        </ul>
      </nav>
      <div className={styles.hero_container}>
        <div className={styles.circle}></div>
        <div className={styles.home_logo}>
          <Logo />
        </div>
        <div className={styles.animation}></div>
      </div>
    </>
  );
}
