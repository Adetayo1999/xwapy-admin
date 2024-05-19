import { CustomToggle } from "@/common/components/custom-toggle";
import CustomButton from "@/common/components/forms/button";
import CustomInput from "@/common/components/forms/input";
import { useCopyToClipboard } from "@/common/hooks/useClipBoardCopy";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

export const DomainConfiguration = () => {
  const [error] = useState(false);
  const [isCustomDomainActive, setIsCustomDomainActive] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState(false);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="">
      <div className="justify-between flex items-center mb-5">
        <h4 className="text-lg text-[#3B3838] font-semibold">
          Domain configuration
        </h4>
        <CustomButton className="w-fit rounded-xl py-2 px-6 text-sm">
          Sync
        </CustomButton>
      </div>
      <div className="flex flex-col gap-y-2 mb-6">
        <h4 className=" text-[#5C5C60] font-bold">Configure Customer Domain</h4>
        {error ? (
          <p className="text-sm text-[#E41D1D] font-medium">
            Unable to verify your domain, kindly ensure you configure the below
            settings properly in domain DNS Settings
          </p>
        ) : null}
      </div>
      <div className="">
        <div className="flex items-center gap-x-10 mb-6">
          <CustomToggle
            label="Custom Domain"
            checked={isCustomDomainActive}
            onChange={(e) => setIsCustomDomainActive(e.target.checked)}
          />
          <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
            In-Active
          </button>
        </div>
        {isCustomDomainActive && !isDomainVerified ? (
          <AnimatePresence>
            <div className="flex gap-x-5 items-end mb-5 w-full md:w-[70%]">
              <div className="flex-1">
                <CustomInput
                  label="Domain name"
                  showError={false}
                  placeholder="www.fuspay.us"
                />
              </div>
              <CustomButton
                className="mb-1 text-sm w-fit rounded-xl"
                onClick={() => setIsDomainVerified(true)}
              >
                Check
              </CustomButton>
            </div>
            <p className="text-sm text-[#727272] font-medium mb-2">
              Kindly add the following details to the DNS record of your custom
              domain.
            </p>
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr>
                  <th className="pb-6"></th>
                  <th className="pb-6 font-semibold text-[#14AD6D]">Type</th>
                  <th className="pb-6 font-semibold text-[#14AD6D]">Name</th>
                  <th className="pb-6 font-semibold text-[#14AD6D]">Value</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DOMAIN_CONFIG.map((item, idx) => (
                  <tr key={idx}>
                    <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                      {idx + 1}
                    </td>
                    <td className="flex items-center gap-x-3 whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                      <span>{item.type}</span>
                      <span>
                        {item.verified && (
                          <FaCheck className="text-[#14AD6D]" />
                        )}
                      </span>
                    </td>
                    <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                      <DomainComponent value={item.name} />
                    </td>
                    <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                      <DomainComponent value={item.value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AnimatePresence>
        ) : null}
        {isCustomDomainActive && isDomainVerified ? (
          <div className="flex gap-x-3 items-center">
            <button className="outline-none transition-all duration-200 text-base border rounded-2xl  py-3 h-[2.5rem] md:h-[3rem]   border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:ring-opacity-40  px-5 min-w-[20rem] text-left">
              https://bullafric.xwapy.com
            </button>
            <button
              type="button"
              className={clsx(
                "flex items-center gap-x-2",
                isCopied ? "animate-pulse text-green-500" : "text-[#4D4D4D]"
              )}
              onClick={() => copyToClipboard("https://bullafric.xwapy.com")}
            >
              {isCopied ? (
                <BsCheckAll className="text-2xl" />
              ) : (
                <span>
                  <IoCopyOutline className="text-xl" />
                </span>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const DomainComponent: React.FC<{
  value: string;
}> = ({ value }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div className="flex items-center  gap-x-4">
      <p className="max-w-[40%] md:max-w-[80%] truncate  font-medium text-[#727272]">
        {value}
      </p>
      <button
        type="button"
        className={clsx(
          "text-90 flex items-center gap-x-2",
          isCopied ? "animate-pulse text-green-10" : "text-gray-30"
        )}
        onClick={() => copyToClipboard(value)}
      >
        {isCopied ? (
          <BsCheckAll className="text-2xl" />
        ) : (
          <span>
            <IoCopyOutline className="text-xl" />
          </span>
        )}
      </button>
    </div>
  );
};

const MOCK_DOMAIN_CONFIG = [
  {
    id: 1,
    type: "A Record",
    name: "1.22.241.01",
    value: "1.22.241.01",
    verified: true,
  },
  {
    id: 2,
    type: "CName Record",
    name: "www",
    value: "domain.useinclude.com",
    verified: false,
  },
  {
    id: 3,
    type: "CName Record",
    name: "custom domain",
    value: "domain.useinclude.com",
    verified: false,
  },
];
