import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    // Adding token to the request if it doesn't already in
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // If header is missing Bearer Authorization then add it with user token
        if (
          !config.headers["Authorization"] ||
          !config.headers["Authorization"].startsWith("Bearer")
        ) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error.config;
        // If token is expired than generate another
        if (error.response.status === 401 && !prevReq.sent) {
          prevReq.sent = true;
          const newToken = await refreshToken();
          // Send request with refreshed token
          prevReq.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );

    // Clean up useEffect function
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
