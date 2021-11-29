import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import "../styles/Message.css";

export const Message = () => {
  const { message } = useContext(MessageContext);

  return (
    <div className="Message">
      {message && (
        <div className={`Message-text ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
};
