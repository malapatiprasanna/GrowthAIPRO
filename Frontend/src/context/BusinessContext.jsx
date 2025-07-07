import { createContext, useContext, useState } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <BusinessContext.Provider value={{ name, setName, location, setLocation, data, setData, loading, setLoading }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);