import axios from "axios";
import Cookies from "js-cookie";

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/token",
      {},
      {
        withCredentials: true,
      }
    );
    const newAccessToken = res.data.accessToken;
    Cookies.set("accessToken", newAccessToken, { expires: 1 / 24 }); // 1 hour
    return newAccessToken;
  } catch (err) {
    console.error("Failed to refresh token", err);
    // Optionally clear tokens if refresh fails
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // Redirect to login page or another appropriate action
    window.location.href = "/login";
    throw err;
  }
};
