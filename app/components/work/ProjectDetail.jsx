// app/components/work/ProjectDetail.jsx

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetail = ({ project }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const sectionRefs = {
        overview: useRef(null),
        challenge: useRef(null),
        approach: useRef(null),
        solution: useRef(null),
        results: useRef(null)
    };

    // Animation on page load
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Scroll to section
    const scrollToSection = (section) => {
        setActiveSection(section);
        sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            Object.keys(sectionRefs).forEach((section) => {
                const element = sectionRefs[section].current;
                if (!element) return;

                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(section);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!project) return null;

    const {
        title,
        subtitle,
        description,
        client,
        duration,
        year,
        role,
        category,
        tags,
        coverImage,
        gallery,
        challenge,
        approach,
        solution,
        results,
        learnings,
        nextProject
    } = project;

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                {/* Cover image */}
                <div className="h-[70vh] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    {coverImage && (
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    )}

                    <div className="absolute inset-0 flex items-end">
                        <div className="container max-w-6xl mx-auto px-6 pb-16">
                            <div className="max-w-2xl">
                                <div className={`mb-4 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full mb-4">
                                        {category}
                                    </span>
                                </div>
                                <h1 className={`text-5xl md:text-6xl font-bold mb-4 transform transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    {title}
                                </h1>
                                <p className={`text-xl md:text-2xl text-gray-300 mb-8 transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 lg:sticky top-6 self-start">
                        <div className={`bg-gray-900 rounded-xl p-6 mb-8 transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2">Project Details</h3>

                            <div className="space-y-4">
                                {client && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Client</p>
                                        <p className="font-medium">{client}</p>
                                    </div>
                                )}

                                {(duration || year) && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Timeline</p>
                                        <p className="font-medium">{duration} {year && `(${year})`}</p>
                                    </div>
                                )}

                                {role && (
                                    <div>
                                        <p className="text-gray-400 text-sm">My Role</p>
                                        <p className="font-medium">{role}</p>
                                    </div>
                                )}

                                {tags && tags.length > 0 && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Tags</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {tags.map((tag) => (
                                                <span key={tag} className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`hidden lg:block transform transition-all duration-700 delay-400 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                            <h3 className="text-xl font-bold mb-4">Contents</h3>
                            <nav className="space-y-2">
                                {['overview', 'challenge', 'approach', 'solution', 'results'].map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => scrollToSection(section)}
                                        className={`block px-3 py-2 text-left w-full rounded-lg transition-all ${activeSection === section
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Overview */}
                        <section
                            ref={sectionRefs.overview}
                            className={`mb-16 transform transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                        >
                            <div className="prose prose-lg prose-invert max-w-none">
                                <p className="text-xl text-gray-300 mb-8">
                                    {description}
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {gallery && gallery.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 my-12">
                                    {gallery.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${title} - Gallery image ${index + 1}`}
                                                width={index === 0 ? 1200 : 600}
                                                height={index === 0 ? 675 : 600}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Challenge */}
                        {challenge && (
                            <section
                                ref={sectionRefs.challenge}
                                className="mb-16"
                            >
                                <h2 className="text-3xl font-bold mb-6">{challenge.title}</h2>
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="mb-8">
                                        {challenge.description}
                                    </p>

                                    {challenge.points && challenge.points.length > 0 && (
                                        <div className="bg-gray-900 rounded-xl p-6 my-8">
                                            <h3 className="text-xl font-bold mb-4">Key Challenges</h3>
                                            <ul className="space-y-2">
                                                {challenge.points.map((point, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="inline-flex items-center justify-center bg-blue-600 rounded-full w-6 h-6 text-sm font-medium mr-3 mt-0.5">
                                                            {index + 1}
                                                        </span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Additional sections would follow the same pattern */}
                        {/* ... */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;