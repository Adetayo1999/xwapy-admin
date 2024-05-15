import { CustomToggle } from "@/common/components/custom-toggle";
import { SectionComponent } from "../section-component";

export const UserInfo = () => {
  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-lg text-[#3B3838] font-semibold">
          User&apos;s info
        </h2>
      </div>
      <div className="flex flex-col gap-y-5">
        <SectionComponent title="Full name" children="Charles Avis" />
        <SectionComponent
          title="Email"
          children="talktoavischarles@gmail.com"
        />
        <SectionComponent title="Phone" children="08101018131" />
        <SectionComponent title="Custom domain" children="www.onxwapy.com" />
        <SectionComponent title="KYC-Status">
          <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
            Inactive
          </button>
        </SectionComponent>
        <SectionComponent title="User-Status">
          <div className="flex gap-x-5 items-center">
            <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
              Inactive
            </button>
            <CustomToggle />
          </div>
        </SectionComponent>
      </div>
    </div>
  );
};
