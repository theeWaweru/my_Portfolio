import Link from "next/link";
import React from "react";
import styles from "./styles/home.module.css";
import dots from "./styles/particles.module.css";
import Particles from "./components/particles";
import Logo from "./components/logo";
import clsx from "clsx";
import Newnav from "./components/newNav";
import { Tek } from "./layout";
import Button from "./components/button";

export const revalidate = 0;

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className={styles.main}>
      <Newnav />
      <Particles className={dots.particles_container} quantity={300} />
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
    </div>
  );
}
