import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/auth/check",
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200 && response?.data?.success) {
          setAuthenticated(response?.data?.success);
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
    <AuthContext.Provider value={{ loading, authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
