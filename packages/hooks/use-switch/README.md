<div align="center">
  <h1>useSwitch</h1>
  <a href="https://www.npmjs.com/package/@raddix/switch">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@raddix/switch">
  </a>
  <a href="https://www.npmjs.com/package/@raddix/switch">
    <img alt="npm" src="https://img.shields.io/npm/v/@raddix/switch?color=green">
  </a>
</div>
<span></span>

<p align="center">
@raddix/switch is a hook that provides the behavior for a switch component.
</p>


## Features

- Full support for browser features.
- Accessible to screen reader and keyboard navigation.
- Doesn’t implement any rendering or impose a DOM structure, unstyled.
- Fully-typed API

## Installation

Install the primitive from your command line.

```bash
yarn add @raddix/switch
#or
pnpm add @raddix/switch
```

## Usage

This is a simple example of how to use it. To see the options and more modes of use <a href="https://www.raddix.website/docs/aria/switch">here</a>.

```jsx
import { useSwitch } from '@raddix/switch';
import './styles.scss';

const Switch = props => {
  const { switchProps } = useSwitch(props);

  return <div {...switchProps} className='switch'></div>;
};
```
