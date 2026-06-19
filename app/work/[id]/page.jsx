// app/work/[id]/page.jsx : project case study (dark, themed per project)
// Normal-flow page so the global header + footer wrap it. Rebuilt with the
// 5-field info block and a redesigned Overview, ahead of the action buttons.
import Link from "next/link";
import { getProjectById } from "../../lib/supabase/projects";
import "../work.css";

const PLACEHOLDER = "/images/placeholder.jpg";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: project } = await getProjectById(id);
  if (!project) return { title: "Project Not Found | David Waweru" };
  return { title: `${project.title} | Case Study`, description: project.description };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const { data: project, error } = await getProjectById(id);

  if (!project || error) {
    return (
      <div className="tw-work proj">
        <article className="proj-page">
          <header className="proj-band">
            <div className="proj-crumbs">
              <Link href="/work">&larr; Back to Work</Link>
            </div>
            <div className="proj-head">
              <div className="proj-head-main">
                <h1 className="proj-title">Project Not Found</h1>
                <p className="proj-excerpt">This project does not exist or has been moved.</p>
              </div>
            </div>
          </header>
        </article>
      </div>
    );
  }

  const letter = (project.title || "?").trim().charAt(0).toUpperCase();
  const c1 = project.color1 || "#0d0f1d";
  const c2 = project.color2 || "#f2f2ef";
  const cover = project.cover_image_url;
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const body = (project.full_description || project.description || "").split(/\n{2,}/).filter(Boolean);
  const hasLink = Boolean(project.live_url);

  const gallery = Array.isArray(project.gallery) ? project.gallery.filter(Boolean) : [];
  const shots = gallery.length ? gallery : [PLACEHOLDER, PLACEHOLDER];

  const facts = [
    ["Client", project.client],
    ["Build", project.build],
    ["Site Type", project.site_type],
    ["Work", project.work],
    ["Timeline", project.timeline],
  ].filter(function (f) { return f[1]; });

  const heroStyle = cover
    ? { backgroundImage: `url(${cover})` }
    : { backgroundColor: c1, color: c2 };

  return (
    <div className="tw-work proj">
      <article className="proj-page">
        <header className="proj-band">
          <div className="proj-crumbs">
            <Link href="/work">&larr; Back to Work</Link>
            <Link href="/contact">[ Contact ]</Link>
          </div>
          <div className="proj-head">
            <div className="proj-head-main">
              <h1 className="proj-title" style={{ color: c2 }}>{project.title}</h1>
              <p className="proj-excerpt">{project.description}</p>
            </div>
            {tags.length ? (
              <ul className="proj-tags">
                {tags.map((t) => (<li key={t}><span>{t}</span></li>))}
              </ul>
            ) : null}
          </div>
        </header>

        <figure className="proj-hero">
          <div className="proj-hero-img" style={heroStyle}>
            {cover ? null : <span className="ph-letter">{letter}</span>}
          </div>
        </figure>

        <section className="proj-overview">
          <div className="proj-overview-main">
            <h2 className="proj-h2">Overview</h2>
            {body.length
              ? body.map((para, i) => (<p key={i}>{para}</p>))
              : <p>{project.description}</p>}
            {tags.length ? (
              <ul className="proj-chips">
                {tags.map((t) => (<li key={t}>{t}</li>))}
              </ul>
            ) : null}
          </div>

          {facts.length ? (
            <aside className="proj-facts">
              {facts.map((f) => (
                <div className="fact" key={f[0]}>
                  <span className="fact-k">{f[0]}</span>
                  <span className="fact-v">{f[1]}</span>
                </div>
              ))}
            </aside>
          ) : null}
        </section>

        <section className="proj-gallery">
          {shots.map((src, i) => (
            <div className="proj-shot" key={i} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </section>

        {!hasLink ? (
          <p className="proj-note">
            A live link isn&apos;t available for this one. Many client builds are private,
            behind a login, or have since been rebranded or taken down. If you&apos;d like a
            closer look, reach out and I&apos;ll gladly walk you through the work.
          </p>
        ) : null}

        <div className="proj-foot">
          {hasLink ? (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-accent">View Site &#8599;</a>
          ) : (
            <Link href="/contact" className="btn btn-accent">Ask Me About This Project</Link>
          )}
          <Link href="/contact" className="btn btn-ghost">Start a Project</Link>
        </div>
      </article>
    </div>
  );
}
