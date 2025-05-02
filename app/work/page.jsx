// app/work/page.jsx

import React from 'react';
import Link from 'next/link';
import ProjectCard from '../components/work/ProjectCard';
import ProjectFilter from '../components/work/ProjectFilter';

// Generate metadata for page
export const metadata = {
    title: 'Portfolio & Case Studies | David Waweru',
    description: 'Explore projects and case studies showcasing UI/UX design and web development work by David Waweru.',
};

// This would normally be fetched from Supabase
const projectsData = [
    {
        id: 'furaha-financial',
        title: 'Furaha Financial',
        description: 'Complete redesign of a digital banking platform focused on improving user experience and accessibility.',
        category: 'UI/UX Design',
        tags: ['Fintech', 'Web App', 'Mobile App'],
        featured: true,
        image: '/images/projects/furaha-financial.jpg'
    },
    {
        id: 'chupachap',
        title: 'Chupachap',
        description: 'E-commerce platform designed and developed for a local marketplace with integrated payment processing.',
        category: 'Web Development',
        tags: ['E-commerce', 'Web App', 'Payments'],
        featured: true,
        image: '/images/projects/chupachap.jpg'
    },
    {
        id: 'wildrose',
        title: 'WildRose',
        description: 'Brand identity and website redesign for a boutique hotel chain focusing on eco-tourism.',
        category: 'UI/UX Design',
        tags: ['Hospitality', 'Branding', 'Web Design'],
        featured: false,
        image: '/images/projects/wildrose.jpg'
    },
    {
        id: 'vault22',
        title: 'Vault22',
        description: 'Secure document storage platform with blockchain verification and intuitive file management.',
        category: 'Web Development',
        tags: ['SaaS', 'Security', 'Web App'],
        featured: false,
        image: '/images/projects/vault22.jpg'
    },
    {
        id: 'b-wel',
        title: 'B-WEL',
        description: 'Mental health application featuring AI-driven mood tracking and personalized wellness recommendations.',
        category: 'Product Strategy',
        tags: ['Healthcare', 'Mobile App', 'AI Integration'],
        featured: false,
        image: '/images/projects/b-wel.jpg'
    },
    {
        id: 'chui-ventures',
        title: 'Chui Ventures Capital',
        description: 'Investment portfolio platform with data visualization and reporting tools for startup investors.',
        category: 'Web Development',
        tags: ['Finance', 'Dashboard', 'Data Viz'],
        featured: false,
        image: '/images/projects/chui-ventures.jpg'
    },
    {
        id: 'prometheus-x',
        title: 'Prometheus X Talent',
        description: 'Talent acquisition platform connecting tech professionals with startups across East Africa.',
        category: 'UI/UX Design',
        tags: ['HR Tech', 'Web App', 'Marketplace'],
        featured: false,
        image: '/images/projects/prometheus-x.jpg'
    },
    {
        id: 'spatial-thinking',
        title: 'Spatial Thinking',
        description: 'Experimental 3D visualization of geographical data using Three.js for educational purposes.',
        category: '3D Visualization',
        tags: ['Education', 'Three.js', 'Data Viz'],
        featured: true,
        image: '/images/projects/spatial-thinking.jpg'
    }
];

const categories = [
    'All Projects',
    'UI/UX Design',
    'Web Development',
    'Product Strategy',
    '3D Visualization',
    'AI Integration'
];

export default function WorkPage() {
    // In a real implementation with React Server Components and Supabase,
    // you would fetch data using something like:
    // 
    // async function getProjects() {
    //   const { data } = await supabase
    //     .from('projects')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   return data || [];
    // }
    // 
    // const projects = await getProjects();

    return (
        <main className="bg-black text-white min-h-screen pb-20">
            {/* Header with simple background */}
            <div className="relative h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">My <span className="text-blue-400">Work</span></h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        A showcase of selected projects spanning design, development, and digital experiences.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6">
                {/* Category Filter */}
                <div className="mt-12 mb-8">
                    <ProjectFilter
                        categories={categories}
                        selectedCategory="All Projects"
                        setSelectedCategory={() => { }}  // This would be stateful in a client component
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isLoaded={true}
                        />
                    ))}
                </div>

                {/* Portfolio Process */}
                <section className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">My Design & Development <span className="text-blue-400">Process</span></h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            A consistent methodology helps ensure successful outcomes for every project.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ),
                                title: 'Discovery',
                                description: 'Understanding the problem space, user needs, and business goals through research and analysis.',
                                number: '01'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                ),
                                title: 'Design',
                                description: 'Creating user-centered solutions through wireframing, prototyping, and visual design.',
                                number: '02'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                ),
                                title: 'Development',
                                description: 'Bringing designs to life with clean, efficient code and modern development practices.',
                                number: '03'
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: 'Delivery',
                                description: 'Testing, refinement, and handover with documentation and support to ensure success.',
                                number: '04'
                            }
                        ].map((step, index) => (
                            <div key={index} className="bg-gray-900 rounded-xl p-6 relative">
                                <div className="absolute top-4 right-4 text-4xl font-bold text-gray-800 opacity-30">
                                    {step.number}
                                </div>
                                <div className="text-blue-400 mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-10 text-center mt-24">
                    <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
                    <p className="text-lg text-gray-200 max-w-xl mx-auto mb-8">
                        Whether you're looking for a complete digital product or need help with a specific design or development challenge, I'd love to discuss how we can work together.
                    </p>
                    <Link
                        href="/contact"
                        className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-full font-medium transition-all duration-300"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </div>
        </main>
    );
}