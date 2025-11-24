'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface AdaptiveImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

export default function AdaptiveImage({ src, alt, className, ...props }: AdaptiveImageProps) {
    const [imgSrc, setImgSrc] = useState<string>(src);

    // Helper to ensure we're using highres path
    const getHighResPath = (originalSrc: string) => {
        // Check if it's a product image that follows our structure
        if (!originalSrc.startsWith('/images/highres/8. Logos')) return originalSrc;

        const parts = originalSrc.split('/');

        if (parts.length < 4) return originalSrc;

        let category: string;
        let filename: string;

        // Check if parts[2] is "highres" or "lowres"
        if (parts[2] === 'highres' || parts[2] === 'lowres') {
            // Path already has quality indicator: /images/highres/Category/file.ext
            if (parts.length < 5) return originalSrc;
            category = parts[3];
            filename = parts[parts.length - 1];
        } else {
            // Path doesn't have quality indicator: /images/Category/file.ext
            category = parts[2];
            filename = parts[parts.length - 1];
        }

        const basename = filename.substring(0, filename.lastIndexOf('.'));
        const extension = filename.substring(filename.lastIndexOf('.'));

        // Always return highres path with .jpg extension
        return `/images/highres/${category}/${basename}.svg`;
    };

    const highResSrc = getHighResPath(src);

    return (
        <Image
            src={highResSrc}
            alt={alt}
            className={className}
            {...props}
            onError={() => {
                // Fallback to original src if constructed path fails
                if (imgSrc !== src) setImgSrc(src);
            }}
        />
    );
}