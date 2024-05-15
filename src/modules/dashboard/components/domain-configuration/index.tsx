import CustomButton from "@/common/components/forms/button";
import { useCopyToClipboard } from "@/common/hooks/useClipBoardCopy";
import clsx from "clsx";
import { useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

export const DomainConfiguration = () => {
  const [error] = useState(false);

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
      <div className="flex flex-col gap-y-2 mb-4">
        <h4 className=" text-[#5C5C60] font-bold">Configure Customer Domain</h4>
        {error ? (
          <p className="text-sm text-[#E41D1D] font-medium">
            Unable to verify your domain, kindly ensure you configure the below
            settings properly in domain DNS Settings
          </p>
        ) : null}
        <p className="text-sm text-[#727272] font-medium">
          Kindly add the following details to the DNS record of your custom
          domain.
        </p>
      </div>
      <div className="">
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
                    {item.verified && <FaCheck className="text-[#14AD6D]" />}
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
      <p className="max-w-[80%] truncate  font-medium text-[#727272]">
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
