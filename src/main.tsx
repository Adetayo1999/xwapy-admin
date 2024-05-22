import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import "@/assets/styles/index.css";
import { store, persistor } from "./common/store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<>Loading...</>}>
      <Router>
        <Toaster position="top-right" />
        <App />
      </Router>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
