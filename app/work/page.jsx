// Update app/work/page.jsx to fetch real data
"use client";
import { useState, useEffect } from 'react';
import ProjectCard from '../components/work/ProjectCard';
import ProjectFilter from '../components/work/ProjectFilter';
import { getProjects } from '../lib/supabase/projects';
import styles from './page.module.css';

export default function WorkPage() {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState(['All Projects']);
    const [selectedCategory, setSelectedCategory] = useState('All Projects');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            setIsLoading(true);
            try {
                const { data, error } = await getProjects();
                if (error) throw error;

                setProjects(data || []);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(project => project.category))];
                setCategories(['All Projects', ...uniqueCategories]);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadProjects();
    }, []);

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All Projects'
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>My Work</h1>
                <p className={styles.pageDescription}>
                    Explore my recent projects and case studies
                </p>
            </div>

            <ProjectFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {isLoading ? (
                <div className={styles.loading}>Loading projects...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : filteredProjects.length === 0 ? (
                <div className={styles.noProjects}>No projects found</div>
            ) : (
                <div className={styles.projectGrid}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isLoaded={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}