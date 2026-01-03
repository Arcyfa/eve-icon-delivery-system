# eve-icons-react

EVE Online icons for React with CSS filter support for color manipulation.

## Icon Gallery

Browse all available icons through the interactive HTML galleries:

- **[index.html](index.html)** - Main index with links to all categories
- **[all-icons.html](all-icons.html)** - View all 607 icons in one page

Or browse by category:
- [Attributes](icons-attributes.html) - 5 icons
- [Attributes Implants](icons-attributesimplants.html) - 5 icons  
- [Attributes Large](icons-attributeslarge.html) - 5 icons
- [Career Program](icons-careerprogram.html) - 4 icons
- [Ice](icons-ice.html) - 8 icons
- [ISIS](icons-isis.html) - 60 ship tree icons
- [Logos](icons-logos.html) - 38 corporation/faction logos
- [Minerals](icons-minerals.html) - 15 icons
- [Mutaplasmid](icons-mutaplasmid.html) - 3 icons
- [Ores](icons-ores.html) - 16 icons
- [Overview](icons-overview.html) - 107 icons (with Brackets, Friendlies, Hostiles, Neutrals sections)
- [Planetary Interaction](icons-planetaryinteraction.html) - 10 icons
- [Planets](icons-planets.html) - 16 icons
- [Scanner](icons-scanner.html) - 14 icons
- [Timers](icons-timers.html) - 9 icons
- [UI](icons-ui.html) - 148 user interface icons
- [UI Skill](icons-uiskill.html) - 4 skill-related icons

To regenerate the gallery pages after adding new icons:
```bash
npm run generate-pages
```

## Installation

```bash
npm install eve-icons-react
```

## Usage

### Basic Usage

Import and use icons as React components:

```jsx
import { Assets, Fleet, Market } from 'eve-icons-react';

function App() {
  return (
    <div>
      <Assets alt="Assets" />
      <Fleet alt="Fleet" />
      <Market alt="Market" />
    </div>
  );
}
```

You can also use the base `Icon` component with image imports:

```jsx
import { Icon } from 'eve-icons-react';
import AssetsImage from 'eve-icons-react/Icons/UI/Assets.png';

function App() {
  return <Icon src={AssetsImage} alt="Assets" />;
}
```

### With Size Control

```jsx
// Fixed size
<Assets size={64} alt="Assets" />

// Custom width/height
<Fleet width={48} height={48} alt="Fleet" />

// Percentage
<Market size="50%" alt="Market" />
```

### With Color Filters

```jsx
// Red colored icon
<Assets 
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
<Fleet 
  filter={{
    mode: 'sepia',
    hue: 210,
    tint: 100,
    saturation: 300
  }}
  alt="Blue Fleet" 
/>

// Yellow colored icon
<Market 
  filter={{
    mode: 'sepia',
    hue: 60,
    tint: 100,
    saturation: 300,
    brightness: 110
  }}
  alt="Yellow Market" 
/>
```

### With Raw CSS Filter String

You can also pass a raw CSS filter string for maximum control:

```jsx
// Multiple filters combined
<Assets 
  filter="invert(50%) sepia(50%) hue-rotate(-38deg) hue-rotate(160deg) saturate(500%) brightness(125%) contrast(300%)"
  alt="Custom filtered icon" 
/>

// Simple brightness adjustment
<Fleet 
  filter="brightness(150%) contrast(120%)"
  alt="Bright icon" 
/>

// Complex color transformation
<Market 
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
import { Assets, Fleet, Market } from 'eve-icons-react';

function IconGallery() {
  const colors = [
    { name: 'Red', hue: 0 },
    { name: 'Green', hue: 120 },
    { name: 'Blue', hue: 210 },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {colors.map(color => (
        <Assets
          key={color.name}
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
<Fleet 
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
