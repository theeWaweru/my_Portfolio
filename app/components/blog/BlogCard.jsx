// app/components/blog/BlogCard.jsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({
    post,
    index = 0,
    isLoaded = true,
    variant = 'default' // 'default', 'featured', 'minimal'
}) => {
    const {
        id,
        title,
        description,
        category,
        publishedDate,
        readTime,
        image,
        tags = []
    } = post;

    // Featured variant (large card)
    if (variant === 'featured') {
        return (
            <div
                className={`cursor-pointer transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Link href={`/blog/${id}`} className="group block h-full">
                    <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 group-hover:opacity-80 transition-all duration-500 opacity-60 z-10"></div>

                        {image && (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                            />
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                            <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-3">
                                {category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{title}</h2>
                            <p className="text-gray-200 line-clamp-2">{description}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <p>{publishedDate}</p>
                        <p>{readTime}</p>
                    </div>
                </Link>
            </div>
        );
    }

    // Minimal variant (compact, sidebar-friendly)
    if (variant === 'minimal') {
        return (
            <Link
                href={`/blog/${id}`}
                className={`group flex gap-4 mb-4 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                {image && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div>
                    <h3 className="font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{publishedDate}</p>
                </div>
            </Link>
        );
    }

    // Default variant (standard card)
    return (
        <div
            className={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <Link href={`/blog/${id}`} className="group block h-full">
                <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-80 transition-all duration-500 opacity-50 z-10"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                        <button className="px-6 py-2 bg-white text-blue-900 rounded-full font-medium">
                            Read Article
                        </button>
                    </div>

                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-400">{category}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-300 mb-3 line-clamp-2">{description}</p>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-sm text-gray-400">{publishedDate}</p>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;