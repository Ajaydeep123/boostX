import { CircleIcon } from '@radix-ui/react-icons';
import { TitleVariant } from '../../types/title.types';

export function Title({
  text,
  size = TitleVariant.xl,
}: {
  text: string;
  size?: TitleVariant;
}) {
  return (
    <span
      className={`text-center font-bold ${size === TitleVariant.sm && 'text-[2em]'} ${size === TitleVariant.md && 'text-[3em]'} ${size === TitleVariant.xl && 'text-[4em]'}`}
    >
      {text}
    </span>
  );
}

export function TextTag({ text }: { text: string }) {
  return (
    <div className="flex justify-center">
      <span className="flex items-center gap-3 rounded-md bg-[#313230] px-2 py-0 font-mono text-[#ffffff80]">
        <CircleIcon className="h-1 w-1 rounded-full bg-green-400" />
        {text.toUpperCase()}
      </span>
    </div>
  );
}
