// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/dashboard", element: <PrivateRoute component={Dashboard} /> },
  { path: "/login", element: <PublicRoute component={Login} /> },

  { path: "/", element: <Navigate to="/login" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
