"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "../lib/supabase/projects";
import "../components/home/home.css";

const PLACEHOLDER = "/images/placeholder.jpg";

function Card({ p }) {
  const img = p.cover_image_url || PLACEHOLDER;
  return (
    <Link href={`/work/${p.id}`} className="pcard">
      <div className="pc-img" style={{ backgroundImage: `url(${img})` }} />
      <div className="pc-scrim" />
      <span className="pc-label">{p.site_type || "Project"}</span>
      <div className="pc-panel">
        <div className="pc-title">{p.title}</div>
        <div className="pc-client">{p.client}</div>
        <div className="pc-reveal">
          <div className="pc-meta">
            {p.build ? (<div className="row"><span className="k">Build</span><span className="v">{p.build}</span></div>) : null}
            {p.site_type ? (<div className="row"><span className="k">Site Type</span><span className="v">{p.site_type}</span></div>) : null}
            {p.work ? (<div className="row"><span className="k">Work</span><span className="v">{p.work}</span></div>) : null}
          </div>
          <span className="pc-cta">View Work <span className="arr">→</span></span>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let active = true;
    getProjects().then(({ data }) => {
      if (!active) return;
      setProjects(data || []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="sec work-page">
      <div className="wrap">
        <div className="work-page-head">
          <p className="index-tag">From the Lab</p>
          <h1>Selected Work</h1>
          <p className="work-page-sub">Recent builds across fintech, community, events and commerce, where sharp design meets dependable engineering.</p>
        </div>

        {!loading && categories.length > 2 ? (
          <div className="work-filters">
            {categories.map((c) => (
              <button key={c} className={`work-filter ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        ) : null}

        <div className="work-grid">
          {loading
            ? [0, 1, 2, 3, 4, 5].map((i) => (
                <div className="pcard" key={`sk-${i}`} aria-hidden="true">
                  <div className="pc-img" style={{ backgroundImage: `url(${PLACEHOLDER})` }} />
                  <div className="pc-scrim" />
                </div>
              ))
            : shown.map((p) => <Card key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
