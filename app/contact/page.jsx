// app/contact/page.jsx

import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import Image from 'next/image';

// Generate metadata for page
export const metadata = {
    title: 'Contact | David Waweru - AI Creative Developer',
    description: 'Get in touch with David Waweru, AI Creative Developer based in Nairobi. Let\'s discuss your project ideas, collaborations, or just say hello.',
};

export default function ContactPage() {
    // In a real implementation, this function would be used to handle form submissions
    // and send data to Supabase
    async function handleContactSubmission(formData) {
        'use server';

        // This would normally interface with Supabase
        // const { error } = await supabase
        //   .from('contacts')
        //   .insert([
        //     {
        //       name: formData.name,
        //       email: formData.email,
        //       inquiry_type: formData.inquiryType,
        //       message: formData.message,
        //       referral: formData.referral,
        //       created_at: new Date()
        //     }
        //   ]);

        // return { success: !error, error };

        // For demonstration purposes
        return { success: true };
    }

    return (
        <main className="bg-black text-white min-h-screen pb-20">
            {/* Header with 3D background */}
            <div className="relative h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In <span className="text-blue-400">Touch</span></h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Let's discuss your project or just say hello.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div>
                        <ContactForm onSubmit={handleContactSubmission} />
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Let's Create Something Remarkable</h2>
                        <p className="text-gray-300 mb-8">
                            I'm always interested in discussing new projects, creative challenges, or opportunities to collaborate. Whether you have a specific project in mind or just want to connect, I'd love to hear from you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-900 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium mb-1">Email</h3>
                                    <a href="mailto:hello@theewaweru.dev" className="text-blue-400 hover:text-blue-300 transition-colors">
                                        hello@theewaweru.dev
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-900 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium mb-1">Location</h3>
                                    <p className="text-gray-300">
                                        Nairobi, Kenya
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-900 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium mb-1">Response Time</h3>
                                    <p className="text-gray-300">
                                        Usually within 48 hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-bold mb-4">Connect with Me</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/theeWaweru"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>

                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>

                                <a
                                    href="https://dribbble.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    <span className="sr-only">Dribbble</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-gray-900 rounded-xl">
                            <h3 className="text-xl font-bold mb-4">FAQ</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-blue-400 mb-2">What types of projects do you take on?</h4>
                                    <p className="text-gray-300">I specialize in UI/UX design, web development, and AI-driven creative solutions. I'm particularly interested in projects that blend these disciplines.</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-blue-400 mb-2">What is your availability like?</h4>
                                    <p className="text-gray-300">I typically book projects 2-4 weeks in advance, but always appreciate hearing about new opportunities regardless of timeline.</p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-blue-400 mb-2">Do you work remotely?</h4>
                                    <p className="text-gray-300">Yes, I work remotely with clients worldwide, though I'm based in Nairobi, Kenya.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="h-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-30"></div>

                {/* This would be a map component or image in production */}
                <div className="absolute inset-0 bg-gray-800"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-70 backdrop-blur-sm px-8 py-6 rounded-xl text-center">
                        <h3 className="text-2xl font-bold mb-2">Nairobi, Kenya</h3>
                        <p className="text-gray-300">East Africa's Tech Hub</p>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Get notified when I publish new articles and insights about design, development, and AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="flex-grow px-4 py-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-full focus:ring-2 focus:ring-white focus:border-white transition-colors"
                        />
                        <button className="px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-full font-medium transition-all duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}