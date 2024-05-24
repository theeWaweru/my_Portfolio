import { Mail, Figma, Github } from "lucide-react"
import Link from "next/link"
import Socials from "../components/socials"
import { Card } from "../components/card"
import Particles from "../components/particles"
import dots from "../styles/particles.module.css"
import styles from "../styles/contact.module.css"
import stylo from "../styles/button.module.css"
import clsx from "clsx"
import { Brick, Diphy, Tek } from "../layout"
import Newnav from "../components/newNav"


const socials = [
  {
    id: 1,
    icon: <Mail size={20} />,
    href: "mailto:davidngari47@gmail.com",
    label: "Email",
    handle: "Gmail"
  }
  // {
  //   id: 2,
  //   icon: <Figma size={20} />,
  //   href: "https://www.figma.com/file/qXiXLlm7tm3a0GkMvKSPYo/Dave's-Portfolio?type=design&node-id=0%3A1&mode=design&t=UMTWTeYIlll3uN6g-1",
  //   label: "Figma",
  //   handle: "My UI Projects"
  // },
  // {
  //   id: 3,
  //   icon: <Github size={20} />,
  //   href: "https://github.com/theeWaweru",
  //   label: "Github",
  //   handle: "My Dev Projects"
  // }
]
// imitate delay
await new Promise(resolve => setTimeout(resolve, 3000))

export default function Contact() {
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <Newnav />
        <Particles
          className={dots.particles_container} quantity={300}
        />
        <div className={styles.content_container}>
          <div className="flex flex-col gap-8 items-start">
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
            <a className={clsx(Brick.className, stylo.button)} blank href="/dave_thee_creative_developer.pdf">View Portfolio</a>
          </div>
          <div className={clsx(styles.contact_card_containter, "w-6/12")}>
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
                  </span>
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
          {/* <div className={styles.contact_card_containter}>
            <Socials />
          </div> */}
        </div>
      </div></div>
  )
}
