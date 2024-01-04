import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// import { Menubar } from "primereact/menubar";
// import { Button } from "primereact/button";
// import { Menu } from "primereact/menu";
import { Dashboard } from "../layout/Dashboard";
import { isLoggedIn } from "../service/authenticateService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const authService = new authenticateService();

  return isLoggedIn() ? (
    <>
      <Dashboard>
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
