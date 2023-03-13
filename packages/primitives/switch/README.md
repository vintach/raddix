# useSwitch

@raddix/switch is un hook that provides accessibility and behavior for a switch component.

## Features

- Full support for browser features.
- Full keyboard navigation.
- Can be controlled or uncontrolled.
- Unstyled. compatible with any style solution
- Fully-typed API

## Installation

Install the primitive from your command line.

```bash
yarn add @raddix/switch
#or
pnpm add @raddix/switch
```

## Usage

This is a simple example of how to use it.
To see the options and more modes of
use <a href="https://www.raddix.website/docs/primitives/switch">here</a>.

```jsx
import { useSwitch } from '@raddix/switch';
import './styles.scss';

const Switch = props => {
  const { switchProps, state } = useSwitch(props);

  return <button {...switchProps} className='switch'></button>;
};
```
