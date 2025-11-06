import React, { createContext } from "react";

export const VariableContext = createContext();

export function Variable({ children }) {
  const baseUrl = "http://192.168.43.167:3500/api";
  const appName = "E-Learning App";

  

  return (
    <VariableContext.Provider value={{ baseUrl, appName }}>
      {children}
    </VariableContext.Provider>
  );
}

//192.168.43.167