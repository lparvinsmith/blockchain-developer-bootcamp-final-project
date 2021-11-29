import { useContext, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useBuyin } from "../hooks/useBuyin";
import { useVotingOpen, useUpdateVotingOpen } from "../hooks/useVotingOpen";
import { MessageContext } from "../context/MessageContext";

export const AdminActions = () => {
  const [show, setShow] = useState(false);
  const buyin = useBuyin();
  const votingOpen = useVotingOpen();
  const updateVotingOpen = useUpdateVotingOpen();
  const { addMessage } = useContext(MessageContext);

  const handleTODOMessage = () => {
    addMessage("Coming soon! This is a work in progress");
  };

  const handleUpdateVoting = () => {
    updateVotingOpen();
  };

  return (
    <div className="AdminActions">
      <div className="ContractActions-title" onClick={() => setShow(!show)}>
        Admin
      </div>
      {show && (
        <div className="ContractActions-body">
          <div className="ContractActions-action">
            <div className="ContractActions-label">{`Current buyin: ${buyin} wei`}</div>
            <TextInput placeholder="update amount in wei" />
            <Button onClick={handleTODOMessage}>Update</Button>
          </div>
          <div className="ContractActions-action">
            <Button onClick={handleTODOMessage}>
              Close voter registration
            </Button>
          </div>
          <div className="ContractActions-action">
            <Button onClick={handleTODOMessage}>
              Close candidate registration
            </Button>
          </div>
          <div className="ContractActions-action">
            <div className="ContractActions-label">
              {`Voting is ${votingOpen ? "" : "not "}open`}
            </div>
            <Button onClick={handleUpdateVoting}>Open voting</Button>
          </div>
        </div>
      )}
    </div>
  );
};
