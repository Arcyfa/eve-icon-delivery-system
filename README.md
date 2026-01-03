# @eve-icons/react

EVE Online icons for React with CSS filter support for color manipulation.

## Installation

```bash
npm install @eve-icons/react
```

## Usage

### Basic Usage

```jsx
import { Icon, AssetsIcon } from '@eve-icons/react';

function App() {
  return <Icon src={AssetsIcon} alt="Assets" />;
}
```

### With Size Control

```jsx
// Fixed size
<Icon src={AssetsIcon} size={64} alt="Assets" />

// Custom width/height
<Icon src={AssetsIcon} width={48} height={48} alt="Assets" />

// Percentage
<Icon src={AssetsIcon} size="50%" alt="Assets" />
```

### With Color Filters

```jsx
// Red colored icon
<Icon 
  src={AssetsIcon} 
  filter={{
    mode: 'sepia',
    hue: 0,
    tint: 100,
    saturation: 300,
    brightness: 100,
    contrast: 100
  }}
  alt="Red Assets" 
/>

// Blue colored icon
<Icon 
  src={AssetsIcon} 
  filter={{
    mode: 'sepia',
    hue: 210,
    tint: 100,
    saturation: 300
  }}
  alt="Blue Assets" 
/>

// Yellow colored icon
<Icon 
  src={AssetsIcon} 
  filter={{
    mode: 'sepia',
    hue: 60,
    tint: 100,
    saturation: 300,
    brightness: 110
  }}
  alt="Yellow Assets" 
/>
```

### With Raw CSS Filter String

You can also pass a raw CSS filter string for maximum control:

```jsx
// Multiple filters combined
<Icon 
  src={AssetsIcon} 
  filter="invert(50%) sepia(50%) hue-rotate(-38deg) hue-rotate(160deg) saturate(500%) brightness(125%) contrast(300%)"
  alt="Custom filtered icon" 
/>

// Simple brightness adjustment
<Icon 
  src={AssetsIcon} 
  filter="brightness(150%) contrast(120%)"
  alt="Bright icon" 
/>

// Complex color transformation
<Icon 
  src={AssetsIcon} 
  filter="grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%)"
  alt="Cyan tinted icon" 
/>
```

## Filter Options

### `mode`

Base filter mode for color manipulation:

- `'sepia'` - Sepia → Red (default for coloring)
- `'sepia-natural'` - Natural sepia brown/orange tone
- `'invert-sepia'` - Invert + Sepia → Red (good for white icons)
- `'invert'` - Invert colors only
- `'grayscale-sepia'` - Grayscale + Sepia → Red
- `'none'` - No base filter (default)

### `hue` (number, 0-360)

Hue rotation in degrees. Color wheel:

- 0° = Red
- 60° = Yellow (use brightness: 110 for pure yellow)
- 120° = Green
- 180° = Cyan
- 240° = Blue
- 300° = Magenta

### `tint` (number, 0-100)

Amount of base filter to apply. For coloring white/gray icons, use 100.

### `saturation` (number, 0-500)

Saturation multiplier. 100 = no change, 200-300 = vivid colors.

### `brightness` (number, 0-300)

Brightness multiplier. 100 = no change.

### `contrast` (number, 0-300)

Contrast multiplier. 100 = no change.

## Examples

### Icon Gallery Component

```jsx
import { Icon, AssetsIcon, FleetIcon, MarketIcon } from '@eve-icons/react';

function IconGallery() {
  const colors = [
    { name: 'Red', hue: 0 },
    { name: 'Green', hue: 120 },
    { name: 'Blue', hue: 210 },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {colors.map(color => (
        <Icon
          key={color.name}
          src={AssetsIcon}
          size={64}
          filter={{
            mode: 'sepia',
            hue: color.hue,
            tint: 100,
            saturation: 300,
          }}
          alt={`${color.name} Assets`}
        />
      ))}
    </div>
  );
}
```

### Styled Icon with Custom Props

```jsx
<Icon 
  src={FleetIcon}
  size={48}
  className="fleet-icon"
  style={{ margin: '10px' }}
  filter={{ mode: 'sepia', hue: 330, tint: 100, saturation: 250 }}
  onClick={() => console.log('Fleet clicked')}
  alt="Fleet"
/>
```

## Tips for White/Gray Icons

For the best results with white or gray icons (most EVE icons):

1. Set `mode` to `'sepia'` or `'invert-sepia'`
2. Set `tint` to `100`
3. Use `hue` to select the color
4. Increase `saturation` to 200-300 for vivid colors
5. For yellow, increase `brightness` to ~110

## License

MIT
