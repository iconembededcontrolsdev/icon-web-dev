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
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

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

    // Mobile touch handling
    const onTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };

        if (isZoomed) {
            handleMove(touch.clientX, touch.clientY);
        }
    };

    const onTouchMove = (e: TouchEvent) => {
        if (isZoomed) {
            // Prevent scrolling when panning a zoomed image
            if (e.cancelable) e.preventDefault();
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const onTouchEnd = (e: TouchEvent) => {
        const start = touchStartRef.current;
        if (!start) return;

        const touch = e.changedTouches[0];
        const dist = Math.sqrt(
            Math.pow(touch.clientX - start.x, 2) + Math.pow(touch.clientY - start.y, 2)
        );
        const duration = Date.now() - start.time;

        // If it was a quick tap (moved less than 12px and took less than 250ms)
        if (dist < 12 && duration < 250) {
            if (isZoomed) {
                setIsZoomed(false);
            } else {
                setIsZoomed(true);
                handleMove(touch.clientX, touch.clientY);
            }
        }

        touchStartRef.current = null;
    };

    const onClick = (e: MouseEvent) => {
        // Toggle zoom on click/tap for desktop/backup
        if (isZoomed) {
            setIsZoomed(false);
        } else {
            setIsZoomed(true);
            handleMove(e.clientX, e.clientY);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none ${
                isZoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in touch-pan-x'
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={onClick}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-contain transition-transform duration-200 ease-out ${className || ''}`}
                style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                }}
                priority={priority}
                sizes="100vw"
            />

            {/* Zoom Icon (The [+]) - Hides when zoomed to avoid obstruction */}
            <div
                className={`absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white transition-opacity duration-300 pointer-events-none ${
                    isZoomed ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                </svg>
            </div>
        </div>
    );
}
