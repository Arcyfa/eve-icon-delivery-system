# eve-icons-react

EVE Online icons for React with CSS filter support for color manipulation.

## Icon Gallery

Browse all available icons through the interactive HTML galleries:

- [index.html](examples/index.html) - Main index with links to all categories
- [all-icons.html](examples/all-icons.html) - View all icons
- [color-adjuster.html](examples/color-adjuster.html) - Color adjustment tool

To regenerate the gallery pages after adding new icons:

```bash
npm run generate-pages
```

## Installation

```bash
npm install eve-icons-react
```

## Quick Usage

```jsx
import { Charactersheet, Icon } from 'eve-icons-react';

function Example() {
  return (
    <div>
      <Charactersheet size={32} alt="Character" />
      <Icon src="/path/to/Icons/UI/Assets.png" size={32} alt="Assets" />
    </div>
  );
}
```

Notes:

- `size`, `width`, and `height` accept numbers (pixels) or strings (units). Numeric values are adjusted by +4px by default.
- `filter` accepts an object or raw CSS filter string.
- Use `EveIcon` export to avoid `Icon` name collisions.

## License

MIT
