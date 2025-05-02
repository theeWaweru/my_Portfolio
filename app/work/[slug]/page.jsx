// app/work/[slug]/page.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../components/ui/Button';

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    // In a real implementation, you would fetch this data from Supabase
    const project = getProjectData(params.slug);

    return {
        title: `${project.title} | Case Study - David Waweru`,
        description: project.description,
        openGraph: {
            title: `${project.title} | Case Study - David Waweru`,
            description: project.description,
            images: [{ url: project.coverImage }]
        }
    };
}

// Mock function to get project data - would use Supabase in production
function getProjectData(slug) {
    // This is mock data - in a real implementation, you would fetch from Supabase
    const projects = {
        'furaha-financial': {
            id: 'furaha-financial',
            title: 'Furaha Financial',
            subtitle: 'Redesigning the digital banking experience for East Africa',
            description: 'A comprehensive redesign of a digital banking platform focused on improving user experience, accessibility, and customer satisfaction.',
            client: 'Furaha Financial Services',
            duration: '3 months',
            year: '2024',
            role: 'Lead UI/UX Designer & Front-end Developer',
            category: 'UI/UX Design',
            tags: ['Fintech', 'Web App', 'Mobile App', 'User Research'],
            coverImage: '/images/projects/furaha-financial-cover.jpg',
            gallery: [
                '/images/projects/furaha-financial-1.jpg',
                '/images/projects/furaha-financial-2.jpg',
                '/images/projects/furaha-financial-3.jpg',
                '/images/projects/furaha-financial-4.jpg',
            ],
            challenge: {
                title: 'The Challenge',
                description: "Furaha Financial was facing high customer drop-off rates and poor satisfaction scores with their existing digital banking platform. The original interface was cluttered, unintuitive, and failed to meet accessibility standards. Additionally, the platform needed to serve a diverse user base across multiple countries in East Africa, with varying levels of digital literacy and connectivity constraints.",
                points: [
                    'Legacy system with complex navigation and excessive features',
                    'High drop-off rates during key transaction flows',
                    'Poor performance on lower-end devices common in target markets',
                    'Inconsistent design language across web and mobile platforms',
                    'Limited accessibility features for users with disabilities'
                ]
            },
            approach: {
                title: 'My Approach',
                description: "I followed a user-centered design process that began with extensive research to understand the diverse needs of Furaha's customer base. Working closely with stakeholders, I developed a strategy that balanced business requirements with user needs.",
                process: [
                    {
                        phase: 'Discovery & Research',
                        description: 'Conducted user interviews, analyzed platform analytics, and reviewed customer feedback to identify pain points and opportunities.',
                        deliverables: 'User personas, journey maps, competitive analysis'
                    },
                    {
                        phase: 'Information Architecture',
                        description: 'Restructured the application flow to create intuitive navigation and streamlined user journeys for key banking tasks.',
                        deliverables: 'Site map, user flows, task analyses'
                    },
                    {
                        phase: 'Wireframing & Prototyping',
                        description: 'Created low and high-fidelity wireframes to test and iterate on solutions before moving to visual design.',
                        deliverables: 'Wireframes, interactive prototypes, usability testing reports'
                    },
                    {
                        phase: 'Visual Design',
                        description: 'Developed a clean, accessible visual system with a design language that worked across platforms while reflecting the brand identity.',
                        deliverables: 'UI style guide, component library, responsive layouts'
                    },
                    {
                        phase: 'Development & Implementation',
                        description: 'Collaborated with the engineering team to implement the front-end using React, ensuring design fidelity and performance.',
                        deliverables: 'React components, responsive templates, technical documentation'
                    }
                ]
            },
            solution: {
                title: 'The Solution',
                description: "The redesigned platform features a clean, intuitive interface that prioritizes essential banking functions while reducing cognitive load. Key improvements include:",
                features: [
                    {
                        title: 'Simplified Dashboard',
                        description: 'Reorganized dashboard that highlights account balances, recent transactions, and frequently used actions.',
                        image: '/images/projects/furaha-solution-1.jpg'
                    },
                    {
                        title: 'Streamlined Transaction Flow',
                        description: 'Reduced steps for common transactions like transfers and bill payments from 7 steps to 3.',
                        image: '/images/projects/furaha-solution-2.jpg'
                    },
                    {
                        title: 'Offline Mode',
                        description: 'Added functionality to view balances and prepare transactions while offline, addressing connectivity issues.',
                        image: '/images/projects/furaha-solution-3.jpg'
                    },
                    {
                        title: 'Accessibility Enhancements',
                        description: 'Implemented WCAG 2.1 guidelines including screen reader support, keyboard navigation, and high contrast modes.',
                        image: '/images/projects/furaha-solution-4.jpg'
                    }
                ]
            },
            results: {
                title: 'The Results',
                description: "The redesigned platform launched successfully and achieved significant improvements in key metrics:",
                stats: [
                    { label: 'Increase in user engagement', value: '46%' },
                    { label: 'Reduction in customer support calls', value: '32%' },
                    { label: 'Improvement in task completion rate', value: '58%' },
                    { label: 'Higher customer satisfaction score', value: '4.7/5' }
                ],
                testimonial: {
                    quote: "David's redesign transformed our digital banking experience. Our customers now find it easier to complete transactions, and we've seen significant improvements in engagement metrics across all demographics.",
                    author: "Sarah Mbogo",
                    title: "Digital Product Manager, Furaha Financial"
                }
            },
            learnings: {
                title: 'Key Learnings',
                points: [
                    'The importance of early and continuous user testing across diverse user groups',
                    'How simplifying core flows significantly impacts completion rates and user satisfaction',
                    'Techniques for designing interfaces that work well in low-connectivity environments',
                    'The value of a systematic approach to component development for consistency'
                ]
            },
            nextProject: {
                id: 'chupachap',
                title: 'Chupachap',
                category: 'Web Development',
                image: '/images/projects/chupachap-thumbnail.jpg'
            }
        },
        // Additional project data would be added here
    };

    return projects[slug] || null;
}

export default function ProjectDetailPage({ params }) {
    const project = getProjectData(params.slug);

    if (!project) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
                    <Link
                        href="/work"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        );
    }

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
        <main className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                {/* Cover image */}
                <div className="h-[70vh] relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    {coverImage && (
                        <div className="relative h-full w-full">
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="absolute inset-0 flex items-end">
                        <div className="container max-w-6xl mx-auto px-6 pb-16">
                            <div className="max-w-2xl">
                                <Link href="/work" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Projects
                                </Link>

                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-blue-600 text-sm font-medium rounded-full">
                                        {category}
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                    {title}
                                </h1>

                                <p className="text-xl md:text-2xl text-gray-300 mb-8">
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
                        <div className="bg-gray-900 rounded-xl p-6 mb-8">
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

                        <div className="hidden lg:block">
                            <h3 className="text-xl font-bold mb-4">Contents</h3>
                            <nav className="space-y-2">
                                {['Overview', 'Challenge', 'Approach', 'Solution', 'Results'].map((section) => (
                                    <a
                                        key={section}
                                        href={`#${section.toLowerCase()}`}
                                        className="block px-3 py-2 text-left w-full rounded-lg transition-all text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                        {section}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Overview */}
                        <section id="overview" className="mb-16">
                            <div className="prose prose-lg prose-invert max-w-none">
                                <p className="text-xl text-gray-300 mb-8">
                                    {description}
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {gallery && gallery.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 my-12">
                                    {gallery.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                                        >
                                            <div className="relative h-full w-full">
                                                <Image
                                                    src={image}
                                                    alt={`${title} - Gallery image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Challenge */}
                        {challenge && (
                            <section id="challenge" className="mb-16">
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

                        {/* Approach */}
                        {approach && (
                            <section id="approach" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6">{approach.title}</h2>
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="mb-8">
                                        {approach.description}
                                    </p>

                                    {approach.process && approach.process.length > 0 && (
                                        <div className="space-y-12 my-12">
                                            {approach.process.map((phase, index) => (
                                                <div key={index} className="flex flex-col md:flex-row gap-8">
                                                    <div className="w-full md:w-1/3">
                                                        <div className="bg-blue-600 h-1 w-12 mb-4"></div>
                                                        <h3 className="text-xl font-bold mb-2">Phase {index + 1}</h3>
                                                        <p className="text-xl font-medium text-blue-400">{phase.phase}</p>
                                                    </div>
                                                    <div className="w-full md:w-2/3">
                                                        <p className="mb-4">{phase.description}</p>
                                                        <p className="text-gray-400"><strong>Deliverables:</strong> {phase.deliverables}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Solution */}
                        {solution && (
                            <section id="solution" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6">{solution.title}</h2>
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="mb-12">
                                        {solution.description}
                                    </p>
                                </div>

                                {solution.features && solution.features.length > 0 && (
                                    <div className="grid md:grid-cols-2 gap-8 my-12">
                                        {solution.features.map((feature, index) => (
                                            <div key={index} className="bg-gray-900 rounded-xl overflow-hidden">
                                                <div className="aspect-video relative">
                                                    {feature.image && (
                                                        <Image
                                                            src={feature.image}
                                                            alt={feature.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                                    <p className="text-gray-300">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Results */}
                        {results && (
                            <section id="results" className="mb-16">
                                <h2 className="text-3xl font-bold mb-6">{results.title}</h2>
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="mb-8">
                                        {results.description}
                                    </p>
                                </div>

                                {results.stats && results.stats.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
                                        {results.stats.map((stat, index) => (
                                            <div key={index} className="bg-gray-900 rounded-xl p-6 text-center">
                                                <p className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</p>
                                                <p className="text-sm text-gray-300">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.testimonial && (
                                    <div className="bg-gray-900 rounded-xl p-8 my-12">
                                        <div className="flex gap-6 items-start">
                                            <div className="text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <blockquote className="text-xl font-medium mb-4">
                                                    "{results.testimonial.quote}"
                                                </blockquote>
                                                <p className="font-bold">{results.testimonial.author}</p>
                                                <p className="text-gray-400">{results.testimonial.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {learnings && learnings.points && learnings.points.length > 0 && (
                                    <div className="bg-gray-900 rounded-xl p-6 my-12">
                                        <h3 className="text-xl font-bold mb-4">{learnings.title}</h3>
                                        <ul className="space-y-3">
                                            {learnings.points.map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-400 mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                    </span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Next Project */}
            {
                nextProject && (
                    <div className="bg-gray-900">
                        <div className="container max-w-6xl mx-auto px-6 py-20">
                            <div className="text-center mb-12">
                                <p className="text-blue-400 font-medium mb-2">Next Project</p>
                                <h2 className="text-3xl font-bold">{nextProject.title}</h2>
                                <p className="text-gray-400 mt-2">{nextProject.category}</p>
                            </div>

                            <Link
                                href={`/work/${nextProject.id}`}
                                className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden block group"
                            >
                                {nextProject.image && (
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={nextProject.image}
                                            alt={nextProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-75 transition-all duration-500"></div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                                        View Project
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Interested in Working Together?</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Let's discuss how I can help bring your next project to life with thoughtful design and clean code.
                    </p>
                    <Button
                        href="/contact"
                        variant="primary"
                        size="lg"
                        className="bg-white text-blue-900 hover:bg-gray-100"
                    >
                        Get In Touch
                    </Button>
                </div>
            </div>
        </main >
    );
}