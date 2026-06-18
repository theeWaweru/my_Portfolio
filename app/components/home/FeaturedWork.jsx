"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { getFeaturedProjects } from "../../lib/supabase/projects";

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

export default function FeaturedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getFeaturedProjects().then(({ data }) => {
      if (!active) return;
      setProjects(data || []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="sec work" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="index-tag">From the Lab · 01</p>
            <h2>Featured Work</h2>
          </div>
          <p className="sub">
            A handful of recent builds, where sharp design meets dependable engineering.
          </p>
        </div>

        {loading ? (
          <div className="fw-loading">
            {[0, 1, 2].map((i) => (
              <div className="pcard" key={`sk-${i}`} aria-hidden="true">
                <div className="pc-img" style={{ backgroundImage: `url(${PLACEHOLDER})` }} />
                <div className="pc-scrim" />
              </div>
            ))}
          </div>
        ) : projects.length ? (
          <Swiper
            className="fw-swiper"
            modules={[Autoplay, Scrollbar]}
            spaceBetween={22}
            slidesPerView={1}
            grabCursor={true}
            loop={projects.length > 1}
            speed={500}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              800: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
          >
            {projects.map((p) => (
              <SwiperSlide key={p.id}>
                <Card p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        <div className="work-foot reveal">
          <Link href="/work" className="btn btn-accent">View All Projects</Link>
        </div>
      </div>
    </section>
  );
}
