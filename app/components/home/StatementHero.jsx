import WaweruWordmark from "../WaweruWordmark";

// Full-viewport navy hero: giant WAWERU wordmark up top, bold statement and a
// mono intro pinned to the bottom. The data-statement-hero attribute lets the
// Header measure this section to toggle its over-dark state.
export default function StatementHero() {
  return (
    <section className="statement" data-statement-hero>
      <div className="wrap">
        <div className="statement-mark">
          <WaweruWordmark />
        </div>
        <div className="statement-foot">
          <h1>
            Design that performs before it explains itself
            <span className="reg">&reg;</span>
          </h1>
          <p className="statement-desc">
            I build websites and product experiences for brands that care how
            things feel, and how they convert over time.
          </p>
        </div>
      </div>
    </section>
  );
}
