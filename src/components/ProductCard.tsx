'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function ProductCard({ id, title, description, image }: ProductCardProps) {
  return (
    <motion.div 
      className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Link href={`/products/${id}`} className="block h-full">
        <div className="h-64 relative overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </motion.div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {description}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors">
              View details
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
