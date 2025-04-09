"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;

        const positionArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            // Positions (x, y, z)
            positionArray[i] = (Math.random() - 0.5) * 20;

            // Colors (r, g, b)
            if (i % 3 === 0) {
                colorArray[i] = 0.3 + Math.random() * 0.2; // Red
                colorArray[i + 1] = 0.3 + Math.random() * 0.1; // Green
                colorArray[i + 2] = 0.5 + Math.random() * 0.5; // Blue
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        // Particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        // Particle system
        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);

        // Camera position
        camera.position.z = 5;

        // Mouse interaction
        const mouse = { x: 0, y: 0 };

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Handle resize
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate particle system
            particleSystem.rotation.x += 0.0005;
            particleSystem.rotation.y += 0.0005;

            // Follow mouse with subtle movement
            particleSystem.rotation.x += (mouse.y * 0.01 - particleSystem.rotation.x) * 0.05;
            particleSystem.rotation.y += (mouse.x * 0.01 - particleSystem.rotation.y) * 0.05;

            // Update particles
            const positions = particleSystem.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Add subtle movement
                positions[i3 + 1] += (Math.random() - 0.5) * 0.01;

                // Reset particles that go too far
                if (Math.abs(positions[i3 + 1]) > 10) {
                    positions[i3 + 1] = (Math.random() - 0.5) * 10;
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            particleSystem,
            dispose: () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('resize', onResize);

                particleSystem.geometry.dispose();
                particlesMaterial.dispose();
                renderer.dispose();
            }
        };

        return () => {
            if (sceneRef.current) {
                sceneRef.current.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full z-[-1]"
            style={{ overflow: 'hidden' }}
        />
    );
}