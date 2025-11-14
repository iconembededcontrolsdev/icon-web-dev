import { ReactNode } from 'react';
import Hero, { HeroProps } from './Hero';
import Grid2, { Grid2Props } from './Grid2';
import Grid3, { Grid3Props } from './Grid3';
import Carousel, { CarouselProps } from './Carousel';

type BlockType = 
  | { type: 'hero' } & HeroProps
  | { type: 'grid-2' } & Grid2Props
  | { type: 'grid-3' } & Grid3Props
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
      const { type: grid2Type, ...grid2Props } = block;
      return <Grid2 {...grid2Props} />;
    case 'grid-3':
      const { type: grid3Type, ...grid3Props } = block;
      return <Grid3 {...grid3Props} />;
    case 'carousel':
      const { type: carouselType, ...carouselProps } = block;
      return <Carousel {...carouselProps} />;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
}
