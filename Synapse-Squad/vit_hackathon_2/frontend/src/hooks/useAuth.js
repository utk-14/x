import { useState } from "react";
import { loginUser, signupUser } from "../api/authApi";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await loginUser(data);

    if (res.access_token) {
      localStorage.setItem("token", res.access_token);
      setUser(res);
    }

    return res;
  };

  const signup = async (data) => {
    return await signupUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    login,
    signup,
    logout,
  };
};