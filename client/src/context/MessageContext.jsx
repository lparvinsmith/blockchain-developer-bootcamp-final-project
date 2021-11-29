import { createContext, useState } from "react";

/* 
  This context temporarily stores a message to the user
  which can be set via addMessage
*/

export const MessageContext = createContext(undefined);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(undefined);

  const addMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(undefined);
    }, 10000);
  };

  return (
    <MessageContext.Provider value={{ message, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
