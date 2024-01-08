import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { Dashboard } from "../layout/Dashboard";
import { isLoggedIn, getUsername } from "../service/authenticateService";

import {
  topbarItems,
  leftbarItems,
  rightbarItems,
} from "../config/dashboardConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const authService = new authenticateService();

  return isLoggedIn() ? (
    <>
      <Dashboard
        username={getUsername()}
        topbarItems={topbarItems}
        leftbarItems={leftbarItems}
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
