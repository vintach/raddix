<div align="center">
  <h1 align="center">useClickOutside</h1>
  <a href="https://github.com/gdvu/raddix/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/gdvu/raddix">
  </a>
  <a href="https://www.npmjs.com/package/@raddix/use-toggle">
    <img alt="npm version" src="https://img.shields.io/npm/v/@raddix/use-click-outside">
  </a>

  <a href="https://www.npmjs.com/package/@raddix/use-toggle">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@raddix/use-click-outside">
  </a>
</div>
<p align="center">
Automatically update navigation based on scroll position.
</p>

## Install

```bash
npm i @raddix/use-click-outside
# or
yarn add @raddix/use-click-outside
# or
pnpm add @raddix/use-click-outside
```

## Usage

```jsx
import { useScrollSpy } from '@raddix/use-click-outside';

const App = () => {
  const navList = ['home', 'work', 'about', 'contact'];

  const navActive = useScrollSpy(navList, { threshold: 0.7 });

  ...
};
```

## Documentation

For full documentation, visit [raddix.website/use-click-outside](https://www.raddix.website/docs/utilities/use-click-outside)
