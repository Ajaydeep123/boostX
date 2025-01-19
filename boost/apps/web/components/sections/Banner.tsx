import Image from 'next/image';
import ActionButton from '../common/ActionButton';
import { Title } from '../common/Titles';
import { ButtonVariant } from '../../types/button.types';

const Banner = () => {
  return (
    <div className="rounded-xl p-20 pt-10">
      <div className="mt-10 h-full gap-2 rounded-3xl bg-gradient-to-tr from-black to-[#ffffff20] pt-10 text-center">
        <Title text="Stop overpaying for the cloud, 100x your savings today!" />
        <div className="flex justify-center p-4">
          <ActionButton
            text="Get Started"
            arrow
            variant={ButtonVariant.primary}
          />
        </div>
        <div className="mt-10 px-14">
          <Image
            alt="DashBoard"
            className="h-full w-full overflow-hidden rounded-3xl"
            height={100}
            src="/DashBoard.png"
            width={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
