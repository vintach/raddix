import { HoverProps } from '@mark-hooks/usehover';
import { PressProps } from '@mark-hooks/usepress';
import { ElementType } from 'react';

export interface HookButtonProps
  extends Omit<HoverProps, 'disabled'>,
    Omit<PressProps, 'disabled'> {
  isDisabled?: boolean;
  disabled?: boolean;
  elemetType?: ElementType;
}
