import type { InputHTMLAttributes } from 'react';

export type CheckboxInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue'
> & { className?: string; onClick?: () => void; onChange?: () => void };
