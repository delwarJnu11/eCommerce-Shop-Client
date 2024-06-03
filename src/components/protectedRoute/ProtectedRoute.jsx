import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
  const { loading, authenticated } = useAuth();
  if (loading === true) return <p>Loading protected route...</p>;

  return authenticated && !loading ? element : <Navigate to="/login" />;
};
export default ProtectedRoute;
