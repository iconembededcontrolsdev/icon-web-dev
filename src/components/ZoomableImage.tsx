'use client';

import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';

interface ZoomableImageProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string; // For passing custom styles to the image if needed
}

export default function ZoomableImage({ src, alt, priority = false, className }: ZoomableImageProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Calculate percentage position
        let x = ((clientX - left) / width) * 100;
        let y = ((clientY - top) / height) * 100;

        // Clamp values to 0-100
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        setPosition({ x, y });
    };

    const onMouseEnter = () => setIsZoomed(true);
    const onMouseLeave = () => setIsZoomed(false);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);

    const onTouchStart = (e: TouchEvent) => {
        // Prevent scrolling when touching the image to zoom
        // Note: This might block scrolling if the user just wants to scroll past the image. 
        // Usually standard mobile behavior is: tap to open lightbox/zoom, or pinch. 
        // But user asked for "zoom where it is touched".
        setIsZoomed(true);
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchEnd = () => setIsZoomed(false);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden cursor-crosshair touch-none select-none"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-contain transition-transform duration-200 ease-out ${className || ''}`}
                style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                }}
                priority={priority}
                sizes="100vw"
            />

            {/* Zoom Icon (The [+]) - Hides when zoomed to avoid obstruction */}
            <div
                className={`absolute bottom-0 right-0 p-3 bg-[#333] text-white transition-opacity duration-300 pointer-events-none ${isZoomed ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                </svg>
            </div>
        </div>
    );
}
