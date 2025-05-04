// app/components/work/ProjectFilter.jsx
import styles from './ProjectFilter.module.css';

const ProjectFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory
}) => {
    return (
        <div className={styles.container}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${styles.button} ${selectedCategory === category ? styles.active : ''}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default ProjectFilter;