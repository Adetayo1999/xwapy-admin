import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { SectionComponent } from "../section-component";

export const UserTransactionDetails = () => {
  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-lg text-[#3B3838] font-semibold">
          User&apos;s Transactions
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <SectionComponent
          title="On-Ramp ($)"
          children={currencyFormatter(12430.23, "USD")}
        />
        <SectionComponent title="On-Ramp (count)" children={330} />
        <SectionComponent
          title="Off-Ramp ($)"
          children={currencyFormatter(12430.23, "USD")}
        />
        <SectionComponent title="Off-Ramp (count)" children={330} />
        <SectionComponent
          title="Av. Transaction"
          children={currencyFormatter(5000, "USD")}
        />
        <SectionComponent title="Date joined" children="12th May 2024" />
      </div>
    </div>
  );
};
