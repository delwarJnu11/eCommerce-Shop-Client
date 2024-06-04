import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
  const { loading, userId, authenticated } = useAuth();
  if (loading === true) return <p>Loading protected route...</p>;

  return userId && authenticated && loading === false ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
