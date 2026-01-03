import React, { CSSProperties } from 'react';

export interface IconFilterOptions {
  /** Hue rotation in degrees (0-360) */
  hue?: number;
  /** Saturation multiplier (0-500%) */
  saturation?: number;
  /** Brightness multiplier (0-300%) */
  brightness?: number;
  /** Contrast multiplier (0-300%) */
  contrast?: number;
  /** Sepia/tint amount (0-100%) */
  tint?: number;
  /** Base filter mode */
  mode?: 'sepia' | 'sepia-natural' | 'invert-sepia' | 'invert' | 'grayscale-sepia' | 'none';
}

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Path to the icon image */
  src: string;
  /** Alt text for the icon */
  alt?: string;
  /** Icon size (width and height). Defaults to maintaining original image size */
  size?: string | number;
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  /** CSS filter options for color manipulation, or raw CSS filter string */
  filter?: IconFilterOptions | string;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const buildFilterString = (filter: IconFilterOptions = {}): string => {
  const {
    hue = 0,
    saturation = 100,
    brightness = 100,
    contrast = 100,
    tint = 0,
    mode = 'none',
  } = filter;

  let filterValue = '';

  switch (mode) {
    case 'sepia':
      // Sepia shifted to red
      filterValue = `sepia(${tint}%) hue-rotate(-38deg) hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      break;
    case 'sepia-natural':
      // Natural sepia (brown/orange tone)
      filterValue = `sepia(${tint}%) hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      break;
    case 'invert-sepia':
      // Invert first, then sepia to red
      filterValue = `invert(${tint}%) sepia(${tint}%) hue-rotate(-38deg) hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      break;
    case 'invert':
      // Just invert
      filterValue = `invert(${tint}%) hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      break;
    case 'grayscale-sepia':
      // Grayscale first to normalize, then colorize
      filterValue = `grayscale(70%) sepia(${tint}%) hue-rotate(-38deg) hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      break;
    case 'none':
    default:
      // No base filter, just apply adjustments if any non-default values
      if (hue !== 0 || saturation !== 100 || brightness !== 100 || contrast !== 100) {
        filterValue = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`;
      }
      break;
  }

  return filterValue;
};

export const Icon: React.FC<IconProps> = ({
  src,
  alt = '',
  size,
  width,
  height,
  filter,
  className = '',
  style = {},
  ...rest
}) => {
  // Support both IconFilterOptions object and raw CSS filter string
  const filterString = filter 
    ? typeof filter === 'string' 
      ? filter 
      : buildFilterString(filter)
    : '';

  const computedStyle: CSSProperties = {
    ...style,
    width: size || width || '100%',
    height: size || height || '100%',
    display: 'block',
    objectFit: 'contain',
  };

  if (filterString) {
    computedStyle.filter = filterString;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={computedStyle}
      {...rest}
    />
  );
};

export default Icon;
