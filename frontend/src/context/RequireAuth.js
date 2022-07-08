import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("RequireAuth", auth);

  // Replacing navigation history
  if (!auth.role || !auth.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return auth.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
