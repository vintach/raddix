import type { CheckboxInputAttributes } from './checkboxv2.types';

export const Checkbox: React.FC<CheckboxInputAttributes> = props => {
  const { onChange, onClick, className, ...restProps } = props;

  return (
    <input
      {...restProps}
      type='checkbox'
      className={className}
      onChange={onChange}
      onClick={onClick}
    />
  );
};
