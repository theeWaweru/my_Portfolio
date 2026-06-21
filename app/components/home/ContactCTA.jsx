// Red band, single CTA to email.
export default function ContactCTA() {
  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <p className="eyebrow reveal" style={{ color: "#fff", justifyContent: "center" }}>
          Wanna Chat?
        </p>
        <h2 className="reveal">Let's Work Together</h2>
        <p className="reveal">
          Have a project in mind? I'd love to hear about it. Let's turn your idea
          into something that earns attention.
        </p>
        <a href="/contact" className="btn btn-light reveal">
          Get In Touch
        </a>
        <a href="mailto:davidngari47@gmail.com" className="email reveal">
          davidngari47@gmail.com · usually replies within a day or two
        </a>
      </div>
    </section>
  );
}
