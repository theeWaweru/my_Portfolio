// app/about/page.jsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';

// Generate metadata for page
export const metadata = {
    title: 'About Me | David Waweru - AI Creative Developer',
    description: 'Learn about David Waweru, an AI Creative Developer based in Nairobi, Kenya with experience in UI/UX design and web development.',
};

export default function AboutPage() {
    // Career timeline data
    const timeline = [
        {
            year: '2019',
            title: 'Started as Web Developer',
            description: 'Began my career at MB96, developing practical skills across diverse client projects.',
            company: 'MB96',
            projects: ['WildRose', 'Furaha Financial']
        },
        {
            year: '2020',
            title: 'Expanded to UI/UX Design',
            description: 'Recognized the importance of design in development, began focusing on UI/UX principles.',
            company: 'MB96',
            projects: ['Vault22', 'Chupachap']
        },
        {
            year: '2021',
            title: 'Freelance Projects',
            description: 'Started taking on independent projects to diversify my experience and client base.',
            projects: ['B-WEL', 'Chui Ventures Capital']
        },
        {
            year: '2022-2023',
            title: 'Building Product Expertise',
            description: 'Focused on understanding product management principles and strategy.',
            projects: ['Prometheus X Talent']
        },
        {
            year: '2024-Present',
            title: 'AI Integration & 3D Exploration',
            description: 'Exploring the integration of AI into design workflows and learning Three.js for immersive experiences.',
            projects: ['Spatial Thinking']
        }
    ];

    // Skills data
    const skills = {
        design: ['UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Interaction Design'],
        development: ['HTML/CSS/JS', 'React', 'Next.js', 'Three.js', 'WebGL', 'Responsive Design'],
        tools: ['Figma', 'Webflow', 'WordPress', 'Adobe Creative Suite', 'VS Code', 'Git'],
        softSkills: ['Problem Solving', 'Communication', 'Project Management', 'Client Relations', 'Team Collaboration', 'Adaptability']
    };

    return (
        <main className="bg-black text-white pb-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                {/* Replace with your actual image */}
                <div className="absolute inset-0 bg-gray-800"></div>

                <div className="absolute inset-0 flex items-center">
                    <div className="container max-w-6xl mx-auto px-6">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">About <span className="text-blue-400">Me</span></h1>
                        <p className="text-xl max-w-2xl">
                            The journey of a self-taught designer and developer in Nairobi's tech ecosystem.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">My Story</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    I'm David Waweru, a self-taught UI/UX designer and web developer based in Nairobi, Kenya. My journey in tech began with a curiosity about how digital products are built and a desire to create experiences that make technology more accessible and enjoyable.
                                </p>
                                <p>
                                    Over the past five years, I've evolved from building basic websites to crafting comprehensive digital experiences that merge thoughtful design with technical execution. I believe great digital products emerge at the intersection of three elements: human-centered design thinking, clean efficient code, and strategic business alignment.
                                </p>
                                <p>
                                    Being based in Nairobi has given me a unique perspective on creating technology for diverse audiences with varying levels of technical literacy and access. This environment has taught me to build solutions that are not just beautiful but also practical and efficient.
                                </p>
                                <p>
                                    Today, I'm focused on expanding my capabilities in AI-driven design and development, exploring how emerging technologies can enhance human experiences rather than replace them. I'm particularly excited about the possibilities of 3D interactions on the web through technologies like Three.js.
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-4">My Philosophy</h3>
                                <div className="space-y-4 text-gray-300">
                                    <p>
                                        I approach each project with three core principles:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2">•</span>
                                            <span><strong>Purpose-driven design:</strong> Every element should serve a clear purpose for the user.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2">•</span>
                                            <span><strong>Technical excellence:</strong> Clean, efficient code creates sustainable and scalable products.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2">•</span>
                                            <span><strong>Continuous learning:</strong> The tech landscape evolves constantly, requiring adaptability and curiosity.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gray-900 rounded-xl overflow-hidden">
                                <div className="aspect-square relative">
                                    {/* Replace with your actual profile image */}
                                    <div className="absolute inset-0 bg-gray-800"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">David Waweru</h3>
                                    <p className="text-blue-400 mb-4">AI Creative Developer</p>

                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <span className="text-gray-400 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                            <span>Nairobi, Kenya</span>
                                        </div>

                                        <div className="flex items-start">
                                            <span className="text-gray-400 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <span>5+ years of experience</span>
                                        </div>

                                        <div className="flex items-start">
                                            <span className="text-gray-400 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <span>hello@theewaweru.dev</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 mt-6">
                                        <a href="https://github.com/theeWaweru" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">GitHub</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>

                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>

                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <span className="sr-only">Twitter</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            href="/contact"
                                            variant="primary"
                                            fullWidth
                                            className="rounded-lg"
                                        >
                                            Get In Touch
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Timeline */}
            <section className="py-20 px-6 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Career <span className="text-blue-400">Timeline</span></h2>

                    <div className="relative">
                        {/* Timeline center line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-700"></div>

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Timeline dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>

                                    {/* Year marker for mobile (always on top) */}
                                    <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 -top-10 bg-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                                        {item.year}
                                    </div>

                                    {/* Content */}
                                    <div className="w-full md:w-5/12 px-6 py-4">
                                        {/* Year marker for desktop */}
                                        <div className="hidden md:block mb-2 text-blue-400 font-bold">
                                            {item.year}
                                        </div>

                                        <div className="bg-gray-800 rounded-xl p-6">
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            {item.company && (
                                                <p className="text-blue-400 text-sm mb-3">{item.company}</p>
                                            )}
                                            <p className="text-gray-300 mb-4">{item.description}</p>

                                            {item.projects && item.projects.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium mb-2">Key Projects:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.projects.map((project, i) => (
                                                            <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                                                {project}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Skills & <span className="text-blue-400">Expertise</span></h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(skills).map(([category, skillList]) => (
                            <div key={category} className="bg-gray-900 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                <ul className="space-y-2">
                                    {skillList.map((skill, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-blue-400 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 mt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Interested in Working Together?</h2>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Whether you need a complete digital product, a UI/UX redesign, or a creative developer to join your team, I'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            href="/work"
                            variant="outline"
                            className="rounded-full border-white text-white hover:bg-white hover:text-blue-900"
                        >
                            View My Work
                        </Button>
                        <Button
                            href="/contact"
                            variant="primary"
                            className="rounded-full bg-white text-blue-900 hover:bg-gray-100"
                        >
                            Get In Touch
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}