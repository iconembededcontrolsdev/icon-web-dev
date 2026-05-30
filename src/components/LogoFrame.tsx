import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  imgClassName?: string;
  wrapperClassName?: string;
  paddingClassName?: string;
  unoptimized?: boolean;
  fill?: boolean;
  priority?: boolean;
};

export default function LogoFrame({
  src,
  alt = 'Logo',
  width,
  height,
  sizes,
  imgClassName = '',
  wrapperClassName = '',
  paddingClassName = '',
  unoptimized = false,
  fill = false,
  priority = false,
}: Props) {
  const fillPaddingClassName = paddingClassName || 'px-2 py-2';
  const framePaddingClassName = paddingClassName || 'px-3 py-2';

  // For next/image with fill, the parent must be position:relative and have explicit size.
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${wrapperClassName}`}>
        <Image src={src} alt={alt} fill className={imgClassName + ' object-contain'} sizes={sizes} unoptimized={unoptimized} priority={priority} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${wrapperClassName}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={imgClassName} unoptimized={unoptimized} priority={priority} />
    </div>
  );
}
