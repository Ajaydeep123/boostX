import Image from 'next/image';
import { TextTag, Title } from '../common/Titles';
import { ArrowUpRightIcon } from 'lucide-react';
import { BoostServices } from '../../constants/landingpage.constants';

const Services = BoostServices.map((item) => (
  <div
    className="grid cursor-pointer gap-4 rounded-xl p-4 text-left transition-all duration-500 ease-in-out hover:shadow-md hover:shadow-[#ffffff10]"
    key={item.title}
  >
    <Image
      alt="Feature image"
      className="h-12 w-20 overflow-hidden rounded-md"
      height={100}
      src={item.image}
      width={100}
    />
    <span className="text-xl font-bold">{item.title}</span>
    <span className="text-[#ffffff40]">{item.description}</span>
    <a
      className="flex items-center gap-2 p-2 hover:underline"
      href={item.pageLink}
    >
      Learn More
      <ArrowUpRightIcon fontSize={16} />
    </a>
  </div>
));

export default function FeatureSection(): JSX.Element {
  return (
    <div className="grid place-content-center bg-gradient-to-tl from-[#000] to-[#262724] px-24 pt-20 text-center">
      <TextTag text="FEATURES" />
      <div className="px-32">
        <Title text="Discover the Power of 100xBoost: Features Built for Cloud Optimization" />
        <div className="flex justify-center px-32 text-xl text-[#ffffff40]">
          100xBoost offers powerful tools to optimize your cloud usage and
          reduce costs. With seamless AWS integration, real-time insights,
          automated resource optimization, and group buying power, it simplifies
          cloud management while maximizing savings. Take control of your cloud
          infrastructure effortlessly and boost your efficiency 100x!
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-3">
        {Services}
      </div>
    </div>
  );
}
