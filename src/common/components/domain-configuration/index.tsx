import { CustomToggle } from "@/common/components/custom-toggle";
import CustomButton from "@/common/components/forms/button";
import CustomInput from "@/common/components/forms/input";
import { toastError } from "@/common/helpers/error";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useCopyToClipboard } from "@/common/hooks/useClipBoardCopy";
import { requests } from "@/common/services/requests";
import { getUserThunk } from "@/common/store/reducers/userdata/thunk";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

export const DomainConfiguration: React.FC<{ type: "admin" | "reseller" }> = ({
  type,
}) => {
  const [error] = useState(false);
  const [isCustomDomainActive, setIsCustomDomainActive] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState(false);
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const [customDomain, setCustomDomain] = useState("");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { data } = useAppSelector((state) => state.userdata);

  const saveCustomDomain = async () => {
    try {
      setLoading(true);
      await requests.checkDomain({ type, domain_name: customDomain });
      await requests.saveDomain({ type, domain_name: customDomain });
      await dispatch(getUserThunk({ type })).unwrap();
      setIsDomainVerified(true);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.custom_domain) {
      setIsDomainVerified(true);
      setCustomDomain(data?.custom_domain);
      setIsCustomDomainActive(true);
    }
  }, [data]);

  return (
    <div className="">
      <div className="justify-between flex items-center mb-5">
        <h4 className="text-lg text-[#3B3838] font-semibold">
          Domain configuration
        </h4>
        {/* <CustomButton className="w-fit rounded-xl py-2 px-6 text-sm">
          Sync
        </CustomButton> */}
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
            {isDomainVerified || data?.custom_domain ? "Active" : "In-Active"}
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
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              </div>
              <CustomButton
                className="mb-1 text-sm w-fit rounded-xl"
                onClick={saveCustomDomain}
                disabled={!customDomain}
                isloading={loading}
              >
                Check
              </CustomButton>
            </div>
          </AnimatePresence>
        ) : null}
        {isCustomDomainActive && isDomainVerified ? (
          <div className="flex flex-col gap-y-8">
            <div className="flex gap-x-3 items-center">
              <button className="outline-none transition-all duration-200 text-base border rounded-2xl  py-3 h-[2.5rem] md:h-[3rem]   border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:ring-opacity-40  px-5 min-w-[20rem] text-left">
                {customDomain || data?.custom_domain}
              </button>
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-x-2",
                  isCopied ? "animate-pulse text-green-500" : "text-[#4D4D4D]"
                )}
                disabled={!(customDomain || data?.custom_domain)}
                onClick={() =>
                  copyToClipboard(customDomain || data?.custom_domain || "")
                }
              >
                {isCopied ? (
                  <BsCheckAll className="text-2xl" />
                ) : (
                  <span>
                    <IoCopyOutline className="text-xl" />
                  </span>
                )}
              </button>
              {!data?.custom_domain ? (
                <button
                  className="ml-4 text-red-500 font-semibold text-sm"
                  onClick={() => {
                    setIsDomainVerified(false);
                  }}
                >
                  Remove Domain
                </button>
              ) : null}
            </div>
            {!data?.custom_domain ? (
              <div className="">
                <p className="text-sm text-[#727272] font-medium mb-2">
                  Kindly add the following details to the DNS record of your
                  custom domain.
                </p>
                <table className="w-full text-sm">
                  <thead className="text-left">
                    <tr>
                      <th className="pb-6"></th>
                      <th className="pb-6 font-semibold text-[#14AD6D]">
                        Type
                      </th>
                      <th className="pb-6 font-semibold text-[#14AD6D]">
                        Host
                      </th>
                      <th className="pb-6 font-semibold text-[#14AD6D]">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.meta_data?.domain_config?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                          {idx + 1}
                        </td>
                        <td className="flex items-center gap-x-3 whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                          <span>{item.name}</span>
                          {/* <span>
                          {item.verified && (
                            <FaCheck className="text-[#14AD6D]" />
                          )}
                        </span> */}
                        </td>
                        <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                          <DomainComponent value={item.host} />
                        </td>
                        <td className="whitespace-nowrap pr-[2rem] pb-6 text-left font-medium text-[#727272]">
                          <DomainComponent value={item.val_ip} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
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

// const MOCK_DOMAIN_CONFIG = [
//   {
//     id: 1,
//     type: "A Record",
//     name: "1.22.241.01",
//     value: "1.22.241.01",
//     verified: true,
//   },
//   {
//     id: 2,
//     type: "CName Record",
//     name: "www",
//     value: "domain.useinclude.com",
//     verified: false,
//   },
//   {
//     id: 3,
//     type: "CName Record",
//     name: "custom domain",
//     value: "domain.useinclude.com",
//     verified: false,
//   },
// ];
