# useCheckbox

@raddix/checkbox is un hook that provides accessibility and behavior for a checkbox component.

## Features

- Full support for browser features.
- Full keyboard navigation.
- Can be controlled or uncontrolled.
- Indeterminate state support.
- Fully-typed API

## Installation

Install the primitive from your command line.

```sh
yarn add @raddix/switch
```

## Usage

Import all or parts of <code>@raddix/checkbox</code>

```jsx
import useCheckbox from '@raddix/checkbox';

const Checkbox = props => {
  const { checkboxProps, state } = useCheckbox.Root(props);
  const { checkboxIndicatorProps } = useCheckbox.Indicator(state);

  return (
    <button {...checkboxProps} className='checkbox'>
      <span {...checkboxIndicatorProps} className='checkbox-indicator'></span>
    </button>
  );
};
```
