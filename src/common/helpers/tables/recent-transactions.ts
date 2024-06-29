import { TRANSACTION_STATUS_TYPES } from "@/common/types";

export const column = [
  {
    Header: "Reseller",
    accessor: "reseller",
  },
  {
    Header: "Reference",
    accessor: "reference",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Fee",
    accessor: "fee",
  },
  {
    Header: "Fiat Sum",
    accessor: "fiat_sum",
  },
  {
    Header: "Txn Details",
    accessor: "txn_details",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Date",
    accessor: "date",
  },
];

export const data = [
  {
    reseller: "Charles Avis",
    reference: "GHS-120520223123453",
    amount: 12000,
    currency: "USD",
    fee: 23.43,
    fiat_sum: 12000,
    fiat_currency: "NGN",
    date: "12th May 2023, 12:00pm",
  },
  {
    reseller: "Charles Avis",
    reference: "GHS-120520223123453",
    amount: 12000,
    currency: "USD",
    fee: 23.43,
    fiat_sum: 12000,
    fiat_currency: "NGN",
    date: "12th May 2023, 12:00pm",
  },
  {
    reseller: "Charles Avis",
    reference: "GHS-120520223123453",
    amount: 12000,
    currency: "USD",
    fee: 23.43,
    fiat_sum: 12000,
    fiat_currency: "NGN",
    date: "12th May 2023, 12:00pm",
  },
  {
    reseller: "Charles Avis",
    reference: "GHS-120520223123453",
    amount: 12000,
    currency: "USD",
    fee: 23.43,
    fiat_sum: 12000,
    fiat_currency: "NGN",
    date: "12th May 2023, 12:00pm",
  },
];

export const getTransactionStatusStyles = (
  status: TRANSACTION_STATUS_TYPES
) => {
  switch (status) {
    case "INITIATED":
      return "bg-yellow-100";

    case "COMPLETED":
      return "bg-[#E3F5D3]";

    case "PENDING":
    case "PENDING_KYC_ISSUE":
      return "bg-[#FEEEDF]";

    default:
      return "bg-gray-500";
  }
};
