<div align="center">
  <h1 align="center">useCountDown</h1>
  <a href="https://github.com/gdvu/raddix/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/gdvu/raddix">
  </a>
  <a href="https://www.npmjs.com/package/@raddix/use-count-down">
    <img alt="npm version" src="https://img.shields.io/npm/v/@raddix/use-count-down">
  </a>

  <a href="https://www.npmjs.com/package/@raddix/use-count-down">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@raddix/use-count-down">
  </a>
</div>
<span></span>
<p align="center">
The useCountdown hook is useful for creating a very simple yet powerful countdown timer for React.
</p>

## Install

```bash
npm i @raddix/use-count-down
# or
yarn add @raddix/use-count-down
# or
pnpm add @raddix/use-count-down
```

## Quick Start

```jsx
import { useCountDown } from '@raddix/use-count-down';

// Using it in a basic way
const Component = () => {
  const [count, { reset }] = useCountDown(10000);

  return (
    <div>
      <span>{Math.round(count / 1000)}</span>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

// Using it in an advanced way, changing its settings
const Component = () => {
  const [count, { start, stop, reset }] = useCountDown(12000, {
    interval: 500,
    autoStart: false
  });

  return (
    <div>
      <span>{Math.round(count / 1000)}</span>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
```

## API

### Parameters

| Argument    | Type      | Required | Description                                             |
| ----------- | --------- | -------- | ------------------------------------------------------- |
| initialTime | `number`  | Yes      | Time in milliseconds that countdown should start with   |
| options     | `Options` | No       | A configuration object with the following options below |

`Options`
| Argument | Type | Required | Description |
| -------- | -------- | --------- | ------------------------------------------------------------------------------------ |
| interval | `number` | No | The time, in milliseconds, that the timer should count down. |
| autoStart | `boolean` | No | Start timer immediately |
| onFinished | `() => void` | No | A callback function to be called when the countdown reaches zero. |
| onTick | `() => void` | No | A callback function to be called on each specified interval of the countdown. |

### Returns

The `useCountDown` hook returns an array with two elements:

| Index       | Type       | Parameters        | Description                                                                                              |
| ----------- | ---------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `[0]`       | `number`   |                   | The current count of the countdown.                                                                      |
| `[1].start` | `function` | `(time?: number)` | Start and resume the countdown, also restart from the time (in milliseconds) indicated in the parameter. |
| `[1].reset` | `function` |                   | Resets the countdown to its initial setting.                                                             |
| `[1].stop`  | `function` |                   | Pause the countdown.                                                                                     |
