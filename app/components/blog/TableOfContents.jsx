// app/components/blog/TableOfContents.jsx
"use client"

import React, { useState, useEffect } from 'react';

const TableOfContents = ({
    tableOfContents,
    activeSection,
    onSectionClick,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-collapse on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        };

        handleResize(); // Initialize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!tableOfContents || tableOfContents.length === 0) {
        return null;
    }

    return (
        <div className={`mb-8 ${className}`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-lg font-bold mb-4 lg:hidden"
            >
                <span>Table of Contents</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
                <h3 className="text-xl font-bold mb-4 hidden lg:block">Table of Contents</h3>
                <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSectionClick(item.id)}
                            className={`block text-left w-full py-1 transition-colors hover:text-blue-400 ${item.isSubheading ? 'pl-4 text-sm text-gray-400' : 'font-medium'
                                } ${activeSection === item.id ? 'text-blue-400' : ''
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default TableOfContents;