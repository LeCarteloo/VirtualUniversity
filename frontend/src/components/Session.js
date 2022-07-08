import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const Session = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  console.log("Session", auth);

  // Only run when component loads
  useEffect(() => {
    console.log("Session - useEffect");
    const verifyToken = async () => {
      try {
        const test = await refresh();
        console.log(test);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.token || !auth.role) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default Session;
