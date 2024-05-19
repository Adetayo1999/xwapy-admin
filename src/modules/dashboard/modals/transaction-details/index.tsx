import { CustomToggle } from "@/common/components/custom-toggle";
import { BaseModal } from "@/common/components/modal";
import { useNavigate } from "react-router-dom";
import { SectionComponent } from "../../components/section-component";
import { currencyFormatter } from "@/common/helpers/currency-formatter";

export default function TransactionDetails() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <BaseModal handleClose={handleClose}>
      <div className="pb-6">
        <div className="mb-10 flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-20 md:items-center">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            Transaction Details
          </h1>
          <div className="flex gap-x-6 justify-between md:justify-start items-center">
            <CustomToggle label="User Status" />
            <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
              Inactive
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-4">
          <SectionComponent title="Payer's name" children="Charles Avis" />
          <SectionComponent
            title="Amount"
            children={currencyFormatter(12430.23, "USD")}
          />
          <SectionComponent title="Bank" children="Globus Bank" />
          <SectionComponent title="Type" children="On-ramp" />
          <SectionComponent
            title="Rate"
            children={currencyFormatter(12430.23, "USD")}
          />
          <SectionComponent
            title="Fiat Amount"
            children={currencyFormatter(12000, "NGN")}
          />
          <SectionComponent title="Reference" children="ON_R08101018131" />
          <SectionComponent title="Reseller" children="Charles Teslim" />
          <SectionComponent children="www.onxwapy.com" title="Custom domain" />
          <SectionComponent
            title="Timestamp"
            children="10:02PM 12th May 2024"
          />
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
        <div className="">
          <p className="text-sm text-[#E16C00]">
            All transaction of users without kyc are <br /> pending till kyc is
            done.
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
