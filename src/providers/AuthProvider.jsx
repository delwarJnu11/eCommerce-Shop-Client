import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-shop-backend.vercel.app/api/user/auth/check",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response?.data?.success) {
          setAuthenticated(response?.data?.success);
          setUserId(response?.data?.user?._id);
        }
      } catch (error) {
        setAuthenticated(error?.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, userId, setUserId, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
