import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  generateModalRoute,
  generateRoute,
  paths,
  routes,
} from "./common/routes";
import { modalRoutes } from "./common/routes/modal-route";
import Error404 from "./common/components/404-page";
import { fetchUserToken } from "./common/services/storage";

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <Routes location={previousLocation || location}>
        {routes.map((route) => generateRoute(route))}
        <Route
          element={
            !fetchUserToken() ? (
              <Navigate to={paths.auth.login} />
            ) : (
              <Error404 />
            )
          }
          path="*"
        />
      </Routes>
      {previousLocation ? (
        <Routes>{modalRoutes.map((route) => generateModalRoute(route))}</Routes>
      ) : null}
    </>
  );
}

export default App;
