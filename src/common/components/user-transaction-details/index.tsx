import { currencyFormatter } from "@/common/helpers/currency-formatter";
import { SectionComponent } from "../section-component";
import { UserSettingsDataType } from "@/common/types";

export const UserTransactionDetails: React.FC<{
  user_settings: UserSettingsDataType;
}> = ({ user_settings }) => {
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
          children={currencyFormatter(Number(user_settings.on_ramp), "USD")}
        />
        <SectionComponent
          title="On-Ramp (count)"
          children={user_settings.on_ramp_count}
        />
        <SectionComponent
          title="Off-Ramp ($)"
          children={currencyFormatter(Number(user_settings.off_ramp), "USD")}
        />
        <SectionComponent
          title="Off-Ramp (count)"
          children={user_settings.off_ramp_count}
        />
        <SectionComponent
          title="Av. Transaction"
          children={currencyFormatter(Number(user_settings.avg_txn), "USD")}
        />
        <SectionComponent
          title="Date joined"
          children={user_settings.date_joined}
        />
      </div>
    </div>
  );
};
