import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { authenticateService } from "../service/authenticateService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authService = new authenticateService();

  return !authService.isLoggedIn() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
