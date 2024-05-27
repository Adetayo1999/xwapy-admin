import {
  OverviewDataType,
  ResellerSettingsDataType,
  SellerDataType,
  TransactionDataType,
  TransactionGroupDataType,
  UserDataType,
  UserSettingsDataType,
} from "../types";

export type APIResponseSuccessModel<P> = {
  data: P;
  message: string;
  success: true;
};
export type APIResponseErrorModel = {
  data?: null;
  message?: string;
  error?: string;
};

export interface LoginRequestBodyType {
  email: string;
  password: string;
}

export type LoginResponseType = APIResponseSuccessModel<{
  token: string;
}>;

export type GetOverviewResponseType = APIResponseSuccessModel<OverviewDataType>;

export type ListTransactionsRequestType = Partial<{
  filter: "recent";
}>;

export type ListTransactionsResponseType = APIResponseSuccessModel<{
  list: TransactionDataType[];
}>;

export type GetResellersResponseType = APIResponseSuccessModel<{
  list: SellerDataType[];
}>;

export type GetResellersSettingsRequestType = {
  user_reference: string;
};

export type GetResellersSettingsResponseType =
  APIResponseSuccessModel<ResellerSettingsDataType>;

export type CreateResellerRequestType = {
  fname: string;
  email: string;
  description: string;
  sub_domain: string;
  logo: string;
  primary_color: string;
  text_color: string;
  secondary_color: string;
  domain_name: string;
  support_channel_url: string;
};

export type CreateResellerResponseType = APIResponseSuccessModel<null>;

export type SaveSellerSettingsRequestBodyType = {
  primary_color: string;
  text_color: string;
  secondary_color: string;
  on_ramp_fee_percent: string;
  off_ramp_fee_percent: string;
  fuspay_intrapay_merchant_id: string;
  xwap_on_ramp_fee_percent?: string;
  xwap_off_ramp_fee_percent?: string;
};

export type SaveSellerSettingsRequestType = Partial<{
  filter: "color" | "price";
}>;

export type SaveSellerSettingsResponseType = APIResponseSuccessModel<null>;

export type GetTransactionGroupRequestType = Partial<{
  filter: string;
  country_name: string;
}>;

export type GetTransactionGroupResponseType = APIResponseSuccessModel<{
  list: TransactionGroupDataType[];
}>;

export type GetUsersRequestType = Partial<{
  filter: string;
  country_name: string;
}>;

export type GetUsersResponseType = APIResponseSuccessModel<{
  list: UserDataType[];
}>;

export type GetUsersSettingsRequestType = {
  user_reference: string;
};

export type GetUsersSettingsResponseType =
  APIResponseSuccessModel<UserSettingsDataType>;
