import { ArrowUpIcon } from '@radix-ui/react-icons';
import { ButtonVariant } from '../../types/button.types';

export default function ActionButton({
  text,
  variant = ButtonVariant.ghost,
  arrow = false,
  onClick,
  className = '',
}: {
  text: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const commonClasses = `flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold ${className} ${
    (variant === ButtonVariant.default || !variant) && 'border'
  } ${
    variant === ButtonVariant.ghost &&
    'border hover:bg-[--primaryColor] hover:text-black'
  } ${variant === ButtonVariant.primary && 'bg-[--primaryColor] text-black'} ${
    variant === ButtonVariant.secondary && 'border'
  }`;

  return (
    <button onClick={onClick} className={commonClasses}>
      {text}
      {arrow && <ArrowUpIcon className="rotate-45" />}
    </button>
  );
}
