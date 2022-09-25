import Button, { useButton } from '@mark-ui/button';
import './button.css';

export default {
  title: 'Components/Button'
};

export const Base = () => {
  const { elementProps } = useButton({
    className: 'button'
  });

  return (
    <>
      <h2>Default</h2>
      <Button className='button'>Get Started</Button>
      <h2>Con useButton</h2>
      <button {...elementProps}>Click me</button>
      <h2>Cambiando el atributo as='input'</h2>
      <Button className='button' as={'input'} value={'Get Started'} />
    </>
  );
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
