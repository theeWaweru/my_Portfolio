// app/privacy/page.jsx : Privacy Policy (Kenya DPA 2019, with international visitors in mind)
import styles from "./privacy.module.css";

export const metadata = {
  title: "Privacy Policy | David Waweru",
  description:
    "How theewaweru.dev collects, uses and protects your data, including the contact form, newsletter, Google Analytics and reCAPTCHA.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.kicker}>Legal</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: 21 June 2026</p>

        <p className={styles.intro}>
          This policy explains what personal data this website (theewaweru.dev)
          collects, why it is collected, how it is used, and the choices you
          have. It is written with Kenya&apos;s Data Protection Act, 2019 in
          mind, and it also respects the rights of visitors from other regions,
          such as those covered by the GDPR.
        </p>

        <section className={styles.section}>
          <h2>Who is responsible for your data</h2>
          <p>
            This site is owned and operated by David Waweru Ngari (theeWaweru),
            a designer and developer based in Nairobi, Kenya. For the purposes
            of the Data Protection Act, 2019, David Waweru Ngari is the data
            controller. If you have any question about this policy or your data,
            you can reach me at{" "}
            <a href="mailto:davidngari47@gmail.com">davidngari47@gmail.com</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Information I collect</h2>
          <p>I only collect what is needed to run the site and respond to you:</p>
          <ul>
            <li>
              <strong>Contact form.</strong> When you send a message, I collect
              your name, email address, the inquiry type, the subject, your
              message, and (optionally) how you heard about me. This is stored
              securely so I can read and reply to your enquiry.
            </li>
            <li>
              <strong>Newsletter.</strong> If you subscribe, I store your email
              address so I can send occasional updates. You can unsubscribe at
              any time.
            </li>
            <li>
              <strong>Analytics.</strong> I use Google Analytics to understand
              how the site is used. This collects information such as pages
              visited, time on page, approximate location (derived from your IP
              address), device and browser type, and referral source. This data
              is aggregated and is not used to personally identify you.
            </li>
            <li>
              <strong>Spam protection.</strong> The contact form uses Google
              reCAPTCHA to prevent abuse. Google may collect hardware, software
              and interaction information to tell humans from bots, as described
              in Google&apos;s own policy.
            </li>
            <li>
              <strong>Technical data.</strong> Like most websites, my hosting
              provider automatically logs basic technical information (such as
              IP address and browser details) for security and reliability.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How I use your information</h2>
          <ul>
            <li>To respond to your messages and enquiries.</li>
            <li>To send newsletter updates, only if you have subscribed.</li>
            <li>To understand and improve how the site performs.</li>
            <li>To protect the site from spam and abuse.</li>
          </ul>
          <p>
            I do not sell your personal data, and I do not share it for
            advertising.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Legal basis for processing</h2>
          <p>
            Where the law requires a legal basis, I rely on your{" "}
            <strong>consent</strong> (for example, when you submit the contact
            form or subscribe to the newsletter), and on my{" "}
            <strong>legitimate interest</strong> in keeping the site secure and
            understanding how it is used. You may withdraw your consent at any
            time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies and analytics</h2>
          <p>
            The site uses cookies set by Google Analytics to measure usage. You
            can block or delete cookies in your browser settings, and you can
            opt out of Google Analytics across all sites using Google&apos;s
            browser add-on at{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
              tools.google.com/dlpage/gaoptout
            </a>
            . Blocking cookies will not stop you from using the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Third parties I rely on</h2>
          <p>
            I use a small set of trusted providers to run the site. Each
            processes data under its own privacy terms:
          </p>
          <ul>
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Analytics and reCAPTCHA</a>{" "}
              (usage measurement and spam protection).
            </li>
            <li>
              <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Supabase</a>{" "}
              (secure database that stores contact messages and newsletter emails).
            </li>
            <li>
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a>{" "}
              (website hosting and server logs).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>International data transfers</h2>
          <p>
            Some of these providers store or process data on servers outside
            Kenya. Where that happens, the transfer is covered by the
            provider&apos;s own safeguards and privacy commitments. By using the
            site you understand that your data may be processed in other
            countries.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How long I keep your data</h2>
          <p>
            I keep contact messages for as long as needed to handle your enquiry
            and any follow up, then remove them when they are no longer needed.
            Newsletter emails are kept until you unsubscribe. Analytics data is
            retained according to Google Analytics&apos; standard retention
            settings. You can ask me to delete your data sooner at any time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your rights</h2>
          <p>
            Under Kenya&apos;s Data Protection Act, 2019, you have the right to
            be informed about how your data is used, to access the data I hold
            about you, to ask for corrections, to request deletion, to object to
            certain processing, and to withdraw consent. Visitors from other
            regions, including those covered by the GDPR, have equivalent rights,
            including access, rectification, erasure, portability and objection.
          </p>
          <p>
            To exercise any of these rights, email{" "}
            <a href="mailto:davidngari47@gmail.com">davidngari47@gmail.com</a>{" "}
            and I will respond within a reasonable time. If you are in Kenya and
            you believe your data has been mishandled, you may also lodge a
            complaint with the Office of the Data Protection Commissioner at{" "}
            <a href="https://www.odpc.go.ke" target="_blank" rel="noreferrer">odpc.go.ke</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Children</h2>
          <p>
            This site is not directed at children under the age of 18, and I do
            not knowingly collect data from them.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security</h2>
          <p>
            I take reasonable steps to protect your data, including using
            reputable providers and secure connections. No method of
            transmission over the internet is completely secure, but I work to
            keep your information safe.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to this policy</h2>
          <p>
            I may update this policy from time to time. When I do, I will revise
            the date at the top of this page. Please check back occasionally to
            stay informed.
          </p>
        </section>
      </div>
    </main>
  );
}
