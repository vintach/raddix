import { useButtonRoot, ButtonHookProps } from '@raddix/button';
import { PolymorphicComponent } from '@mark-types/polymorphic';
import { ElementType } from 'react';

type ButtonExample = PolymorphicComponent<'button', ButtonHookProps>;

export const ButtonExample = (props => {
  const { as, children, ...rest } = props;

  const Comp: ElementType = as || 'button';

  const { elementProps } = useButtonRoot({
    elementType: Comp,
    ...rest
  });

  return <Comp {...elementProps}>{children}</Comp>;
}) as ButtonExample;
