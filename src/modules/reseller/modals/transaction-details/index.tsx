import { CustomToggle } from "@/common/components/custom-toggle";
import { BaseModal } from "@/common/components/modal";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { SectionComponent } from "@/common/components/section-component";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { getTransactionDetailsThunk } from "@/common/store/reducers/transaction-details/thunk";
import { MoonLoader } from "react-spinners";

interface TransactionDetailsType {
  order_no: string;
  payer_name: string;
  amount: number;
  currency: string;
  bank: string;
  type: number;
  rate: string;
  fiat_amount: string;
  reference: string;
  reseller: string;
  custom_domain: string;
  timestamp: string;
}

export default function TransactionDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetailsType | null>(null);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          getTransactionDetailsThunk({ order_no: id, type: "reseller" })
        );
        setTransactionDetails(response.payload);
      } catch (error) {
        handleClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [id, dispatch, handleClose]);

  return (
    <BaseModal handleClose={handleClose}>
      <div className="pb-6">
        <div className="mb-10 flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-20 md:items-center">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            Transaction Details
          </h1>
          {transactionDetails && (
            <div className="flex gap-x-6 justify-between md:justify-start items-center">
              <CustomToggle label="User Status" />
              <button className="bg-[#FEEEDF] text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize">
                Inactive
              </button>
            </div>
          )}
        </div>

        {loading || !transactionDetails ? (
          <div className="h-[20rem] flex justify-center items-center flex-col animate-pulse gap-y-2">
            <MoonLoader size={30} />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-4">
              <SectionComponent
                title="Payer's name"
                children={transactionDetails.payer_name}
              />
              <SectionComponent
                title="Amount"
                children={currencyFormatter(transactionDetails.amount, "USD")}
              />
              <SectionComponent
                title="Bank"
                children={transactionDetails.bank}
              />
              <SectionComponent
                title="Type"
                children={transactionDetails.type}
              />
              <SectionComponent
                title="Rate"
                children={currencyFormatter(
                  Number(transactionDetails.rate),
                  "USD"
                )}
              />
              <SectionComponent
                title="Fiat Amount"
                children={currencyFormatter(
                  Number(transactionDetails.fiat_amount),
                  "NGN"
                )}
              />
              <SectionComponent
                title="Reference"
                children={transactionDetails.reference}
              />
              <SectionComponent
                title="Reseller"
                children={transactionDetails.reseller}
              />
              <SectionComponent
                children={transactionDetails.custom_domain}
                title="Custom domain"
              />
              <SectionComponent
                title="Timestamp"
                children={transactionDetails.timestamp}
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
                All transaction of users without kyc are <br /> pending till kyc
                is done.
              </p>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}
