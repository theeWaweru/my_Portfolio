// app/components/work/ProjectCard.jsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({
    project,
    index = 0,
    isLoaded = true
}) => {
    const {
        id,
        title,
        description,
        category,
        tags,
        image
    } = project;

    return (
        <div
            className={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <Link
                href={`/work/${id}`}
                className="group cursor-pointer h-full block"
            >
                <div className="relative aspect-[6/9] overflow-hidden rounded-lg mb-4 bg-gray-800">
                    {/* Project image */}
                    {image && (
                        <div className="absolute inset-0">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority={index < 2}
                            />
                        </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-80 transition-all duration-500 opacity-50 z-10"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                        <button className="px-6 py-2 bg-white text-blue-900 rounded-full font-medium">
                            View Details
                        </button>
                    </div>

                    {/* Project info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                        <div className="flex gap-2 mb-3 flex-wrap">
                            {tags?.slice(0, 2).map(tag => (
                                <span
                                    key={tag}
                                    className="inline-block px-3 py-1 bg-blue-600 bg-opacity-70 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags?.length > 2 && (
                                <span className="inline-block px-3 py-1 bg-gray-700 bg-opacity-70 rounded-full text-xs">
                                    +{tags.length - 2}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;