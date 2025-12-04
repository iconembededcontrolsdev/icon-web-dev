'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { GridItem } from './DynamicGrid';

export interface CarouselProps {
  items: GridItem[];
  title?: string;
  subtitle?: string;
}

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="py-4"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx} className="pb-10">
            <div className="bg-card p-6 text-center h-full flex flex-col">
              <div className="relative w-full h-48 md:h-56 mb-4">
                <Image 
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
              <h3 className="text-lg font-medium text-text mb-2">{item.title}</h3>
              {item.link && (
                <a 
                  href={item.link} 
                  className="text-accent hover:underline text-sm font-medium mt-auto"
                >
                  Learn more ›
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
