import { SectionComponent } from "../section-component";
import { UserSettingsDataType } from "@/common/types";
import { getKYCStyles } from "@/common/helpers/tables/users";

export const UserInfo: React.FC<{
  user_settings: UserSettingsDataType;
}> = ({ user_settings }) => {
  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-lg text-[#3B3838] font-semibold">
          User&apos;s info
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-y-5">
        <SectionComponent
          title="Full name"
          children={user_settings.full_name}
        />
        <SectionComponent title="Email" children={user_settings.email} />
        <SectionComponent title="Phone" children={user_settings.phone} />
        <SectionComponent
          title="Custom domain"
          children={user_settings.custom_domain}
        />
        <SectionComponent title="KYC-Status">
          <button
            className={`${getKYCStyles(
              user_settings.kyc_status
            )} text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize`}
          >
            {user_settings.kyc_status.replace("_", " ")?.toLowerCase()}
          </button>
        </SectionComponent>
        <SectionComponent title="User-Status">
          <div className="flex gap-x-5 items-center">
            <button
              className={`${getKYCStyles(
                user_settings.user_status
              )} text-xs px-4 py-2 text-[#000000] font-semibold rounded-xl min-w-20 capitalize`}
            >
              {user_settings.user_status.replace("_", " ")?.toLowerCase()}
            </button>
            {/* <CustomToggle /> */}
          </div>
        </SectionComponent>
      </div>
    </div>
  );
};
