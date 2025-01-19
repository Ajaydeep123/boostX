import Image from 'next/image';
import ActionButton from '../common/ActionButton';
import { TextTag, Title } from '../common/Titles';
import { ButtonVariant } from '../../types/button.types';
import { featureItems } from '../../constants/landingpage.constants';

export default function Benefits(): JSX.Element {
  const AllFeatures = featureItems.map((feature, index) => (
    <div
      className={`flex w-full gap-8 rounded-2xl p-20 ${index % 2 !== 0 ? 'flex-row-reverse' : ''} bg-gradient-to-tl from-[#000] to-[#ffffff10]`}
      key={feature.tag}
    >
      <div className="grid flex-1 place-content-center gap-2">
        <div className="flex justify-start">
          <TextTag text={feature.tag} />
        </div>
        <div className="text-left text-[4em] font-bold">{feature.title}</div>
        <span className="text-left text-[#ffffff30]">{feature.desc}</span>
        <ActionButton text="Get Started" variant={ButtonVariant.ghost} />
      </div>

      <div className="relative grid flex-1 place-content-center">
        <Image
          alt="Benefit Image"
          className="h-full w-full"
          height={10}
          src={feature.image}
          width={500}
        />
      </div>
    </div>
  ));
  return (
    <div className="grid place-items-center p-4 px-20 text-center">
      <TextTag text="benefits" />
      <Title text="Instant Cost Savings" />
      <span className="textSecondary">
        By analyzing your current cloud usage, 100xBoost identifies areas where
        your'e overpaying and suggests optimizations to save you money without
        compromising on performance.
      </span>
      <div className="grid w-full gap-10 p-20">{AllFeatures}</div>
    </div>
  );
}
