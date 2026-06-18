// app/work/[id]/page.jsx : project case study
import Link from "next/link";
import { getProjectById } from "../../lib/supabase/projects";
import "../../components/home/home.css";

const PLACEHOLDER = "/images/placeholder.jpg";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: project } = await getProjectById(id);
  if (!project) {
    return { title: "Project Not Found | David Waweru" };
  }
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const { data: project, error } = await getProjectById(id);

  if (!project || error) {
    return (
      <section className="sec proj">
        <div className="wrap">
          <Link href="/work" className="proj-back">← Back to Work</Link>
          <h1>Project Not Found</h1>
          <p className="proj-lead">This project does not exist or has been moved.</p>
        </div>
      </section>
    );
  }

  const cover = project.cover_image_url || PLACEHOLDER;
  const gallery = Array.isArray(project.gallery) && project.gallery.length
    ? project.gallery
    : [PLACEHOLDER, PLACEHOLDER];
  const body = (project.full_description || project.description || "")
    .split(/\n{2,}/)
    .filter(Boolean);
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const hasLink = Boolean(project.live_url);

  const facts = [
    ["Client", project.client],
    ["Build", project.build],
    ["Site Type", project.site_type],
    ["Work", project.work],
    ["Timeline", project.timeline],
  ].filter(([, v]) => v);

  return (
    <section className="sec proj">
      <div className="wrap">
        <Link href="/work" className="proj-back">← Back to Work</Link>

        <div className="proj-head">
          <div>
            <p className="eyebrow proj-eyebrow">{project.category || "Project"}</p>
            <h1>{project.title}</h1>
            <p className="proj-lead">{project.description}</p>
          </div>
          <div className="proj-facts">
            {facts.map(([k, v]) => (
              <div className="proj-fact" key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="proj-cover" style={{ backgroundImage: `url(${cover})` }} />

        <div className="proj-body">
          <h2>Overview</h2>
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {tags.length ? (
            <div className="tags" style={{ marginTop: "8px" }}>
              {tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="proj-gallery">
          {gallery.map((src, i) => (
            <div className="shot" key={i} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>

        {!hasLink ? (
          <p className="proj-note">
            A live link isn&apos;t available for this one. Many client builds are private,
            behind a login, or have since been rebranded or taken down. If you&apos;d like a
            closer look, reach out and I&apos;ll gladly walk you through the work.
          </p>
        ) : null}

        <div className="proj-foot">
          {hasLink ? (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-accent">
              View Site ↗
            </a>
          ) : (
            <Link href="/contact" className="btn btn-accent">
              Ask Me About This Project
            </Link>
          )}
          <Link href="/contact" className="btn btn-ghost">Start a Project</Link>
        </div>
      </div>
    </section>
  );
}
