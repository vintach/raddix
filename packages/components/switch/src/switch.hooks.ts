import { PolymorphicHook } from '@mark-types/polymorphic';

interface DisabledProps {
  disabled?: boolean;
}

interface CheckedProps {
  checked?: boolean;
}

export interface SwitchEvent extends CheckedProps {
  defaultChecked?: boolean;
  onChecked?(checked: boolean): void;
}

interface SwitchRootHookProps extends SwitchEvent, DisabledProps {
  required?: boolean;
  readOnly?: boolean;
  isDisabled?: boolean;
}

interface SwitchThumbHookProps extends CheckedProps, DisabledProps {}

export type SwitchRootHook = PolymorphicHook<'button', SwitchRootHookProps>;
export type SwitchThumbHook = PolymorphicHook<'span', SwitchThumbHookProps>;
