import { createContext, useState } from "react";

/* 
  This context stores the user's account data and
  the setter setAccount
*/

export const AccountContext = createContext(undefined);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(undefined);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
