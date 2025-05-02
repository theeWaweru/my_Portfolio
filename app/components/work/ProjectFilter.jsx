// app/components/work/ProjectFilter.jsx

import React from 'react';

const ProjectFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory
}) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default ProjectFilter;