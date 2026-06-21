// Dark hover list. Each row brightens and slides right on hover and floats a
// preview (striped placeholder; swap for a looping gif/video per service later).
const SERVICES = [
  { name: "Brand & Product Digital Strategy", tag: "strategy preview · gif" },
  { name: "Creative Design, UI/UX & App", tag: "design preview · gif" },
  { name: "Web Development", tag: "web dev preview · gif" },
  { name: "AI Driven Builds", tag: "ai builds preview · gif" },
];

export default function Services() {
  return (
    <section className="sec services" id="services">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="index-tag">What I Do · 02</p>
            <h2>Where I Add Value</h2>
          </div>
        </div>
        <div className="svc-list">
          {SERVICES.map((s, i) => (
            <a className="svc-row" key={s.name}>
              <span className="svc-name">{s.name}</span>
              <span className="svc-idx">{String(i + 1).padStart(2, "0")}</span>
              <div className="svc-prev">
                <div className="ph">
                  <span className="ph-tag">{s.tag}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
