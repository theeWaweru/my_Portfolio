import React from "react";
import styles from "./styles/home.module.css";
import clsx from "clsx";
import Newnav from "./components/newNav";
import { Tek } from "./layout";
import Button from "./components/button";
import { Analytics } from "@vercel/analytics/react";
import ThreeScene from "./components/ThreeScene";
import InteractiveText from "./components/InteractiveText";

export const revalidate = 0;

export default function Home() {
  return (
    <div className={styles.main}>
      <Newnav />
      <ThreeScene />
      <div className={styles.text_container}>
        <h5 className={clsx(Tek.className, "text-m text-white-600")}>
          Hi, I&apos;m Dave
        </h5>
        <InteractiveText className={clsx(Tek.className, styles.home_title)}>
          Creative Developer Digital Designer
        </InteractiveText>
        <Button />
      </div>
    </div>
  );
}