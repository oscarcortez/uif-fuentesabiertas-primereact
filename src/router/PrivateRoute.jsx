import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { Dashboard } from "../layout/Dashboard";
import { useEffect, useState } from "react";
import userService from "../service/userService";

import {
  isLoggedIn,
  getUsername,
  // getRole,
} from "../service/authenticateService";

import {
  topbarItems,
  leftbarItems,
  rightbarItems,
} from "../config/dashboardConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await userService.findBySession();
      setUser(response.data);
      //console.log("response.data", response.data);
    })();
  }, []);
  //console.log(user);
  //console.log(user.roles[0].role.descripcion);
  //const role = getRole();
  const role = user?.roles?.[0]?.role?.descripcion.split(" ")[0] || "";

  return isLoggedIn() ? (
    <>
      <Dashboard
        userRole={role}
        username={getUsername()}
        topbarItems={topbarItems}
        leftbarItems={leftbarItems[role || "LECTOR"]}
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
