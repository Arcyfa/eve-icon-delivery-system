# eve-icons-react

This README is packaged with the npm tarball. It is intended to document files and actions local to the `pack/` folder and to explain how to use the example preview tools that live outside of `pack/` (the `examples/` folder).

---

Pack folder contents (files you will find here):

- `package-for-npm.js` — helper script that builds the project and creates a temporary staging folder `package-temp` for `npm pack`/`npm publish`.
- `README.md` — this file (used as the package README when publishing from the staging folder).
- `package-temp/` — created by the pack script; contains the staged package and the produced tarball (not committed).

Use the `pack` helper when you want to produce a tarball for npm without changing the repository root files.

## Install

Install from npm:

```bash
npm install eve-icons-react
```

Or install from a local tarball produced by the included pack script (run this from the repository root):

```bash
npm run pack-npm
# then in the pack/package-temp folder: npm install ./eve-icons-react-<version>.tgz
```

## Quick import

Import components in a React/TypeScript app:

```tsx
import React from 'react';
import { Icon, Charactersheet } from 'eve-icons-react';

function Example() {
  return (
    <div>
      <Charactersheet size={32} alt="Character" />
      <Icon src="/path/to/Icons/UI/Assets.png" size={32} alt="Assets" />
    </div>
  );
}
```

### `size`, `width`, `height`

- These accept a number (interpreted as pixels) or a CSS string (for example `'2rem'` or `'24px'`).
- Numeric values are written as HTML `width`/`height` attributes and the library applies a small padding adjustment to avoid cropping (an extra ~4px is added to the computed pixel value).

## Icon Gallery

Browse all available icons through the interactive HTML galleries included in `examples/`:

- `index.html` - Main index with links to all categories
- `all-icons.html` - View all 607 icons in one page
- `color-adjuster.html` - Color adjustment tool (use this to generate CSS `filter` strings)

Or browse by category:

- Attributes — 5 icons
- Attributes Implants — 5 icons
- Attributes Large — 5 icons
- Career Program — 4 icons
- Ice — 8 icons
- ISIS — 60 ship tree icons
- Logos — 38 corporation/faction logos
- Minerals — 15 icons
- Mutaplasmid — 3 icons
- Ores — 16 icons
- Overview — 107 icons (with Brackets, Friendlies, Hostiles, Neutrals sections)
- Planetary Interaction — 10 icons
- Planets — 16 icons
- Scanner — 14 icons
- Timers — 9 icons
- UI — 148 user interface icons
- UI Skill — 4 skill-related icons

## Colorizing (CSS filter) — quick guide

The package distributes PNG icons which can be recolored at runtime using CSS filters. Below are quick examples and a note on how to use the repository's color-adjuster tool to generate filter strings.

Inline `style` example:

```tsx
<Icon
  src="../Icons/UI/Assets.png"
  size={32}
  alt="Assets"
  style={{ filter: 'invert(60%) sepia(40%) saturate(700%) hue-rotate(200deg)' }}
/>
```

CSS class example:

```css
.my-blue { filter: invert(60%) sepia(40%) saturate(700%) hue-rotate(200deg); }
```

```tsx
<Icon src="../Icons/UI/Assets.png" size={32} className="my-blue" />
```

### Using the color-adjuster to generate filter strings

The project includes an interactive preview page that helps you produce CSS `filter` strings that approximate a chosen color.

Note: If you installed `eve-icons-react` from npm, those `npm run` scripts are not available inside the installed package. The pre-generated `examples/` HTML files are shipped in the tarball; to regenerate examples you must work from a clone of the repository and run the commands above.

Open the color-adjuster preview in a browser:

Open `../examples/color-adjuster.html` (relative to this `pack/` folder) in your browser or serve the repository and navigate to `/examples/color-adjuster.html`.

In the color-adjuster page:

- Select an icon and pick the target color.
- The page will output a CSS `filter` string (there is a copy control). Copy that string.
- Paste the string into your React code (inline `style` or a CSS class) as shown above.

This workflow lets you quickly preview and fine-tune colorization for icons before shipping the filter to production.

## Filter Options

The `filter` prop accepts an object of options to build a CSS filter string. These options match the controls available in the color-adjuster UI.

- `mode` (string)
  - Base filter mode for color manipulation:
    - `'sepia'` - Sepia → Red (default for coloring)
    - `'sepia-natural'` - Natural sepia brown/orange tone
    - `'invert-sepia'` - Invert + Sepia → Red (good for white icons)
    - `'invert'` - Invert colors only
    - `'grayscale-sepia'` - Grayscale + Sepia → Red
    - `'none'` - No base filter

- `hue` (number, 0-360)
  - Hue rotation in degrees. Color wheel: 0° = Red, 60° = Yellow (increase brightness to ~110 for pure yellow), 120° = Green, 180° = Cyan, 240° = Blue, 300° = Magenta.

- `tint` (number, 0-100)
  - Amount of base filter to apply. For coloring white/gray icons, use `100`.

- `saturation` (number, 0-500)
  - Saturation multiplier. `100` = no change, `200-300` = vivid colors.

- `brightness` (number, 0-300)
  - Brightness multiplier. `100` = no change.

- `contrast` (number, 0-300)
  - Contrast multiplier. `100` = no change.

### Examples

Icon gallery component:

```tsx
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

Styled icon with custom props:

```tsx
<Fleet
  size={48}
  className="fleet-icon"
  style={{ margin: '10px' }}
  filter={{ mode: 'sepia', hue: 330, tint: 100, saturation: 250 }}
  onClick={() => console.log('Fleet clicked')}
  alt="Fleet"
/
>
```

### Tips for white/gray icons

For the best results with white or gray icons (most EVE icons):

- Set `mode` to `'sepia'` or `'invert-sepia'`.
- Set `tint` to `100`.
- Use `hue` to select the desired color.
- Increase `saturation` to `200-300` for vivid colors.
- For yellow, increase `brightness` to ~110.

## License

MIT
