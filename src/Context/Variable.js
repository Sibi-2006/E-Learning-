import React, { createContext } from "react";

export const VariableContext = createContext();

export function Variable({ children }) {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://192.168.97.101:3500/api";
  const appName = process.env.REACT_APP_NAME ||  "E-Learning App";

  

  return (
    <VariableContext.Provider value={{ baseUrl, appName }}>
      {children}
    </VariableContext.Provider>
  );
}

//192.168.43.167