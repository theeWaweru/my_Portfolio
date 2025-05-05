// app/components/FeaturedWork/FeaturedWork.jsx
"use client";
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './FeaturedWork.module.css';
import { getProjects } from '../../lib/supabase/projects';

// Placeholder image path
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

const FeaturedWork = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const { data, error } = await getProjects();

        if (error) throw error;

        // Get only the first 3 projects to display
        const featuredProjects = data.slice(0, 3).map(project => {
          // Normalize the project data to match what ProjectCard expects
          return {
            ...project,
            // Use placeholder image if no image is available
            coverImage: project.cover_image_url || project.coverImage || project.image || PLACEHOLDER_IMAGE
          };
        });

        setProjects(featuredProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
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
        ) : projects.length === 0 ? (
          <div className={styles.noProjects}>No projects found. Add some projects to display here.</div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => (
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