"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function InteractiveText({
    children,
    className,
    intensity = 0.2,
    activeDistance = 100,
    speed = 0.2
}) {
    const containerRef = useRef(null);
    const charactersRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Convert text to spans
        const container = containerRef.current;
        const textContent = container.innerText || container.textContent;
        container.innerHTML = '';

        // Create span for each character
        const chars = textContent.split('');
        chars.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.position = 'relative';
            span.style.whiteSpace = 'pre';
            container.appendChild(span);
            charactersRef.current.push(span);
        });

        // Handle mouse movement
        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            charactersRef.current.forEach((char) => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const deltaX = mouseX - charX;
                const deltaY = mouseY - charY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < activeDistance) {
                    const power = (activeDistance - distance) / activeDistance;
                    const moveX = deltaX * power * intensity;
                    const moveY = deltaY * power * intensity;

                    gsap.to(char, {
                        x: moveX,
                        y: moveY,
                        duration: speed,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(char, {
                        x: 0,
                        y: 0,
                        duration: speed * 2,
                        ease: "power2.out"
                    });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [intensity, activeDistance, speed, children]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}