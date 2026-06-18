const STEPS = [
  { n: "01", title: "Discover", body: "We dig into your goals, audience and competitors to find the real opportunity." },
  { n: "02", title: "Design", body: "Wireframes to hi-fi screens; we shape the look, feel and flow together." },
  { n: "03", title: "Build", body: "Pixel-faithful, performant code with motion and accessibility baked in." },
  { n: "04", title: "Launch", body: "We ship, measure and refine, so the work keeps earning its keep." },
];

export default function Process() {
  return (
    <section className="sec process" id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="index-tag">How I Work · 03</p>
            <h2>The Process</h2>
          </div>
          <p className="sub">
            A clear, collaborative path from idea to launch. No surprises, no
            jargon.
          </p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step reveal" key={s.n}>
              <div className="st-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
