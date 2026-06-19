// Statement hero. The giant wordmark is now provided by the morphing header
// brand (see Header), which scales up to fill the top of this section and
// shrinks into the menu on scroll. This section holds only the statement copy,
// pinned to the bottom. The data-statement-hero attr drives the header state.
export default function StatementHero() {
  return (
    <section className="statement" data-statement-hero>
      <div className="wrap">
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
