// app/admin/projects/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject } from '../../lib/supabase/projects';
import styles from './projects.module.css';

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await getProjects();

                if (error) {
                    throw new Error(error);
                }

                setProjects(data || []);
            } catch (err) {
                console.error('Failed to load projects:', err);
                setError('Failed to load projects. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }

        loadProjects();
    }, []);

    const handleDeleteProject = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const { error } = await deleteProject(id);

            if (error) {
                throw new Error(error);
            }

            // Update local state to remove the deleted project
            setProjects(projects.filter(project => project.id !== id));
        } catch (err) {
            console.error('Failed to delete project:', err);
            alert('Failed to delete project. Please try again.');
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading projects...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.projectsAdmin}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Projects</h1>
                <Link href="/admin/projects/new" className={styles.addButton}>
                    Add New Project
                </Link>
            </div>

            <div className={styles.tableContainer}>
                {projects.length === 0 ? (
                    <div className={styles.noProjects}>
                        <p>No projects found. Click the "Add New Project" button to create your first project.</p>
                    </div>
                ) : (
                    <table className={styles.projectsTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className={styles.projectRow}>
                                    <td>
                                        <Link href={`/admin/projects/${project.id}`} className={styles.projectTitle}>
                                            {project.title}
                                        </Link>
                                    </td>
                                    <td>{project.category}</td>
                                    <td>{new Date(project.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[project.status]}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className={styles.actionButton}
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/work/${project.id}`}
                                            target="_blank"
                                            className={styles.actionButton}
                                        >
                                            View
                                        </Link>
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => handleDeleteProject(project.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}