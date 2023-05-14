import React, { useState, createContext } from "react";
//create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // create global state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(null);
  
//   for changing state 
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };
// wrap context with provider
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthStatus, users, setUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
