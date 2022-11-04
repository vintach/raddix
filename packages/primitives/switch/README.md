# useSwitch

@raddix/switch is un hook that provides accessibility and behavior for a switch component.

## Features

- Full support for browser features.
- Full keyboard navigation.
- Labeling support for screen readers.
- Can be controlled or uncontrolled.
- Fully-typed API

## Installation

Install the primitive from your command line.

```sh
yarn add @raddix/switch
```

## Usage

Import all or parts of <code>@raddix/switch</code>

```jsx
import useSwitch from '@raddix/switch';

const Switch = props => {
  const { switchProps, state } = useSwitch.Root(props);
  const { switchThumbProps } = useSwitch.Thumb(state);

  return (
    <button {...switchProps} className='switch'>
      <span {...switchThumbProps} className='switch-thumb'></span>
    </button>
  );
};
```
