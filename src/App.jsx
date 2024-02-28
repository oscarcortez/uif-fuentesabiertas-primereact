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
import { CountryList } from "./pages/CountryList";

import { ExperienceExchangeNew } from "./pages/ExperienceExchangeNew";
import { ExperienceExchangeAdmin } from "./pages/ExperienceExchangeAdmin";
import { ExperienceExchangeEdit } from "./pages/ExperienceExchangeEdit";

import { DocumentationExchangeNew } from "./pages/DocumentationExchangeNew";
import { DocumentationExchangeAdmin } from "./pages/DocumentationExchangeAdmin";

const router = createBrowserRouter([
  { path: "/login", element: <PublicRoute component={Login} /> },

  { path: "/dashboard", element: <PrivateRoute component={Dashboard} /> },
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
  {
    path: "/country-list",
    element: <PrivateRoute component={CountryList} />,
  },
  {
    path: "/experience-exchange-new",
    element: <PrivateRoute component={ExperienceExchangeNew} />,
  },
  {
    path: "/experience-exchange-admin",
    element: <PrivateRoute component={ExperienceExchangeAdmin} />,
  },
  {
    path: "/documentation-exchange-new",
    element: <PrivateRoute component={DocumentationExchangeNew} />,
  },
  {
    path: "/documentation-exchange-admin",
    element: <PrivateRoute component={DocumentationExchangeAdmin} />,
  },
  {
    path: "/experience-exchange-edit/:id",
    element: <PrivateRoute component={ExperienceExchangeEdit} />,
  },
  { path: "/", element: <Navigate to="/login" replace /> },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
