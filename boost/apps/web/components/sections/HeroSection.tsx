import ActionButton from '../common/ActionButton';
import Image from 'next/image';
import { TextTag } from '../common/Titles';
import { ButtonVariant } from '../../types/button.types';
import Link from 'next/link';
export default function HeroSection() {
  return (
    <div className="relative grid place-content-center bg-gradient-to-tr from-[#000] to-[#262724] px-24 pt-40">
      {/* Todo : Dotted background */}
      <TextTag text="AWS on Steroids" />
      <div className="grid place-content-center font-mono text-[3.5em] font-semibold">
        <span className="grid place-content-center">{'Why pay more?'}</span>
        <span className="grid place-content-center">
          {'The cloud just got way cheaper!'}
        </span>
      </div>
      <div className="font-semibold text-[#858584]">
        <span className="grid place-content-center">Spend less, do more.</span>
        <span className="grid place-content-center">
          Unlock hidden savings in your cloud, effortlessly.
        </span>
      </div>
      <div className="flex justify-center gap-4 p-10">
        <ActionButton text="View Demo" variant={ButtonVariant.ghost} />
        <Link href="/auth">
          <ActionButton
            text="Get Started"
            arrow
            variant={ButtonVariant.primary}
          />
        </Link>
      </div>

      <div className="bg-transparent p-10">
        <Image
          alt="DashBoard"
          src={'/Dashboard.png'}
          width={100}
          height={100}
          className="h-full w-full overflow-hidden rounded-3xl"
        />
      </div>
    </div>
  );
}
