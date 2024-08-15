import React from 'react';
import { createContext, useContext } from 'react';
import { userStore } from './UserStore';

const StoresContext = createContext({
  userStore
});

export const useStores = () => useContext(StoresContext);

export const StoresProvider = ({ children }) => (
  <StoresContext.Provider value={{ userStore }}>
    {children}
  </StoresContext.Provider>
);
