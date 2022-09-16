import Button, { useButton } from '@mark-ui/button';
import './button.css';

export default {
  title: 'Components/Button'
};

export const Base = () => <Button className='button'>Get Started</Button>;

export const UseButton = () => {
  const { buttonProps } = useButton({
    elemetType: 'button',
    className: 'button',
    onClick(e) {
      console.log('Click me!');
    }
  });

  return <button {...buttonProps}>Click me</button>;
};

export const Disabled = () => {
  return (
    <>
      <Button className='button' disabled>
        Get Started
      </Button>
    </>
  );
};

export const IsDisabled = () => {
  return (
    <>
      <Button className='button' isDisabled>
        Get Started
      </Button>
    </>
  );
};
