// app/components/FeaturedWork/FeaturedWork.jsx
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './FeaturedWork.module.css';

const FeaturedWork = () => {
  // Mock project data
  const projects = [
    {
      id: 'furaha-financial',
      title: 'Furaha Financial',
      description: 'Complete redesign of a digital banking platform focused on improving user experience and accessibility.',
      category: 'UI/UX Design',
      tags: ['Fintech', 'Web App', 'Mobile App'],
      image: '/images/projects/placeholder-1.jpg',
    },
    {
      id: 'chupachap',
      title: 'Chupachap',
      description: 'E-commerce platform designed and developed for a local marketplace with integrated payment processing.',
      category: 'Web Development',
      tags: ['E-commerce', 'Web App', 'Payments'],
      image: '/images/projects/placeholder-2.jpg',
    },
    {
      id: 'spatial-thinking',
      title: 'Spatial Thinking',
      description: 'Experimental visualization of geographical data for educational purposes.',
      category: 'Product Strategy',
      tags: ['Education', 'Data Viz'],
      image: '/images/projects/placeholder-3.jpg',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Work</h2>
          <p className={styles.sectionSubtitle}>
            A selection of my recent projects showcasing my approach to design and development
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

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