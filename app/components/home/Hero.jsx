// app/components/home/Hero.jsx
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeScene from './ThreeScene';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation on page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <ThreeScene />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10"></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center px-6 text-center">
                <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-10'}`}>
                    David <span className="text-blue-500">Waweru</span>
                </h1>

                <h2 className={`text-2xl md:text-3xl mb-8 transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-10'}`}>
                    AI Creative Developer
                </h2>

                <p className={`max-w-2xl text-lg text-gray-300 mb-10 transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    Crafting digital experiences at the intersection of design, code, and artificial intelligence.
                </p>

                <div className={`flex gap-4 transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-10'}`}>
                    <Link
                        href="/work"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300"
                    >
                        View My Work
                    </Link>

                    <Link
                        href="/contact"
                        className="px-8 py-3 border border-white hover:border-blue-500 hover:text-blue-400 rounded-full font-medium transition-all duration-300"
                    >
                        Get In Touch
                    </Link>
                </div>

                <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ease-out ${isLoaded ? 'opacity-70' : 'opacity-0'}`}>
                    <div className="animate-bounce">
                        <svg width="24px" height="auto" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;