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
    display: 'block',
    objectFit: 'contain',
    flexShrink: 0, // Prevent flex containers from shrinking the icon below its specified size
  };

  const styleHasMaxWidth = typeof style?.maxWidth !== 'undefined';
  const styleHasMaxHeight = typeof style?.maxHeight !== 'undefined';



  // If only one of width/height is provided, ensure the other
  // adjusts automatically to preserve aspect ratio — but don't
  // override an explicit height/width set in the `style` prop.
  const styleHasWidth = typeof style?.width !== 'undefined';
  const styleHasHeight = typeof style?.height !== 'undefined';

  if (size) {
    // allow numeric or string sizes; numeric values become px in style
    computedStyle.width = size;
    computedStyle.height = size;
  } else {
    if (typeof width !== 'undefined') computedStyle.width = width;
    if (typeof height !== 'undefined') computedStyle.height = height;

    if (!styleHasHeight && typeof width !== 'undefined' && typeof height === 'undefined') {
      computedStyle.height = 'auto';
    }
    if (!styleHasWidth && typeof height !== 'undefined' && typeof width === 'undefined') {
      computedStyle.width = 'auto';
    }
  }

  if (filterString) computedStyle.filter = filterString;

  // For better layout/HTML semantics, set the img width/height attributes
  // when the values are numeric (they become pixel dimensions). When
  // the caller provided strings with units (e.g. '2rem'), rely on CSS only.
  // Helper to add 4px to a provided dimension
  const adjustDim = (val: string | number | undefined) => {
    if (typeof val === 'number') return val + 4;
    if (typeof val === 'string') {
      const num = parseFloat(val);
      if (!Number.isNaN(num)) {
        // If the string is purely numeric or ends with px, add 4px and keep px
        if (/^\s*\d+(\.\d+)?\s*$/.test(val)) return `${num + 4}px`;
        if (/px\s*$/.test(val)) return `${num + 4}px`;
        // Otherwise use calc() to add 4px to arbitrary units
        return `calc(${val} + 4px)`;
      }
      return `calc(${val} + 4px)`;
    }
    return undefined;
  };

  const adjustedSize = adjustDim(size as string | number | undefined);
  const adjustedWidth = adjustDim(width as string | number | undefined);
  const adjustedHeight = adjustDim(height as string | number | undefined);

  const imgWidthAttr = typeof size === 'number' ? (size + 4) : (typeof width === 'number' ? (width + 4) : undefined);
  const imgHeightAttr = typeof size === 'number' ? (size + 4) : (typeof height === 'number' ? (height + 4) : undefined);

  // Build final inline style object. We need to apply width/height overrides
  // from adjustedSize/adjustedWidth/adjustedHeight if provided.
  const finalStyle: CSSProperties = {
    ...computedStyle,
  };

  if (adjustedSize) {
    finalStyle.width = adjustedSize;
    finalStyle.height = adjustedSize;
  } else {
    if (adjustedWidth) finalStyle.width = adjustedWidth;
    if (adjustedHeight) finalStyle.height = adjustedHeight;
  }

  // Set max dimensions to match requested width/height unless caller provided explicit values.
  // Use the same adjusted values to ensure icons can grow to their specified size.
  // Also set min dimensions to force the icon to be at least this big, allowing it to break out of parent containers.
  if (!styleHasMaxWidth) {
    if (adjustedSize) {
      finalStyle.maxWidth = adjustedSize;
      finalStyle.minWidth = adjustedSize;
    } else if (adjustedWidth) {
      finalStyle.maxWidth = adjustedWidth;
      finalStyle.minWidth = adjustedWidth;
    } else if (typeof finalStyle.width !== 'undefined') {
      finalStyle.maxWidth = finalStyle.width as any;
      finalStyle.minWidth = finalStyle.width as any;
    }
  }
  if (!styleHasMaxHeight) {
    if (adjustedSize) {
      finalStyle.maxHeight = adjustedSize;
      finalStyle.minHeight = adjustedSize;
    } else if (adjustedHeight) {
      finalStyle.maxHeight = adjustedHeight;
      finalStyle.minHeight = adjustedHeight;
    } else if (typeof finalStyle.height !== 'undefined') {
      finalStyle.maxHeight = finalStyle.height as any;
      finalStyle.minHeight = finalStyle.height as any;
    }
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      className={className}
      style={finalStyle}
      width={imgWidthAttr}
      height={imgHeightAttr}
    />
  );
};

export default Icon;

// Alias export to avoid collisions with other `Icon` components
export const EveIcon = Icon;
