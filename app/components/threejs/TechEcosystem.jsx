// app/components/threejs/TechEcosystem.jsx
"use client"

import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import ThreeCanvas from './ThreeCanvas';

const TechEcosystem = ({
    technologies = [],
    onTechClick
}) => {
    const [activeTechnology, setActiveTechnology] = useState(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const sceneRef = useRef(null);
    const techNodesRef = useRef([]);

    // Default technologies if none provided
    const defaultTechnologies = [
        { id: 'react', name: 'React', color: '#61DAFB', description: 'Frontend library for building user interfaces' },
        { id: 'threejs', name: 'Three.js', color: '#049EF4', description: '3D JavaScript library for creating immersive web experiences' },
        { id: 'figma', name: 'Figma', color: '#A259FF', description: 'Collaborative UI design tool for creating interfaces and prototypes' },
        { id: 'webflow', name: 'Webflow', color: '#4353FF', description: 'Visual web design platform for responsive websites without code' },
        { id: 'tailwind', name: 'Tailwind', color: '#38BDF8', description: 'Utility-first CSS framework for rapid UI development' },
        { id: 'nextjs', name: 'Next.js', color: '#000000', description: 'React framework for production-grade applications' },
        { id: 'ai', name: 'AI Integration', color: '#34D399', description: 'Leveraging artificial intelligence in design and development workflows' },
        { id: 'ux', name: 'UX Design', color: '#F59E0B', description: 'Creating intuitive, user-centered digital experiences' }
    ];

    const techs = technologies.length > 0 ? technologies : defaultTechnologies;

    // Handle canvas setup
    const handleCanvasLoad = ({ scene, camera, renderer, controls }) => {
        sceneRef.current = scene;

        // Store original camera position
        const originalCameraPosition = camera.position.clone();

        // Central sphere
        const centralGeometry = new THREE.IcosahedronGeometry(4, 1);
        const centralMaterial = new THREE.MeshStandardMaterial({
            color: 0x2563EB,
            metalness: 0.7,
            roughness: 0.2,
            wireframe: true
        });
        const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial);
        scene.add(centralSphere);

        // Outer particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Technology nodes
        const techNodes = [];
        const techGroup = new THREE.Group();
        scene.add(techGroup);

        // Create a node for each technology
        techs.forEach((tech, index) => {
            // Position nodes in a circular pattern around the central sphere
            const angle = (index / techs.length) * Math.PI * 2;
            const radius = 8;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.5; // Flatten the circle a bit vertically
            const z = Math.sin(angle) * radius;

            // Create a sphere for each technology
            const geometry = new THREE.SphereGeometry(0.7, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(tech.color),
                metalness: 0.7,
                roughness: 0.3,
                emissive: new THREE.Color(tech.color),
                emissiveIntensity: 0.2
            });

            const node = new THREE.Mesh(geometry, material);
            node.position.set(x, y, z);
            node.userData = { id: tech.id, name: tech.name };

            // Add connections to central sphere
            const connectionGeometry = new THREE.CylinderGeometry(0.03, 0.03, radius, 6);
            connectionGeometry.rotateX(Math.PI / 2);

            const connectionMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(tech.color),
                transparent: true,
                opacity: 0.3
            });

            const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
            connection.position.set(x / 2, y / 2, z / 2);
            connection.lookAt(0, 0, 0);

            techGroup.add(node);
            techGroup.add(connection);
            techNodes.push(node);
        });

        techNodesRef.current = techNodes;

        // Animate rotation
        const animate = () => {
            // Rotate central sphere
            centralSphere.rotation.x += 0.001;
            centralSphere.rotation.y += 0.001;

            // Rotate particle system
            particlesMesh.rotation.y += 0.0002;

            // Only rotate tech group when not interacting
            if (!isInteracting) {
                techGroup.rotation.y += 0.002;
            }
        };

        // Add animation to render loop
        renderer.setAnimationLoop(() => {
            animate();
            controls.update();
            renderer.render(scene, camera);
        });

        // Handle controls start/end
        controls.addEventListener('start', () => setIsInteracting(true));
        controls.addEventListener('end', () => setIsInteracting(false));

        // Raycaster for node interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Handle mouse move for hover effects
        const handleMouseMove = (event) => {
            // Calculate mouse position
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Update raycaster
            raycaster.setFromCamera(mouse, camera);

            // Check for intersections
            const intersects = raycaster.intersectObjects(techNodes);

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
                const selectedNode = intersects[0].object;

                // Scale up the hovered node
                selectedNode.scale.set(1.3, 1.3, 1.3);

                // Set active technology
                const tech = techs.find(t => t.id === selectedNode.userData.id);
                setActiveTechnology(tech);

                // Reset scale of other nodes
                techNodes.forEach(node => {
                    if (node !== selectedNode) {
                        node.scale.set(1, 1, 1);
                    }
                });
            } else {
                document.body.style.cursor = 'default';

                // Reset all nodes
                techNodes.forEach(node => {
                    node.scale.set(1, 1, 1);
                });
            }
        };

        // Handle node click
        const handleClick = (event) => {
            // Update raycaster
            raycaster.setFromCamera(mouse, camera);

            // Check for intersections
            const intersects = raycaster.intersectObjects(techNodes);

            if (intersects.length > 0) {
                const selectedNode = intersects[0].object;
                const tech = techs.find(t => t.id === selectedNode.userData.id);

                if (typeof onTechClick === 'function') {
                    onTechClick(tech);
                }

                // Focus camera on node
                const nodePosition = selectedNode.position.clone();
                const targetPosition = new THREE.Vector3(
                    nodePosition.x * 0.7,
                    nodePosition.y * 0.7,
                    nodePosition.z * 0.7
                );

                // Animate camera
                animateCamera(camera, targetPosition, 1000);
            }
        };

        // Animate camera function
        const animateCamera = (camera, targetPosition, duration) => {
            const startPosition = camera.position.clone();
            const startTime = Date.now();

            function performAnimation() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                // Interpolate positions
                camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
                camera.lookAt(0, 0, 0);

                if (progress < 1) {
                    requestAnimationFrame(performAnimation);
                }
            }

            performAnimation();
        };

        // Reset camera position
        const handleResetCamera = () => {
            animateCamera(camera, originalCameraPosition, 1000);
        };

        // Add event listeners
        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleClick);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') handleResetCamera();
        });

        // Clean up on unmount
        return () => {
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleResetCamera);
            controls.removeEventListener('start', () => setIsInteracting(true));
            controls.removeEventListener('end', () => setIsInteracting(false));
        };
    };

    return (
        <div className="relative w-full h-full">
            <ThreeCanvas
                onLoad={handleCanvasLoad}
                className="w-full h-full"
                controlsEnabled={true}
                controlsDamping={true}
                autoRotate={false}
                backgroundColor="#000000"
                alpha={true}
            />

            {/* Info panel for active technology */}
            {activeTechnology && (
                <div className="absolute bottom-8 right-8 bg-black bg-opacity-80 backdrop-blur-sm p-6 rounded-xl max-w-xs border border-gray-800 pointer-events-auto">
                    <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: activeTechnology.color }}
                    >
                        {activeTechnology.name}
                    </h3>
                    <p className="text-gray-300">
                        {activeTechnology.description}
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={() => onTechClick?.(activeTechnology)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm transition-colors"
                        >
                            View Projects
                        </button>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="absolute bottom-8 left-8 bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
                <p className="text-sm text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="auto" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Drag to rotate | Scroll to zoom
                </p>
            </div>
        </div>
    );
};

export default TechEcosystem;