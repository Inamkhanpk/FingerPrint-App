import React, { useState, createContext } from "react";
//create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // create global state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(null);
  const [data, setData] = useState([]);

  const setAuthentic = (newState) => {
    setIsAuthenticated(newState);
  };

  const setUserInfo = (newState) => {
    setUsers(newState);
  };

  const setFingerPrintData = (newState) => {
    setData(newState);
  };

  //   for changing state

  // wrap context with provider
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthentic,
        users,
        setUserInfo,
        data,
        setFingerPrintData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
