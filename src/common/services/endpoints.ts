export const endpoints = {
  login: {
    method: "POST",
    url: "/Login",
  },
  get_overview: {
    method: "GET",
    url: (query: string) => `/GetOverview${query}`,
  },
  list_transactions: {
    method: "GET",
    url: (query: string) => `/Transactions${query}`,
  },
  get_sellers: {
    method: "GET",
    url: (query: string) => `/Sellers${query}`,
  },
  get_seller_settings: {
    method: "GET",
    url: (query: string) => `/GetSellerSetting/${query}`,
  },
  create_seller: {
    method: "POST",
    url: "/CreateSeller",
  },
  save_seller_settings: {
    method: "POST",
    url: (query: string) => `/SaveSellerSetting/${query}`,
  },
  get_transaction_group: {
    method: "GET",
    url: (query: string) => `/TransactionsGroup/${query}`,
  },
  get_users: {
    method: "GET",
    url: (query: string) => `/Users/${query}`,
  },
  get_user_settings: {
    method: "GET",
    url: (query: string) => `/GetUserSetting/${query}`,
  },
  upload_file: {
    method: "POST",
    url: "https://workspace-stagging-api.fuspay.finance/obtain_file_url/",
  },
  add_to_datastore: {
    method: "POST",
    url: "SetDataStore",
  },
  get_from_data: {
    method: "GET",
    url: (query: string) => `/GetDataStore${query}`,
  },
  get_user_data: {
    method: "GET",
    url: (query: string) => `/UserData${query}`,
  },
};
