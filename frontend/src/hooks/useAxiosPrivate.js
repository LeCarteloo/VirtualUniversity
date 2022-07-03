import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    // Adding token to the request if it doesn't already in
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (
          !config.headers["Authorization"] ||
          !config.headers["Authorization"].startsWith("Bearer")
        ) {
          console.log(auth.token);
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => console.error(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => console.error(error)
    );

    // Clean up useEffect function
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
