import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/authenticateService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authService = new authenticateService();

  return !isLoggedIn() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
