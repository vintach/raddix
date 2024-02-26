# @raddix/use-count-down

## 1.1.3

### Patch Changes

- d3351a5: Update the url with the new domain of the documentation website

## 1.1.2

### Patch Changes

- 0a0204e: Update documentation links

## 1.1.1

### Patch Changes

- 890b202: Added `add()` action that adds time to the current countdown

## 1.1.0

### Minor Changes

- 4deba3c: Add isRunning and isFinished status indicators

## 1.0.0

### Major Changes

- 91f561e: The hook API has been changed because it now provides more flexibility and is easier to use.

  The isFinished value was temporarily removed, it will be re-incorporated in a future feature of this release.

## 0.1.1

### Patch Changes

- c1b91ef: Fixed execution of onFinished (it never got to execute when the countdown reached 0)

  Fixed execution of reset (doesn't start again from initialValue)

## 0.1.0

### Minor Changes

- 4ffccdb: Added the useCountDown hook
