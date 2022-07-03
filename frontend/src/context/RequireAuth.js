import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole, children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Replacing navigation history
  if (!auth.role || !auth.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return auth.role === allowedRole ? (
    children
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
