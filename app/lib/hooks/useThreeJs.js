// app/lib/hooks/useThreeJs.js
"use client"

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Hook for creating and managing a basic Three.js scene
 * @param {Object} options - Scene configuration options
 * @returns {Object} - Scene objects and state
 */
export const useThreeScene = (options = {}) => {
  const {
    antialias = true,
    alpha = true,
    backgroundColor = "#000000",
    controlsEnabled = true,
    autoRotate = false,
    cameraPosition = [0, 0, 15],
  } = options;

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const mountRef = useRef(null);
  const frameIdRef = useRef(null);

  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize scene
  const initScene = (containerElement) => {
    if (!containerElement) return;

    // Cleanup previous scene if exists
    cleanupScene();

    // Get container dimensions
    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = alpha ? null : new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerElement.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = controlsEnabled;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controlsRef.current = controls;

    // Add default lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Start animation loop
    startAnimationLoop();

    // Set initialized state
    setIsInitialized(true);

    // Handle window resize
    window.addEventListener("resize", handleResize);

    // Return scene objects
    return {
      scene,
      camera,
      renderer,
      controls,
    };
  };

  // Animation loop
  const startAnimationLoop = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();
  };

  // Handle window resize
  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Update camera
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();

    // Update renderer
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  // Cleanup scene
  const cleanupScene = () => {
    // Cancel animation frame
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }

    // Remove event listener
    window.removeEventListener("resize", handleResize);

    // Dispose of renderer
    if (rendererRef.current && mountRef.current) {
      if (mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Dispose of controls
    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }

    // Dispose of scene objects
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      sceneRef.current = null;
    }

    // Reset initialized state
    setIsInitialized(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupScene();
    };
  }, []);

  return {
    initScene,
    cleanupScene,
    isInitialized,
    mountRef,
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
  };
};

/**
 * Hook for creating a raycaster to handle object interactions
 * @param {THREE.Camera} camera - Three.js camera
 * @param {Array} objects - Array of objects to interact with
 * @returns {Object} - Raycaster functions and state
 */
export const useThreeRaycaster = (camera, objects = []) => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [hoveredObject, setHoveredObject] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  // Update raycaster mouse position
  const updateMousePosition = (event, domElement) => {
    if (!domElement) return;

    const rect = domElement.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  // Check for intersections
  const checkIntersections = () => {
    if (!camera || !objects || objects.length === 0) return null;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const intersects = raycasterRef.current.intersectObjects(objects);

    return intersects.length > 0 ? intersects[0].object : null;
  };

  // Handle mouse move
  const handleMouseMove = (event, domElement) => {
    updateMousePosition(event, domElement);
    const intersectedObject = checkIntersections();

    if (intersectedObject !== hoveredObject) {
      // Reset previous hovered object
      if (hoveredObject && hoveredObject !== selectedObject) {
        if (hoveredObject.onMouseLeave) {
          hoveredObject.onMouseLeave();
        }
      }

      // Set new hovered object
      setHoveredObject(intersectedObject);

      // Call onMouseEnter if available
      if (intersectedObject && intersectedObject.onMouseEnter) {
        intersectedObject.onMouseEnter();
      }

      // Update cursor style
      if (domElement) {
        domElement.style.cursor = intersectedObject ? "pointer" : "default";
      }
    }
  };

  // Handle click
  const handleClick = (event, domElement) => {
    updateMousePosition(event, domElement);
    const intersectedObject = checkIntersections();

    if (intersectedObject) {
      setSelectedObject(intersectedObject);

      // Call onClick if available
      if (intersectedObject.onClick) {
        intersectedObject.onClick();
      }
    } else {
      setSelectedObject(null);
    }
  };

  return {
    raycaster: raycasterRef.current,
    mouse: mouseRef.current,
    hoveredObject,
    selectedObject,
    handleMouseMove,
    handleClick,
    checkIntersections,
  };
};

export default {
  useThreeScene,
  useThreeRaycaster,
};
