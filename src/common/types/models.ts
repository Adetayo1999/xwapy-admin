export interface OverviewDataType {
  total_resellers: number;
  users: number;
  on_ramp: number;
  off_ramp: number;
  on_ramp_pending: number;
  off_ramp_pending: number;
}

export interface TransactionDataType {
  date: string;
  txn_id: string;
  fiat_sum: number;
  fee: number;
  amount: number;
  reference: string;
  reseller_name: string;
  currency: string;
  type: "off-ramp";
}

export interface SellerDataType {
  name: string;
  email: string;
  phone: string;
  domain: string;
  seller_id: string;
  date: string;
}

export interface ResellerSettingsDataType {
  full_name: string;
  phone: string;
  email: string;
  custom_domain: string;
  primary_color: string;
  text_color: string;
  secondary_color: string;
  date_joined: string;
}

export interface TransactionGroupDataType {
  seller_name: string;
  total_on_ramp: string;
  total_off_ramp: string;
  on_ramp_id: string;
  off_ramp_id: string;
  commission: string;
  pending_txn: string;
  users: string;
}

export interface UserDataType {
  full_name: string;
  email: string;
  phone: string;
  kyc_status: string;
  on_ramp: string;
  off_ramp: string;
  user_reference: string;
}

export interface UserSettingsDataType {
  full_name: string;
  phone: string;
  email: string;
  custom_domain: string;
  kyc_status: string;
  on_ramp: string;
  on_ramp_count: string;
  off_ramp: string;
  off_ramp_count: string;
  avg_txn: string;
  date_joined: string;
  user_status: string;
}

export interface UserType {
  email: string;
  first_name: string;
  last_name: string;
  sub_domain: string;
  meta_data: {
    domain_config: {
      name: string;
      host: string;
      val_ip: string;
    }[];
  };
  type: string;
  custom_domain: string;
  on_ramp_fee: number;
  off_ramp_fee: number;
  intrapay_merchant_id: string;
}
