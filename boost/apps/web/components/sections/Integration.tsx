import ActionButton from '../common/ActionButton';
import { AWSservices } from '../../constants/landingpage.constants';
import { TextTag } from '../common/Titles';

export default function Integration() {
  return (
    <div>
      <div className={'flex w-full gap-8 p-20'}>
        <div className="grid flex-1 place-content-center gap-2">
          <div className="flex justify-start">
            <TextTag text={'integration'} />
          </div>
          <div className="text-left text-[4em] font-bold">
            {'Empowering Your Cloud Experience with AWS'}
          </div>
          <span className="text-left text-[#ffffff30]">
            {
              'At 100xBoost, we support a range of Amazon Web Services (AWS) to deliver scalable, efficient, and cost-effective cloud solutions tailored to your needs. Discover the key AWS services we utilize to enhance your business operations.'
            }
          </span>
          <ActionButton text="Get Started" />
        </div>

        <div className="relative grid flex-1 place-content-center">
          <AWSServicesGrid />
        </div>
      </div>
    </div>
  );
}

const AWSServicesGrid = () => {
  const ServiceCards = AWSservices.map((service, index) => (
    <div className="rounded-2xl bg-[#151516] p-4" key={index}>
      <div className="mb-2">
        <service.icon />
      </div>
      <div className="text-lg text-white">{service.name}</div>
      <p className="text-sm text-[#ffffff40]">{service.description}</p>
    </div>
  ));
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-3 gap-6">{ServiceCards}</div>
    </div>
  );
};
