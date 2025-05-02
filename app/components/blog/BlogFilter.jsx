// app/components/blog/BlogFilter.jsx

import React from 'react';

const BlogFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-gray-800">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
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

            {/* Search */}
            <div className="w-full md:w-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogFilter;