import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https:e-commerce-shop-backend.vercel.app/api/user/auth/check",
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200 && response?.data?.success) {
          setAuthenticated(response?.data?.success);
          setEmail(response?.data?.user?.email);
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
      value={{ loading, email, setEmail, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
