import Logo from '../common/Logo';
import ActionButton from '../common/ActionButton';
import { ButtonVariant } from '../../types/button.types';

export default function Navigation() {
  return (
    <div className="z-50 flex h-full w-full items-center justify-between overflow-hidden bg-black p-4">
      <Logo />
      <div className="flex gap-4">
        <a>Customers</a>
        <a>Learn More</a>
        <a>Why Us</a>
        <a>Pricing</a>
      </div>
      <ActionButton arrow text="Get Started" variant={ButtonVariant.primary} />
    </div>
  );
}
