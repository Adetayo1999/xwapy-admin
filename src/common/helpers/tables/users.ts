export const columns = [
  {
    Header: "Full Name",
    accessor: "full_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "KYC",
    accessor: "kyc",
  },
  {
    Header: "On-ramp",
    accessor: "on_ramp",
  },
  {
    Header: "Off-ramp",
    accessor: "off_ramp",
  },
  {
    Header: "Settings",
    accessor: "settings",
  },
];

export const data = [
  {
    full_name: "Charles Avis",
    email: "mail.avischarles@gmail.com",
    phone: "07045274781",
    kyc: "inactive",
    on_ramp: 12443.89,
    off_ramp: 2783.03,
    currency: "USD",
  },
  {
    full_name: "Charles Avis",
    email: "mail.avischarles@gmail.com",
    phone: "07045274781",
    kyc: "active",
    on_ramp: 12443.89,
    off_ramp: 2783.03,
    currency: "USD",
  },
  {
    full_name: "Charles Avis",
    email: "mail.avischarles@gmail.com",
    phone: "07045274781",
    kyc: "inactive",
    on_ramp: 12443.89,
    off_ramp: 2783.03,
    currency: "USD",
  },
  {
    full_name: "Charles Avis",
    email: "mail.avischarles@gmail.com",
    phone: "07045274781",
    kyc: "active",
    on_ramp: 12443.89,
    off_ramp: 2783.03,
    currency: "USD",
  },
  {
    full_name: "Charles Avis",
    email: "mail.avischarles@gmail.com",
    phone: "07045274781",
    kyc: "inactive",
    on_ramp: 12443.89,
    off_ramp: 2783.03,
    currency: "USD",
  },
];

export const getKYCStyles = (kyc: string) => {
  switch (kyc) {
    case "ACTIVE":
      return "bg-[#E3F5D3]";

    default:
      return "bg-[#FEEEDF]";
  }
};
