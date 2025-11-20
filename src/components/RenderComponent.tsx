import { ReactNode } from 'react';
import Hero, { HeroProps } from './Hero';
import DynamicGrid, { DynamicGridProps } from './DynamicGrid';
import Carousel, { CarouselProps } from './Carousel';

type BlockType = 
  | { type: 'hero' } & HeroProps
  | { type: 'grid-2' } & DynamicGridProps
  | { type: 'grid-3' } & DynamicGridProps
  | { type: 'carousel' } & CarouselProps;

interface RenderComponentProps {
  block: BlockType;
}

export default function RenderComponent({ block }: RenderComponentProps): ReactNode {
  switch (block.type) {
    case 'hero':
      const { type, ...heroProps } = block;
      return <Hero {...heroProps} />;
    case 'grid-2':
    case 'grid-3':
      const { type: gridType, ...gridProps } = block;
      return <DynamicGrid {...gridProps} />;
    case 'carousel':
      const { type: carouselType, ...carouselProps } = block;
      return <Carousel {...carouselProps} />;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
}
