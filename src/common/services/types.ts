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

export interface BaseRequestType {
  type: "admin" | "reseller";
}

export interface LoginRequestBodyType extends BaseRequestType {
  email: string;
  password: string;
}

export type LoginResponseType = APIResponseSuccessModel<{
  token: string;
  data: {
    token: string;
  };
}>;

export type GetOverviewResponseType = APIResponseSuccessModel<OverviewDataType>;

export type ListTransactionsRequestType = Partial<{
  filter: "recent";
  trade_type: "on_ramp" | "off_ramp";
  sort_by: "completed" | "pending";
}> &
  BaseRequestType;

export type ListTransactionsResponseType = APIResponseSuccessModel<{
  list: TransactionDataType[];
}>;

export type GetResellersResponseType = APIResponseSuccessModel<{
  list: SellerDataType[];
}>;

export type GetResellersSettingsRequestType = {
  user_reference: string;
} & BaseRequestType;

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
  password: string;
} & BaseRequestType;

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
} & BaseRequestType;

export type SaveSellerSettingsRequestType = Partial<{
  filter: "color" | "price";
}>;

export type SaveSellerSettingsResponseType = APIResponseSuccessModel<null>;

export type GetTransactionGroupRequestType = Partial<{
  filter: string;
  country_name: string;
}> &
  BaseRequestType;

export type GetTransactionGroupResponseType = APIResponseSuccessModel<{
  list: TransactionGroupDataType[];
}>;

export type GetUsersRequestType = Partial<{
  filter: string;
  country_name: string;
}> &
  BaseRequestType;

export type GetUsersResponseType = APIResponseSuccessModel<{
  list: UserDataType[];
}>;

export type GetUsersSettingsRequestType = {
  user_reference: string;
} & BaseRequestType;

export type GetUsersSettingsResponseType =
  APIResponseSuccessModel<UserSettingsDataType>;

export type UploadFileRequestType = {
  file_name: string;
  base64_data: string;
};

export type AddToDataStoreRequestBodyType = {
  key_name: string;
  key_value: string;
  meta_data: string;
} & BaseRequestType;

export type getFromDataStoreRequestType = {
  key_name: string;
} & BaseRequestType;

export type GetTransactionDetailsRequestType = {
  order_no: number | string;
} & BaseRequestType;
