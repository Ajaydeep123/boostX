'use client';
import Image from 'next/image';
import { TextTag, Title } from '../common/Titles';
import ActionButton from '../common/ActionButton';
import { ButtonVariant } from '../../types/button.types';

export default function WorkSection() {
  return (
    <div className="grid place-content-center p-32 text-center">
      <TextTag text="working" />
      <Title text="How 100xBoost Saves You Money" />
      <span className="px-80 text-xl text-[#ffffff30]">
        At 100xBoost, we combine cutting-edge technology with smart strategies
        to make cloud services more affordable without sacrificing performance.
      </span>
      <div className="grid place-content-center p-8">
        <ActionButton text="Learn More" variant={ButtonVariant.ghost} />
      </div>

      <div className="grid grid-cols-2 place-content-center gap-10 p-32">
        <div
          className="relative row-span-2 grid h-[65vh] place-content-start gap-4 overflow-hidden rounded-2xl p-4"
          style={{
            boxShadow: 'inset 2px 2px 20px 10px #191919',
          }}
        >
          <span className="text-xl font-bold">{'Group Saving Model'}</span>
          <span className="text-[#ffffff30]">
            We leverage the power of collective bargaining by pooling multiple
            customers together. This allows us to negotiate better pricing from
            cloud providers like AWS, passing the savings directly to you. By
            using this group savings model, you pay significantly less for the
            same cloud resources that large enterprises benefit from.
          </span>
          <Image
            src={'/groupsavings.png'}
            alt="Group Buying"
            width={0}
            height={0}
            className="absolute bottom-0 h-full w-full"
          />
        </div>

        <div
          className="row-span-1 grid gap-4 rounded-2xl p-4"
          style={{
            boxShadow: 'inset 2px 2px 20px 10px #ffffff10',
          }}
        >
          <span className="text-xl font-bold">{'Group Saving Model'}</span>
          <span className="text-[#ffffff30]">
            We leverage the power of collective bargaining by pooling multiple
            customers together. This allows us to negotiate better pricing from
            cloud providers like AWS, passing the savings directly to you. By
            using this group savings model, you pay significantly less for the
            same cloud resources that large enterprises benefit from.
          </span>
        </div>

        <div
          className="row-span-1 grid gap-4 rounded-2xl p-4"
          style={{
            boxShadow: 'inset 2px 2px 20px 10px #ffffff10',
          }}
        >
          <span className="text-xl font-bold">{'Group Saving Model'}</span>
          <span className="text-[#ffffff30]">
            We leverage the power of collective bargaining by pooling multiple
            customers together. This allows us to negotiate better pricing from
            cloud providers like AWS, passing the savings directly to you. By
            using this group savings model, you pay significantly less for the
            same cloud resources that large enterprises benefit from.
          </span>
        </div>
      </div>
    </div>
  );
}
