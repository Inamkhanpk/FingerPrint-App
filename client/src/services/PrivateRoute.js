import { Navigate,Route,Routes } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "./../context/userContext";

// function PrivateRoute({ children }) {
//   const { isAuthenticated } = useContext(AuthContext);
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" />;
//   }
//   return children;
// }

function PrivateRoute({ path, ...props }) {
    const { isAuthenticated } = useContext(AuthContext);
        return isAuthenticated ? (
            
            <Route {...props} path={path} />
            
          ) : (
            <Navigate to="/signin" replace />
          );
    
  }
  
export default PrivateRoute;
