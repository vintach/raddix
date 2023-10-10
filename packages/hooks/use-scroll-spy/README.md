<div align="center">
  <h1 align="center">useScrollSpy</h1>
  <a href="https://github.com/gdvu/raddix/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/gdvu/raddix">
  </a>
  <a href="https://www.npmjs.com/package/@raddix/use-toggle">
    <img alt="npm version" src="https://img.shields.io/npm/v/@raddix/use-scroll-spy">
  </a>

  <a href="https://www.npmjs.com/package/@raddix/use-toggle">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@raddix/use-scroll-spy">
  </a>
</div>
<p align="center">
Automatically update navigation based on scroll position.
</p>

## Install

```bash
npm i @raddix/use-scroll-spy
# or
yarn add @raddix/use-scroll-spy
# or
pnpm add @raddix/use-scroll-spy
```

## Usage

```jsx
import { useScrollSpy } from '@raddix/use-scroll-spy';

const App = () => {
  const navList = ['home', 'work', 'about', 'contact'];

  const navActive = useScrollSpy(navList, { threshold: 0.7 });

  ...
};
```

## Documentation

For full documentation, visit [raddix.website/use-scroll-spy](https://www.raddix.website/docs/utilities/use-scroll-spy)
