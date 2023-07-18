import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUserHooks = () => {
  return (
    useContext(UserContext)
  );
};

export default useUserHooks;
