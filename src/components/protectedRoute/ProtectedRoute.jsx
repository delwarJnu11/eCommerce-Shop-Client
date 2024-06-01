import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading === true) return <p>Loading...</p>;
  return isAuthenticated ? element : <Navigate to="/login" />;
};
export default ProtectedRoute;
