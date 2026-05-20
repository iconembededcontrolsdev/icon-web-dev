"use client";

import { useEffect } from "react";

function toHighResUrl(src: string) {
  if (!src) return src;

  // Common case: static path contains '/images/lowres/'
  if (src.includes('/images/lowres/')) {
    return src.replace('/images/lowres/', '/images/highres/');
  }

  // Next.js _next/image proxied URL contains encoded url param
  // e.g. /_next/image?url=%2Fimages%2Flowres%2Ffile.png&w=256&q=75
  try {
    const url = new URL(src, window.location.href);
    const param = url.searchParams.get('url');
    if ((param && param.includes('%2Flowres%2F')) || (param && param.includes('/images/lowres/'))) {
      const decoded = decodeURIComponent(param);
      const high = decoded.replace('/images/lowres/', '/images/highres/');
      url.searchParams.set('url', high);
      return url.toString();
    }
  } catch (e) {
    // ignore
  }

  // Fallback: replace 'lowres' -> 'highres' anywhere in path
  return src.replace('lowres', 'highres');
}

export default function SwapLowToHigh() {
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];

    const candidates = imgs.filter((img) => {
      const s = img.getAttribute('src') || '';
      return s.includes('/images/lowres/') || s.includes('%2Flowres%2F') || s.includes('lowres');
    });

    if (candidates.length === 0) return;

    const swapImg = (img: HTMLImageElement) => {
      const src = img.getAttribute('src') || img.src || '';
      const high = toHighResUrl(src);
      if (!high || high === src) return;

      const pre = new Image();
      pre.src = high;
      pre.onload = () => {
        try {
          img.src = high;
        } catch (e) {
          // noop
        }
      };
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          swapImg(entry.target as HTMLImageElement);
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '200px' });

    candidates.forEach((img) => io.observe(img));

    // Also swap all remaining after window load (so highres loads later)
    const onLoad = () => {
      candidates.forEach((img) => swapImg(img));
    };

    window.addEventListener('load', onLoad);

    return () => {
      io.disconnect();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return null;
}
