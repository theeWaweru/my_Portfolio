import { Mail, Figma, Github } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import Socials from "../components/socials"
import { Card } from "../components/card"
import Particles from "../components/particles"
import dots from "../styles/particles.module.css"
import styles from "../styles/contact.module.css"
import clsx from "clsx"
import { Brick, Diphy, Tek } from "../layout"
import Preloader from "../Loading"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "Projects", href: "/projects" },
  // { name: "Contact", href: "/contact" },
];

const socials = [
  {
    id: 1,
    icon: <Mail size={20} />,
    href: "mailto:davidngari47@gmail.com",
    label: "Email",
    handle: "Gmail"
  },
  {
    id: 2,
    icon: <Figma size={20} />,
    href: "/",
    label: "Figma",
    handle: "My UI Projects"
  },
  {
    id: 3,
    icon: <Github size={20} />,
    href: "/",
    label: "Github",
    handle: "My Dev Projects"
  }
]


export default function Example() {
  return (
    <main className={styles.main_container}>
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
      <Particles
        className={dots.particles_container} quantity={300}
      />
      <Suspense fallback={<Preloader />}>
        <div className={styles.content_container}>
          <h6 className={clsx(Brick.className, styles.contact_text)}>
            I code and animate on front-end software (using javascript mostly),
            <br />
            <br />
            I make cool clips and reels for my clients
            <br />
            (need arose from making cool after effects animations for my websites)
            <br />
            and I also write job-winning proposals (is there such a word,
            job-winning!?).
            <br />
            <br />
            <Link
              href="/contact"
              className="underline duration-500 hover:text-zinc-300"
            >
              Hit me up
            </Link>{" "}
            and let&apos;s talk bidness (business).
            <br /> I currently hone my skills at{" "}
            <Link
              target="_blank"
              href="https://mb96.co"
              className="underline duration-500 hover:text-zinc-300"
            >
              mb96
            </Link>{" "}
            during the day,
            <br />
            and working on my personal brand{" "}
            <Link
              target="_blank"
              href="https://theewaweru.dev"
              className="underline duration-500 hover:text-zinc-300"
            >
              theewaweru.dev
            </Link>{" "}
            at night.
          </h6>
          <div className={styles.contact_card_containter}>
            {socials.map(s => (
              <Card
                key={s}
              >
                <Link
                  href={s.href}
                  target="_blank"
                  className={styles.contact_card}
                >
                  <span
                    className={styles.contact_card_span}
                    aria-hidden="true"
                  />
                  <span className={styles.contact_card_icon}>
                    {s.icon}
                  </span>{" "}
                  <div className="z-10 flex flex-col items-center">
                    <span className={styles.contact_card_handle}>
                      {s.handle}
                    </span>
                    <span className={styles.contact_card_label}>
                      {s.label}
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
          <div className={styles.contact_card_containter}>
            <Socials />
          </div>
        </div>
      </Suspense>
    </main>
  )
}
