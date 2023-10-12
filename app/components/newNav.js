import Link from "next/link";
import styles from "../styles/home.module.css";
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
