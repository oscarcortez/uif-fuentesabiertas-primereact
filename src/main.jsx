import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { PrimeReactProvider } from "primereact/api";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <PrimeReactProvider value={{ unstyled: false }}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </PrimeReactProvider>
  // </React.StrictMode>
);
