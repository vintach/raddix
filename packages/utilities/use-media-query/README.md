<div align="center">
  <h1 align="center">useMediaQuery</h1>
  <a href="https://github.com/gdvu/raddix/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/gdvu/raddix">
  </a>
  <a href="https://www.npmjs.com/package/@raddix/use-media-query">
    <img alt="npm version" src="https://img.shields.io/npm/v/@raddix/use-media-query">
  </a>

  <a href="https://www.npmjs.com/package/@raddix/use-media-query">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@raddix/use-media-query">
  </a>
</div>
<span></span>
<p align="center">
A simple hook that toggles its value from true to false.
</p>

## Features

Leverages the window.matchMedia API to subscribe to CSS media query changes, thereby providing real-time responsiveness to dynamic changes in the viewport or screen orientation

## Install

```bash
npm i @raddix/use-media-query
# or
yarn add @raddix/use-media-query
# or
pnpm add @raddix/use-media-query
```

## Quick Start

```jsx
import { useMediaQuery } from '@raddix/use-media-query';

// Using a string for the media query
const Component = () => {
  const matches = useMediaQuery('only screen and (max-width : 768px)');
  return <div>{`It is a small device: ${matches ? 'Yes' : 'No'}`}</div>;
};

// Using a number for the media query
const Component = () => {
  const matches = useMediaQuery(768);

  return (
    <div>
      {`The view port is ${matches ? 'at least' : 'less than'} 768 pixels wide`}
    </div>
  );
};
```

## API

### Parameters

| Argument | Type     | Required | Description                                                                          |
| -------- | -------- | --------- | ------------------------------------------------------------------------------------ |
| query    | `string, number` | Yes       | The media query you want to match, if you pass a number it will match the media query `"(min-width: ${number}px)"` |


### Returns

Returns `true` if the media query matches and `false` if it does not.
