import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  imgClassName?: string;
  wrapperClassName?: string;
  fill?: boolean;
};

export default function LogoFrame({
  src,
  alt = 'Logo',
  width,
  height,
  sizes,
  imgClassName = '',
  wrapperClassName = '',
  fill = false,
}: Props) {
  // For next/image with fill, the parent must be position:relative and have explicit size.
  if (fill) {
    return (
      <div className={`relative overflow-hidden bg-white rounded-[12px] px-2 py-2 shadow-sm ${wrapperClassName}`}>
        <Image src={src} alt={alt} fill className={imgClassName + ' object-contain'} sizes={sizes} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center bg-white rounded-[12px] px-3 py-2 shadow-sm ${wrapperClassName}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={imgClassName} />
    </div>
  );
}
