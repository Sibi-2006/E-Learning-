import React, { createContext } from "react";

export const VariableContext = createContext();

export function Variable({ children }) {
  const baseUrl = "http://192.168.114.101:3500/api";
  const appName = "E-Learning App";

  return (
    <VariableContext.Provider value={{ baseUrl, appName }}>
      {children}
    </VariableContext.Provider>
  );
}

//192.168.114.101