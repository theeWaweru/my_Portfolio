"use client";

import { useRef, useEffect } from 'react';
import { createNoise3D } from 'simplex-noise';

export default function FluidCanvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const noise = createNoise3D();
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
    const animationRef = useRef(null);

    // Initialize particles
    const initParticles = (width, height) => {
        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                color: `hsla(${Math.random() * 60 + 210}, 100%, 50%, 0.8)`,
                vx: 0,
                vy: 0
            });
        }

        particlesRef.current = particles;
    };

    // Animation loop
    const animate = () => {
        if (!canvasRef.current || !contextRef.current) return;

        const ctx = contextRef.current;
        const canvas = canvasRef.current;
        const { width, height } = canvas;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particlesRef.current.forEach((particle, i) => {
            // Calculate noise value
            const time = Date.now() * 0.0002;
            const noiseX = noise(particle.x * 0.01, particle.y * 0.01, time);
            const noiseY = noise(particle.x * 0.01 + 40, particle.y * 0.01 + 40, time);

            // Calculate vector from mouse
            const dx = mouseRef.current.x - particle.x;
            const dy = mouseRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply forces
            const baseSpeed = 1;
            particle.vx = noiseX * baseSpeed;
            particle.vy = noiseY * baseSpeed;

            // Add mouse influence
            if (distance < mouseRef.current.radius) {
                const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
                particle.vx -= dx * force * 0.02;
                particle.vy -= dy * force * 0.02;
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        animationRef.current = requestAnimationFrame(animate);
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
    };

    // Handle resize
    const handleResize = () => {
        if (!canvasRef.current || !contextRef.current) return;

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initParticles(canvas.width, canvas.height);
    };

    // Initialize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Get context
        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        // Initialize particles
        initParticles(canvas.width, canvas.height);

        // Set up event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-[-1]"
        />
    );
}