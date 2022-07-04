import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  // Only run when component loads
  useEffect(() => {}, []);

  return;
};

export default PersistLogin;
