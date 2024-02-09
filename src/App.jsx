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
import { OpenSourceNew } from "./pages/OpenSourceNew";
import { OpenSourceAdmin } from "./pages/OpenSourceAdmin";
import { OpenSourcePrettyList } from "./pages/OpenSourcePrettyList";
import { OpenSourceItem } from "./pages/OpenSourceItem";
import { OpenSourceEdit } from "./pages/OpenSourceEdit";
import { OpenSourceUserWorkflowAdmin } from "./pages/OpenSourceUserWorkflowAdmin";
import { OpenSourceUserWorkflowBySession } from "./pages/OpenSourceUserWorkflowBySession";

const router = createBrowserRouter([
  { path: "/dashboard", element: <PrivateRoute component={Dashboard} /> },
  { path: "/login", element: <PublicRoute component={Login} /> },
  {
    path: "/open-source-new",
    element: <PrivateRoute component={OpenSourceNew} />,
  },
  {
    path: "/open-source-admin",
    element: <PrivateRoute component={OpenSourceAdmin} />,
  },
  {
    path: "/open-source/:id",
    element: <PrivateRoute component={OpenSourceItem} />,
  },
  {
    path: "/open-source-edit/:id",
    element: <PrivateRoute component={OpenSourceEdit} />,
  },
  {
    path: "/open-source-pretty-list",
    element: <PrivateRoute component={OpenSourcePrettyList} />,
  },
  {
    path: "/open-source-user-workflow-admin",
    element: <PrivateRoute component={OpenSourceUserWorkflowAdmin} />,
  },
  {
    path: "/open-source-user-workflow-by-session",
    element: <PrivateRoute component={OpenSourceUserWorkflowBySession} />,
  },
  { path: "/", element: <Navigate to="/login" replace /> },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
