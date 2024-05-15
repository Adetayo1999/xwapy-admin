export const paths = {
  auth: {
    login: "/auth/login",
  },
  dashboard: {
    overview: "/app/overview",
    resellers: "/app/resellers",
    transactions: "/app/transactions",
    resellers_transactions: "/app/transactions/reseller/:id",
    users: "/app/users",

    modals: {
      reseller_settings: "/app/reseller_settings/:id",
      transaction_details: "/app/transaction_details/:id",
      user_settings: "/app/user_settings/:id",
      create_reseller: "/app/create_reseller",
    },
  },
};
