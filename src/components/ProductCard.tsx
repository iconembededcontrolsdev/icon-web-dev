'use client';


import Link from 'next/link';
import Image from 'next/image';
import LogoFrame from './LogoFrame';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function ProductCard({ id, title, description, image }: ProductCardProps) {
  return (
    <div 
      className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
    >
      <Link href={`/products/${id}`} className="block h-full">
        <div className="h-64 relative overflow-hidden">
          <div
            className="h-full w-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <LogoFrame
                src="/images/lowres/logo.png"
                alt="Icon Logo"
                width={40}
                height={40}
                wrapperClassName="w-10 h-10 p-1"
                imgClassName="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
              {title}
            </h3>
          </div>
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
    </div>
  );
}
