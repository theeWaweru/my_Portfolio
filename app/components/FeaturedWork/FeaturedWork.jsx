// app/components/FeaturedWork/FeaturedWork.jsx
"use client";
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './FeaturedWork.module.css';
import { getProjects } from '../../lib/supabase/projects';

const FeaturedWork = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeaturedProjects() {
      setIsLoading(true);
      try {
        const { data, error } = await getProjects();
        if (error) throw error;

        // Get featured projects or first 3 if none marked as featured
        const featuredProjects = data.filter(project => project.featured) || data.slice(0, 3);
        setProjects(featuredProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProjects();
  }, []);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Work</h2>
          <p className={styles.sectionSubtitle}>
            A selection of my recent projects showcasing my approach to design and development
          </p>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading projects...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className={styles.cta}>
          <Button href="/work" variant="primary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;