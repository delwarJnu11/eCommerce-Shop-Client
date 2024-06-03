import { api } from "../api";

const useAxios = () => {
  //   useEffect(() => {
  //     // Add a request interceptor
  //     const requestIntercept = api.interceptors.request.use(
  //       async (config) => {
  //         let accessToken = Cookies.get("accessToken");
  //         if (!accessToken) {
  //           accessToken = await refreshToken();
  //         }
  //         if (accessToken) {
  //           config.headers["Authorization"] = `Bearer ${accessToken}`;
  //         }
  //         return config;
  //       },
  //       (error) => {
  //         return Promise.reject(error);
  //       }
  //     );

  //     // Add a response interceptor
  //     const responseIntercept = api.interceptors.response.use(
  //       (response) => response,
  //       async (error) => {
  //         const originalRequest = error.config;
  //         if (error.response.status === 401 && !originalRequest._retry) {
  //           originalRequest._retry = true;
  //           try {
  //             const newAccessToken = await refreshToken();
  //             originalRequest.headers[
  //               "Authorization"
  //             ] = `Bearer ${newAccessToken}`;
  //             return api(originalRequest);
  //           } catch (err) {
  //             return Promise.reject(err);
  //           }
  //         }
  //         return Promise.reject(error);
  //       }
  //     );

  //     return () => {
  //       api.interceptors.request.eject(requestIntercept);
  //       api.interceptors.response.eject(responseIntercept);
  //     };
  //   }, []);

  return { api };
};

export default useAxios;
