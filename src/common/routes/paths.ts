export const paths = {
  auth: {
    login: "/auth/login",
  },
  dashboard: {
    resellers: {
      overview: "/",
      transactions: "/app/transactions",
      users: "/app/users",

      modals: {
        reseller_settings: "/app/reseller_settings/",
        transaction_details: "/app/transaction_details/:id",
        user_settings: "/app/user_settings/:id",
      },
    },

    admin: {
      overview: "/",
      resellers: "/admin/resellers",
      transactions: "/admin/transactions",
      resellers_transactions: "/admin/transactions/reseller/:id",
      users: "/admin/users",

      modals: {
        reseller_settings: "/admin/reseller_settings/:id",
        transaction_details: "/admin/transaction_details/:id",
        user_settings: "/admin/user_settings/:id",
        create_reseller: "/admin/create_reseller",
      },
    },
  },
};
