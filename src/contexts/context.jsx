import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

function Provider({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    setIsMenuActive(false);
  }, []);

  return (
    <Context.Provider
      value={{
        isMenuActive,
        setIsMenuActive,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;