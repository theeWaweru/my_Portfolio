// app/components/home/ThreeScene.jsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 15;

        // Controls (disabled for hero section)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        controls.enableDamping = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x4353FF, 1.5, 50);
        pointLight1.position.set(10, 5, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x34D399, 1.5, 50);
        pointLight2.position.set(-10, -5, -10);
        scene.add(pointLight2);

        // Main Geometry - Torus Knot
        const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 0.8, 128, 32, 2, 3);
        const torusKnotMaterial = new THREE.MeshStandardMaterial({
            color: 0x2563EB,
            metalness: 0.7,
            roughness: 0.3,
            wireframe: true
        });
        const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
        scene.add(torusKnot);

        // Background particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 40;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate torus knot
            torusKnot.rotation.x += 0.002;
            torusKnot.rotation.y += 0.003;

            // Rotate particles slowly
            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.0001;

            // Update controls
            controls.update();

            // Render scene
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            // Update camera
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);

            // Dispose resources
            torusKnotGeometry.dispose();
            torusKnotMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            scene.remove(torusKnot);
            scene.remove(particles);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;