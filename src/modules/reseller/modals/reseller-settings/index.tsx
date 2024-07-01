import { BaseModal } from "@/common/components/modal";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { MoonLoader } from "react-spinners";
import { SectionComponent } from "@/common/components/section-component";
import { PriceConfiguration } from "@/common/components/price-configuration";
import { DomainConfiguration } from "@/common/components/domain-configuration";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { BrandingConfiguration } from "@/common/components/branding-configuration";
import { ReferralBonusConfiguration } from "@/common/components/referral-bonus-configuration";

export default function ResellerSettings() {
  const navigate = useNavigate();
  const { data, loading } = useAppSelector((state) => state.userdata);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        {!data && loading ? (
          <div className="h-[20rem] flex justify-center items-center flex-col animate-pulse gap-y-2">
            <MoonLoader size={30} />
            <p>Loading...</p>
          </div>
        ) : null}
        {data ? (
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between items-start">
            <div className="md:flex-[0.3]">
              <div className=" flex justify-between items-center mb-10">
                <h1 className="font-bold text-xl md:text-2xl text-[#3B3838]">
                  Reseller Settings
                </h1>
              </div>
              <div className="mb-6">
                <h4 className="text-lg text-[#3B3838] font-semibold">
                  Reseller&apos;s info
                </h4>
              </div>

              <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-y-3">
                  <SectionComponent
                    title="Full name"
                    children={`${data.first_name} ${data.last_name}`}
                  />
                  <SectionComponent title="Email" children={data.email} />
                  {/* <SectionComponent title="Phone" children={"NIL"} /> */}
                  {data.custom_domain && (
                    <SectionComponent
                      title="Custom domain"
                      children={data.custom_domain}
                    />
                  )}
                  {data.sub_domain ? (
                    <SectionComponent
                      title="Mapped Sub-domain"
                      children={`${data.sub_domain}.xwapy.com`}
                    />
                  ) : null}
                </div>
                <BrandingConfiguration />
              </div>
            </div>
            <div className="md:flex-[0.65] flex gap-y-10 flex-col ">
              {/* <div className="flex items-center gap-x-6">
                <CustomToggle label="Reseller Status" />
                <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
                  In-Active
                </button>
              </div> */}
              <DomainConfiguration type="reseller" />
              <PriceConfiguration type="reseller" />
              <ReferralBonusConfiguration type="reseller" />
            </div>
          </div>
        ) : null}
      </div>
    </BaseModal>
  );
}
