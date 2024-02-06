import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { Dashboard } from "../layout/Dashboard";
import {
  isLoggedIn,
  getUsername,
  getRole,
} from "../service/authenticateService";

import {
  topbarItems,
  leftbarItems,
  rightbarItems,
} from "../config/dashboardConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const role = getRole();
  console.log("role", role);
  return isLoggedIn() ? (
    <>
      <Dashboard
        userRole={getRole()}
        username={getUsername()}
        topbarItems={topbarItems}
        leftbarItems={leftbarItems[role]}
        rightbarItems={rightbarItems}
      >
        <Component {...rest} />
      </Dashboard>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
