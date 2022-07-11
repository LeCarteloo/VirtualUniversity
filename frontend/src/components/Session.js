import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const Session = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // Only run when component loads
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
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
