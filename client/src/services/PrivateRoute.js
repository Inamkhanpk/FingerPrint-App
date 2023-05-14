import { Navigate } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "./../context/userContext";
//private route is used to check the user authentication
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated, "iaAuthenticated");

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
export default PrivateRoute;
