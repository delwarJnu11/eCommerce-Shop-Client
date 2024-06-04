import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
  const { loading, email, authenticated } = useAuth();
  if (loading === true) return <p>Loading protected route...</p>;

  return email && authenticated && loading === false ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
