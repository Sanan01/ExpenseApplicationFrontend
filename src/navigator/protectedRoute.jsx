import { Navigate, Outlet } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { getItem } from "../services/storageService";

function ProtectedRoute() {
  const isAuth = getItem(CONSTANTS.AUTHENTICATED);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={CONSTANTS.CONTROLLER.LOGIN_PAGE} />
  );
}

export default ProtectedRoute;
