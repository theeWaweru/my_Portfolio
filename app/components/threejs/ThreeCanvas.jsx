// app/components/threejs/ThreeCanvas.jsx

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeCanvas = ({
    onLoad,
    controlsEnabled = true,
    controlsDamping = true,
    autoRotate = false,
    backgroundColor = '#000000',
    alpha = true,
    antialias = true,
    cameraPosition = [0, 0, 15],
    children,
    className = '',
    style = {}
}) => {
    const mountRef = useRef(null);
    const [sceneReady, setSceneReady] = useState(false);

    // Create and return Three.js objects
    useEffect(() => {
        if (!mountRef.current) return;

        // Scene, renderer, and camera setup
        const scene = new THREE.Scene();
        scene.background = alpha ? null : new THREE.Color(backgroundColor);

        const renderer = new THREE.WebGLRenderer({
            antialias,
            alpha,
            powerPreference: 'high-performance'
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(...cameraPosition);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = controlsEnabled;
        controls.enableDamping = controlsDamping;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.5;

        // Default lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;

            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Start animation loop
        animate();
        setSceneReady(true);

        if (typeof onLoad === 'function') {
            onLoad({ scene, camera, renderer, controls });
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose of resources
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();

                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
            controls.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`three-canvas ${className}`}
            style={{ width: '100%', height: '100%', ...style }}
        >
            {sceneReady && children}
        </div>
    );
};

export default ThreeCanvas;