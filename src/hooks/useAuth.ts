import { authContext } from "../providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(authContext);
};
