import { BaseModal } from "@/common/components/modal";
import { UserInfo } from "../../components/user-info";
import { UserTransactionDetails } from "../../components/user-transaction-details";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        <div className="mb-10">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            User Settings
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 gap-x-20  ">
          <div className="md:flex-[0.3]">
            <UserInfo />
          </div>
          <div className="md:flex-[0.6]">
            <UserTransactionDetails />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
