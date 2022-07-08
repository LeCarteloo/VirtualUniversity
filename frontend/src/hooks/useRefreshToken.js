import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  // When token is expired
  const refresh = async () => {
    const response = await axios.get("/users/refresh", {
      withCredentials: true,
    });

    console.log("useRefreshToken", response.data);

    setAuth({ role: response.data.role, token: response.data.token });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
