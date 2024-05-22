import { BaseModal } from "@/common/components/modal";
import { UserInfo } from "../../components/user-info";
import { UserTransactionDetails } from "../../components/user-transaction-details";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useCallback, useEffect, useState } from "react";
import { getUserSettingsThunk } from "@/common/store/reducers/users/thunk";
import { UserSettingsDataType } from "@/common/types";
import { MoonLoader } from "react-spinners";

export default function UserSettings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettingsDataType | null>(
    null
  );

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
          getUserSettingsThunk({ user_reference: id })
        );
        setUserSettings(response.payload);
      } catch (error) {
        handleClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [id, dispatch, handleClose]);

  return (
    <BaseModal handleClose={handleClose}>
      <div className="">
        <div className="mb-10">
          <h1 className="font-bold text-xl md:text-2xl text-[#3B3838] ">
            User Settings
          </h1>
        </div>
        {!userSettings || loading ? (
          <div className="h-[20rem] flex justify-center items-center flex-col animate-pulse gap-y-2">
            <MoonLoader size={30} />
            <p>Loading...</p>
          </div>
        ) : null}
        {userSettings ? (
          <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 gap-x-20  ">
            <div className="md:flex-[0.3]">
              <UserInfo user_settings={userSettings} />
            </div>
            <div className="md:flex-[0.6]">
              <UserTransactionDetails user_settings={userSettings} />
            </div>
          </div>
        ) : null}
      </div>
    </BaseModal>
  );
}
