export interface IRoute {
  path: string;
  Component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  access: "guest-only" | "loggedin-user";
  allowedRoles?: (string | null)[];
}

export interface IModalRoute {
  component: () => JSX.Element;
  path: string;
  allowedRole: string | null;
}
