export interface IRoute {
  path: string;
  Component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  access: "guest-only" | "loggedin-user";
}

export interface IModalRoute {
  component: () => JSX.Element;
  path: string;
}
